/* Budget 2027 explorer — reference data: sectors, themes, geography, funding codes.
   Source of truth for every number: 81st Budget Speech 2027 (12 Nov 2026) incl. Annexures I–VII. */
window.B27 = window.B27 || {};

B27.META = {
  title: '81st Budget Speech – 2027',
  presenter: 'Anura Kumara Dissanayake, Minister of Finance, Planning and Economic Development',
  date: '2026-11-12',
  // Implied from the speech: Ditwah damage Rs 1.022 trillion = USD 3.4 billion  → Rs 300.6 / USD
  usdRate: 300.6,
  // Implied from Annexure III: Revenue 6,150bn = 15.8% of GDP → ~Rs 38.9tn
  gdp2027: 38900
};

/* Eight colour themes (validated categorical slots, fixed order) → sectors roll up into themes */
B27.THEMES = {
  mob: { label: 'Roads, rail & transport',      slot: 1 },
  enw: { label: 'Energy & water',               slot: 2 },
  agr: { label: 'Farms, fisheries & rural',     slot: 3 },
  edu: { label: 'Education & research',         slot: 4 },
  hel: { label: 'Health & social care',         slot: 5 },
  hom: { label: 'Homes, cities & resilience',   slot: 6 },
  biz: { label: 'Business, digital & trade',    slot: 7 },
  gov: { label: 'State, security & culture',    slot: 8 }
};

B27.SECTORS = {
  rds:  { label: 'Roads & expressways',            theme: 'mob', org: 'Ministry of Highways / RDA' },
  trn:  { label: 'Rail & public transport',        theme: 'mob', org: 'Ministry of Transport / Railways / SLTB' },
  mar:  { label: 'Ports, aviation & logistics',    theme: 'mob', org: 'SLPA / AASL' },
  nrg:  { label: 'Energy (electricity & fuel)',    theme: 'enw', org: 'Ministry of Energy / CEB / CPC' },
  wtr:  { label: 'Water & sanitation',             theme: 'enw', org: 'NWSDB / Ministry of Water Supply' },
  agr:  { label: 'Agriculture, livestock & land',  theme: 'agr', org: 'Ministry of Agriculture / Lands' },
  irr:  { label: 'Irrigation',                     theme: 'agr', org: 'Irrigation Dept / Mahaweli' },
  fis:  { label: 'Fisheries',                      theme: 'agr', org: 'Ministry of Fisheries' },
  plt:  { label: 'Plantations',                    theme: 'agr', org: 'Ministry of Plantation' },
  edu:  { label: 'Education & skills',             theme: 'edu', org: 'Ministry of Education / UGC / TVEC' },
  rnd:  { label: 'Research & innovation',          theme: 'edu', org: 'Ministry of Science & Technology' },
  hlt:  { label: 'Health',                         theme: 'hel', org: 'Ministry of Health' },
  soc:  { label: 'Social protection & welfare',    theme: 'hel', org: 'Welfare Benefits Board / Social Services' },
  hou:  { label: 'Housing',                        theme: 'hom', org: 'Ministry of Housing / NHDA' },
  urb:  { label: 'Urban development & floods',     theme: 'hom', org: 'UDA / Land Development Corp.' },
  env:  { label: 'Environment & Clean Sri Lanka',  theme: 'hom', org: 'Ministry of Environment / DWC' },
  dis:  { label: 'Disaster management',            theme: 'hom', org: 'DMC / Dept of Meteorology' },
  dig:  { label: 'Digital economy & telecom',      theme: 'biz', org: 'Ministry of Digital Economy / TRC' },
  fin:  { label: 'SME finance & capital markets',  theme: 'biz', org: 'Dept of Development Finance / CSE' },
  ind:  { label: 'Industry, trade & minerals',     theme: 'biz', org: 'Ministry of Industries / BOI / Customs' },
  tou:  { label: 'Tourism',                        theme: 'biz', org: 'SLTDA / SLTPB' },
  adm:  { label: 'Public administration & local govt', theme: 'gov', org: 'Ministry of Public Administration' },
  pay:  { label: 'Public pay & pensions',          theme: 'gov', org: 'Dept of Management Services / Pensions' },
  sec:  { label: 'Security, police & immigration', theme: 'gov', org: 'Ministry of Public Security / Defence' },
  jus:  { label: 'Justice & prisons',              theme: 'gov', org: 'Ministry of Justice / Prisons' },
  cul:  { label: 'Culture, media, sports & youth', theme: 'gov', org: 'Ministry of Cultural Affairs / Sports' }
};

