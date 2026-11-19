/* global React, ParticleMesh, PillarViz, BentoNewsViz, BentoTalksViz */
const { useState, useEffect, useRef } = React;

// ===== i18n =====
// NOTE: the `engine`, `ecosystem`, `impact`, `process`, `faq`, `trust`, and
// `deploy` blocks for ta/si are a first-pass machine translation. Flagged
// for native-speaker review before this ships to real clients.
const i18n = {
  en: {
    nav: { engine: 'The Engine', ecosystem: 'Ecosystem', budget: 'Budget 2027', contact: 'Deploy' },
    hero: {
      eyebrow: 'AAMA / SRI LANKA / EST. 2026',
      h1a: 'Decoding Politics.',
      h1b: 'Engineering ',
      h1c: 'Victory.',
      sub: 'AAMA is a political media and campaign infrastructure company in Sri Lanka, running predictive modelling, trilingual sentiment tracking, and secured campaign operations under one system.',
      coords: '06.9271° N · 79.8612° E'
    },
    engine: {
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
      h2a: 'Two products. ',
      h2b: 'One signal.',
      news: { tag: 'Freemium · AI News Delivery', desc: "An AI-curated newsroom focused on political integrity: Sri Lanka's daily political signal, distilled into one feed, free at the tier most readers need." },
      talks: { tag: 'Full-fledged Tamil Podcast', desc: 'Long-form Tamil-language conversations with organisers, journalists, and dissenting voices in Sri Lankan public life.' },
      roadmap: { tag: 'Roadmap', title: 'AAMA Atlas', desc: 'Interactive electoral cartography. Public release window: Q4.' },
      comingSoon: 'Coming soon'
    },
    impact: {
      h2a: 'Built on ',
      h2b: 'twelve years of signal.',
      stats: [
        { value: '12 yrs', label: 'District-level electoral, demographic and behavioural data trained into the model' },
        { value: '3', label: 'Working languages, Tamil, Sinhala and English, across every model and feed' },
        { value: '2', label: 'Offices on the ground, in Colombo and Jaffna' },
        { value: '4', label: 'Phase roadmap, Foundation to full-spectrum intelligence, 2025 to 2026' }
      ]
    },
    process: {
      h2a: 'How a ',
      h2b: 'campaign gets built.',
      steps: [
        { n: '01', title: 'Intake', body: "District-level electoral history, campaign goals, and the terrain we're modelling for." },
        { n: '02', title: 'Model & map', body: 'Predictive voter analytics and sentiment mapping calibrated to the specific electorate.' },
        { n: '03', title: 'Deploy', body: 'Air-gapped war room, encrypted message logistics, red-team tested before anything goes live.' },
        { n: '04', title: 'Monitor', body: 'Real-time sentiment dashboards for campaign operators, through election day and beyond.' }
      ]
    },
    faq: {
      h2a: 'Questions ',
      h2b: 'worth asking.',
      items: [
        { q: 'How is campaign data kept secure?', a: 'Infrastructure runs air-gapped, with end-to-end encrypted message logistics and red-team rehearsed disinformation defence before deployment.' },
        { q: 'What does "trilingual" actually cover?', a: 'Tamil, Sinhala, and English. Sentiment mapping and content run across all three, not English with translated labels.' },
        { q: 'How are predictions validated?', a: 'Models train on twelve years of district-level electoral, demographic, and behavioural data, not a single election cycle.' },
        { q: 'When are AAMA News and AAMA Talks launching?', a: 'Both are in progress. See the Roadmap for the current phase and public release window.' }
      ]
    },
    trust: {
      h2a: 'What the engine ',
      h2b: 'is built on.',
      line: 'Every model in the Engine runs on the same foundation.',
      items: ['12 years of district-level electoral records', 'Tamil · Sinhala · English sentiment data', 'Air-gapped, red-team-tested infrastructure']
    },
    deploy: {
      h2a: 'Ready to talk about your ',
      h2b: 'campaign?',
      sub: "Leave your email and our team will reach out within 24 hours.",
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
      tag: 'Aadhi Media Agency',
      sub: 'A tech-driven political campaign and media house operating across Sri Lanka.',
      cols: [
      { title: 'Ecosystem', items: ['AAMA News', 'AAMA Talks', 'Roadmap'] },
      { title: 'Engine', items: ['Predictive Analytics', 'Sentiment Mapping', 'Cyber Infrastructure'] },
      { title: 'Office', items: ['Colombo', 'Jaffna', 'Press Inquiries'] }],

      legal: 'AAMA · Aadhi Media Agency Pvt Ltd'
    }
  },
  ta: {
    nav: { engine: 'எஞ்சின்', ecosystem: 'சூழமைவு', budget: 'வரவு செலவு 2027', contact: 'அனுப்பு' },
    hero: {
      eyebrow: 'AAMA / இலங்கை / 2024',
      h1a: 'அரசியலை விளக்குகிறோம்.',
      h1b: 'வெற்றியை ',
      h1c: 'வடிவமைக்கிறோம்.',
      sub: 'AAMA இலங்கையின் அரசியல் ஊடக மற்றும் பிரச்சார உள்கட்டமைப்பு நிறுவனம். முன்கணிப்பு மாதிரியாக்கம், மும்மொழி உணர்வு கண்காணிப்பு, மற்றும் பாதுகாக்கப்பட்ட பிரச்சார செயல்பாடுகளை ஒரே அமைப்பில் இயக்குகிறோம்.',
      coords: '06.9271° N · 79.8612° E'
    },
    engine: {
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
      h2a: 'இரண்டு தயாரிப்புகள். ',
      h2b: 'ஒரே சமிக்ஞை.',
      news: { tag: 'இலவசம் · AI செய்தி வழங்கல்', desc: 'அரசியல் நேர்மையை மையமாகக் கொண்ட AI-தொகுக்கப்பட்ட செய்தியறை: இலங்கையின் அன்றாட அரசியல் சமிக்ஞையை ஒரே ஊட்டமாக வடிகட்டுகிறது, பெரும்பாலான வாசகர்களுக்குத் தேவையான நிலையில் இலவசமாக.' },
      talks: { tag: 'முழு அளவிலான தமிழ் பாட்காஸ்ட்', desc: 'இலங்கையின் பொதுவாழ்வில் அமைப்பாளர்கள், பத்திரிகையாளர்கள், மற்றும் மாற்றுக் குரல்களுடன் நீண்ட-நேர தமிழ்-மொழி உரையாடல்கள்.' },
      roadmap: { tag: 'திட்டப்பாதை', title: 'AAMA அட்லஸ்', desc: 'ஊடாடும் தேர்தல் புவியியல் வரைபடம். பொது வெளியீட்டு காலம்: நான்காம் காலாண்டு (Q4).' },
      comingSoon: 'விரைவில் வருகிறது'
    },
    impact: {
      h2a: 'பன்னிரண்டு ஆண்டுகால ',
      h2b: 'தரவின் அடிப்படையில்.',
      stats: [
        { value: '12 ஆண்டுகள்', label: 'மாதிரியில் பயிற்றுவிக்கப்பட்ட மாவட்ட அளவிலான தேர்தல், மக்கள்தொகை மற்றும் நடத்தை தரவு' },
        { value: '3', label: 'ஒவ்வொரு மாதிரியிலும் ஊட்டத்திலும் இயங்கும் மொழிகள்: தமிழ், சிங்களம், ஆங்கிலம்' },
        { value: '2', label: 'கொழும்பு மற்றும் யாழ்ப்பாணத்தில் களப் பணியகங்கள்' },
        { value: '4', label: '2025-2026 காலப்பகுதியில் அடித்தளம் முதல் முழு-நிறமாலை நுண்ணறிவு வரையான கட்ட திட்டப்பாதை' }
      ]
    },
    process: {
      h2a: 'ஒரு பிரச்சாரம் ',
      h2b: 'எப்படி கட்டமைக்கப்படுகிறது.',
      steps: [
        { n: '01', title: 'உள்ளீடு', body: 'மாவட்ட அளவிலான தேர்தல் வரலாறு, பிரச்சார இலக்குகள், நாங்கள் மாதிரியாக்கும் பகுதி.' },
        { n: '02', title: 'மாதிரி & வரைபடம்', body: 'குறிப்பிட்ட தொகுதிக்கேற்ப அளவுசெய்யப்பட்ட முன்கணிப்பு வாக்காளர் பகுப்பாய்வு மற்றும் உணர்வு வரைபடமாக்கல்.' },
        { n: '03', title: 'வரிசைப்படுத்தல்', body: 'வெளி இணைப்பற்ற போர் அறை, மறையாக்கம் செய்யப்பட்ட செய்தி பரிமாற்றம், நேரடியாகும் முன் ரெட்-டீம் சோதனை.' },
        { n: '04', title: 'கண்காணிப்பு', body: 'தேர்தல் நாள் வரையும் அதற்குப் பின்னரும் பிரச்சார செயற்பாட்டாளர்களுக்கான நேரடி உணர்வு டாஷ்போர்டுகள்.' }
      ]
    },
    faq: {
      h2a: 'கேட்கத் தகுந்த ',
      h2b: 'கேள்விகள்.',
      items: [
        { q: 'பிரச்சார தரவு எப்படி பாதுகாக்கப்படுகிறது?', a: 'உள்கட்டமைப்பு வெளி இணைப்பற்றதாக இயங்குகிறது, முனை-க்கு-முனை மறையாக்கம் செய்யப்பட்ட செய்தி பரிமாற்றம் மற்றும் நேரடியாகும் முன் ரெட்-டீம் தவறான தகவல் தடுப்புடன்.' },
        { q: '"மும்மொழி" என்பது உண்மையில் எதை உள்ளடக்குகிறது?', a: 'தமிழ், சிங்களம், ஆங்கிலம். உணர்வு வரைபடமாக்கலும் உள்ளடக்கமும் மொழிபெயர்க்கப்பட்ட லேபிள்கள் கொண்ட ஆங்கிலம் அல்ல, மூன்று மொழிகளிலும் இயங்குகிறது.' },
        { q: 'முன்கணிப்புகள் எப்படி உறுதிப்படுத்தப்படுகின்றன?', a: 'மாதிரிகள் ஒரு தேர்தல் சுழற்சியில் அல்ல, பன்னிரண்டு ஆண்டுகால மாவட்ட அளவிலான தேர்தல், மக்கள்தொகை, நடத்தை தரவில் பயிற்றுவிக்கப்படுகின்றன.' },
        { q: 'AAMA செய்தி மற்றும் AAMA பேச்சு எப்போது வெளியிடப்படும்?', a: 'இரண்டும் வளர்ச்சியில் உள்ளன. தற்போதைய கட்டம் மற்றும் பொது வெளியீட்டு காலத்திற்கு திட்டப்பாதையைப் பார்க்கவும்.' }
      ]
    },
    trust: {
      h2a: 'எஞ்சின் எதன் மீது ',
      h2b: 'கட்டமைக்கப்பட்டுள்ளது.',
      line: 'எஞ்சினில் உள்ள ஒவ்வொரு மாதிரியும் ஒரே அடித்தளத்தில் இயங்குகிறது.',
      items: ['12 ஆண்டுகால மாவட்ட அளவிலான தேர்தல் பதிவுகள்', 'தமிழ் · சிங்களம் · ஆங்கில உணர்வு தரவு', 'வெளி இணைப்பற்ற, ரெட்-டீம் சோதிக்கப்பட்ட உள்கட்டமைப்பு']
    },
    deploy: {
      h2a: 'உங்கள் பிரச்சாரத்தைப் பற்றி ',
      h2b: 'பேச தயாரா?',
      sub: 'உங்கள் மின்னஞ்சலை பகிரவும், எங்கள் குழு 24 மணி நேரத்திற்குள் தொடர்பு கொள்ளும்.',
      placeholder: 'you@example.com',
      cta: 'தொடர்பு கொள்ளுங்கள்',
      sendingLabel: 'அனுப்புகிறது',
      sentLabel: 'அனுப்பப்பட்டது',
      statusSending: 'உங்கள் செய்தி அனுப்பப்படுகிறது...',
      statusDone: 'நன்றி. 24 மணி நேரத்திற்குள் தொடர்பு கொள்வோம்.',
      statusErr: 'சரியான மின்னஞ்சல் அல்ல. மீண்டும் முயற்சிக்கவும்.',
      statusFail: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக எங்களுக்கு மின்னஞ்சல் அனுப்பவும்.'
    },
    footer: {
      tag: 'ஆதி மீடியா ஏஜென்சி',
      sub: 'இலங்கை முழுவதும் செயல்படும் தொழில்நுட்பம் சார்ந்த அரசியல் பிரச்சார மற்றும் ஊடக நிறுவனம்.',
      cols: [
      { title: 'சூழமைவு', items: ['AAMA செய்தி', 'AAMA உரையாடல்', 'திட்டப்பாதை'] },
      { title: 'எஞ்சின்', items: ['முன்கணிப்பு பகுப்பாய்வு', 'உணர்வு வரைபடம்', 'சைபர் உள்கட்டமைப்பு'] },
      { title: 'அலுவலகம்', items: ['கொழும்பு', 'யாழ்ப்பாணம்', 'பத்திரிக்கை விசாரணை'] }],

      legal: 'AAMA · ஆதி மீடியா ஏஜென்சி (பிரைவேட்) லிமிடெட்'
    }
  },
  si: {
    nav: { engine: 'එන්ජිම', ecosystem: 'පරිසරය', budget: 'අයවැය 2027', contact: 'යෙදවීම' },
    hero: {
      eyebrow: 'AAMA / ශ්‍රී ලංකාව / 2024',
      h1a: 'දේශපාලනය විකේතනය කරමින්.',
      h1b: 'ජයග්‍රහණය ',
      h1c: 'නිර්මාණය කරමින්.',
      sub: 'AAMA යනු ශ්‍රී ලංකාවේ දේශපාලන මාධ්‍ය හා ව්‍යාපාර යටිතල පහසුකම් සමාගමකි. පුරෝකථන ආකෘතිකරණය, ත්‍රිභාෂා හැඟීම් නිරීක්ෂණය, සහ ආරක්‍ෂිත ව්‍යාපාර මෙහෙයුම් එකම පද්ධතියක් යටතේ ක්‍රියාත්මක කරයි.',
      coords: '06.9271° N · 79.8612° E'
    },
    engine: {
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
      h2a: 'නිෂ්පාදන දෙකක්. ',
      h2b: 'එක් සංඥාවක්.',
      news: { tag: 'නොමිලේ · AI පුවත් සැපයුම', desc: 'දේශපාලන අඛණ්ඩතාව වටා ගොඩනගා ඇති AI-සංස්කරණය කළ පුවත් කාමරයක්: ශ්‍රී ලංකාවේ දෛනික දේශපාලන සංඥාව එකම සම්පාදනයකට සකසයි, බොහෝ පාඨකයන්ට අවශ්‍ය මට්ටමින් නොමිලේ.' },
      talks: { tag: 'සම්පූර්ණ දෙමළ පොඩ්කාස්ට්', desc: 'ශ්‍රී ලාංකික මහජන ජීවිතයේ සංවිධායකයින්, පත්‍රකලාවේදීන්, සහ විරුද්ධ මත දරන්නන් සමඟ දිගු-ආකෘති දෙමළ-භාෂා සංවාද.' },
      roadmap: { tag: 'මාර්ග සිතියම', title: 'AAMA ඇට්ලස්', desc: 'අන්තර්ක්‍රියාකාරී මැතිවරණ සිතියම්කරණය. පොදු නිකුත් කිරීමේ කාලය: හතරවන කාර්තුව.' },
      comingSoon: 'ඉක්මනින් පැමිණේ'
    },
    impact: {
      h2a: 'වසර දොළහක ',
      h2b: 'දත්ත මත ගොඩනැගී ඇත.',
      stats: [
        { value: 'වසර 12', label: 'ආකෘතියට පුහුණු කළ දිස්ත්‍රික් මට්ටමේ මැතිවරණ, ජනවිකාස සහ හැසිරීම් දත්ත' },
        { value: '3', label: 'සෑම ආකෘතියක්ම හා සම්පාදනයක්ම ක්‍රියාත්මක වන භාෂා: දෙමළ, සිංහල, ඉංග්‍රීසි' },
        { value: '2', label: 'කොළඹ සහ යාපනයේ ක්ෂේත්‍ර කාර්යාල' },
        { value: '4', label: '2025-2026 කාලය තුළ පදනමේ සිට සම්පූර්ණ-වර්ණාවලි බුද්ධිය දක්වා අදියර සිතියම' }
      ]
    },
    process: {
      h2a: 'ව්‍යාපාරයක් ',
      h2b: 'ගොඩනගන ආකාරය.',
      steps: [
        { n: '01', title: 'ලබාගැනීම', body: 'දිස්ත්‍රික් මට්ටමේ මැතිවරණ ඉතිහාසය, ව්‍යාපාර ඉලක්ක, සහ අප ආකෘතිගත කරන භූමිය.' },
        { n: '02', title: 'ආකෘති සහ සිතියම්', body: 'නිශ්චිත ඡන්ද කොට්ඨාශයට අනුව සකසන ලද පුරෝකථන ඡන්දදායක විශ්ලේෂණය සහ හැඟීම් සිතියම්කරණය.' },
        { n: '03', title: 'යෙදවීම', body: 'වාතාශ්‍රය-විරහිත යුධ කාමරය, සංකේතනය කළ පණිවිඩ සැපයුම, ක්‍රියාත්මක වීමට පෙර රතු-කණ්ඩායම් පරීක්ෂාව.' },
        { n: '04', title: 'නිරීක්ෂණය', body: 'මැතිවරණ දිනය දක්වාත් ඉන් පසුවත් ව්‍යාපාර මෙහෙයුම්කරුවන් සඳහා තථ්‍ය කාලීන හැඟීම් උපකරණ පුවරු.' }
      ]
    },
    faq: {
      h2a: 'අසන්න වටින ',
      h2b: 'ප්‍රශ්න.',
      items: [
        { q: 'ව්‍යාපාර දත්ත ආරක්ෂා කරන්නේ කෙසේද?', a: 'යටිතල පහසුකම් වාතාශ්‍රය-විරහිතව ක්‍රියාත්මක වේ, කෙළවරේ සිට කෙළවර දක්වා සංකේතනය කළ පණිවිඩ සැපයුම සහ ක්‍රියාත්මක වීමට පෙර රතු-කණ්ඩායම් ව්‍යාජ තොරතුරු ප්‍රතිරෝධය සමඟ.' },
        { q: '"ත්‍රිභාෂා" ඇත්තටම ආවරණය කරන්නේ කුමක්ද?', a: 'දෙමළ, සිංහල, ඉංග්‍රීසි. හැඟීම් සිතියම්කරණය සහ අන්තර්ගතය පරිවර්තිත ලේබල් සහිත ඉංග්‍රීසි නොව, තුනෙන්ම ක්‍රියාත්මක වේ.' },
        { q: 'පුරෝකථන තහවුරු කරන්නේ කෙසේද?', a: 'ආකෘති එක් මැතිවරණ චක්‍රයක් නොව, වසර දොළහක දිස්ත්‍රික් මට්ටමේ මැතිවරණ, ජනවිකාස සහ හැසිරීම් දත්ත මත පුහුණු වේ.' },
        { q: 'AAMA පුවත් සහ AAMA කතාබහ දියත් වන්නේ කවදාද?', a: 'දෙකම ප්‍රගතියේ පවතී. වත්මන් අදියර සහ පොදු නිකුත් කිරීමේ කාලය සඳහා මාර්ග සිතියම බලන්න.' }
      ]
    },
    trust: {
      h2a: 'එන්ජිම ගොඩනැගී ඇත්තේ ',
      h2b: 'කුමක් මතද.',
      line: 'එන්ජිමේ සෑම ආකෘතියක්ම එකම පදනම මත ක්‍රියාත්මක වේ.',
      items: ['වසර 12ක දිස්ත්‍රික් මට්ටමේ මැතිවරණ වාර්තා', 'දෙමළ · සිංහල · ඉංග්‍රීසි හැඟීම් දත්ත', 'වාතාශ්‍රය-විරහිත, රතු-කණ්ඩායම් පරීක්ෂිත යටිතල පහසුකම්']
    },
    deploy: {
      h2a: 'ඔබේ ව්‍යාපාරය ගැන ',
      h2b: 'කතා කරන්නද?',
      sub: 'ඔබේ විද්‍යුත් තැපෑල ලබා දෙන්න, අපගේ කණ්ඩායම පැය 24ක් ඇතුළත සම්බන්ධ වනු ඇත.',
      placeholder: 'you@example.com',
      cta: 'සම්බන්ධ වන්න',
      sendingLabel: 'යවමින්',
      sentLabel: 'යවන ලදී',
      statusSending: 'ඔබේ පණිවිඩය යවමින්...',
      statusDone: 'ස්තුතියි. පැය 24ක් ඇතුළත සම්බන්ධ වෙමු.',
      statusErr: 'එය වලංගු විද්‍යුත් තැපැල් ලිපිනයක් නොවේ. නැවත උත්සාහ කරන්න.',
      statusFail: 'යමක් වැරදුණි. නැවත උත්සාහ කරන්න හෝ අප වෙත සෘජුවම විද්‍යුත් තැපෑලක් යවන්න.'
    },
    footer: {
      tag: 'Aadhi මාධ්‍ය ඒජන්සිය',
      sub: 'ශ්‍රී ලංකාව පුරා ක්‍රියාත්මක වන තාක්ෂණය මත පදනම් වූ දේශපාලන ව්‍යාපාර හා මාධ්‍ය ආයතනයකි.',
      cols: [
      { title: 'පරිසරය', items: ['AAMA පුවත්', 'AAMA කතාබහ', 'මාර්ග සිතියම'] },
      { title: 'එන්ජිම', items: ['පුරෝකථන විශ්ලේෂණය', 'හැඟීම් සිතියම්කරණය', 'සයිබර් යටිතල පහසුකම්'] },
      { title: 'කාර්යාලය', items: ['කොළඹ', 'යාපනය', 'මාධ්‍ය විමසුම්'] }],

      legal: 'AAMA · Aadhi Media Agency (පෞද්.) සමාගම'
    }
  }
};

