/* Chemmani: source register and evidence grades.
   Every claim on the page cites one or more of these by id. Pages are the page of the document shown
   in the evidence screenshots (PDF page, with the printed page where it differs). */
var CH = window.CH = window.CH || {};

/* Evidence grades. Ordered from strongest to weakest for the claim type. */
CH.GRADES = {
  court:  { n: 1, label: 'Court finding',        short: 'Court',     desc: 'Found by a court in a written judgment. The strongest grade here.' },
  record: { n: 2, label: 'Official or expert record', short: 'Record', desc: 'Written by a statutory body or a court-appointed expert, in a report we have read.' },
  ngo:    { n: 3, label: 'Human-rights group',   short: 'Rights group', desc: 'Published by Amnesty International or the ITJP and partners, from their own observation or sources.' },
  news:   { n: 4, label: 'News report',          short: 'News',      desc: 'Reported by a news outlet as fact. Not independently checked by AAMA.' },
  claim:  { n: 5, label: 'Claim or position',    short: 'Claim',     desc: 'Said by a party: a lawyer, MP, minister, official or someone convicted. Shown as their claim, not as fact.' }
};

/* Source types (what the document is) */
CH.KINDS = { court: 'Court judgment', expert: 'Expert report to court', official: 'Statutory body', ngo: 'Human-rights group', news: 'News outlet', paper: 'Newspaper front page' };

const NOOLAHAM = 'https://www.noolaham.org/wiki/index.php/%E0%AE%89%E0%AE%A4%E0%AE%AF%E0%AE%A9%E0%AF%8D';

