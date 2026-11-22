/* Chemmani: claims, each with grade (see CH.GRADES) and sources [sourceId, location].
   Wording follows the source. Where AAMA adds arithmetic or an observation, it is marked an: true. */
var CH = window.CH = window.CH || {};

/* ── Timeline ── */
CH.EVENTS = [
  // 1996–1999
  { d: '1996-07', dl: 'July–September 1996', era: 'then', g: 'ngo', t: 'People “disappeared” in the Chemmani area between July and September 1996, according to Amnesty International. It estimated that about 540 people “disappeared” in Jaffna in mid-1996.', s: [['ai99a', 'p. 1'], ['ai98', 'p. 3']] },
  { d: '1996-09-07', dl: '7 September 1996', era: 'then', g: 'court', t: 'Krishanthi Kumaraswamy, 18, left home by bicycle to sit an A-Level exam. The Supreme Court later upheld convictions for her abduction, rape and murder, and for the murders of her mother Rasamma Kumaraswamy, her brother Pranavan, 16, and family friend Siddambaram Kirubamoorthi. The first appellant was a lance corporal assigned that day to the Chemmani security checkpoint.', s: [['sc', 'p. 8 (SLR 120)'], ['sc', 'p. 9 (SLR 121)']] },
  { d: '1996-10', dl: 'Date not given in the judgment', era: 'then', g: 'court', t: 'After an anonymous petition to the Army about four missing civilians, four decomposed bodies and items of clothing were exhumed close to the Chemmani checkpoint.', s: [['sc', 'p. 11 (SLR 123)']] },
  { d: '1998-07', dl: 'July 1998', era: 'then', g: 'ngo', t: 'The Colombo High Court convicted five members of the security forces and imposed death sentences.', s: [['ai99a', 'p. 1'], ['sc', 'p. 8 (SLR 120)']] },
  { d: '1998-07', dl: 'July 1998', era: 'then', g: 'claim', who: 'Somaratne Rajapakse, convicted former lance corporal', t: 'Rajapakse told the court that 300 to 400 other bodies were buried at the site: “almost every evening, dead bodies were brought there and the soldiers were asked to bury them.”', s: [['ai99a', 'p. 1']] },
  { d: '1998-07-05', dl: '5 July 1998', era: 'then', g: 'news', t: 'Uthayan front page: PLOTE asks the President to search the Chemmani area.', s: [['u980705', 'front page']] },
  { d: '1998-10-29', dl: '29 October 1998', era: 'then', g: 'ngo', t: 'Amnesty International reported that the Attorney General had invited it to send a forensic expert. The Human Rights Commission told Amnesty it had found the soldiers’ allegations credible and had asked the UN for international experts.', s: [['ai98', 'p. 1']] },
  { d: '1999-05-26', dl: '26 May 1999', era: 'then', g: 'ngo', t: 'A letter dated 26 May 1999, one of two threatening letters sent to Rajapakse’s wife, warned that the family would be killed if he showed investigators “the places”. Amnesty issued an urgent action for their safety.', s: [['ai99a', 'p. 1']] },
  { d: '1999-06-16', dl: '16 June 1999', era: 'then', g: 'ngo', t: 'Before the magistrate, Rajapakse said he could identify at least ten places where bodies were disposed of. The magistrate ordered him to locate the other nine.', s: [['ai99b', 'p. 2'], ['u990617', 'front page']] },
  { d: '1999-06-17', dl: '16–17 June 1999', era: 'then', g: 'ngo', t: 'Local forensic experts exhumed two bodies from a shallow grave Rajapakse identified, watched by two Amnesty observers and two experts from Physicians for Human Rights. One was blindfolded with a shirt; the other’s hands were tied behind his back. Relatives identified them as two garage workers arrested by army personnel on 19 August 1996.', s: [['ai99b', 'p. 1'], ['u990618', 'front page']] },
  { d: '1999-06-18', dl: '17 June 1999', era: 'then', g: 'news', t: 'Additional Magistrate M. Ilancheliyan ordered the Attorney General’s Department and the CID to finish excavating all alleged graves in Chemmani before the next rainy season.', s: [['u990618', 'front page']] },
  { d: '1999-09', dl: 'September 1999', era: 'then', g: 'ngo', t: 'Remains of 15 people were exhumed with Amnesty’s international experts present. After the October analysis, the experts concluded that “a pattern of injuries had emerged”.', s: [['ai99c', 'p. 1']] },
  { d: '1999-12-07', dl: '7 December 1999', era: 'then', g: 'ngo', t: 'The Ministry of Defence’s Board of Investigation reportedly told relatives it could not establish the fate of 374 people arrested by the army in mid-1996, out of more than 700 cases. Amnesty noted that at least two of those it listed as unknown had been exhumed and identified at Chemmani in June.', s: [['ai99c', 'p. 1']] },
  // 2000–2024
  { d: '2000-07', dl: 'July 2000', era: 'between', g: 'ngo', t: 'Suspects in the 1999 Chemmani case were released on bail on the orders of the Attorney General’s office. No indictments were filed. The case was moved to a Colombo magistrate’s court after the officers said they feared for their lives in Jaffna.', s: [['itjp', 'p. 28']] },
  { d: '2003', dl: '2003', era: 'between', g: 'record', t: 'An HRCSL Committee of Inquiry into Disappearances in the Jaffna region received 327 complaints and inquired into 281. It found that “in nearly all cases they identified the institution as the army and, in a few cases, as the police”.', s: [['hrc', 'p. 7']] },
  { d: '2004-02-03', dl: '3 February 2004', era: 'between', g: 'court', t: 'The Supreme Court dismissed the appeal and affirmed the convictions and sentences. Even leaving out the confessions, it held, the evidence proved guilt beyond reasonable doubt.', s: [['sc', 'p. 39 (SLR 151)']] },
  { d: '2006-01', dl: 'January 2006', era: 'between', g: 'ngo', t: 'The 1999 case “came to an end when police told the Colombo Magistrate that they were unable to proceed”, according to ITJP and partners. In August 2025, M.A. Sumanthiran PC told the Jaffna court the case was still open in the Colombo Fort Magistrate’s Court.', s: [['itjp', 'p. 28'], ['st25', '']], conflict: 'case1999' },
  // 2025–2026
  { d: '2025-02-13', dl: '13 February 2025', era: 'now', g: 'record', t: 'Construction workers found human remains inside the Sinthupathy (Sittupattu) cemetery while building a new crematorium. The Jaffna Magistrate ordered an investigation under the Code of Criminal Procedure Act.', s: [['hrc', 'p. 2'], ['nw25', ''], ['ct26', '']], note: 'HRCSL gives “February 2025”; Newswire and The Sunday Morning give 13 February.' },
  { d: '2025-02-20', dl: '20 February 2025', era: 'now', g: 'news', t: 'A Jaffna magistrate inspected the site.', s: [['ct26', '']] },
  { d: '2025-05-15', dl: '15 May 2025', era: 'now', g: 'news', t: 'Excavation began under judicial supervision. Phase one ran nine days and recovered the remains of 19 individuals.', s: [['dm26', ''], ['nw25', '']] },
  { d: '2025-06-25', dl: '25 June 2025', era: 'now', g: 'news', t: 'UN High Commissioner for Human Rights Volker Türk visited the site and paid tribute at the memorial of the “Anaiya Vilakku” protest. Police kept journalists out of the grave area.', s: [['u250626', 'front page']] },
  { d: '2025-06-29', dl: '29 June 2025', era: 'now', g: 'claim', who: 'Minister Bimal Rathnayake, in Jaffna', t: 'He said the Government had asked the UN High Commissioner to help set up a laboratory in Sri Lanka, that funds had been allocated for the excavation, and that justice would be delivered through the courts.', s: [['ibc25', '']] },
  { d: '2025-06-26', dl: '26 June 2025', era: 'now', g: 'news', t: 'Phase two began. It ran 45 days and took the total to 240.', s: [['dm26', '']] },
  { d: '2025-08-04', dl: '3–4 August 2025', era: 'now', g: 'record', t: 'The Human Rights Commission of Sri Lanka visited the site, the remains store at the University of Jaffna and the investigators.', s: [['hrc', 'p. 2']] },
  { d: '2025-08-21', dl: 'August 2025', era: 'now', g: 'news', t: 'The CID and Prof. Raj Somadeva submitted reports. The court was told that more than 90 per cent of the bodies had been buried without clothes.', s: [['st25', '']] },
  { d: '2025-08-21', dl: 'August 2025', era: 'now', g: 'claim', who: 'Lawyers for the families, led by M.A. Sumanthiran PC', t: 'They told the court that CID personnel had intimidated relatives at the site on 5 August, asked for the CID to be removed, and asked for travel bans on soldiers and officers named in earlier inquiry reports.', s: [['st25', '']] },
  { d: '2025-09-03', dl: '3 September 2025', era: 'now', g: 'record', t: 'HRCSL published its findings: “there is a reasonable likelihood that the burials were unlawful and pursuant to extrajudicial killings”. It also said it was too early to draw conclusions on criminal responsibility.', s: [['hrc', 'p. 4'], ['hrc', 'p. 7'], ['hrcpn', 'p. 1']] },
  { d: '2025-09-06', dl: '6 September 2025', era: 'now', g: 'news', t: 'Work stopped pending fresh funds from the Ministry of Justice: 240 remains identified, 239 recovered.', s: [['nw25', ''], ['tm26', '']] },
  { d: '2025-11-04', dl: 'November 2025', era: 'now', g: 'news', t: 'Phase three was postponed because rainwater had collected in the grave. Magistrate S. Lenin Kumar set a site visit for 19 January 2026.', s: [['ad25', '']] },
  { d: '2026-04-27', dl: '27 April 2026', era: 'now', g: 'news', t: 'Excavation resumed. The next day the court was told Rs 2.1 million had been allocated.', s: [['tm26', ''], ['dm26', '']] },
  { d: '2026-06-25', dl: '25 June 2026', era: 'now', g: 'claim', who: 'Justice Minister Harshana Nanayakkara, in Parliament', t: '“When it comes to DNA analysis, depending on the type and nature we will definitely have to go for internationally recognised places.” He said this depended on the court’s directions.', s: [['en26', '']] },
  { d: '2026-07-01', dl: 'July 2026', era: 'now', g: 'news', t: 'The CID told the court it had not yet established whether a crime had taken place, and asked for samples to be sent abroad for carbon dating.', s: [['jm1023', '']] },
  { d: '2026-07-15', dl: '15 July 2026', era: 'now', g: 'news', t: 'Work resumed after a pause on 23 June. 412 sets of remains identified, 409 fully excavated.', s: [['dm26', '']] },
  { d: '2026-08-07', dl: '7 August 2026', era: 'now', g: 'news', t: 'Day 100 of digging: 515 identified, 506 recovered. A random test pit next to the trench also held remains.', s: [['ct26', '']] },
  { d: '2026-08-19', dl: '19 August 2026', era: 'now', g: 'news', t: 'The authorised digging days ran out after 110 days. Reports differ on the total: 582 identified and 573 recovered, or 583, all recovered.', s: [['jm0819', ''], ['ibc0819', ''], ['u260820', 'front page']], conflict: 'count' },
  { d: '2026-10-10', dl: '10 October 2026', era: 'now', g: 'record', t: 'The archaeologists’ summary report is dated 10 October. Its covering letter of 15 October calls it the third interim report.', s: [['rep', 'p. 2'], ['jm1120', '']] },
  { d: '2026-10-19', dl: '19 October 2026', era: 'now', g: 'news', t: 'The report was submitted to the Jaffna Magistrate’s Court. The court also allowed the CID to question Somaratne Rajapakse about the grave.', s: [['is1023', ''], ['jm1020', ''], ['u261020', 'front page']] },
  { d: '2026-10-22', dl: 'October 2026', era: 'now', g: 'claim', who: 'Families of the disappeared, through Attorney-at-Law Kasthury Ahalankan', t: 'A motion asked the court not to treat the report’s conclusions as settled. It argued that no designated burial section was identified where the remains were found, and that the archaeologist had dropped the term “mass grave” used in his earlier reports.', s: [['st1025n', ''], ['jm1023', '']] },
  { d: '2026-10-23', dl: 'October 2026', era: 'now', g: 'claim', who: 'MPs in Parliament', t: 'Gajendrakumar Ponnambalam MP called the report an attempt to conceal the truth and asked for an international criminal investigation. Leader of the House Bimal Rathnayake said international mechanisms would be considered only if national ones failed.', s: [['jm1023', ''], ['st1025c', '']] },
  { d: '2026-11-17', dl: '17 November 2026', era: 'now', g: 'news', t: 'The Association of Relatives of Enforced Disappearances marched from Ariyalai to the cemetery, calling for an international investigation and rejecting the report.', s: [['nw1117', '']] },
  { d: '2026-11-19', dl: '19 November 2026', era: 'now', g: 'news', t: 'Magistrate S. Leninkumar ruled that the court need not rely on the report (“It is his opinion”) and approved bone-sample analysis of remains thought to be adults, to be taken by a team led by JMO Dr S. Pranavan with victims’ representatives present. He asked families’ lawyers to name four international radiocarbon laboratories. Two relatives filed affidavits offering their DNA.', s: [['jm1120', ''], ['bn1120', '']] },
  { d: '2026-11-19', dl: '19 November 2026', era: 'now', g: 'news', t: 'The CID told the court Rajapakse said people suspected of being LTTE members were brought to the checkpoint in 1996 and killed, but that he could not identify where they were buried.', s: [['jm1120', '']] },
  { d: '2026-12-14', dl: '14 December 2026', era: 'now', g: 'news', t: 'Next hearing on the scientific questions.', s: [['jm1120', '']], future: true }
];

