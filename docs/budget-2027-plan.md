# Budget 2027 explorer — plan & design brief

**Status:** working prototype in `budget-2027/` (open `budget-2027/index.html` via any static server).
**Source:** 81st Budget Speech 2027, presented 12 Nov 2026, incl. Annexures I–VII.
**Internal document.** `docs/` is excluded from deploys by `.vercelignore`.

---

## 1. What we are building

One page on ama.lk where any reader can answer, in their own terms: *where does the money come from, where does it go, what is new, who gets it, who pays, what happens next, and what does it mean for me / my land / my portfolio?*

Built as a dependency-free static app (HTML + CSS + vanilla JS + plain-object data), so it ships on the existing hosting, loads fast on mid-range phones, and every number can be traced to a line in the speech.

## 2. Your twelve asks → what the prototype does, and what it cannot

| Ask | Module | Coverage | Honest limit |
|---|---|---|---|
| Spend by **district** | Where → District map | Partial | Speech only places named projects (+ flat Rs 2,000M per district). Not a district budget. |
| Spend by **province** | Where → Provinces | Partial | Same; nationwide lines (≈76% of rupees) can't be placed. |
| Spend by **department** | Sectors → Official totals; Where → Ministries | Partial, now strong at sector level | **Citizens' Budget loaded:** official totals for 12 sectors with sub-sectors, capital/recurrent split and ~250 key activities. Ministry-by-ministry totals still live in the **Estimates Vol I–III** (not yet loaded). |
| Spend by **ethnicity** | Where → Communities | **Not available** | Not in the speech or annexures; I did not have the Estimates or Citizens' Budget to check, but know of no official breakdown (confirm against them). We show only what the speech names (faith-wise counts of damaged worship places, plantation/North-East/Buddhist-education items) plus geography, with an explicit "province ≠ ethnicity" note. **Recommend we never publish an estimate.** |
| Where the money goes | Money flow | Complete | Annexure III/IV |
| Where it comes from | Money flow; funding-source chart | Complete | Taxes, borrowing, donors per initiative |
| How much per initiative | Initiatives explorer (266 lines) | Strong | Some lines have no rupee figure (shown as such) |
| New initiatives | What's new (Annex II 73 · Annex VII 84 · 29 laws) | Complete | Verbatim tables |
| Where they come from | Funding source + legal pipeline | Strong | |
| Future of initiatives | What next (25 dated events, 15 targets, "what could slip") | Strong | Dates are the speech's; no delivery forecast |
| Effect on others | For me (16 personas, 70 before→after rows, 4 calculators) | Strong | Not personal advice |
| Land price effect | Land lens (18 corridors) | **Analysis** | Ranks catalysts; no price data yet |
| Stocks up in 2 years | Market lens (13 sectors, 55 drivers), sector-only | **Analysis** | Exposure, **not** forecasts; no companies named. See §6. |

## 3. Information architecture

Eleven views under one sticky tab bar, all deep-linkable (`#/view?filters&i=<initiative>`):

`Overview` (question launcher, hero number, "Rs 100" bars, six takeaways) · `Money flow` · `Sectors` (treemap + funding source) · `Initiatives` (search/filter/sort/CSV) · `Where` · `What's new` · `What next` · `For me` · `Land` · `Markets` · `Sources`.

Every initiative opens a **drawer**: allocation, new money, total cost, loans unlocked, funder, implementing body, places, dates, who it affects, Annexure ID, linked land corridors and market drivers. It is the join between all views.

## 4. Data model (`budget-2027/data/`)

| File | Contents | Rows |
|---|---|---|
| `fiscal.js` | Annexure III/IV/I verbatim, macro scoreboard, debt service | — |
| `annex.js` | Annexure II (73) and VII (84), verbatim | 157 |
| `init-a/b/c.js` | Initiatives from the narrative: amount, total cost, new money, loans, status, funder, body, places, years, groups, annexure link | 276 |
| `policy.js` | Tax measures, laws pipeline, dated events, numeric targets | 18 · 29 · 25 · 15 |
| `personas.js` | Before→after rows tagged by who they affect | 70 |
| `lens.js` | **Analysis layer**: land catalysts, market sectors/drivers | 18 · 13 |

Design rules baked into the data:

- **Umbrella totals** (`um:1`, e.g. Rs 131bn health capex) are shown but never added to the projects inside them; **`in:`** flags a line already included in another.
- Sector size in the treemap = the larger of the speech's stated total and the sum of itemised lines.
- USD items are converted at **Rs 300.6** (implied by the speech's own Ditwah figures) and marked `d:1`.
- Analysis rows cite initiative / tax IDs; the UI tags everything **"From the speech"** vs **"AAMA analysis"**.

**Validator** — `node budget-2027/tools/validate.mjs` re-checks Annexure arithmetic (all identities hold; 2025 is ±1 rounding), the Annexure IV borrowing reconciliation, ID/code integrity and all 245 cross-references, and prints reconciliation of stated vs itemised totals. Run it in CI.

**Coverage:** itemised lines total Rs 1.66tn ≈ 21% of Rs 7.93tn spending. The rest is interest (33%), salaries, running costs and transfers the speech doesn't itemise. The Sources page says so.

## 4a. Citizens' Budget 2027 (added after the first build)

The Department of National Budget's **Citizens' Budget** (45 pp., dated Nov 2026) gives official 2027 sector totals from the Estimates. Loaded in `data/estimates.js`, shown under **Sectors → Official totals**.

- **It was prepared before the speech.** It omits the speech's new proposals (e.g. it shows Rs 3.2bn "preparatory" for Kurunegala–Dambulla and Rs 2.0bn for Ruwanpura, where the speech adds Rs 30bn and Rs 27bn; it has no rail electrification).
- **Reconciliation (validated in `tools/validate.mjs`):** 12 sector totals Rs 4,707.4bn + Annexure II Rs 363.1bn = **Rs 5,070.5bn**, against Annexure IV total primary expenditure **Rs 5,070bn**. Interest (Rs 2,643bn) and repayments (Rs 2,207bn) = debt service Rs 4,850bn sit outside the sectors. Revenue Rs 6,180bn matches Annexure III. The capital/recurrent split differs from Annexure IV's by about Rs 30bn; the totals agree.
- **Sector view changed:** the first tab is now the official totals (area = Estimates total; colour = capital share). The speech-based treemap is kept as the second tab, since it still shows what the speech announced. The Annexure II → sector mapping is AAMA's judgement; item #56 (tri-forces, police and prisons allowances, Rs 34.8bn) is shown separately because its split is not published.
- **New facts the speech did not give:** public pensions Rs 425bn for 730,000 pensioners (social protection is the largest sector, Rs 913bn); tri-forces salaries Rs 234bn; school salaries Rs 408bn; school uniforms Rs 38.2bn; 25 ministries, 100 departments, 9 Provincial Councils, 25 District Secretariats; public-sector cadre by profession; macro assumptions (growth 4–5%, inflation anchored at 5% by Q2 2027, unemployment < 5%).
- **Provincial council election:** Rs 8.7bn is provided for "conducting provincial council election" (Citizens' Budget p.27). Added as an initiative and a timeline watch item. This is money, not a date: the Election Commission sets the date and the electoral-system law is pending. (My earlier note that the Budget gave no signal on provincial elections was wrong; the speech is silent, the Estimates are not.)
- **Still not answered:** district-wise and ethnicity-wise spending (the Citizens' Budget has neither) and ministry-by-ministry totals.

## 5. Things the speech says that are worth a story (found while encoding)

1. **Revenue is planned at 15.8% of GDP in 2027, below the "not less than 16%" medium-term floor** in §3 (16.5% in 2026).
2. **Interest is still 43% of revenue** (Rs 2,643bn) and is larger than either the salary bill (Rs 1,410bn) or the subsidies line (Rs 1,472bn); interest + salaries + subsidies = ~90% of revenue.
3. **About 22% of 2027 spending is financed by borrowing / cash drawdown** (deficit Rs 1,753bn = 4.5% of GDP, up from 3.7%).
4. Primary surplus falls 5.4% → 2.3% of GDP; public investment rises 35% to Rs 2tn (5.1% of GDP).
5. Income-tax relief costs only Rs 16bn (0.3% of revenue); calculator reproduces the speech's Rs 750–15,750 range exactly.
6. Small inconsistencies to confirm against the Estimates: Suwa Seriya Rs 1,725M (speech) vs Rs 1,985M (Annex VII); Anuradhapura sports "up to Rs 1,000M" vs Rs 950M new (Annex II); Rs 5,190M for "13 new water projects" vs individually named water lines that sum to more.
7. Annexure III shows the Rs 260bn Ditwah supplementary under bank/other financing, while the Annexure IV note says it is paid from the cash buffer.

## 6. Analysis layers: guardrails (needs your decision)

**Land and Market lenses are editorial analysis, not facts.** Controls built in:

- Always-visible banner: "not valuation / investment advice; pending analyst & compliance review".
- Transparent rubrics, editable in `lens.js`:
  - *Land signal* = commitment (1–3) + effect on land (1–3) + timing (1–3) → High / Medium / Watch.
  - *Market score* = Σ direction × strength × evidence weight (funded & dated 1.0 · funded/needs partner 0.6 · intent only 0.3), filterable by horizon (12m / 24m / beyond) and evidence level.
- Each driver lists its risks; macro forces (inflation 8.3%, IMF programme ends March 2027, heavy borrowing) are shown separately.
- **Sector-only.** No stocks or companies are named on the page (decision taken). A draft starter list is kept internally in `docs/company-starter-list-INTERNAL.md`, unverified, for any future phase.

**Decisions:** (1) sector view only — *taken*. (2) Land and market scores go to an external analyst and legal for confirmation — see `docs/land-market-review-pack.pdf`. (3) We never publish ethnicity-wise spending estimates.

**Publishing switch.** `budget-2027/data/config.js` → `showLenses`. **Now `true`** (approved for publication 2026-11-14; Land and Markets are live, sector-only, with the "not advice / not a valuation" banners). To withdraw them: set it to `false`, leave `data/lens.js` out of the deploy, redeploy.

## 7. Design decisions

- **Visual language:** reuses ama.lk tokens (warm canvas, Fraunces display for headings, Inter body, JetBrains Mono for figures/labels, forest + mint accents, pill nav, light/dark toggle sharing the `aama-theme` key).
- **Data viz** follows the validated categorical palette (8 fixed slots; sectors roll up into 8 themes so no colours are cycled), one-hue mint→forest ramp for the map, thin bars (≤14px, 4px rounded ends), 2px surface gaps, text only in ink tokens, labels only where they fit, hover/focus tooltips, and a **table view** for the main charts. Dark mode is a separate selected ramp.
- **District map is a tile-grid cartogram**, not a choropleth — honest about being schematic, needs no GIS file. Upgrade path: real district polygons (Survey Dept / HDX) once per-capita figures exist.
- **Accessibility:** skip link, `aria-pressed` toggles, focus-visible rings, keyboard-reachable tooltips and drawer (Esc closes), 44px touch targets, reduced-motion, forced-colors and print fallbacks.
- **Mobile:** 16px gutters, horizontally scrolling tab bar, bottom-sheet drawer, stacked tables. Verified no horizontal overflow on all 11 views at 390px.

## 8. Roadmap

| Phase | Scope | Notes |
|---|---|---|
| **0 — done** | Prototype above | 11 views, data, validator |
| **1 — verify (1 wk)** | Line-by-line check of all 276 initiatives against the speech; verify place tags against gazette/Survey maps; compliance & analyst read of Land/Markets | Blocks launch |
| **2 — data depth (2–3 wk)** | Load **Budget Estimates Vol I–III** → true ministry/programme/district figures; Tax Expenditure Statement; Medium-Term Debt Strategy. (Citizens' Budget already loaded.) | Unlocks "by ministry" |
| **3 — per-person & geo (2 wk)** | Census 2012/2024 district population → per-capita district view; district polygons; optional ethnic-composition overlay (descriptive only, editorial rules first) | |
| **4 — evidence for Land/Markets (2–3 wk)** | Official land-price series; interchange maps; CSE price/fundamentals for named firms; refresh scores | |
| **5 — launch (1 wk)** | Sinhala & Tamil (use the Treasury's official translations for initiative names; reuse the site's font stack); OG images per view; analytics; link from ama.lk nav; publish | |
| **6 — live (ongoing)** | Track delivery vs. the 25 dated milestones; add Appropriation Bill amendments; post-Budget updates | |

## 9. Engineering notes

- No build step. Scripts are classic `<script>`s in order; no CDN dependencies (fonts only), so it works offline once fonts are cached.
- Router is hash-based and shareable. Filter state lives in the URL; initiative drawers deep-link (`#/land?i=rds-kg`).
- Suggested additions: per-view `<title>`/OG tags via prerender, `sitemap`, plausible/PostHog events for question-card clicks, calculator use and drawer opens (also tells us what readers actually ask).
- To update after the Estimates are loaded: edit `data/*.js`, run the validator, done. A CSV/JSON export of the dataset is available from the Initiatives page.

## 10. QA performed on the prototype

- Annexure III/IV/I identities and counts (73 / 84 rows) pass; ID and reference integrity pass (245 refs).
- All 11 views load with no console errors at 1360px and 390px; no horizontal overflow.
- Calculators checked against the speech: tax relief min Rs 750 / max Rs 15,750, thresholds Rs 150,000 / 162,500; migrant loan Rs 5M → Rs 400,000/yr.
- Search, filters, CSV export, drawer deep-links and Esc, treemap click, chart↔table toggle, basis toggle, land district filter, market evidence/horizon filters, keyboard tooltips, dark theme.

**Not yet done:** human fact-check of all 276 initiatives; Sinhala/Tamil; real device testing; screen-reader pass; performance audit on throttled mobile.