// ===== Reveal hook =====
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('in');});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ===== Nav =====
function Nav({ lang, setLang, t, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '#engine', label: t.nav.engine },
    { href: '#ecosystem', label: t.nav.ecosystem },
    { href: 'budget-2027/', label: t.nav.budget },
    { href: '#deploy', label: t.nav.contact }
  ];
  return (
    <nav className="nav" data-screen-label="Nav">
      <a href="#" className="wordmark">
        <img src="assets/logo-main.png" alt="AAMA" style={{ height: 32, filter: 'var(--logo-filter, none)' }} />
      </a>
      <div className="nav-links">
        {links.map((l) => <a key={l.href} className="nav-link" href={l.href}>{l.label}</a>)}
      </div>
      <div className="lang-toggle" role="group" aria-label="Language">
        {[
        { id: 'en', label: 'EN' },
        { id: 'ta', label: 'தமிழ்' },
        { id: 'si', label: 'සිංහල' }].
        map((l) =>
        <button
          key={l.id}
          data-lang={l.id}
          className={'lang-btn' + (lang === l.id ? ' is-active' : '')}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}>
          {l.label}</button>
        )}
      </div>
      <button
        type="button"
        className="theme-toggle-btn"
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        ◐
      </button>
      <button
        type="button"
        className="nav-menu-btn"
        aria-expanded={menuOpen}
        aria-controls="nav-menu-drawer"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((o) => !o)}>
        <span className="nav-menu-icon" aria-hidden="true"></span>
      </button>
      <div
        className={'nav-menu-drawer' + (menuOpen ? ' is-open' : '')}
        id="nav-menu-drawer"
        role="menu"
        aria-hidden={!menuOpen}>
        {links.map((l) =>
        <a key={l.href} className="nav-menu-link" href={l.href} role="menuitem" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{l.label}</a>
        )}
      </div>
    </nav>);

}

