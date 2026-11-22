// Builds docs/i18n/aama-translations.csv: every English string on aama.lk that needs Tamil and Sinhala.
// Run from the repo root with a local server on :8765 (python3 -m http.server 8765):
//   node docs/i18n/extract.mjs
// Rows are keyed so translations can be imported back:
//   data rows   -> "<explainer>:<path in the data object>"   (exact location in the data files)
//   ui rows     -> "<surface>:ui:<hash of the English text>" (matched by English text on import)
//   home rows   -> "home:<i18n key path>"                     (sections.jsx i18n object)
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const root = process.cwd(); const BASE = 'http://localhost:8765/';
// STATES=1 also captures Budget text that appears only after a click; OUT=<file> writes somewhere other than the master CSV
const STATES = !!process.env.STATES, OUT = process.env.OUT || 'docs/i18n/aama-translations.csv';
const rows = []; const seen = new Set();
const add = (r) => { const k = r.id; if (seen.has(k)) return; seen.add(k); rows.push({ tamil: '', sinhala: '', status: 'new', notes: '', ...r }); };
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const hasWords = (s) => /[A-Za-z]{2,}/.test(s);
const isCodeish = (s) => /^https?:\/\//.test(s) || /^[a-z0-9_:\-./#]+$/.test(s) || /^§[\d.]+/.test(s) || /^[A-Z]{1,3}$/.test(s);
const numNote = (s) => /\d/.test(s) ? 'Contains numbers or dates: keep them as they are.' : '';

/* ── 1. Explainer data files ── */
function loadData(dir, files, globalName) {
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, dir, f), 'utf8'), ctx, { filename: f });
  return ctx[globalName] || ctx.window[globalName];
}
const SKIP_KEYS = new Set(['id', 'ref', 'u', 'ids', 'theme', 'slot', 'st', 'f', 'p', 'g', 'k', 'type', 'kind', 'dir', 'm2', 'refersTo', 'c', 'r', 'in', 'um', 'ax2', 'ax7', 'conflict', 'era', 'arg', 'act']);
const dataTexts = new Set(); const dataBy = {};
function walk(obj, base, surface, file, ctxFn, opts = {}) {
  const visit = (v, p, key, parentKey) => {
    if (typeof v === 'string') {
      if (!hasWords(v) || isCodeish(v)) return;
      if (opts.skip && opts.skip(p, key)) return;
      dataTexts.add(v.trim()); (dataBy[surface] = dataBy[surface] || new Set()).add(v.trim());
      add({ id: `${surface}:${p}`, surface, file, context: ctxFn(p, key), english: v, notes: [opts.note ? opts.note(p, key) : '', numNote(v)].filter(Boolean).join(' ') });
    } else if (Array.isArray(v)) v.forEach((x, i) => visit(x, `${p}[${i}]`, key, parentKey));
    else if (v && typeof v === 'object') for (const k of Object.keys(v)) { if (SKIP_KEYS.has(k) && !opts.keep?.(p, k)) continue; visit(v[k], p ? `${p}.${k}` : k, k, key); }
  };
  visit(obj, base, null, null);
}