/* Funding source codes */
B27.FUND = {
  tre: 'Treasury (2027 Budget)',
  sup: 'Ditwah Supplementary Estimate',
  dev: 'Development partner (loan / grant)',
  soe: "State entity's own funds",
  ppp:  'Private / PPP investment',
  mix: 'Mixed sources'
};

/* Status codes */
B27.STATUS = {
  new:     'New this Budget',
  topup:   'Expanded / topped up',
  ongoing: 'Continuing',
  reform:  'Policy / legal reform'
};

/* Provinces → districts. Tile-grid positions (col,row) approximate real geography (north at top). */
B27.PROV = {
  W:  'Western', C: 'Central', S: 'Southern', N: 'Northern', E: 'Eastern',
  NW: 'North Western', NC: 'North Central', U: 'Uva', SG: 'Sabaragamuwa'
};
B27.DIST = {
  'Jaffna':       { p:'N',  c:3, r:0 },
  'Kilinochchi':  { p:'N',  c:3, r:1 },
  'Mannar':       { p:'N',  c:2, r:2 },
  'Vavuniya':     { p:'N',  c:3, r:2 },
  'Mullaitivu':   { p:'N',  c:4, r:2 },
  'Puttalam':     { p:'NW', c:2, r:3 },
  'Anuradhapura': { p:'NC', c:3, r:3 },
  'Trincomalee':  { p:'E',  c:4, r:3 },
  'Kurunegala':   { p:'NW', c:2, r:4 },
  'Matale':       { p:'C',  c:3, r:4 },
  'Polonnaruwa':  { p:'NC', c:4, r:4 },
  'Gampaha':      { p:'W',  c:1, r:5 },
  'Kegalle':      { p:'SG', c:2, r:5 },
  'Kandy':        { p:'C',  c:3, r:5 },
  'Badulla':      { p:'U',  c:4, r:5 },
  'Batticaloa':   { p:'E',  c:5, r:5 },
  'Colombo':      { p:'W',  c:1, r:6 },
  'Ratnapura':    { p:'SG', c:2, r:6 },
  'Nuwara Eliya': { p:'C',  c:3, r:6 },
  'Monaragala':   { p:'U',  c:4, r:6 },
  'Ampara':       { p:'E',  c:5, r:6 },
  'Kalutara':     { p:'W',  c:1, r:7 },
  'Galle':        { p:'S',  c:1, r:8 },
  'Matara':       { p:'S',  c:2, r:8 },
  'Hambantota':   { p:'S',  c:3, r:8 }
};

/* Groups of people an item affects (used by the "Impact on me" lens) */
B27.GROUPS = {
  students:    'Students',
  teachers:    'Teachers & lecturers',
  farmers:     'Farmers',
  fishers:     'Fishing communities',
  smallholders:'Tea & rubber smallholders',
  estate:      'Plantation workers',
  servants:    'Public servants',
  pensioners:  'Pensioners',
  health:      'Patients & health workers',
  women:       'Women-headed households',
  disabled:    'Persons with disabilities',
  elderly:     'Elderly',
  migrants:    'Migrant workers & diaspora',
  sme:         'Small & medium businesses',
  investors:   'Investors',
  tourism:     'Tourism operators',
  commuters:   'Commuters & road users',
  households:  'Households & consumers',
  poor:        'Low-income families',
  displaced:   'Disaster- & conflict-affected families',
  exporters:   'Exporters',
  importers:   'Importers',
  youth:       'Youth & sports',
  journalists: 'Journalists & media',
  taxpayers:   'Salaried taxpayers',
  localgov:    'Local government'
};