// ===== Hero =====
function Hero({ heroBg, t, lang }) {
  return (
    <section className="hero" data-screen-label="01 Hero" lang={lang}>
      <ParticleMesh variant={heroBg} />
      <div className="hero-content container">
        <div className="hero-meta reveal mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          <span>{t.hero.eyebrow}</span>
        </div>
        <h1 className="display display-mega hero-h1 reveal">
          {t.hero.h1a}<br />
          {t.hero.h1b}<em>{t.hero.h1c}</em>
        </h1>
        <p className="hero-sub reveal">{t.hero.sub}</p>
      </div>
      <div className="hero-foot">
        <div className="hero-foot-row container">
          <div className="hero-coords">{t.hero.coords}</div>
        </div>
      </div>
    </section>);

}

// ===== Engine =====
function Engine({ t, lang }) {
  const kinds = ['predictive', 'sentiment', 'cyber'];
  const pillars = t.engine.pillars.map((p, i) => ({ ...p, n: '0' + (i + 1), kind: kinds[i] }));

  return (
    <section id="engine" className="section container" data-screen-label="02 Engine" lang={lang}>
      <div className="section-head reveal-stagger">
        <h2 className="display display-lg">{t.engine.h2a}<em style={{ fontStyle: 'italic' }}>{t.engine.h2b}</em></h2>
      </div>
      <p className="body-lg reveal" style={{ maxWidth: '64ch', marginBottom: 64 }}>
        {t.engine.intro}
      </p>
      <div className="pillars reveal-stagger">
        {pillars.map((p, i) =>
        <article key={p.n} className={'pillar' + (i === 0 ? ' pillar-lead' : '')}>
            <div className="pillar-number">
              <span>{p.n}</span><span>{p.tag}</span>
            </div>
            <div className="pillar-viz"><PillarViz kind={p.kind} /></div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        )}
      </div>
    </section>);

}

