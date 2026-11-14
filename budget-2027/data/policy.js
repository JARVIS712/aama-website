/* Tax measures (§36 + Annexure V), laws pipeline (§4, §7 …), and timeline events/targets. */
window.B27 = window.B27 || {};

/* effect: who/what changes; dir: + good for payer, – costs payer; rev: revenue impact Rs M (Annexure I where given) */
B27.TAX = [
 {id:'tax-pit',  t:'Personal income tax: tax-free band Rs 1.80M → Rs 1.95M a year; wider, gentler slabs (6/12/18/24/30/36%)',eff:'1 Apr 2027',dir:'+',who:'taxpayers',rev:-16000,ref:'§36.1',k:'Income tax',d:'Tax-free up to Rs 162,500/month. Relief of Rs 750–15,750 a month vs. today; Rs 4,250–36,250 a month vs. pre-2025.'},
 {id:'tax-ecap', t:'200% enhanced capital allowance for BOI export-manufacturing & tourism investments ≥ USD 3M',eff:'1 Apr 2027',dir:'+',who:'investors,exporters,tourism',ref:'§36.2',k:'Income tax',d:'Invest within 3 years (5 for hotels); replaces existing allowances.'},
 {id:'tax-cgt',  t:'Capital gains tax widened: crypto & digital assets; telecom/broadcast licences; gems, jewellery & valuable movables above a threshold',eff:'1 Apr 2027',dir:'–',who:'investors',ref:'Annex V §1.3',k:'Income tax',d:'Land and listed shares are not mentioned in the widening.'},
 {id:'tax-books',t:'VAT removed on textbooks, exercise books, dictionaries, children’s books, printed music & loose printed sheets',eff:'1 Apr 2027',dir:'+',who:'students,households',rev:-2975,ref:'§36.3',k:'VAT',d:'Printed books became taxable in Jan 2024; exercise books were taxable earlier.'},
 {id:'tax-vatrm',t:'VAT exemption removed on Artemia eggs and coconut coir pith',eff:'1 Apr 2027',dir:'–',who:'farmers,fishers',ref:'Annex V §2.2',k:'VAT',d:''},
 {id:'tax-cinema',t:'Cinema-ticket VAT now charged on each party’s share (after Entertainment Tax), not the full ticket',eff:'1 Apr 2027',dir:'+',who:'sme',ref:'§36.4',k:'VAT',d:'Producers, distributors, NFC and halls.'},
 {id:'tax-eligexp',t:'New VAT-registered exporters qualify as “Eligible Exporter” if >80% of the last 6 months’ turnover is exports',eff:'1 Apr 2027',dir:'+',who:'exporters',ref:'§36.5',k:'VAT',d:'Removes the preceding-calendar-year test.'},
 {id:'tax-fx',   t:'VAT on foreign-currency supplies uses the CBSL indicative exchange rate',eff:'1 Apr 2027',dir:'0',who:'exporters,sme',ref:'§36.6',k:'VAT',d:''},
 {id:'tax-einv', t:'Electronic tax invoices legally valid',eff:'1 Apr 2027',dir:'0',who:'sme',ref:'Annex V §2.6',k:'VAT',d:''},
 {id:'tax-bunker',t:'SSCL exemption for bunker fuel sold to ships in international transport',eff:'1 Apr 2027',dir:'+',who:'exporters,investors',ref:'§36.7',k:'SSCL',d:'Supports Colombo/Galle/Trincomalee bunkering hub plans.'},
 {id:'tax-bet',  t:'Comprehensive review and simplification of betting & gaming taxes',eff:'Review',dir:'0',who:'investors',ref:'§36.8',k:'Gaming',d:'Gambling Regulatory Authority already set up.'},
 {id:'tax-admin',t:'Tax-administration clean-up: refunds & input-tax credits not lost on technicalities; merger anti-avoidance; digital-service income sourced by place of payment',eff:'1 Apr 2027',dir:'0',who:'sme,investors',ref:'§36.9 · Annex V §7',k:'Admin',d:'Online advertising and cloud services: source determined by place of payment.'},
 {id:'tax-scl-down',t:'Special Commodity Levy cut: sprats Rs 100 → 10/kg; Maldive fish Rs 302 → 10/kg; dried chillies −Rs 50/kg',eff:'13 Nov 2026',dir:'+',who:'households',ref:'§36.10',k:'Levy',d:'Cost-of-living relief on staple dried foods.'},
 {id:'tax-sugar',t:'Special Commodity Levy on imported sugar +Rs 10/kg',eff:'13 Nov 2026',dir:'–',who:'households,sme',ref:'§36.12',k:'Levy',d:'Protects domestic sugar; raises costs for sugar-using manufacturers and households. SCL changes net +Rs 950M a year.'},
 {id:'tax-cess', t:'CESS cut by 25% on 800 tariff lines (phase 2 of tariff phase-out)',eff:'1 Apr 2027',dir:'+',who:'importers,households,sme',rev:-10000,ref:'§36.11',k:'Import tariff',d:'Cheaper imported inputs and goods.'},
 {id:'tax-pal',  t:'PAL (10%) removed on newsprint and on solar-storage batteries',eff:'1 Jan 2027',dir:'+',who:'households,journalists',rev:-350,ref:'§36.11',k:'Import tariff',d:'Newsprint cost relief for publishers; cheaper home batteries.'},
 {id:'tax-tdl',  t:'Tourism Development Levy abolished (Treasury funds SLTDA instead)',eff:'1 Apr 2027',dir:'+',who:'tourism',rev:-40,ref:'§36.13',k:'Levy',d:''},
 {id:'tax-excise',t:'Amend (rather than replace) the Excise Ordinance',eff:'TBD',dir:'0',who:'sme',ref:'§36.14',k:'Excise',d:''}
];

