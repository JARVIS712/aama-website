/* global window */
// ===== i18n =====
// English is the source. Tamil and Sinhala are first-pass translations and
// need a native-speaker review before launch. The Paperly feedback lines are
// taken word for word from the Paperly brand strategy.
// Any key missing from ta/si falls back to English (see deepMerge below).

const en = {
  nav: { practices: 'What we do', paperly: 'Paperly', engine: 'Intelligence', media: 'Media', contact: 'Contact' },
  hero: {
    eyebrow: 'AAMA / MEDIA + TECHNOLOGY / COLOMBO · JAFFNA',
    h1a: 'Media, engineered.',
    h1b: 'Technology, made ',
    h1c: 'local.',
    sub: 'AAMA is a Sri Lankan media and technology company. We run newsrooms, podcasts and data-led campaigns, and we build our own software in Sinhala, Tamil and English. Our first product is Paperly, the exam-practice app that marks every past paper.',
    ctaPrimary: 'Meet Paperly',
    ctaSecondary: 'What we do',
    coords: '06.9271° N · 79.8612° E'
  },
  card: {
    badge: 'Sample answer',
    subject: 'A/L PHYSICS · STRUCTURED',
    question: 'A 12 V battery is connected across a 6 Ω resistor. Calculate the current through the resistor.',
    scheme: [
      { label: "Ohm's law, V = IR", marks: '1/1', ok: true },
      { label: 'Correct substitution', marks: '1/1', ok: true },
      { label: 'Final answer with unit (A)', marks: '0/2', ok: false }
    ],
    total: 'Mark',
    feedback: "You lost 2 marks here. Add the unit and you'll get them back.",
    margin: 'unit?'
  },
  practices: {
    label: 'What we do',
    h2a: 'Three practices. ',
    h2b: 'One studio.',
    intro: 'We started in political media. We now build technology too. All three practices share the same people, the same data discipline and the same three languages.',
    items: [
      { n: '01', tag: 'MEDIA', title: 'Newsrooms and podcasts', body: 'AAMA News, an AI-curated political newsroom, and AAMA Talks, long-form conversations in Tamil.', links: ['AAMA News', 'AAMA Talks'], href: '#media', cta: 'Our media' },
      { n: '02', tag: 'INTELLIGENCE', title: 'Campaign intelligence', body: 'Predictive voter analytics, trilingual sentiment mapping and secured campaign infrastructure for Sri Lankan elections.', links: ['Predictive analytics', 'Sentiment mapping', 'Cyber infrastructure'], href: '#engine', cta: 'The Engine' },
      { n: '03', tag: 'TECHNOLOGY', title: 'Products and platforms', body: 'Software we design, build and run ourselves, for people who live and learn in Sinhala, Tamil and English.', links: ['Paperly', 'More in development'], href: '#paperly', cta: 'Meet Paperly', isNew: true }
    ],
    newLabel: 'New'
  },
  paperly: {
    by: 'by AAMA',
    status: 'In development · Sri Lanka first',
    h2: 'Every paper, marked.',
    sub: "Paperly is an exam-practice app that marks students' written answers against the official marking scheme, and shows exactly how to win back every lost mark, in Sinhala, Tamil or English.",
    quoteA: 'Others tell you the answer. ',
    quoteB: 'Paperly tells you why you lost the mark.',
    features: [
      { name: 'Papers', body: 'Every past paper, by year and by topic, with marking schemes, in three languages.' },
      { name: 'Mark', body: 'Type or photograph an answer. See the marks earned, the marks lost and the fix.' },
      { name: 'Progress', body: 'Topic tracking and a predicted grade, shared with parents every week.' },
      { name: 'Mock', body: 'A free Paperly National Mock each season, so every student knows where they stand.' }
    ],
    curriculaLabel: 'Built for',
    curricula: ['G.C.E. O/L', 'G.C.E. A/L', 'Cambridge', 'Pearson Edexcel', 'OxfordAQA'],
    stats: [
      { value: '790K', label: 'O/L and A/L candidates in Sri Lanka every year' },
      { value: '3', label: 'Languages, written natively, never translated line by line' },
      { value: '5M', label: 'School-leaving exam candidates a year across South Asia' }
    ],
    audiences: [
      { who: 'Students', head: 'Every paper, marked.', line: 'Practise any past paper and see why you lost each mark, in your language.' },
      { who: 'Parents', head: "Know how they're really doing.", line: 'A weekly progress report and a predicted grade before the exam.' },
      { who: 'Tuition teachers', head: 'Spend your time teaching, not marking.', line: 'Assign papers. Paperly marks them and shows who needs help.' },
      { who: 'Schools', head: 'Practice for every student.', line: 'Syllabus-aligned questions, automatic marking and class dashboards.' }
    ],
    launch: 'Launching in Sri Lanka with A/L Physical and Biological Science, then O/L and international boards. Built to grow across South Asia and Australia.',
    waitlistTitle: 'Join the waitlist',
    waitlistSub: "We'll tell you when Paperly opens for your subjects.",
    placeholder: 'you@example.com',
    cta: 'Join',
    statusDone: "You're on the list. We'll be in touch before launch.",
    site: 'paperly.academy'
  },
  engine: {
    label: 'Campaign intelligence',
    h2a: 'Not just strategy. ',
    h2b: 'Algorithmic precision.',
    intro: 'A machine-learning framework built for Sri Lankan and South Asian electoral data. Three pillars support every campaign we deploy.',
    pillars: [
      { tag: 'INFERENCE', title: 'Predictive Voter Analytics', body: 'Multivariate models trained on 12 years of electoral, demographic, and behavioural signal, surfacing swing turnout 90 days out.' },
      { tag: 'PERCEPTION', title: 'Automated Sentiment Mapping', body: 'Trilingual NLP across Tamil, Sinhala, and English social streams, mapped to district-level heat in near real time.' },
      { tag: 'INTEGRITY', title: 'Cyber-Secured Campaign Infrastructure', body: 'Air-gapped war rooms, end-to-end encrypted message logistics, and red-team rehearsed disinformation defence.' }
    ]
  },
  ecosystem: {
    label: 'Media',
    h2a: 'Our media. ',
    h2b: 'In our languages.',
    news: { tag: 'Freemium · AI News Delivery', desc: "An AI-curated newsroom focused on political integrity: Sri Lanka's daily political signal, distilled into one feed, free at the tier most readers need." },
    talks: { tag: 'Full-fledged Tamil Podcast', desc: 'Long-form Tamil-language conversations with organisers, journalists, and dissenting voices in Sri Lankan public life.' },
    roadmap: { tag: 'Roadmap', title: 'AAMA Atlas', desc: 'Interactive electoral cartography. Public release window: Q4.' },
    comingSoon: 'Coming soon'
  },
  impact: {
    label: 'By the numbers',
    h2a: 'Media roots. ',
    h2b: 'Technology reach.',
    stats: [
      { value: '3', label: 'Practices under one roof: media, campaign intelligence and technology' },
      { value: '3', label: 'Working languages, Tamil, Sinhala and English, in every product and feed' },
      { value: '12 yrs', label: 'District-level electoral, demographic and behavioural data behind the Engine' },
      { value: '2', label: 'Offices on the ground, in Colombo and Jaffna' }
    ]
  },
  process: {
    label: 'How we work',
    h2a: 'How we ',
    h2b: 'build things.',
    steps: [
      { n: '01', title: 'Listen', body: 'Start with the people it is for: voters, readers, students, parents and teachers. Interviews come before interfaces.' },
      { n: '02', title: 'Model', body: 'Get the data and the language right first: electoral records, syllabuses, marking schemes, in all three languages.' },
      { n: '03', title: 'Build', body: 'Design and engineer in-house, test with real users, and red-team anything sensitive before it goes live.' },
      { n: '04', title: 'Run', body: 'Ship, measure and keep improving, from election day to exam day.' }
    ]
  },
  faq: {
    label: 'FAQ',
    h2a: 'Questions ',
    h2b: 'worth asking.',
    items: [
      { q: 'Is AAMA still a political campaign company?', a: 'Yes. Campaign intelligence remains one of our three practices. We have added a technology practice that builds our own products, starting with Paperly.' },
      { q: 'What is Paperly?', a: "An exam-practice app for G.C.E. O/L and A/L students and for international boards such as Cambridge, Pearson Edexcel and OxfordAQA. Students practise past papers and get every answer marked against the marking scheme, with the fix explained in their own language." },
      { q: 'When does Paperly launch?', a: 'Paperly is in development. Sri Lanka comes first, starting with A/L Physical and Biological Science. Join the waitlist above to hear when it opens.' },
      { q: 'What does "trilingual" actually cover?', a: 'Tamil, Sinhala and English. Our newsrooms, models and products run natively in all three, not in English with translated labels.' },
      { q: 'How is campaign data kept secure?', a: 'Infrastructure runs air-gapped, with end-to-end encrypted message logistics and red-team rehearsed disinformation defence before deployment.' }
    ]
  },
  trust: {
    line: 'Everything we make runs on the same foundation.',
    items: ['Native Tamil · Sinhala · English', 'In-house design and engineering', '12 years of district-level records', 'Air-gapped, red-team-tested infrastructure']
  },
  deploy: {
    h2a: 'Have a project ',
    h2b: 'in mind?',
    sub: "Media, campaign or technology: leave your email and our team will reach out within 24 hours.",
    topicsLabel: 'I am interested in',
    topics: [
      { id: 'media', label: 'Media' },
      { id: 'campaign', label: 'Campaigns' },
      { id: 'technology', label: 'Technology' },
      { id: 'paperly', label: 'Paperly' }
    ],
    placeholder: 'you@example.com',
    cta: 'Get in touch',
    sendingLabel: 'Sending',
    sentLabel: 'Sent',
    statusSending: 'Sending your message...',
    statusDone: "Thanks. We'll be in touch within 24 hours.",
    statusErr: "That doesn't look like a valid email. Please try again.",
    statusFail: 'Something went wrong. Please try again or email us directly.'
  },
  footer: {
    sub: 'A Sri Lankan media and technology company. Newsrooms, campaigns and software, in three languages.',
    cols: ['Media', 'Intelligence', 'Technology', 'Office'],
    paperlyWaitlist: 'Paperly waitlist',
    office: ['Colombo', 'Jaffna', 'Press Inquiries'],
    legal: 'AAMA · Aadhi Media Agency Pvt Ltd'
  }
};