// ===== Bento =====
function Bento({ density, t, lang }) {
  const showSoon = density !== 'minimal';
  return (
    <section id="ecosystem" className="section container" data-screen-label="03 Ecosystem" lang={lang}>
      <div className="section-head reveal-stagger">
        <h2 className="display display-lg">{t.ecosystem.h2a}<em style={{ fontStyle: 'italic' }}>{t.ecosystem.h2b}</em></h2>
      </div>
      <div className="bento reveal-stagger">
        <article className="bento-tile large">
          <div className="bento-tile-header">
            <span className="bento-tag">{t.ecosystem.news.tag}</span>
          </div>
          <img src="assets/logo-news.png" alt="AAMA News" style={{ height: 56, filter: 'var(--logo-filter, none)' }} />
          <p>{t.ecosystem.news.desc}</p>
          <span className="bento-link bento-link-soon" aria-disabled="true">{t.ecosystem.comingSoon}</span>
          <div className="bento-viz"><BentoNewsViz /></div>
        </article>

        <article className="bento-tile">
          <div className="bento-tile-header">
            <span className="bento-tag">{t.ecosystem.talks.tag}</span>
          </div>
          <img src="assets/logo-talks.png" alt="AAMA Talks" style={{ height: 48, filter: 'var(--logo-filter, none)' }} />
          <p>{t.ecosystem.talks.desc}</p>
          <span className="bento-link bento-link-soon" aria-disabled="true">{t.ecosystem.comingSoon}</span>
          <div className="bento-viz" style={{ height: '52%' }}><BentoTalksViz /></div>
        </article>

        {showSoon &&
        <article className="bento-tile soon">
            <div className="bento-tile-header">
              <span className="bento-tag" style={{ background: 'transparent', color: 'var(--muted)', border: '1px dashed var(--hairline-strong)' }}>{t.ecosystem.roadmap.tag}</span>
            </div>
            <h3>{t.ecosystem.roadmap.title}</h3>
            <p style={{ fontSize: 14 }}>{t.ecosystem.roadmap.desc}</p>
          </article>
        }
      </div>
    </section>);

}

