/* AAMA ANALYSIS LAYER — not stated in the speech. Land catalysts and market exposure.
   Every row cites the initiative / tax ids it rests on. Scores are transparent rubrics, not price forecasts. */
window.B27 = window.B27 || {};

/* ───────────── LAND LENS ─────────────
   commit: 1 study / intent · 2 funded or tendered · 3 funded and under construction
   effect: 1 indirect/enabler · 2 local amenity or utility · 3 direct access / demand shock (interchange, rail station, airport, port)
   timing: 1 beyond 2030 · 2 2028–2030 · 3 by end-2027/28
   signal = commit + effect + timing  →  High 8–9 · Medium 6–7 · Watch ≤5 */
B27.LAND = [
 {id:'l-cep-s', name:'Colombo ↔ Kurunegala gateway', sub:'Kadawatha–Mirigama · Pothuhera–Rambukkana',
  d:['Gampaha','Kurunegala','Kegalle'], ids:['rds-km','rds-pr','rds-link'], commit:3, effect:3, timing:3, when:'May 2027 – Sep 2028',
  why:'Two funded, part-built expressway sections finishing within ~2 years. Land near new interchanges (Mirigama, Pothuhera, Rambukkana) gains commuter, warehousing and roadside-commercial demand.',
  watch:'Final interchange locations; Rs 8,500M of link roads; any slip past Sep 2028 (the section was stalled once).',
  risk:'Delays and cost over-runs have hit this corridor before; value tends to rise most within a few km of an interchange, not along the whole route.'},
 {id:'l-cep-k', name:'Rambukkana → Galagedara → Kandy', sub:'Central Expressway section 3',
  d:['Kegalle','Kandy'], ids:['rds-rg','rds-fly','trn-upc'], commit:3, effect:3, timing:2, when:'Jul 2029',
  why:'Cuts Colombo–Kandy journey time; Kandy flyover and multimodal hub improve last-mile access. Tourism and hill-country residential demand benefit.',
  watch:'Galagedara/Kandy-side interchange sites; Rs 5,000M link roads.',
  risk:'Hill terrain and acquisition are the usual delay sources.'},
 {id:'l-cep-n', name:'Kurunegala → Galewela → Dambulla', sub:'Central Expressway Phase 4',
  d:['Kurunegala','Matale'], ids:['rds-kg','mar-sig','ind-estates'], commit:2, effect:3, timing:1, when:'Beyond 2030',
  why:'Rs 30bn start-up funding plus Sigiriya airport and the Dambulla industrial estate point to a Cultural-Triangle logistics and tourism corridor.',
  watch:'Route alignment notices and land-acquisition gazettes — the first real price signal.',
  risk:'Only step 1 is funded; completion beyond the forecast window. Speculation can run ahead of delivery.'},
 {id:'l-ruw', name:'Ruwanpura Expressway: Kahathuduwa → Ingiriya → Ratnapura', sub:'Phase 1 + A008 upgrade',
  d:['Colombo','Kalutara','Ratnapura'], ids:['rds-rw','rds-a8','rds-feas','urb-ratq','ind-estates'], commit:3, effect:3, timing:2, when:'2028 – 2030',
  why:'First phase is funded (Rs 18.7bn in 2026, Rs 27bn in 2027). Ingiriya/Raigama industrial estates and Ratnapura city redevelopment add demand nodes.',
  watch:'Phase-1 interchange map; Ratnapura city plan; Millewa (Horana) area demand.',
  risk:'Phase 1 stops at Ingiriya; the Ratnapura leg is only an upgrade and bypass feasibility for now.'},
 {id:'l-rail', name:'Colombo suburban rail electrification', sub:'Kelani Valley · Main · Coastal lines',
  d:['Colombo','Gampaha','Kalutara'], ids:['trn-kv','trn-main','trn-coast','trn-rail-o','trn-stn'], commit:3, effect:3, timing:2, when:'Phase 1 from 2027; programme >Rs 1,200bn',
  why:'Faster, more frequent trains lift the value of land and rents within walking distance of stations (Homagama, Maharagama, Nugegoda, Ragama, Moratuwa, Panadura …).',
  watch:'Station-area plans; land-acquisition notices (Rs 900M budgeted); any transit-oriented-development rules.',
  risk:'Multi-year construction disruption; land acquisition along narrow corridors; delivery depends on financing.'},
 {id:'l-bia', name:'Katunayake airport belt', sub:'Terminals, cargo hub, access roads, industrial estate',
  d:['Gampaha'], ids:['mar-t1','mar-t2','mar-dom','mar-park','mar-road','mar-hub','nrg-jet','ind-estates','rds-feas'], commit:3, effect:3, timing:2, when:'2026 – 2030',
  why:'Capacity 6M → 9M passengers now, second terminal (JICA) next, a BOT cargo/re-export hub, jet-fuel pipeline and a Katunayake–Chilaw expressway study all point at warehousing, hotel and logistics demand around Katunayake–Seeduwa–Negombo.',
  watch:'Hub BOT award; Katunayake–Chilaw route; airport-zone height/noise rules.',
  risk:'Airport noise and zoning limits; flood exposure; cargo-hub BOT depends on private bidders.'},
 {id:'l-port', name:'Colombo Port, Fort & Port City', sub:'West Terminal II · North Port · logistics centre · Fort heritage zone',
  d:['Colombo','Gampaha'], ids:['mar-ws2','mar-north','mar-logc','mar-vtms','tou-fort','tou-cruise','urb-beira'], commit:3, effect:3, timing:2, when:'2027 – 2032',
  why:'Port expansion, a PPP logistics centre, Port City investor-facility amendments, the USD 77M Fort restoration and a cruise terminal all raise demand for port-adjacent logistics land and Fort-area commercial/hospitality space.',
  watch:'Logistics-centre RFP (due within two months); Port City Bill; North Port feasibility (H1 2027).',
  risk:'Several pieces are PPP-dependent; North Port is still only a feasibility study.'},
 {id:'l-colombo', name:'Central Colombo land release', sub:'Prison relocation · Police HQ · ministries to Narahenpita',
  d:['Colombo'], ids:['jus-mill','sec-polhq','sec-cid','ind-moi','adm-seth','urb-beira'], commit:1, effect:3, timing:1, when:'2030+',
  why:'Moving the Welikada, Magazine and Remand prisons to Millewa, and consolidating rented police and ministry offices, could eventually free very large central sites.',
  watch:'Any Cabinet decision on use of vacated sites; Millewa construction progress.',
  risk:'Only Rs 300M for the start of relocation. Use of freed land is undecided. Long-dated.'},
 {id:'l-galle', name:'Galle heritage-city & southern tourism', sub:'Water · prison relocation · cruise & bunkering',
  d:['Galle','Matara'], ids:['wtr-galle','jus-galle','tou-cruise','mar-bunk','tou-mist','jus-matara'], commit:2, effect:2, timing:2, when:'2027 – 2031',
  why:'Greater Galle water (Rs 37.5bn project), relocating Galle Prison to Boossa to free the heritage zone, cruise-terminal upgrades and a Galle bunkering plan add up to an upgrade of the city core.',
  watch:'Heritage-city development plan; Boossa site works.',
  risk:'Heritage-zone building rules limit supply — which can lift values but restricts redevelopment.'},
 {id:'l-kandy', name:'Kandy metropolitan area', sub:'Kundasale–Haragama water · flyover · e-bus · Peradeniya medicine faculty',
  d:['Kandy'], ids:['wtr-kh','rds-fly','trn-ebus','edu-med','trn-upc','nrg-dcc'], commit:2, effect:2, timing:2, when:'2027 – 2031',
  why:'A Rs 34bn water scheme for the fast-growing Kundasale–Haragama belt and better rail/road access support suburban residential demand.',
  watch:'Haragama/Kundasale zoning; expressway interchange sites.',
  risk:'Landslide-prone slopes after Ditwah; building restrictions.'},
 {id:'l-uc', name:'Up-Country tourism towns', sub:'Ella · Nuwara Eliya · Bandarawela · Badulla',
  d:['Nuwara Eliya','Badulla'], ids:['trn-upc','urb-t19','wtr-waste','wtr-hb'], commit:2, effect:2, timing:3, when:'Rail back to Badulla by mid-2027',
  why:'Restored railway plus town-development funding and Ella wastewater works support hospitality and home-stay land.',
  watch:'Rail reopening date; home-stay loan uptake (3%, up to Rs 2M).',
  risk:'Landslide/ecological restrictions; Upper Watershed Authority may tighten land-use rules.'},
 {id:'l-north', name:'Northern Province build-out', sub:'Kilinochchi water · 400 kV line · Pesalai harbour · Jaffna · Puliyankulam',
  d:['Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu'], ids:['wtr-kil','wtr-jv','nrg-north','fis-north','tou-forts','ind-estates','hou-disp','rds-br','irr-lmo','env-island'], commit:2, effect:2, timing:2, when:'2027 – 2032',
  why:'Utilities (water, grid), harbour and industrial-estate spending plus resettlement of 13,000 families widens the usable, financeable land base.',
  watch:'Title clearance for returnee land; Puliyankulam estate plan; Jaffna fort PPP.',
  risk:'Land-title and ownership complexity; thin market, so prices can be volatile on small volumes.'},
 {id:'l-east', name:'Trincomalee & Eastern coast', sub:'Energy hub · bunkering · China Bay · Valachchenai estate · mineral sands',
  d:['Trincomalee','Batticaloa','Ampara'], ids:['mar-trinco','mar-bunk','mar-cb','ind-estates','irr-mund','ind-min','tou-forts','urb-t19'], commit:2, effect:2, timing:2, when:'2027 – 2032',
  why:'A Trincomalee fuel-storage/energy hub (29 of 61 tanks to be offered by RFP), airport upgrades and industrial/mineral value-addition projects are potential demand anchors.',
  watch:'Trincomalee tank-farm RFP; mineral-sands investor selection.',
  risk:'Most pieces depend on PPP/private investors not yet chosen.'},
 {id:'l-hamb', name:'Hambantota–Mattala', sub:'Airport investors · industrial-zone water · Moneragala–Hambantota line',
  d:['Hambantota','Monaragala'], ids:['mar-mat','irr-hamb','nrg-pvt-tx'], commit:1, effect:2, timing:1, when:'2028+',
  why:'Mattala has accumulated losses above Rs 70,000M; the plan is to bring in investors for operations, data centres, catering and MRO, with water for the industrial zone studied for 2040.',
  watch:'RFP results for Mattala; Hambantota water solution.',
  risk:'Previous airport/port-led land booms in the area did not deliver. Treat as optionality.'},
 {id:'l-anu', name:'Anuradhapura sacred city & North Central', sub:'Sacred-city plan · Lower Malwathu Oya · sports complex · DS office',
  d:['Anuradhapura','Polonnaruwa'], ids:['cul-anuhrt','irr-lmo','cul-anu','adm-ds','hlt-tham','irr-mahaweli'], commit:2, effect:2, timing:2, when:'2027 – 2030',
  why:'Sacred-city infrastructure, a Rs 7.5bn Malwathu Oya project, Mahaweli canal works and new public buildings support the district town and agricultural land.',
  watch:'UDA Rs 8.2bn city plan; canal command-area schedules.',
  risk:'Heritage-zone restrictions near the sacred city.'},
 {id:'l-flood', name:'Flood-risk reduction in Colombo suburbs', sub:'Mudun Ela · Piliyandala–Kesbewa · canals · pumps',
  d:['Colombo','Gampaha','Kalutara'], ids:['urb-flood','urb-pump','urb-rain'], commit:2, effect:2, timing:2, when:'2027 – 2030',
  why:'Lower flood risk can recover value in low-lying suburbs (Wattala–Kelaniya–Biyagama, Piliyandala–Kesbewa, Kolonnawa). This is “de-risking”, not a demand shock.',
  watch:'Performance in the next monsoon; the long-term urban flood plan (Rs 250M, being drafted).',
  risk:'Climate extremes (El Niño now, Ditwah-type rain later) can outpace drainage works.'},
 {id:'l-towns', name:'City-branding & housing in 29 towns', sub:'10 + 19 towns · urban housing complexes · apartments',
  d:['Jaffna','Matale','Batticaloa','Trincomalee','Kurunegala','Galle','Matara','Ratnapura'], ids:['urb-t10','urb-t19','hou-urban','hou-apt','hou-mid'], commit:2, effect:1, timing:2, when:'2027 – 2031',
  why:'Spreading Rs 7.7bn of town upgrades and housing finance across many towns lifts regional-centre land modestly rather than creating one hot-spot.',
  watch:'Which towns get anchor projects; apartment-financing terms.',
  risk:'Small per-town budgets; effect is diffuse.'},
 {id:'l-title', name:'Clear titles & digital land records (island-wide)', sub:'Bimsaviya · 3.5M survey plans digitised',
  d:[], ids:['agr-bim','agr-ldig'], commit:2, effect:1, timing:2, when:'2027 – 2029',
  why:'Clear, searchable titles reduce disputes and make land easier to mortgage and sell — a slow, broad support rather than a spike.',
  watch:'Pace of title registration; digitised-plan access for banks and valuers.',
  risk:'Small budget (Rs 940M).'}
];