/* ── Counts over time. m: measure. Plot only stated figures. ── */
CH.COUNTS = [
  { d: '2025-05-24', dl: 'Late May 2025', v: 19, m: 'recovered', g: 'news', s: [['dm26', '']], note: 'End of phase one (nine days from 15 May).', approx: true },
  { d: '2025-08-21', dl: 'August 2025', v: 147, m: 'identified', g: 'news', s: [['st25', '']], note: 'About 133 already in the University of Jaffna’s care.' },
  { d: '2025-09-03', dl: '3 Sept 2025', v: 200, m: 'over', g: 'record', s: [['hrc', 'p. 2']], note: '“Over 200 human remains”.' },
  { d: '2025-09-06', dl: '6 Sept 2025', v: 240, v2: 239, m: 'identified', g: 'news', s: [['nw25', ''], ['tm26', ''], ['ad25', '']], note: '239 recovered.' },
  { d: '2026-05-17', dl: 'May 2026', v: 252, m: 'claim', g: 'claim', s: [['tm26', '']], note: 'M.A. Sumanthiran: “Now it’s at 252, the last I checked.”' },
  { d: '2026-07-15', dl: '15 July 2026', v: 412, v2: 409, m: 'identified', g: 'news', s: [['dm26', '']], note: '409 fully excavated.' },
  { d: '2026-08-07', dl: '7 Aug 2026', v: 515, v2: 506, m: 'identified', g: 'news', s: [['ct26', '']], note: '506 recovered.' },
  { d: '2026-08-19', dl: '19 Aug 2026', v: 582, v2: 573, m: 'identified', g: 'news', s: [['jm0819', '']], note: '573 recovered; nine still in the ground.' },
  { d: '2026-08-20', dl: '19–20 Aug 2026', v: 583, m: 'identified', g: 'news', s: [['ibc0819', ''], ['u260820', 'front page']], note: '“583 … all excavated”.' },
  { d: '2026-10-10', dl: 'Report, Oct 2026', v: 574, m: 'mni', g: 'record', s: [['rep', 'p. 8 (printed 5)']], note: 'Minimum number of individuals: an analytical floor, not a count of bags.' },
  { d: '2026-10-20', dl: '20 Oct 2026', v: 583, m: 'identified', g: 'news', s: [['jm1020', '']], note: 'Jaffna Monitor, reporting on the same report.' },
  { d: '2026-10-25', dl: '25 Oct 2026', v: 584, m: 'identified', g: 'news', s: [['st1025n', '']], note: 'The Sunday Times, reporting on the same report.' }
];
CH.MEASURES = {
  identified: 'Sets identified in the ground (news counts)',
  recovered: 'Recovered',
  over: 'Lower bound (“over”)',
  claim: 'Figure given by a lawyer',
  mni: 'Minimum number of individuals (report)'
};

