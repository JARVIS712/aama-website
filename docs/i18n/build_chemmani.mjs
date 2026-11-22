// Builds the Tamil and Sinhala Chemmani explainer from docs/i18n/aama-translations.csv:
//   chemmani/data/i18n/ch.<lang>.js  translated data + interface map (CH, CH_I18N)
//   chemmani/<lang>/index.html       page shell for each language
// Run from the repo root:  node docs/i18n/build_chemmani.mjs
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const root = process.cwd();
const LANGS = { ta: 'tamil', si: 'sinhala' };

function parseCSV(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const [h, ...rest] = rows; return rest.filter((r) => r.length > 1).map((r) => Object.fromEntries(h.map((k, i) => [k, r[i] || ''])));
}
const CSV = parseCSV(fs.readFileSync(path.join(root, 'docs/i18n/aama-translations.csv'), 'utf8').replace(/^﻿/, ''));
const byId = Object.fromEntries(CSV.map((r) => [r.id, r]));

// Load the English data
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of ['sources.js', 'facts.js']) vm.runInContext(fs.readFileSync(path.join(root, 'chemmani/data', f), 'utf8'), ctx);
const EN = JSON.parse(JSON.stringify(ctx.CH));

// "EVENTS[3].t" -> ['EVENTS', 3, 't']
const parsePath = (p) => p.split(/\.|\[|\]/).filter(Boolean).map((k) => /^\d+$/.test(k) ? +k : k);
const setAt = (obj, p, v) => { const ks = parsePath(p); let o = obj; for (let i = 0; i < ks.length - 1; i++) o = o[ks[i]]; const last = ks[ks.length - 1]; if (typeof o[last] !== 'string') throw new Error('not a string at ' + p); o[last] = v; };
const getAt = (obj, p) => parsePath(p).reduce((o, k) => o?.[k], obj);