CH.SOURCES = {
  rep:     { t: 'Forensic Archaeological Excavation in Chemmani, Jaffna 2025/2026: A summary report on findings', by: 'Raj Somadeva PhD and Anusha Wanninayake MSc', d: '2026-10-10', k: 'expert', u: 'https://sangam.org/wp-content/uploads/2026/11/Forensic-Archaeological-Excavation-in-Chemmani-Jaffna-2025-2026-A-summary-report-on-findings-by-Raj-Somadeva-PhD.pdf', read: 'Full PDF, 21 pages', note: 'Interim report. Prologue dated 10 October 2026; submitted to the Jaffna Magistrate’s Court on 19 October 2026. Page references give the PDF page, then the report’s printed page.' },
  sc:      { t: 'Somaratne Rajapakse and others v. Hon. Attorney General (Krishanthi Kumaraswamy case), S.C. Appeal No. 2/2002 (TAB)', by: 'Supreme Court of Sri Lanka; judgment of Dr Shirani A. Bandaranayake J., with Edussuriya J., Yapa J., J.A.N. de Silva J. and Jayasinghe J. agreeing', d: '2004-02-03', k: 'court', u: 'https://lankalaw.net/wp-content/uploads/2024/12/009-SLLR-SLLR-2010-V-2-SOMARATNE-RAJAPAKSE-OTHERS-v.-HON.-ATTORNEY-GENERAL-KRISHANTHI-KUMARASWAM.pdf', read: 'Pages 1, 5, 8, 9, 11 and 39', note: 'Appeal from H.C. Colombo No. 8778/97. Reported at [2010] 2 Sri L.R. 113–151. The link opens the Sri Lanka Law Reports copy (39 pages; page 1 is report page 113). The same judgment is on LawNet: www.lawnet.gov.lk/somaratne-rajapakse-others-v-hon-attorney-general-krishanthi-kumaraswam/' },
  ai98:    { t: 'Sri Lanka: Safety must be guaranteed for experts working on mass graves exhumation (ASA 37/27/98)', by: 'Amnesty International', d: '1998-10-29', k: 'ngo', u: 'https://www.amnesty.org/en/wp-content/uploads/2021/06/asa370271998en.pdf', read: 'Pages 1 and 3' },
  ai99a:   { t: 'Further information on UA 229/98: Fear for safety, Somaratne Rajapakse and family (ASA 37/16/99)', by: 'Amnesty International', d: '1999-06-09', k: 'ngo', u: 'https://www.amnesty.org/en/wp-content/uploads/2021/06/asa370161999en.pdf', read: 'Page 1' },
  ai99b:   { t: 'Sri Lanka: Chemmani exhumations, positive first steps towards truth and justice (ASA 37/17/99)', by: 'Amnesty International', d: '1999-06-22', k: 'ngo', u: 'https://www.amnesty.org/en/wp-content/uploads/2021/06/asa370171999en.pdf', read: 'Pages 1 and 2' },
  ai99c:   { t: 'Sri Lanka: Probe into “disappearances” must inspire confidence (ASA 37/30/99)', by: 'Amnesty International', d: '1999-12-07', k: 'ngo', u: 'https://www.amnesty.org/en/wp-content/uploads/2021/06/asa370301999en.pdf', read: 'Page 1' },
  itjp:    { t: 'Mass Graves and Failed Exhumations in Sri Lanka', by: 'ITJP, JDS, CHRD and FOD', d: '2023-06', k: 'ngo', u: 'https://itjpsl.com/', read: 'Page 28 (printed pages 54–55)', note: 'The screenshot cuts off mid-sentence in the Chemmani entry.' },
  hrc:     { t: 'Fact-Finding Report of the HRCSL on the Chemmani Mass Grave Site', by: 'Human Rights Commission of Sri Lanka', d: '2025-09-03', k: 'official', u: 'https://www.hrcsl.lk/wp-content/uploads/2025/09/Fact-Finding-Report-of-HRCSL-on-Chemmani-Mass-Grave-Site.pdf', read: 'Pages 2, 3, 4, 6 and 7' },
  hrcpn:   { t: 'Press Notice HRC/P/i/E/03/09/25: Report on the ongoing investigation into the mass grave site in Chemmani', by: 'Human Rights Commission of Sri Lanka', d: '2025-09-03', k: 'official', u: 'https://www.hrcsl.lk/wp-content/uploads/2025/09/HRCSL-Press-Notice-03092025.pdf', read: 'Page 1' },
  st25:    { t: 'Chemmani mass graves: Sumanthiran calls for international oversight and CID exit', by: 'The Sunday Times', d: '2025-08-24', k: 'news', u: 'https://www.sundaytimes.lk/250824/news/chemmani-mass-graves-sumanthiran-calls-for-international-oversight-and-cid-exit-609771.html' },
  nw25:    { t: 'Excavations at Chemmani mass grave halted over lack of funds', by: 'Newswire (with PTI)', d: '2025-09-08', k: 'news', u: 'https://www.newswire.lk/2025/09/08/excavations-at-chemmani-mass-grave-halted-over-lack-of-funds/' },
  ibc25:   { t: 'Minister Bimal Rathnayake on the Chemmani investigation (Tamil)', by: 'IBC Tamil', d: '2025-06-29', k: 'news', u: 'https://ibctamil.com/article/gover-investigation-into-chemmani-mass-grave-1751326774', note: 'The index gives the year only; the remarks were made in Jaffna on 29 June 2025.' },
  ad25:    { t: 'Third phase of Chemmani excavation postponed due to rainwater', by: 'Ada Derana', d: '2025-11-04', k: 'news', u: 'https://www.adaderana.lk/news.php?nid=114267' },
  tm26:    { t: 'Chemmani skeletal remains rise to 252', by: 'The Sunday Morning', d: '2026-05-17', k: 'news', u: 'https://www.themorning.lk/articles/m3cFPyqzr9QRuLOkJRSS' },
  en26:    { t: 'Sri Lanka’s Justice Minister, opposition clash over foreign help with Chemmani mass grave', by: 'EconomyNext', d: '2026-06-25', k: 'news', u: 'https://economynext.com/sri-lankas-justice-minister-opposition-clash-over-foreign-help-with-chemmani-mass-grave-276450/' },
  dm26:    { t: 'Excavation at Chemmani mass grave resumes today', by: 'Daily Mirror (Thevatharsan Sukinthan)', d: '2026-07-15', k: 'news', u: 'https://www.dailymirror.lk/breaking-news/Excavation-at-Chemmani-mass-grave-resumes-today/108-345686' },
  ct26:    { t: 'Chemmani mass grave excavations reach 100th day', by: 'Ceylon Today (T. Pratheepan)', d: '2026-08-09', k: 'news', u: 'https://ceylontoday.lk/2026/08/09/chemmani-mass-grave-excavations-reach-100th-day/' },
  jm0819:  { t: 'Chemmani excavation stops today with 582 sets of human remains identified', by: 'Jaffna Monitor', d: '2026-08-19', k: 'news', u: 'https://www.jaffnamonitor.com/chemmani-excavation-stops-today-with-582-sets-of-human-remains-identified/' },
  ibc0819: { t: 'Chemmani excavation completed; report to be submitted (Tamil)', by: 'IBC Tamil', d: '2026-08-19', k: 'news', u: 'https://ibctamil.com/article/chemmani-mass-grave-excavation-1787140429' },
  u260820: { t: 'Uthayan front page: third phase ends, 583 recovered so far', by: 'Uthayan', d: '2026-08-20', k: 'paper', u: NOOLAHAM },
  jm1020:  { t: 'First expert report on Chemmani mass grave raises epidemic or disaster as possible explanation', by: 'Jaffna Monitor', d: '2026-10-20', k: 'news', u: 'https://www.jaffnamonitor.com/first-expert-report-on-chemmani-mass-grave-raises-epidemic-or-disaster-as-possible-explanation/' },
  u261020: { t: 'Uthayan front page: court accepts CID request to question Somaratne Rajapakse', by: 'Uthayan', d: '2026-10-20', k: 'paper', u: NOOLAHAM },
  is1023:  { t: 'Chemmani: archaeologist’s report questions clandestine grave claims', by: 'The Island', d: '2026-10-23', k: 'news', u: 'https://island.lk/chemmani-archaeologists-report-questions-clandestine-grave-claims/' },
  jm1023:  { t: 'Lawyers for Chemmani families accuse archaeologist of dropping “mass grave” from report', by: 'Jaffna Monitor', d: '2026-10-23', k: 'news', u: 'https://www.jaffnamonitor.com/lawyers-for-chemmani-families-accuse-archaeologist-of-dropping-mass-grave-from-report/' },
  st1025n: { t: 'Chemmani is a burial ground, not a mass grave: Report', by: 'The Sunday Times (S. Rubatheesan)', d: '2026-10-25', k: 'news', u: 'https://www.sundaytimes.lk/261025/news/chemmani-is-a-burial-ground-not-a-mass-grave-report-662068.html', note: 'The headline is the paper’s framing. The report does not use the words “not a mass grave”.' },
  st1025c: { t: 'Chemmani report sparks protest by Northern MPs (political column)', by: 'The Sunday Times', d: '2026-10-25', k: 'news', u: 'https://www.sundaytimes.lk/261025/columns/chemmani-report-sparks-protest-by-northern-mps-662021.html' },
  nw1117:  { t: 'Relatives of missing persons protest demanding international probe into Chemmani mass grave', by: 'Newswire', d: '2026-11-17', k: 'news', u: 'https://www.newswire.lk/2026/11/17/relatives-of-missing-persons-protest-demanding-international-probe-into-chemmani-mass-grave/' },
  jm1120:  { t: 'Chemmani magistrate says court need not rely on archaeologist’s report', by: 'Jaffna Monitor', d: '2026-11-20', k: 'news', u: 'https://www.jaffnamonitor.com/featured/chemmani-magistrate-says-court-need-not-rely-on-archaeologists-report/' },
  jz1120:  { t: 'Magistrate’s remarks at the Chemmani hearing (Tamil)', by: 'JaffnaZone', d: '2026-11-20', k: 'news', u: 'https://jaffnazone.com/news/62929' },
  ibc1120: { t: 'Chemmani skeletal remains not buried in the normal way: court (Tamil)', by: 'IBC Tamil', d: '2026-11-20', k: 'news', u: 'https://ibctamil.com/article/case-in-chemmani-jaffna-1795186623' },
  gtn1120: { t: 'Magistrate’s remarks at the Chemmani hearing (Tamil)', by: 'Global Tamil News', d: '2026-11-20', k: 'news', u: 'https://globaltamilnews.net/2026/237461/' },
  bn1120:  { t: 'Court permits analysis of bone samples (Tamil)', by: 'Battinews', d: '2026-11-20', k: 'news', u: 'https://www.battinews.com/2026/11/blog-post_3885.html' },
  u980705: { t: 'Uthayan front page: “Search the Chemmani area”, PLOTE asks the President', by: 'Uthayan', d: '1998-07-05', k: 'paper', u: NOOLAHAM },
  u990617: { t: 'Uthayan front page: Rajapakse says he is ready to show 10 grave sites', by: 'Uthayan', d: '1999-06-17', k: 'paper', u: NOOLAHAM },
  u990618: { t: 'Uthayan front page: two skeletons recovered; magistrate orders digging finished before the rains', by: 'Uthayan', d: '1999-06-18', k: 'paper', u: NOOLAHAM },
  u250626: { t: 'Uthayan front page: UN High Commissioner Volker Türk visits Chemmani', by: 'Uthayan', d: '2025-06-26', k: 'paper', u: NOOLAHAM }
};