const ta = {
  nav: { practices: 'எங்கள் பணி', paperly: 'Paperly', engine: 'நுண்ணறிவு', media: 'ஊடகம்', contact: 'தொடர்பு' },
  hero: {
    eyebrow: 'AAMA / ஊடகம் + தொழில்நுட்பம் / கொழும்பு · யாழ்ப்பாணம்',
    h1a: 'தொழில்நுட்பத்துடன் ஊடகம்.',
    h1b: 'தொழில்நுட்பம், நம் ',
    h1c: 'மொழியில்.',
    sub: 'AAMA இலங்கையின் ஊடக மற்றும் தொழில்நுட்ப நிறுவனம். செய்தியறைகள், பாட்காஸ்ட்கள், தரவு சார்ந்த பிரச்சாரங்களை நடத்துகிறோம்; சிங்களம், தமிழ், ஆங்கிலத்தில் எங்கள் சொந்த மென்பொருளையும் உருவாக்குகிறோம். எங்கள் முதல் தயாரிப்பு Paperly: ஒவ்வொரு கடந்த கால வினாத்தாளையும் மதிப்பிடும் பரீட்சைப் பயிற்சி செயலி.',
    ctaPrimary: 'Paperly-ஐ அறிமுகம் செய்க',
    ctaSecondary: 'எங்கள் பணி'
  },
  card: {
    badge: 'மாதிரி விடை',
    subject: 'உ/த பௌதிகவியல் · கட்டமைப்பு வினா',
    question: '12 V மின்கலம் 6 Ω மின்தடையுடன் இணைக்கப்பட்டுள்ளது. மின்தடையினூடான மின்னோட்டத்தைக் கணிக்க.',
    scheme: [
      { label: 'ஓமின் விதி, V = IR', marks: '1/1', ok: true },
      { label: 'சரியான பிரதியீடு', marks: '1/1', ok: true },
      { label: 'அலகுடன் இறுதி விடை (A)', marks: '0/2', ok: false }
    ],
    total: 'புள்ளி',
    feedback: 'இங்கே 2 மதிப்பெண்கள் இழந்தீர்கள். அலகைச் சேர்த்தால் அவை திரும்பக் கிடைக்கும்.',
    margin: 'அலகு?'
  },
  practices: {
    label: 'எங்கள் பணி',
    h2a: 'மூன்று துறைகள். ',
    h2b: 'ஒரே குழு.',
    intro: 'அரசியல் ஊடகத்தில் தொடங்கினோம். இப்போது தொழில்நுட்பத்தையும் உருவாக்குகிறோம். மூன்று துறைகளும் ஒரே மக்கள், ஒரே தரவு ஒழுக்கம், ஒரே மூன்று மொழிகளைப் பகிர்கின்றன.',
    items: [
      { n: '01', tag: 'MEDIA', title: 'செய்தியறைகள் மற்றும் பாட்காஸ்ட்கள்', body: 'AI-தொகுக்கப்பட்ட அரசியல் செய்தியறையான AAMA News, தமிழில் நீண்ட உரையாடல்களான AAMA Talks.', links: ['AAMA News', 'AAMA Talks'], href: '#media', cta: 'எங்கள் ஊடகம்' },
      { n: '02', tag: 'INTELLIGENCE', title: 'பிரச்சார நுண்ணறிவு', body: 'இலங்கைத் தேர்தல்களுக்கான முன்கணிப்பு வாக்காளர் பகுப்பாய்வு, மும்மொழி உணர்வு வரைபடமாக்கல், பாதுகாக்கப்பட்ட பிரச்சார உள்கட்டமைப்பு.', links: ['முன்கணிப்பு பகுப்பாய்வு', 'உணர்வு வரைபடம்', 'சைபர் உள்கட்டமைப்பு'], href: '#engine', cta: 'எஞ்சின்' },
      { n: '03', tag: 'TECHNOLOGY', title: 'தயாரிப்புகள் மற்றும் தளங்கள்', body: 'சிங்களம், தமிழ், ஆங்கிலத்தில் வாழ்ந்து கற்கும் மக்களுக்காக நாங்களே வடிவமைத்து, உருவாக்கி, இயக்கும் மென்பொருள்.', links: ['Paperly', 'மேலும் வளர்ச்சியில்'], href: '#paperly', cta: 'Paperly-ஐ அறிமுகம் செய்க', isNew: true }
    ],
    newLabel: 'புதிது'
  },
  paperly: {
    status: 'வளர்ச்சியில் · முதலில் இலங்கை',
    h2: 'ஒவ்வொரு வினாத்தாளும், மதிப்பிடப்பட்டது.',
    sub: 'Paperly என்பது மாணவர்களின் எழுத்து விடைகளை அதிகாரப்பூர்வ புள்ளித்திட்டத்துடன் ஒப்பிட்டு மதிப்பிடும் பரீட்சைப் பயிற்சி செயலி. இழந்த ஒவ்வொரு புள்ளியையும் எப்படித் திரும்பப் பெறுவது என்பதைச் சிங்களம், தமிழ் அல்லது ஆங்கிலத்தில் காட்டுகிறது.',
    quoteA: 'மற்றவர்கள் விடையைச் சொல்கிறார்கள். ',
    quoteB: 'Paperly நீங்கள் ஏன் புள்ளியை இழந்தீர்கள் என்று சொல்கிறது.',
    features: [
      { name: 'Papers', body: 'ஒவ்வொரு கடந்த கால வினாத்தாளும், ஆண்டு வாரியாகவும் பாட வாரியாகவும், புள்ளித்திட்டங்களுடன், மூன்று மொழிகளில்.' },
      { name: 'Mark', body: 'விடையைத் தட்டச்சு செய்யுங்கள் அல்லது படம் எடுங்கள். பெற்ற புள்ளிகள், இழந்த புள்ளிகள், திருத்தம் ஆகியவற்றைப் பாருங்கள்.' },
      { name: 'Progress', body: 'பாட வாரியான முன்னேற்றமும் கணிக்கப்பட்ட தரமும், ஒவ்வொரு வாரமும் பெற்றோருடன் பகிரப்படும்.' },
      { name: 'Mock', body: 'ஒவ்வொரு பருவத்திலும் இலவச Paperly தேசிய மாதிரிப் பரீட்சை.' }
    ],
    curriculaLabel: 'இவற்றுக்காக',
    curricula: ['க.பொ.த சா/த', 'க.பொ.த உ/த', 'Cambridge', 'Pearson Edexcel', 'OxfordAQA'],
    stats: [
      { value: '790K', label: 'ஒவ்வொரு ஆண்டும் இலங்கையில் சா/த, உ/த பரீட்சார்த்திகள்' },
      { value: '3', label: 'மொழிகள், இயல்பாக எழுதப்பட்டவை, வரிக்கு வரி மொழிபெயர்க்கப்பட்டவை அல்ல' },
      { value: '5M', label: 'தெற்காசியா முழுவதும் ஆண்டுதோறும் பாடசாலை இறுதிப் பரீட்சார்த்திகள்' }
    ],
    audiences: [
      { who: 'மாணவர்கள்', head: 'ஒவ்வொரு வினாத்தாளும், மதிப்பிடப்பட்டது.', line: 'எந்த வினாத்தாளையும் பயிற்சி செய்து, ஒவ்வொரு புள்ளியையும் ஏன் இழந்தீர்கள் என்று உங்கள் மொழியில் பாருங்கள்.' },
      { who: 'பெற்றோர்', head: 'அவர்கள் உண்மையில் எப்படிச் செய்கிறார்கள் என்று அறியுங்கள்.', line: 'வாராந்திர முன்னேற்ற அறிக்கையும் பரீட்சைக்கு முன் கணிக்கப்பட்ட தரமும்.' },
      { who: 'தனியார் வகுப்பு ஆசிரியர்கள்', head: 'மதிப்பிடுவதற்கல்ல, கற்பிப்பதற்கு நேரம் செலவிடுங்கள்.', line: 'வினாத்தாள்களை வழங்குங்கள். Paperly மதிப்பிட்டு, யாருக்கு உதவி தேவை என்று காட்டும்.' },
      { who: 'பாடசாலைகள்', head: 'ஒவ்வொரு மாணவருக்கும் பயிற்சி.', line: 'பாடத்திட்டத்துக்கு ஏற்ற வினாக்கள், தானியங்கு மதிப்பீடு, வகுப்பு டாஷ்போர்டுகள்.' }
    ],
    launch: 'உ/த பௌதிக மற்றும் உயிரியல் விஞ்ஞானத்துடன் இலங்கையில் அறிமுகம்; பின்னர் சா/த மற்றும் சர்வதேசப் பாடத்திட்டங்கள். தெற்காசியா மற்றும் அவுஸ்திரேலியா முழுவதும் வளர உருவாக்கப்பட்டது.',
    waitlistTitle: 'காத்திருப்புப் பட்டியலில் சேருங்கள்',
    waitlistSub: 'உங்கள் பாடங்களுக்கு Paperly திறக்கும்போது அறிவிப்போம்.',
    cta: 'சேர்',
    statusDone: 'பட்டியலில் சேர்ந்துவிட்டீர்கள். அறிமுகத்துக்கு முன் தொடர்பு கொள்வோம்.'
  },
  engine: {
    label: 'பிரச்சார நுண்ணறிவு',
    h2a: 'வெறும் மூலோபாயம் மட்டுமல்ல. ',
    h2b: 'வழிமுறைத் துல்லியம்.',
    intro: 'இலங்கை மற்றும் தென்னாசிய தேர்தல் தரவுக்கென வடிவமைக்கப்பட்ட இயந்திரக் கற்றல் கட்டமைப்பு. நாங்கள் நடத்தும் ஒவ்வொரு பிரச்சாரத்தையும் மூன்று தூண்கள் ஆதரிக்கின்றன.',
    pillars: [
      { tag: 'INFERENCE', title: 'முன்கணிப்பு வாக்காளர் பகுப்பாய்வு', body: '12 ஆண்டுகால தேர்தல், மக்கள்தொகை, மற்றும் நடத்தை தரவுகளால் பயிற்றுவிக்கப்பட்ட பல்மாறி மாதிரிகள், வாக்குப்பதிவு மாற்றத்தை 90 நாட்களுக்கு முன்னரே கணிக்கின்றன.' },
      { tag: 'PERCEPTION', title: 'தானியங்கு உணர்வு வரைபடமாக்கல்', body: 'தமிழ், சிங்களம், ஆங்கிலம் ஆகிய மூன்று மொழிகளிலான சமூக ஊடக தரவுகளை பகுப்பாய்வு செய்யும் மும்மொழி NLP, மாவட்ட அளவிலான வெப்ப-வரைபடமாக கிட்டத்தட்ட நேரடியாக காட்டப்படுகிறது.' },
      { tag: 'INTEGRITY', title: 'சைபர்-பாதுகாக்கப்பட்ட பிரச்சார உள்கட்டமைப்பு', body: 'வெளி இணைப்பற்ற போர் அறைகள், முனை-க்கு-முனை மறையாக்கம் செய்யப்பட்ட செய்தி பரிமாற்றம், மற்றும் ரெட்-டீம் பயிற்சி பெற்ற தவறான தகவல் தடுப்பு.' }
    ]
  },
  ecosystem: {
    label: 'ஊடகம்',
    h2a: 'எங்கள் ஊடகம். ',
    h2b: 'எங்கள் மொழிகளில்.',
    news: { tag: 'இலவசம் · AI செய்தி வழங்கல்', desc: 'அரசியல் நேர்மையை மையமாகக் கொண்ட AI-தொகுக்கப்பட்ட செய்தியறை: இலங்கையின் அன்றாட அரசியல் சமிக்ஞையை ஒரே ஊட்டமாக வடிகட்டுகிறது, பெரும்பாலான வாசகர்களுக்குத் தேவையான நிலையில் இலவசமாக.' },
    talks: { tag: 'முழு அளவிலான தமிழ் பாட்காஸ்ட்', desc: 'இலங்கையின் பொதுவாழ்வில் அமைப்பாளர்கள், பத்திரிகையாளர்கள், மற்றும் மாற்றுக் குரல்களுடன் நீண்ட-நேர தமிழ்-மொழி உரையாடல்கள்.' },
    roadmap: { tag: 'திட்டப்பாதை', title: 'AAMA அட்லஸ்', desc: 'ஊடாடும் தேர்தல் புவியியல் வரைபடம். பொது வெளியீட்டு காலம்: நான்காம் காலாண்டு (Q4).' },
    comingSoon: 'விரைவில் வருகிறது'
  },
  impact: {
    label: 'எண்களில்',
    h2a: 'ஊடக வேர்கள். ',
    h2b: 'தொழில்நுட்ப வீச்சு.',
    stats: [
      { value: '3', label: 'ஒரே கூரையின் கீழ் துறைகள்: ஊடகம், பிரச்சார நுண்ணறிவு, தொழில்நுட்பம்' },
      { value: '3', label: 'ஒவ்வொரு தயாரிப்பிலும் ஊட்டத்திலும் இயங்கும் மொழிகள்: தமிழ், சிங்களம், ஆங்கிலம்' },
      { value: '12 ஆண்டுகள்', label: 'எஞ்சினுக்குப் பின்னால் உள்ள மாவட்ட அளவிலான தேர்தல், மக்கள்தொகை, நடத்தை தரவு' },
      { value: '2', label: 'கொழும்பு மற்றும் யாழ்ப்பாணத்தில் களப் பணியகங்கள்' }
    ]
  },
  process: {
    label: 'எங்கள் வழிமுறை',
    h2a: 'நாங்கள் எப்படி ',
    h2b: 'உருவாக்குகிறோம்.',
    steps: [
      { n: '01', title: 'கேட்டல்', body: 'யாருக்காக உருவாக்குகிறோமோ அவர்களிடமிருந்து தொடங்குகிறோம்: வாக்காளர்கள், வாசகர்கள், மாணவர்கள், பெற்றோர், ஆசிரியர்கள்.' },
      { n: '02', title: 'மாதிரி', body: 'முதலில் தரவும் மொழியும் சரியாக இருக்க வேண்டும்: தேர்தல் பதிவுகள், பாடத்திட்டங்கள், புள்ளித்திட்டங்கள், மூன்று மொழிகளிலும்.' },
      { n: '03', title: 'உருவாக்கம்', body: 'உள்ளகமாக வடிவமைத்துப் பொறியியல் செய்கிறோம், உண்மையான பயனர்களுடன் சோதிக்கிறோம்.' },
      { n: '04', title: 'இயக்கம்', body: 'தேர்தல் நாள் முதல் பரீட்சை நாள் வரை, வெளியிட்டு, அளந்து, மேம்படுத்துகிறோம்.' }
    ]
  },
  faq: {
    label: 'கேள்விகள்',
    h2a: 'கேட்கத் தகுந்த ',
    h2b: 'கேள்விகள்.',
    items: [
      { q: 'AAMA இன்னும் அரசியல் பிரச்சார நிறுவனமா?', a: 'ஆம். பிரச்சார நுண்ணறிவு எங்கள் மூன்று துறைகளில் ஒன்றாகத் தொடர்கிறது. எங்கள் சொந்த தயாரிப்புகளை உருவாக்கும் தொழில்நுட்பத் துறையைச் சேர்த்துள்ளோம், Paperly முதலாவது.' },
      { q: 'Paperly என்றால் என்ன?', a: 'க.பொ.த சா/த, உ/த மாணவர்களுக்கும் Cambridge, Pearson Edexcel, OxfordAQA போன்ற சர்வதேசப் பாடத்திட்டங்களுக்குமான பரீட்சைப் பயிற்சி செயலி. ஒவ்வொரு விடையும் புள்ளித்திட்டத்துடன் மதிப்பிடப்பட்டு, திருத்தம் உங்கள் மொழியில் விளக்கப்படுகிறது.' },
      { q: 'Paperly எப்போது அறிமுகமாகும்?', a: 'Paperly வளர்ச்சியில் உள்ளது. உ/த பௌதிக மற்றும் உயிரியல் விஞ்ஞானத்துடன் முதலில் இலங்கை. அறிய மேலே உள்ள காத்திருப்புப் பட்டியலில் சேருங்கள்.' },
      { q: '"மும்மொழி" என்பது உண்மையில் எதை உள்ளடக்குகிறது?', a: 'தமிழ், சிங்களம், ஆங்கிலம். எங்கள் செய்தியறைகள், மாதிரிகள், தயாரிப்புகள் மூன்று மொழிகளிலும் இயல்பாக இயங்குகின்றன.' },
      { q: 'பிரச்சார தரவு எப்படி பாதுகாக்கப்படுகிறது?', a: 'உள்கட்டமைப்பு வெளி இணைப்பற்றதாக இயங்குகிறது, முனை-க்கு-முனை மறையாக்கம் செய்யப்பட்ட செய்தி பரிமாற்றம் மற்றும் நேரடியாகும் முன் ரெட்-டீம் தவறான தகவல் தடுப்புடன்.' }
    ]
  },
  trust: {
    line: 'நாங்கள் உருவாக்கும் அனைத்தும் ஒரே அடித்தளத்தில் இயங்குகின்றன.',
    items: ['இயல்பான தமிழ் · சிங்களம் · ஆங்கிலம்', 'உள்ளக வடிவமைப்பு மற்றும் பொறியியல்', '12 ஆண்டுகால மாவட்ட அளவிலான பதிவுகள்', 'வெளி இணைப்பற்ற, ரெட்-டீம் சோதிக்கப்பட்ட உள்கட்டமைப்பு']
  },
  deploy: {
    h2a: 'உங்களிடம் ஒரு திட்டம் ',
    h2b: 'உள்ளதா?',
    sub: 'ஊடகம், பிரச்சாரம் அல்லது தொழில்நுட்பம்: உங்கள் மின்னஞ்சலைப் பகிருங்கள், எங்கள் குழு 24 மணி நேரத்திற்குள் தொடர்பு கொள்ளும்.',
    topicsLabel: 'எனக்கு ஆர்வம்',
    topics: [
      { id: 'media', label: 'ஊடகம்' },
      { id: 'campaign', label: 'பிரச்சாரம்' },
      { id: 'technology', label: 'தொழில்நுட்பம்' },
      { id: 'paperly', label: 'Paperly' }
    ],
    cta: 'தொடர்பு கொள்ளுங்கள்',
    sendingLabel: 'அனுப்புகிறது',
    sentLabel: 'அனுப்பப்பட்டது',
    statusSending: 'உங்கள் செய்தி அனுப்பப்படுகிறது...',
    statusDone: 'நன்றி. 24 மணி நேரத்திற்குள் தொடர்பு கொள்வோம்.',
    statusErr: 'சரியான மின்னஞ்சல் அல்ல. மீண்டும் முயற்சிக்கவும்.',
    statusFail: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக எங்களுக்கு மின்னஞ்சல் அனுப்பவும்.'
  },
  footer: {
    sub: 'இலங்கையின் ஊடக மற்றும் தொழில்நுட்ப நிறுவனம். செய்தியறைகள், பிரச்சாரங்கள், மென்பொருள், மூன்று மொழிகளில்.',
    cols: ['ஊடகம்', 'நுண்ணறிவு', 'தொழில்நுட்பம்', 'அலுவலகம்'],
    paperlyWaitlist: 'Paperly காத்திருப்புப் பட்டியல்',
    office: ['கொழும்பு', 'யாழ்ப்பாணம்', 'பத்திரிக்கை விசாரணை'],
    legal: 'AAMA · ஆதி மீடியா ஏஜென்சி (பிரைவேட்) லிமிடெட்'
  }
};

