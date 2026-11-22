// Builds the Tamil and Sinhala Budget 2027 explorer from docs/i18n/aama-translations.csv:
//   budget-2027/data/i18n/b27.<lang>.js  data translations (set by path onto B27) + interface map (CH_I18N)
//   budget-2027/<lang>/index.html        page shell for each language
// The interface text is translated at runtime by assets/i18n/runtime.js, shared with Chemmani.
// Run from the repo root:  node docs/i18n/build_budget.mjs
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const root = process.cwd();
const LANGS = { ta: 'tamil', si: 'sinhala' };
// Rupee sign the translators use throughout the data (ரூ. 305 times, රු. 116 times; never Rs), with the
// English page's non-breaking space
const RS = { ta: 'ரூ.\u00a0', si: 'රු.\u00a0' };

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

// English data, loaded the way the page loads it
const FILES = ['config.js', 'meta.js', 'fiscal.js', 'annex.js', 'estimates.js', 'init-a.js', 'init-b.js', 'init-c.js', 'policy.js', 'personas.js', 'lens.js'];
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of FILES) vm.runInContext(fs.readFileSync(path.join(root, 'budget-2027/data', f), 'utf8'), ctx);
const EN = ctx.B27;

const parsePath = (p) => p.split(/\.|\[|\]/).filter(Boolean).map((k) => /^\d+$/.test(k) ? +k : k);
const getAt = (obj, p) => parsePath(p).reduce((o, k) => o?.[k], obj);

// Fields the code uses as keys or lookups: never translated in the data
//   DIST.<name>  district names are the keys INIT[].p refers to; they go in the runtime `words` map instead
//   TAX[].who    comma-separated group ids
//   EST.cadre "Other, non-categorised" row: views-est.js finds it by /Other/; its label is never shown
const KEYS = (p) => /^DIST\./.test(p) || /^TAX\[\d+\]\.who$/.test(p) || (/^EST\.cadre\[\d+\]\[0\]$/.test(p) && /Other/.test(getAt(EN, p)));

// The extractor's amount pattern sometimes swallowed the space or first letter after an amount
// ("Rs 100 of" -> "{amount}of", "Rs 15,750 more" -> "{amount}ore"); restore the English text the page shows
const fixEn = (s) => s.replace(/\{amount\}ore\b/g, '{amount} more').replace(/\{amount\}(?=[A-Za-z])/g, '{amount} ');

// Where a translation puts repeated placeholders in a different order from the English, which English
// value (1-based) goes in each slot. Checked by hand against each row's English example in the CSV notes.
const N213 = { n: [1, 3, 2] }, N21 = { n: [2, 1] };
const ORDER_BOTH = {
  '{n}% of GDP · {n}% vs {n}': N213,
  'Interest + salaries + subsidies = {amount}of every {amount}Source: Annexure III ({n} column).': { amount: [2, 1] },
  'About {amount}of every {amount}spent comes from borrowing or drawing down cash: the {amount} deficit includes {amount} for Ditwah, which Annexure IV says is paid from the Treasury’s cash buffer.': { amount: [2, 1, 3, 4] },
  'Section {n} targets revenue of “not less than {n}% of GDP”. Annexure III plans {n}% for {n} ({n}% in {n}).': { n: [1, 2, 4, 3, 6, 5] },
  'Down from {n}% in {n} and {n}% in {n} At {amount} it is still larger than the salary bill ({amount}) and the subsidies and transfers line ({amount}) taken separately.': { n: [2, 1, 4, 3] },
  '{amount} in the Budget plus {amount} of Ditwah reconstruction: {n}% of GDP, up from {n}% in {n}': N213,
  '{n}% vs {n} revised': N21,
  'AAMA analysis The two documents add up. The {n} sector totals in the Citizens’ Budget ({amount}) plus the speech’s new proposals ({amount}) come to {amount}, within {amount} of the {amount} of programme spending in Annexure IV. Interest and debt repayments sit outside the sectors.': { amount: [1, 2, 3, 5, 4] },
  'Largest {n} of {n} categories; “other, non-categorised” adds {n}': { n: [2, 1, 3] },
  '{n} of {n} initiatives · {amount} allocated in {n}': { n: [2, 1, 3] },
  'PPP to develop {n} of {n} tanks': N21,
  '{n} MW by {n} → {n} MW installed': { n: [2, 1, 3] },
  '{n} households using >{n} units': N21,
  '{n} days of cover by {n}': N21,
  '{n} towers by {n}': N21,
  '{n} houses by {n}': N21,
  '{n} of {n} laws and institutions are not yet passed, including the PPP Act that the airport, port and refinery plans depend on.': N21,
  '{text}: now {n}%, target {n}% by {n}': N213,
  '{text}: now {n} MW, target {n} MW by {n}': N213,
  '{text}: now {n} schools, target {n} schools by {n}': N213,
  '{text}: now {n} centres, target {n} centres by {n}': N213,
  '{text}: now {n} USD M, target {n} USD M by {n}': N213,
  '{text}: now {n} target {n} by {n}': N213,
  '{text}: now {n}% of GDP, target {n}% of GDP by {n}': N213,
  'Government revenue: now {n}% of GDP, target {n}% of GDP by {n}': N213,
  '{n} of {n} corridors': N21,
  'Commitment + effect + timing = {n} of {n}': N21,
  '{n} houses; {n} in {n}; aid per ho…': N213,
};
const ORDER = { ta: ORDER_BOTH, si: ORDER_BOTH };