/* ── The 2026 report ── */
CH.REPORT = {
  ages: [['Adult', 30], ['Sub-adult', 5], ['Child', 41], ['Infant', 22]],
  agesSrc: ['rep', 'Fig. 3, p. 9 (printed 6)'],
  orient: [['North-west', 72], ['South-east', 11], ['South-west', 7], ['North-east', 3], ['West', 3], ['North', 1], ['East', 1], ['South', 1], ['Not identifiable', 1]],
  orientSrc: ['rep', 'Fig. 4, p. 10 (printed 7)'],
  stats: [
    { v: '574', l: 'Minimum number of individuals', s: ['rep', '§8, p. 8'] },
    { v: '51', l: 'Heaps of disarticulated bone', s: ['rep', '§9, p. 9'] },
    { v: '170', l: 'Artefact entries', s: ['rep', '§15, p. 14'] },
    { v: '0.24–1.52 m', l: 'Depth range of skeletons', s: ['rep', '§12, p. 12'] },
    { v: '513 m²', l: 'Trench 1 (28.5 m × 18 m)', s: ['rep', '§5, p. 7'] },
    { v: '~80 days', l: 'Excavation covered by the report', s: ['rep', 'Prologue, p. 2'] }
  ],
  /* What the report says, by section (quoted or close paraphrase) */
  says: [
    { h: 'Why it was dug', t: 'Remains “surfaced accidentally during a digging for construction” and were excavated on the Jaffna Magistrate’s order, observed by the Magistrate and the Chief JMO.', s: ['rep', '§1, p. 4'] },
    { h: 'Site condition', t: 'Garbage dumping, waste pits, animal burials and hospital waste had disturbed the ground. The report says the site was used “as a dumping ground for various disposable items including human remains as well”.', s: ['rep', '§3, pp. 5–6'] },
    { h: 'Burial episodes', t: 'Overlapping skeletons and possible coffin material suggest “successive episodes of interment rather than a single, simultaneous depositional event”.', s: ['rep', '§13, p. 13'] },
    { h: 'Clothing', t: 'No preserved textiles were found on any skeleton. The report says this “should not be interpreted as evidence that the deceased were buried without clothes”, and records plastic buttons, eyelets and studs.', s: ['rep', '§14, p. 14'] },
    { h: 'Objects', t: 'Rings and bangles mostly with adults; beads mostly with children; amulets and coins, some with traces of cloth. One skeleton (SK 25) had a plastic bag, cut cloth, socks and shoes, an anklet chain and nails nearby.', s: ['rep', '§15, pp. 15–16'] },
    { h: 'Seated burials', t: 'Two skeletons (227 and 429) were seated. The report notes seated burial in some Hindu traditions but says “the seated posture alone does not establish” that link.', s: ['rep', '§11, pp. 11–12'] },
    { h: 'Coins', t: 'The only dated coin found with a skeleton (SK 367) reads 1870. Coins dated 1920 to 1994 came from an ash layer near the cremation platform. The report says a coin’s minting date “does not establish the date of the burial”.', s: ['rep', '§16, pp. 18–19'] },
    { h: 'Extent', t: 'A ground-penetrating radar survey found “numerous subsurface anomalies”, some possibly further burials. The site “may be considerably more extensive than the area investigated”.', s: ['rep', '§17, pp. 19–20'] },
    { h: 'Summary', t: 'The evidence is “insufficient, in isolation, to support a definitive conclusion”. It “suggest[s] that the site exhibits greater similarities to contexts characterized by formal burial practices than to clandestine burial sites”. “If the concentration of burials resulted from an epidemic or another form of natural catastrophe”, few grave goods “would not necessarily be unexpected”. “These observations remain provisional.”', s: ['rep', '§18, p. 20'] }
  ],
  /* AAMA observations from reading the full report. Each is checkable against the cited page. */
  notes: [
    { t: 'The text says the skulls show no uniform orientation. The report’s own chart puts 72% of them facing north-west.', s: ['rep', '§10 and Fig. 4, p. 10'] },
    { t: 'The age chart adds up to 98%, not 100%. The ages are “preliminary field evaluations”.', s: ['rep', 'Fig. 3, p. 9'] },
    { t: 'The report names no epidemic or natural disaster in Jaffna. It raises one only as a condition (“if”). The Island and Jaffna Monitor made the same point.', s: ['rep', '§18, p. 20'] },
    { t: 'The coins from 1920 to 1994 were in the ash layer, not with the skeletons. They do not date the burials either way. The Sunday Times placed them “within the excavation trench”, which the report does not say.', s: ['rep', '§16, p. 19'] },
    { t: 'Section 4 still contains an unfilled placeholder: Trench 1 is “approximately [insert number] meters northwest of the cremation platform”.', s: ['rep', '§4, p. 6'] },
    { t: 'Section 15.5 says the only example of final-rite objects is two garlands with one skeleton, but also cites skeletons 56 and 48.', s: ['rep', '§15.5, p. 17'] },
    { t: 'The prologue says the report covers about 80 days. News reports put total digging at 110 days by 19 August 2026, so the report may not include the last weeks. Not established.', s: ['rep', 'Prologue, p. 2'] }
  ]
};

