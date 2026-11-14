/* Sectors page: "Official totals" (Citizens' Budget / Estimates) next to "Announced in the speech". */
(function () {
  const { B, $, $$, esc, fmt, sum, actions, Router, seg, C, head, stat, tag, I } = BX;
  const E = B.EST; const speech = BX.views.sectors;
  const SHORT = { social: 'Social protection', edu: 'Education', health: 'Health', transport: 'Transport', security: 'National security', public: 'Public service', peace: 'Peace & fair society', agri: 'Agriculture', living: 'Decent living', econ: 'Economic services & SMEs', green: 'Environment & disasters', energy: 'Energy' };
  const n1 = (x) => (Math.round(x * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const bn = (x) => 'Rs ' + (x >= 1000 ? (x / 1000).toFixed(2) + 'tn' : (x >= 100 ? Math.round(x) : +x.toFixed(1)) + 'bn');

  /* New proposals from Annexure II, per Citizens' Budget sector (AAMA mapping) */
  const add = {}; let mixed = 0; const addRows = {};
  B.ANX2.forEach((r) => { const k = E.anx2map[r[0]], v = ((r[2] || 0) + (r[3] || 0)) / 1000; if (k === 'mixed') { mixed += v; return; } add[k] = (add[k] || 0) + v; (addRows[k] = addRows[k] || []).push([r[0], r[1], v]); });
  const sectors = E.sectors.map((s) => ({ ...s, add: add[s.k] || 0, capShare: s.cap / s.total }));
  const totalEst = sum(sectors, (s) => s.total), totalAdd = sum(sectors, (s) => s.add) + mixed;
  const qOf = (sh) => sh < .10 ? 1 : sh < .25 ? 2 : sh < .40 ? 3 : sh < .55 ? 4 : sh < .70 ? 5 : sh < .85 ? 6 : 7;

  BX.views.sectors = {
    title: 'Sectors',
    mount(root, p) {
      let tab = p.t === 'speech' ? 'speech' : 'official', sel = p.e || '', showAll = false, lastTab = null, lastSel = null;
      root.innerHTML = `${head('Where we spend', 'Spending by sector')}
        <div class="subtabs" role="tablist">${[['official', 'Official totals'], ['speech', 'Announced in the speech']].map(([k, l]) => `<button role="tab" data-k="${k}" data-act="sectab" data-arg="${k}">${l}</button>`).join('')}</div><div id="sbody"></div>`;

      const drawOfficial = () => {
        const items = sectors.map((s) => { const q = qOf(s.capShare); return { key: s.k, v: s.total, label: SHORT[s.k], value: bn(s.total), fill: `var(--q${q})`, ink: `var(--q${q}t)`,
          tip: `${s.n}|${bn(s.total)} in the Estimates${s.add ? ' + ' + bn(s.add) + ' new in the speech' : ''}|Capital ${bn(s.cap)} · recurrent ${bn(s.rec)} (${Math.round(s.capShare * 100)}% capital)|Click for details` }; });
        const rows = sectors.slice().sort((a, b) => (b.total + b.add) - (a.total + a.add)).map((s) => [`<button class="lnk" data-act="pickEst" data-arg="${s.k}">${esc(s.n)}</button>`, n1(s.total), s.add ? '+' + n1(s.add) : '—', '<b>' + n1(s.total + s.add) + '</b>', Math.round(s.capShare * 100) + '%']);
        rows.push([`Allowances for tri-forces, police and prisons <span class="muted">(Annex II #56; split between sectors not published)</span>`, '—', '+' + n1(mixed), '<b>' + n1(mixed) + '</b>', '']);
        rows.push(['<b>Programme spending</b>', '<b>' + n1(totalEst) + '</b>', '<b>+' + n1(totalAdd) + '</b>', '<b>' + n1(totalEst + totalAdd) + '</b>', '']);
        let html = `<div class="stats">${stat('Estimates, 12 sectors', bn(totalEst), 'Citizens’ Budget, prepared before the speech')}${stat('New in the speech', bn(totalAdd), '73 proposals in Annexure II')}${stat('Programme spending', bn(totalEst + totalAdd), `Annexure IV says ${bn(B.A4.primaryExp)}`)}${stat('Debt service', bn(E.debtService), `Interest ${bn(B.A4.interest)} + repayments ${bn(B.A4.repayments)}`)}</div>
          <div class="callout">${tag('analysis')} <b>The two documents add up.</b> The 12 sector totals in the Citizens’ Budget (${bn(totalEst)}) plus the speech’s new proposals (${bn(totalAdd)}) come to ${bn(totalEst + totalAdd)}, within Rs 0.5bn of the ${bn(B.A4.primaryExp)} of programme spending in Annexure IV. Interest and debt repayments sit outside the sectors.</div>
          <div class="viz">${C.treemap(items, { onKey: 'pickEst', active: sel })}</div>
          <div class="maplegend"><span>Mostly recurrent</span>${[1, 2, 3, 4, 5, 6, 7].map((k) => `<i class="q${k}"></i>`).join('')}<span>Mostly capital</span><em>Area = sector total in the Estimates. Colour = share of the sector that is capital spending (building things) rather than recurrent (salaries, pensions, running costs).</em></div>
          <div id="estdetail" class="card sd"></div>
          <section class="sec tight"><h3 class="display display-md">From the Estimates to the final 2027 total</h3>${C.table(['Sector', 'Estimates (Rs bn)', 'New in speech', '2027 total', 'Capital share'], rows)}
            <p class="fine">Rs billion. “New in the speech” maps each Annexure II proposal to the nearest Citizens’ Budget sector (AAMA’s mapping). The Estimates’ own capital/recurrent split differs by about Rs 30bn from Annexure IV’s; the totals agree.</p></section>
          <section class="sec tight two">
            <div class="card"><h3 class="mini">Maintenance and rehabilitation of assets: ${bn(E.cross.maintenanceRehab.total)}</h3><p class="fine" style="margin-top:0">Maintenance ${bn(E.cross.maintenanceRehab.maintenance)} · rehabilitation ${bn(E.cross.maintenanceRehab.rehabilitation)}</p>${C.hbars(E.cross.maintenanceRehab.bySector.map(([n, v]) => ({ label: n, v, fill: 'var(--c3)', value: bn(v) })), { compact: true })}</div>
            <div class="card"><h3 class="mini">Cross-cutting programmes</h3><ul class="plain tight"><li><b>Research and development: ${bn(E.cross.rnd.total)}.</b> ${esc(E.cross.rnd.note)}</li><li><b>Digital transformation: about ${bn(E.cross.digital.total)}.</b> ${bn(E.cross.digital.ministry)} sits with the Ministry of Digital Economy; the speech adds Rs 10bn, taking it to Rs 28.5bn.</li></ul>
              <h3 class="mini">Assumptions behind the Estimates</h3><ul class="plain tight">${E.assumptions.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div></section>
          <section class="sec tight"><h3 class="display display-md">Who the budget is spread across, and who the state employs</h3>
            <div class="chips">${E.structure.map(([n, v]) => `<span class="chip"><b>${v}</b>&nbsp;${esc(n)}</span>`).join('')}</div>
            <details class="card" style="margin-top:14px"><summary><b>Public-sector cadre by profession</b> <span class="muted">(${fmt.n(sum(E.cadre, (r) => r[1]))} posts, Department of Management Services)</span></summary>${C.hbars(E.cadre.filter((r) => !/Other/.test(r[0])).slice(0, 16).map(([n, v]) => ({ label: n, v, fill: 'var(--c1)', value: fmt.n(v) })), { compact: true, fmtv: fmt.n })}<p class="fine">Largest 16 of 34 categories; “other, non-categorised” adds ${fmt.n(E.cadre.find((r) => /Other/.test(r[0]))[1])}.</p></details></section>
          <p class="fine">Source: ${esc(E.source)}. Figures rounded to the nearest billion by the Treasury.</p>`;
        $('#sbody').innerHTML = html; C.observe($('.treemap', $('#sbody'))); drawDetail();
      };

      const drawDetail = () => {
        const d = $('#estdetail'); if (!d) return;
        if (!sel) { d.innerHTML = '<p class="muted">Select a sector to see its parts and key activities.</p>'; return; }
        const s = sectors.find((x) => x.k === sel); const acts = s.acts.slice().sort((a, b) => b[1] - a[1]); const listed = sum(acts, (a) => a[1]);
        d.innerHTML = `<div class="sd-h"><h3 class="display display-md">${esc(s.n)}</h3><button class="lnk" data-act="clearEst">Clear</button></div>
          <p class="muted">${bn(s.total)} in the Estimates · capital ${bn(s.cap)} · recurrent ${bn(s.rec)}${s.add ? ` · <b>+${bn(s.add)} new in the speech</b>` : ''} · Citizens’ Budget p.${s.p}</p>
          <h4 class="mini">Parts of the sector</h4>${C.hbars(s.sub.map((x) => ({ label: x[0], v: x[1], fill: 'var(--c1)', value: bn(x[1]), sub: x.length > 2 ? `capital ${bn(x[2])} · recurrent ${bn(x[3])}` : '' })), { compact: true })}
          ${s.unlisted ? `<p class="fine">The Citizens’ Budget itemises ${bn(s.total - s.unlisted)} of this sector; ${bn(s.unlisted)} is not broken down.</p>` : ''}
          <h4 class="mini">Key activities the Treasury lists <span class="muted">(${acts.length}, not exhaustive)</span></h4>
          ${C.hbars(acts.slice(0, showAll ? acts.length : 12).map((a) => ({ label: a[0], v: a[1], fill: 'var(--c3)', value: bn(a[1]) })), { compact: true })}
          ${acts.length > 12 ? `<button class="btn ghost" data-act="estMore">${showAll ? 'Show fewer' : 'Show all ' + acts.length}</button>` : ''}
          ${addRows[s.k] ? `<h4 class="mini">New in the speech for this sector <span class="muted">(Annexure II)</span></h4>${C.hbars(addRows[s.k].sort((a, b) => b[2] - a[2]).slice(0, 10).map((r) => { const ids = BX.ax2link[r[0]]; return { label: r[1], v: r[2], fill: 'var(--c7)', value: bn(r[2]), act: ids ? 'open' : null, arg: ids ? ids[0] : '' }; }), { compact: true })}` : ''}`;
      };

      const draw = () => {
        $$('.subtabs button', root).forEach((b) => { const on = b.dataset.k === tab; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
        lastTab = tab; lastSel = sel;
        if (tab === 'official') { inner = null; drawOfficial(); } else { $('#sbody').innerHTML = ''; inner = speech.mount($('#sbody'), p) || null; }
      };
      let inner = null;
      actions.sectab = (k) => { tab = k; Router.param('t', k === 'official' ? '' : k); draw(); };
      actions.pickEst = (k) => { sel = sel === k ? '' : k; showAll = false; Router.param('e', sel); lastSel = sel; if (tab === 'official') { $$('.tm', root).forEach((t) => t.classList.toggle('on', t.dataset.arg === sel)); drawDetail(); const dd = $('#estdetail'); if (sel && dd) dd.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
      actions.clearEst = () => actions.pickEst(sel);
      actions.estMore = () => { showAll = !showAll; drawDetail(); };
      draw();
      return { update(np) { const nt = np.t === 'speech' ? 'speech' : 'official'; if (nt !== lastTab) { tab = nt; draw(); } else if (tab === 'official' && (np.e || '') !== lastSel) { sel = np.e || ''; lastSel = sel; $$('.tm', root).forEach((t) => t.classList.toggle('on', t.dataset.arg === sel)); drawDetail(); } else if (inner && inner.update) inner.update(np); } };
    }
  };
})();