// Every template with a repeated placeholder must be listed above or confirmed in order here,
// so that a new or changed row can't silently print numbers in the wrong slots.
const IN_ORDER = new Set([
  'Budget {n} explorer: revenue {amount}, spending {amount}, deficit {amount}',
  'Built line by line from the speech and its seven annexures: {n} initiatives, {n} new proposals, {n} tax measures and {n} laws. Each one carries its section reference.',
  '{amount} Budget + {amount} Ditwah supplementary · {n}% of GDP', '{n}% of GDP, below the {n}% floor the speech sets',
  '{n} proposals · {n} capital projects · new laws', '{amount}of revenue, and {amount}spent',
  'It was {n}% in {date}. The speech attributes the rise to fuel prices and the Middle East conflict, and says El Niño will peak in {date}.',
  '{amount} in {n} (Annexure I). Each taxpayer keeps {amount}to {amount}ore a month.',
  'Interest {n} Salaries & wages {n} Subsidies & transfers {n} Other goods & services {n} Left over {n}',
  'Taxes {n} Non-tax revenue & grants {n} Borrowing {n}', 'Revenue and spending, {n} to {n}',
  '{n} column is the Budget alone; the Ditwah supplementary adds {amount} of spending ({amount} investment, {amount} subsidies) financed from bank borrowing/cash buffer.',
  'Recurrent {n} + capital {n}',
  'Annexure IV. Sum of the first four lines is {amount}; receipts are {amount}. The {amount} Ditwah supplementary is paid from the existing cash buffer, not new borrowing.',
  'Falls to {amount} in {n} then rises to {amount} in {n} (§{n}).', 'Foreign net {amount} + domestic {amount}',
  'Interest {amount} + repayments {amount}', 'Maintenance {amount} · rehabilitation {amount}',
  'Digital transformation: about {amount}. {amount} sits with the {text}; the speech adds {amount}, taking it to {amount}.',
  '{amount} in the Estimates + {amount} new in the speech', 'Capital {amount} · recurrent {amount} ({n}% capital)',
  'Nationwide · {n}–{n}', 'Show {n} more ({n} left)',
  'Source: {n}st Budget Speech {n} §{n} Amounts are as stated in the speech and annexures; place tags and groups are AAMA’s mapping.',
  '{place} · {place} Province', '{amount} recurrent + {amount} capital', '{amount}per kW, max {amount}',
  'monks {amount}→ {n}/day, lay {amount}→ {n}/d…', '{n} centres {n}–{n}', '{n} target {n}%', '{n} target {n} MW',
  '{n} target {n} schools', '{n} target {n} centres', '{n} target {n} USD M', '{n} target {n}', '{n} target {n}% of GDP',
  'Effective rate: {n}% now → {n}% from April. This counts salary and allowances on the tax slabs only; SSCL, EPF/ETF and other reliefs are not included.',
  'Now extended to other crops grown in paddy fields from the {n}/{n} Maha season (§{n}).',
  '{n}% subsidy on the first {amount}, {n}% on the next {amount} (§{n}). Treasury pays {n}%/{n}%, SLBFE {n}%/{n}%.',
  'Commitment {n} study · {n} funded or tendered · {n} funded and under way',
  'Effect on land {n} indirect · {n} local utility · {n} direct access (interchange, station, airport, port)',
  'Timing {n} after {n} · {n} by {n} · {n} by {n}',
  'Total {n}–{n} = High · {n}–{n} = Medium · ≤{n} = Watch. The rubric lives in data/lens.js so editors can challenge any score.',
  'signal {n}/{n}', '{place}, {place}, Kalpitiya, {place}',
  // shared with the Explainers page
  'The mass grave at Chemmani, from the {n} murder case to the {n} and {n} excavation, with every statement graded by the kind of source behind it.',
  'Example: Excavation report, section {n} page {n}',
  'Score = Σ direction × strength ({n}–{n}) × evidence weight (funded & dated {n} · funded/needs partner {n} · intent only {n}), over drivers within the chosen horizon. Click a bar for the reasoning.',
  'Score {n} · linked {n} allocations {amount}', 'strength {n}/{n}', '{n}–{n} months', 'Medium Term Debt Management Strategy {n}–{n}',
  'Treemap size is the larger of the two columns. The itemised lines cover {n}% of the {amount} total; the rest is mainly interest ({n}%), salaries, running costs and transfers the speech doesn’t itemise.',
  'Every line is in budget{n}/data/ as plain JavaScript objects, with a validator (node budget{n}/tools/validate.mjs) that re-checks the Annexure arithmetic and every cross-reference. The initiatives table can be downloaded from the explorer.',
]);