/* ── Two readings of the same site ── */
CH.READINGS = [
  { topic: 'Clothing',
    a: { who: 'HRCSL, Sept 2025', g: 'record', t: '“Over 90 percent of the human remains found at the site had no form of clothing whatsoever, thereby ruling out customary burials by Hindu adherents.” Based on preliminary feedback from experts at the site, when just over 200 remains had been found.', s: [['hrc', 'p. 4']] },
    b: { who: 'Excavation report, Oct 2026', g: 'record', t: 'No preserved textiles on any skeleton, but this “should not be interpreted as evidence that the deceased were buried without clothes”. Soil chemistry, moisture and microbes can destroy fabric. Buttons, eyelets and studs were found.', s: [['rep', '§14, p. 14']] },
    c: { who: 'Others', t: 'News reports list shirt buttons, socks, footwear, a school bag and the remains of a child wearing a raincoat (Ceylon Today). Gajendrakumar Ponnambalam MP called the change from earlier reports “unacceptable”.', s: [['ct26', ''], ['st1025c', '']] } },
  { topic: 'Depth',
    a: { who: 'HRCSL, Sept 2025', g: 'record', t: 'Remains at “shallow depth … on occasion … as shallow as 1.5–2 feet from the surface”, cited as a sign of unlawful burial.', s: [['hrc', 'p. 4']] },
    b: { who: 'Excavation report, Oct 2026', g: 'record', t: 'Skeletons from 0.24 m to 1.52 m deep. Many child burials were shallow; some adults in the west of the trench were under 1 m. Depth “cannot establish the intentions” of those who buried them.', s: [['rep', '§12, p. 12']] } },
  { topic: 'What the burials suggest',
    a: { who: 'HRCSL, Sept 2025', g: 'record', t: '“There is a reasonable likelihood that the burials were unlawful and pursuant to extrajudicial killings.” Also: “too early … to draw any definitive conclusions on criminal responsibility.”', s: [['hrc', 'p. 4'], ['hrc', 'p. 7']] },
    b: { who: 'Excavation report, Oct 2026', g: 'record', t: '“Greater similarities to contexts characterized by formal burial practices than to clandestine burial sites.” An epidemic or natural catastrophe is raised as a possibility. Evidence “insufficient … to support a definitive conclusion”.', s: [['rep', '§18, p. 20']] },
    c: { who: 'Court, Nov 2026', g: 'news', t: 'The court need not rely on the report (“It is his opinion”). How the remains came to be there, and whose they are, “must be determined legally and scientifically”. Tamil outlets also report remarks by the magistrate that most remains were plainly not buried in the normal way; see Disputes.', s: [['jm1120', ''], ['jz1120', '']] } }
];

