/* Budget 2027 explorer — chart builders (HTML/SVG, no libraries). Colour comes only from CSS tokens. */
(function () {
  const { esc, fmt, B, $$ } = BX;
  const C = {};

  const SHORT = { rds:'Roads', trn:'Rail & buses', mar:'Ports & air', nrg:'Energy', wtr:'Water', agr:'Agriculture', irr:'Irrigation', fis:'Fisheries', plt:'Plantations', edu:'Education', rnd:'Research', hlt:'Health', soc:'Social protection', hou:'Housing', urb:'Urban & floods', env:'Environment', dis:'Disasters & Ditwah', dig:'Digital', fin:'SME finance', ind:'Industry & trade', tou:'Tourism', adm:'Local govt & admin', pay:'Pay & pensions', sec:'Security', jus:'Justice', cul:'Culture & sport' };
  C.SHORT = SHORT;

  /* ── Squarified treemap → rects in a 0–100 box ── */
  C.squarify = function (items, W = 100, H = 100) {
    const tot = items.reduce((s, i) => s + i.v, 0); const out = [];
    const scale = (W * H) / tot; const nodes = items.map((i) => ({ ...i, area: i.v * scale })).sort((a, b) => b.area - a.area);
    let x = 0, y = 0, w = W, h = H;
    const worst = (row, side) => { const s = row.reduce((a, r) => a + r.area, 0); const mx = Math.max(...row.map((r) => r.area)), mn = Math.min(...row.map((r) => r.area)); return Math.max((side * side * mx) / (s * s), (s * s) / (side * side * mn)); };
    let row = [];
    const layout = (row) => {
      const s = row.reduce((a, r) => a + r.area, 0);
      if (w >= h) { const rw = s / h; let yy = y; row.forEach((r) => { const rh = r.area / rw; out.push({ ...r, x, y: yy, w: rw, h: rh }); yy += rh; }); x += rw; w -= rw; }
      else { const rh = s / w; let xx = x; row.forEach((r) => { const rw = r.area / rh; out.push({ ...r, x: xx, y, w: rw, h: rh }); xx += rw; }); y += rh; h -= rh; }
    };
    nodes.forEach((n) => {
      const side = Math.min(w, h);
      if (!row.length || worst(row.concat(n), side) <= worst(row, side)) row.push(n); else { layout(row); row = [n]; }
    });
    if (row.length) layout(row);
    return out;
  };

  /* Show a label only where the text fits — never clip */
  C.fitLabels = function (box) {
    $$('[data-fit]', box).forEach((t) => {
      const w = t.clientWidth, h = t.clientHeight; const name = t.querySelector('.n'), val = t.querySelector('.v');
      const row = t.dataset.fit === 'row';
      const big = row ? (h >= 24 && w >= 150) : (w >= 84 && h >= 46), mid = row ? h >= 18 : (w >= 52 && h >= 26);
      if (name) name.style.display = big ? '' : 'none';
      if (val) val.style.display = (big || mid) ? '' : 'none';
    });
  };
  C.observe = function (box) {
    if (!('ResizeObserver' in window)) { C.fitLabels(box); return null; }
    const ro = new ResizeObserver(() => C.fitLabels(box)); ro.observe(box); C.fitLabels(box); return ro;
  };

  C.treemap = function (items, { onKey = 'open', active } = {}) {
    const rects = C.squarify(items);
    return `<div class="treemap" role="list">${rects.map((r) => `
      <button class="tm ${active === r.key ? 'on' : ''}" role="listitem" data-fit data-act="${onKey}" data-arg="${r.key}" data-tip="${esc(r.tip)}"
        style="left:${r.x}%;top:${r.y}%;width:${r.w}%;height:${r.h}%;--fill:${r.fill};--ink:${r.ink}">
        <span class="n">${esc(r.label)}</span><span class="v">${esc(r.value)}</span></button>`).join('')}</div>`;
  };

  /* ── Stacked column: segments [{label,value,v,fill,ink,hatch,tip}] ── */
  C.stack = function (segs, { height = 440 } = {}) {
    return `<div class="stack" style="--h:${height}px" role="list">${segs.filter((s) => s.v > 0).map((s) => `
      <div class="sg ${s.hatch ? 'hatch' : ''}" role="listitem" tabindex="0" data-fit="row" data-tip="${esc(s.tip)}" style="flex:${s.v} 1 0;--fill:${s.fill};--ink:${s.ink}">
        <span class="n">${esc(s.label)}</span><span class="v">${esc(s.value)}</span></div>`).join('')}</div>`;
  };

  /* ── Horizontal bar rows [{label,v,fill,tip,sub,act,arg,value}] ── */
  C.hbars = function (rows, { max, fmtv = (v) => fmt.rs(v), compact = false } = {}) {
    const m = max || Math.max(...rows.map((r) => r.v), 1);
    return `<ul class="hbars ${compact ? 'compact' : ''}">${rows.map((r) => {
      const inner = `<span class="hl"><span class="hn">${esc(r.label)}</span>${r.sub ? `<span class="hs">${esc(r.sub)}</span>` : ''}</span>
        <span class="ht"><span class="hb" style="width:${Math.max(0.6, (r.v / m) * 100)}%;background:${r.fill || 'var(--c1)'}"></span></span><span class="hv">${esc(r.value || fmtv(r.v))}</span>`;
      return `<li>${r.act ? `<button class="hrow" data-act="${r.act}" data-arg="${esc(r.arg)}" data-tip="${esc(r.tip || '')}">${inner}</button>` : `<div class="hrow" tabindex="0" data-tip="${esc(r.tip || '')}">${inner}</div>`}</li>`;
    }).join('')}</ul>`;
  };

  /* ── District tile-grid map ── */
  C.tilemap = function (values, { fmtv = (v) => fmt.rs(v, { plain: true }), act = 'pickDist', sel, tipFn } = {}) {
    const vals = Object.values(values).map((x) => x.v).filter((v) => v > 0).sort((a, b) => a - b);
    const q = (v) => { if (v <= 0) return 0; const r = vals.findIndex((x) => x >= v) / Math.max(1, vals.length - 1); return 1 + Math.min(6, Math.floor(Math.sqrt(r) * 7)); };
    const tiles = Object.entries(B.DIST).map(([d, g]) => {
      const x = values[d] || { v: 0, n: 0 }; const k = q(x.v);
      const abbr = d === 'Nuwara Eliya' ? 'N. Eliya' : d;
      return `<button class="tile q${k} ${sel === d ? 'on' : ''}" style="grid-column:${g.c};grid-row:${g.r + 1}" data-act="${act}" data-arg="${esc(d)}" data-tip="${esc(tipFn ? tipFn(d, x) : d + '|' + fmtv(x.v))}" aria-label="${esc(d)}: ${esc(fmtv(x.v))}">
        <span class="tn">${esc(abbr)}</span><span class="tv">${x.v > 0 ? esc(fmtv(x.v)) : '—'}</span></button>`;
    }).join('');
    const legend = [1, 2, 3, 4, 5, 6, 7].map((k) => `<i class="q${k}"></i>`).join('');
    return `<div class="tilemap" role="group" aria-label="Sri Lanka district tile map; north at top">${tiles}</div>
      <div class="maplegend"><span>Less</span>${legend}<span>More</span><em>Tile positions are schematic (north at top), not to scale.</em></div>`;
  };

  /* ── Inline sparkline ── */
  C.spark = function (vals, { w = 72, h = 22 } = {}) {
    const mn = Math.min(...vals), mx = Math.max(...vals), r = mx - mn || 1;
    const pts = vals.map((v, i) => [2 + (i * (w - 4)) / (vals.length - 1), h - 3 - ((v - mn) / r) * (h - 6)]);
    const last = pts[pts.length - 1];
    return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${last[0]}" cy="${last[1]}" r="3.5" fill="var(--c1)" stroke="var(--surface)" stroke-width="2"/></svg>`;
  };

  /* ── Diverging bar rows (tailwind ↔ headwind) ── */
  C.diverge = function (rows, { max } = {}) {
    const m = max || Math.max(...rows.map((r) => Math.abs(r.v)), 1);
    return `<ul class="dv">${rows.map((r) => {
      const w = Math.abs(r.v) / m * 50;
      return `<li><button class="dvr ${r.on ? 'on' : ''}" data-act="${r.act}" data-arg="${r.arg}" data-tip="${esc(r.tip)}">
        <span class="dvn">${esc(r.label)}</span>
        <span class="dvt"><i class="mid"></i><span class="dvb ${r.v >= 0 ? 'pos' : 'neg'}" style="${r.v >= 0 ? 'left:50%' : 'right:50%'};width:${Math.max(w, 0.8)}%"></span></span>
        <span class="dvv mono">${r.v > 0 ? '+' : r.v < 0 ? '−' : ''}${Math.abs(r.v).toFixed(1)}</span></button></li>`;
    }).join('')}</ul>`;
  };

  /* ── data-table fallback (every chart has a table view) ── */
  C.table = function (head, rows, { cls = '' } = {}) {
    return `<div class="tscroll"><table class="dt ${cls}"><thead><tr>${head.map((h, i) => `<th scope="col" class="${i ? 'num' : ''}">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => i ? `<td class="num">${c}</td>` : `<th scope="row">${c}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  };

  window.BX.C = C;
})();