/* Laws & institutions. stage: passed → gazetted → ag (with AG) → draft → planned */
B27.LAWS = [
 {t:'Rescue, Rehabilitation & Insolvency (Corporate and Personal) Act, No. 12 of 2026',stage:'passed',when:'2026',n:'Second chance for collapsed businesses'},
 {t:'Prevention of Money Laundering (Amendment) Act, No. 16 of 2026',stage:'passed',when:'2026'},
 {t:'Financial Transactions Reporting (Amendment) Act, No. 17 of 2026',stage:'passed',when:'2026'},
 {t:'Convention on the Suppression of Terrorist Financing (Amendment) Act, No. 18 of 2026',stage:'passed',when:'2026'},
 {t:'Microfinance and Credit Regulatory Authority Act, No. 9 of 2026 — authority to be set up',stage:'passed',when:'Authority in 2027',n:'Protects over-indebted microfinance borrowers'},
 {t:'Personal Data Protection Act amended; Data Protection Authority operational',stage:'passed',when:'2026'},
 {t:'Public-Private Partnership (PPP) Act',stage:'gazetted',when:'To Parliament early 2027',n:'Needed for the airport, port, refinery & Trincomalee PPPs'},
 {t:'Digital Economy Bill (Digital Economy Authority & National Digital Economy Council)',stage:'planned',when:'Q1 2027'},
 {t:'Customs Ordinance (Amendment) Act',stage:'planned',when:'H1 2027'},
 {t:'National Research & Development Bill',stage:'draft',when:'H1 2027'},
 {t:'Digital-solutions procurement guidelines (with Procurement Commission)',stage:'planned',when:'H1 2027'},
 {t:'State Owned Business Enterprises Management Bill (holding company; 34 SOEs identified)',stage:'ag',when:'Referred to AG'},
 {t:'Investment Protection Bill',stage:'ag',when:'Referred to AG'},
 {t:'Colombo Port City Economic Commission (Amendment) Bill',stage:'ag',when:'Referred to AG'},
 {t:'Cyber Security Bill — Cyber Security Authority in 2027',stage:'ag',when:'Referred to AG'},
 {t:'Institute of Professional Actuaries of Sri Lanka Act',stage:'draft',when:'Being drafted'},
 {t:'National Statistics Act',stage:'draft',when:'Being drafted'},
 {t:'Upper Watershed Area Management Authority Act',stage:'planned',when:'“Very soon”'},
 {t:'Dam Safety Act',stage:'planned',when:'To be introduced'},
 {t:'Public Asset Management Act',stage:'planned',when:'To be introduced'},
 {t:'Finance Business Act amendments (finance-company supervision & winding-up)',stage:'planned',when:'To be amended'},
 {t:'Financial Reporting Regulatory (Amendment) Act',stage:'planned',when:'To be amended'},
 {t:'Excise (Special Provisions) Act amendments',stage:'planned',when:'To be amended'},
 {t:'National Gem and Jewellery Authority Act (licensing of jewellers)',stage:'planned',when:'To be amended'},
 {t:'Fauna & Flora Protection Ordinance & Increase of Fines Act (elephant-crime fines Rs 500k–1M)',stage:'planned',when:'To be amended'},
 {t:'Labour-law reform (expert committee, National Labour Advisory Council consulted)',stage:'draft',when:'Recommendations being formulated'},
 {t:'Virtual Asset Service Provider (VASP) legal framework',stage:'planned',when:'To be established'},
 {t:'Permanent residency for investors (by investment size)',stage:'draft',when:'Legislative work begun'},
 {t:'Lease terms of Regional Plantation Companies (expire 2045) — review committee',stage:'draft',when:'Committee appointed'}
];