/* ── Where sources disagree ── */
CH.DISPUTES = [
  { id: 'count', h: 'How many remains', t: 'Each figure is a different moment or a different measure. “Sets identified” are counted in the field; the report’s 574 is a minimum number of individuals (MNI), worked out from the bones. Three outlets gave three totals for the same report.',
    rows: [['582 identified, 573 recovered', 'Jaffna Monitor, 19 Aug 2026', 'jm0819'], ['583, all recovered', 'IBC Tamil and Uthayan, 19–20 Aug 2026', 'ibc0819'], ['574 (MNI)', 'Excavation report, Oct 2026', 'rep'], ['583', 'Jaffna Monitor on the report, 20 Oct 2026', 'jm1020'], ['584', 'The Sunday Times on the report, 25 Oct 2026', 'st1025n']] },
  { id: 'clothing', h: 'Clothing', t: 'HRCSL’s “over 90 percent … no form of clothing” (Sept 2025) and the report’s “should not be interpreted as … buried without clothes” (Oct 2026) describe the same absence of fabric and read it differently.', rows: [['>90% without clothing', 'HRCSL, 3 Sept 2025', 'hrc'], ['Absence of textile is a preservation effect', 'Excavation report §14', 'rep']] },
  { id: 'remarks', h: 'What the magistrate said on 19 November', t: 'Three Tamil outlets carry near-identical text: the magistrate said most remains were plainly not buried in the normal way, many lay in varying directions, some had been cut away, and the gap between earlier and final reports raised serious doubts. Jaffna Monitor’s English account of the same hearing quotes “It is his opinion” and does not carry those remarks. We have not seen a written order.', rows: [['“Not buried in the normal way”', 'JaffnaZone', 'jz1120'], ['Same text', 'IBC Tamil', 'ibc1120'], ['Same text', 'Global Tamil News', 'gtn1120'], ['“Court need not rely on the report”', 'Jaffna Monitor; Battinews', 'jm1120']] },
  { id: 'length', h: 'How long the report is, and how many days it covers', t: 'The report AAMA read is 21 pages, 17 of them findings. Jaffna Monitor called it 190 pages, which may include annexures we do not have. The report says about 80 days; Jaffna Monitor says 110.', rows: [['21 pp; ~80 days', 'Report PDF and prologue', 'rep'], ['17 pages of findings', 'The Island', 'is1023'], ['190 pages; 110 days', 'Jaffna Monitor, 20 Oct 2026', 'jm1020']] },
  { id: 'nth', h: 'Third or fourth interim report', t: 'The Sunday Times called it the third interim report in its news pages and the fourth in its political column, on the same day. The covering letter calls it the third.', rows: [['Third', 'Covering letter (via Jaffna Monitor); Sunday Times news', 'jm1120'], ['Fourth', 'Sunday Times column', 'st1025c']] },
  { id: 'phases', h: 'Phase numbering and length', t: 'Most outlets count three phases (9, 45 and 56 days). The Sunday Morning called the April 2026 restart the “sixth phase”. IBC Tamil gave phase two as 54 days.', rows: [['3 phases: 9 + 45 + 56 days', 'Daily Mirror; Ceylon Today; Jaffna Monitor', 'dm26'], ['“Sixth phase” from 27 Apr 2026', 'The Sunday Morning', 'tm26'], ['Phase two 54 days', 'IBC Tamil', 'ibc0819']] },
  { id: 'case1999', h: 'Whether the 1999 case is closed', t: 'ITJP and partners say it ended in January 2006. Sumanthiran told the court in August 2025 that it was still open in Colombo. The Sunday Times gives two different case numbers (2889 and B-2899) in the same article.', rows: [['Ended January 2006', 'ITJP 2023, p. 28', 'itjp'], ['Still open', 'Sumanthiran, via The Sunday Times', 'st25']] },
  { id: 'when', h: 'When Chemmani first came to light', t: 'Amnesty dates Rajapakse’s statement to the end of his trial in July 1998. The ITJP report says the location “came to light in 1996 during the trial”.', rows: [['July 1998', 'Amnesty, 9 June 1999', 'ai99a'], ['1996', 'ITJP 2023', 'itjp']] },
  { id: 'coins', h: 'Where the 1920–1994 coins were found', t: 'The report puts them in an ash layer near the cremation platform. The Sunday Times put them with the skeletons. M.A. Sumanthiran argued in court that coins after 1920 contradict an epidemic, since Jaffna’s last recorded epidemic was in 1919 (his statement).', rows: [['Ash layer', 'Report §16', 'rep'], ['In the trench', 'The Sunday Times, 25 Oct 2026', 'st1025n']] }
];

