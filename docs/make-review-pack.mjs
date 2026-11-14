// Generates docs/land-market-review-pack.html (and .pdf via Playwright) from the live data files.
// Run: node docs/make-review-pack.mjs   (needs Playwright; if installed globally: PW=$(npm root -g)/playwright node docs/make-review-pack.mjs)
import vm from 'node:vm'; import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
for (const f of ['meta','fiscal','annex','init-a','init-b','init-c','policy','personas','lens']) vm.runInContext(fs.readFileSync(path.join(root,'budget-2027/data',f+'.js'),'utf8'),ctx);
const B = ctx.B27; const I = Object.fromEntries(B.INIT.map(i=>[i.id,i])); const T = Object.fromEntries(B.TAX.map(t=>[t.id,t]));
const esc = s => String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const rs = m => m==null?'—':Math.abs(m)>=1e6?`Rs ${(m/1e6).toFixed(2)}tn`:Math.abs(m)>=1000?`Rs ${+(m/1000).toFixed(1)}bn`:`Rs ${m}M`;
const src = id => { const i=I[id], t=T[id]; if(i) return `${esc(i.t.replace(/\s*\([^)]*\)/g,'').slice(0,70))} <span class="ref">[${esc(i.ref||'')}${i.a?`, ${rs(i.a)}`:''}]</span>`; if(t) return `${esc(t.t.slice(0,70))} <span class="ref">[tax, ${esc(t.ref)}]</span>`; return esc(id); };
const sumA = ids => ids.map(x=>I[x]).filter(i=>i&&!i.in&&!i.um).reduce((s,i)=>s+(i.a||0),0);
const LV={commit:['','Study / intent','Funded or tendered','Funded & under way'],effect:['','Indirect','Local amenity / utility','Direct access or demand shock'],timing:['','After 2030','2028–2030','By 2028']};
const sig = l => { const s=l.commit+l.effect+l.timing; return s>=8?'High':s>=6?'Medium':'Watch'; };
const score = (m,h,evs)=>m.drivers.filter(d=>d.h<=h&&evs.includes(d.ev)).reduce((s,d)=>s+d.dir*d.str*B.EVW[d.ev],0);
const HZ={1:'≤12 months',2:'12–24 months',3:'>24 months'}, EV={A:'A · funded & dated',B:'B · funded / needs partner',C:'C · intent only'};
const dirTxt = d => d>0?'Tailwind (+)':d<0?'Headwind (−)':'Neutral (0)';

