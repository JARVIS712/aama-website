// Self-audit of the on-page SEO basics for every page in sitemap.xml, using a local static server.
// Run:  (cd <repo> && python3 -m http.server 8765 &)  then  PW=$(npm root -g)/playwright node docs/seo-check.mjs
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url'; import {createRequire} from 'node:module';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(import.meta.url)(process.env.PW || 'playwright');
const BASE = process.env.BASE || 'http://localhost:8765', HOST = 'https://www.aama.lk';
const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'); const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const b = await chromium.launch(); let problems = 0; const rows = [];
for (const loc of locs) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  const pathName = loc.replace(HOST, ''); const raw = await (await fetch(BASE + pathName)).text();           // what a non-JS crawler gets
  await p.goto(BASE + pathName, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const m = (s, a = 'content') => (document.querySelector(s) || {}).getAttribute?.(a) || '';
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { JSON.parse(s.textContent); return 'valid'; } catch { return 'INVALID'; } });
    return { title: document.title, desc: m('meta[name=description]'), canonical: m('link[rel=canonical]', 'href'), lang: document.documentElement.lang, h1: [...document.querySelectorAll('h1')].map(h => h.textContent.trim().slice(0, 70)),
      ogTitle: m('meta[property="og:title"]'), ogImg: m('meta[property="og:image"]'), ogUrl: m('meta[property="og:url"]'), twitter: m('meta[name="twitter:card"]'), ld,
      imgNoAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length, viewport: !!document.querySelector('meta[name=viewport]'),
      internalLinks: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => h && !/^(https?:|mailto:|tel:|#)/.test(h)) };
  });
  const noJsH1 = /<h1[\s>]/.test(raw), noJsText = raw.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
  const issues = [];
  if (r.title.length < 30 || r.title.length > 65) issues.push(`title length ${r.title.length} ("${r.title}")`);
  if (r.desc.length < 70 || r.desc.length > 160) issues.push(`description length ${r.desc.length}`);
  if (r.canonical !== loc) issues.push(`canonical ${r.canonical || 'missing'} ≠ ${loc}`);
  if (r.ogUrl !== loc) issues.push('og:url mismatch'); if (!r.ogImg) issues.push('og:image missing'); if (!r.twitter) issues.push('twitter:card missing');
  if (r.h1.length !== 1) issues.push(`h1 count ${r.h1.length}`); if (!r.lang) issues.push('html lang missing'); if (!r.viewport) issues.push('viewport missing');
  if (r.imgNoAlt) issues.push(`${r.imgNoAlt} images without alt`); if (r.ld.includes('INVALID')) issues.push('invalid JSON-LD'); if (errs.length) issues.push('JS errors: ' + errs[0]);
  if (!noJsH1 || noJsText < 200) issues.push(`without JavaScript: h1 ${noJsH1 ? 'yes' : 'NO'}, ${noJsText} chars of text`);
  for (const h of new Set(r.internalLinks)) { const t = decodeURIComponent(h.split('#')[0].split('?')[0]); if (!t) continue; const f = path.join(root, t.startsWith('/') ? t.slice(1) : path.dirname(pathName === '/' ? 'x' : pathName.slice(1)) === '.' ? t : t); if (!fs.existsSync(f) && !fs.existsSync(path.join(root, pathName.slice(1).replace(/[^/]*$/, ''), t))) issues.push('broken internal link: ' + h); }
  problems += issues.length; rows.push({ loc, issues, r, noJsText }); await p.close();
}
await b.close();
for (const { loc, issues, r, noJsText } of rows) { console.log(`\n${loc}\n  title(${r.title.length}) desc(${r.desc.length}) h1=${JSON.stringify(r.h1)} lang=${r.lang} jsonld=${r.ld.join(',') || 'none'} noJS-text=${noJsText}ch`); console.log(issues.length ? issues.map(i => '  ✗ ' + i).join('\n') : '  ✓ no issues'); }
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'); console.log('\nrobots.txt references sitemap:', /Sitemap:\s*https:\/\/www\.aama\.lk\/sitemap\.xml/.test(robots));
for (const l of locs) { const f = decodeURIComponent(l.replace(HOST, '')); const file = f.endsWith('/') ? f.slice(1) + 'index.html' : f.slice(1) || 'index.html'; if (!fs.existsSync(path.join(root, file === '' ? 'index.html' : file))) { console.log('  ✗ sitemap URL has no file:', l); problems++; } }
console.log(problems ? `\n${problems} issue(s)` : '\nAll on-page checks passed'); process.exit(problems ? 1 : 0);