const CH = loadData('chemmani/data', ['sources.js', 'facts.js'], 'CH');
const chCtx = (p) => {
  if (p.startsWith('EVENTS')) return 'Chemmani · timeline event';
  if (p.startsWith('COUNTS')) return 'Chemmani · count of remains (chart and table)';
  if (p.startsWith('REPORT.says')) return 'Chemmani · "In the report\'s words" card';
  if (p.startsWith('REPORT.notes')) return 'Chemmani · AAMA reading of the report';
  if (p.startsWith('REPORT')) return 'Chemmani · excavation report figures';
  if (p.startsWith('READINGS')) return 'Chemmani · "Two readings of the same site"';
  if (p.startsWith('DISPUTES')) return 'Chemmani · "Where sources disagree"';
  if (p.startsWith('UNKNOWNS')) return 'Chemmani · "Not established"';
  if (p.startsWith('KEY')) return 'Chemmani · key figure card (overview)';
  if (p.startsWith('GRADES')) return 'Evidence grade label or description';
  if (p.startsWith('KINDS')) return 'Source type label';
  if (p.startsWith('SOURCES')) return 'Chemmani · source details panel';
  if (p.startsWith('UNVERIFIED')) return 'Chemmani · unverified video list';
  if (p.startsWith('MEASURES')) return 'Chemmani · chart legend';
  return 'Chemmani';
};
walk(CH, '', 'chemmani', 'chemmani/data/*.js', chCtx, {
  keep: (p, k) => k === 'kind' ? false : false,
  note: (p, k) => {
    if (/^SOURCES\.[^.]+\.t$/.test(p)) return 'Title of the original document. Translate as a description; the original title will be shown alongside.';
    if (/^SOURCES\.[^.]+\.by$/.test(p)) return 'Author or publisher. Transliterate names; translate descriptive words.';
    if (/^UNVERIFIED\[\d+\]\[0\]$/.test(p)) return 'Names of people: transliterate.';
    if (/\.who$/.test(p)) return 'Who said it. Transliterate names.';
    if (/\.t$/.test(p) && /“/.test(CH && '')) return '';
    return '';
  }
});