let h = `<!doctype html><html><head><meta charset="utf-8"><title>Land & Market lens — review pack</title><style>
@page{size:A4;margin:16mm 14mm}body{font:10.5pt/1.45 Inter,system-ui,Segoe UI,sans-serif;color:#111}h1{font-size:22pt;margin:0 0 4pt}h2{font-size:15pt;margin:22pt 0 6pt;border-bottom:1.5pt solid #111;padding-bottom:3pt;break-after:avoid}h3{font-size:12pt;margin:16pt 0 4pt;break-after:avoid}h4{font-size:10pt;text-transform:uppercase;letter-spacing:.05em;margin:10pt 0 3pt;color:#555}
table{border-collapse:collapse;width:100%;margin:6pt 0 10pt;font-size:9pt}th,td{border:.6pt solid #bbb;padding:4pt 6pt;text-align:left;vertical-align:top}th{background:#f0eee8}.n{text-align:right;white-space:nowrap}
.box{border:1pt solid #111;padding:8pt 10pt;margin:8pt 0;background:#faf8f4}.warn{border-color:#b26a00;background:#fff7e8}.ref{color:#666;font-size:8pt}.muted{color:#555}.chk td{height:22pt}
.pill{display:inline-block;padding:1pt 6pt;border-radius:8pt;background:#eee;font-size:8.5pt}.hi{background:#cfe8df}.md{background:#e9e2c8}.lo{background:#eee}.card{break-inside:avoid;border:.6pt solid #bbb;border-radius:4pt;padding:8pt 10pt;margin:8pt 0}ul{margin:3pt 0 3pt 14pt;padding:0}li{margin:1pt 0}
</style></head><body>
<h1>Land & Market lens — review pack</h1>
<p class="muted">AAMA · Budget 2027 explorer · generated ${new Date().toISOString().slice(0,10)} from the live data files · <b>Confidential — for reviewers</b></p>

<div class="box"><b>What we are asking you to confirm.</b> Two pages of the Budget 2027 explorer contain AAMA's own analysis (not statements from the Budget Speech): the <b>Land lens</b> (which funded projects could change land demand, ranked) and the <b>Market lens</b> (which kinds of listed business the Budget's measures lean towards or against). Neither predicts prices and neither names any company or share. Please review the scoring method, each score and its stated reasoning, and the wording, then mark the sign-off table in §6.</div>

<h2>1. What readers see (published wording)</h2>
<div class="box warn"><b>Land page banner:</b> "This is not a valuation or advice. The Budget changes no land or property tax. These corridors are ranked on how firm the commitment is, how directly it changes access, and when it lands. Land prices also depend on title, zoning, plot size and local supply, none of which we have."</div>
<div class="box warn"><b>Markets page banner:</b> "Not investment advice. Nobody can say which shares will go up in the next two years. This page shows <i>policy exposure</i>: which measures help or hurt which kinds of business, with the evidence behind each. Share prices also depend on valuation, earnings, interest rates, and events no Budget covers. AAMA is not a licensed investment adviser. Pending analyst and compliance review before publication."</div>
<p>Every analytical claim is tagged <span class="pill">AAMA analysis</span>; statements taken from the speech are tagged <span class="pill hi">From the speech</span>. The page footer repeats: "not valuation, investment, tax or legal advice, and not predictions of prices."</p>

<h2>2. Part A — Land lens</h2>
<h3>2.1 Method</h3>
<p>Each corridor gets three scores, 1–3 each. <b>Signal = sum (3–9)</b>: High 8–9 · Medium 6–7 · Watch ≤5.</p>
<table><tr><th>Dimension</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>Commitment</td><td>${LV.commit[1]}</td><td>${LV.commit[2]}</td><td>${LV.commit[3]}</td></tr>
<tr><td>Effect on land</td><td>${LV.effect[1]}</td><td>${LV.effect[2]}</td><td>${LV.effect[3]}</td></tr>
<tr><td>Timing</td><td>${LV.timing[1]}</td><td>${LV.timing[2]}</td><td>${LV.timing[3]}</td></tr></table>
<p class="muted">Not used: any price data, zoning, title status, historical price response, or local supply. The "effect" score rests on general reasoning that better access (interchanges, stations, airports, ports) tends to raise demand nearby; <b>this has not yet been tested against official land-price series</b>.</p>
<h3>2.2 Summary (default sort)</h3>
<table><tr><th>Corridor</th><th>Districts</th><th class="n">C</th><th class="n">E</th><th class="n">T</th><th>Signal</th><th>Window</th><th class="n">Linked 2027 allocations</th></tr>`;
const L = B.LAND.slice().sort((a,b)=>(b.commit+b.effect+b.timing)-(a.commit+a.effect+a.timing)||sumA(b.ids)-sumA(a.ids));
L.forEach(l=>{h+=`<tr><td><b>${esc(l.name)}</b></td><td>${esc(l.d.join(', ')||'Island-wide')}</td><td class="n">${l.commit}</td><td class="n">${l.effect}</td><td class="n">${l.timing}</td><td><span class="pill ${sig(l)==='High'?'hi':sig(l)==='Medium'?'md':'lo'}">${sig(l)} ${l.commit+l.effect+l.timing}/9</span></td><td>${esc(l.when)}</td><td class="n">${rs(sumA(l.ids))}</td></tr>`});
h+=`</table><p class="muted">“Linked 2027 allocations” adds the 2027 amounts of the cited speech lines. A line serving several corridors is counted in each, and some cited lines are large regional programmes (e.g. Mahaweli canals under Anuradhapura), so treat it as indicative, not as spending in that corridor.</p><h3>2.3 Each corridor: reasoning, evidence and risks</h3>`;
L.forEach(l=>{h+=`<div class="card"><b>${esc(l.name)}</b> — ${esc(l.sub)} <span class="pill ${sig(l)==='High'?'hi':sig(l)==='Medium'?'md':'lo'}">${sig(l)} ${l.commit+l.effect+l.timing}/9</span>
<p><b>Why it matters (as published):</b> ${esc(l.why)}</p>
<p><b>Scores:</b> Commitment ${l.commit} (${LV.commit[l.commit]}) · Effect ${l.effect} (${LV.effect[l.effect]}) · Timing ${l.timing} (${LV.timing[l.timing]}) · Window: ${esc(l.when)}</p>
<p><b>Watch for:</b> ${esc(l.watch)}<br><b>Risks:</b> ${esc(l.risk)}</p>
<h4>Evidence in the speech</h4><ul>${l.ids.filter(x=>I[x]||T[x]).map(x=>`<li>${src(x)}</li>`).join('')}</ul></div>`});
h+=`<h3>2.4 Headwinds section (as published)</h3><table><tr><th>Item</th><th>Type</th><th>Text</th></tr>${B.LAND_HEADWINDS.map(x=>`<tr><td><b>${esc(x.t)}</b></td><td>${x.kind==='fact'?'From the speech':'AAMA analysis'}</td><td>${esc(x.d)}</td></tr>`).join('')}</table>

<h2>3. Part B — Market lens (sector-level only)</h2>
<h3>3.1 Method</h3>
<p>For each sector, list the Budget measures that help (+) or hurt (−) that kind of business. Each driver has a <b>strength</b> (1–3), an <b>evidence grade</b> and a <b>horizon</b>.</p>
<p><b>Score = Σ direction (±1) × strength × evidence weight</b>, over drivers within the chosen horizon. Weights: A ${B.EVW.A} · B ${B.EVW.B} · C ${B.EVW.C}.</p>
<table><tr><th>Evidence grade</th><th>Meaning</th></tr><tr><td>A</td><td>Funded and dated in the speech</td></tr><tr><td>B</td><td>Funded or tendered, or needs a private/PPP partner not yet chosen</td></tr><tr><td>C</td><td>Policy intent only</td></tr></table>
<p class="muted">The score is a ranking aid for "policy exposure". It is <b>not</b> a return forecast and does not include valuation, earnings, rates, or anything outside the Budget. Strength ratings are editorial judgement and are the main thing to challenge.</p>
<h3>3.2 Scores under three reader settings</h3>
<table><tr><th>Sector</th><th class="n">12 months, all evidence</th><th class="n">24 months, all evidence (default)</th><th class="n">24 months, grade A only</th></tr>`;
const M = B.MKT.map(m=>({m,a:score(m,1,['A','B','C']),b:score(m,2,['A','B','C']),c:score(m,2,['A'])})).sort((x,y)=>y.b-x.b);
M.forEach(r=>{h+=`<tr><td>${esc(r.m.name)}</td><td class="n">${r.a.toFixed(1)}</td><td class="n"><b>${r.b.toFixed(1)}</b></td><td class="n">${r.c.toFixed(1)}</td></tr>`});
h+=`</table><h3>3.3 Drivers by sector (full list)</h3>`;
M.forEach(({m})=>{h+=`<h4>${esc(m.name)} — default score ${score(m,2,['A','B','C']).toFixed(1)}</h4><table><tr><th>Driver</th><th>Direction</th><th class="n">Str.</th><th>Evidence</th><th>Horizon</th><th>Reasoning (published)</th><th>Risk (published)</th><th>Speech sources</th></tr>${m.drivers.map(d=>`<tr><td>${esc(d.t)}</td><td>${dirTxt(d.dir)}</td><td class="n">${d.str}</td><td>${EV[d.ev]}</td><td>${HZ[d.h]}</td><td>${esc(d.why)}</td><td>${esc(d.risk)}</td><td>${d.refs.length?d.refs.map(src).join('<br>'):'<span class="muted">none (macro / absence of change)</span>'}</td></tr>`).join('')}</table>`});
h+=`<h3>3.4 Market-wide forces (as published)</h3><table><tr><th>Item</th><th>Direction</th><th>Type</th><th>Text</th></tr>${B.MKT_MACRO.map(x=>`<tr><td><b>${esc(x.t)}</b></td><td>${esc(({'+':'Supportive','–':'Negative','mixed':'Mixed','?':'Uncertain'})[x.dir])}</td><td>${x.kind==='fact'?'From the speech':'AAMA analysis'}</td><td>${esc(x.d)}</td></tr>`).join('')}</table>

<h2>4. Statements of fact to verify against the Budget documents</h2>
<p>These are claims the pages make about what the speech <i>does or does not</i> say. They need checking against the full Budget documents (Estimates, Annexure V technical notes, Finance Bill when published), not only the speech.</p>
<table><tr><th>#</th><th>Claim as published</th><th>Basis</th><th>Confirm?</th></tr>
<tr><td>1</td><td>The Budget changes no land or property tax.</td><td>None of §36 / Annexure V mentions land, stamp duty or property tax.</td><td></td></tr>
<tr><td>2</td><td>Capital gains tax widening covers crypto/digital assets, telecom/broadcast licences and gems/jewellery/valuables above a threshold — not land.</td><td>Annexure V §1.3.</td><td></td></tr>
<tr><td>3</td><td>No change announced to corporate income tax, dividend or share-transaction taxes.</td><td>Absence in speech and technical notes.</td><td></td></tr>
<tr><td>4</td><td>CESS is cut 25% on 800 HS lines; whether building-material lines are included is unchecked.</td><td>§36.11, Annexure V §6.2. Line list not in the speech.</td><td></td></tr>
<tr><td>5</td><td>Revenue is 15.8% of GDP in 2027, below the 16% medium-term minimum.</td><td>Annexure III vs §3.</td><td></td></tr>
<tr><td>6</td><td>Rs 3.8tn gross borrowing incl. Rs 1,643bn net domestic financing.</td><td>Annexures III, IV.</td><td></td></tr>
<tr><td>7</td><td>Place tags (e.g. Kahathuduwa → Colombo, Ingiriya → Kalutara) are AAMA's reading of place names.</td><td>Needs gazette / Survey Dept check.</td><td></td></tr>
</table>

<h2>5. Questions for reviewers</h2>
<h4>Analyst</h4><ul>
<li>Is the commitment / effect / timing rubric reasonable? Would you add or drop a dimension (e.g. land-acquisition status, existing price level)?</li>
<li>Are any corridor scores too high or too low? Please annotate §2.2 with your view.</li>
<li>Are the market strength ratings (1–3) and evidence grades defensible? Which would you change?</li>
<li>Are any sectors missing (e.g. insurance, autos/EV, education services)? Any measures mis-attributed to a sector?</li>
<li>Is "policy exposure score" the right framing, or should the ranking be removed in favour of a table without numbers?</li>
<li>Should the land page show any price evidence before launch (e.g. official land-price series)? If so, which?</li></ul>
<h4>Legal / compliance</h4><ul>
<li>Do the banners and footer wording adequately avoid investment advice / valuation claims?</li>
<li>Does a sector-level exposure ranking with numeric scores fall within permitted commentary for a non-licensed media publisher in Sri Lanka?</li>
<li>Is naming a "tailwind" or "headwind" for a sector acceptable without a licensed-adviser disclosure beyond what is shown?</li>
<li>Any required disclosures (conflicts of interest, date/time-stamp, "not a recommendation")? Any wording to change?</li>
<li>Defamation / fairness: are any statements about sectors or institutions (e.g. airport losses, plantation lease review) acceptable as phrased, given they restate the speech?</li></ul>

<h2>6. Sign-off</h2>
<table class="chk"><tr><th>Item</th><th>Reviewer</th><th>Decision (approve / approve with changes / reject)</th><th>Changes required</th><th>Date</th></tr>
<tr><td>Land lens: method</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Land lens: 18 corridor scores</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Market lens: method & weights</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Market lens: sector drivers & scores</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Facts in §4</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Published wording & disclaimers (§1)</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Legal / compliance clearance</td><td></td><td></td><td></td><td></td></tr></table>
<p class="muted">Scores live in <code>budget-2027/data/lens.js</code>; any approved change is a one-line edit and re-publish.</p>
</body></html>`;
const out = path.join(root,'docs','land-market-review-pack'); fs.writeFileSync(out+'.html',h);
import {createRequire} from 'node:module'; const { chromium } = createRequire(import.meta.url)(process.env.PW || 'playwright'); const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://'+out+'.html'); await p.pdf({path:out+'.pdf',format:'A4',printBackground:true,margin:{top:'14mm',bottom:'14mm',left:'12mm',right:'12mm'}}); await b.close(); console.log('ok');
