/* Initiatives — part C: public administration, pay & pensions, security, justice, Ditwah. */
window.B27 = window.B27 || {};
B27.INIT = (B27.INIT || []).concat([

/* ───────── §34 Public administration & local government ───────── */
{id:'adm-ddp',   t:'District Development Programme (Rs 2,000M per district × 25) + Decentralised Budget (Rs 10M per MP)',s:'adm',a:50000,add:47750,st:'new',f:'tre',o:'Ministry of Public Administration / District Secretariats',p:'*',y:[2027,2027],g:'households,localgov',ref:'§34',ax2:22,m:'Rs 47,750M district programmes + Rs 2,250M decentralised budget'},
{id:'adm-lg',    t:'Local-government revenue-capacity project (4 years)',       s:'adm',a:1000,st:'new',f:'tre',o:'Ministry of Local Government',p:'*',y:[2027,2030],g:'localgov',ref:'§34',ax7:74},
{id:'adm-lgsal', t:'Treasury covers 100% of salaries in 46 financially weak local authorities; Rs 1,750M capital support',s:'adm',a:1750,st:'new',f:'tre',o:'Ministry of Local Government',p:'*',y:[2027,2027],g:'localgov',ref:'§34'},
{id:'adm-capsq', t:'Complete “Capital Square” building, Kurunegala Municipal Council',s:'adm',a:575,add:575,st:'new',f:'tre',o:'North Western Provincial Council',p:'Kurunegala',y:[2027,2028],g:'localgov',ref:'§34',ax2:19},
{id:'adm-ds',    t:'New District Secretariats: Vavuniya, Puttalam, Anuradhapura',s:'adm',a:1100,st:'new',f:'tre',o:'Ministry of Public Administration',p:'Vavuniya,Puttalam,Anuradhapura',y:[2027,2029],g:'servants,households',ref:'§34',ax7:73},
{id:'adm-ds2',   t:'New Divisional Secretariats: Dehiattakandiya, Elapatha',     s:'adm',a:265,st:'new',f:'tre',o:'Ministry of Public Administration',p:'Ampara,Ratnapura',y:[2027,2028],g:'servants,households',ref:'§34',ax7:72},
{id:'adm-ds3',   t:'Complete 2 District & 6 Divisional Secretariat offices (Kegalle, Nuwara Eliya, Negombo, Homagama, Kalutara …)',s:'adm',a:1100,st:'ongoing',f:'tre',o:'Ministry of Public Administration',p:'Kegalle,Nuwara Eliya,Gampaha,Colombo,Kalutara,Galle,Badulla',y:[2027,2028],g:'servants',ref:'§34'},
{id:'adm-seth',  t:'Sethsiripaya Stage III, Battaramulla (stage IV via UDA funds)',s:'adm',a:6800,st:'ongoing',f:'tre',o:'Urban Development Authority',p:'Colombo',y:[2026,2028],g:'servants',ref:'§34',ax7:71},
{id:'adm-recruit',t:'Recruit 148,940 approved public-service vacancies (40,000 done; 110,000 to go)',s:'adm',st:'ongoing',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2029],g:'servants,youth',ref:'§34'},
{id:'adm-post',  t:'Postal Department headquarters',                            s:'adm',a:200,st:'new',f:'tre',o:'Postal Department',p:'*',y:[2027,2028],g:'servants',ref:'Annex VII',ax7:78},

/* ───────── §35 Public pay & pensions ───────── */
{id:'pay-sal',   t:'Final phase of public-sector salary revision (min. basic +Rs 15,750; increment +80%)',s:'pay',a:110000,st:'ongoing',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2027],g:'servants',ref:'§35',m:'The full revision cost Rs 330bn across 3 phases'},
{id:'pay-trans', t:'Executive officers’ transport allowance Rs 50,000 → Rs 100,000 (own vehicle); EV owners +150% from Jul 2027',s:'pay',a:7000,add:7000,st:'new',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2027],g:'servants',ref:'§35',ax2:63},
{id:'pay-forces',t:'Tri-forces food allowance +Rs 315 (officers) / +Rs 332 (other ranks) per day; police +Rs 10,000/month; prison risk allowance doubled — from Jul 2027',s:'pay',a:34800,add:34800,st:'new',f:'tre',o:'Ministry of Defence / Police / Prisons',p:'*',y:[2027,2028],g:'servants',ref:'§35',ax2:56},
{id:'pay-field', t:'Field-officer allowances: Grama Niladhari travel Rs 1,600 → 4,000; rent allowances doubled (from Apr 2027)',s:'pay',a:3000,add:3000,st:'new',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2027],g:'servants',ref:'§35',ax2:64},
{id:'pay-lect',  t:'University academic allowance +Rs 25,000 (50% Jul 2027, 50% Jul 2028); visiting lecturer pay Rs 1,500 → 4,500/hour',s:'pay',a:2000,add:2000,st:'new',f:'tre',o:'UGC',p:'*',y:[2027,2028],g:'teachers',ref:'§35',ax2:5},
{id:'pay-judge', t:'Judges, AG’s Dept, Legal Draftsman & court-staff allowances raised',s:'pay',a:1500,add:1500,st:'new',f:'tre',o:'Judicial Service Commission / AG’s Dept',p:'*',y:[2027,2028],g:'servants',ref:'§35',ax2:58},
{id:'pay-board', t:'Allowances for independent commissions and state-enterprise directors (unchanged since 2015/2018)',s:'pay',a:300,add:300,st:'new',f:'tre',o:'Dept of Management Services',p:'*',y:[2027,2027],g:'servants',ref:'§35',ax2:66},
{id:'pay-pens',  t:'Interim pension allowance Rs 2,500/month for 2020–2024 retirees (from 1 Jul 2027); final conversion phase for pre-2020 retirees',s:'pay',a:4000,add:4000,st:'new',f:'tre',o:'Dept of Pensions',p:'*',y:[2027,2028],g:'pensioners',ref:'§35',ax2:65,m:'Full pension revision to the 2025 salary scale begins with the 2028 Budget'},