const report = []; const unchecked = new Set();
for (const [lang, col] of Object.entries(LANGS)) {
  // 1. Data: [path, translation] pairs, applied onto B27 in the page before the app starts
  const patch = [], miss = [];
  for (const r of CSV.filter((r) => r.surface === 'budget' && !r.id.includes(':ui:'))) {
    const p = r.id.slice('budget:'.length);
    if (KEYS(p)) continue;
    if (getAt(EN, p) !== r.english) { miss.push('changed since extraction: ' + p); continue; }
    const t = r[col].trim(); if (!t) { miss.push('untranslated: ' + p); continue; }
    patch.push([p, t]);
  }
  // 2. Interface map: Budget interface rows, plus shared strings from the Explainers page and month names
  const exact = {}, templates = [];
  const ui = CSV.filter((r) => (r.surface === 'budget' && r.id.includes(':ui:')) || r.surface === 'explainers' || r.surface === 'common');
  for (const r of ui) {
    const t = r[col].trim(); if (!t) continue;
    if (/\{[a-z]+\}/.test(r.english)) templates.push([r.english, t]); else if (!(r.english in exact)) exact[r.english] = t;
  }
  exact['Explainers'] = byId['home:nav.explainers'][col].trim();
  exact['Switch to light mode'] = exact['Switch to light mode'] || byId['explainers:supplied.light']?.[col]?.trim();
  exact['Language'] = exact['Language'] || byId['explainers:supplied.language']?.[col]?.trim();
  const words = {};
  for (const r of CSV.filter((r) => /^budget:DIST\./.test(r.id))) if (r[col].trim()) words[r.english] = r[col].trim();

  for (const t of templates) {
    const c = {}; (t[0].match(/\{[a-z]+\}/g) || []).forEach((x) => c[x] = (c[x] || 0) + 1);
    const o = ORDER[lang][t[0]];
    if (!o && Object.values(c).some((v) => v > 1) && !IN_ORDER.has(t[0])) unchecked.add(t[0]);
    if (o) for (const [name, order] of Object.entries(o)) {
      const k = (t[1].match(new RegExp('\\{' + name + '\\}', 'g')) || []).length;
      if (k !== order.length) throw new Error(`[${lang}] ORDER for "${t[0].slice(0, 60)}" lists ${order.length} {${name}}, translation has ${k}`);
      let i = 0; t[1] = t[1].replace(new RegExp('\\{' + name + '\\}', 'g'), () => `{${name}#${order[i++]}}`);
    }
    t[0] = fixEn(t[0]);
  }
  // Variants where the English template contains a data string that is itself translated on this page
  const dataTr = patch.map(([p, t]) => [getAt(EN, p), t]).filter(([en]) => en.length >= 4 && !/[{}]/.test(en)).sort((a, b) => b[0].length - a[0].length);
  for (const t of [...templates]) {
    let v = t[0];
    for (const [en, tr] of dataTr) if (v.includes(en)) v = v.split(en).join(tr);
    if (v !== t[0]) templates.push([v, t[1]]);
  }
  for (const [k, v] of Object.entries({ ...exact })) {
    let e = k; for (const [en, tr] of dataTr) if (e.includes(en) && e !== en) e = e.split(en).join(tr);
    if (e !== k && !(e in exact)) exact[e] = v;
  }
  // Text that opens with a source tag ("From the speech", "AAMA analysis"): the tag is translated on its own first
  for (const pre of ['From the speech', 'AAMA analysis']) {
    const tp = exact[pre]; if (!tp) continue;
    for (const [k, v] of Object.entries({ ...exact })) if (k.startsWith(pre + ' ') && !(tp + k.slice(pre.length) in exact)) exact[tp + k.slice(pre.length)] = v;
    for (const t of [...templates]) if (t[0].startsWith(pre + ' ')) templates.push([tp + t[0].slice(pre.length), t[1]]);
  }
  const lit = (s) => s.replace(/\{[a-z]+\}/g, '').length;
  templates.sort((a, b) => lit(b[0]) - lit(a[0]));
  const months = Array.from({ length: 12 }, (_, i) => byId[`common:month.${i + 1}`][col].trim());

  const out = `/* Generated by docs/i18n/build_budget.mjs from docs/i18n/aama-translations.csv. Do not edit by hand. */
window.CH_I18N = ${JSON.stringify({ lang, rs: RS[lang], months, exact, templates, words })};
(function (B, X, P) {
  P.forEach(function (e) {
    var ks = e[0].split(/\\.|\\[|\\]/).filter(Boolean), o = B, k = ks[ks.length - 1];
    for (var i = 0; i < ks.length - 1 && o; i++) o = o[ks[i]];
    if (!o || typeof o[k] !== 'string') return;   // lens data is absent when the lenses are off
    // the interface also prints some data strings from its own code (column heads, chart labels): match those too
    var en = o[k].replace(/\\s+/g, ' ').trim(); if (!(en in X)) X[en] = e[1];
    o[k] = e[1];
  });
})(window.B27, window.CH_I18N.exact, ${JSON.stringify(patch)});
`;
  fs.mkdirSync(path.join(root, 'budget-2027/data/i18n'), { recursive: true });
  fs.writeFileSync(path.join(root, `budget-2027/data/i18n/b27.${lang}.js`), out);
  report.push(`${lang}: ${patch.length} data strings, ${Object.keys(exact).length} exact + ${templates.length} template interface strings, ${Object.keys(words).length} district names` + (miss.length ? `\n  ${miss.join('\n  ')}` : ''));

  // 3. Page shell
  const T = (en) => { const r = ui.find((x) => x.english === en); const t = r && r[col].trim(); if (!t) throw new Error(`[${lang}] no translation for: ${en}`); return t; };
  const fill = (tpl, ...vals) => { let i = 0; return T(tpl).replace(/\{[a-z]+\}/g, () => vals[i++]); };
  let h = fs.readFileSync(path.join(root, 'budget-2027/index.html'), 'utf8');
  const rep = (a, b) => { if (!h.includes(a)) throw new Error(`[${lang}] not found in budget-2027/index.html: ${a.slice(0, 80)}`); h = h.split(a).join(b); };
  const title = fill('Sri Lanka Budget {n} explorer · AAMA', '2027');
  const desc = fill('Interactive guide to Sri Lanka\'s Budget {n}: revenue, spending by sector, new proposals, tax changes, calculators and what comes next.', '2027');
  const alt = fill('Budget {n} explorer: revenue {amount}, spending {amount}, deficit {amount}', '2027', 'Rs 6.18tn', 'Rs 7.93tn', 'Rs 1.75tn');
  rep('<html lang="en"', `<html lang="${lang}"`);
  rep('<title>Sri Lanka Budget 2027 explorer · AAMA</title>', `<title>${title}</title>`);
  rep('<meta property="og:title" content="Sri Lanka Budget 2027 explorer · AAMA" />', `<meta property="og:title" content="${title}" />`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`).replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`).replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${alt}$2`);
  rep('<link rel="canonical" href="https://www.aama.lk/budget-2027/" />', `<link rel="canonical" href="https://www.aama.lk/budget-2027/${lang}/" />`);
  rep('<meta property="og:url" content="https://www.aama.lk/budget-2027/" />', `<meta property="og:url" content="https://www.aama.lk/budget-2027/${lang}/" />\n<meta property="og:locale" content="${lang}_LK" />`);
  h = h.replace(/("url": ")https:\/\/www\.aama\.lk\/budget-2027\/(")/, `$1https://www.aama.lk/budget-2027/${lang}/$2`).replace('"inLanguage": "en"', `"inLanguage": "${lang}"`)
    .replace(/("name": ")Sri Lanka Budget 2027 explorer · AAMA(")/, `$1${title}$2`).replace(/("description": ")Interactive guide[^"]*(")/, `$1${desc}$2`);
  const fam = { ta: 'Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@300;400;500&family=Noto+Sans+Sinhala:wght@500', si: 'Noto+Sans+Sinhala:wght@400;500;600&family=Noto+Serif+Sinhala:wght@300;400;500&family=Noto+Sans+Tamil:wght@500' }[lang];
  rep('family=Noto+Sans+Tamil:wght@500&family=Noto+Sans+Sinhala:wght@500&family=Fraunces:', `family=${fam}&family=Fraunces:`);
  // language switch: current page is this language
  h = h.replace(/<div class="lang"([^>]*)>[\s\S]*?<\/div>/, `<div class="lang"$1>\n      <a href="../" lang="en" hreflang="en">EN</a>${lang === 'ta' ? '<a href="./" lang="ta" aria-current="page">தமிழ்</a><a href="../si/" lang="si" hreflang="si">සිංහල</a>' : '<a href="../ta/" lang="ta" hreflang="ta">தமிழ்</a><a href="./" lang="si" aria-current="page">සිංහල</a>'}\n    </div>`);
  rep('aria-label="Language"', `aria-label="${exact['Language']}"`);
  rep('href="../explainers/"', `href="../explainers/${lang}/"`);
  // translated data loads after the English data (and after lens.js, which is written in by the line before)
  rep('<script src="js/core.js"></script>', `<script src="data/i18n/b27.${lang}.js"></script>\n<script src="../assets/i18n/runtime.js"></script>\n<script src="js/core.js"></script>`);
  // static shell text (dock, footer, nav) in this language for crawlers and before the first render
  const shell = (re) => { h = h.replace(re, (blk) => blk.replace(/>([^<>]*[A-Za-z][^<>]*)</g, (m, txt) => { const t = exact[txt.replace(/\s+/g, ' ').trim()]; return t ? `>${t}<` : m; }).replace(/aria-label="([^"]+)"/g, (m, v) => exact[v] ? `aria-label="${exact[v]}"` : m)); };
  shell(/<nav class="nav"[\s\S]*?<\/nav>/); shell(/<nav class="dock"[\s\S]*?<\/nav>/); shell(/<footer class="foot">[\s\S]*?<\/footer>/); shell(/<a class="skip"[^>]*>[^<]*<\/a>/);
  // crawler fallback in this language
  const tabs = [...h.matchAll(/<a data-view="(\w+)"[^>]*href="(#\/\w+)">(?:<span[^>]*><\/span>)?([^<]+)<\/a>/g)].filter((m) => m[1] !== 'overview');
  h = h.replace(/<main id="view" tabindex="-1">[\s\S]*?<\/main>/, `<main id="view" tabindex="-1"><!-- Crawler/no-JS fallback, replaced by the app on load. Generated by docs/i18n/build_budget.mjs. -->\n<h1>${title.replace(' · AAMA', '')}</h1>\n<p>${desc}</p>\n<ul>\n${tabs.map((m) => `<li><a href="${m[2]}">${m[3]}</a></li>`).join('\n')}</ul>\n</main>`);
  // one folder deeper
  h = h.replace(/(href|src)="\.\.\/(?!\.\.)/g, (m, a) => `${a}="../../`).replace(/(href|src)="(css|js|data)\//g, '$1="../$2/').replace(/document\.write\('<script src="data\//, `document.write('<script src="../data/`);
  h = h.replace('href="../../" lang="en"', 'href="../" lang="en"').replace('href="../../ta/" lang="ta"', 'href="../ta/" lang="ta"').replace('href="../../si/" lang="si"', 'href="../si/" lang="si"');
  fs.mkdirSync(path.join(root, `budget-2027/${lang}`), { recursive: true });
  fs.writeFileSync(path.join(root, `budget-2027/${lang}/index.html`), h);
}
console.log(report.join('\n'));
if (unchecked.size) { console.error(`\nTemplates with repeated placeholders not yet checked for order (add to ORDER_BOTH or IN_ORDER):\n  ${[...unchecked].join('\n  ')}`); process.exit(1); }