/* ── Not established ── */
CH.UNKNOWNS = [
  { h: 'Who the dead are', t: 'Identification had not begun as of August 2026. No DNA results are reported. Relatives began offering DNA in November 2026.', s: [['jm0819', ''], ['jm1120', '']] },
  { h: 'When they died or were buried', t: 'No dating results exist yet. Coin minting dates do not date the burials. Carbon dating is proposed by the CID and opposed by the families’ lawyers.', s: [['rep', '§16'], ['jm1120', '']] },
  { h: 'How they died', t: 'None of the sources we read report a cause of death for the 2025–26 remains.', s: [] },
  { h: 'Whether a crime took place', t: 'The CID told the court in July 2026 it had not established this. HRCSL found a “reasonable likelihood” of unlawful burials but said it was too early to conclude on criminal responsibility.', s: [['jm1023', ''], ['hrc', 'pp. 4, 7']] },
  { h: 'Whether the site is linked to 1996', t: 'The 1999 remains were found at least a kilometre from the present trench, according to Jaffna Monitor. Rajapakse told the CID he could not identify where people were buried. No source we read establishes a link or rules one out.', s: [['jm1120', '']] },
  { h: 'How far the site extends', t: 'Radar and test pits found possible burials beyond the trench.', s: [['rep', '§17'], ['ct26', ''], ['jm0819', '']] }
];

/* ── Key figures for the overview ── */
CH.KEY = [
  { v: '574', l: 'Minimum number of individuals in the 2026 report', g: 'record', s: [['rep', '§8, p. 8']], sub: 'News counts: 582 to 584' },
  { v: '63%', l: 'Children and infants, by the report’s preliminary estimate', g: 'record', s: [['rep', 'Fig. 3, p. 9']], sub: '41% child + 22% infant', an: true },
  { v: '15', l: 'Remains exhumed at Chemmani in 1999', g: 'ngo', s: [['ai99c', 'p. 1'], ['itjp', 'p. 28']], sub: 'No indictments filed' },
  { v: '300–400', l: 'Bodies a convicted soldier said were buried there, in 1998', g: 'claim', s: [['ai99a', 'p. 1']], sub: 'His claim; not verified' }
];