/* Dated events. type: eff (takes effect) · law · build (milestone) · tender (RFP/bids) · target */
B27.EVENTS = [
 {d:'2026-11-13',t:'SCL changes: sprats, Maldive fish, dried chillies cut; sugar +Rs 10/kg',type:'eff',ids:['tax-scl-down','tax-sugar']},
 {d:'2027-01-01',t:'PAL removed on newsprint and solar-storage batteries',type:'eff',ids:['nrg-batt']},
 {d:'2027-01',t:'Sri Lanka Expo 2027; private proposals invited for floating solar',type:'tender',ids:['ind-expo','nrg-float']},
 {d:'2027-02-02',t:'Mannar Basin oil & gas bids open',type:'tender',ids:['nrg-lic']},
 {d:'2027-02',t:'El Niño expected to peak (WMO)',type:'target',ids:['agr-elnino']},
 {d:'2027-Q1',t:'Digital Economy Bill expected to pass; trains reach Kandy',type:'law',ids:['dig-moe','trn-upc']},
 {d:'2027',t:'Rs 8.7bn is provided in the 2027 Estimates for conducting a provincial council election. No date is set; the Election Commission decides it, and the electoral-system law is pending',type:'watch',ids:['adm-pcelec']},
 {d:'2027-03',t:'IMF Extended Fund Facility concludes; committee to assess a successor programme',type:'target',ids:[]},
 {d:'2027-04-01',t:'Tax changes effective; Tourism Development Levy abolished; teacher-trainee, Pirivena, field-officer & private-degree allowances rise',type:'eff',ids:['tax-pit','edu-trainee','edu-piri','pay-field','edu-loan']},
 {d:'2027-H1',t:'Customs Ordinance amendment; R&D Bill; digital procurement guidelines; Colombo North Port feasibility; NSW opens to exporters',type:'law',ids:['ind-nsw','mar-north']},
 {d:'2027-05',t:'Pothuhera–Rambukkana expressway section due',type:'build',ids:['rds-pr']},
 {d:'2027-06',t:'New police uniform issued',type:'eff',ids:['sec-uni']},
 {d:'2027-07-01',t:'Pensioner interim allowance, health, forces, police, prison, academic (50%) & commission allowances start',type:'eff',ids:['pay-pens','hlt-allow','pay-forces','pay-lect']},
 {d:'2027-07',t:'Up-Country railway restored to Badulla (mid-2027)',type:'build',ids:['trn-upc']},
 {d:'2027-H2',t:'National Single Window extends to importers & re-exports',type:'build',ids:['ind-nsw']},
 {d:'2027',t:'RFPs: Sapugaskanda refinery, Trincomalee tanks, Colombo logistics centre, Mattala investors; minerals investors selected',type:'tender',ids:['nrg-refine','mar-trinco','mar-logc','mar-mat','ind-min']},
 {d:'2027',t:'BESS capacity reaches 560 MW; +50 MW wind; free smart meters for 300,000 homes',type:'build',ids:['nrg-bess','nrg-wind','nrg-smart']},
 {d:'2028-04',t:'Sethsiripaya Stage III completes',type:'build',ids:['adm-seth']},
 {d:'2028-09',t:'Kadawatha–Mirigama expressway section due',type:'build',ids:['rds-km']},
 {d:'2028',t:'573 telecom towers built under Gamata Sannivedanaya; remaining 50% of health/judicial allowances paid; pension revision starts with 2028 Budget',type:'build',ids:['dig-tower','hlt-allow','pay-pens']},
 {d:'2029',t:'Renewables reach 69% of capacity; BESS 1,245 MW; wind 674 MW; Arogya 1,000 centres; waste collection 60%',type:'target',ids:['nrg-bess','nrg-wind','hlt-arogya','env-waste']},
 {d:'2029-07',t:'Rambukkana–Galagedara expressway section due',type:'build',ids:['rds-rg']},
 {d:'2030',t:'400 kV Kilinochchi–Habarana line; fisheries exports USD 600M; plantation exports USD 5bn; 700–800 towers; rabies-free target',type:'target',ids:['nrg-north','fis-base','plt-env','dig-tower','hlt-rabies']},
 {d:'2032',t:'IMF debt target 95% of GDP (6th review projects 87%); Katunayake needs 16M-passenger capacity',type:'target',ids:['mar-t1']},
 {d:'2040',t:'Colombo Port >30M TEU; Hambantota water gap ~115 MCM/yr',type:'target',ids:['mar-ws2','irr-hamb']},
 {d:'2045',t:'Regional Plantation Company leases expire',type:'target',ids:['plt-lease']}
];