const B27 = loadData('budget-2027/data', ['config.js', 'meta.js', 'fiscal.js', 'annex.js', 'estimates.js', 'init-a.js', 'init-b.js', 'init-c.js', 'policy.js', 'personas.js', 'lens.js'], 'B27');
const bCtx = (p, k) => {
  const top = p.split(/[.[]/)[0];
  const m = { INIT: 'Budget · initiative', TAX: 'Budget · tax change', LAWS: 'Budget · law announced', EVENTS: 'Budget · dated milestone', TARGETS: 'Budget · target', PERSONAS: 'Budget · "For me" group', CHG: 'Budget · before-and-after change', LAND: 'Budget · Land view (AAMA analysis)', LAND_HEADWINDS: 'Budget · Land view headwind', MKT: 'Budget · Markets view (AAMA analysis)', MKT_MACRO: 'Budget · Markets macro factor', SECTORS: 'Budget · sector name or ministry', THEMES: 'Budget · theme name', FUND: 'Budget · funding source label', STATUS: 'Budget · status label', PROV: 'Budget · province name', GROUPS: 'Budget · group of people', ANX2: 'Budget · Annexure II new spending proposal', ANX7: 'Budget · Annexure VII new capital project', A1: 'Budget · Annexure I revenue measure', MACRO: 'Budget · macro figure', ENVELOPES: 'Budget · spending envelope', EST: 'Budget · Citizens\' Budget estimates', META: 'Budget · speech details', YEARS: 'Budget · year label' };
  return (m[top] || 'Budget') + (k ? ` (${k})` : '');
};
walk(B27, '', 'budget', 'budget-2027/data/*.js', bCtx, {
  skip: (p, k) => /^DIST/.test(p) || /^CONFIG/.test(p) || /^IN_PARENT/.test(p) || /^EVW/.test(p),
  note: (p, k) => {
    if (/^META\.presenter/.test(p)) return 'Name: transliterate.';
    if (/^SECTORS\.[^.]+\.org$/.test(p) || /\.o$/.test(p)) return 'Name of a ministry or agency: use its official Tamil/Sinhala name if one exists.';
    if (/^(ANX2|ANX7)/.test(p)) return 'Name of a project as listed in the annexure: use the official translation if the Treasury published one.';
    if (/^(LAND|MKT)/.test(p)) return 'AAMA analysis text.';
    return '';
  }
});
// District names (keys of DIST) are place names
Object.keys(B27.DIST).forEach((d) => dataTexts.add(d));
Object.keys(B27.DIST).forEach((d) => add({ id: `budget:DIST.${d}`, surface: 'budget', file: 'budget-2027/data/meta.js', context: 'Budget · district name (map)', english: d, notes: 'Place name: use the standard Tamil/Sinhala spelling.' }));

/* ── 2. Home page i18n object (existing ta/si are first-pass machine translations) ── */
{
  const src = fs.readFileSync(path.join(root, 'sections.jsx'), 'utf8');
  const start = src.indexOf('const i18n = {'); let i = src.indexOf('{', start), depth = 0, end = i;
  for (; end < src.length; end++) { const c = src[end]; if (c === '{') depth++; else if (c === '}') { depth--; if (!depth) break; } }
  const i18n = vm.runInNewContext('(' + src.slice(i, end + 1) + ')');
  const flat = (o, p = '', out = {}) => { if (typeof o === 'string') out[p] = o; else if (Array.isArray(o)) o.forEach((x, k) => flat(x, `${p}[${k}]`, out)); else if (o && typeof o === 'object') for (const k of Object.keys(o)) flat(o[k], p ? `${p}.${k}` : k, out); return out; };
  const en = flat(i18n.en), ta = flat(i18n.ta || {}), si = flat(i18n.si || {});
  for (const k of Object.keys(en)) {
    if (!hasWords(en[k]) || /^\d/.test(en[k]) && !/[a-z]{3}/.test(en[k])) continue;
    dataTexts.add(en[k].trim());
    add({ id: `home:${k}`, surface: 'home', file: 'sections.jsx', context: 'Home page · ' + k.split('.')[0], english: en[k], tamil: ta[k] || '', sinhala: si[k] || '', status: (ta[k] || si[k]) ? 'review' : 'new', notes: [(ta[k] || si[k]) ? 'Existing first-pass machine translation: please correct or replace.' : '', numNote(en[k])].filter(Boolean).join(' ') });
  }
}

/* ── 3. Visible interface text, captured by rendering every view ── */
const pages = [
  ['explainers', 'explainers/', []],
  ['chemmani', 'chemmani/', ['#/overview', '#/timeline', '#/numbers', '#/numbers?v=table', '#/report', '#/disputes', '#/sources']],
  ['budget', 'budget-2027/', ['#/overview', '#/flow', '#/sectors', '#/initiatives', '#/map', '#/new', '#/future', '#/me', '#/land', '#/markets', '#/sources']],
  ['subpages', 'Predictive%20Analytics.html', []], ['subpages', 'Sentiment%20Mapping.html', []], ['subpages', 'Cyber%20Infrastructure.html', []], ['subpages', 'Roadmap.html', []]
];
const collect = () => {
  const out = []; const push = (t, where) => { t = (t || '').replace(/\s+/g, ' ').trim(); if (t) out.push([t, where]); };
  document.querySelectorAll('title').forEach((e) => push(e.textContent, 'page title'));
  document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[property="og:title"], meta[property="og:image:alt"]').forEach((e) => push(e.content, 'search/share description'));
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.parentElement && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(n.parentElement.tagName) ? 1 : 2 });
  // Use the nearest block-level element so a sentence split by <b>/<a> stays one string
  const blocks = new Set();
  while (tw.nextNode()) { let el = tw.currentNode.parentElement; while (el && getComputedStyle(el).display === 'inline' && el.parentElement) el = el.parentElement; blocks.add(el); }
  blocks.forEach((el) => {
    const inlineOnly = [...el.childNodes].every((c) => c.nodeType === 3 || (c.nodeType === 1 && getComputedStyle(c).display === 'inline'));
    const prose = [...el.childNodes].some((c) => c.nodeType === 3 && /[A-Za-z]{2,}/.test(c.textContent)) && [...el.childNodes].every((c) => c.nodeType === 3 || (c.nodeType === 1 && /^inline/.test(getComputedStyle(c).display)));
    if (inlineOnly || prose) push(el.textContent, 'visible text');
    // mixed block: its own text, and inline children such as <b>Key facts</b> next to a <p>
    else el.childNodes.forEach((c) => { if (c.nodeType === 3 || (c.nodeType === 1 && getComputedStyle(c).display === 'inline')) push(c.textContent, 'visible text'); });
  });
  document.querySelectorAll('[aria-label]').forEach((e) => push(e.getAttribute('aria-label'), 'screen-reader label'));
  document.querySelectorAll('[title]').forEach((e) => push(e.getAttribute('title'), 'hover hint'));
  document.querySelectorAll('[placeholder]').forEach((e) => push(e.getAttribute('placeholder'), 'input placeholder'));
  document.querySelectorAll('img[alt]').forEach((e) => push(e.getAttribute('alt'), 'image alt text'));
  document.querySelectorAll('[data-tip]').forEach((e) => e.getAttribute('data-tip').split('|').forEach((t) => push(t, 'chart tooltip')));
  return out;
};
const isNumberish = (s) => /^[\s\d.,%:+\-−–—()\/·×≈>~]*(Rs|USD|bn|tn|M|m|km|pp|%|yrs?)?[\s\d.,%:+\-−–—()\/·×≈]*$/.test(s) || /^Rs\s?[\d.,]+\s?(bn|tn|M)?$/.test(s);
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
const ui = new Map();
for (const [surface, url, routes] of pages) {
  const p = await ctx.newPage();
  for (const r of (routes.length ? routes : [''])) {
    await p.goto(BASE + url + r); await p.waitForTimeout(r ? 450 : 700);
    const view = r ? r.replace('#/', '').split('?')[0] : (surface === 'subpages' ? decodeURIComponent(url) : 'page');
    const grab = async (label) => { for (const [t, where] of await p.evaluate(collect)) { const k = surface + '|' + t; if (!ui.has(k)) ui.set(k, { surface, t, where, view: label }); } };
    await grab(view);
    // Open the first source/initiative panel on the views that have one
    if (surface === 'chemmani' && r === '#/report') { await p.click('.src >> nth=0'); await p.waitForTimeout(300); await grab('source panel'); await p.keyboard.press('Escape'); }
    if (surface === 'budget' && r === '#/initiatives') { const btn = await p.$('[data-act="open"]'); if (btn) { await btn.click(); await p.waitForTimeout(300); await grab('initiative panel'); await p.keyboard.press('Escape'); } }
    // STATES=1: also click through each Budget view's controls (tabs, toggles, selects, drawers), so text that
    // only appears after an interaction is captured too
    if (STATES && surface === 'budget') {
      const SEL = '#view button, #view select, #view .seg a, #view [role="tab"], #view summary';
      const n = await p.evaluate((q) => document.querySelectorAll(q).length, SEL);
      for (let i = 0; i < Math.min(n, 60); i++) {
        try {
          const h = (await p.$$(SEL))[i]; if (!h) continue;
          if (await h.evaluate((e) => e.tagName === 'SELECT')) {
            for (const o of (await h.evaluate((e) => [...e.options].map((x) => x.value))).slice(1)) { await h.selectOption(o); await p.waitForTimeout(120); await grab(view + ' (after a choice)'); }
            await h.selectOption({ index: 0 }); continue;
          }
          if (!(await h.isVisible())) continue;
          await h.click({ timeout: 1500 }); await p.waitForTimeout(220); await grab(view + ' (after a click)');
          if (await p.$('.drawer.open')) { await p.keyboard.press('Escape'); await p.waitForTimeout(150); }
          if (!p.url().endsWith(r)) { await p.goto(BASE + url + r); await p.waitForTimeout(350); }
        } catch (e) { }
      }
      if (r === '#/initiatives') { await p.fill('#view input', 'zzzzqq'); await p.waitForTimeout(400); await grab('initiatives (no results)'); }
    }
  }
  if (STATES && surface === 'budget') { // the error state, shown if a view fails to draw
    await p.goto(BASE + url + '#/overview'); await p.waitForTimeout(400);
    await p.evaluate(() => { window.BX.views.flow.mount = () => { throw new Error('test'); }; location.hash = '#/flow'; }); await p.waitForTimeout(400);
    for (const [t, where] of await p.evaluate(collect)) { const k = surface + '|' + t; if (!ui.has(k)) ui.set(k, { surface, t, where, view: 'error state' }); }
  }
  await p.close();
}
await b.close();
const MON = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*';
const places = [...Object.keys(B27.DIST), ...Object.values(B27.PROV)].sort((a, b) => b.length - a.length);
const dataLists = {}; for (const k of Object.keys(dataBy)) dataLists[k] = [...dataBy[k]].filter((d) => d.length >= 20).sort((a, b) => b.length - a.length);
const allData = [...dataTexts].filter((d) => d.length >= 8);
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function templ(t, surface) {
  if (/^Source: .*Open details$/.test(t)) return 'Source: {source}, {page}. Open details';
  for (const d of (dataLists[surface] || [])) if (t !== d && t.includes(d)) t = t.split(d).join('{text}');
  t = t.replace(new RegExp(`\\b\\d{1,2}(?:–\\d{1,2})? ${MON} \\d{4}\\b`, 'g'), '{date}').replace(new RegExp(`\\b${MON} \\d{4}\\b`, 'g'), '{date}');
  if (t.length < 40) for (const pl of places) t = t.replace(new RegExp(`\\b${esc(pl)}\\b(?! Monitor)`, 'g'), '{place}');
  t = t.replace(/(?:Rs|USD)\s?[\d,.]+\s?(?:tn|bn|M|m)?/g, '{amount}').replace(/[−+-]?\d[\d,.]*\s?(?:tn|bn|M)\b/g, '{amount}');
  t = t.replace(/[−+-]?\d[\d,.]*/g, '{n}');
  return t;
}
const seenT = new Set();
for (const v of ui.values()) {
  let { surface, t, where, view } = v;
  if (!hasWords(t) || isNumberish(t) || dataTexts.has(t)) continue;
  if (t.length > 600) continue; // whole-block captures of data lists
  if (/…$/.test(t) && allData.some((d) => d.startsWith(t.slice(0, -1).trim()))) continue; // shortened data titles
  const orig = t; t = templ(t, surface);
  if (!/[A-Za-z]{2,}/.test(t.replace(/\{[a-z]+\}/g, ''))) continue; // nothing left to translate
  const key = surface + '|' + t; if (seenT.has(key)) continue; seenT.add(key);
  v.t = t; v.example = orig !== t ? orig : '';
  const { example } = v;
  const file = surface === 'explainers' ? 'explainers/index.html' : surface === 'chemmani' ? 'chemmani/index.html, chemmani/js/app.js' : surface === 'budget' ? 'budget-2027/index.html, budget-2027/js/*.js' : 'sub-pages (*.html)';
  const ph = /\{[a-z]+\}/.test(t) ? 'Placeholders in {braces} are filled in automatically: keep them, and move them if the word order needs it.' + (example ? ` Example: "${example.slice(0, 160)}"` : '') : numNote(t);
  add({ id: `${surface}:ui:${hash(t)}`, surface, file, context: `${surface === 'subpages' ? view : surface + ' · ' + view} · ${where}`, english: t, notes: ph });
}

