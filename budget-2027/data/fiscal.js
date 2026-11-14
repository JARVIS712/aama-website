/* Fiscal tables — verbatim from Annexures I, III, IV and §1–3 of the speech. Rs billion unless stated. */
window.B27 = window.B27 || {};

/* Annexure III. Columns: 2025 provisional, 2026 revised, 2027 budget, 2027 incl. Ditwah supplementary */
B27.YEARS = ['2025 (prov.)', '2026 (rev.)', '2027 Budget', '2027 + Ditwah suppl.'];
B27.A3 = {
  revGrants:   [5486, 5981, 6180, 6180],
  revenue:     [5449, 5951, 6150, 6150],
  tax:         [5049, 5478, 5687, 5687],
  incomeTax:   [1139, 1311, 1341, 1341],
  goodsTax:    [3198, 3454, 3592, 3592],
  tradeTax:    [712,  713,  754,  754],
  nonTax:      [400,  473,  463,  463],
  grants:      [36,   30,   30,   30],
  expenditure: [6230, 7309, 7673, 7933],
  recurrent:   [5232, 5848, 5934, 5944],
  salaries:    [1164, 1289, 1410, 1410],
  otherGoods:  [335,  370,  409,  409],
  interest:    [2501, 2617, 2643, 2643],
  subsidies:   [1233, 1572, 1472, 1482],
  investment:  [1016, 1480, 1750, 2000],
  other:       [-18,  -19,  -11,  -11],
  revSurplus:  [217,  103,  216,  206],
  primary:     [1756, 1289, 1150, 890],
  deficit:     [-745, -1328, -1493, -1753],
  financing:   [745,  1328, 1493, 1753],
  foreignFin:  [142,  200,  110,  110],
  foreignGross:[567,  700,  700,  700],
  debtRepay:   [-424, -500, -590, -590],
  domesticFin: [602,  1128, 1383, 1643],
  nonBankNet:  [496,  1128, 1383, 1383],
  bankNet:     [106,  0,    0,    260]
};
/* Annexure III ratios, % of GDP */
B27.A3gdp = {
  revenue:     [16.6, 16.5, 15.8, 15.8],
  tax:         [15.4, 15.2, 14.6, 14.6],
  expenditure: [19.0, 20.3, 19.7, 20.3],
  interest:    [7.6,  7.3,  6.8,  6.8],
  investment:  [3.1,  4.1,  4.5,  5.1],
  primary:     [5.4,  3.6,  2.9,  2.3],
  deficit:     [2.3,  3.7,  3.8,  4.5]   // shown as positive deficit %
};

/* Annexure IV — gross borrowing requirement 2027 */
B27.A4 = {
  receiptsExBorrowing: 6230,
  primaryExp: 5070, recurrentPrimary: 3320, capital: 1750,
  debtService: 4850, interest: 2643, repayments: 2207,
  advances: 10, bookAdj: 100,
  grossBorrowing: 3800
};

/* Annexure I — revenue measures, Rs million. [measure, annual impact, effective] */
B27.A1 = [
  ['Special Commodity Levy revisions',          950,    'Nov 2026'],
  ['Ports & Airports Development Levy removal', -350,   'Jan 2027'],
  ['Income tax revisions',                      -16000, 'Apr 2027'],
  ['Phased CESS cut (2nd phase, 25% on 800 lines)', -10000, 'Apr 2027'],
  ['VAT revisions (books & exercise books etc.)',  -2975, 'Apr 2027'],
  ['Tourism Development Levy abolished',        -40,    'Apr 2027']
];
B27.A1total = { annual: -28415, in2027: -21150 };

/* Headline macro scoreboard from §1–3 */
B27.MACRO = [
  { k:'Growth, 2025',                     v:'5.0%',           n:'Q1 2026: 5.1% · Q2 2026: 4.2%', ref:'§1' },
  { k:'Inflation, Oct 2026',              v:'8.3%',           n:'Up from 2.1% in Dec 2025 (fuel prices, Middle East conflict)', ref:'§1', flag:'warn' },
  { k:'Primary balance, 2025',            v:'+5.4% of GDP',   n:'Highest in history; 2027 target 2.3%', ref:'§1' },
  { k:'Budget deficit, 2025',             v:'2.3% of GDP',    n:'Lowest in 68 years; 2027 plan 4.5%', ref:'§1' },
  { k:'Central govt debt',                v:'95% of GDP',     n:'From 114% in 2022; IMF 6th review projects 87% by 2032', ref:'§1·2.1' },
  { k:'Interest as share of revenue',     v:'45.9% → 39.6%',  n:'2025 → Sep 2026 (79.1% in 2022)', ref:'§1' },
  { k:'State-owned enterprises (52)',     v:'Rs 444.4bn profit', n:'2025, vs. Rs 774.6bn loss in 2022', ref:'§1' },
  { k:'Remittances, 2025',                v:'USD 8.1bn',      n:'Record; >USD 9bn expected in 2026', ref:'§1' },
  { k:'Foreign reserves, Oct 2026',       v:'> USD 7bn',      n:'Current account: surplus USD 1,853M (9M 2025) → deficit USD 420M (9M 2026)', ref:'§1·2' },
  { k:'Private credit growth, 2025',      v:'+25.2%',         n:'Rs 8,156bn → Rs 10,212bn', ref:'§1' },
  { k:'Fitch rating',                     v:"CCC+ → B-",      n:'2026 upgrade', ref:'§1' },
  { k:'World Bank income class',          v:'Upper middle',   n:'Restored in 2026', ref:'§1' }
];

/* Foreign debt service, USD million (§2.1) */
B27.FDS = [['2025',3707],['2026',3591],['2027',2986],['2028',3574]];

/* Debt, % of GDP (§1, §2.1) */
B27.DEBT = [['2022',114],['2025',95],['2032 (IMF EFF target)',95],['2032 (IMF 6th review projection)',87]];

/* Headline "envelopes" the speech states in words — kept separate from itemised initiatives. Rs million. */
B27.ENVELOPES = [
  { id:'env-hw',   t:'Highways, expressways & railways (this Budget)',  a:251000, s:'rds', ref:'§10', n:'Speech also expects Rs 487bn total spend incl. Rs 146bn new proposals and Rs 90bn Ditwah restoration. Includes the Rs 80bn rail electrification.' },
  { id:'env-trn',  t:'Railway & passenger bus modernisation',           a:95000,  s:'trn', ref:'§25' },
  { id:'env-irr',  t:'Irrigation',                                      a:77000,  s:'irr', ref:'§17.2' },
  { id:'env-youth',t:'Youth affairs & sports development',              a:8500,   s:'cul', ref:'§19' }
];