const report = [];
for (const [lang, col] of Object.entries(LANGS)) {
  const CH = JSON.parse(JSON.stringify(EN)); let n = 0, miss = [];
  for (const r of CSV.filter((r) => r.surface === 'chemmani' && !r.id.includes(':ui:'))) {
    const p = r.id.slice('chemmani:'.length);
    if (getAt(EN, p) !== r.english) { miss.push('changed since extraction: ' + p); continue; }
    const t = r[col].trim(); if (!t) { miss.push('untranslated: ' + p); continue; }
    setAt(CH, p, t); n++;
  }
  // Interface map: Chemmani interface rows, plus shared strings from the Explainers page and month names
  const exact = {}, templates = [];
  const ui = CSV.filter((r) => (r.surface === 'chemmani' && r.id.includes(':ui:')) || r.surface === 'explainers' || r.surface === 'common');
  for (const r of ui) {
    const t = r[col].trim(); if (!t) continue;
    if (/\{[a-z]+\}/.test(r.english)) templates.push([r.english, t]); else if (!(r.english in exact)) exact[r.english] = t;
  }
  exact['Explainers'] = byId['home:nav.explainers'][col].trim();
  exact['Switch to light mode'] = exact['Switch to light mode'] || byId['explainers:supplied.light']?.[col]?.trim();
  // Where a translation puts repeated placeholders in a different order from the English, say which English
  // value goes where (1-based). Checked by hand against each row's English example.
  const ORDER = {
    'Phase three found {n} remains from {n} April to {date} (Daily Mirror). We have no dated figure between May and mid-{date} except a lawyer’s “{n} the last I checked”. The {n} exhumation found {n} people, at least a kilometre away according to Jaffna Monitor.': { n: [2, 1, 3, 4, 5] },
    '{n} of {n} events': { n: [2, 1] },
    'About {n} of {n} (AAMA arithmetic)': { n: [2, 1] },
  };
  for (const t of templates) {
    const o = ORDER[t[0]]; if (!o) continue;
    for (const [name, order] of Object.entries(o)) { let i = 0; t[1] = t[1].replace(new RegExp('\\{' + name + '\\}', 'g'), () => `{${name}#${order[i++]}}`); }
  }
  // Variants the app produces: a source link with no page reference
  for (const t of [...templates]) if (t[0].includes(', {page}') && t[1].includes(', {page}')) templates.push([t[0].replace(', {page}', ''), t[1].replace(', {page}', '')]);
  // Variants where the English template contains a data string that is itself translated on this page (e.g. "Adult")
  const dataTr = CSV.filter((r) => r.surface === 'chemmani' && !r.id.includes(':ui:') && r[col].trim() && r.english.length >= 4 && !/[{}]/.test(r.english)).map((r) => [r.english, r[col].trim()]).sort((a, b) => b[0].length - a[0].length);
  for (const t of [...templates]) {
    let v = t[0];
    for (const [en, tr] of dataTr) if (v.includes(en)) v = v.split(en).join(tr);
    if (v !== t[0]) templates.push([v, t[1]]);
  }
  // longest literal text first, so specific templates win over general ones
  const lit = (s) => s.replace(/\{[a-z]+\}/g, '').length;
  templates.sort((a, b) => lit(b[0]) - lit(a[0]));
  const months = Array.from({ length: 12 }, (_, i) => byId[`common:month.${i + 1}`][col].trim());
  const out = `/* Generated by docs/i18n/build_chemmani.mjs from docs/i18n/aama-translations.csv. Do not edit by hand. */\nvar CH = window.CH = ${JSON.stringify(CH)};\nwindow.CH_I18N = ${JSON.stringify({ lang, months, exact, templates })};\n`;
  fs.mkdirSync(path.join(root, 'chemmani/data/i18n'), { recursive: true });
  fs.writeFileSync(path.join(root, `chemmani/data/i18n/ch.${lang}.js`), out);
  report.push(`${lang}: ${n} data strings, ${Object.keys(exact).length} exact + ${templates.length} template interface strings` + (miss.length ? `\n  ${miss.join('\n  ')}` : ''));

  // Page shell
  const T = (en) => { const r = ui.find((x) => x.english === en); return r && r[col].trim(); };
  let h = fs.readFileSync(path.join(root, 'chemmani/index.html'), 'utf8');
  const rep = (a, b) => { if (!h.includes(a)) throw new Error(`[${lang}] not found in chemmani/index.html: ${a.slice(0, 80)}`); h = h.replace(a, b); };
  const title = T('Chemmani: what the record shows · AAMA');
  const desc = (() => { const tpl = ui.find((x) => x.english.startsWith('The Chemmani mass grave in ')); return tpl[col].trim().replace('{place}', byId['explainers:supplied.jaffna'][col].trim()).replace('{n}', '1996').replace('{n}', '2026'); })();
  rep('<html lang="en"', `<html lang="${lang}"`);
  rep(/<title>[^<]*<\/title>/.exec(h)[0], `<title>${title}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`).replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`).replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  rep('<link rel="canonical" href="https://www.aama.lk/chemmani/" />', `<link rel="canonical" href="https://www.aama.lk/chemmani/${lang}/" />`);
  rep('<meta property="og:url" content="https://www.aama.lk/chemmani/" />', `<meta property="og:url" content="https://www.aama.lk/chemmani/${lang}/" />\n<meta property="og:locale" content="${lang}_LK" />`);
  h = h.replace(/("url": ")https:\/\/www\.aama\.lk\/chemmani\/(")/, `$1https://www.aama.lk/chemmani/${lang}/$2`).replace(/"inLanguage": "en"/, `"inLanguage": "${lang}"`).replace(/("name": ")Chemmani: what the record shows(")/, `$1${title.replace(' · AAMA', '')}$2`);
  const fam = { ta: 'Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500&family=Noto+Sans+Sinhala:wght@500', si: 'Noto+Sans+Sinhala:wght@400;500;600&family=Noto+Serif+Sinhala:wght@400;500&family=Noto+Sans+Tamil:wght@500' }[lang];
  h = h.replace(/family=Noto\+Sans\+Tamil:wght@500&family=Noto\+Sans\+Sinhala:wght@500&family=Fraunces:/, `family=${fam}&family=Fraunces:`);
  rep('<script src="data/sources.js"></script>\n<script src="data/facts.js"></script>', `<script src="../data/i18n/ch.${lang}.js"></script>`);
  rep('<script src="js/app.js"></script>', '<script src="../js/i18n.js"></script>\n<script src="../js/app.js"></script>');
  // language switch: current page is this language
  h = h.replace(/<div class="lang"([^>]*)>[\s\S]*?<\/div>/, `<div class="lang"$1>\n      <a href="../" lang="en" hreflang="en">EN</a>${lang === 'ta' ? '<a href="./" lang="ta" aria-current="page">தமிழ்</a><a href="../si/" lang="si" hreflang="si">සිංහල</a>' : '<a href="../ta/" lang="ta" hreflang="ta">தமிழ்</a><a href="./" lang="si" aria-current="page">සිංහල</a>'}\n    </div>`);
  h = h.replace('href="../explainers/"', `href="../explainers/${lang}/"`);
  // crawler fallback in this language
  const note = (ui.find((x) => x.english.startsWith('Content note. This page covers')) || {})[col] || '';
  h = h.replace(/<main id="view" tabindex="-1">[\s\S]*?<\/main>/, `<main id="view" tabindex="-1"><!-- Crawler/no-JS fallback, replaced by the app on load. Generated by docs/i18n/build_chemmani.mjs. -->\n<h1>${title.replace(' · AAMA', '')}</h1>\n<p>${note}</p>\n<p>${desc}</p>\n${T('The timeline, charts and source links need JavaScript.') ? `<noscript><p>${T('The timeline, charts and source links need JavaScript.')}</p></noscript>` : ''}</main>`);
  // one folder deeper
  h = h.replace(/(href|src)="\.\.\/(?!\.\.)/g, (m, a) => `${a}="../../`).replace(/(href|src)="(css|js|data)\//g, '$1="../$2/');
  h = h.replace('href="../../" lang="en"', 'href="../" lang="en"').replace('href="../../ta/" lang="ta"', 'href="../ta/" lang="ta"').replace('href="../../si/" lang="si"', 'href="../si/" lang="si"').replace(/src="\.\.\/\.\.\/(data|js)\//g, 'src="../$1/');
  fs.mkdirSync(path.join(root, `chemmani/${lang}`), { recursive: true });
  fs.writeFileSync(path.join(root, `chemmani/${lang}/index.html`), h);
}
console.log(report.join('\n'));