B27.LAND_HEADWINDS = [
 {t:'No land or property tax change in the speech', d:'The tax proposals (§36, Annexure V) do not touch land, stamp duty or property tax. The Capital Gains Tax widening covers crypto, licences and valuables — not land.', kind:'fact'},
 {t:'Central Highlands protection', d:'A proposed Upper Watershed Area Management Authority and a USD 100M loan to restore the highlands point to tighter land-use control in Kandy, Nuwara Eliya, Matale and Badulla uplands.', kind:'analysis', ids:['env-water']},
 {t:'Disaster-risk zones', d:'Cyclone Ditwah (USD 3.4bn damage) and an El Niño peaking in Feb 2027 raise the importance of flood/landslide risk in valuations.', kind:'analysis', ids:['dit-sup','agr-elnino']},
 {t:'Elephant corridors and reserves', d:'More corridors are being gazetted (Handapanagala, Koholankala, Wetahira Kanda; Nachchaduwa–Maha Kanadarawa planned) — limits development near them.', kind:'fact', ids:['env-wild']},
 {t:'Funding & delivery risk', d:'The IMF programme ends in March 2027, gross borrowing is Rs 3.8tn and several corridors rely on foreign loans or private bidders. Slippage would delay catalysts — the Central Expressway has stalled before.', kind:'analysis'},
 {t:'Paddy-land flexibility is for crops, not construction', d:'The new freedom lets owners grow field or permanent crops on idle paddy land; it is not a land-conversion rule.', kind:'fact', ids:['agr-paddy']}
];

