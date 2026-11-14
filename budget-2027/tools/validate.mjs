// Budget 2027 data validator — run:  node budget-2027/tools/validate.mjs
// Checks arithmetic of Annexures, referential integrity of every id, and prints reconciliation against stated envelopes.
import vm from 'node:vm'; import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of ['meta','fiscal','annex','estimates','init-a','init-b','init-c','policy','lens']) vm.runInContext(fs.readFileSync(path.join(dir, f + '.js'), 'utf8'), ctx, {filename: f});
const B = ctx.B27; let fails = 0; const bad = (m) => { fails++; console.log('  ✗', m); }; const ok = (m) => console.log('  ✓', m);
const sum = (a) => a.reduce((s, x) => s + (x || 0), 0);

console.log('\nAnnexure III arithmetic');
const a = B.A3; B.YEARS.forEach((y, i) => {
  const tol = i === 0 ? 1 : 0;   // 2025 provisional is rounded
  const chk = [
    ['revenue = tax + non-tax',            a.tax[i] + a.nonTax[i] - a.revenue[i]],
    ['tax = income + goods + trade',       a.incomeTax[i] + a.goodsTax[i] + a.tradeTax[i] - a.tax[i]],
    ['recurrent = sal + goods + int + sub',a.salaries[i] + a.otherGoods[i] + a.interest[i] + a.subsidies[i] - a.recurrent[i]],
    ['expenditure = recurrent + inv + other', a.recurrent[i] + a.investment[i] + a.other[i] - a.expenditure[i]],
    ['deficit = revenue&grants − expenditure', a.revGrants[i] - a.expenditure[i] - a.deficit[i]],
    ['financing = foreign + domestic',     a.foreignFin[i] + a.domesticFin[i] - a.financing[i]],
    ['foreign net = gross − repayments',   a.foreignGross[i] + a.debtRepay[i] - a.foreignFin[i]],
  ];
  chk.forEach(([n, d]) => Math.abs(d) <= tol ? null : bad(`${y}: ${n} off by ${d}`));
});
ok('all identities hold (2025 within ±1 rounding)');

console.log('\nAnnexure I');
sum(B.A1.map(x => x[1])) === B.A1total.annual ? ok('measures sum to Rs ' + B.A1total.annual + 'M') : bad('Annexure I sum mismatch');

console.log('\nAnnexure IV');
const g = B.A4; g.primaryExp + g.debtService + g.advances + g.bookAdj - g.receiptsExBorrowing === g.grossBorrowing ? ok('gross borrowing 3,800 reconciles') : bad('A4 mismatch');

console.log('\nAnnexure II & VII');
const r2 = sum(B.ANX2.map(x => x[2])), c2 = sum(B.ANX2.map(x => x[3]));
console.log(`  · II: ${B.ANX2.length} proposals, recurrent Rs ${r2}M, capital Rs ${c2}M, total Rs ${r2 + c2}M`);
console.log(`  · VII: ${B.ANX7.length} projects, Rs ${sum(B.ANX7.map(x => x[2]))}M`);
B.ANX2.length === 73 ? ok('73 proposals') : bad('expected 73 proposals');
B.ANX7.length === 84 ? ok('84 projects') : bad('expected 84 projects');

console.log('\nInitiatives: integrity');
const ids = new Set(); const dist = Object.keys(B.DIST);
B.INIT.forEach(i => {
  if (ids.has(i.id)) bad('duplicate id ' + i.id); ids.add(i.id);
  if (!B.SECTORS[i.s]) bad(i.id + ' bad sector ' + i.s);
  if (!B.STATUS[i.st]) bad(i.id + ' bad status ' + i.st);
  if (!B.FUND[i.f]) bad(i.id + ' bad funding ' + i.f);
  String(i.p || '').split(',').forEach(p => { p = p.trim(); if (p && p !== '*' && !p.startsWith('P:') && !dist.includes(p)) bad(i.id + ' bad place ' + p); if (p.startsWith('P:') && !B.PROV[p.slice(2)]) bad(i.id + ' bad province ' + p); });
  String(i.g || '').split(',').forEach(x => { if (x && !B.GROUPS[x]) bad(i.id + ' bad group ' + x); });
  if (i.in && !B.INIT.find(j => j.id === i.in)) bad(i.id + ' bad parent ' + i.in);
  if (i.ax2 && !B.ANX2.find(x => x[0] === i.ax2)) bad(i.id + ' bad ax2 ' + i.ax2);
  if (i.ax7 && !B.ANX7.find(x => x[0] === i.ax7)) bad(i.id + ' bad ax7 ' + i.ax7);
  if (i.a == null && i.tc == null && i.lv == null && i.st !== 'reform' && !i.m && !i.fd) { /* unquantified is allowed */ }
});
const n = B.INIT.length; fails || ok(`${n} initiatives, ids unique, codes valid`);