/* ───────── §28–30 Security, justice, defence ───────── */
{id:'sec-pol',   t:'Police digitalisation, Police Academy, Police Hospital, STF camps, Mirihana sports complex',s:'sec',a:9500,st:'ongoing',f:'tre',o:'Sri Lanka Police',p:'*',y:[2027,2029],g:'servants',ref:'§28',ax7:64},
{id:'sec-polhq', t:'Single Police HQ building — feasibility (currently rented offices)',s:'sec',a:200,add:200,st:'new',f:'tre',o:'Sri Lanka Police',p:'Colombo',y:[2027,2028],g:'servants',ref:'§28',ax2:54},
{id:'sec-cid',   t:'15-storey CID building for cyber-crime & financial-fraud investigation — feasibility',s:'sec',a:500,st:'new',f:'tre',o:'Criminal Investigation Dept',p:'Colombo',y:[2027,2029],g:'households,investors',ref:'§28',ax7:65},
{id:'sec-uni',   t:'New climate-suited, tech-enabled police uniform (June 2027)',s:'sec',st:'new',f:'tre',o:'Sri Lanka Police',p:'*',y:[2027,2027],g:'servants',ref:'§28'},
{id:'sec-drug',  t:'Rehabilitation centres (Senapura, Kandakadu) under “Ratama Ekata”',s:'sec',a:180,st:'ongoing',f:'tre',o:'NDDCB',p:'Polonnaruwa,Colombo',y:[2027,2028],g:'households',ref:'§28'},
{id:'sec-imm',   t:'Immigration & border security, Wattala detention centre, Trincomalee office, digitalisation',s:'sec',a:6200,st:'ongoing',f:'tre',o:'Dept of Immigration & Emigration',p:'Gampaha,Trincomalee',y:[2027,2029],g:'investors',ref:'§28',ax7:70,m:'Permanent residency for investors being legislated'},
{id:'sec-def',   t:'Defence: research centre, cyber & digital forensics, navy patrol craft & radar',s:'sec',a:7760,st:'new',f:'tre',o:'Ministry of Defence',p:'*',y:[2027,2029],g:'servants',ref:'§30',ax7:79,m:'Rs 250M research centre + Annex VII defence items (Rs 740M, 1,100M, 1,490M, 525M, …)'},
{id:'jus-courts',t:'Court expansion: Jaffna, Batticaloa, Trincomalee, Mannar, Nuwara Eliya, Kegalle, Gampaha, Kalutara, Kandy, Colombo',s:'jus',a:5115,st:'ongoing',f:'tre',o:'Ministry of Justice',p:'Jaffna,Batticaloa,Trincomalee,Mannar,Nuwara Eliya,Kegalle,Gampaha,Kalutara,Kandy,Colombo',y:[2027,2029],g:'households',ref:'§29',ax7:63},
{id:'jus-gan',   t:'Government Analyst Department digitalisation',                s:'jus',a:60,st:'new',f:'tre',o:'Government Analyst Dept',p:'Colombo',y:[2027,2027],g:'households',ref:'§29'},
{id:'jus-mill',  t:'Relocate Welikada, Magazine & Colombo Remand prisons to Millewa (cut overcrowding: 36,500 inmates in space for 16,500)',s:'jus',a:300,add:300,st:'new',f:'tre',o:'Dept of Prisons',p:'Kalutara,Colombo',y:[2027,2032],g:'households,investors',ref:'§29',ax2:53},
{id:'jus-galle', t:'Relocate Galle prison to Boossa (heritage-city & tourism-zone plan)',s:'jus',a:500,add:500,st:'new',f:'tre',o:'Dept of Prisons',p:'Galle',y:[2027,2030],g:'tourism,investors',ref:'§29',ax2:52},
{id:'jus-wari',  t:'Expand Wariyapola & Watareka prisons',                       s:'jus',a:1000,st:'ongoing',f:'tre',o:'Dept of Prisons',p:'Kurunegala,Colombo',y:[2027,2028],g:'households',ref:'§29',ax7:61},
{id:'jus-matara',t:'Relocate Matara prison to Kotawilawatta',                    s:'jus',a:500,st:'new',f:'tre',o:'Dept of Prisons',p:'Matara',y:[2027,2030],g:'households',ref:'§29',ax7:60},

/* ───────── From the Citizens' Budget (Estimates), not in the speech ───────── */
{id:'adm-pcelec',t:'Conducting a provincial council election',s:'adm',a:8700,st:'ongoing',f:'tre',o:'Election Commission',p:'*',y:[2027,2027],g:'households',ref:'Citizens’ Budget, p.27',m:'Listed under “Strengthen democratic participation”. The Election Commission sets the date, and the law on the electoral system is still pending. Neither is in the speech or the Estimates.'},

/* ───────── §38 Ditwah ───────── */
{id:'dit-sup',   t:'Ditwah reconstruction — 2027 Supplementary Estimate (unspent portion of the Rs 500bn approved)',s:'dis',a:260000,st:'ongoing',f:'sup',o:'Treasury / Reconstruction agencies',p:'*',y:[2026,2028],g:'displaced',ref:'§38',m:'Financed from the cash buffer. Damage estimate USD 3.4bn (Rs 1.022tn)'}
]);

/* Items whose amount is already inside another line — excluded from coverage sums */
B27.IN_PARENT = {};
B27.INIT.forEach(i => { if (i.in) B27.IN_PARENT[i.id] = i.in; });
