/* Views 3: Land lens · Market lens · Sources & method */
(function () {
  const { B, $, $$, esc, fmt, I, counted, sum, sectorStats, actions, Router, seg, tag, chip, slot, C, head, stat, dot } = BX;
  const segH = BX.segH;
  const linked = (ids) => sum(ids.map((id) => I[id]).filter((i) => i && i.cnt), (i) => i.a);
  const chipsFor = (ids, n = 7) => ids.filter((id) => I[id]).slice(0, n).map((id) => `<button class="chip link" data-act="open" data-arg="${id}">${esc(BX.shortTitle(I[id]))}</button>`).join('');

  /* ───────────────────── LAND LENS ───────────────────── */
  const LV = { commit: ['', 'Study or intent', 'Funded or tendered', 'Funded & under way'], effect: ['', 'Indirect', 'Local amenity or utility', 'Direct access / demand shock'], timing: ['', 'After 2030', '2028 – 2030', 'By 2028'] };
  const signal = (l) => l.commit + l.effect + l.timing;
  const sig = (l) => { const s = signal(l); return s >= 8 ? ['High', 'hi'] : s >= 6 ? ['Medium', 'md'] : ['Watch', 'lo']; };
  const meter = (n, label, sub) => `<div class="mt" data-tip="${esc(label + '|' + sub)}"><span class="ml">${esc(label)}</span><span class="mb"><i class="${n >= 1 ? 'f' : ''}"></i><i class="${n >= 2 ? 'f' : ''}"></i><i class="${n >= 3 ? 'f' : ''}"></i></span><span class="ms">${esc(sub)}</span></div>`;
  BX.views.land = {
    title: 'Land lens',
    mount(root, p) {
      let flt = p.sg || '', dsel = p.d || '', open = p.l || '';
      const draw = () => {
        let ls = B.LAND.filter((l) => (!flt || sig(l)[1] === flt) && (!dsel || l.d.includes(dsel))).sort((a, b) => signal(b) - signal(a) || linked(b.ids) - linked(a.ids));
        const cnt = {}; B.LAND.forEach((l) => l.d.forEach((d) => { cnt[d] = cnt[d] || { v: 0, n: 0 }; cnt[d].v += 1; cnt[d].n += 1; }));
        $('#lmap').innerHTML = C.tilemap(Object.fromEntries(BX.distNames.map((d) => [d, cnt[d] || { v: 0 }])), { act: 'landDist', sel: dsel, fmtv: (v) => v + (v === 1 ? ' catalyst' : ' catalysts'), tipFn: (d, x) => `${d}|${x.v} catalyst${x.v === 1 ? '' : 's'} touch this district` });
        $('#lcount').innerHTML = `<b>${ls.length}</b> of ${B.LAND.length} corridors${dsel ? ` touching <b>${esc(dsel)}</b> <button class="lnk" data-act="landDist" data-arg="${esc(dsel)}">clear</button>` : ''}`;
        $('#llist').innerHTML = ls.map((l) => { const [sl, sc] = sig(l); const amt = linked(l.ids);
          return `<article class="card land ${open === l.id ? 'open' : ''}" id="${l.id}">
            <header><div><h3 class="display display-md">${esc(l.name)}</h3><p class="muted">${esc(l.sub)}</p></div><div class="sigbadge ${sc}" data-tip="Signal strength|Commitment + effect + timing = ${signal(l)} of 9">${sl}<small>signal ${signal(l)}/9</small></div></header>
            <div class="meters">${meter(l.commit, 'Commitment', LV.commit[l.commit])}${meter(l.effect, 'Effect on land', LV.effect[l.effect])}${meter(l.timing, 'Timing', LV.timing[l.timing])}</div>
            <p>${esc(l.why)}</p>
            <dl class="kvs two"><div class="kv"><dt>Linked 2027 allocations</dt><dd><b>${fmt.rs(amt)}</b></dd></div><div class="kv"><dt>Delivery window</dt><dd>${esc(l.when)}</dd></div>
              <div class="kv"><dt>Districts</dt><dd>${l.d.length ? l.d.map((x) => esc(x)).join(', ') : 'Island-wide'}</dd></div></dl>
            <div class="wr"><div><b>Watch for</b><p>${esc(l.watch)}</p></div><div><b>Risks</b><p>${esc(l.risk)}</p></div></div>
            <div class="chips">${chipsFor(l.ids)}</div></article>`; }).join('') || '<p class="muted">No corridors match this filter.</p>';
        $$('[data-sgf]', root).forEach((b) => b.classList.toggle('on', b.dataset.sgf === flt));
        if (open) { const e = document.getElementById(open); if (e) setTimeout(() => e.scrollIntoView({ block: 'center' }), 60); open = ''; }
      };
      actions.landDist = (d) => { dsel = dsel === d ? '' : d; Router.param('d', dsel); draw(); };
      actions.sgf = (k) => { flt = k; Router.param('sg', k); draw(); };
      root.innerHTML = `${head('Where land values could move', 'Land lens', 'Which funded projects could change land demand, how firm each one is, and how soon. A ranking of catalysts, not a price forecast.')}
        <div class="callout"><span class="tag an">AAMA analysis</span> <b>This is not a valuation or advice.</b> The Budget changes no land or property tax. These corridors are ranked on how firm the commitment is, how directly it changes access, and when it lands. Land prices also depend on title, zoning, plot size and local supply, none of which we have.</div>
        <div class="two mapgrid"><div class="card"><h3 class="mini">Catalysts by district</h3><div id="lmap"></div></div>
          <div class="card"><h3 class="mini">How the signal is scored</h3><ul class="plain tight"><li><b>Commitment</b> 1 study · 2 funded or tendered · 3 funded and under way</li><li><b>Effect on land</b> 1 indirect · 2 local utility · 3 direct access (interchange, station, airport, port)</li><li><b>Timing</b> 1 after 2030 · 2 by 2030 · 3 by 2028</li></ul><p class="fine">Total 8–9 = High · 6–7 = Medium · ≤5 = Watch. The rubric lives in <span class="mono">data/lens.js</span> so editors can challenge any score.</p></div></div>
        <div class="resbar"><div id="lcount"></div><div class="chips filt"><button class="chip" data-act="sgf" data-arg="" data-sgf="">All</button><button class="chip" data-act="sgf" data-arg="hi" data-sgf="hi">High</button><button class="chip" data-act="sgf" data-arg="md" data-sgf="md">Medium</button><button class="chip" data-act="sgf" data-arg="lo" data-sgf="lo">Watch</button></div></div>
        <div id="llist" class="landlist"></div>
        <section class="sec tight"><h3 class="display display-md">Headwinds and things that cut the other way</h3><ul class="hw">${B.LAND_HEADWINDS.map((h) => `<li>${tag(h.kind)}<div><b>${esc(h.t)}</b><p>${esc(h.d)}</p>${h.ids ? `<div class="chips">${chipsFor(h.ids)}</div>` : ''}</div></li>`).join('')}</ul></section>
        <p class="fine">To turn this into a price view we need official land-price series (e.g. from the Central Bank and the Valuation Department), expressway interchange maps and gazetted acquisition notices. See Sources & method.</p>`;
      draw();
    }
  };

  /* ───────────────────── MARKET LENS ───────────────────── */
  const EVL = { A: 'Funded & dated', B: 'Funded or needs a partner', C: 'Intent only' };
  const HL = { 1: 'within 12 months', 2: '12–24 months', 3: 'beyond 24 months' };
  const score = (m, h, evSet) => sum(m.drivers.filter((d) => d.h <= h && evSet.includes(d.ev)), (d) => d.dir * d.str * B.EVW[d.ev]);
  BX.views.markets = {
    title: 'Market lens',
    mount(root, p) {
      let h = +p.h || 2, ev = p.ev || 'all', sel = p.s || '';
      const evSet = () => ev === 'A' ? ['A'] : ev === 'AB' ? ['A', 'B'] : ['A', 'B', 'C'];
      const draw = () => {
        const rows = B.MKT.map((m) => ({ m, v: score(m, h, evSet()) })).sort((a, b) => b.v - a.v);
        if (!sel) sel = rows[0].m.id;
        $('#mchart').innerHTML = C.diverge(rows.map(({ m, v }) => ({ label: m.name, v, act: 'mkt', arg: m.id, on: m.id === sel, tip: `${m.name}|Policy exposure score ${v.toFixed(1)}|${m.drivers.filter((d) => d.h <= h && evSet().includes(d.ev)).length} drivers counted` })), { max: Math.max(...rows.map((r) => Math.abs(r.v)), 3) });
        const m = B.MKT.find((x) => x.id === sel), ds = m.drivers.filter((d) => d.h <= h && evSet().includes(d.ev));
        const part = (dir, title) => { const xs = ds.filter((d) => Math.sign(d.dir) === dir); return xs.length ? `<h4 class="mini">${title}</h4><ul class="drv">${xs.map((d) => `<li><div class="dh"><b>${esc(d.t)}</b><span class="chips">${chip(EVL[d.ev], 'ev-' + d.ev)}${chip(HL[d.h])}${chip('strength ' + d.str + '/3')}</span></div><p>${esc(d.why)}</p><p class="risk"><b>Risk:</b> ${esc(d.risk)}</p>${d.refs.length ? `<div class="chips">${chipsFor(d.refs, 6)}${d.refs.filter((r) => BX.taxById[r]).map((r) => `<span class="chip">${esc(BX.taxById[r].k)} · tax</span>`).join('')}</div>` : ''}</li>`).join('')}</ul>` : ''; };
        const amt = sum([...new Set(m.drivers.flatMap((d) => d.refs))].map((id) => I[id]).filter((i) => i && i.cnt), (i) => i.a);
        $('#mdetail').innerHTML = `<h3 class="display display-md">${esc(m.name)}</h3><p class="muted">Score <b>${rows.find((r) => r.m.id === sel).v.toFixed(1)}</b> · linked 2027 allocations ${fmt.rs(amt)}</p>
          ${part(1, 'Tailwinds')}${part(-1, 'Headwinds')}${part(0, 'Neutral or unclear')}${!ds.length ? '<p class="muted">No drivers at this horizon and evidence level.</p>' : ''}`;
        $$('[data-hz]', root).forEach((b) => b.classList.toggle('on', b.dataset.hz == h)); $$('[data-evf]', root).forEach((b) => b.classList.toggle('on', b.dataset.evf === ev));
      };
      actions.mkt = (id) => { sel = id; Router.param('s', id); draw(); $('#mdetail').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      actions.hz = (v) => { h = +v; Router.param('h', v); draw(); };
      actions.evf = (v) => { ev = v; Router.param('ev', v === 'all' ? '' : v); draw(); };
      root.innerHTML = `${head('Which sectors could benefit', 'Market lens', 'Which listed sectors the Budget’s measures lean towards or against, why, and when. An exposure map, not a list of stocks that will rise.')}
        <div class="callout warn"><span class="tag an">AAMA analysis</span> <b>Not investment advice.</b> Nobody can say which shares will go up in the next two years. This page shows <i>policy exposure</i>: which measures help or hurt which kinds of business, with the evidence behind each. Share prices also depend on valuation, earnings, interest rates, and events no Budget covers. AAMA is not a licensed investment adviser.</div>
        <div class="controls"><div class="seg" role="group" aria-label="Horizon"><button data-hz="1" data-act="hz" data-arg="1">Next 12 months</button><button data-hz="2" data-act="hz" data-arg="2">Next 24 months</button><button data-hz="3" data-act="hz" data-arg="3">Beyond</button></div>
          <div class="seg" role="group" aria-label="Evidence"><button data-evf="A" data-act="evf" data-arg="A">Funded &amp; dated only</button><button data-evf="AB" data-act="evf" data-arg="AB">Funded or tendered</button><button data-evf="all" data-act="evf" data-arg="all">Include intent-only</button></div></div>
        <div class="mkt"><div class="card"><h3 class="mini">Policy exposure by sector <span class="muted">(tailwind → right)</span></h3><div id="mchart"></div>
          <p class="fine">Score = Σ direction × strength (1–3) × evidence weight (funded &amp; dated 1.0 · funded/needs partner 0.6 · intent only 0.3), over drivers within the chosen horizon. Click a bar for the reasoning.</p></div>
          <div class="card" id="mdetail"></div></div>
        <section class="sec tight"><h3 class="display display-md">Market-wide forces</h3><ul class="hw">${B.MKT_MACRO.map((x) => `<li>${tag(x.kind)}<div><b>${esc(x.t)}</b> <span class="chip">${({'+':'Supportive','–':'Negative','mixed':'Mixed','?':'Uncertain'})[x.dir]}</span><p>${esc(x.d)}</p></div></li>`).join('')}</ul></section>`;
      draw();
    }
  };

  /* ───────────────────── SOURCES & METHOD ───────────────────── */
  const ASK = [
    ['Spending by department / ministry', 'Partial', 'Official totals for 12 sectors, with sub-sectors and key activities, from the Citizens’ Budget. Ministry-by-ministry totals need Budget Estimates Vol. I–III.'],
    ['Spending by province', 'Partial', 'Provinces named in the speech; nationwide lines can’t be split.'],
    ['Spending by district', 'Partial', 'Named projects only plus the flat Rs 2,000M per district.'],
    ['Spending by ethnicity', 'Not available', 'Not in the speech or annexures, and no official source known to us. We show what the speech names, plus geography.'],
    ['Where the money goes', 'Complete', 'Annexure III, IV.'],
    ['Where it comes from', 'Complete', 'Annexure III, IV, I; donors per initiative.'],
    ['Amount per initiative', 'Strong', counted.length + ' initiatives; some have no rupee figure in the speech.'],
    ['New initiatives', 'Complete', 'Annexure II & VII, all 157 rows.'],
    ['Where they come from', 'Strong', 'Funding source tagged per line.'],
    ['Future of initiatives', 'Strong', 'Dates & targets stated in the speech; no delivery forecast.'],
    ['Effect on others', 'Strong', 'Before/after tables and calculators; not individual advice.'],
    ['Land price effect', 'Analysis', 'Ranked catalysts; no price data yet.'],
    ['Share-price effect', 'Analysis', 'Exposure scores; not forecasts.']
  ];
  BX.views.sources = {
    title: 'Sources & method',
    mount(root) {
      const docs = ['Budget Speech 2027', 'Budget Estimates 2027 (Volumes I, II & III)', 'Fiscal Management Report 2027', 'Macro Fiscal Framework 2027', 'Medium Term Debt Management Strategy 2027–2031', 'Mid-Year Fiscal Position Report 2026', 'Annual Report 2025', 'Tax Expenditure Statement 2026', 'Citizens’ Budget 2027', 'Cadre Information of Public Sector 2026'];
      const used = [true, false, false, false, false, false, false, false, true, false];
      const rows = Object.values(sectorStats).filter((s) => s.size > 0).sort((a, b) => b.size - a.size);
      root.innerHTML = `${head('Sources & method', 'How this was built, and what is missing')}
        <div class="two"><div class="card"><h3 class="mini">The ten Budget documents</h3><ul class="docs">${docs.map((d, i) => `<li class="${used[i] ? 'on' : ''}"><i></i>${i === 0 ? '<a href="https://www.treasury.gov.lk/api/file/ea495202-fcb1-4c78-b34e-58389cb20738" target="_blank" rel="noopener noreferrer">' + esc(d) + ' (Treasury, opens in a new tab)</a>' : esc(d)}<span>${used[i] ? (i === 8 ? 'Used (sector totals, key activities, cadre)' : 'Used (speech + Annexures I–VII)') : 'Not yet loaded'}</span></li>`).join('')}</ul>
          <p class="fine">The Citizens’ Budget gives official sector totals but not ministry-by-ministry figures. Those are in the Estimates (Volumes I–III), the next data load. The Citizens’ Budget was prepared before the speech and omits its new proposals; the Sectors page adds them back.</p></div>
          <div class="card"><h3 class="mini">Your questions → what we can answer today</h3><ul class="ask">${ASK.filter(([q]) => BX.LENSES || !/Land price|Share-price/.test(q)).map(([q, s, n]) => `<li><span class="ak ${s.toLowerCase().replace(/ /g, '')}">${s}</span><div><b>${esc(q)}</b><p>${esc(n)}</p></div></li>`).join('')}</ul></div></div>
        <section class="sec tight"><h3 class="display display-md">How we handle the numbers</h3><div class="cards3">
          <article class="card insight"><h3>Where the numbers come from</h3><p>Every amount comes from the speech, its annexures or the Citizens’ Budget. We never fill a gap with a guess. Where we converted dollars, we used Rs 300.6 to the dollar, the rate implied by the speech’s own Ditwah figures, and marked the line.</p></article>
          <article class="card insight"><h3>What is stated and what is our reading</h3><p>${tag('fact')} marks something the documents say. ${tag('analysis')} marks our own reading, such as a comparison or a risk of delay.</p></article>
          <article class="card insight"><h3>Totals are added once</h3><p>When the speech gives an umbrella total, such as Rs 131bn for health capital spending, we show it but don’t add it to the projects inside it. A line already counted inside another line is flagged.</p></article></div></section>
        <section class="sec tight"><h3 class="display display-md">Sector totals: the speech’s stated total vs. the lines we itemised</h3>
          ${C.table(['Sector', 'Itemised lines (Rs M)', 'Stated umbrella (Rs M)', 'Used in treemap'], rows.map((s) => [esc(B.SECTORS[s.key].label), fmt.n(Math.round(s.item)), s.env ? fmt.n(s.env) : '—', '<b>' + fmt.n(Math.round(s.size)) + '</b>']))}
          <p class="fine">Treemap size is the larger of the two columns. The itemised lines cover ${(sum(counted, (i) => i.a) / (B.A3.expenditure[3] * 1000) * 100).toFixed(0)}% of the Rs ${fmt.n(B.A3.expenditure[3])}bn total; the rest is mainly interest (33%), salaries, running costs and transfers the speech doesn’t itemise.</p></section>
        <section class="sec tight"><h3 class="display display-md">Known limits</h3><ul class="plain"><li>Place tags are AAMA’s mapping of place names in the speech to districts (e.g. Kahathuduwa → Colombo, Ingiriya → Kalutara). They should be verified against gazette maps.</li><li>Some allocations overlap in the speech (e.g. Rs 5,190M for 13 new water projects and individually named water projects). We keep both and flag it; totals are indicative.</li><li>The Rs 2,000M per district programme is nationwide in the data and mapped only on request.</li><li>Sinhala and Tamil versions should use the Treasury’s official translations for initiative names.</li>${BX.LENSES ? '<li>Land and market views are editorial analysis, reviewed before publication. They are not predictions.</li>' : ''}</ul></section>
        <section class="sec tight"><h3 class="display display-md">Data</h3><p>Every line is in <span class="mono">budget-2027/data/</span> as plain JavaScript objects, with a validator (<span class="mono">node budget-2027/tools/validate.mjs</span>) that re-checks the Annexure arithmetic and every cross-reference. The initiatives table can be downloaded from <a href="#/initiatives">the explorer</a>.</p></section>`;
    }
  };
})();
