/* Budget 2027 explorer — core: indexes, formatters, router, tooltip, drawer. No dependencies. */
(function () {
  const B = window.B27;
  const LENSES = !!(B.CONFIG && B.CONFIG.showLenses) && !!B.LAND && !!B.MKT;   // Land & Market lenses
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ── formatters ── */
  const trim = (n, d) => { const s = n.toFixed(d); return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s; };
  const fmt = {
    rs(m, o = {}) {                                  // m = Rs million
      if (m == null || isNaN(m)) return '—';
      const a = Math.abs(m), sg = m < 0 ? '−' : '', p = o.plain ? '' : 'Rs ';
      if (a >= 1e6) return `${sg}${p}${trim(a / 1e6, 2)}tn`;
      if (a >= 1000) return `${sg}${p}${trim(a / 1000, a >= 100000 ? 0 : a >= 10000 ? 1 : 1)}bn`;
      return `${sg}${p}${trim(a, 1)}M`;
    },
    bn(b, o = {}) { return fmt.rs(b * 1000, o); },   // b = Rs billion
    n: (x) => x == null ? '—' : Number(x).toLocaleString('en-US'),
    pct: (x, d = 1) => `${trim(x, d)}%`,
    sign: (x, d = 1) => (x > 0 ? '+' : x < 0 ? '−' : '') + trim(Math.abs(x), d)
  };

  /* ── data index ── */
  const I = {}; const list = B.INIT;
  const distNames = Object.keys(B.DIST);
  list.forEach((i) => {
    I[i.id] = i;
    i.cnt = !i.in && !i.um;                                // counted in sums
    i.gs = String(i.g || '').split(',').filter(Boolean);
    const ps = String(i.p || '*').split(',').map((s) => s.trim()).filter(Boolean);
    i.national = ps.includes('*');
    const provs = new Set(), dists = [];
    let provLevel = false;
    ps.forEach((p) => { if (p.startsWith('P:')) { provLevel = true; provs.add(p.slice(2)); } else if (p !== '*' && B.DIST[p]) { dists.push(p); provs.add(B.DIST[p].p); } });
    i.dists = dists; i.provs = Array.from(provs); i.provLevel = provLevel;
    i.y0 = i.y ? i.y[0] : null; i.y1 = i.y ? i.y[1] : null;
    i.theme = B.SECTORS[i.s].theme;
    i.sectorLabel = B.SECTORS[i.s].label;
  });
  const taxById = {}; B.TAX.forEach((t) => taxById[t.id] = t);
  const ax2by = {}; B.ANX2.forEach((r) => ax2by[r[0]] = r);
  const ax7by = {}; B.ANX7.forEach((r) => ax7by[r[0]] = r);
  const ax2link = {}, ax7link = {};
  list.forEach((i) => { if (i.ax2) (ax2link[i.ax2] = ax2link[i.ax2] || []).push(i.id); if (i.ax7) (ax7link[i.ax7] = ax7link[i.ax7] || []).push(i.id); });

  const sum = (arr, f) => arr.reduce((s, x) => s + ((f ? f(x) : x) || 0), 0);
  const counted = list.filter((i) => i.cnt);

  /* Sector sizes: the larger of (a) a stated envelope and (b) the sum of itemised lines */
  const sectorStats = {};
  Object.keys(B.SECTORS).forEach((k) => sectorStats[k] = { key: k, item: 0, env: 0, n: 0, items: [] });
  counted.forEach((i) => { const s = sectorStats[i.s]; s.item += i.a || 0; s.n++; s.items.push(i); });
  list.filter((i) => i.um).forEach((i) => { sectorStats[i.s].env = Math.max(sectorStats[i.s].env, i.a); });
  B.ENVELOPES.forEach((e) => { sectorStats[e.s].env = Math.max(sectorStats[e.s].env, e.a); });
  Object.values(sectorStats).forEach((s) => { s.size = Math.max(s.item, s.env); s.theme = B.SECTORS[s.key].theme; });

  /* Geography: how each counted initiative is attributed */
  function geo(opts = {}) {
    const dist = {}, prov = {}; let national = 0, natN = 0;
    distNames.forEach((d) => dist[d] = { v: 0, n: 0, items: [], shared: 0 });
    Object.keys(B.PROV).forEach((p) => prov[p] = { v: 0, n: 0, items: [] });
    counted.forEach((i) => {
      const a = i.a || 0;
      if (i.national) { national += a; natN++; return; }
      // district attribution — only when the speech names districts and no whole-province scope
      if (!i.provLevel && i.dists.length) {
        const share = a / i.dists.length;
        i.dists.forEach((d) => { dist[d].v += (i.dists.length === 1 || opts.split) ? share : 0; dist[d].n++; dist[d].items.push(i); if (i.dists.length > 1) dist[d].shared++; });
      }
      // province attribution — equal split across provinces named / implied
      if (i.provs.length) {
        const share = a / i.provs.length;
        i.provs.forEach((p) => { prov[p].v += share; prov[p].n++; prov[p].items.push(i); });
      }
    });
    if (opts.ddp) distNames.forEach((d) => { dist[d].v += 2000; });
    return { dist, prov, national, natN };
  }

  /* ── tiny state/event helpers ── */
  const actions = {};
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]');
    if (!t) return;
    const f = actions[t.dataset.act];
    if (f) { e.preventDefault(); f(t.dataset.arg, t, e); }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[role="button"][data-act]')) { e.preventDefault(); e.target.click(); }
  });

  /* ── tooltip ── */
  const tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; document.body.appendChild(tip);
  function showTip(el, x, y) {
    const raw = el.getAttribute('data-tip'); if (!raw) return;
    const parts = raw.split('|');
    tip.innerHTML = `<b>${esc(parts[0])}</b>` + parts.slice(1).map((p) => `<span>${esc(p)}</span>`).join('');
    tip.hidden = false;
    const r = tip.getBoundingClientRect(); const pad = 12;
    let left = x + 14, top = y + 16;
    if (left + r.width > innerWidth - pad) left = x - r.width - 14;
    if (top + r.height > innerHeight - pad) top = y - r.height - 12;
    tip.style.left = Math.max(pad, left) + 'px'; tip.style.top = Math.max(pad, top) + 'px';
  }
  /* Mouse only: touch fires emulated mouse events with no "out", which would leave a tooltip stuck after a tap. */
  document.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse') return; const t = e.target.closest('[data-tip]'); if (t) showTip(t, e.clientX, e.clientY); });
  document.addEventListener('pointermove', (e) => { if (e.pointerType !== 'mouse' || tip.hidden) return; const t = e.target.closest('[data-tip]'); if (t) showTip(t, e.clientX, e.clientY); });
  document.addEventListener('pointerout', (e) => { if (e.pointerType === 'mouse' && e.target.closest('[data-tip]')) tip.hidden = true; });
  document.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') tip.hidden = true; }, { passive: true });
  document.addEventListener('focusin', (e) => { const t = e.target.closest('[data-tip]'); if (t) { const r = t.getBoundingClientRect(); showTip(t, r.left + r.width / 2, r.top + r.height / 2); } });
  document.addEventListener('focusout', () => { tip.hidden = true; });
  document.addEventListener('scroll', () => { tip.hidden = true; }, { passive: true });

  /* ── router ── */
  const views = {}; let cur = null, curName = null; const root = () => $('#view');
  function parse() {
    const h = location.hash.slice(1) || '/overview';
    const [path, q] = h.split('?');
    const view = path.replace(/^\//, '').split('/')[0] || 'overview';
    const params = {}; new URLSearchParams(q || '').forEach((v, k) => params[k] = v);
    const hidden = !LENSES && (view === 'land' || view === 'markets');
    return { view: views[view] && !hidden ? view : 'overview', params };
  }
  function build(view, params) {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== '' && v != null && v !== false)).toString();
    return '#/' + view + (qs ? '?' + qs : '');
  }
  function handle(opts = {}) {
    const { view, params } = parse();
    if (view !== curName) {
      if (cur && cur.destroy) cur.destroy();
      curName = view; const r = root(); r.innerHTML = '';
      cur = views[view].mount(r, params) || {};
      document.title = (views[view].title || 'Budget 2027 explorer') + ' · AAMA';
      $$('.tabs [data-view]').forEach((a) => { const on = a.dataset.view === view; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); const t = $('.tabs'); if (on && t && !opts.noscroll) { const l = a.offsetLeft - 24; t.scrollTo({ left: l, behavior: 'smooth' }); } });
      if (!opts.keepScroll && scrollY > 0) scrollTo({ top: 0, behavior: 'instant' });
      r.focus({ preventScroll: true });
    } else if (cur && cur.update) cur.update(params);
    drawer(params.i);
  }
  const Router = {
    go(view, params = {}, replace = false) {
      const h = build(view, params);
      if (replace) { history.replaceState(null, '', h); handle({ keepScroll: true }); } else if (h === location.hash) handle(); else location.hash = h;
    },
    param(k, v) { const { view, params } = parse(); params[k] = v; Router.go(view, params, true); },
    params: () => parse().params, view: () => parse().view
  };
  window.addEventListener('hashchange', () => handle());

  /* ── drawer: initiative detail ── */
  const dr = document.createElement('aside'); dr.className = 'drawer'; dr.setAttribute('aria-hidden', 'true'); dr.setAttribute('role', 'dialog'); dr.setAttribute('aria-label', 'Initiative details'); dr.tabIndex = -1;
  const scrim = document.createElement('div'); scrim.className = 'scrim'; document.body.append(scrim, dr);
  let lastFocus = null;
  function chip(txt, cls = '') { return `<span class="chip ${cls}">${esc(txt)}</span>`; }
  function drawer(id) {
    const i = id && I[id];
    if (!i) { if (dr.classList.contains('open')) { dr.classList.remove('open'); scrim.classList.remove('open'); dr.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); if (lastFocus) lastFocus.focus({ preventScroll: true }); } return; }
    const ax = []; if (i.ax2) ax.push(`Annexure II · #${i.ax2}`); if (i.ax7) ax.push(`Annexure VII · #${i.ax7}`);
    const land = LENSES ? B.LAND.filter((l) => l.ids.includes(i.id)) : []; const mk = []; (LENSES ? B.MKT : []).forEach((m) => m.drivers.forEach((d) => { if (d.refs.includes(i.id)) mk.push([m, d]); }));
    const evs = B.EVENTS.filter((e) => e.ids.includes(i.id));
    const kv = (k, v) => v ? `<div class="kv"><dt>${k}</dt><dd>${v}</dd></div>` : '';
    const where = i.national ? 'Nationwide' : [...i.dists, ...i.provs.filter((p) => i.provLevel).map((p) => B.PROV[p] + ' Province')].join(', ') || '—';
    dr.innerHTML = `
      <header class="dr-h"><div><div class="eyebrow mono">${esc(i.sectorLabel)} · ${esc(i.ref || '')}</div><h2 class="display">${esc(i.t)}</h2></div>
        <button class="icon-btn" data-act="closeDrawer" aria-label="Close details"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l10 10M14 4L4 14"/></svg></button></header>
      <div class="dr-b">
        <div class="chips">${chip(B.STATUS[i.st], 'st-' + i.st)}${chip(B.FUND[i.f])}${i.fd ? chip(i.fd) : ''}${i.um ? chip('Umbrella total — not added to sums') : ''}${i.in ? chip('Included in “' + (I[i.in] ? I[i.in].t.split(' (')[0].slice(0, 42) : i.in) + '”') : ''}</div>
        <dl class="kvs">
          ${i.a != null ? kv('2027 allocation', `<strong class="big">${fmt.rs(i.a)}</strong>`) : kv('2027 allocation', '<span class="muted">Not stated in the speech</span>')}
          ${i.add != null ? kv('New money in this Budget', fmt.rs(i.add)) : ''}
          ${i.tc != null ? kv('Total project cost / financing', fmt.rs(i.tc) + (i.d ? ' <span class="muted">(USD converted at Rs 300.6)</span>' : '')) : ''}
          ${i.lv != null ? kv('Loans it unlocks', fmt.rs(i.lv)) : ''}
          ${kv('Where', esc(where) + (i.loc ? `<div class="muted small">As worded: ${esc(i.loc)}</div>` : ''))}
          ${kv('When', i.y ? (i.y0 === i.y1 ? i.y0 : `${i.y0} – ${i.y1}`) : '')}
          ${kv('Implementing body', esc(i.o))}
        </dl>
        ${i.m ? `<div class="note"><b>Key facts</b><p>${esc(i.m)}</p></div>` : ''}
        ${i.gs.length ? `<h3 class="mini">Who it affects</h3><div class="chips">${i.gs.map((g) => `<a class="chip link" href="#/me?g=${g}">${esc(B.GROUPS[g])}</a>`).join('')}</div>` : ''}
        ${ax.length ? `<h3 class="mini">Listed as new in</h3><div class="chips">${ax.map((a) => chip(a, 'ok')).join('')}</div>` : ''}
        ${evs.length ? `<h3 class="mini">Dates</h3><ul class="plain">${evs.map((e) => `<li><span class="mono">${esc(e.d)}</span> ${esc(e.t)}</li>`).join('')}</ul>` : ''}
        ${land.length ? `<h3 class="mini">Land catalysts <span class="tag an">AAMA analysis</span></h3><ul class="plain">${land.map((l) => `<li><a href="#/land?l=${l.id}">${esc(l.name)}</a></li>`).join('')}</ul>` : ''}
        ${mk.length ? `<h3 class="mini">Market read-through <span class="tag an">AAMA analysis</span></h3><ul class="plain">${mk.map(([m, d]) => `<li><a href="#/markets?s=${m.id}">${esc(m.name)}</a> — ${d.dir > 0 ? 'tailwind' : d.dir < 0 ? 'headwind' : 'neutral'}</li>`).join('')}</ul>` : ''}
        <div class="dr-f"><button class="btn ghost" data-act="copyLink">Copy link</button><a class="btn ghost" href="#/sources">How we got this</a></div>
        <p class="fine">Source: ${/^Citizens/.test(i.ref || '') ? esc(i.ref) : '81st Budget Speech 2027, ' + esc(i.ref || '')}. Amounts are as stated in the speech and annexures; place tags and groups are AAMA’s mapping.</p>
      </div>`;
    if (!dr.classList.contains('open')) { lastFocus = document.activeElement; }
    dr.classList.add('open'); scrim.classList.add('open'); dr.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock'); dr.scrollTop = 0; $('.dr-b', dr).scrollTop = 0;
    $('.icon-btn', dr).focus({ preventScroll: true });
  }
  actions.closeDrawer = () => { const { view, params } = parse(); delete params.i; Router.go(view, params, true); };
  actions.open = (id) => { const { view, params } = parse(); params.i = id; Router.go(view, params, true); };
  actions.copyLink = (_, el) => { navigator.clipboard && navigator.clipboard.writeText(location.href).then(() => { el.textContent = 'Link copied'; setTimeout(() => el.textContent = 'Copy link', 1600); }); };
  scrim.addEventListener('click', actions.closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && dr.classList.contains('open')) actions.closeDrawer(); });

  /* ── shared UI helpers ── */
  const seg = (name, opts, val, h) => `<div class="seg" role="group" aria-label="${esc(name)}">${opts.map(([k, l]) => `<button type="button" class="${k === val ? 'on' : ''}" aria-pressed="${k === val}" data-act="seg" data-arg="${esc(h || name)}:${esc(k)}">${esc(l)}</button>`).join('')}</div>`;
  const tag = (kind) => kind === 'speech' || kind === 'fact' ? '<span class="tag fx" title="Stated in the speech or annexures">From the speech</span>' : '<span class="tag an" title="AAMA’s own reading — not stated in the speech">AAMA analysis</span>';
  const shortTitle = (i, n = 42) => {
    let t = i.t.replace(/\s*\([^)]*\)/g, '').trim();
    const m = t.match(/^(.{3,34}?)(?::| — )\s*(.+)$/);
    if (m && m[2].length > 6) t = m[2];
    return t.length > n ? t.slice(0, n - 1).trim() + '…' : t;
  };
  const initBtn = (i, label) => `<button class="lnk" data-act="open" data-arg="${i.id}">${esc(label || i.t)}</button>`;
  const slot = (theme) => `var(--c${B.THEMES[theme].slot})`;
  const slotText = (theme) => B.THEMES[theme].slot === 4 ? '#0b0b0b' : '#ffffff';

  window.BX = { LENSES, B, $, $$, esc, fmt, I, list, counted, sum, sectorStats, geo, taxById, ax2by, ax7by, ax2link, ax7link, actions, views, Router, seg, tag, chip, initBtn, shortTitle, slot, slotText, distNames, trim };

  /* theme + boot */
  window.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    let th = 'light'; try { th = localStorage.getItem('aama-theme') || 'light'; } catch (e) {}
    root.setAttribute('data-theme', th);
    actions.theme = () => { th = th === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', th); try { localStorage.setItem('aama-theme', th); } catch (e) {} const b = $('#theme-btn'); if (b) b.setAttribute('aria-label', th === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); };
    if (!LENSES) { $$('[data-lens]').forEach((e) => e.parentNode.removeChild(e)); const n = $('#lens-note'); if (n) n.parentNode.removeChild(n); }
    handle({ noscroll: true });
  });
})();
