/* Views 2: Where (map) · New · Future · For me */
(function () {
  const { B, $, $$, esc, fmt, I, list, counted, sum, sectorStats, actions, Router, seg, tag, chip, slot, C, head, stat, dot, taxById } = BX;
  const segH = BX.segH;
  const tabsHtml = (name, tabs, cur) => `<div class="subtabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${k === cur}" class="${k === cur ? 'on' : ''}" data-act="subtab" data-arg="${name}:${k}">${esc(l)}</button>`).join('')}</div>`;
  const subH = {}; actions.subtab = (a) => { const [n, k] = a.split(':'); subH[n] && subH[n](k); };
  const placeText = (i) => i.national ? 'Nationwide' : (i.dists.concat(i.provs.filter(() => i.provLevel).map((x) => B.PROV[x] + ' Province'))).join(', ') || '—';

  /* ───────────────────── WHERE ───────────────────── */
  BX.views.map = {
    title: 'Where the money lands',
    mount(root, p) {
      let tab = p.t || 'district', metric = 'rs', split = p.sp !== '0', ddp = p.ddp === '1', sel = p.d || '';
      const draw = () => {
        const g = BX.geo({ split, ddp }); const body = $('#wbody');
        const totalA = sum(counted, (i) => i.a);
        const nat = g.national, dTot = Object.values(g.dist).reduce((s, x) => s + x.v, 0) - (ddp ? 2000 * 25 : 0), pTot = Object.values(g.prov).reduce((s, x) => s + x.v, 0);
        if (tab === 'district') {
          const vals = metric === 'rs' ? g.dist : Object.fromEntries(Object.entries(g.dist).map(([k, x]) => [k, { v: x.n }]));
          const d = sel && g.dist[sel];
          const items = d ? d.items.slice().sort((a, b) => (b.a || 0) - (a.a || 0)) : [];
          body.innerHTML = `<div class="controls">${seg('Show', [['rs', 'Rupees'], ['n', 'Projects']], metric, 'wmetric')}
              <label class="chk"><input type="checkbox" id="sp" ${split ? 'checked' : ''}> Split multi-district projects equally</label>
              <label class="chk"><input type="checkbox" id="dd" ${ddp ? 'checked' : ''}> Add the flat Rs 2,000M per district programme</label></div>
            <div class="mapgrid"><div class="mapwrap">${C.tilemap(vals, { fmtv: metric === 'rs' ? (v) => fmt.rs(v, { plain: true }) : (v) => v + ' lines', sel, tipFn: (dn, x) => `${dn} · ${B.PROV[B.DIST[dn].p]} Province|${metric === 'rs' ? fmt.rs(x.v) : x.v + ' projects name this district'}|${(g.dist[dn].shared || 0)} shared with other districts` })}</div>
              <div class="card mapside">${d ? `<h3 class="display display-md">${esc(sel)}</h3><p class="muted">${B.PROV[B.DIST[sel].p]} Province · ${d.n} projects name this district · ${fmt.rs(d.v)} ${split ? 'incl. equal shares of shared projects' : 'single-district projects only'}</p>
                ${C.hbars(items.filter((i) => i.a).slice(0, 10).map((i) => ({ label: i.t, v: i.a, fill: slot(i.theme), act: 'open', arg: i.id, sub: i.dists.length > 1 ? 'Shared with ' + (i.dists.length - 1) + ' other district' + (i.dists.length > 2 ? 's' : '') : '' })), { compact: true })}`
                : `<h3 class="display display-md">How to read this</h3><p>Each tile is a district. Colour shows the rupees (or number of projects) the speech <b>names that district for</b>. It is not a full district budget.</p><p class="muted">Tap a tile for its projects.</p>`}</div></div>
            <div class="callouts">${stat('Placed in a district', fmt.rs(dTot), `${(dTot / totalA * 100).toFixed(0)}% of itemised allocations`)}${stat('Province-level', fmt.rs(sum(counted.filter((i) => !i.national && i.provLevel), (i) => i.a)), 'Named by province, not district (see Provinces)')}${stat('Nationwide', fmt.rs(nat), `${(nat / totalA * 100).toFixed(0)}%, such as Aswesuma, salaries and subsidies`)}</div>
            <p class="fine">Only projects the speech places in a named district are mapped. Projects touching several districts are listed in each; with “split equally” on (default) their rupees are shared evenly, otherwise they are left out of the tiles. District tags are AAMA’s reading of place names in the speech. The official district-wise figures are in the Budget Estimates (Volumes I–III), which are not yet loaded.</p>`;
          $('#sp').onchange = (e) => { split = e.target.checked; Router.param('sp', split ? '' : '0'); draw(); };
          $('#dd').onchange = (e) => { ddp = e.target.checked; Router.param('ddp', ddp ? '1' : ''); draw(); };
        } else if (tab === 'province') {
          const rows = Object.entries(g.prov).sort((a, b) => b[1].v - a[1].v);
          body.innerHTML = `<p class="lede sm">Projects that name a district or province, split equally across the provinces they touch. Nationwide lines (Rs ${fmt.n(Math.round(nat))}M) are not allocated.</p>
            ${C.hbars(rows.map(([k, x]) => ({ label: B.PROV[k] + ' Province', v: x.v, fill: 'var(--c1)', sub: `${x.n} projects`, tip: `${B.PROV[k]} Province|${fmt.rs(x.v)}|${x.n} projects` })), { fmtv: (v) => fmt.rs(v) })}
            <section class="sec tight"><h3 class="display display-md">Biggest located projects by province</h3><div class="provlist">${rows.map(([k, x]) => `<div class="card"><h4>${B.PROV[k]}</h4><ul class="plain">${x.items.slice().sort((a, b) => (b.a || 0) - (a.a || 0)).slice(0, 4).map((i) => `<li>${BX.initBtn(i, i.t.length > 64 ? i.t.slice(0, 62) + '…' : i.t)} <span class="muted">${i.a ? fmt.rs(i.a) : ''}</span></li>`).join('')}</ul></div>`).join('')}</div></section>
            <p class="fine">Province totals mix directly located and shared projects, so they are indicative. The Rs 2,000M per district programme is nationwide and not included here.</p>`;
        } else if (tab === 'ministry') {
          const rows = Object.values(sectorStats).filter((s) => s.item > 0).sort((a, b) => b.item - a.item);
          body.innerHTML = `<p class="lede sm">Itemised allocations grouped by the responsible ministry or agency. The speech names the implementing body for most lines; we map each sector to its lead ministry. For official sector totals see <a href="#/sectors">Sectors</a>; ministry-by-ministry totals are in Budget Estimates Vol. I–III.</p>
            ${C.hbars(rows.map((s) => ({ label: B.SECTORS[s.key].org, sub: B.SECTORS[s.key].label + ' · ' + s.n + ' lines', v: s.item, fill: slot(s.theme), act: 'goSector', arg: s.key, tip: `${B.SECTORS[s.key].org}|${fmt.rs(s.item)} itemised` })))}`;
        } else {
          const nE = g.prov.N.v + g.prov.E.v, tot = Object.values(g.prov).reduce((s, x) => s + x.v, 0);
          const faith = [['Buddhist', 758], ['Hindu', 272], ['Muslim', 199], ['Christian', 99]];
          body.innerHTML = `<div class="callout warn"><b>The speech and its annexures give no spending breakdown by ethnicity.</b> We know of no official one in the other Budget documents either, and we will not estimate one. Below are the items the speech names for specific communities, plus geography. A province is not an ethnic group, and nothing here shows who benefits.</div>
            <div class="two">
              <div class="card"><h3 class="mini">Places of worship damaged by Ditwah (1,328)</h3>${C.hbars(faith.map(([n, v]) => ({ label: n, v, fill: 'var(--c1)', value: fmt.n(v) })), { fmtv: fmt.n })}<p class="fine">Rs 722M budgeted for rehabilitation, plus Rs 40M (Buddha Sasana Fund) and Rs 523M (Central Cultural Fund); the speech does not split the rupees by faith. §31</p></div>
              <div class="card"><h3 class="mini">Named for specific communities or regions</h3><ul class="plain tight">
                <li><b>Arts of all ethnicities and religions:</b> Rs 7,000M (§31)</li>
                <li><b>Resettling 13,000 conflict-displaced families (North & East):</b> Rs 10,000M (§27)</li>
                <li><b>Plantation community:</b> 10,000 houses with India; Rs 3,000M for estate facilities; Rs 200/day incentive (§18, §27)</li>
                <li><b>Buddhist education & heritage:</b> Pirivena allowances, Dhamma-school teachers (Rs 1,200M), Anuradhapura sacred city (Rs 1,576M)</li>
                <li><b>Northern Province:</b> fisheries Rs 5,000M, Greater Kilinochchi water Rs 1.8bn this year, Jaffna & Vanni water Rs 1bn</li></ul></div></div>
            <div class="stats">${stat('Northern & Eastern provinces', fmt.rs(nE), `${(nE / tot * 100).toFixed(0)}% of the rupees the speech places in a province`)}${stat('Lines that name them', g.prov.N.n + g.prov.E.n, 'Projects touching either province')}</div>
            <div class="card"><h3 class="mini">What we’d need to answer this properly</h3><ol class="plain"><li>District-level spending from the Budget Estimates (Vol. I–III) and provincial councils’ own budgets.</li><li>Population and ethnic composition by district from the Department of Census & Statistics (2012 Census, updated by 2024 Census results).</li><li>An editorial rule: publish only per-person, district-level comparisons with a clear “this is geography, not ethnicity” note.</li></ol></div>`;
        }
        $$('[aria-label=Show] button', body).forEach((b) => b.classList.toggle('on', b.dataset.arg.endsWith(metric)));
      };
      segH.wmetric = (k) => { metric = k; draw(); };
      actions.pickDist = (d) => { sel = sel === d ? '' : d; Router.param('d', sel); draw(); };
      actions.goSector = (k) => Router.go('initiatives', { s: k });
      subH.where = (k) => { tab = k; Router.param('t', k === 'district' ? '' : k); $$('.subtabs button', root).forEach((b) => { const on = b.dataset.arg.endsWith(':' + k); b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); draw(); };
      root.innerHTML = `${head('Where the money lands', 'District, province, ministry and community', 'The speech places individual projects in named places but publishes no district budget. This view maps those projects.')}
        ${tabsHtml('where', [['district', 'District map'], ['province', 'Provinces'], ['ministry', 'Ministries & agencies'], ['community', 'Communities']], tab)}<div id="wbody"></div>`;
      draw();
    }
  };

  /* ───────────────────── NEW ───────────────────── */
  const STAGES = { passed: 'Passed', gazetted: 'Gazetted', ag: 'With Attorney General', draft: 'Being drafted', planned: 'Planned / to be introduced' };
  BX.views.new = {
    title: 'What’s new',
    mount(root, p) {
      let tab = p.t || 'a2', cat = p.c || '';
      const r2 = sum(B.ANX2, (x) => x[2]), c2 = sum(B.ANX2, (x) => x[3]), t7 = sum(B.ANX7, (x) => x[2]);
      const link = (ids, txt) => ids && ids.length ? `<button class="lnk" data-act="open" data-arg="${ids[0]}">${esc(txt)}</button>` : esc(txt);
      const draw = () => {
        const body = $('#nbody');
        if (tab === 'a2' || tab === 'a7') {
          const rows = tab === 'a2' ? B.ANX2 : B.ANX7; const cats = Array.from(new Set(rows.map((r) => r[r.length - 1])));
          const vis = rows.filter((r) => !cat || r[r.length - 1] === cat);
          const top = vis.slice().sort((a, b) => (tab === 'a2' ? (b[2] || b[3]) - (a[2] || a[3]) : b[2] - a[2])).slice(0, 8);
          body.innerHTML = `<div class="chips filt"><button class="chip ${!cat ? 'on' : ''}" data-act="cat" data-arg="">All</button>${cats.map((c) => `<button class="chip ${cat === c ? 'on' : ''}" data-act="cat" data-arg="${esc(c)}">${esc(c)}</button>`).join('')}</div>
            ${C.hbars(top.map((r) => { const v = tab === 'a2' ? (r[2] || r[3]) : r[2]; const ids = (tab === 'a2' ? BX.ax2link : BX.ax7link)[r[0]]; return { label: r[1], v, fill: tab === 'a2' && r[2] ? 'var(--c7)' : 'var(--c1)', act: ids ? 'open' : null, arg: ids ? ids[0] : '', sub: tab === 'a2' ? (r[2] ? 'Recurrent (every year)' : 'Capital (one-off)') : r[3] }; }), { compact: true })}
            <p class="fine">Largest ${top.length} shown${tab === 'a2' ? '. Purple = recurrent spending that repeats each year; blue = capital.' : '.'}</p>
            ${C.table(tab === 'a2' ? ['Proposal', 'Recurrent (Rs M)', 'Capital (Rs M)'] : ['Project', 'Allocation (Rs M)'], vis.map((r) => tab === 'a2'
              ? [`<span class="mono muted">${r[0]}</span> ${link((BX.ax2link[r[0]] || []), r[1])}`, r[2] ? fmt.n(r[2]) : '', r[3] ? fmt.n(r[3]) : '']
              : [`<span class="mono muted">${r[0]}</span> ${link((BX.ax7link[r[0]] || []), r[1])}`, fmt.n(r[2])]).concat([tab === 'a2'
                ? ['<b>Total</b>', '<b>' + fmt.n(sum(vis, (r) => r[2])) + '</b>', '<b>' + fmt.n(sum(vis, (r) => r[3])) + '</b>'] : ['<b>Total</b>', '<b>' + fmt.n(sum(vis, (r) => r[2])) + '</b>']]))}`;
        } else {
          const by = {}; B.LAWS.forEach((l) => (by[l.stage] = by[l.stage] || []).push(l));
          body.innerHTML = `<p class="lede sm">Many of the Budget’s proposals depend on laws that are not yet passed. This is the pipeline, in order of readiness.</p>` + Object.keys(STAGES).filter((k) => by[k]).map((k) => `<section class="sec tight"><h3 class="display display-md">${STAGES[k]} <span class="muted mono">${by[k].length}</span></h3><ul class="laws">${by[k].map((l) => `<li><span class="lw-t">${esc(l.t)}</span><span class="lw-w mono">${esc(l.when)}</span>${l.n ? `<span class="lw-n">${esc(l.n)}</span>` : ''}</li>`).join('')}</ul></section>`).join('') + '<p class="fine">Sources: §4, §7, §14–15, §24, §29–30 and Annexure V. Stages are as described in the speech; no dates are implied beyond what it says.</p>';
        }
      };
      actions.cat = (c) => { cat = c; Router.param('c', c); draw(); };
      subH.nw = (k) => { tab = k; cat = ''; Router.go('new', { t: k === 'a2' ? '' : k }, true); $$('.subtabs button', root).forEach((b) => { const on = b.dataset.arg.endsWith(':' + k); b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); draw(); };
      root.innerHTML = `${head('What is new this year', 'Proposals, projects and laws', 'Annexure II lists the new spending proposals; Annexure VII the new capital projects in the Estimates; the speech names the laws they rely on.')}
        <div class="stats">${stat('New proposals', B.ANX2.length, 'Annexure II')}${stat('New proposals, cost', fmt.rs(r2 + c2), `${fmt.rs(r2)} recurrent + ${fmt.rs(c2)} capital`)}${stat('New capital projects', B.ANX7.length, `Annexure VII · ${fmt.rs(t7)}`)}${stat('Laws & institutions', B.LAWS.length, `${B.LAWS.filter((l) => l.stage === 'passed').length} already passed`)}</div>
        ${tabsHtml('nw', [['a2', 'Annexure II · 73 proposals'], ['a7', 'Annexure VII · 84 projects'], ['laws', 'Laws & institutions']], tab)}<div id="nbody"></div>`;
      draw();
    }
  };

  /* ───────────────────── FUTURE ───────────────────── */
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dlabel = (d) => { let m; if ((m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/))) return `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}`; if ((m = d.match(/^(\d{4})-(\d{2})$/))) return `${MONTHS[+m[2] - 1]} ${m[1]}`; if ((m = d.match(/^(\d{4})-(Q\d|H\d)$/))) return `${m[2]} ${m[1]}`; return d; };
  const dkey = (d) => { let m; if ((m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/))) return +m[1] * 100 + +m[2] + +m[3] / 100; if ((m = d.match(/^(\d{4})-(\d{2})$/))) return +m[1] * 100 + +m[2]; if ((m = d.match(/^(\d{4})-Q(\d)$/))) return +m[1] * 100 + +m[2] * 3 + .5; if ((m = d.match(/^(\d{4})-H(\d)$/))) return +m[1] * 100 + +m[2] * 6 + .5; return +d.slice(0, 4) * 100 + 12.9; };
  const EVT = { watch: ['Watch', 'var(--c8)'], eff: ['Takes effect', 'var(--c3)'], law: ['Law', 'var(--c7)'], build: ['Construction', 'var(--c1)'], tender: ['Tender / RFP', 'var(--c2)'], target: ['Target', 'var(--c5)'] };
  BX.views.future = {
    title: 'What comes next',
    mount(root, p) {
      let f = p.e || '';
      const draw = () => {
        const evs = B.EVENTS.slice().sort((a, b) => dkey(a.d) - dkey(b.d)).filter((e) => !f || e.type === f);
        const byY = {}; evs.forEach((e) => (byY[e.d.slice(0, 4)] = byY[e.d.slice(0, 4)] || []).push(e));
        $('#tl').innerHTML = Object.entries(byY).map(([y, es]) => `<div class="yr"><div class="yl display">${y}</div><ol class="evs">${es.map((e) => `<li><i class="ed" style="background:${EVT[e.type][1]}"></i><div><div class="eh"><span class="mono">${esc(dlabel(e.d))}</span><span class="et">${EVT[e.type][0]}</span></div><div class="etx">${esc(e.t)}</div>${e.ids.length ? `<div class="chips">${e.ids.filter((id) => I[id] || taxById[id]).slice(0, 4).map((id) => I[id] ? `<button class="chip link" data-act="open" data-arg="${id}">${esc(BX.shortTitle(I[id], 38))}</button>` : `<a class="chip link" href="#/me">${esc(taxById[id].k)}</a>`).join('')}</div>` : ''}</div></li>`).join('')}</ol></div>`).join('') || '<p class="muted">Nothing in this category.</p>';
        $$('.chips.tlf button', root).forEach((b) => b.classList.toggle('on', b.dataset.arg === f));
      };
      actions.tlf = (k) => { f = k; Router.param('e', k); draw(); };
      const dumb = (t) => {
        if (t.now == null) return `<div class="dumb solo"><b>${fmt.n(t.to)}${esc(t.unit)}</b> by ${t.by}</div>`;
        const lo = Math.min(t.now, t.to), hi = Math.max(t.now, t.to), pad = (hi - lo) * 0.12 || 1; const sx = (v) => ((v - (lo - pad)) / (hi - lo + 2 * pad)) * 100;
        return `<div class="dumb" role="img" aria-label="${t.t}: now ${t.now}${t.unit}, target ${t.to}${t.unit} by ${t.by}"><span class="dl" style="left:${Math.min(sx(t.now), sx(t.to))}%;width:${Math.abs(sx(t.to) - sx(t.now))}%"></span><i class="d1" style="left:${sx(t.now)}%"></i><i class="d2" style="left:${sx(t.to)}%"></i></div><div class="dv2"><span>Now <b>${fmt.n(t.now)}${esc(t.unit)}</b></span><span>${t.by} target <b>${fmt.n(t.to)}${esc(t.unit)}</b></span></div>`;
      };
      const dep = { ppp: counted.filter((i) => i.f === 'ppp').length, dev: counted.filter((i) => i.f === 'dev').length, soe: counted.filter((i) => i.f === 'soe').length, tre: counted.filter((i) => i.f === 'tre' || i.f === 'sup').length };
      root.innerHTML = `${head('What comes next', 'Milestones and targets', 'Every dated milestone and numeric target in the speech, in order. Click a tag to open the initiative behind it.')}
        <div class="stats">${stat('Dated milestones', B.EVENTS.length, 'Effective dates, builds, tenders')}${stat('Measurable targets', B.TARGETS.length, 'With a number and a year')}${stat('Need private partners', dep.ppp, 'Lines relying on PPP / investors')}${stat('Donor-financed', dep.dev, 'Loans or grants from partners')}</div>
        <section class="sec tight"><h3 class="display display-md">Timeline</h3>
          <div class="chips filt tlf"><button class="chip" data-act="tlf" data-arg="">All</button>${Object.entries(EVT).map(([k, [l, c]]) => `<button class="chip" data-act="tlf" data-arg="${k}"><i class="dot" style="background:${c}"></i>${l}</button>`).join('')}</div>
          <div id="tl" class="tl"></div></section>
        <section class="sec tight"><h3 class="display display-md">Targets, now versus the goal</h3><div class="targets">${B.TARGETS.map((t) => `<div class="tg"><div class="tg-h">${dot(B.SECTORS[t.s].theme)}<span>${esc(t.t)}</span></div>${dumb(t)}${t.n ? `<p class="fine">${esc(t.n)}</p>` : ''}</div>`).join('')}</div>
          <p class="fine">Each row has its own scale; compare distance, not position, across rows.</p></section>
        <section class="sec tight"><h3 class="display display-md">What could slip</h3><div class="cards3">
          <article class="card insight">${tag('analysis')}<h3>Waiting on a law</h3><p>${B.LAWS.filter((l) => l.stage !== 'passed').length} of ${B.LAWS.length} laws and institutions are not yet passed, including the PPP Act that the airport, port and refinery plans depend on.</p></article>
          <article class="card insight">${tag('analysis')}<h3>Waiting on investors</h3><p>${dep.ppp} lines rely on private or PPP partners who have not yet been chosen (e.g. Mattala, Trincomalee tanks, floating solar).</p></article>
          <article class="card insight">${tag('analysis')}<h3>Waiting on partners’ loans</h3><p>${dep.dev} lines are paid mostly by development partners; the IMF programme that supports that financing ends in March 2027.</p></article></div></section>`;
      draw();
    }
  };

  /* ───────────────────── FOR ME ───────────────────── */
  const tax = {
    old: { relief: 1800000, slabs: [[1000000, .06], [500000, .18], [500000, .24], [500000, .30], [Infinity, .36]] },
    next: { relief: 1950000, slabs: [[850000, .06], [600000, .12], [600000, .18], [600000, .24], [600000, .30], [Infinity, .36]] },
    calc(sys, monthly) { let t = Math.max(0, monthly * 12 - sys.relief), tot = 0; for (const [w, r] of sys.slabs) { const x = Math.min(t, w); tot += x * r; t -= x; if (t <= 0) break; } return tot / 12; }
  };
  BX.taxCalc = tax;
  const fmtN = (n) => 'Rs ' + Math.round(n).toLocaleString('en-US');
  BX.views.me = {
    title: 'How it affects me',
    mount(root, p) {
      let gid = p.g || 'tax';
      const personaFor = (g) => B.PERSONAS.find((x) => x.id === g) || B.PERSONAS.find((x) => x.g.includes(g)) || { id: g, label: B.GROUPS[g] || g, g: [g], blurb: '' };
      const calcs = () => `<div class="calcs">
        <div class="card calc" id="c-tax"><h3 class="mini">Income-tax calculator</h3><label class="f"><span>Monthly salary + allowances (Rs)</span><input type="number" id="inc" min="0" step="5000" value="${p.inc || 250000}" inputmode="numeric"></label><input type="range" id="incr" min="0" max="800000" step="5000" value="${p.inc || 250000}" aria-label="Monthly income slider"><div id="taxout"></div></div>
        <div class="card calc"><h3 class="mini">Paddy fertiliser subsidy</h3><label class="f"><span>Hectares cultivated</span><input type="number" id="ha" min="0" step="0.5" value="2" inputmode="decimal"></label><div class="res"><span>Rs 30,000 per ha</span><b id="haout"></b></div><p class="fine">Now extended to other crops grown in paddy fields from the 2026/27 Maha season (§17).</p></div>
        <div class="card calc"><h3 class="mini">Tea or rubber fertiliser subsidy</h3><label class="f"><span>Bags of fertiliser a year</span><input type="number" id="bags" min="0" step="1" value="20" inputmode="numeric"></label><div class="res"><span>Rs 4,000 per bag</span><b id="bagout"></b></div><p class="fine">Small-scale holders only (§18).</p></div>
        <div class="card calc"><h3 class="mini">Migrant-worker housing loan</h3><label class="f"><span>Loan size (Rs, max 5,000,000)</span><input type="number" id="ml" min="0" max="5000000" step="100000" value="4000000" inputmode="numeric"></label><div class="res"><span>Interest support a year</span><b id="mlout"></b></div><p class="fine">10% subsidy on the first Rs 3M, 5% on the next Rs 2M (§20). Treasury pays 6%/3%, SLBFE 4%/2%.</p></div></div>`;
      const calc = () => {
        const v = Math.max(0, +$('#inc').value || 0); const a = tax.calc(tax.old, v), b = tax.calc(tax.next, v), sv = a - b;
        $('#taxout').innerHTML = `<div class="taxcmp"><div><span class="muted">Today</span><b>${fmtN(a)}</b></div><div><span class="muted">From Apr 2027</span><b>${fmtN(b)}</b></div><div class="gain"><span class="muted">You keep</span><b>${sv > 0 ? '+' + fmtN(sv) : fmtN(0)}</b><span class="muted">a month</span></div></div>
          <div class="pairbar"><i style="width:${v ? Math.min(100, a / v * 100 * 3) : 0}%;background:var(--muted-soft)"></i><i style="width:${v ? Math.min(100, b / v * 100 * 3) : 0}%;background:var(--c1)"></i></div><p class="fine">Effective rate: ${(v ? a / v * 100 : 0).toFixed(1)}% today → ${(v ? b / v * 100 : 0).toFixed(1)}%. Assumes only employment income taxed on the slab schedule; excludes SSCL, EPF/ETF and other reliefs.</p>`;
        $('#haout').textContent = fmtN((+$('#ha').value || 0) * 30000); $('#bagout').textContent = fmtN((+$('#bags').value || 0) * 4000);
        const L = Math.min(5e6, Math.max(0, +$('#ml').value || 0)); $('#mlout').textContent = fmtN(0.10 * Math.min(L, 3e6) + 0.05 * Math.max(0, Math.min(L, 5e6) - 3e6));
      };
      const draw = () => {
        const per = personaFor(gid), gs = per.g;
        const chg = B.CHG.filter((r) => r[0].some((x) => gs.includes(x)));
        const inits = counted.filter((i) => i.gs.some((x) => gs.includes(x)) && (i.a || i.lv || i.tc)).sort((a, b) => (b.a || 0) - (a.a || 0));
        const taxes = B.TAX.filter((t) => String(t.who).split(',').some((x) => gs.includes(x)));
        $('#pbody').innerHTML = `<h3 class="display display-md">${esc(per.label)}</h3>${per.blurb ? `<p class="lede sm">${esc(per.blurb)}</p>` : ''}
          ${chg.length ? `<section class="sec tight"><h4 class="mini">What changes for you</h4>${C.table(['What', 'Before', 'After', 'From'], chg.map((r) => [esc(r[1]) + ` <span class="muted mono">${esc(r[5])}</span>`, esc(r[2]), `<b>${esc(r[3])}</b>`, esc(r[4])]), { cls: 'chg' })}</section>` : ''}
          ${taxes.length ? `<section class="sec tight"><h4 class="mini">Tax measures</h4><ul class="plain">${taxes.map((t) => `<li><b>${esc(t.t)}</b><div class="muted small">${esc(t.eff)} · ${esc(t.ref)}${t.d ? ' · ' + esc(t.d) : ''}</div></li>`).join('')}</ul></section>` : ''}
          ${inits.length ? `<section class="sec tight"><h4 class="mini">Funded initiatives that reach you <span class="muted">(${inits.length})</span></h4>${C.hbars(inits.slice(0, 10).map((i) => ({ label: i.t, v: i.a || i.lv || i.tc, fill: slot(i.theme), act: 'open', arg: i.id, sub: i.a ? '' : i.lv ? 'Loans unlocked' : 'Total project cost' })), { compact: true })}<a class="btn ghost" href="#/initiatives?g=${gs[0]}">See all in the explorer</a></section>` : ''}`;
        $$('.pgrid .pc', root).forEach((b) => b.classList.toggle('on', b.dataset.arg === per.id));
      };
      actions.persona = (k) => { gid = k; Router.param('g', k); draw(); $('#pbody').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      root.innerHTML = `${head('How it affects me', 'Find your group', 'Before-and-after numbers from the speech for each group, plus calculators you can try. These are the Budget’s announced changes, not a personal tax or benefits assessment.')}
        <div class="pgrid">${B.PERSONAS.map((x) => `<button class="pc" data-act="persona" data-arg="${x.id}"><b>${esc(x.label)}</b><span>${esc(x.blurb)}</span></button>`).join('')}</div>
        <div id="pbody" class="card pbody"></div>
        <section class="sec tight"><h3 class="display display-md">Calculators</h3>${calcs()}</section>`;
      $('#inc').addEventListener('input', () => { $('#incr').value = $('#inc').value; calc(); }); $('#incr').addEventListener('input', () => { $('#inc').value = $('#incr').value; calc(); });
      ['ha', 'bags', 'ml'].forEach((id) => $('#' + id).addEventListener('input', calc));
      draw(); calc();
      return { update(np) { if ((np.g || 'tax') !== gid) { gid = np.g || 'tax'; draw(); } } };
    }
  };
})();
