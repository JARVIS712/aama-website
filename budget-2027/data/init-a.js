/* Initiatives — part A: transport, ports/aviation, energy, water, digital, education, research, industry, finance.
   Keys: id · t title · s sector · a 2027 allocation (Rs M) · tc total project cost (Rs M) · add new money (Rs M)
         lv loan volume enabled (Rs M) · st status · f funding · fd funder detail · o implementing org
         p places ('*'=national, 'P:xx'=province, else district names) · loc place as worded in speech
         y [start,end] · g groups affected · ref speech section · ax2/ax7 annexure serial · in id of parent whose amount includes this
         m milestone / key fact · d derived amount (USD converted) */
window.B27 = window.B27 || {};
B27.INIT = (B27.INIT || []).concat([

/* ───────── §4–5 Foundations: trade, customs, investment ───────── */
{id:'ind-nsw',   t:'National Single Window for Trade',                         s:'ind',a:1990, st:'ongoing',f:'tre',o:'Sri Lanka Customs',p:'*',y:[2026,2027],g:'exporters,sme',ref:'§4',m:'Pilot live since 5 Nov 2026; exporters in H1 2027, importers & re-exports in H2 2027'},
{id:'ind-nswi',  t:'National Single Window for Investment',                    s:'ind',a:100,  st:'new',f:'tre',o:'BOI / Treasury',p:'*',y:[2027,2027],g:'investors',ref:'§4',m:'Consultancy bids under evaluation'},
{id:'ind-scan',  t:'Body scanners & container scanners for Customs',           s:'ind',a:1000, st:'new',f:'tre',o:'Sri Lanka Customs',p:'*',y:[2027,2027],g:'importers,exporters',ref:'§4',ax2:61},
{id:'ind-eu',    t:'EU–Sri Lanka Sustainable Trade & Economic Integration Project',s:'ind',tc:3430,st:'new',f:'dev',fd:'EU grant',o:'Ministry of Trade',p:'*',y:[2027,2030],g:'exporters,sme',ref:'§5',m:'Export competitiveness, diversification, sustainable production'},

/* ───────── §6 Energy ───────── */
{id:'nrg-grid',  t:'Grid stability programme (synchronous condensers, STATCOM, wide-area monitoring)',s:'nrg',tc:26500,st:'new',f:'dev',fd:'World Bank',o:'CEB / Ministry of Energy',p:'Anuradhapura,Mannar,Colombo',loc:'Habarana, Mannar, Padukka',y:[2027,2029],g:'households,sme',ref:'§6.1',m:'2×75 MVA synchronous condensers + 300 MVAr STATCOM; follows Feb 2025 & Oct 2026 blackouts'},
{id:'nrg-bess',  t:'Battery energy storage (BESS) rollout',                    s:'nrg',st:'ongoing',f:'ppp',o:'CEB / private developers',p:'*',y:[2026,2029],g:'households',ref:'§6.1',m:'160 MW (2026) → 560 MW (2027) → 1,245 MW (2029). Bid price fell 11%: Rs 2.033M → Rs 1.808M per MW per month'},
{id:'nrg-bess30',t:'30 MW BESS backup for Norochcholai (Lakvijaya) plant',     s:'nrg',st:'new',f:'ppp',o:'CEB',p:'Puttalam',y:[2027,2028],g:'households',ref:'§6.1'},
{id:'nrg-batt',  t:'Rooftop-solar battery subsidy (Net Plus): Rs 25,000 per kW, max Rs 250,000',s:'nrg',a:3500,add:3500,st:'new',f:'tre',o:'Ministry of Energy',p:'*',y:[2027,2027],g:'households',ref:'§6.1',ax2:69,m:'Up to 10 kW; PAL also removed on storage batteries from 1 Jan 2027'},
{id:'nrg-north', t:'400 kV Northern transmission line: Kilinochchi – New Habarana',s:'nrg',a:500,st:'new',f:'dev',fd:'AIIB (USD 150M sought)',o:'CEB / Ceylon Electricity Board',p:'Kilinochchi,Anuradhapura',y:[2027,2030],g:'households,investors',ref:'§6.1',m:'Rs 500M for preliminary work; target completion 2030'},
{id:'nrg-pvt-tx',t:'Private investment in 3 transmission lines (Norochcholai–Wariyapola, Moneragala–Hambantota, New Habarana–Kirindiwela)',s:'nrg',st:'new',f:'ppp',o:'CEB',p:'Puttalam,Kurunegala,Monaragala,Hambantota,Anuradhapura,Gampaha',y:[2027,2030],g:'investors',ref:'§6.1'},
{id:'nrg-smart', t:'Free smart meters: 300,000 households using >180 units (all >120 units in LECO areas)',s:'nrg',tc:3607,d:1,st:'new',f:'dev',fd:'ADB grant USD 12M',o:'CEB / LECO',p:'*',y:[2027,2027],g:'households',ref:'§6.1'},
{id:'nrg-wind',  t:'Wind power: +370 MW by 2029 (50 MW in 2027) → 674 MW installed',s:'nrg',st:'ongoing',f:'ppp',o:'CEB',p:'*',y:[2027,2029],g:'investors',ref:'§6.1'},
{id:'nrg-float', t:'Floating solar on 10 reservoirs (~500 MW)',                s:'nrg',st:'new',f:'ppp',o:'Government & private sector',p:'*',y:[2027,2030],g:'investors',ref:'§6.1',m:'Private proposals invited January 2027; uses ≤10% of each water surface'},
{id:'nrg-dcc',   t:'Four Electricity Distribution Control Centres (Kuliyapitiya, Peradeniya, Battaramulla, Dehiwala)',s:'nrg',a:5130,st:'new',f:'tre',o:'CEB / LECO',p:'Kurunegala,Kandy,Colombo',y:[2027,2029],g:'households',ref:'§6.1',ax7:84},
{id:'nrg-lic',   t:'Mannar Basin oil & gas licensing round 2026 (4 blocks)',   s:'nrg',st:'ongoing',f:'ppp',o:'Petroleum Development Authority',p:'Mannar',y:[2027,2027],g:'investors',ref:'§6.2',m:'Bids open 2 Feb 2027'},
{id:'nrg-tanks', t:'Fuel storage expansion: Kolonnawa & Muthurajawela tanks (+126,000 m³, 45 days of cover)',s:'nrg',tc:8978,st:'ongoing',f:'soe',o:'Ceylon Petroleum Corporation',p:'Colombo,Gampaha',y:[2025,2027],g:'households',ref:'§6.2',m:'Rs 3,746M + 1,446M + 3,786M'},
{id:'nrg-pipe',  t:'Kolonnawa–Port fuel pipeline (unloading time 96h → 48h)',  s:'nrg',tc:16332,st:'new',f:'soe',o:'Ceylon Petroleum Corporation',p:'Colombo',y:[2027,2028],g:'importers',ref:'§6.2',m:'Bids called; 18 months to complete'},
{id:'nrg-jet',   t:'Jet A1 tank complex (92,000 m³) & pipeline to Katunayake airport',s:'nrg',tc:22340,st:'ongoing',f:'soe',o:'Ceylon Petroleum Corporation',p:'Gampaha',y:[2026,2028],g:'investors',ref:'§6.2'},
{id:'nrg-refine',t:'Sapugaskanda refinery upgrade 50,000 → 100,000 barrels/day (PPP)',s:'nrg',st:'reform',f:'ppp',o:'CPC',p:'Gampaha',y:[2027,2030],g:'investors',ref:'§6.2',m:'RFPs in 2027 after EOI'},

/* ───────── §7 Digital ───────── */
{id:'dig-moe',   t:'Ministry of Digital Economy programme (6 pillars; AI Centre of Excellence, LGC 3.0, GovPay, startup fund of funds…)',s:'dig',a:28500,add:10000,st:'topup',f:'tre',o:'Ministry of Digital Economy',p:'*',y:[2027,2029],g:'sme,investors',ref:'§7',ax2:59,m:'Rs 18,500M already allocated + Rs 10,000M new'},
{id:'dig-bb',    t:'Broadband vouchers for 750,000 school students',           s:'dig',st:'new',f:'tre',o:'Ministry of Digital Economy',p:'*',y:[2027,2027],g:'students',ref:'§7',in:'dig-moe'},
{id:'dig-dc',    t:'Electricity tariff concessions & incentives for data centres',s:'dig',st:'new',f:'tre',o:'Ministry of Energy / BOI',p:'*',y:[2027,2029],g:'investors',ref:'§7',in:'dig-moe'},
{id:'dig-tower', t:'Gamata Sannivedanaya — rural telecom towers (573 by 2028; 700–800 by 2030)',s:'dig',a:9000,st:'ongoing',f:'soe',fd:'TRC funds',o:'Telecommunications Regulatory Commission',p:'*',y:[2027,2030],g:'households,sme',ref:'§7',m:'Grant: 75% of tower cost or Rs 35M (lower) + Rs 5M for power connection; cellular tower levy waived 5 years'},
{id:'dig-qos',   t:'Automated QoS monitoring & spectrum management systems',   s:'dig',a:3100,st:'new',f:'soe',fd:'TRC funds',o:'Telecommunications Regulatory Commission',p:'*',y:[2027,2028],g:'households',ref:'§7'},
{id:'dig-gov',   t:'Digital Government Transformation (capital)',              s:'dig',a:9490,st:'new',f:'tre',o:'GovTech / Ministry of Digital Economy',p:'*',y:[2027,2029],g:'households,sme',ref:'Annex VII',ax7:76,in:'dig-moe'},
{id:'dig-pub',   t:'Digital modernisation of public services (new computers etc.)',s:'dig',a:6700,add:2200,st:'topup',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2027],g:'servants',ref:'§34',ax2:60,m:'Rs 4,500M allocated + Rs 2,200M additional'},

/* ───────── §8 Education ───────── */
{id:'edu-env',   t:'Digitalisation, teacher capacity & school/college infrastructure (umbrella)',s:'edu',um:1,a:35000,st:'topup',f:'tre',o:'Ministry of Education',p:'*',y:[2027,2031],g:'students,teachers',ref:'§8.1',m:'Includes Rs 7,000M for the Rs 96,500M five-year digital-learning programme'},
{id:'edu-dig',   t:'5-year digital-learning programme (smart boards, IT centres, NEMIS, inclusive tools)',s:'edu',a:7000,tc:96500,add:3000,st:'topup',f:'tre',o:'Ministry of Education',p:'*',y:[2027,2031],g:'students,teachers',ref:'§8.1',ax2:1,ax7:2,m:'Rs 4,000M this year + Rs 3,000M additional'},
{id:'edu-net',   t:'Internet for the last 750 secondary schools (6,225 already connected) — then primary schools',s:'edu',st:'ongoing',f:'tre',o:'Ministry of Education / TRC',p:'*',y:[2027,2028],g:'students',ref:'§8.1'},
{id:'edu-trainee',t:'Teacher-trainee allowance Rs 10,500 → Rs 20,000/month (from Apr 2027)',s:'edu',a:1800,add:1800,st:'new',f:'tre',o:'Ministry of Education',p:'*',y:[2027,2027],g:'teachers,students',ref:'§8',ax2:4},
{id:'edu-piri',  t:'Pirivena student allowance: monks Rs 15 → 50/day, lay Rs 5 → 25/day (Apr 2027)',s:'edu',a:600,add:600,st:'new',f:'tre',o:'Ministry of Education',p:'*',y:[2027,2027],g:'students',ref:'§8',ax2:6},
{id:'edu-dhamma',t:'Dhamma-school teacher annual allowance Rs 7,500 → 12,500',s:'edu',a:600,add:600,st:'new',f:'tre',o:'Ministry of Buddhasasana',p:'*',y:[2027,2027],g:'teachers',ref:'§8',ax2:7},
{id:'edu-unif',  t:'School uniform materials donated by China continue',       s:'edu',st:'ongoing',f:'dev',fd:'China donation',o:'Ministry of Education',p:'*',y:[2027,2027],g:'students',ref:'§8'},
{id:'edu-reform',t:'Education reforms extend to Grades 2 and 6',               s:'edu',st:'reform',f:'tre',o:'Ministry of Education / NIE',p:'*',y:[2027,2027],g:'students,teachers',ref:'§8'},
{id:'edu-pcdig', t:'Digital transformation of Provincial Council schools',     s:'edu',a:3000,add:3000,st:'new',f:'tre',o:'Provincial Councils',p:'*',y:[2027,2027],g:'students',ref:'Annex II',ax2:1,in:'edu-dig'},
{id:'edu-med',   t:'Faculties of Medicine & clinical buildings — Peradeniya and Wayamba',s:'edu',a:450,tc:8000,st:'ongoing',f:'tre',o:'UGC / Universities',p:'Kandy,Kurunegala',y:[2027,2030],g:'students,health',ref:'§8.2'},
{id:'edu-uni',   t:'University facilities: labs, faculty buildings (Eastern, Ruhuna, Sabaragamuwa, Jaffna, Kelaniya, Rajarata, Uva Wellassa, Colombo)',s:'edu',a:2250,st:'ongoing',f:'tre',o:'UGC / Universities',p:'Batticaloa,Matara,Ratnapura,Jaffna,Gampaha,Anuradhapura,Badulla,Colombo',y:[2027,2028],g:'students',ref:'§8.2'},
{id:'edu-welf',  t:'University student welfare (hostels, water, sanitation)',  s:'edu',a:6250,st:'ongoing',f:'tre',o:'UGC / Universities',p:'*',y:[2027,2027],g:'students',ref:'§8.2'},
{id:'edu-vav',   t:'Official quarters project, University of Vavuniya',        s:'edu',tc:2050,st:'new',f:'tre',o:'University of Vavuniya',p:'Vavuniya',y:[2027,2029],g:'teachers',ref:'§8.2'},
{id:'edu-pdn',   t:'Peradeniya University Ditwah restoration (est. Rs 6,150M; Rs 700M for 2027 incl. other institutions)',s:'edu',a:700,tc:6150,st:'ongoing',f:'sup',o:'UGC',p:'Kandy',y:[2027,2028],g:'students',ref:'§8.2'},
{id:'edu-loan',  t:'Interest-free private-degree loans: monthly subsistence Rs 6,250 → 10,000 (Apr 2027)',s:'edu',st:'topup',f:'tre',o:'State banks / Ministry of Higher Education',p:'*',y:[2027,2027],g:'students',ref:'§8.2',m:'~42,000 enter state universities each year; many qualified students are left out'},
{id:'edu-vocstudy',t:'Study to centralise vocational education regulation (550+ centres)',s:'edu',a:50,st:'new',f:'tre',o:'Ministry of Education',p:'*',y:[2027,2027],g:'students',ref:'§8.3'},
{id:'edu-uvt',   t:'University of Vocational Technology (Ratmalana) hostels, labs, workshops',s:'edu',a:800,tc:3380,st:'ongoing',f:'tre',o:'UNIVOTEC',p:'Colombo',y:[2027,2029],g:'students',ref:'§8.3',ax7:6},
{id:'edu-tvet',  t:'Infrastructure for German Technical Training Institute & Automobile Engineering Training Institute',s:'edu',a:200,st:'ongoing',f:'tre',o:'Dept of Technical Education',p:'*',y:[2027,2027],g:'students',ref:'§8.3'},
{id:'edu-tech',  t:'Modernise 25 Technical Colleges (one per district) into centres of excellence',s:'edu',a:1500,tc:6000,st:'new',f:'tre',o:'Dept of Technical Education',p:'*',y:[2027,2029],g:'students',ref:'§8.3',ax7:7,m:'Rs 11bn capital planned for the whole vocational sector'},
{id:'edu-hotel', t:'Hotel schools — Polonnaruwa (Indian-assisted) and Pinnawala',s:'edu',a:500,add:500,st:'new',f:'tre',o:'SLITHM',p:'Polonnaruwa,Kegalle',y:[2027,2028],g:'students,tourism',ref:'§23',ax2:2},
{id:'edu-spec',  t:'Free spectacles for school children',                      s:'edu',a:100,add:100,st:'new',f:'tre',o:'Ministry of Health',p:'*',y:[2027,2027],g:'students',ref:'§22',ax2:3},
{id:'rnd-prog',  t:'Research & development programmes (National Council for R&D)',s:'rnd',a:23800,st:'topup',f:'tre',o:'Ministry of Science & Technology',p:'*',y:[2027,2029],g:'students,sme',ref:'§9',m:'Incl. Rs 7,600M for coordinating research; National R&D Bill in H1 2027'},

/* ───────── §10 Roads & expressways ───────── */
{id:'rds-kg',    t:'Kurunegala–Galewela expressway (Central Expressway Phase 4, step 1)',s:'rds',a:30000,add:30000,st:'new',f:'tre',o:'Road Development Authority',p:'Kurunegala,Matale',y:[2027,2031],g:'commuters,tourism',ref:'§10',ax2:14,m:'First step toward Dambulla'},
{id:'rds-rw',    t:'Ruwanpura Expressway Phase 1: Kahathuduwa–Ingiriya',       s:'rds',a:27000,add:27000,st:'new',f:'tre',o:'Road Development Authority',p:'Colombo,Kalutara',y:[2026,2030],g:'commuters',ref:'§10',ax2:15,m:'Rs 18,680M in 2026 for initial works'},
{id:'rds-km',    t:'Central Expressway: Kadawatha–Mirigama section',           s:'rds',a:53450,st:'ongoing',f:'tre',o:'Road Development Authority',p:'Gampaha',y:[2027,2028],g:'commuters',ref:'§10',m:'Target: September 2028'},
{id:'rds-pr',    t:'Central Expressway: Pothuhera–Rambukkana section',         s:'rds',a:4500,st:'ongoing',f:'tre',o:'Road Development Authority',p:'Kurunegala,Kegalle',y:[2027,2027],g:'commuters',ref:'§10',m:'Target: May 2027'},
{id:'rds-rg',    t:'Central Expressway: Rambukkana–Galagedara section',        s:'rds',a:23050,st:'ongoing',f:'tre',o:'Road Development Authority',p:'Kegalle,Kandy',y:[2026,2029],g:'commuters,tourism',ref:'§10',m:'Target: July 2029'},
{id:'rds-link',  t:'Link roads to the Central Expressway',                     s:'rds',a:8500,add:8500,st:'new',f:'tre',o:'Road Development Authority',p:'Kurunegala,Matale,Kegalle,Kandy,Gampaha',y:[2027,2029],g:'commuters',ref:'§10',ax2:16,m:'Rs 500M Kurunegala–Dambulla · Rs 5,000M Pothuhera–Galagedara · Rs 3,000M Kadawatha–Mirigama'},
{id:'rds-fly',   t:'Flyovers: Alawwa, Kurunegala–Muttettugala, Kandy Post Office',s:'rds',a:1900,st:'new',f:'tre',o:'Road Development Authority',p:'Kurunegala,Kandy',y:[2027,2028],g:'commuters',ref:'§10',ax7:20,m:'Kandy flyover gives access to the new Multimodal Hub'},
{id:'rds-br',    t:'Five bridges: Kokkilai, Kiran, Ponduhalchenai, Verugal (Punnaiyadi), Vadduvakkal',s:'rds',a:2040,tc:10630,st:'new',f:'tre',o:'Road Development Authority',p:'P:N,P:E',loc:'Northern & Eastern coastal belt',y:[2027,2029],g:'commuters,fishers',ref:'§10'},
{id:'rds-wide',  t:'Widening & development of selected congested roads',       s:'rds',a:22000,st:'new',f:'tre',o:'Road Development Authority',p:'*',y:[2027,2028],g:'commuters',ref:'§10',ax7:21},
{id:'rds-feas',  t:'Feasibility studies: Ratnapura, Kahawatta & Kiribathgoda bypasses; Katunayake–Chilaw Expressway',s:'rds',a:680,st:'new',f:'tre',o:'Road Development Authority',p:'Ratnapura,Gampaha,Puttalam',y:[2027,2027],g:'commuters',ref:'§10'},
{id:'rds-a8',    t:'Panadura–Ratnapura road (A008) improvement, Ingiriya–Ratnapura',s:'rds',a:2800,st:'new',f:'tre',o:'Road Development Authority',p:'Kalutara,Ratnapura',y:[2027,2029],g:'commuters',ref:'Annex VII',ax7:15},
{id:'rds-rural', t:'Rural roads & bridges (Rs 55bn roads + Rs 5.5bn bridges + Rs 20bn Provincial Council roads)',s:'rds',a:80500,st:'topup',f:'tre',o:'Rural Roads / Provincial Councils',p:'*',y:[2027,2027],g:'households,farmers',ref:'§34',m:'~Rs 100bn including the District Development Programme share'},

/* ───────── §11, §25 Rail & public transport ───────── */
{id:'trn-kv',    t:'Rail electrification — Kelani Valley line, Maradana–Homagama',s:'trn',a:45000,add:45000,st:'new',f:'tre',o:'Sri Lanka Railways',p:'Colombo',y:[2027,2031],g:'commuters',ref:'§11',ax2:13,m:'Phase 1 of a >Rs 1,200bn programme to electrify three main lines'},
{id:'trn-main',  t:'Rail electrification — Main line, Maradana–Ragama',        s:'trn',a:16400,st:'new',f:'tre',o:'Sri Lanka Railways',p:'Colombo,Gampaha',y:[2027,2031],g:'commuters',ref:'§11',ax2:13},
{id:'trn-coast', t:'Rail electrification — Coastal line, Maradana–Panadura',   s:'trn',a:17700,st:'new',f:'tre',o:'Sri Lanka Railways',p:'Colombo,Kalutara',y:[2027,2031],g:'commuters',ref:'§11',ax2:13},
{id:'trn-rail-o',t:'Rail electrification — land acquisition & other costs',    s:'trn',a:900,st:'new',f:'tre',o:'Sri Lanka Railways',p:'Colombo,Gampaha,Kalutara',y:[2027,2031],g:'commuters',ref:'§11',ax2:13},
{id:'trn-ebus',  t:'Metro EV bus programme: depots, charging, training (100 e-buses donated by China)',s:'trn',a:4500,st:'new',f:'tre',o:'Ministry of Transport',p:'*',y:[2027,2028],g:'commuters',ref:'§25',ax7:10,m:'+50 Metro Buses in 2027 (120+ running); expanding to Kandy, Galle, Jaffna'},
{id:'trn-ac',    t:'600 air-conditioned long-distance buses (import in progress)',s:'trn',st:'ongoing',f:'tre',o:'Sri Lanka Transport Board',p:'*',y:[2027,2027],g:'commuters',ref:'§25'},
{id:'trn-small', t:'250 small buses for rural & hill-country roads (50×22-seat, 200×33-seat)',s:'trn',a:5000,add:5000,st:'new',f:'tre',o:'Sri Lanka Transport Board',p:'*',y:[2027,2028],g:'commuters,households',ref:'§25',ax2:17},
{id:'trn-sltb',  t:'SLTB digital transformation & integrated management',      s:'trn',a:200,st:'new',f:'tre',o:'Sri Lanka Transport Board',p:'*',y:[2027,2027],g:'commuters',ref:'§25'},
{id:'trn-dmt',   t:'Department of Motor Traffic relocation to Werahera',       s:'trn',a:600,add:600,st:'new',f:'tre',o:'Dept of Motor Traffic',p:'Colombo',y:[2027,2028],g:'households',ref:'§25',ax2:18},
{id:'trn-reg',   t:'Digital vehicle registration & ownership-transfer system',  s:'trn',a:700,st:'new',f:'tre',o:'Dept of Motor Traffic',p:'*',y:[2027,2027],g:'households',ref:'§25',ax7:14},
{id:'trn-demerit',t:'Digital driver demerit-point & road-safety enforcement platform',s:'trn',a:1500,st:'new',f:'tre',o:'DMT / Sri Lanka Police',p:'*',y:[2027,2028],g:'commuters',ref:'§25',ax7:12},
{id:'trn-trains',t:'Five new trains',                                          s:'trn',a:5000,st:'new',f:'tre',o:'Sri Lanka Railways',p:'*',y:[2027,2029],g:'commuters',ref:'§25'},
{id:'trn-stn',   t:'Railway-station repair, modernisation & standardisation',  s:'trn',a:2000,st:'new',f:'tre',o:'Sri Lanka Railways',p:'*',y:[2027,2028],g:'commuters,tourism',ref:'§25',ax7:13},
{id:'trn-upc',   t:'Up-Country & Matale line rehabilitation (Indian loan): Kandy by Q1 2027, Badulla by mid-2027',s:'trn',st:'ongoing',f:'dev',fd:'India loan',o:'Sri Lanka Railways',p:'Kegalle,Kandy,Matale,Nuwara Eliya,Badulla',y:[2026,2027],g:'commuters,tourism',ref:'§25',m:'Colombo–Peradeniya already restored'},
{id:'trn-brdg',  t:'Ditwah bridge rehabilitation: 13 bridges (India) & 14 bridges (China grant)',s:'trn',st:'ongoing',f:'dev',fd:'India & China',o:'RDA',p:'Gampaha,Kegalle,Ampara,Kurunegala,Polonnaruwa,Batticaloa',y:[2026,2028],g:'commuters,displaced',ref:'§25'},

/* ───────── §13–14 Ports, aviation ───────── */
{id:'mar-ws2',   t:'Colombo West Terminal II — 3.2 km breakwater, capacity for 3.2M containers',s:'mar',st:'ongoing',f:'dev',fd:'ADB & World Bank',o:'Sri Lanka Ports Authority',p:'Colombo',y:[2027,2032],g:'exporters,importers',ref:'§13',m:'Goal: >30M TEU by 2040'},
{id:'mar-north', t:'Colombo North Port — feasibility & Kelani estuary study',  s:'mar',a:300,st:'ongoing',f:'soe',fd:'SLPA funds',o:'Sri Lanka Ports Authority',p:'Colombo,Gampaha',y:[2027,2027],g:'exporters',ref:'§13',m:'Feasibility due H1 2027'},
{id:'mar-logc',  t:'Logistics Centre at Colombo Port (PPP)',                   s:'mar',st:'reform',f:'ppp',o:'SLPA',p:'Colombo',y:[2027,2029],g:'exporters,investors',ref:'§13',m:'RFPs within two months'},
{id:'mar-vtms',  t:'Vessel Traffic Management System upgrade (Japan-assisted)',s:'mar',a:575,tc:3578,st:'new',f:'dev',fd:'Government of Japan',o:'SLPA',p:'Colombo',y:[2027,2029],g:'exporters',ref:'§13',ax7:23},
{id:'mar-bunk',  t:'Bunkering expansion: +50,000 MT in Colombo (BOT), Galle, Trincomalee tank farm & pipeline',s:'mar',tc:7375,st:'new',f:'mix',o:'Ceylon Petroleum Corporation',p:'Colombo,Galle,Trincomalee',y:[2027,2030],g:'investors,exporters',ref:'§13',m:'Rs 7,375M for the Trincomalee tank-farm-to-port pipeline'},
{id:'mar-trinco',t:'Trincomalee: PPP to develop 29 of 61 tanks (Trinco Petroleum Terminal)',s:'mar',st:'reform',f:'ppp',o:'CPC & Lanka IOC JV',p:'Trincomalee',y:[2027,2032],g:'investors',ref:'§13',m:'RFP in 2027'},
{id:'mar-t1',    t:'Katunayake airport Terminal 1 capacity 6M → 9M passengers',s:'mar',tc:15000,st:'ongoing',f:'soe',o:'Airport & Aviation Services (AASL)',p:'Gampaha',y:[2026,2028],g:'tourism',ref:'§14.1',m:'16M capacity forecast to be needed by 2032'},
{id:'mar-t2',    t:'Katunayake airport second terminal (JICA)',                s:'mar',st:'ongoing',f:'dev',fd:'JICA',o:'AASL',p:'Gampaha',y:[2027,2032],g:'tourism',ref:'§14.1',m:'Construction "very soon"'},
{id:'mar-dom',   t:'Domestic air terminal inside Katunayake airport',           s:'mar',tc:800,st:'new',f:'soe',o:'AASL',p:'Gampaha',y:[2027,2028],g:'tourism',ref:'§14.1'},
{id:'mar-road',  t:'Airport access road widening & flyover feasibility',        s:'mar',a:200,add:200,st:'new',f:'tre',o:'RDA',p:'Gampaha',y:[2027,2027],g:'commuters',ref:'§14.1',ax2:20},
{id:'mar-park',  t:'New car park at Katunayake airport',                        s:'mar',tc:400,st:'new',f:'soe',o:'AASL',p:'Gampaha',y:[2027,2028],g:'tourism',ref:'§14.1'},
{id:'mar-hub',   t:'Re-export / air-cargo hub at Katunayake (BOT)',             s:'mar',st:'reform',f:'ppp',o:'AASL',p:'Gampaha',y:[2027,2030],g:'exporters,investors',ref:'§14.1'},
{id:'mar-rat',   t:'Ratmalana airport: runway rehabilitation & extension 1,400 → 1,771 m',s:'mar',tc:6000,st:'new',f:'soe',o:'AASL',p:'Colombo',y:[2027,2029],g:'tourism',ref:'§14.1'},
{id:'mar-mat',   t:'Mattala airport: new investors for ops, data centres, catering, MRO',s:'mar',st:'reform',f:'ppp',o:'AASL',p:'Hambantota',y:[2027,2028],g:'investors',ref:'§14.1',m:'Accumulated loss > Rs 70,000M; investors expected within 2027'},
{id:'mar-sig',   t:'Sigiriya domestic airport — terminal & facilities',         s:'mar',a:100,add:100,st:'new',f:'tre',o:'AASL',p:'Matale',y:[2027,2028],g:'tourism',ref:'§14.2',ax2:21},
{id:'mar-cb',    t:'China Bay (Trincomalee) airport upgrades',                  s:'mar',st:'new',f:'soe',o:'AASL',p:'Trincomalee',y:[2027,2028],g:'tourism',ref:'§14.2'},

/* ───────── §15 Industry, trade, minerals ───────── */
{id:'ind-estates',t:'Industrial estates: Valachchenai, Puliyankulam (feasibility), Ingiriya, Dambulla, Raigama–Millaniya, Katunayake',s:'ind',a:4000,st:'ongoing',f:'tre',o:'Industrial Development Board',p:'Batticaloa,Vavuniya,Kalutara,Matale,Gampaha',y:[2027,2029],g:'sme,exporters',ref:'§15'},
{id:'ind-expo',  t:'Sri Lanka Expo 2027 (January) & National Export Development Plan', s:'ind',a:750,st:'ongoing',f:'tre',o:'Export Development Board',p:'Colombo',y:[2027,2027],g:'exporters',ref:'§15'},
{id:'ind-moi',   t:'Ministry of Industries building, Narahenpita',              s:'ind',a:1860,st:'new',f:'tre',o:'Ministry of Industries',p:'Colombo',y:[2027,2028],g:'servants',ref:'§15'},
{id:'ind-salt',  t:'Kurunchantivu salt pan restart (National Salt Ltd)',        s:'ind',a:236,st:'ongoing',f:'soe',o:'National Salt Ltd',p:'P:N',loc:'Northern Province',y:[2026,2027],g:'poor',ref:'§15',m:'Rs 236M from Treasury in 2026 for access roads & services'},
{id:'ind-min',   t:'Mineral value-addition: graphite (Kahatagaha), mineral sands (58 grids), silica sand (Nattandiya), quartz (Wellawaya)',s:'ind',st:'reform',f:'ppp',o:'GSMB / Lanka Mineral Sands Ltd',p:'Kegalle,Puttalam,Monaragala,P:E',y:[2027,2030],g:'investors',ref:'§15',m:'Investors to be selected in 2027'},
{id:'ind-gem',   t:'International Gem & Jewellery Trade Hub; licensing for jewellers',s:'ind',st:'reform',f:'tre',o:'National Gem & Jewellery Authority',p:'*',y:[2027,2029],g:'sme,exporters',ref:'§15'},
{id:'fin-cse',   t:'Capital-market promotion: “A Share for Everyone” + SME listing support',s:'fin',a:750,add:500,st:'new',f:'mix',o:'Colombo Stock Exchange / Treasury',p:'*',y:[2027,2028],g:'students,investors,sme',ref:'§15',ax2:68,m:'CSE puts in Rs 250M; Treasury adds Rs 500M. Only ~0.7% of adults trade today; Grade-13 students 18+ may get portfolios up to Rs 10,000'},

/* ───────── §12 MSME & finance ───────── */
{id:'fin-sub',   t:'Interest subsidies & refinancing for MSME loans (→ Rs 174bn of concessionary loans)',s:'fin',a:67687,lv:174000,st:'topup',f:'tre',o:'Dept of Development Finance',p:'*',y:[2027,2027],g:'sme',ref:'§12',m:'2026: Rs 54,136M fully used, enabling Rs 97,100M of loans. Hotline 1819'},
{id:'fin-remsme',t:'Re-MSME Plus: 5% loans — a further Rs 20,000M on top of Rs 30,000M',s:'fin',a:200,lv:20000,add:200,st:'topup',f:'tre',o:'Dept of Development Finance',p:'*',y:[2027,2027],g:'sme',ref:'§12',ax2:72,in:'fin-sub',m:'Fisheries now eligible on turnover test alone'},
{id:'fin-adb',   t:'ADB-funded concessionary loans for MSME working capital',  s:'fin',lv:30000,st:'new',f:'dev',fd:'ADB',o:'Dept of Development Finance',p:'*',y:[2027,2027],g:'sme',ref:'§12'},
{id:'fin-paddy', t:'Interest-free pledge loans for paddy-mill owners (buy at guaranteed price)',s:'fin',a:350,lv:20000,st:'new',f:'tre',o:'Paddy Marketing Board / banks',p:'*',y:[2027,2027],g:'farmers,sme',ref:'§12',m:'Rs 350M subsidy already allocated; more to come'},
{id:'fin-women', t:'Women-headed households: group loans up to Rs 1M at 3% (Samurdhi Bank)',s:'fin',a:200,lv:12500,add:200,st:'new',f:'tre',o:'Samurdhi Bank',p:'*',y:[2027,2027],g:'women,poor',ref:'§12',ax2:70},
{id:'fin-rural', t:'Rural enterprise loans up to Rs 5M at 4% (must employ ≥5 Aswesuma beneficiaries)',s:'fin',a:200,lv:5000,add:200,st:'new',f:'tre',o:'Samurdhi Bank',p:'*',y:[2027,2027],g:'sme,poor',ref:'§12',ax2:73},
{id:'fin-fish',  t:'Fisheries entrepreneurs: loans up to Rs 500M at 5%',        s:'fin',a:1000,lv:15000,add:1000,st:'new',f:'tre',o:'Banks / Dept of Development Finance',p:'*',y:[2027,2027],g:'fishers,exporters',ref:'§12',ax2:44},
{id:'fin-home',  t:'Home-stay loans up to Rs 2M at 3%',                        s:'fin',a:100,lv:7500,add:100,st:'new',f:'tre',o:'Banks / Dept of Development Finance',p:'*',y:[2027,2027],g:'tourism,sme',ref:'§12',ax2:71}
]);
