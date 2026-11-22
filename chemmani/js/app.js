/* Chemmani: router, helpers, views. No dependencies. Data: data/sources.js, data/facts.js */
(function () {
  const C = window.CH;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fdate = (d) => { const [y, m, dd] = String(d).split('-'); if (!m) return y; if (!dd) return `${MON[+m - 1]} ${y}`; return `${+dd} ${MON[+m - 1]} ${y}`; };

  /* ── citations ── */
  const SHORT = { rep: 'Excavation report', sc: 'Supreme Court', itjp: 'ITJP 2023', hrc: 'HRCSL report', hrcpn: 'HRCSL press notice' };
  const shortName = (id) => {
    const s = C.SOURCES[id]; if (SHORT[id]) return SHORT[id];
    if (/^ai/.test(id)) return 'Amnesty ' + fdate(s.d);
    return s.by.split(' (')[0].replace(/^The /, '') + ' ' + fdate(s.d);
  };
  const cite = (r) => { const [id, loc] = r; return `<button type="button" class="src" data-act="src" data-arg="${id}" aria-label="Source: ${esc(shortName(id))}${loc ? ', ' + esc(loc) : ''}. Open details"><span>${esc(shortName(id))}</span>${loc ? `<span class="loc">${esc(loc)}</span>` : ''}</button>`; };
  const cites = (arr) => arr && arr.length ? `<div class="srcs">${arr.map(cite).join('')}</div>` : '';
  const grade = (g) => g ? `<span class="gr ${g}" title="${esc(C.GRADES[g].desc)}">${esc(C.GRADES[g].label)}</span>` : '';
  const anTag = '<span class="gr an" title="AAMA’s own observation or arithmetic, checkable against the cited page">AAMA reading</span>';
  const noneTag = '<span class="gr none">Not established</span>';

  /* ── events ── */
  const actions = {};
  document.addEventListener('click', (e) => { const t = e.target.closest('[data-act]'); if (!t) return; const f = actions[t.dataset.act]; if (f) { e.preventDefault(); f(t.dataset.arg, t, e); } });

  /* ── tooltip (mouse only) ── */
  const tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
  function showTip(el, x, y) {
    const parts = (el.getAttribute('data-tip') || '').split('|'); if (!parts[0]) return;
    tip.innerHTML = `<b>${esc(parts[0])}</b>` + parts.slice(1).map((p) => `<span>${esc(p)}</span>`).join(''); tip.hidden = false;
    const r = tip.getBoundingClientRect(); let l = x + 14, t = y + 16;
    if (l + r.width > innerWidth - 12) l = x - r.width - 14; if (t + r.height > innerHeight - 12) t = y - r.height - 12;
    tip.style.left = Math.max(12, l) + 'px'; tip.style.top = Math.max(12, t) + 'px';
  }
  /* Mouse only: touch fires emulated mouse events with no "out", which would leave a tooltip stuck after a tap.
     The tip also hides whenever its anchor is gone or no longer under the pointer (views re-render under it). */
  let tipAnchor = null;
  const hideTip = () => { tip.hidden = true; tipAnchor = null; };
  document.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse') return; const t = e.target.closest('[data-tip]'); if (t) { tipAnchor = t; showTip(t, e.clientX, e.clientY); } });
  document.addEventListener('pointermove', (e) => {
    if (tip.hidden) return;
    const t = e.pointerType === 'mouse' && e.target.closest('[data-tip]');
    if (!t || !t.isConnected) { hideTip(); return; }
    tipAnchor = t; showTip(t, e.clientX, e.clientY);
  });
  document.addEventListener('pointerout', (e) => { if (e.pointerType === 'mouse' && e.target.closest('[data-tip]') && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-tip]'))) hideTip(); });
  document.addEventListener('pointerdown', hideTip, { passive: true });
  document.addEventListener('focusin', (e) => { const t = e.target.closest('[data-tip]'); if (t) { tipAnchor = t; const r = t.getBoundingClientRect(); showTip(t, r.left + r.width / 2, r.top + r.height / 2); } });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('scroll', hideTip, { passive: true, capture: true });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideTip(); });
  document.documentElement.addEventListener('mouseleave', hideTip);
  window.addEventListener('blur', hideTip);
  window.addEventListener('hashchange', hideTip);
  document.addEventListener('visibilitychange', hideTip);
  /* Anything that rewrites the page (a view, a filter, chart/table) removes the anchor without a pointerout */
  new MutationObserver(() => { if (tipAnchor && !tipAnchor.isConnected) hideTip(); }).observe(document.body, { childList: true, subtree: true });

  /* ── source drawer ── */
  const dr = document.createElement('aside'); dr.className = 'drawer'; dr.setAttribute('role', 'dialog'); dr.setAttribute('aria-modal', 'true'); dr.setAttribute('aria-hidden', 'true'); dr.setAttribute('aria-label', 'Source details'); dr.tabIndex = -1;
  const scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.append(scrim, dr);
  let lastFocus = null;
  function usesOf(id) {
    const out = []; const has = (s) => (s || []).some((r) => r[0] === id);
    C.EVENTS.forEach((e) => { if (has(e.s)) out.push({ h: e.dl, t: e.t, g: e.g, href: '#/timeline' }); });
    C.COUNTS.forEach((c) => { if (has(c.s)) out.push({ h: c.dl, t: `${c.m === 'over' ? 'Over ' : ''}${c.v}${c.v2 ? ' (' + c.v2 + ' recovered)' : ''}: ${c.note || ''}`, g: c.g, href: '#/numbers' }); });
    [...C.REPORT.says].forEach((x) => { if (x.s[0] === id) out.push({ h: x.h + ' · ' + x.s[1], t: x.t, g: 'record', href: '#/report' }); });
    C.READINGS.forEach((r) => ['a', 'b', 'c'].forEach((k) => { if (r[k] && has(r[k].s)) out.push({ h: r.topic + ' · ' + r[k].who, t: r[k].t, g: r[k].g, href: '#/report' }); }));
    C.DISPUTES.forEach((d) => d.rows.forEach((row) => { if (row[2] === id) out.push({ h: 'Dispute · ' + d.h, t: row[0] + ' (' + row[1] + ')', href: '#/disputes?d=' + d.id }); }));
    return out;
  }
  function openSource(id) {
    const s = C.SOURCES[id]; if (!s) return;
    const uses = usesOf(id);
    dr.innerHTML = `<header class="dr-h"><div><div class="eyebrow mono">${esc(C.KINDS[s.k])} · ${esc(fdate(s.d))}</div><h2 class="display">${esc(s.t)}</h2></div>
      <button class="icon-btn" data-act="closeSrc" aria-label="Close source details"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l10 10M14 4L4 14"/></svg></button></header>
      <div class="dr-b"><dl class="kvs">
        <div class="kv"><dt>By</dt><dd>${esc(s.by)}</dd></div>
        <div class="kv"><dt>Date</dt><dd>${esc(fdate(s.d))}</dd></div>
        <div class="kv"><dt>Type</dt><dd>${esc(C.KINDS[s.k])}</dd></div>
        ${s.read ? `<div class="kv"><dt>What we read</dt><dd>${esc(s.read)}</dd></div>` : `<div class="kv"><dt>What we read</dt><dd>A screenshot of the article</dd></div>`}
      </dl>
      ${s.note ? `<div class="note"><b>Note</b><p>${esc(s.note)}</p></div>` : ''}
      <p><a class="btn" href="${esc(s.u)}" target="_blank" rel="noopener noreferrer">Open the original<svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 2h6v6M10 2L3 9"/></svg></a></p>
      ${s.k === 'paper' ? '<p class="fine">Uthayan front pages are archived on noolaham.org. The link opens the Uthayan index; pick the date shown above.</p>' : ''}
      <h3 class="mini">Cited on this page (${uses.length})</h3>
      <ul class="plain tight">${uses.map((u) => `<li><div class="small muted">${esc(u.h)} ${u.g ? grade(u.g) : ''}</div><div>${esc(u.t)}</div></li>`).join('')}</ul>
      </div>`;
    if (!dr.classList.contains('open')) lastFocus = document.activeElement;
    dr.classList.add('open'); scrim.classList.add('open'); dr.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock');
    $('.dr-b', dr).scrollTop = 0; $('.icon-btn', dr).focus({ preventScroll: true });
  }
  function closeSource() { if (!dr.classList.contains('open')) return; dr.classList.remove('open'); scrim.classList.remove('open'); dr.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  actions.src = openSource; actions.closeSrc = closeSource; scrim.addEventListener('click', closeSource);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && dr.classList.contains('open')) closeSource(); });

  /* ── views ── */
  const V = {};
  const head = (eyebrow, title, lede) => `<header class="vh"><div class="eyebrow">${eyebrow}</div><h1 class="display display-lg">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}</header>`;

  V.overview = { title: 'Overview', mount(r) {
    const court = C.EVENTS.filter((e) => e.g === 'court');
    r.innerHTML = `
      <section class="hero-sec">
        <div class="eyebrow">Jaffna · 1996 to 2026</div>
        <h1 class="display display-xl">Chemmani: what the record shows</h1>
        <p class="lede">Human remains were found in February 2025 at a cemetery in Chemmani, on the edge of Jaffna. The same area was at the centre of a 1996 murder case and a 1999 exhumation. This page sets out what each source says, how strong that source is, and where they disagree.</p>
        <div class="cnote" role="note" style="margin-top:22px"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="9" cy="9" r="7.2"/><path d="M9 5.2v4.6M9 12.4v.2" stroke-linecap="round"/></svg>
          <p><b>Content note.</b> This page covers killings, enforced disappearances and the remains of children. It has no photographs of remains. Some quoted sources describe how bodies were found.</p></div>
      </section>
      <section class="keys" aria-label="Key figures">${C.KEY.map((k) => `<div class="key">${grade(k.g)}<div class="kv-v">${esc(k.v)}</div><div class="kv-l">${esc(k.l)}</div><div class="kv-s">${esc(k.sub)}${k.an ? ' · AAMA arithmetic' : ''}</div>${cites(k.s)}</div>`).join('')}</section>
      <section class="sec">
        <h2 class="display display-md">Three kinds of knowledge</h2>
        <p class="lede sm">Every statement on this page carries a grade. The grade says what kind of source it comes from, not whether we believe it.</p>
        <div class="states">
          <div class="card state">${grade('court')}<h3>Found by a court</h3><ul>
            <li>On 7 September 1996, <b>Krishanthi Kumaraswamy</b>, 18, her mother <b>Rasamma</b>, her brother <b>Pranavan</b>, 16, and family friend <b>Siddambaram Kirubamoorthi</b> were killed. The convicted men included members of the Army assigned to the Chemmani checkpoint.</li>
            <li>Their bodies were buried in pits behind the checkpoint and later exhumed nearby.</li>
            <li>The Supreme Court affirmed the convictions on 3 February 2004.</li></ul>${cites([['sc', 'pp. 8, 9, 11, 39']])}</div>
          <div class="card state">${grade('record')}<h3>Recorded, but disputed</h3><ul>
            <li>The 2026 excavation report counts at least <b>574</b> individuals; 41% children and 22% infants by preliminary estimate.</li>
            <li>HRCSL (2025) found a “reasonable likelihood” the burials were unlawful and followed extrajudicial killings.</li>
            <li>The report (2026) says the site looks more like formal burial than a clandestine grave, and raises an epidemic as a possibility. The court said it need not rely on it.</li></ul>${cites([['rep', '§8, §18'], ['hrc', 'p. 4'], ['jm1120', '']])}</div>
          <div class="card state">${noneTag}<h3>Not established</h3><ul>
            ${C.UNKNOWNS.slice(0, 5).map((u) => `<li><b>${esc(u.h)}.</b> ${esc(u.t.split('. ')[0].replace(/\.$/, ''))}.</li>`).join('')}</ul><p style="margin-top:12px"><a class="lnk" href="#/disputes">All open questions and disputes</a></p></div>
        </div>
      </section>
      <section class="sec">
        <h2 class="display display-md">Explore</h2>
        <div class="qgrid">
          <a class="qcard" href="#/timeline"><span class="qn mono">01</span><span class="qt">Timeline, 1996 to 2026</span><span class="qs">${C.EVENTS.length} dated events, each graded and sourced</span></a>
          <a class="qcard" href="#/numbers"><span class="qn mono">02</span><span class="qt">How the count grew</span><span class="qs">From 19 in May 2025 to 574–584</span></a>
          <a class="qcard" href="#/report"><span class="qn mono">03</span><span class="qt">The excavation report</span><span class="qs">What it says, and two readings of the site</span></a>
          <a class="qcard" href="#/disputes"><span class="qn mono">04</span><span class="qt">Where sources disagree</span><span class="qs">${C.DISPUTES.length} conflicts, shown side by side</span></a>
        </div>
      </section>
      <section class="sec"><h2 class="display display-md">How to read the grades</h2>${legend()}</section>`;
  } };

  function legend() { return `<div class="glegend">${Object.keys(C.GRADES).map((g) => `<div>${grade(g)}<span>${esc(C.GRADES[g].desc)}</span></div>`).join('')}<div>${anTag}<span>AAMA’s own arithmetic or observation, checkable against the page cited.</span></div><div>${noneTag}<span>No source we read settles this. We do not fill the gap.</span></div></div>`; }

  /* Timeline */
  V.timeline = { title: 'Timeline', mount(r, p) {
    const ERAS = [['all', 'All'], ['then', '1996–99'], ['between', '2000–24'], ['now', '2025–26']];
    const state = { era: p.era || 'all', g: p.g || '' };
    function draw() {
      const evs = C.EVENTS.slice().sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0).filter((e) => (state.era === 'all' || e.era === state.era) && (!state.g || e.g === state.g));
      const years = {}; evs.forEach((e) => (years[e.d.slice(0, 4)] = years[e.d.slice(0, 4)] || []).push(e));
      r.innerHTML = head('Timeline', 'Chemmani, 1996 to 2026', 'Each entry gives the date, the grade of its source and the source itself. Select a source to see what it is and everything else it supports.') + `
        <div class="controls"><div class="seg" role="group" aria-label="Period">${ERAS.map(([k, l]) => `<button type="button" class="${k === state.era ? 'on' : ''}" aria-pressed="${k === state.era}" data-act="era" data-arg="${k}">${l}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Filter by grade" style="margin:0"><button type="button" class="chip ${!state.g ? 'on' : ''}" aria-pressed="${!state.g}" data-act="tg" data-arg="">All grades</button>${Object.keys(C.GRADES).map((g) => `<button type="button" class="chip ${state.g === g ? 'on' : ''}" aria-pressed="${state.g === g}" data-act="tg" data-arg="${g}">${esc(C.GRADES[g].label)}</button>`).join('')}</div></div>
        <p class="small muted" aria-live="polite">${evs.length} of ${C.EVENTS.length} events</p>
        <ol class="tl">${Object.keys(years).map((y) => `<li class="tl-y"><div class="tl-yl">${y}</div><ul class="tl-evs">${years[y].map((e) => `
          <li class="ev ${e.future ? 'future' : ''}"><div class="ev-h"><span class="mono">${esc(e.dl)}</span>${grade(e.g)}${e.future ? '<span class="chip">Scheduled</span>' : ''}</div>
            ${e.who ? `<div class="ev-who">${esc(e.who)} said:</div>` : ''}<p class="ev-t">${esc(e.t)}</p>
            ${e.note ? `<p class="ev-note">${esc(e.note)}</p>` : ''}${e.conflict ? `<p class="ev-c"><a href="#/disputes?d=${e.conflict}">Sources disagree on this. See the comparison</a></p>` : ''}
            ${cites(e.s)}</li>`).join('')}</ul></li>`).join('')}</ol>
        ${evs.length ? '' : '<div class="empty"><p>No events match. <button class="lnk" data-act="tg" data-arg="">Show all grades</button></p></div>'}`;
    }
    actions.era = (k) => { state.era = k; history.replaceState(null, '', '#/timeline' + q(state)); draw(); };
    actions.tg = (g) => { state.g = g; history.replaceState(null, '', '#/timeline' + q(state)); draw(); };
    draw();
  } };
  const q = (o) => { const s = new URLSearchParams(Object.entries(o).filter(([k, v]) => v && v !== 'all')).toString(); return s ? '?' + s : ''; };

  /* Numbers */
  V.numbers = { title: 'How the count grew', mount(r, p) {
    let mode = p.v === 'table' ? 'table' : 'chart';
    function chart() {
      const W = 760, H = 340, L = 48, R = 20, T = 24, B = 40;
      const t0 = Date.UTC(2025, 3, 15), t1 = Date.UTC(2026, 10, 15);
      const x = (d) => { const [y, m, dd] = d.split('-').map(Number); return L + (Date.UTC(y, m - 1, dd) - t0) / (t1 - t0) * (W - L - R); };
      const y = (v) => T + (1 - v / 700) * (H - T - B);
      const grid = [0, 100, 200, 300, 400, 500, 600, 700].map((v) => `<line class="gl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join('');
      const ticks = ['2025-05-01', '2025-08-01', '2025-11-01', '2026-02-01', '2026-05-01', '2026-08-01', '2026-11-01'].map((d) => `<text x="${x(d)}" y="${H - B + 18}" text-anchor="middle">${MON[+d.slice(5, 7) - 1]} ${d.slice(2, 4)}</text>`).join('');
      // pauses in digging, from the timeline
      const pauses = [['2025-09-06', '2026-04-27', 'No digging'], ['2026-08-19', '2026-11-15', 'Digging ended']].map(([a, b, l]) => `<rect class="band" x="${x(a)}" y="${T}" width="${x(b) - x(a)}" height="${H - T - B}" opacity=".55"/><text class="bandl" x="${(x(a) + x(b)) / 2}" y="${H - B - 10}" text-anchor="middle">${l}</text>`).join('');
      // Solid while digging; dashed across the pause (count held at 240) and the unrecorded weeks after the restart
      const P = (d, v) => `${x(d).toFixed(1)},${y(v).toFixed(1)}`;
      const line = `<path class="ln" d="M${P('2025-05-24', 19)} L${P('2025-08-21', 147)} L${P('2025-09-06', 240)}"/>`
        + `<path class="ln" stroke-dasharray="4 4" d="M${P('2025-09-06', 240)} L${P('2026-04-27', 240)} L${P('2026-07-15', 412)}"/>`
        + `<path class="ln" d="M${P('2026-07-15', 412)} L${P('2026-08-07', 515)} L${P('2026-08-19', 582)}"/>`;
      const off = { '2025-08-21': [-10, 4, 'end'], '2025-09-03': [10, 18, 'start'], '2025-09-06': [8, -10, 'start'], '2026-08-07': [-10, 4, 'end'], '2026-08-19': [-10, -8, 'end'], '2026-08-20': [8, 20, 'start'], '2026-10-10': [0, 24, 'middle'], '2026-10-20': [-4, -12, 'end'], '2026-10-25': [10, 4, 'start'] };
      const mark = (c) => {
        const cx = x(c.d), cy = y(c.v), s = c.m;
        const tipTxt = `${c.dl}: ${c.m === 'over' ? 'over ' : ''}${c.v}${c.v2 ? ' (' + c.v2 + ' recovered)' : ''}|${C.MEASURES[c.m]}|${c.s.map((r) => shortName(r[0])).join('; ')}`;
        const shape = s === 'mni' ? `<rect x="${cx - 6}" y="${cy - 6}" width="12" height="12" transform="rotate(45 ${cx} ${cy})" fill="var(--c2)"/>`
          : s === 'over' ? `<path d="M${cx},${cy - 7} L${cx + 7},${cy + 5} L${cx - 7},${cy + 5} Z" fill="var(--c3)"/>`
          : s === 'claim' ? `<circle cx="${cx}" cy="${cy}" r="6" fill="var(--surface)" stroke="var(--ink-soft)" stroke-width="1.6" stroke-dasharray="2 2"/>`
          : `<circle cx="${cx}" cy="${cy}" r="6" fill="var(--c1)" stroke="var(--surface)" stroke-width="2"/>`;
        const o = off[c.d] || [0, -12, 'middle'];
        return `<g class="pt" data-tip="${esc(tipTxt)}" tabindex="0" role="img" aria-label="${esc(tipTxt.replace(/\|/g, '. '))}"><circle class="hit" cx="${cx}" cy="${cy}" r="14"/>${shape}<text class="val" x="${cx + o[0]}" y="${cy + o[1]}" text-anchor="${o[2]}">${c.m === 'over' ? '>' : ''}${c.v}</text></g>`;
      };
      return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="group" aria-label="Reported number of remains, May 2025 to November 2026">${pauses}${grid}<line class="ax" x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}"/>${ticks}${line}${C.COUNTS.map(mark).join('')}</svg>
        <ul class="mk-legend"><li><svg width="14" height="14"><circle cx="7" cy="7" r="6" fill="var(--c1)"/></svg>Sets identified (news)</li><li><svg width="14" height="14"><path d="M7,1 L13,12 L1,12 Z" fill="var(--c3)"/></svg>“Over” (HRCSL)</li><li><svg width="14" height="14"><rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill="var(--c2)"/></svg>Minimum number of individuals (report)</li><li><svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--ink-soft)" stroke-width="1.6" stroke-dasharray="2 2"/></svg>Figure given by a lawyer</li></ul>`;
    }
    function table() {
      return `<div class="tscroll"><table class="dt"><caption class="sr">Reported number of remains by date</caption><thead><tr><th scope="col">Date</th><th scope="col" class="num">Figure</th><th scope="col">Measure</th><th scope="col">Grade</th><th scope="col">Source</th></tr></thead><tbody>${C.COUNTS.map((c) => `<tr><th scope="row">${esc(c.dl)}</th><td class="num">${c.m === 'over' ? '>' : ''}${c.v}${c.v2 ? ` <span class="muted">(${c.v2} recovered)</span>` : ''}</td><td>${esc(C.MEASURES[c.m])}${c.note ? `<div class="small muted">${esc(c.note)}</div>` : ''}</td><td>${grade(c.g)}</td><td>${c.s.map(cite).join(' ')}</td></tr>`).join('')}</tbody></table></div>`;
    }
    function draw() {
      r.innerHTML = head('The numbers', 'How the count grew', 'Each point is a figure as a source stated it, on the date it was stated. We do not average or reconcile them. The solid line joins field counts while digging was under way; the dashed line spans the pause and the weeks with no published figure.') + `
        <div class="controls"><div class="seg" role="group" aria-label="View as"><button type="button" class="${mode === 'chart' ? 'on' : ''}" aria-pressed="${mode === 'chart'}" data-act="nv" data-arg="chart">Chart</button><button type="button" class="${mode === 'table' ? 'on' : ''}" aria-pressed="${mode === 'table'}" data-act="nv" data-arg="table">Table</button></div></div>
        <div class="card">${mode === 'chart' ? chart() : table()}</div>
        <section class="sec tight"><div class="two">
          <div class="card insight">${anTag}<h3>Why there are three final totals</h3><p>The 574 in the report is a minimum number of individuals: the fewest people the bones could come from. The 582 to 584 in news reports are field counts of sets of remains. Both can be right at once. Neither is a count of identified people: no one has been identified.</p></div>
          <div class="card insight">${anTag}<h3>Gaps in the record</h3><p>Phase three found 21 remains from 27 April to 9 May 2026 (Daily Mirror). We have no dated figure between May and mid-July 2026 except a lawyer’s “252, the last I checked”. The 1999 exhumation found 15 people, at least a kilometre away according to Jaffna Monitor.</p>${cites([['dm26', ''], ['jm1120', '']])}</div>
        </div></section>`;
    }
    actions.nv = (m) => { mode = m; history.replaceState(null, '', '#/numbers' + (m === 'table' ? '?v=table' : '')); draw(); };
    draw();
  } };

  /* Report */
  V.report = { title: 'The excavation report', mount(r) {
    const R = C.REPORT; const max = Math.max(...R.ages.map((a) => a[1]));
    const omax = R.orient[0][1];
    r.innerHTML = head('The 2026 report', 'What the excavation report says', 'Raj Somadeva and Anusha Wanninayake’s summary report was submitted to the Jaffna Magistrate’s Court on 19 October 2026. We read all 21 pages. It is the only scientific document on the 2025–26 excavation that we have.') + `
      <div class="stats">${R.stats.map((s) => `<div class="stat"><div class="sl">${esc(s.l)}</div><div class="sv">${esc(s.v)}</div>${cites([s.s])}</div>`).join('')}</div>
      <section class="sec tight"><div class="two">
        <div class="card"><h3 class="mini">Estimated age at death ${grade('record')}</h3>
          <div class="vbars" role="img" aria-label="Age categories: ${R.ages.map((a) => a[0] + ' ' + a[1] + '%').join(', ')}">${R.ages.map((a) => `<div class="vb" data-tip="${esc(a[0])}: ${a[1]}%|About ${Math.round(a[1] / 100 * 574)} of 574 (AAMA arithmetic)"><b>${a[1]}%</b><i style="height:${a[1] / max * 85}%"></i></div>`).join('')}</div>
          <div class="vbl">${R.ages.map((a) => `<div>${esc(a[0])}<span>≈${Math.round(a[1] / 100 * 574)}</span></div>`).join('')}</div>
          <p class="fine">Share of the 574. Counts under each bar are AAMA arithmetic from the percentages. The report calls these “preliminary field evaluations”; they add up to 98%.</p>${cites([R.agesSrc])}</div>
        <div class="card"><h3 class="mini">Which way the skulls faced ${grade('record')}</h3>
          <ul class="hbars compact">${R.orient.map((o) => `<li class="hrow" data-tip="${esc(o[0])}: ${o[1]}%"><span class="hl"><span class="hn">${esc(o[0])}</span></span><span class="ht"><span class="hb" style="width:${o[1] / omax * 100}%;background:var(--c1)"></span></span><span class="hv">${o[1]}%</span></li>`).join('')}</ul>
          <p class="fine">The text says there is no uniform pattern. The chart shows 72% facing north-west.</p>${cites([R.orientSrc])}</div>
      </div></section>
      <section class="sec tight"><h2 class="display display-md">In the report’s words</h2><div class="says">${R.says.map((s) => `<div class="say"><h4>${esc(s.h)}</h4><p>${esc(s.t)}</p>${cites([s.s])}</div>`).join('')}</div></section>
      <section class="sec tight"><h2 class="display display-md">What we noticed reading it ${anTag}</h2><p class="lede sm">These are AAMA’s observations. Each can be checked on the page cited.</p>
        <ul class="notes">${R.notes.map((n) => `<li>${esc(n.t)}${cites([n.s])}</li>`).join('')}</ul></section>
      <section class="sec"><h2 class="display display-md">Two readings of the same site</h2><p class="lede sm">HRCSL wrote in September 2025, when just over 200 remains had been found. The report came in October 2026, after the dig. They read similar evidence differently.</p>
        ${C.READINGS.map((x) => `<div class="rd"><h3>${esc(x.topic)}</h3><div class="rd-g">${['a', 'b'].map((k) => `<div class="rd-c"><div class="who">${esc(x[k].who)} ${grade(x[k].g)}</div><p>${esc(x[k].t)}</p>${cites(x[k].s)}</div>`).join('')}</div>${x.c ? `<div class="rd-x"><span class="who">${esc(x.c.who)}</span>${esc(x.c.t)}${cites(x.c.s)}</div>` : ''}</div>`).join('')}
      </section>`;
  } };

  /* Disputes and gaps */
  V.disputes = { title: 'Where sources disagree', mount(r, p) {
    r.innerHTML = head('Disputes and gaps', 'Where sources disagree', 'We show conflicting figures side by side and do not merge them. Where no source settles a question, we say so.') + `
      <div class="dps">${C.DISPUTES.map((d) => `<article class="card dp ${p.d === d.id ? 'hl' : ''}" id="d-${d.id}"><h3>${esc(d.h)}</h3><p>${esc(d.t)}</p>
        <ul class="dp-rows">${d.rows.map((row) => `<li><b>${esc(row[0])}</b>${cite([row[2], row[1]])}</li>`).join('')}</ul></article>`).join('')}</div>
      <section class="sec"><h2 class="display display-md">Not established</h2><p class="lede sm">No source we read answers these. We have not filled them in from memory or from sources outside the evidence pack.</p>
        <div class="unk">${C.UNKNOWNS.map((u) => `<div>${noneTag}<h4>${esc(u.h)}</h4><p>${esc(u.t)}</p>${cites(u.s)}</div>`).join('')}</div></section>`;
    if (p.d) { const el = $('#d-' + p.d); if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 30); }
  } };

  /* Sources and method */
  V.sources = { title: 'Sources and method', mount(r) {
    const count = {}; JSON.stringify(C, (k, v) => { if (typeof v === 'string' && C.SOURCES[v] && k !== 'u') count[v] = (count[v] || 0) + 1; return v; });
    const ids = Object.keys(C.SOURCES).sort((a, b) => C.SOURCES[a].d < C.SOURCES[b].d ? -1 : 1);
    const groups = [['court', 'Court'], ['expert', 'Expert report'], ['official', 'Statutory body'], ['ngo', 'Human-rights groups'], ['news', 'News'], ['paper', 'Newspaper front pages']];
    r.innerHTML = head('Sources and method', 'Where every statement comes from', `${ids.length} documents. Every statement on this page links to at least one of them.`) + `
      <section class="sec tight"><h2 class="display display-md">Grades</h2>${legend()}</section>
      <section class="sec tight"><h2 class="display display-md">Method</h2><div class="card"><ul class="plain">
        <li>AAMA read the full excavation report PDF and screenshots of the pages and articles listed below, from an evidence pack prepared for a video on Chemmani. Page numbers are those shown in the screenshots.</li>
        <li>Wording follows the source. Statements by lawyers, MPs, ministers, officials and convicted people are attributed and graded as claims.</li>
        <li>Victims are named only where the Supreme Court judgment names them. People are named as responsible only where a court record does so.</li>
        <li>Figures are shown as each source stated them, on the date stated. We do not average, adjust or reconcile them.</li>
        <li>Where we add arithmetic or an observation, it is marked “AAMA reading”.</li>
        <li>No photographs of remains are used.</li></ul></div></section>
      ${groups.map(([k, l]) => { const list = ids.filter((id) => C.SOURCES[id].k === k); return list.length ? `<section class="sec tight"><h3 class="mini">${l} (${list.length})</h3><ul class="srclist">${list.map((id) => { const s = C.SOURCES[id]; return `<li><span class="sd">${esc(fdate(s.d))}</span><div><button type="button" class="lnk st" data-act="src" data-arg="${id}">${esc(s.t)}</button><div class="sb">${esc(s.by)}${s.read ? ' · Read: ' + esc(s.read) : ''}</div></div><span class="sn">${count[id] || 0} cites</span></li>`; }).join('')}</ul></section>` : ''; }).join('')}
      <section class="sec tight"><h3 class="mini">In the evidence pack but not verified by AAMA</h3><p class="small muted" style="max-width:70ch">These video statements and footage are listed in the evidence index. We have not seen transcripts, so nothing on this page relies on them.</p>
        <ul class="srclist">${C.UNVERIFIED.map((u) => `<li><span class="sd">${esc(u[1])}</span><div><a class="st" href="${esc(u[2])}" target="_blank" rel="noopener noreferrer">${esc(u[0])}</a><div class="sb">YouTube</div></div><span class="sn">0 cites</span></li>`).join('')}</ul></section>`;
  } };

  /* ── router ── */
  let curName = null;
  function parse() { const h = location.hash.slice(1) || '/overview'; const [path, qs] = h.split('?'); const v = path.replace(/^\//, '') || 'overview'; const params = {}; new URLSearchParams(qs || '').forEach((val, k) => params[k] = val); return { view: V[v] ? v : 'overview', params }; }
  function handle() {
    const { view, params } = parse(); const root = $('#view');
    closeSource(); curName = view; root.innerHTML = '';
    try { V[view].mount(root, params); } catch (err) { console.error(err); root.innerHTML = '<div class="empty"><h1 class="display display-lg">This page didn’t load</h1><p class="lede" style="margin:12px auto">Reloading usually fixes it.</p><p><button class="btn" onclick="location.reload()">Reload the page</button></p></div>'; }
    document.title = view === 'overview' ? 'Chemmani: what the record shows · AAMA' : V[view].title + ' · Chemmani · AAMA';
    $$('.tabs [data-view]').forEach((a) => { const on = a.dataset.view === view; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
    if (!params.d) scrollTo({ top: 0, behavior: 'instant' });
    root.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', handle);
  window.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement; let th = 'light'; try { th = localStorage.getItem('aama-theme') || 'light'; } catch (e) {}
    root.setAttribute('data-theme', th);
    actions.theme = () => { th = th === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', th); try { localStorage.setItem('aama-theme', th); } catch (e) {} const b = $('#theme-btn'); if (b) b.setAttribute('aria-label', th === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); };
    handle();
  });
})();
