/* Views 1: Overview · Money flow · Sectors · Initiatives */
(function () {
  const { B, $, $$, esc, fmt, I, list, counted, sum, sectorStats, actions, Router, seg, tag, chip, slot, slotText, C } = BX;
  const A = B.A3, K = 3;                        // K = column "2027 + Ditwah supplementary"
  const segH = BX.segH = {};
  actions.seg = (arg) => { const [n, k] = arg.split(':'); if (segH[n]) segH[n](k); };

  const head = (eyebrow, title, lede) => `<header class="vh"><div class="eyebrow mono">${esc(eyebrow)}</div><h2 class="display display-lg">${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}</header>`;
  const stat = (label, value, sub, cls = '') => `<div class="stat ${cls}"><div class="sl">${esc(label)}</div><div class="sv">${value}</div>${sub ? `<div class="ss">${sub}</div>` : ''}</div>`;
  const dot = (theme) => `<i class="dot" style="background:${slot(theme)}"></i>`;
  BX.head = head; BX.stat = stat; BX.dot = dot;

  /* Revenue/expenditure facts used in several places */
  const F = {
    spend: A.expenditure[K], rev: A.revenue[K], def: -A.deficit[K], int: A.interest[K],
    inv: A.investment[K], sal: A.salaries[K], sub: A.subsidies[K], og: A.otherGoods[K]
  };
  F.intShare = F.int / F.rev * 100; F.borrowShare = F.def / F.spend * 100;
  F.invGrowth = (A.investment[3] / A.investment[1] - 1) * 100;
  BX.F = F;

  /* ───────────────────── OVERVIEW ───────────────────── */
  const QUESTIONS = [
    ['Where does the money come from?', 'flow', 'Taxes, borrowing, grants and donors'],
    ['Where does it go?', 'flow', 'Interest, salaries, subsidies, investment'],
    ['Which sectors get what?', 'sectors', 'Treemap of announced allocations'],
    ['How much for each initiative?', 'initiatives', 'Search all ' + counted.length + ' initiatives'],
    ['What is new this year?', 'new', '73 proposals · 84 capital projects · new laws'],
    ['Who pays for it?', 'sectors', 'Treasury, donors, state firms, private'],
    ['Which district or province?', 'map', 'Tile map, provinces, ministries'],
    ['What comes next?', 'future', 'Dates, targets and laws to watch'],
    ['How does it affect me?', 'me', 'Tax calculator, allowances, loans'],
    ['Where could land values move?', 'land', 'Corridors ranked by evidence'],
    ['Which sectors could benefit?', 'markets', 'Exposure map — not price forecasts'],
    ['What did the speech not say?', 'sources', 'Gaps, caveats and method']
  ];
  BX.views.overview = {
    title: 'Overview',
    mount(root) {
      const rev100 = [['Interest', F.int, 'var(--c5)', '#fff'], ['Salaries & wages', F.sal, 'var(--c6)', '#fff'], ['Subsidies & transfers', F.sub, 'var(--c7)', '#fff'], ['Other goods & services', F.og, 'var(--neutral)', '#fff']];
      const left = F.rev - F.int - F.sal - F.sub - F.og;
      const tallBar = (parts, total, unit = 100) => `<div class="tall" role="img" aria-label="${parts.map((p) => p[0] + ' ' + (p[1] / total * unit).toFixed(1)).join(', ')}">${parts.map((p) => `<div class="tb" style="flex:${p[1]} 1 0;--fill:${p[2]};--ink:${p[3]}" data-tip="${esc(p[0] + '|' + fmt.bn(p[1]) + '|' + (p[1] / total * 100).toFixed(1) + '% of total')}" tabindex="0"><span>${(p[1] / total * unit) >= 7 ? (p[1] / total * unit).toFixed(0) : ''}</span></div>`).join('')}</div>
        <ul class="legend">${parts.map((p) => `<li><i style="background:${p[2]}"></i>${esc(p[0])} <b class="mono">${(p[1] / total * unit).toFixed(1)}</b></li>`).join('')}</ul>`;
      const taxP = A.tax[K], nonT = A.nonTax[K] + A.grants[K], bor = A.financing[K];
      root.innerHTML = `
      <section class="sec hero-sec">
        <div class="hero-grid">
          <div>
            <div class="eyebrow mono">81st Budget Speech · 12 November 2026</div>
            <h1 class="display display-xl">Where Budget&nbsp;2027 gets its money, where it spends it, and who it affects.</h1>
            <p class="lede">Built line by line from the speech and its seven annexures: ${counted.length} initiatives, ${B.ANX2.length} new proposals, ${B.TAX.length} tax measures and ${B.LAWS.length} laws. Each one carries its section reference.</p>
          </div>
          <div class="hero-fig"><div class="hf-l">Total spending, 2027</div><div class="hf-v">${fmt.bn(F.spend)}</div><div class="hf-s">Rs 7,673bn Budget + Rs 260bn Ditwah supplementary · 20.3% of GDP</div></div>
        </div>
        <div class="stats">
          ${stat('Revenue', fmt.bn(F.rev), '15.8% of GDP, below the 16% floor the speech sets')}
          ${stat('Deficit', fmt.bn(F.def), '4.5% of GDP · financed by borrowing')}
          ${stat('Interest bill', fmt.bn(F.int), `${F.intShare.toFixed(0)}% of every rupee of revenue`)}
          ${stat('Public investment', fmt.bn(F.inv), `5.1% of GDP · +${F.invGrowth.toFixed(0)}% vs 2026`)}
          ${stat('Gross borrowing', fmt.bn(B.A4.grossBorrowing), 'Includes repaying maturing debt (Annexure IV)')}
          ${stat('Tax cuts', fmt.rs(21150), 'Cost to 2027 revenue; Rs 28.4bn a full year')}
        </div>
      </section>

      <section class="sec">
        ${head('Jump to', 'Questions this page answers')}
        <div class="qgrid">${QUESTIONS.filter(([, v]) => BX.LENSES || (v !== 'land' && v !== 'markets')).map(([q, v, s], n) => `<a class="qcard" href="#/${v}"><span class="qn mono">${String(n + 1).padStart(2, '0')}</span><span class="qt">${esc(q)}</span><span class="qs">${esc(s)}</span></a>`).join('')}</div>
      </section>

      <section class="sec">
        ${head('Revenue and spending', 'Rs 100 of revenue, and Rs 100 spent', 'Interest, salaries and subsidies take almost all of what the Government collects, so investment is largely paid for by borrowing.')}
        <div class="two">
          <div class="card"><h3 class="mini">Where Rs 100 of revenue goes first</h3>${tallBar(rev100.concat([['Left over', left, 'var(--c3)', '#fff']]), F.rev)}
            <p class="fine">Interest + salaries + subsidies = Rs ${((F.int + F.sal + F.sub) / F.rev * 100).toFixed(0)} of every Rs 100. Source: Annexure III (2027 column).</p></div>
          <div class="card"><h3 class="mini">Who pays for Rs 100 of spending</h3>${tallBar([['Taxes', taxP, 'var(--c2)', '#fff'], ['Non-tax revenue & grants', nonT, 'var(--c4)', '#0b0b0b'], ['Borrowing', bor, 'var(--solid)', 'var(--surface)']], F.spend)}
            <p class="fine">About Rs ${F.borrowShare.toFixed(0)} of every Rs 100 spent comes from borrowing or drawing down cash: the Rs 1,753bn deficit includes Rs 260bn for Ditwah, which Annexure IV says is paid from the Treasury’s cash buffer.</p></div>
        </div>
      </section>

      <section class="sec">
        ${head('Findings', 'What the figures show')}
        <div class="cards3">
          <article class="card insight">${tag('analysis')}<h3>Revenue sits below the speech’s own floor</h3><p>Section 3 targets revenue of “not less than 16% of GDP”. Annexure III plans 15.8% for 2027 (16.5% in 2026).</p></article>
          <article class="card insight">${tag('analysis')}<h3>Interest still takes ${F.intShare.toFixed(0)}% of revenue</h3><p>Down from 79.1% in 2022 and 45.9% in 2025. At Rs 2,643bn it is still larger than the salary bill (Rs 1,410bn) and the subsidies and transfers line (Rs 1,472bn) taken separately.</p></article>
          <article class="card insight">${tag('fact')}<h3>Public investment rises to Rs 2 trillion</h3><p>Rs 1,750bn in the Budget plus Rs 250bn of Ditwah reconstruction: 5.1% of GDP, up from 4.1% in 2026.</p></article>
          <article class="card insight">${tag('fact')}<h3>Inflation reached 8.3% in October</h3><p>It was 2.1% in December 2025. The speech attributes the rise to fuel prices and the Middle East conflict, and says El Niño will peak in February 2027.</p></article>
          <article class="card insight">${tag('fact')}<h3>The IMF programme ends in March</h3><p>A committee headed by the Deputy Finance Minister is examining whether to seek another programme, and of what type.</p></article>
          <article class="card insight">${tag('analysis')}<h3>Income-tax relief costs 0.3% of revenue</h3><p>Rs 16bn in 2027 (Annexure I). Each taxpayer keeps Rs 750 to Rs 15,750 more a month.</p></article>
        </div>
      </section>`;
    }
  };

  /* ───────────────────── MONEY FLOW ───────────────────── */
  BX.views.flow = {
    title: 'Money flow',
    mount(root, p) {
      let basis = p.b === 'budget' ? 0 : 3, mode = 'chart';
      const col = (i) => ({ rev: A.revenue[i], tot: A.expenditure[i] });
      const render = () => {
        const i = basis, tot = A.expenditure[i] + 0;
        const mk = (label, v, fill, ink, extra = '') => ({ label, v, fill, ink, value: fmt.bn(v), tip: `${label}|${fmt.bn(v)}|${(v / tot * 100).toFixed(1)}% of total${extra}`, });
        const yoy = (k) => { const a = A[k][3], b = A[k][1]; return b ? `|${a >= b ? '+' : '−'}${Math.abs((a / b - 1) * 100).toFixed(1)}% vs 2026 revised` : ''; };
        const src = [
          mk('Goods & services taxes', A.goodsTax[i], 'var(--c2)', '#fff', yoy('goodsTax')), mk('Income tax', A.incomeTax[i], 'var(--c3)', '#fff', yoy('incomeTax')),
          mk('Trade taxes', A.tradeTax[i], 'var(--c4)', '#0b0b0b', yoy('tradeTax')), mk('Non-tax revenue & grants', A.nonTax[i] + A.grants[i], 'var(--neutral)', '#fff'),
          { ...mk('Borrowing (net)', A.financing[i], 'var(--solid)', 'var(--surface)', `|Foreign net ${fmt.bn(A.foreignFin[i])} + domestic ${fmt.bn(A.domesticFin[i])}`), hatch: true }
        ];
        const use = [
          mk('Interest', A.interest[i], 'var(--c5)', '#fff', yoy('interest')), mk('Public investment', A.investment[i], 'var(--c1)', '#fff', yoy('investment')),
          mk('Subsidies & transfers', A.subsidies[i], 'var(--c7)', '#fff', yoy('subsidies')), mk('Salaries & wages', A.salaries[i], 'var(--c6)', '#fff', yoy('salaries')),
          mk('Other goods & services', A.otherGoods[i], 'var(--neutral)', '#fff', yoy('otherGoods'))
        ];
        const stacks = `<div class="flow2"><div><h3 class="mini">Where it comes from <b class="mono">${fmt.bn(src.reduce((s, x) => s + x.v, 0))}</b></h3>${C.stack(src, { height: 460 })}</div>
          <div><h3 class="mini">Where it goes <b class="mono">${fmt.bn(use.reduce((s, x) => s + x.v, 0))}</b></h3>${C.stack(use, { height: 460 })}</div></div>
          <ul class="legend wide">${src.concat(use).map((s) => `<li><i style="background:${s.fill}"></i>${esc(s.label)}</li>`).join('')}</ul>
          <p class="fine">Net “Other” expenditure of −Rs ${Math.abs(A.other[i])}bn (recoveries) is not drawn. Hatched block = borrowing.</p>`;
        const rows = [['Goods & services taxes', A.goodsTax], ['Income tax', A.incomeTax], ['Trade taxes', A.tradeTax], ['Non-tax revenue', A.nonTax], ['Grants', A.grants], ['Borrowing (net)', A.financing]].map(([n, a]) => [n, fmt.bn(a[i]), (a[i] / tot * 100).toFixed(1) + '%'])
          .concat([['Interest', A.interest], ['Public investment', A.investment], ['Subsidies & transfers', A.subsidies], ['Salaries & wages', A.salaries], ['Other goods & services', A.otherGoods]].map(([n, a]) => [n + ' (spending)', fmt.bn(a[i]), (a[i] / tot * 100).toFixed(1) + '%']));
        $('#flowviz').innerHTML = mode === 'chart' ? stacks : C.table(['Line', 'Amount', 'Share of total'], rows);
        C.observe($('#flowviz'));
      };
      segH.basis = (k) => { basis = k === 'budget' ? 0 : 3; Router.param('b', k === 'budget' ? 'budget' : ''); $$('[aria-label=Basis] button', root).forEach((b) => b.classList.toggle('on', b.dataset.arg.endsWith(k))); render(); };
      segH.fmode = (k) => { mode = k; $$('[aria-label=View] button', root).forEach((b) => b.classList.toggle('on', b.dataset.arg.endsWith(k))); render(); };

      const row = (n, key, pct) => { const a = A[key], g = (pct ? '' : ''); const chg = a[2] - a[1], rel = a[1] ? chg / Math.abs(a[1]) * 100 : 0; return `<tr><th scope="row">${n}</th><td>${C.spark([a[0], a[1], a[2]])}</td><td class="num">${fmt.n(a[0])}</td><td class="num">${fmt.n(a[1])}</td><td class="num"><b>${fmt.n(a[2])}</b></td><td class="num ${chg >= 0 ? '' : ''}">${chg >= 0 ? '+' : '−'}${fmt.n(Math.abs(chg))} <span class="muted">(${rel >= 0 ? '+' : '−'}${Math.abs(rel).toFixed(1)}%)</span></td></tr>`; };
      const gdpRow = (n, key) => { const a = B.A3gdp[key]; return `<tr><th scope="row">${n}</th><td>${C.spark([a[0], a[1], a[2]])}</td><td class="num">${a[0]}%</td><td class="num">${a[1]}%</td><td class="num"><b>${a[2]}%</b></td><td class="num"><span class="muted">${a[3]}% with suppl.</span></td></tr>`; };
      const g = B.A4;
      root.innerHTML = `${head('Where it comes from · Where it goes', 'Revenue and spending, 2027', 'Annexure III as a chart. Show the Budget alone, or add the Rs 260bn Ditwah reconstruction supplementary.')}
        <div class="controls">${seg('Basis', [['budget', 'Budget only'], ['all', '+ Ditwah supplementary']], basis === 0 ? 'budget' : 'all', 'basis')}
          ${seg('View', [['chart', 'Chart'], ['table', 'Table']], 'chart', 'fmode')}</div>
        <div id="flowviz" class="viz"></div>

        <section class="sec tight"><h3 class="display display-md">Revenue and spending, 2025 to 2027</h3>
          <div class="tscroll"><table class="dt trend"><thead><tr><th scope="col">Rs billion</th><th scope="col"><span class="sr">Trend</span></th><th class="num" scope="col">2025 prov.</th><th class="num" scope="col">2026 rev.</th><th class="num" scope="col">2027 Budget</th><th class="num" scope="col">Change vs 2026</th></tr></thead><tbody>
            ${row('Total revenue', 'revenue')}${row('  Income tax', 'incomeTax')}${row('  Goods & services taxes', 'goodsTax')}${row('  Trade taxes', 'tradeTax')}${row('  Non-tax revenue', 'nonTax')}
            ${row('Total expenditure', 'expenditure')}${row('  Salaries & wages', 'salaries')}${row('  Interest', 'interest')}${row('  Subsidies & transfers', 'subsidies')}${row('  Public investment', 'investment')}
            ${row('Primary surplus', 'primary')}${row('Budget deficit', 'deficit')}
            ${gdpRow('Revenue, % of GDP', 'revenue')}${gdpRow('Interest, % of GDP', 'interest')}${gdpRow('Primary surplus, % of GDP', 'primary')}${gdpRow('Deficit, % of GDP', 'deficit')}
          </tbody></table></div>
          <p class="fine">2027 column is the Budget alone; the Ditwah supplementary adds Rs 260bn of spending (Rs 250bn investment, Rs 10bn subsidies) financed from bank borrowing/cash buffer.</p></section>

        <section class="sec tight two">
          <div><h3 class="display display-md">How the Rs ${fmt.n(g.grossBorrowing)}bn gross borrowing adds up</h3>
            ${C.hbars([
              { label: 'Primary spending', v: g.primaryExp, fill: 'var(--c1)', value: fmt.bn(g.primaryExp), sub: 'Recurrent 3,320 + capital 1,750' },
              { label: 'Interest payments', v: g.interest, fill: 'var(--c5)', value: fmt.bn(g.interest) },
              { label: 'Debt repayments', v: g.repayments, fill: 'var(--c7)', value: fmt.bn(g.repayments), sub: 'Maturing principal' },
              { label: 'Advances & book adjustments', v: g.advances + g.bookAdj, fill: 'var(--neutral)', value: fmt.bn(g.advances + g.bookAdj) },
              { label: 'Less: receipts excl. borrowing', v: g.receiptsExBorrowing, fill: 'var(--c3)', value: '−' + fmt.bn(g.receiptsExBorrowing) },
              { label: 'Gross borrowing needed', v: g.grossBorrowing, fill: 'var(--solid)', value: fmt.bn(g.grossBorrowing) }
            ], { max: 10030 })}
            <p class="fine">Annexure IV. Sum of the first four lines is Rs 10,030bn; receipts are Rs 6,230bn. The Rs 260bn Ditwah supplementary is paid from the existing cash buffer, not new borrowing.</p></div>
          <div><h3 class="display display-md">Foreign debt service, USD million</h3>
            ${C.hbars(B.FDS.map(([y, v]) => ({ label: y, v, fill: y === '2027' ? 'var(--c1)' : 'var(--muted-soft)', value: fmt.n(v) })), { fmtv: fmt.n })}
            <p class="fine">Falls to USD 2,986M in 2027, then rises to USD 3,574M in 2028 (§2.1).</p>
            <h3 class="display display-md" style="margin-top:28px">Central government debt, % of GDP</h3>
            ${C.hbars(B.DEBT.map(([y, v], n) => ({ label: y, v, fill: n < 2 ? 'var(--muted-soft)' : 'var(--c3)', value: v + '%' })), { fmtv: (v) => v + '%', max: 120 })}</div>
        </section>

        <section class="sec tight"><h3 class="display display-md">Tax changes and what they cost</h3>
          ${C.table(['Measure', 'Annual effect (Rs M)', 'Effective'], B.A1.map(([m, v, e]) => [esc(m), (v > 0 ? '+' : '−') + fmt.n(Math.abs(v)), e]).concat([['<b>Total, full year</b>', '<b>−' + fmt.n(28415) + '</b>', ''], ['<b>Effect on 2027</b>', '<b>−' + fmt.n(21150) + '</b>', 'Annexure I']]))}</section>`;
      render();
    }
  };

  /* ───────────────────── SECTORS ───────────────────── */
  BX.views.sectors = {
    title: 'Sectors',
    mount(root, p) {
      let mode = 'chart', sel = p.s || '';
      const items = Object.values(sectorStats).filter((s) => s.size > 0).map((s) => ({
        key: s.key, v: s.size, label: C.SHORT[s.key], value: fmt.rs(s.size, { plain: true }), fill: slot(s.theme), ink: slotText(s.theme),
        tip: `${B.SECTORS[s.key].label}|${fmt.rs(s.size)} announced|${s.n} initiatives${s.env > s.item ? ' · speech states a ' + fmt.rs(s.env) + ' total' : ''}|Click for the list`
      }));
      const total = items.reduce((s, x) => s + x.v, 0);
      const byF = {}; counted.forEach((i) => { byF[i.f] = byF[i.f] || { v: 0, n: 0 }; byF[i.f].v += i.a || 0; byF[i.f].n++; });
      const byFund = Object.entries(byF).sort((a, b) => b[1].v - a[1].v);
      const itemised = sum(counted, (i) => i.a);
      const draw = () => {
        const box = $('#tmviz');
        box.innerHTML = mode === 'chart' ? C.treemap(items, { onKey: 'pickSector', active: sel }) + `<ul class="legend wide">${Object.entries(B.THEMES).map(([k, t]) => `<li><i style="background:var(--c${t.slot})"></i>${esc(t.label)}</li>`).join('')}</ul>`
          : C.table(['Sector', 'Announced (Rs M)', 'Funded lines', 'Stated total (Rs M)'], items.sort((a, b) => b.v - a.v).map((s) => [`<a href="#/sectors?s=${s.key}">${esc(B.SECTORS[s.key].label)}</a>`, fmt.n(Math.round(s.v)), sectorStats[s.key].n, sectorStats[s.key].env ? fmt.n(sectorStats[s.key].env) : '—']));
        C.observe(box);
        const d = $('#sectordetail');
        if (!sel) { d.innerHTML = '<p class="muted">Pick a sector to see its initiatives.</p>'; return; }
        const s = sectorStats[sel]; const rows = s.items.slice().sort((a, b) => (b.a || 0) - (a.a || 0));
        d.innerHTML = `<div class="sd-h"><h3 class="display display-md">${dotHtml(s.theme)} ${esc(B.SECTORS[sel].label)}</h3><button class="lnk" data-act="clearSector">Clear</button></div>
          <p class="muted">${esc(B.SECTORS[sel].org)} · ${s.n} initiatives · ${fmt.rs(s.item)} itemised${s.env ? ` · speech-stated total ${fmt.rs(s.env)}` : ''}</p>
          ${s.env && s.env > s.item ? `<p class="fine">The speech gives a larger umbrella total for this sector than the lines it itemises, so some spending is not broken down.</p>` : ''}
          ${C.hbars(rows.filter((r) => r.a).slice(0, 14).map((r) => ({ label: r.t, v: r.a, fill: slot(s.theme), act: 'open', arg: r.id, tip: `${r.t}|${fmt.rs(r.a)}` })), { compact: true })}
          <a class="btn ghost" href="#/initiatives?s=${sel}">See all ${s.n} in the explorer</a>`;
      };
      const dotHtml = (t) => `<i class="dot lg" style="background:${slot(t)}"></i>`;
      segH.smode = (k) => { mode = k; $$('[aria-label=View] button', root).forEach((b) => b.classList.toggle('on', b.dataset.arg.endsWith(k))); draw(); };
      actions.pickSector = (k) => { sel = k; Router.param('s', k); draw(); $('#sectordetail').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
      actions.clearSector = () => { sel = ''; Router.param('s', ''); draw(); };
      const fundRows = byFund.map(([k, x]) => ({ label: B.FUND[k], v: x.v, sub: `${x.n} lines`, fill: k === 'tre' ? 'var(--c1)' : k === 'sup' ? 'var(--c5)' : k === 'dev' ? 'var(--c3)' : k === 'ppp' ? 'var(--c7)' : k === 'soe' ? 'var(--c4)' : 'var(--neutral)', tip: `${B.FUND[k]}|${fmt.rs(x.v)} · ${x.n} lines` }));
      root.innerHTML = `${head('Where we spend', 'Every announced allocation, by sector', `The speech itemises ${fmt.bn(itemised / 1000)} of allocations. Interest (Rs 2,643bn) and most salaries are not “initiatives”, so they don’t appear here.`)}
        <div class="controls">${seg('View', [['chart', 'Treemap'], ['table', 'Table']], 'chart', 'smode')}</div>
        <div id="tmviz" class="viz"></div>
        <p class="fine">Area = the larger of (a) the total the speech states for the sector and (b) the sum of its itemised lines, so umbrella totals are not double-counted. Large Ditwah (Rs 260bn) and Aswesuma (Rs 230bn) lines dominate their sectors.</p>
        <div id="sectordetail" class="card sd"></div>
        <section class="sec tight"><h3 class="display display-md">Who is paying for the itemised initiatives?</h3>
          ${C.hbars(fundRows, { fmtv: (v) => fmt.rs(v) })}
          <p class="fine">By 2027 allocation. “Development partner” covers ADB, World Bank, JICA/Japan, India, China, EU and AIIB grants and loans named in the speech. Lines with no 2027 rupee figure (e.g. PPP projects) don’t show up in amounts.</p></section>`;
      draw();
    }
  };

  /* ───────────────────── INITIATIVES EXPLORER ───────────────────── */
  const STEP = 50;
  BX.views.initiatives = {
    title: 'Initiatives',
    mount(root, p) {
      const opt = (m, all) => `<option value="">${all}</option>` + Object.entries(m).map(([k, v]) => `<option value="${k}">${esc(typeof v === 'string' ? v : v.label)}</option>`).join('');
      const places = `<option value="">Anywhere</option><option value="NAT">Nationwide</option>` + `<optgroup label="Province">${Object.entries(B.PROV).map(([k, v]) => `<option value="P:${k}">${v}</option>`).join('')}</optgroup><optgroup label="District">${BX.distNames.slice().sort().map((d) => `<option value="${d}">${d}</option>`).join('')}</optgroup>`;
      root.innerHTML = `${head('How much for which initiative', 'Search all ' + counted.length + ' initiatives', 'Every allocation, loan scheme and project the speech puts a number or a date on. Click a row for details.')}
        <div class="filters" role="search">
          <label class="f f-q"><span class="sr">Search</span><input type="search" id="q" placeholder="Try “fertiliser”, “Jaffna” or “ADB”" value="${esc(p.q || '')}" autocomplete="off"></label>
          <label class="f"><span>Sector</span><select data-f="s">${opt(B.SECTORS, 'All sectors')}</select></label>
          <label class="f"><span>Status</span><select data-f="st">${opt(B.STATUS, 'Any status')}</select></label>
          <label class="f"><span>Paid by</span><select data-f="f">${opt(B.FUND, 'Any source')}</select></label>
          <label class="f"><span>Where</span><select data-f="w">${places}</select></label>
          <label class="f"><span>Who it affects</span><select data-f="g">${opt(B.GROUPS, 'Everyone')}</select></label>
          <label class="f"><span>Sort</span><select data-f="o"><option value="">Largest 2027 allocation</option><option value="cost">Largest total cost</option><option value="start">Earliest start</option><option value="az">A–Z</option></select></label>
        </div>
        <div class="resbar"><div id="count" aria-live="polite"></div><div class="rb-r"><label class="chk"><input type="checkbox" id="newonly"> New money only</label><button class="btn ghost" data-act="csv">Download as CSV</button><button class="lnk" data-act="resetF">Clear filters</button></div></div>
        <div id="results" class="rows"></div>`;
      let shown = STEP, lastKey = '';
      const sels = $$('[data-f]', root); sels.forEach((s) => { s.value = p[s.dataset.f] || ''; s.addEventListener('change', () => Router.param(s.dataset.f, s.value)); });
      const qEl = $('#q'); let t; qEl.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => Router.param('q', qEl.value.trim()), 140); });
      const nEl = $('#newonly'); nEl.checked = p.n === '1'; nEl.addEventListener('change', () => Router.param('n', nEl.checked ? '1' : ''));
      let current = [];
      const filt = (p) => {
        const q = (p.q || '').toLowerCase().split(/\s+/).filter(Boolean);
        return counted.filter((i) => {
          if (p.s && i.s !== p.s) return false; if (p.st && i.st !== p.st) return false; if (p.f && i.f !== p.f) return false; if (p.g && !i.gs.includes(p.g)) return false;
          if (p.n === '1' && !(i.add > 0)) return false;
          if (p.w) { if (p.w === 'NAT') { if (!i.national) return false; } else if (p.w.startsWith('P:')) { if (!i.provs.includes(p.w.slice(2)) && !i.national) return false; } else if (!i.dists.includes(p.w)) return false; }
          if (q.length) { const hay = (i.t + ' ' + i.o + ' ' + (i.loc || '') + ' ' + (i.m || '') + ' ' + (i.fd || '') + ' ' + i.sectorLabel + ' ' + i.dists.join(' ') + ' ' + i.provs.map((x) => B.PROV[x]).join(' ') + ' ' + B.FUND[i.f]).toLowerCase(); if (!q.every((w) => hay.includes(w))) return false; }
          return true;
        });
      };
      const sorters = { '': (a, b) => (b.a || 0) - (a.a || 0), cost: (a, b) => (b.tc || b.a || 0) - (a.tc || a.a || 0), start: (a, b) => (a.y0 || 9999) - (b.y0 || 9999) || (b.a || 0) - (a.a || 0), az: (a, b) => a.t.localeCompare(b.t) };
      const rowHtml = (i) => `<button class="row" data-act="open" data-arg="${i.id}">
          <span class="r-t"><span class="r-title">${esc(i.t)}</span><span class="r-meta">${dot(i.theme)}${esc(C.SHORT[i.s])} · ${esc(i.o)}<span class="r-wm">${i.national ? 'Nationwide' : esc((i.dists.length ? i.dists.slice(0, 2).join(', ') + (i.dists.length > 2 ? ' +' + (i.dists.length - 2) : '') : i.provs.map((x) => B.PROV[x]).join(', ')) || '')}${i.y ? ' · ' + (i.y0 === i.y1 ? i.y0 : i.y0 + '–' + String(i.y1).slice(2)) : ''}</span></span></span>
          <span class="r-w">${i.national ? 'Nationwide' : esc((i.dists.length ? i.dists.slice(0, 2).join(', ') + (i.dists.length > 2 ? ' +' + (i.dists.length - 2) : '') : i.provs.map((x) => B.PROV[x]).join(', ')) || '—')}</span>
          <span class="r-y mono">${i.y ? (i.y0 === i.y1 ? i.y0 : i.y0 + '–' + String(i.y1).slice(2)) : ''}</span>
          <span class="r-s">${chip(B.STATUS[i.st].replace(' this Budget', ''), 'st-' + i.st)}</span>
          <span class="r-a">${i.a != null ? `<b>${fmt.rs(i.a)}</b>` : i.tc != null ? `<span class="muted">project cost ${fmt.rs(i.tc)}</span>` : i.lv != null ? `<span class="muted">unlocks ${fmt.rs(i.lv)} in loans</span>` : '<span class="muted">amount not stated</span>'}</span></button>`;
      const draw = (p) => {
        current = filt(p).sort(sorters[p.o || ''] || sorters['']);
        const key = JSON.stringify([p.q, p.s, p.st, p.f, p.w, p.g, p.o, p.n]); if (key !== lastKey) { shown = STEP; lastKey = key; }
        const tot = sum(current, (i) => i.a);
        $('#count').innerHTML = `<b>${current.length}</b> of ${counted.length} initiatives · <b>${fmt.rs(tot)}</b> allocated in 2027`;
        $('#results').innerHTML = current.length ? `<div class="rhead"><span>Initiative</span><span>Where</span><span>When</span><span>Status</span><span class="r-a">2027</span></div>` + current.slice(0, shown).map(rowHtml).join('') + (current.length > shown ? `<button class="btn more" data-act="more">Show ${Math.min(STEP, current.length - shown)} more (${current.length - shown} left)</button>` : '') : `<div class="empty"><b>Nothing matches ${p.q ? '“' + esc(p.q) + '”' : 'these filters'}.</b><p>Try a shorter search, or take a filter off.</p><button class="btn ghost" data-act="resetF">Clear filters</button></div>`;
      };
      actions.more = () => { shown += STEP; draw(Router.params()); };
      actions.resetF = () => { qEl.value = ''; Router.go('initiatives', {}, true); sels.forEach((s) => s.value = ''); nEl.checked = false; };
      actions.csv = () => {
        const cols = ['id', 'title', 'sector', 'status', 'funding', 'implementing_body', 'allocation_2027_rs_m', 'new_money_rs_m', 'total_cost_rs_m', 'loans_rs_m', 'places', 'start', 'end', 'speech_ref'];
        const q = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
        const rows = current.map((i) => [i.id, i.t, i.sectorLabel, B.STATUS[i.st], B.FUND[i.f], i.o, i.a, i.add, i.tc, i.lv, i.national ? 'Nationwide' : i.dists.concat(i.provs.filter(() => i.provLevel).map((x) => B.PROV[x] + ' Province')).join('; '), i.y0, i.y1, i.ref]);
        const blob = new Blob(['﻿' + [cols.join(',')].concat(rows.map((r) => r.map(q).join(','))).join('\n')], { type: 'text/csv' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'budget-2027-initiatives.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      };
      draw(p);
      return { update: (np) => { sels.forEach((s) => { if (s.value !== (np[s.dataset.f] || '')) s.value = np[s.dataset.f] || ''; }); if (document.activeElement !== qEl) qEl.value = np.q || ''; nEl.checked = np.n === '1'; draw(np); } };
    }
  };
})();