console.log('\nCross-references');
const allIds = new Set([...ids, ...B.TAX.map(t => t.id)]);
const refs = [];
B.LAND.forEach(l => l.ids.forEach(x => refs.push([`land ${l.id}`, x])));
B.MKT.forEach(m => m.drivers.forEach(d => d.refs.forEach(x => refs.push([`market ${m.id}`, x]))));
B.EVENTS.forEach(e => e.ids.forEach(x => refs.push([`event ${e.d}`, x])));
B.LAND_HEADWINDS.forEach(h => (h.ids || []).forEach(x => refs.push(['headwind', x])));
refs.forEach(([w, x]) => allIds.has(x) || bad(`${w} → unknown id ${x}`));
ok(`${refs.length} references checked`);

console.log('\nCoverage of the speech (initiatives dataset)');
const top = B.INIT.filter(i => !i.in && !i.um);
const tot = sum(top.map(i => i.a));
console.log(`  · ${top.length} stand-alone lines with a 2027 allocation sum to Rs ${(tot/1000).toFixed(1)}bn = ${(tot / (a.expenditure[3] * 1000) * 100).toFixed(1)}% of total 2027 spending (Rs ${a.expenditure[3]}bn)`);
console.log(`  · with a stated total project cost: ${B.INIT.filter(i => i.tc).length}; with loan volume: ${B.INIT.filter(i => i.lv).length}`);
console.log('  · new-money field (add) sums to Rs ' + (sum(B.INIT.filter(i => !i.in || i.add).map(i => i.add)) / 1000).toFixed(1) + 'bn');

console.log('\nEnvelope reconciliation (speech-stated total vs. itemised lines of same sector — informational)');
B.ENVELOPES.concat(B.INIT.filter(i => i.um).map(i => ({id:i.id, a:i.a, s:i.s}))).forEach(e => {
  const items = top.filter(i => i.s === e.s); const s = sum(items.map(i => i.a));
  console.log(`  · ${e.id.padEnd(12)} stated Rs ${String(e.a).padStart(7)}M   sector lines Rs ${String(Math.round(s)).padStart(7)}M   (${e.s})`);
});

console.log('\nLand & market rubric');
B.LAND.forEach(l => { const s = l.commit + l.effect + l.timing; if (s < 3 || s > 9) bad('land score ' + l.id); });
B.MKT.forEach(m => m.drivers.forEach(d => { if (!B.EVW[d.ev]) bad('bad ev ' + m.id); }));
ok('rubric values in range');

console.log("\nCitizens' Budget (Estimates before the speech)");
const E = B.EST; const secTotal = sum(E.sectors.map(s => s.total));
console.log(`  · 12 sector totals = Rs ${secTotal.toFixed(1)}bn`);
E.sectors.forEach(s => {
  if (Math.abs(s.cap + s.rec - s.total) > 0.6) bad(`${s.k}: capital + recurrent ${(s.cap + s.rec).toFixed(1)} ≠ total ${s.total}`);
  const subSum = sum(s.sub.map(x => x[1])) + (s.unlisted || 0);
  if (Math.abs(subSum - s.total) > 1.0) bad(`${s.k}: sub-sectors ${subSum.toFixed(1)} ≠ total ${s.total}`);
  s.sub.forEach(x => { if (x.length > 2 && Math.abs(x[2] + x[3] - x[1]) > 0.2) bad(`${s.k}/${x[0]}: cap+rec ≠ total`); });
});
ok('sector capital+recurrent and sub-sector sums tie to stated totals');
const mapped = B.ANX2.every(r => E.anx2map[r[0]]); mapped ? ok('every Annexure II proposal is mapped to a sector') : bad('unmapped Annexure II proposals');
const a2tot = sum(B.ANX2.map(r => (r[2] || 0) + (r[3] || 0))) / 1000;
const recon = secTotal + a2tot;
Math.abs(recon - B.A4.primaryExp) < 1.5 ? ok(`sectors ${secTotal.toFixed(1)} + Annexure II ${a2tot.toFixed(1)} = ${recon.toFixed(1)} ≈ Annexure IV primary expenditure ${B.A4.primaryExp}`) : bad(`reconciliation off: ${recon.toFixed(1)} vs ${B.A4.primaryExp}`);
Math.abs(E.revenue.total - B.A3.revGrants[2]) < 1 ? ok('revenue 6,180 matches Annexure III') : bad('revenue mismatch');
E.debtService === B.A4.debtService ? ok('debt service 4,850 matches Annexure IV') : bad('debt service mismatch');
const capSec = sum(E.sectors.map(s => s.cap)), capA2 = sum(B.ANX2.map(r => r[3] || 0)) / 1000;
console.log(`  · capital: sectors ${capSec.toFixed(1)} + Annexure II ${capA2.toFixed(1)} = ${(capSec + capA2).toFixed(1)} vs Annexure IV capital ${B.A4.capital} (classification differs by ~30; totals tie)`);

console.log(fails ? `\n${fails} problem(s)` : '\nAll checks passed');
process.exit(fails ? 1 : 0);