/* Items in the evidence index that AAMA has not been able to read or verify. */
CH.UNVERIFIED = [
  ['Volker Türk, UN High Commissioner for Human Rights, at Chemmani', '25 June 2025', 'https://www.youtube.com/watch?v=cyz4J2LpplM'],
  ['Minister Bimal Rathnayake, Jaffna', '29 June 2025', 'https://www.youtube.com/watch?v=8rMm7TZ4eao'],
  ['Lawyer V.S. Niranjan, with site and court footage, Newsfirst Tamil', '3 November 2025', 'https://www.youtube.com/watch?v=K4InT7VGj7M'],
  ['Justice Minister Harshana Nanayakkara in Parliament', '25 June 2026', 'https://www.youtube.com/watch?v=O6DZVGveODo'],
  ['Gajendrakumar Ponnambalam MP in Parliament', '22 October 2026', 'https://www.youtube.com/watch?v=-s79eSda1Go'],
  ['K.S. Ratnavel PC, Mirak Raheem (OMP) and M.A. Sumanthiran PC after the hearing, Newsfirst Tamil', '19 November 2026', 'https://www.youtube.com/watch?v=jgtKmD2DsDg'],
  ['Jaffna court footage, Newsfirst', '19 November 2026', 'https://www.youtube.com/watch?v=yU3Nee7n9Xs'],
  ['M.A. Sumanthiran PC, National Tamil TV', '20 November 2026', 'https://www.youtube.com/watch?v=JpwovBL0j40'],
  ['Ramanathan Archchuna MP and Justice Minister Harshana Nanayakkara in Parliament', '21 November 2026', 'https://www.youtube.com/watch?v=-bfoEwpTyqY']
];