const si = {
  nav: { practices: 'අප කරන දේ', paperly: 'Paperly', engine: 'බුද්ධිය', media: 'මාධ්‍ය', contact: 'සම්බන්ධ වන්න' },
  hero: {
    eyebrow: 'AAMA / මාධ්‍ය + තාක්ෂණය / කොළඹ · යාපනය',
    h1a: 'තාක්ෂණය සමඟ මාධ්‍ය.',
    h1b: 'තාක්ෂණය, අපේ ',
    h1c: 'භාෂාවෙන්.',
    sub: 'AAMA යනු ශ්‍රී ලාංකික මාධ්‍ය හා තාක්ෂණ සමාගමකි. අපි පුවත් කාමර, පොඩ්කාස්ට් සහ දත්ත මත පදනම් වූ ව්‍යාපාර මෙහෙයවන අතර සිංහල, දෙමළ සහ ඉංග්‍රීසියෙන් අපේම මෘදුකාංග ද නිර්මාණය කරමු. අපේ පළමු නිෂ්පාදනය Paperly: සෑම පසුගිය ප්‍රශ්න පත්‍රයක්ම ලකුණු කරන විභාග පුහුණු යෙදුම.',
    ctaPrimary: 'Paperly හඳුනාගන්න',
    ctaSecondary: 'අප කරන දේ'
  },
  card: {
    badge: 'නියැදි පිළිතුර',
    subject: 'උ/පෙළ භෞතික විද්‍යාව · ව්‍යුහගත',
    question: '12 V බැටරියක් 6 Ω ප්‍රතිරෝධකයකට සම්බන්ධ කර ඇත. ප්‍රතිරෝධකය හරහා ධාරාව ගණනය කරන්න.',
    scheme: [
      { label: 'ඕම් නියමය, V = IR', marks: '1/1', ok: true },
      { label: 'නිවැරදි ආදේශය', marks: '1/1', ok: true },
      { label: 'ඒකකය සමඟ අවසාන පිළිතුර (A)', marks: '0/2', ok: false }
    ],
    total: 'ලකුණු',
    feedback: 'මෙතැනදී ලකුණු 2ක් අඩු වුණා. ඒකකය එකතු කළොත් ඒවා ආපහු ලැබෙනවා.',
    margin: 'ඒකකය?'
  },
  practices: {
    label: 'අප කරන දේ',
    h2a: 'අංශ තුනක්. ',
    h2b: 'එක් කණ්ඩායමක්.',
    intro: 'අපි ආරම්භ කළේ දේශපාලන මාධ්‍යයෙනි. දැන් අපි තාක්ෂණය ද ගොඩනගමු. අංශ තුනම එකම පිරිස, එකම දත්ත විනය සහ එකම භාෂා තුන බෙදා ගනී.',
    items: [
      { n: '01', tag: 'MEDIA', title: 'පුවත් කාමර සහ පොඩ්කාස්ට්', body: 'AI-සංස්කරණය කළ දේශපාලන පුවත් කාමරයක් වන AAMA News, සහ දෙමළ භාෂාවෙන් දිගු සංවාද වන AAMA Talks.', links: ['AAMA News', 'AAMA Talks'], href: '#media', cta: 'අපේ මාධ්‍ය' },
      { n: '02', tag: 'INTELLIGENCE', title: 'ව්‍යාපාර බුද්ධිය', body: 'ශ්‍රී ලංකා මැතිවරණ සඳහා පුරෝකථන ඡන්දදායක විශ්ලේෂණය, ත්‍රිභාෂා හැඟීම් සිතියම්කරණය සහ ආරක්ෂිත ව්‍යාපාර යටිතල පහසුකම්.', links: ['පුරෝකථන විශ්ලේෂණය', 'හැඟීම් සිතියම්කරණය', 'සයිබර් යටිතල පහසුකම්'], href: '#engine', cta: 'එන්ජිම' },
      { n: '03', tag: 'TECHNOLOGY', title: 'නිෂ්පාදන සහ වේදිකා', body: 'සිංහල, දෙමළ සහ ඉංග්‍රීසියෙන් ජීවත් වන හා ඉගෙන ගන්නා අය සඳහා අපම නිර්මාණය කර, ගොඩනගා, ක්‍රියාත්මක කරන මෘදුකාංග.', links: ['Paperly', 'තවත් සංවර්ධනයේ'], href: '#paperly', cta: 'Paperly හඳුනාගන්න', isNew: true }
    ],
    newLabel: 'නව'
  },
  paperly: {
    status: 'සංවර්ධනයේ · පළමුව ශ්‍රී ලංකාව',
    h2: 'සෑම ප්‍රශ්න පත්‍රයක්ම, ලකුණු කර.',
    sub: 'Paperly යනු සිසුන්ගේ ලිඛිත පිළිතුරු නිල ලකුණු දීමේ පටිපාටියට අනුව ලකුණු කරන විභාග පුහුණු යෙදුමකි. අහිමි වූ සෑම ලකුණක්ම ආපසු ලබා ගන්නා ආකාරය සිංහල, දෙමළ හෝ ඉංග්‍රීසියෙන් පෙන්වයි.',
    quoteA: 'අනෙක් අය ඔබට පිළිතුර කියයි. ',
    quoteB: 'Paperly ඔබට ලකුණ අහිමි වූයේ ඇයිදැයි කියයි.',
    features: [
      { name: 'Papers', body: 'සෑම පසුගිය ප්‍රශ්න පත්‍රයක්ම, වසර අනුව හා මාතෘකාව අනුව, ලකුණු දීමේ පටිපාටි සමඟ, භාෂා තුනෙන්.' },
      { name: 'Mark', body: 'පිළිතුර ටයිප් කරන්න හෝ ඡායාරූපයක් ගන්න. ලැබූ ලකුණු, අහිමි වූ ලකුණු සහ නිවැරදි කිරීම බලන්න.' },
      { name: 'Progress', body: 'මාතෘකා අනුව ප්‍රගතිය සහ පුරෝකථිත ශ්‍රේණිය, සෑම සතියකම දෙමාපියන් සමඟ බෙදා ගැනේ.' },
      { name: 'Mock', body: 'සෑම වාරයකම නොමිලේ Paperly ජාතික ආදර්ශ විභාගය.' }
    ],
    curriculaLabel: 'සඳහා නිර්මිත',
    curricula: ['අ.පො.ස. සා/පෙළ', 'අ.පො.ස. උ/පෙළ', 'Cambridge', 'Pearson Edexcel', 'OxfordAQA'],
    stats: [
      { value: '790K', label: 'සෑම වසරකම ශ්‍රී ලංකාවේ සා/පෙළ සහ උ/පෙළ අපේක්ෂකයින්' },
      { value: '3', label: 'භාෂා, ස්වභාවිකව ලියා ඇත, පේළියෙන් පේළිය පරිවර්තනය කර නැත' },
      { value: '5M', label: 'දකුණු ආසියාව පුරා වසරකට පාසල් අවසාන විභාග අපේක්ෂකයින්' }
    ],
    audiences: [
      { who: 'සිසුන්', head: 'සෑම ප්‍රශ්න පත්‍රයක්ම, ලකුණු කර.', line: 'ඕනෑම පසුගිය ප්‍රශ්න පත්‍රයක් පුහුණු වී, සෑම ලකුණක්ම අහිමි වූයේ ඇයිදැයි ඔබේ භාෂාවෙන් බලන්න.' },
      { who: 'දෙමාපියන්', head: 'ඔවුන් ඇත්තටම කොහොමද කියා දැනගන්න.', line: 'සතිපතා ප්‍රගති වාර්තාවක් සහ විභාගයට පෙර පුරෝකථිත ශ්‍රේණියක්.' },
      { who: 'ටියුෂන් ගුරුවරුන්', head: 'ලකුණු කිරීමට නොව, ඉගැන්වීමට කාලය යොදන්න.', line: 'ප්‍රශ්න පත්‍ර පවරන්න. Paperly ලකුණු කර, උදව් අවශ්‍ය කාටදැයි පෙන්වයි.' },
      { who: 'පාසල්', head: 'සෑම සිසුවෙකුටම පුහුණුව.', line: 'විෂය නිර්දේශයට ගැළපෙන ප්‍රශ්න, ස්වයංක්‍රීය ලකුණු කිරීම සහ පන්ති උපකරණ පුවරු.' }
    ],
    launch: 'උ/පෙළ භෞතික හා ජීව විද්‍යා විෂය ධාරා සමඟ ශ්‍රී ලංකාවේ දියත් කෙරේ; ඉන්පසු සා/පෙළ සහ ජාත්‍යන්තර විෂය නිර්දේශ. දකුණු ආසියාව සහ ඕස්ට්‍රේලියාව පුරා වර්ධනය වීමට නිර්මිතයි.',
    waitlistTitle: 'පොරොත්තු ලැයිස්තුවට එක්වන්න',
    waitlistSub: 'ඔබේ විෂයයන් සඳහා Paperly විවෘත වූ විට අපි දන්වන්නෙමු.',
    cta: 'එක්වන්න',
    statusDone: 'ඔබ ලැයිස්තුවේ සිටී. දියත් කිරීමට පෙර අපි සම්බන්ධ වෙමු.'
  },
  engine: {
    label: 'ව්‍යාපාර බුද්ධිය',
    h2a: 'උපායමාර්ගය පමණක් නොවේ. ',
    h2b: 'ඇල්ගොරිතමික නිරවද්‍යතාවය.',
    intro: 'ශ්‍රී ලංකා සහ දකුණු ආසියාවේ මැතිවරණ දත්ත සඳහා නිර්මාණය කළ යන්ත්‍ර ඉගෙනුම් රාමුවකි. අප දියත් කරන සෑම ව්‍යාපාරයක්ම කුළුණු තුනකින් සහාය ලබයි.',
    pillars: [
      { tag: 'INFERENCE', title: 'පුරෝකථන ඡන්දදායක විශ්ලේෂණය', body: 'වසර 12ක මැතිවරණ, ජනවිකාස, සහ හැසිරීම් සංඥා මත පුහුණු කරන ලද බහුවිචල්‍ය ආකෘති, දින 90කට පෙර පැනීමේ ප්‍රවණතාවය හඳුනා ගනී.' },
      { tag: 'PERCEPTION', title: 'ස්වයංක්‍රීය හැඟීම් සිතියම්කරණය', body: 'දෙමළ, සිංහල, ඉංග්‍රීසි යන භාෂා තුනෙන්ම සමාජ මාධ්‍ය ප්‍රවාහ විශ්ලේෂණය කරන ත්‍රිභාෂා NLP, දිස්ත්‍රික් මට්ටමේ තාප සිතියමකට පාහේ තථ්‍ය කාලීනව සිතියම්ගත කෙරේ.' },
      { tag: 'INTEGRITY', title: 'සයිබර්-ආරක්‍ෂිත ව්‍යාපාර යටිතල පහසුකම්', body: 'වාතාශ්‍රය-විරහිත යුධ කාමර, කෙළවරේ සිට කෙළවර දක්වා සංකේතනය කළ පණිවිඩ සැපයුම, සහ රතු-කණ්ඩායම් පුහුණු ව්‍යාජ තොරතුරු ප්‍රතිරෝධය.' }
    ]
  },
  ecosystem: {
    label: 'මාධ්‍ය',
    h2a: 'අපේ මාධ්‍ය. ',
    h2b: 'අපේ භාෂාවලින්.',
    news: { tag: 'නොමිලේ · AI පුවත් සැපයුම', desc: 'දේශපාලන අඛණ්ඩතාව වටා ගොඩනගා ඇති AI-සංස්කරණය කළ පුවත් කාමරයක්: ශ්‍රී ලංකාවේ දෛනික දේශපාලන සංඥාව එකම සම්පාදනයකට සකසයි, බොහෝ පාඨකයන්ට අවශ්‍ය මට්ටමින් නොමිලේ.' },
    talks: { tag: 'සම්පූර්ණ දෙමළ පොඩ්කාස්ට්', desc: 'ශ්‍රී ලාංකික මහජන ජීවිතයේ සංවිධායකයින්, පත්‍රකලාවේදීන්, සහ විරුද්ධ මත දරන්නන් සමඟ දිගු-ආකෘති දෙමළ-භාෂා සංවාද.' },
    roadmap: { tag: 'මාර්ග සිතියම', title: 'AAMA ඇට්ලස්', desc: 'අන්තර්ක්‍රියාකාරී මැතිවරණ සිතියම්කරණය. පොදු නිකුත් කිරීමේ කාලය: හතරවන කාර්තුව.' },
    comingSoon: 'ඉක්මනින් පැමිණේ'
  },
  impact: {
    label: 'සංඛ්‍යා අනුව',
    h2a: 'මාධ්‍ය මුල්. ',
    h2b: 'තාක්ෂණ ළඟාව.',
    stats: [
      { value: '3', label: 'එකම වහලක් යට අංශ: මාධ්‍ය, ව්‍යාපාර බුද්ධිය සහ තාක්ෂණය' },
      { value: '3', label: 'සෑම නිෂ්පාදනයකම හා සම්පාදනයකම ක්‍රියාත්මක භාෂා: දෙමළ, සිංහල, ඉංග්‍රීසි' },
      { value: 'වසර 12', label: 'එන්ජිම පිටුපස ඇති දිස්ත්‍රික් මට්ටමේ මැතිවරණ, ජනවිකාස සහ හැසිරීම් දත්ත' },
      { value: '2', label: 'කොළඹ සහ යාපනයේ ක්ෂේත්‍ර කාර්යාල' }
    ]
  },
  process: {
    label: 'අපේ ක්‍රමය',
    h2a: 'අපි ',
    h2b: 'ගොඩනගන ආකාරය.',
    steps: [
      { n: '01', title: 'සවන් දීම', body: 'එය කා සඳහාද ඔවුන්ගෙන් ආරම්භ කරමු: ඡන්දදායකයින්, පාඨකයින්, සිසුන්, දෙමාපියන් සහ ගුරුවරුන්.' },
      { n: '02', title: 'ආකෘතිය', body: 'පළමුව දත්ත සහ භාෂාව නිවැරදි කරමු: මැතිවරණ වාර්තා, විෂය නිර්දේශ, ලකුණු දීමේ පටිපාටි, භාෂා තුනෙන්ම.' },
      { n: '03', title: 'ගොඩනැගීම', body: 'ආයතනය තුළම නිර්මාණය හා ඉංජිනේරුකරණය කර, සැබෑ පරිශීලකයින් සමඟ පරීක්ෂා කරමු.' },
      { n: '04', title: 'ක්‍රියාත්මක කිරීම', body: 'මැතිවරණ දිනයේ සිට විභාග දිනය දක්වා, නිකුත් කර, මැන, දියුණු කරමු.' }
    ]
  },
  faq: {
    label: 'ප්‍රශ්න',
    h2a: 'අසන්න වටින ',
    h2b: 'ප්‍රශ්න.',
    items: [
      { q: 'AAMA තවමත් දේශපාලන ව්‍යාපාර සමාගමක්ද?', a: 'ඔව්. ව්‍යාපාර බුද්ධිය අපේ අංශ තුනෙන් එකක් ලෙස පවතී. අපේම නිෂ්පාදන ගොඩනගන තාක්ෂණ අංශයක් අපි එක් කර ඇත්තෙමු, පළමුවැන්න Paperly.' },
      { q: 'Paperly යනු කුමක්ද?', a: 'අ.පො.ස. සා/පෙළ, උ/පෙළ සිසුන් සහ Cambridge, Pearson Edexcel, OxfordAQA වැනි ජාත්‍යන්තර විෂය නිර්දේශ සඳහා විභාග පුහුණු යෙදුමකි. සෑම පිළිතුරක්ම පටිපාටියට අනුව ලකුණු කර, නිවැරදි කිරීම ඔබේ භාෂාවෙන් පැහැදිලි කරයි.' },
      { q: 'Paperly දියත් වන්නේ කවදාද?', a: 'Paperly සංවර්ධනයේ පවතී. උ/පෙළ භෞතික හා ජීව විද්‍යා සමඟ පළමුව ශ්‍රී ලංකාව. දැනගැනීමට ඉහත පොරොත්තු ලැයිස්තුවට එක්වන්න.' },
      { q: '"ත්‍රිභාෂා" ඇත්තටම ආවරණය කරන්නේ කුමක්ද?', a: 'දෙමළ, සිංහල, ඉංග්‍රීසි. අපේ පුවත් කාමර, ආකෘති සහ නිෂ්පාදන තුනෙන්ම ස්වභාවිකව ක්‍රියාත්මක වේ.' },
      { q: 'ව්‍යාපාර දත්ත ආරක්ෂා කරන්නේ කෙසේද?', a: 'යටිතල පහසුකම් වාතාශ්‍රය-විරහිතව ක්‍රියාත්මක වේ, කෙළවරේ සිට කෙළවර දක්වා සංකේතනය කළ පණිවිඩ සැපයුම සහ ක්‍රියාත්මක වීමට පෙර රතු-කණ්ඩායම් ව්‍යාජ තොරතුරු ප්‍රතිරෝධය සමඟ.' }
    ]
  },
  trust: {
    line: 'අප සාදන සෑම දෙයක්ම එකම පදනම මත ක්‍රියාත්මක වේ.',
    items: ['ස්වභාවික දෙමළ · සිංහල · ඉංග්‍රීසි', 'ආයතනය තුළම නිර්මාණය හා ඉංජිනේරුකරණය', 'වසර 12ක දිස්ත්‍රික් මට්ටමේ වාර්තා', 'වාතාශ්‍රය-විරහිත, රතු-කණ්ඩායම් පරීක්ෂිත යටිතල පහසුකම්']
  },
  deploy: {
    h2a: 'ඔබ සතුව ව්‍යාපෘතියක් ',
    h2b: 'තිබේද?',
    sub: 'මාධ්‍ය, ව්‍යාපාර හෝ තාක්ෂණය: ඔබේ විද්‍යුත් තැපෑල ලබා දෙන්න, අපගේ කණ්ඩායම පැය 24ක් ඇතුළත සම්බන්ධ වනු ඇත.',
    topicsLabel: 'මා උනන්දු',
    topics: [
      { id: 'media', label: 'මාධ්‍ය' },
      { id: 'campaign', label: 'ව්‍යාපාර' },
      { id: 'technology', label: 'තාක්ෂණය' },
      { id: 'paperly', label: 'Paperly' }
    ],
    cta: 'සම්බන්ධ වන්න',
    sendingLabel: 'යවමින්',
    sentLabel: 'යවන ලදී',
    statusSending: 'ඔබේ පණිවිඩය යවමින්...',
    statusDone: 'ස්තුතියි. පැය 24ක් ඇතුළත සම්බන්ධ වෙමු.',
    statusErr: 'එය වලංගු විද්‍යුත් තැපැල් ලිපිනයක් නොවේ. නැවත උත්සාහ කරන්න.',
    statusFail: 'යමක් වැරදුණි. නැවත උත්සාහ කරන්න හෝ අප වෙත සෘජුවම විද්‍යුත් තැපෑලක් යවන්න.'
  },
  footer: {
    sub: 'ශ්‍රී ලාංකික මාධ්‍ය හා තාක්ෂණ සමාගමකි. පුවත් කාමර, ව්‍යාපාර සහ මෘදුකාංග, භාෂා තුනෙන්.',
    cols: ['මාධ්‍ය', 'බුද්ධිය', 'තාක්ෂණය', 'කාර්යාලය'],
    paperlyWaitlist: 'Paperly පොරොත්තු ලැයිස්තුව',
    office: ['කොළඹ', 'යාපනය', 'මාධ්‍ය විමසුම්'],
    legal: 'AAMA · Aadhi Media Agency (පෞද්.) සමාගම'
  }
};

// Fill any key missing from a translation with the English value.
function deepMerge(base, over) {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return over === undefined ? base : over;
  }
  const out = {};
  for (const k of Object.keys(base)) out[k] = deepMerge(base[k], over ? over[k] : undefined);
  return out;
}

const i18n = { en, ta: deepMerge(en, ta), si: deepMerge(en, si) };

Object.assign(window, { i18n });