/* Measurable targets. now = latest figure the speech gives (null if none); to = target; by = year */
B27.TARGETS = [
 {t:'Renewable share of installed capacity',  now:62,    to:69,    unit:'%',      by:2029, s:'nrg'},
 {t:'Battery storage on the grid',            now:160,   to:1245,  unit:' MW',    by:2029, s:'nrg', n:'160 MW in 2026 → 560 MW in 2027'},
 {t:'Wind power installed',                   now:304,   to:674,   unit:' MW',    by:2029, s:'nrg', n:'Current level implied: 674 − 370 MW to be added'},
 {t:'Fuel storage',                           now:null,  to:45,    unit:' days of cover', by:2027, s:'nrg', n:'New tanks add 126,000 m³'},
 {t:'Secondary schools with reliable internet',now:6225, to:6975,  unit:' schools',by:2028, s:'edu', n:'750 remaining; primary schools next'},
 {t:'Arogya wellness centres',                now:39,    to:1000,  unit:' centres',by:2029, s:'hlt', n:'Pilot of 39 today'},
 {t:'Rural telecom towers (Gamata Sannivedanaya)',now:null,to:573, unit:' towers', by:2028, s:'dig', n:'700–800 needed by 2030'},
 {t:'Waste collection rate',                  now:32,    to:60,    unit:'%',      by:2029, s:'env'},
 {t:'Fisheries export earnings',              now:300,   to:600,   unit:' USD M', by:2030, s:'fis'},
 {t:'Plantation export earnings',             now:3000,  to:5000,  unit:' USD M', by:2030, s:'plt'},
 {t:'Public-service vacancies filled',        now:40000, to:148940,unit:'',       by:2029, s:'adm', n:'Of 148,940 approved'},
 {t:'Central government debt',                now:95,    to:87,    unit:'% of GDP',by:2032,s:'adm', n:'95% in 2025 (114% in 2022). IMF programme target 95% by 2032; the 6th review projects 87%'},
 {t:'Government revenue',                     now:15.8,  to:20,    unit:'% of GDP',by:2035,s:'adm', n:'2027 plan is 15.8%, below the 16% medium-term floor; ≈20% is the long-term aim'},
 {t:'“A Place of One’s Own” houses',          now:null,  to:70000, unit:' houses',by:2031, s:'hou', n:'10,000 planned in 2027'},
 {t:'Colombo port capacity',                  now:null,  to:30,    unit:'M TEU',  by:2040, s:'mar'}
];
