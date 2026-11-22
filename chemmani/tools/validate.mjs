// Checks every citation points to a known source, and that plotted counts are dated and graded.
// Run: node chemmani/tools/validate.mjs
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'data');
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of ['sources.js', 'facts.js']) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
const C = ctx.window.CH; const bad = []; const used = new Set();
const ref = (id, where) => { if (!C.SOURCES[id]) bad.push(`${where}: unknown source ${id}`); else used.add(id); };
const refs = (x, where) => (x.s || []).forEach((r) => ref(Array.isArray(r) ? r[0] : r, where));
C.EVENTS.forEach((e, i) => { refs(e, `event ${i}`); if (!C.GRADES[e.g]) bad.push(`event ${i}: grade ${e.g}`); if (!e.s.length) bad.push(`event ${i}: no source`); if (e.g === 'claim' && !e.who) bad.push(`event ${i}: claim without speaker`); });
C.COUNTS.forEach((c, i) => { refs(c, `count ${i}`); if (!C.MEASURES[c.m]) bad.push(`count ${i}: measure`); if (!/^\d{4}-\d{2}-\d{2}$/.test(c.d)) bad.push(`count ${i}: date`); });
C.KEY.forEach((k, i) => refs(k, `key ${i}`));
C.UNKNOWNS.forEach((k, i) => refs(k, `unknown ${i}`));
C.READINGS.forEach((r, i) => ['a', 'b', 'c'].forEach((k) => r[k] && refs(r[k], `reading ${i}${k}`)));
C.DISPUTES.forEach((d) => d.rows.forEach((r) => ref(r[2], `dispute ${d.id}`)));
[...C.REPORT.says, ...C.REPORT.notes, ...C.REPORT.stats].forEach((x, i) => ref(x.s[0], `report ${i}`));
ref(C.REPORT.agesSrc[0], 'ages'); ref(C.REPORT.orientSrc[0], 'orient');
const sumAges = C.REPORT.ages.reduce((s, a) => s + a[1], 0), sumOr = C.REPORT.orient.reduce((s, a) => s + a[1], 0);
const unused = Object.keys(C.SOURCES).filter((k) => !used.has(k));
console.log(`events ${C.EVENTS.length}, counts ${C.COUNTS.length}, sources ${Object.keys(C.SOURCES).length}, age chart sums to ${sumAges}%, orientation sums to ${sumOr}%`);
if (unused.length) console.log('sources not cited anywhere:', unused.join(', '));
if (bad.length) { console.error(bad.join('\n')); process.exit(1); } else console.log('OK');