// ===== Impact =====
function Impact({ t, lang }) {
  return (
    <section id="impact" className="section container" data-screen-label="04 Impact" lang={lang}>
      <div className="section-head reveal-stagger">
        <h2 className="display display-lg">{t.impact.h2a}<em style={{ fontStyle: 'italic' }}>{t.impact.h2b}</em></h2>
      </div>
      <div className="impact-stats reveal-stagger">
        {t.impact.stats.map((s, i) =>
        <article key={i} className="impact-stat">
            <div className="impact-stat-value display display-lg">{s.value}</div>
            <p className="impact-stat-label">{s.label}</p>
          </article>
        )}
      </div>
    </section>);

}

// ===== Process =====
function Process({ t, lang }) {
  return (
    <section id="process" className="section container" data-screen-label="05 Process" lang={lang}>
      <div className="section-head reveal-stagger">
        <h2 className="display display-lg">{t.process.h2a}<em style={{ fontStyle: 'italic' }}>{t.process.h2b}</em></h2>
      </div>
      <ol className="process-steps reveal-stagger">
        {t.process.steps.map((s) =>
        <li key={s.n} className="process-step">
            <span className="process-step-n mono">{s.n}</span>
            <div className="process-step-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        )}
      </ol>
    </section>);

}

// ===== FAQ =====
function Faq({ t, lang }) {
  return (
    <section id="faq" className="section container" data-screen-label="06 FAQ" lang={lang}>
      <div className="section-head reveal-stagger">
        <h2 className="display display-lg">{t.faq.h2a}<em style={{ fontStyle: 'italic' }}>{t.faq.h2b}</em></h2>
      </div>
      <div className="faq-list reveal-stagger">
        {t.faq.items.map((item, i) =>
        <div key={i} className="faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        )}
      </div>
    </section>);

}

// ===== Trust =====
function Trust({ t, lang }) {
  return (
    <section id="trust" className="section container section-tight" data-screen-label="07 Trust" lang={lang}>
      <div className="trust-strip reveal">
        <p className="trust-line">{t.trust.line}</p>
        <div className="trust-items mono">
          {t.trust.items.map((item, i) =>
          <span key={i} className="trust-item">{item}</span>
          )}
        </div>
      </div>
    </section>);

}

// ===== Contact + Footer =====
function ContactFooter({ t, lang }) {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | err | fail

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    if (!/^\S+@\S+\.\S+$/.test(val.trim())) {
      setStatus('err');return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mwlevwwn', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val.trim() })
      });
      setStatus(res.ok ? 'done' : 'fail');
    } catch {
      setStatus('fail');
    }
  }

  return (
    <section id="deploy" className="deploy-section" data-screen-label="08 Deploy">
      <div className="container">
        <div className="deploy-panel reveal" lang={lang}>
          <h2 className="display display-lg" style={{ color: 'var(--on-dark)' }}>
            {t.deploy.h2a}<em style={{ fontStyle: 'italic' }}>{t.deploy.h2b}</em>
          </h2>
          <p className="deploy-sub">{t.deploy.sub}</p>

          <form className="deploy-form" onSubmit={submit}>
            <input
              type="email"
              value={val}
              onChange={(e) => {setVal(e.target.value);if (status === 'err' || status === 'fail') setStatus('idle');}}
              placeholder={t.deploy.placeholder}
              disabled={status === 'sending' || status === 'done'}
              aria-label="Email" />

            <button type="submit" disabled={status === 'sending' || status === 'done'}>
              {status === 'sending' ? t.deploy.sendingLabel : status === 'done' ? t.deploy.sentLabel : t.deploy.cta}
            </button>
          </form>
          <div className={'deploy-status' + (status === 'done' ? ' success' : '')} role="status">
            {status === 'sending' && t.deploy.statusSending}
            {status === 'done' && t.deploy.statusDone}
            {status === 'err' && t.deploy.statusErr}
            {status === 'fail' && t.deploy.statusFail}
          </div>
        </div>

        <div className="footer-grid" lang={lang}>
          <div className="footer-col">
            <img src="assets/logo-main-white.png" alt="AAMA" style={{ height: 48, marginBottom: 18 }} />
            <p className="footer-brand-sub">{t.footer.sub}</p>
          </div>
          <div className="footer-col">
            <h4>{t.footer.cols[0].title}</h4>
            <ul>
              <li>AAMA News <span className="footer-soon">({t.ecosystem.comingSoon})</span></li>
              <li>AAMA Talks <span className="footer-soon">({t.ecosystem.comingSoon})</span></li>
              <li><a href="Roadmap.html">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer.cols[1].title}</h4>
            <ul>
              <li><a href="Predictive Analytics.html">Predictive Analytics</a></li>
              <li><a href="Sentiment Mapping.html">Sentiment Mapping</a></li>
              <li><a href="Cyber Infrastructure.html">Cyber Infrastructure</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.footer.cols[2].title}</h4>
            <ul>
              <li>Colombo</li>
              <li>Jaffna</li>
              <li><a href="https://wa.me/94721271999" target="_blank" rel="noopener">Press Inquiries ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 · {t.footer.legal}</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { useReveal, Nav, Hero, Engine, Bento, Impact, Process, Faq, Trust, ContactFooter, i18n });