/* ───────────── MARKET LENS ─────────────
   dir: +1 tailwind / −1 headwind · str 1–3 · ev: A funded & dated · B funded or needs private partner · C intent only
   h: 1 within 12 months · 2 within 12–24 months · 3 beyond 24 months
   score = Σ dir × str × weight(ev)   (A 1.0 · B 0.6 · C 0.3) */
B27.EVW = { A:1.0, B:0.6, C:0.3 };

B27.MKT = [
 {id:'m-con', name:'Construction & engineering',
  drivers:[
   {t:'Expressway sections in construction: Kadawatha–Mirigama, Pothuhera–Rambukkana, Rambukkana–Galagedara', dir:1,str:3,ev:'A',h:1, refs:['rds-km','rds-pr','rds-rg'], why:'Rs 81bn of 2027 allocations on works already under way.', risk:'Cash-flow timing and contractor payment delays.'},
   {t:'New expressways: Kurunegala–Galewela and Ruwanpura phase 1', dir:1,str:3,ev:'A',h:2, refs:['rds-kg','rds-rw'], why:'Rs 57bn in 2027 for new corridors; tenders follow.', risk:'Package size may favour foreign or joint-venture contractors.'},
   {t:'Rail electrification phase 1 (Rs 80bn in 2027; >Rs 1.2tn programme)', dir:1,str:3,ev:'A',h:2, refs:['trn-kv','trn-main','trn-coast'], why:'Largest single new line in the Budget.', risk:'Foreign-financed turnkey packages may leave less for local firms.'},
   {t:'Housing, water, hospitals, courts and prisons pipeline', dir:1,str:2,ev:'A',h:1, refs:['hou-urban','hou-own','wtr-kh','wtr-kil','wtr-galle','jus-courts','hlt-new'], why:'Many mid-size civil works start in 2027.', risk:'Competes with Ditwah reconstruction for capacity.'},
   {t:'Rural roads & bridges (Rs 80bn) and district programme (Rs 50bn)', dir:1,str:2,ev:'A',h:1, refs:['rds-rural','adm-ddp'], why:'Large volume of small contracts; tends to favour regional contractors.', risk:'Fragmented, politically sensitive awarding.'},
   {t:'Public-sector capex ratio rises to 5.1% of GDP (2027)', dir:1,str:2,ev:'A',h:1, refs:[], why:'Rs 2,000bn public investment (4.5% in budget + 0.64% Ditwah).', risk:'Primary expenditure is set to fall back to 13% of GDP from 2028.'}
  ],
  co:[{n:'Access Engineering',why:'Large listed civil contractor',conf:'med'},{n:'Colombo Dockyard',why:'Marine & naval engineering',conf:'low'}]},
 {id:'m-mat', name:'Building materials (cement, cables, steel, tiles)',
  drivers:[
   {t:'Volume demand from the infrastructure & housing pipeline', dir:1,str:2,ev:'B',h:1, refs:['rds-km','trn-kv','hou-own','hou-ditwah'], why:'Cement, steel, cable and tile demand follows civil works and 10,000 new houses a year.', risk:'Big public projects may import specified materials.'},
   {t:'CESS cut of 25% on 800 tariff lines', dir:-1,str:1,ev:'C',h:1, refs:['tax-cess'], why:'If any building-material lines are among the 800, local producers face cheaper imports. Line list not yet checked.', risk:'Needs the HS-line list from the gazette.'},
   {t:'Rs 90bn Ditwah housing rebuild (Supplementary)', dir:1,str:2,ev:'B',h:2, refs:['hou-ditwah'], why:'Large rebuild volume if cash flows as planned.', risk:'Unspent funds were carried over once already.'}
  ],
  co:[{n:'Tokyo Cement',why:'Cement producer',conf:'med'},{n:'Sierra Cables',why:'Cables and wires',conf:'med'}]},
 {id:'m-bank', name:'Banks & finance companies',
  drivers:[
   {t:'Rs 174bn of subsidised MSME loans (Rs 67.7bn interest subsidy/refinance)', dir:1,str:3,ev:'A',h:1, refs:['fin-sub','fin-remsme','fin-adb','fin-paddy','fin-rural','fin-fish','fin-home','fin-women'], why:'Treasury-funded subsidies make lower-rate lending profitable and grow loan books; the 2026 allocation was fully used.', risk:'Concentration in subsidised SME credit raises credit-quality questions.'},
   {t:'Migrant-worker housing loans (up to Rs 5M)', dir:1,str:1,ev:'A',h:2, refs:['soc-mighome'], why:'New retail mortgage product with a Treasury/SLBFE subsidy.', risk:'Small scale (Rs 1bn).'},
   {t:'Rs 3.8tn gross borrowing — heavy government-securities supply', dir:1,str:1,ev:'B',h:1, refs:[], why:'Banks are large holders of government paper; yields stay attractive.', risk:'Crowds out private credit; mark-to-market risk if yields rise. (AAMA inference — not in the speech.)'},
   {t:'Microfinance regulator established in 2027; Finance Business Act tightened', dir:-1,str:2,ev:'A',h:1, refs:[], why:'Tougher conduct and winding-up rules for microfinance and finance companies.', risk:'Hits weaker lenders; may benefit well-capitalised ones.'},
   {t:'Rescue, Rehabilitation & Insolvency Act', dir:1,str:1,ev:'B',h:2, refs:[], why:'A path for stressed borrowers to restructure and repay may help recoveries.', risk:'Untested in practice.'}
  ],
  co:[{n:'Commercial Bank of Ceylon',why:'Large private bank',conf:'med'},{n:'Hatton National Bank',why:'Large private bank, SME book',conf:'med'},{n:'Sampath Bank',why:'SME-heavy private bank',conf:'med'},{n:'LOLC Holdings',why:'Finance & microfinance exposure — also affected by new regulator',conf:'low'},{n:'LB Finance',why:'Finance company',conf:'low'}]},
 {id:'m-tel', name:'Telecom, data centres & digital',
  drivers:[
   {t:'Tower grants: 75% of cost or Rs 35M + Rs 5M power; cellular-tower levy waived 5 years', dir:1,str:3,ev:'A',h:1, refs:['dig-tower'], why:'Rs 9bn from TRC funds de-risks rural coverage build-out for operators.', risk:'Quality-of-service monitoring becomes stricter.'},
   {t:'Electricity concessions for data-centre investors', dir:1,str:2,ev:'B',h:2, refs:['dig-dc'], why:'Cheaper power is the biggest cost for data centres; Mattala also being offered for data centres.', risk:'Incentives are “formal criteria” not yet published.'},
   {t:'Digital ID, presence-less services, GovPay & QR', dir:1,str:2,ev:'B',h:2, refs:['dig-moe','dig-gov'], why:'More digital transactions and public-sector cloud/AI spend.', risk:'Procurement is shifting to “buy before build” and shared platforms.'},
   {t:'Broadband vouchers for 750,000 students', dir:1,str:1,ev:'B',h:1, refs:['dig-bb'], why:'Demand for mobile/fixed data.', risk:'Small per-user value.'},
   {t:'Automated spectrum management: aims to stop “financial loss” on spectrum', dir:-1,str:1,ev:'C',h:3, refs:['dig-qos'], why:'Signals tighter spectrum charging.', risk:'Direction of fees not stated.'}
  ],
  co:[{n:'Dialog Axiata',why:'Largest mobile operator',conf:'med'},{n:'Sri Lanka Telecom',why:'Fixed, fibre & data-centre operator',conf:'med'}]},
 {id:'m-tou', name:'Tourism & hotels',
  drivers:[
   {t:'Tourism Development Levy abolished from Apr 2027', dir:1,str:2,ev:'A',h:1, refs:['tax-tdl'], why:'A turnover-based levy disappears; lowers hotel costs.', risk:'Small revenue (Rs 40M) — but the signal matters.'},
   {t:'200% capital allowance for tourism investments ≥ USD 3M', dir:1,str:2,ev:'A',h:2, refs:['tax-ecap'], why:'Brings forward hotel and resort development.', risk:'Hotels have 5 years to invest; benefits new projects most.'},
   {t:'Airport capacity 6M → 9M and Sigiriya domestic airport', dir:1,str:2,ev:'A',h:2, refs:['mar-t1','mar-sig','mar-dom'], why:'Removes a key arrivals bottleneck.', risk:'Terminal 2 is later.'},
   {t:'Destinations: Colombo Fort zone, Dutch forts, cruise terminals, marine tourism, Up-Country rail', dir:1,str:2,ev:'B',h:2, refs:['tou-fort','tou-forts','tou-cruise','tou-marine','trn-upc'], why:'New products and routes.', risk:'Several rely on PPP partners.'},
   {t:'Inflation 8.3% and high fuel prices from the Middle East conflict', dir:-1,str:2,ev:'A',h:1, refs:[], why:'Airfares and operating costs.', risk:'Speech names the conflict as a continuing risk.'}
  ],
  co:[{n:'John Keells Hotels',why:'Hotel owner-operator',conf:'med'},{n:'Aitken Spence Hotel Holdings',why:'Hotel owner-operator',conf:'med'},{n:'Dolphin Hotels',why:'Hotel owner',conf:'low'}]},
 {id:'m-nrg', name:'Power, solar & storage',
  drivers:[
   {t:'Storage build-out: 160 → 560 MW (2027) → 1,245 MW (2029)', dir:1,str:3,ev:'A',h:1, refs:['nrg-bess','nrg-bess30'], why:'Large contracted pipeline for storage developers and suppliers.', risk:'Competitive bids cut price 11% in a year — margin squeeze.'},
   {t:'Rooftop-solar battery subsidy (Rs 25,000/kW) + PAL removed on batteries', dir:1,str:2,ev:'A',h:1, refs:['nrg-batt'], why:'Rs 3.5bn subsidy and lower import duty lift installer and distributor volumes.', risk:'Subsidy cap Rs 250,000 per home.'},
   {t:'Wind +370 MW and 10 floating-solar sites (~500 MW)', dir:1,str:2,ev:'B',h:2, refs:['nrg-wind','nrg-float'], why:'New generation tenders from January 2027.', risk:'Tariff competition; grid-stability costs (Rs 26.5bn programme).'},
   {t:'Private investment in three transmission lines', dir:1,str:1,ev:'C',h:3, refs:['nrg-pvt-tx'], why:'Opens a new asset class.', risk:'No terms yet.'},
   {t:'Smart meters free for 300,000 homes (ADB grant)', dir:1,str:1,ev:'A',h:1, refs:['nrg-smart'], why:'Meter and metering-software demand.', risk:'Grant-funded, procurement likely international.'}
  ],
  co:[{n:'Vallibel Power Erathna',why:'Hydro IPP',conf:'low'},{n:'Resus Energy',why:'Renewable IPP',conf:'low'}]},
 {id:'m-log', name:'Fuel, shipping & logistics',
  drivers:[
   {t:'Bunker-fuel SSCL exemption; +50,000 MT Colombo bunkering (BOT); Galle & Trincomalee hubs', dir:1,str:3,ev:'A',h:2, refs:['tax-bunker','mar-bunk'], why:'Directly lowers cost and adds capacity for ship-fuel sales.', risk:'Private BOT partners not selected.'},
   {t:'Trincomalee tank-farm PPP (CPC–Lanka IOC JV): 29 of 61 tanks', dir:1,str:2,ev:'B',h:2, refs:['mar-trinco'], why:'Joint-venture partner Lanka IOC is listed.', risk:'RFP in 2027; terms unknown.'},
   {t:'Colombo logistics centre (PPP), West Terminal II, North Port study', dir:1,str:2,ev:'B',h:2, refs:['mar-logc','mar-ws2','mar-north'], why:'Port capacity and re-export services.', risk:'Several steps still at feasibility.'},
   {t:'National Single Window & paperless Customs; FTAs (India, China, RCEP, UAE, Oman)', dir:1,str:2,ev:'B',h:2, refs:['ind-nsw'], why:'Cuts clearance time and widens export markets for freight forwarders.', risk:'FTAs are early-stage.'},
   {t:'Fuel-storage up to 45 days; Jet A1 pipeline; refinery doubling (PPP)', dir:1,str:1,ev:'B',h:3, refs:['nrg-tanks','nrg-jet','nrg-refine'], why:'Supply security and fuel-distribution volume.', risk:'State-led; limited listed exposure.'}
  ],
  co:[{n:'Expolanka Holdings',why:'Freight forwarding & logistics',conf:'med'},{n:'Lanka IOC',why:'JV partner in Trincomalee tanks; fuel distribution',conf:'med'},{n:'John Keells Holdings',why:'Port terminal & diversified',conf:'low'},{n:'Aitken Spence',why:'Marine & logistics services',conf:'low'}]},
 {id:'m-cons', name:'Consumer & food manufacturing',
  drivers:[
   {t:'Personal-tax relief: Rs 750–15,750 a month for each taxpayer', dir:1,str:2,ev:'A',h:1, refs:['tax-pit'], why:'Higher take-home pay for salaried households from Apr 2027 (Rs 16bn a year).', risk:'Small versus 8.3% inflation.'},
   {t:'Special Commodity Levy cut on sprats, Maldive fish, dried chillies', dir:1,str:1,ev:'A',h:1, refs:['tax-scl-down'], why:'Lower import cost for staple foods.', risk:'Narrow product list.'},
   {t:'Sugar levy +Rs 10/kg', dir:-1,str:2,ev:'A',h:1, refs:['tax-sugar'], why:'Raises input costs for beverage, confectionery and biscuit makers; helps domestic sugar producers.', risk:'Net effect depends on how much is passed on.'},
   {t:'CESS −25% on 800 tariff lines', dir:1,str:1,ev:'B',h:1, refs:['tax-cess'], why:'Cheaper imported inputs for some manufacturers.', risk:'Line list not yet checked.'},
   {t:'Inflation 8.3% (Oct 2026) and El Niño on food prices', dir:-1,str:2,ev:'A',h:1, refs:['agr-elnino'], why:'Squeezes real incomes and input costs.', risk:'Speech flags El Niño as a risk to agriculture and food prices.'}
  ],
  co:[{n:'Cargills (Ceylon)',why:'Food retail and manufacturing',conf:'low'},{n:'Ceylon Cold Stores',why:'Beverages — sugar-intensive',conf:'low'},{n:'Pelwatte Sugar Industries',why:'Domestic sugar producer',conf:'low'}]},
 {id:'m-plt', name:'Plantations',
  drivers:[
   {t:'Fertiliser subsidies (Rs 4,000/bag) target small-scale holders', dir:1,str:1,ev:'A',h:1, refs:['plt-tfert','plt-rfert'], why:'Boosts smallholder yields and green-leaf supply to factories.', risk:'Benefit goes to smallholders, not the big estate companies directly.'},
   {t:'Export target USD 3bn → 5bn by 2030; 500 tea villages; coconut & rubber rehab', dir:1,str:2,ev:'B',h:3, refs:['plt-env','plt-tea500','plt-coco'], why:'Policy push on yield and value-addition.', risk:'Long-dated.'},
   {t:'Review of Regional Plantation Company leases (expire 2045)', dir:-1,str:2,ev:'C',h:3, refs:['plt-lease'], why:'Uncertainty over tenure for estate-owning listed companies.', risk:'Committee has no timetable.'},
   {t:'El Niño dry spell risk for tea and rubber output', dir:-1,str:1,ev:'B',h:1, refs:['agr-elnino'], why:'Weather risk to 2027 crop.', risk:'Magnitude unknown.'}
  ],
  co:[{n:'Kelani Valley Plantations',why:'Regional plantation company',conf:'low'},{n:'Watawala Plantations',why:'Regional plantation company',conf:'low'},{n:'Talawakelle Tea Estates',why:'Regional plantation company',conf:'low'}]},
 {id:'m-prt', name:'Printing, publishing & media',
  drivers:[
   {t:'VAT removed on books and exercise books', dir:1,str:2,ev:'A',h:1, refs:['tax-books'], why:'Lower shelf prices should lift volumes for printers, publishers and stationers.', risk:'Revenue cost Rs 3bn; input VAT recovery rules matter.'},
   {t:'PAL (10%) removed on newsprint from 1 Jan 2027', dir:1,str:2,ev:'A',h:1, refs:['tax-pal'], why:'Direct cost saving for newspapers.', risk:'Small segment.'},
   {t:'State broadcasters funded: Rupavahini, ITN, SLBC', dir:-1,str:1,ev:'B',h:1, refs:['cul-media'], why:'Competition for audiences and ad budgets from upgraded state media.', risk:'AAMA inference.'},
   {t:'Digital-service income sourced by place of payment (online ads, cloud)', dir:0,str:1,ev:'C',h:2, refs:['tax-admin'], why:'Clarifies tax treatment of cross-border advertising and cloud fees; effect on local ad-tech is unclear.', risk:'Wait for the amendment text.'}
  ],
  co:[{n:'Printcare',why:'Printing & packaging',conf:'low'}]},
 {id:'m-prop', name:'Property developers & real estate',
  drivers:[
   {t:'Urban and Ditwah housing programmes; 10,000-apartment enabler', dir:1,str:2,ev:'B',h:2, refs:['hou-urban','hou-apt','hou-ditwah'], why:'Public demand and financing support, with private partners invited.', risk:'Government middle-income projects (Maligawatta, Yakkala) compete for buyers.'},
   {t:'Colombo Fort restoration, Port City amendments, Beira Lake plan', dir:1,str:2,ev:'B',h:2, refs:['tou-fort','urb-beira','mar-logc'], why:'Raises amenity and demand around prime Colombo sites.', risk:'Port City Bill still with the Attorney General.'},
   {t:'No land or property tax change', dir:0,str:1,ev:'A',h:1, refs:[], why:'Tax treatment is unchanged.', risk:'Speech is silent on land.'}
  ],
  co:[{n:'Overseas Realty (Ceylon)',why:'Colombo prime commercial property',conf:'low'},{n:'Colombo Land & Development',why:'Colombo property developer',conf:'low'}]},
 {id:'m-cap', name:'Brokers, insurers & capital markets',
  drivers:[
   {t:'“A Share for Everyone” and SME-listing support (CSE Rs 250M + Treasury Rs 500M)', dir:1,str:2,ev:'A',h:1, refs:['fin-cse'], why:'Only ~0.7% of adults trade; the programme aims to widen the retail base and new listings.', risk:'Rs 10,000 portfolios are small; benefit is mainly breadth.'},
   {t:'Capital gains tax widened to crypto, licences and valuables; VASP framework', dir:-1,str:1,ev:'A',h:1, refs:['tax-cgt'], why:'Alternative-asset holders face tax; regulated virtual-asset market may follow.', risk:'Thresholds not yet set.'},
   {t:'No change announced to corporate income tax, dividend or share-transaction taxes', dir:0,str:1,ev:'A',h:1, refs:[], why:'Earnings and dividend taxation are unchanged.', risk:'Speech and technical notes are silent on them.'}
  ],
  co:[{n:'First Capital Holdings',why:'Securities & treasury',conf:'low'}]},
 {id:'m-health', name:'Healthcare & pharma distribution',
  drivers:[
   {t:'Rs 20.5bn for MRI/CT/cath-lab equipment in 2027; Rs 131bn health capex', dir:1,str:2,ev:'A',h:1, refs:['hlt-equip','hlt-env'], why:'Public tenders for high-end equipment benefit distributors and service providers.', risk:'Procurement is mostly international tenders.'},
   {t:'Ambulances, wellness centres, organ-transplant & robotic-surgery centres', dir:1,str:1,ev:'B',h:2, refs:['hlt-amb','hlt-arogya','hlt-organ','hlt-robot'], why:'Public capacity growth is mostly primary care; limited private-listed read-through.', risk:'May draw patients from private hospitals.'}
  ],
  co:[{n:'Asiri Hospital Holdings',why:'Private hospitals',conf:'low'},{n:'Ceylon Hospitals (Durdans)',why:'Private hospitals',conf:'low'}]}
];