['January','February','March','April','May','June','July','August','September','October','November','December'].forEach((m, i) => { add({ id: `common:month.${i + 1}`, surface: 'common', file: 'all explainers', context: 'Month name (dates like 22 Nov 2026)', english: m, notes: 'Also give the short form if you use one, e.g. in the notes column.' }); });

/* ── 4. Social post (image text and captions) ── */
const social = [
  ['img.title', 'Image · heading', 'Explainers', 'எக்ஸ்பிளைனர்ஸ்'],
  ['img.def', 'Image · description', 'Public issues in Sri Lanka, worked through from the documents. Every figure links to the page it came from. Where sources disagree, you see both.', 'இலங்கையின் பொதுப் பிரச்சினைகள், ஆவணங்களின் அடிப்படையில் ஆராயப்பட்டுள்ளன. ஒவ்வொரு தரவும் அது எடுக்கப்பட்ட மூலப் பக்கத்துடன் இணைக்கப்பட்டுள்ளது. ஆதாரங்கள் முரண்படும் இடங்களில், இரு தரப்புத் தகவல்களையும் நீங்கள் காணலாம்.'],
  ['img.chemmani', 'Image · explainer title', 'Chemmani: what the record shows', 'செம்மணி: ஆவணங்கள் சொல்வதென்ன?'],
  ['img.chemmani.meta', 'Image · explainer figures', '36 sources · 43 dated events · 9 disputes side by side', '36 ஆதாரங்கள் · 43 திகதியிடப்பட்ட நிகழ்வுகள் · 9 முரண்பட்ட தகவல்கள் (ஒப்பீட்டுடன்)'],
  ['img.budget', 'Image · explainer title', 'Sri Lanka Budget 2027', 'இலங்கை வரவுசெலவுத் திட்டம் 2027'],
  ['img.budget.meta', 'Image · explainer figures', '267 initiatives · 84 capital projects · 29 laws', '267 முன்முயற்சிகள் · 84 மூலதனத் திட்டங்கள் · 29 சட்டங்கள்'],
  ['img.grade.court', 'Image · grade tag', 'Court finding', 'நீதிமன்றக் கண்டறிதல்'],
  ['img.grade.record', 'Image · grade tag', 'Official record', 'உத்தியோகபூர்வ ஆவணம்'],
  ['img.grade.ngo', 'Image · grade tag', 'Rights group', 'உரிமைகள் அமைப்பு'],
  ['img.grade.news', 'Image · grade tag', 'News report', 'செய்தி அறிக்கை'],
  ['img.grade.claim', 'Image · grade tag', 'Claim', 'கூற்று'],
  ['img.gnote', 'Image · note under tags', 'Each statement is tagged by the kind of source behind it.', 'ஒவ்வொரு கூற்றும் அதன் பின்னணியில் உள்ள ஆதாரத்தின் வகையைக் கொண்டு அடையாளப்படுத்தப்பட்டுள்ளது.'],
  ['img.free', 'Image · footer', 'Free to read · More coming', 'இலவசமாக வாசிக்கலாம் · மேலும் பல வரவுள்ளன']
];
social.forEach(([k, c, en, ta]) => add({ id: `social:${k}`, surface: 'social', file: 'docs/social/explainers-post*.html', context: c, english: en, tamil: ta, status: 'ta-done', notes: 'Tamil supplied by you for the Tamil image.' }));
{
  const cap = fs.readFileSync(path.join(root, 'docs/social/explainers-caption.md'), 'utf8');
  const main = cap.split('## Caption (LinkedIn, Facebook, Instagram)')[1].split('## Short version')[0].trim().split(/\n\s*\n/).filter((x) => !/^\(On Instagram/.test(x));
  main.forEach((para, i) => add({ id: `social:caption.${i + 1}`, surface: 'social', file: 'docs/social/explainers-caption.md', context: `Caption · paragraph ${i + 1}`, english: para.trim(), notes: numNote(para) }));
  add({ id: 'social:caption.instagram', surface: 'social', file: 'docs/social/explainers-caption.md', context: 'Caption · Instagram last line', english: 'Link in bio.' });
  const short = cap.split('## Short version (X / Threads, under 280 characters)')[1].split('## Image alt text')[0].trim();
  add({ id: 'social:caption.short', surface: 'social', file: 'docs/social/explainers-caption.md', context: 'Caption · short version for X/Threads (keep under 280 characters)', english: short, notes: 'Keep under 280 characters including the link.' });
  const alt = cap.split('## Image alt text')[1].trim();
  add({ id: 'social:alt', surface: 'social', file: 'docs/social/explainers-caption.md', context: 'Image alt text', english: alt, notes: numNote(alt) });
}

/* ── write CSV (UTF-8 with BOM so Excel shows Tamil and Sinhala) ── */
const order = { explainers: 0, common: 1, home: 2, subpages: 3, chemmani: 4, budget: 5, social: 6 };
rows.sort((a, b) => (order[a.surface] - order[b.surface]) || (a.id.includes(':ui:') === b.id.includes(':ui:') ? 0 : a.id.includes(':ui:') ? -1 : 1));
const cols = ['id', 'surface', 'file', 'context', 'english', 'tamil', 'sinhala', 'status', 'notes'];
const q = (v) => { v = String(v ?? ''); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const csv = '﻿' + [cols.join(','), ...rows.map((r) => cols.map((c) => q(r[c])).join(','))].join('\r\n') + '\r\n';
fs.mkdirSync(path.join(root, 'docs/i18n'), { recursive: true });
fs.writeFileSync(path.isAbsolute(OUT) ? OUT : path.join(root, OUT), csv);
const by = {}; rows.forEach((r) => { by[r.surface] = by[r.surface] || { rows: 0, words: 0 }; by[r.surface].rows++; by[r.surface].words += r.english.split(/\s+/).length; });
console.log(JSON.stringify(by), 'total rows', rows.length);