/* Market-wide drivers affecting all sectors */
B27.MKT_MACRO = [
 {t:'Fiscal stance loosens', d:'Primary surplus falls from 5.4% of GDP (2025) to 2.3% (2027, with supplementary) and the deficit widens to 4.5%. Supports demand; also adds inflation and borrowing pressure.', dir:'mixed', kind:'analysis'},
 {t:'Heavy borrowing', d:'Rs 3.8tn of gross borrowing, incl. Rs 1,643bn net domestic financing — a big supply of government securities that competes with equities for savings.', dir:'–', kind:'analysis'},
 {t:'IMF programme ends March 2027', d:'The speech says a follow-on programme is under study. Uncertainty over what replaces it is a key macro swing factor.', dir:'?', kind:'fact'},
 {t:'Inflation is back', d:'8.3% in October 2026 vs 2.1% in December 2025. Middle-East conflict, Hormuz disruption and El Niño are named risks.', dir:'–', kind:'fact'},
 {t:'Ratings & reserves improving', d:'Fitch B-, reserves over USD 7bn, record remittances, upper-middle-income status restored.', dir:'+', kind:'fact'},
 {t:'Revenue below own floor', d:'Revenue is 15.8% of GDP in 2027, below the stated 16% medium-term minimum, and tax cuts cost Rs 21bn in 2027.', dir:'–', kind:'analysis'}
];
