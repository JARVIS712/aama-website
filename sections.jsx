/* global React, ParticleMesh, PillarViz, BentoNewsViz, BentoTalksViz */
const { useState, useEffect, useRef } = React;

// ===== i18n =====
// NOTE: the `engine`, `ecosystem`, `impact`, `process`, `faq`, `trust`, and
// `deploy` blocks for ta/si are a first-pass machine translation. Flagged
// for native-speaker review before this ships to real clients.
const i18n = {
  en: {
    nav: { engine: 'The Engine', ecosystem: 'Ecosystem', explainers: 'Explainers', contact: 'Deploy' },
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
    nav: { engine: 'எஞ்சின்', ecosystem: 'சூழல் அமைப்பு', explainers: 'விளக்கங்கள்', contact: 'தொடங்குக' },
    hero: {
      eyebrow: 'AAMA / இலங்கை / தாபனம் 2026',
      h1a: 'அரசியலைப் பகுத்தறிகிறோம்.',
      h1b: 'வெற்றியை ',
      h1c: 'வடிவமைக்கிறோம்.',
      sub: 'AAMA என்பது இலங்கையின் அரசியல் ஊடக மற்றும் பிரசார உட்கட்டமைப்பு நிறுவனமாகும்; முன்கணிப்பு மாதிரியாக்கம், மும்மொழி உணர்வுக் கண்காணிப்பு மற்றும் பாதுகாக்கப்பட்ட பிரசார செயற்பாடுகளை ஒரே முறைமையின் கீழ் இயக்குகிறது.',
      coords: '06.9271° N · 79.8612° E'
    },
    engine: {
      h2a: 'வெறும் மூலோபாயம் மட்டுமல்ல. ',
      h2b: 'அல்கோரிதம் துல்லியம்.',
      intro: 'இலங்கை மற்றும் தெற்காசியத் தேர்தல் தரவுகளுக்காக வடிவமைக்கப்பட்ட இயந்திரக் கற்றல் கட்டமைப்பு. நாம் செயற்படுத்தும் ஒவ்வொரு பிரசாரத்தையும் மூன்று தூண்கள் தாங்குகின்றன.',
      pillars: [
        { tag: 'INFERENCE', title: 'முன்கணிப்பு வாக்காளர் பகுப்பாய்வு', body: '12 ஆண்டுகால தேர்தல், சனத்தொகை மற்றும் நடத்தைச் சமிக்ஞைகளில் பயிற்றுவிக்கப்பட்ட பல்மாறி மாதிரிகள், 90 நாட்களுக்கு முன்னரே வாக்குப்பதிவு மாற்றத்தை வெளிப்படுத்துகின்றன.' },
        { tag: 'PERCEPTION', title: 'தானியங்கி உணர்வு வரைபடமாக்கல்', body: 'தமிழ், சிங்களம் மற்றும் ஆங்கில சமூக ஊடக ஓடைகளைப் பகுப்பாய்வு செய்யும் மும்மொழி NLP, மாவட்ட மட்ட உணர்வு வெப்ப வரைபடமாக உடனுக்குடன் காட்டுகிறது.' },
        { tag: 'INTEGRITY', title: 'சைபர் பாதுகாக்கப்பட்ட பிரசார உட்கட்டமைப்பு', body: 'வலையமைப்பிலிருந்து தனிமைப்படுத்தப்பட்ட (air-gapped) செயற்பாட்டு அறைகள், முனைக்கு முனை மறையாக்கம் செய்யப்பட்ட செய்திப் பரிமாற்றம் மற்றும் ரெட்-டீம் ஒத்திகை செய்யப்பட்ட தவறான தகவல் தடுப்பு.' }
      ]
    },
    ecosystem: {
      h2a: 'இரண்டு தயாரிப்புகள். ',
      h2b: 'ஒரே சமிக்ஞை.',
      news: { tag: 'இலவசம் & கட்டணம் · AI செய்தி வழங்கல்', desc: 'அரசியல் நேர்மையை மையமாகக் கொண்ட AI-தொகுப்புச் செய்தியறை: இலங்கையின் அன்றாட அரசியல் சமிக்ஞையை ஒரே ஊட்டமாக வடிகட்டி, பெரும்பாலான வாசகர்களுக்குத் தேவையான நிலையில் இலவசமாக வழங்குகிறது.' },
      talks: { tag: 'முழு அளவிலான தமிழ் வலையொலி (Podcast)', desc: 'இலங்கையின் பொதுவாழ்வில் உள்ள அமைப்பாளர்கள், ஊடகவியலாளர்கள் மற்றும் மாற்றுக் குரல்களுடன் நீண்டநேர தமிழ் உரையாடல்கள்.' },
      roadmap: { tag: 'செயற்றிட்டப் பாதை', title: 'AAMA அட்லஸ்', desc: 'ஊடாடும் தேர்தல் புவியியல் வரைபடம். பொது வெளியீட்டுக் காலம்: நான்காம் காலாண்டு (Q4).' },
      comingSoon: 'விரைவில் வருகிறது'
    },
    impact: {
      h2a: 'பன்னிரண்டு ஆண்டுகால ',
      h2b: 'சமிக்ஞைகளின் அடிப்படையில்.',
      stats: [
        { value: '12 ஆண்டுகள்', label: 'மாதிரியில் பயிற்றுவிக்கப்பட்ட மாவட்ட மட்ட தேர்தல், சனத்தொகை மற்றும் நடத்தைத் தரவுகள்' },
        { value: '3', label: 'ஒவ்வொரு மாதிரியிலும் ஊட்டத்திலும் செயற்படும் மொழிகள்: தமிழ், சிங்களம், ஆங்கிலம்' },
        { value: '2', label: 'கொழும்பு மற்றும் யாழ்ப்பாணத்தில் கள அலுவலகங்கள்' },
        { value: '4', label: '2025 முதல் 2026 வரை அடித்தளம் முதல் முழு அளவிலான நுண்ணறிவு வரையான கட்டச் செயற்றிட்டப் பாதை' }
      ]
    },
    process: {
      h2a: 'ஒரு பிரசாரம் ',
      h2b: 'எவ்வாறு கட்டமைக்கப்படுகிறது.',
      steps: [
        { n: '01', title: 'தரவுப் பெறுகை', body: 'மாவட்ட மட்ட தேர்தல் வரலாறு, பிரசார இலக்குகள் மற்றும் நாம் மாதிரியாக்கம் செய்யும் கள நிலைமை.' },
        { n: '02', title: 'மாதிரியாக்கம் & வரைபடம்', body: 'குறிப்பிட்ட தேர்தல் தொகுதிக்கேற்ப அளவுதிருத்தம் செய்யப்பட்ட முன்கணிப்பு வாக்காளர் பகுப்பாய்வு மற்றும் உணர்வு வரைபடமாக்கல்.' },
        { n: '03', title: 'செயற்படுத்தல்', body: 'வலையமைப்பிலிருந்து தனிமைப்படுத்தப்பட்ட செயற்பாட்டு அறை, மறையாக்கம் செய்யப்பட்ட செய்திப் பரிமாற்றம், செயற்பாட்டிற்கு முன்னர் ரெட்-டீம் சோதனை.' },
        { n: '04', title: 'கண்காணிப்பு', body: 'தேர்தல் நாள் வரையும் அதற்குப் பின்னரும் பிரசார செயற்பாட்டாளர்களுக்கான நிகழ்நேர உணர்வுத் தரவுப் பலகைகள்.' }
      ]
    },
    faq: {
      h2a: 'கேட்கத் தகுந்த ',
      h2b: 'கேள்விகள்.',
      items: [
        { q: 'பிரசாரத் தரவுகள் எவ்வாறு பாதுகாக்கப்படுகின்றன?', a: 'உட்கட்டமைப்பு வலையமைப்பிலிருந்து தனிமைப்படுத்தப்பட்டதாக இயங்குகிறது; செயற்படுத்தலுக்கு முன்னர் முனைக்கு முனை மறையாக்கம் செய்யப்பட்ட செய்திப் பரிமாற்றம் மற்றும் ரெட்-டீம் ஒத்திகை செய்யப்பட்ட தவறான தகவல் தடுப்புடன் செயற்படுகிறது.' },
        { q: '“மும்மொழி” என்பது உண்மையில் எவற்றை உள்ளடக்குகிறது?', a: 'தமிழ், சிங்களம் மற்றும் ஆங்கிலம். உணர்வு வரைபடமாக்கலும் உள்ளடக்கமும் வெறும் மொழிபெயர்க்கப்பட்ட தலைப்புகளுடன் கூடிய ஆங்கிலம் அல்ல; மூன்று மொழிகளிலும் நேரடியாக இயங்குகின்றன.' },
        { q: 'முன்கணிப்புகள் எவ்வாறு உறுதிப்படுத்தப்படுகின்றன?', a: 'மாதிரிகள் ஒரு தேர்தல் சுழற்சியில் மட்டுமல்லாது, பன்னிரண்டு ஆண்டுகால மாவட்ட மட்ட தேர்தல், சனத்தொகை மற்றும் நடத்தைத் தரவுகளில் பயிற்றுவிக்கப்படுகின்றன.' },
        { q: 'AAMA செய்தி மற்றும் AAMA உரையாடல் எப்போது வெளியிடப்படும்?', a: 'இரண்டும் தயாரிப்பில் உள்ளன. தற்போதைய கட்டம் மற்றும் பொது வெளியீட்டுக் காலத்திற்குச் செயற்றிட்டப் பாதையைப் பார்க்கவும்.' }
      ]
    },
    trust: {
      h2a: 'எஞ்சின் எதன் மீது ',
      h2b: 'கட்டமைக்கப்பட்டுள்ளது.',
      line: 'எஞ்சினில் உள்ள ஒவ்வொரு மாதிரியும் ஒரே அடித்தளத்தில் இயங்குகிறது.',
      items: ['12 ஆண்டுகால மாவட்ட மட்ட தேர்தல் பதிவுகள்', 'தமிழ் · சிங்களம் · ஆங்கில உணர்வுத் தரவுகள்', 'வலையமைப்பிலிருந்து தனிமைப்படுத்தப்பட்ட, ரெட்-டீம் சோதனை செய்யப்பட்ட உட்கட்டமைப்பு']
    },
    deploy: {
      h2a: 'உங்கள் பிரசாரத்தைப் பற்றி ',
      h2b: 'பேசத் தயாரா?',
      sub: 'உங்கள் மின்னஞ்சலைப் பகிருங்கள்; எமது குழு 24 மணிநேரத்திற்குள் உங்களைத் தொடர்புகொள்ளும்.',
      placeholder: 'you@example.com',
      cta: 'தொடர்புகொள்ளவும்',
      sendingLabel: 'அனுப்பப்படுகிறது',
      sentLabel: 'அனுப்பப்பட்டது',
      statusSending: 'உங்கள் செய்தி அனுப்பப்படுகிறது...',
      statusDone: 'நன்றி. 24 மணிநேரத்திற்குள் தொடர்புகொள்வோம்.',
      statusErr: 'இது செல்லுபடியாகும் மின்னஞ்சல் போல் தெரியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      statusFail: 'ஏதோ தவறு நேர்ந்துள்ளது. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது எமக்கு நேரடியாக மின்னஞ்சல் அனுப்பவும்.'
    },
    footer: {
      tag: 'ஆதி மீடியா ஏஜென்சி',
      sub: 'இலங்கை முழுவதும் செயற்படும் தொழில்நுட்பம் சார்ந்த அரசியல் பிரசார மற்றும் ஊடக நிறுவனம்.',
      cols: [
      { title: 'சூழல் அமைப்பு', items: ['AAMA செய்தி', 'AAMA உரையாடல்', 'செயற்றிட்டப் பாதை'] },
      { title: 'எஞ்சின்', items: ['முன்கணிப்பு பகுப்பாய்வு', 'உணர்வு வரைபடமாக்கல்', 'சைபர் உட்கட்டமைப்பு'] },
      { title: 'அலுவலகம்', items: ['கொழும்பு', 'யாழ்ப்பாணம்', 'ஊடக வினவல்கள்'] }],

      legal: 'AAMA · ஆதி மீடியா ஏஜென்சி (பிரைவேட்) லிமிடெட்'
    }
  },
  si: {
    nav: { engine: 'එන්ජිම', ecosystem: 'පරිසර පද්ධතිය', explainers: 'පැහැදිලි කිරීම්', contact: 'ආරම්භ කරන්න' },
    hero: {
      eyebrow: 'AAMA / ශ්‍රී ලංකාව / ස්ථා. 2026',
      h1a: 'දේශපාලනය විකේතනය කරමින්.',
      h1b: 'ජයග්‍රහණය ',
      h1c: 'නිර්මාණය කරමින්.',
      sub: 'AAMA යනු ශ්‍රී ලංකාවේ දේශපාලන මාධ්‍ය සහ ප්‍රචාරණ යටිතල පහසුකම් සමාගමකි; පුරෝකථන ආකෘතිකරණය, ත්‍රිභාෂා හැඟීම් නිරීක්ෂණය සහ ආරක්ෂිත ප්‍රචාරණ මෙහෙයුම් එකම පද්ධතියක් යටතේ ක්‍රියාත්මක කරයි.',
      coords: '06.9271° N · 79.8612° E'
    },
    engine: {
      h2a: 'හුදෙක් උපායමාර්ගය පමණක් නොවේ. ',
      h2b: 'ඇල්ගොරිතමික නිරවද්‍යතාව.',
      intro: 'ශ්‍රී ලංකා සහ දකුණු ආසියානු මැතිවරණ දත්ත සඳහා නිර්මාණය කළ යන්ත්‍ර ඉගෙනුම් රාමුවකි. අප දියත් කරන සෑම ප්‍රචාරණ ව්‍යාපාරයකටම කුළුණු තුනකින් සහාය ලැබේ.',
      pillars: [
        { tag: 'INFERENCE', title: 'පුරෝකථන ඡන්දදායක විශ්ලේෂණය', body: 'වසර 12 ක මැතිවරණ, ජනවිකාස සහ හැසිරීම් සංඥා මත පුහුණු කළ බහුවිචල්‍ය ආකෘති, දින 90 කට පෙර දෝලනය වන ඡන්ද ප්‍රකාශ කිරීමේ ප්‍රවණතා හඳුනා ගනී.' },
        { tag: 'PERCEPTION', title: 'ස්වයංක්‍රීය හැඟීම් සිතියම්කරණය', body: 'දෙමළ, සිංහල සහ ඉංග්‍රීසි සමාජ මාධ්‍ය ප්‍රවාහ ඔස්සේ ක්‍රියාත්මක වන ත්‍රිභාෂා NLP මගින් දිස්ත්‍රික් මට්ටමේ ප්‍රවණතා පාහේ තථ්‍ය කාලීනව සිතියම්ගත කෙරේ.' },
        { tag: 'INTEGRITY', title: 'සයිබර් ආරක්ෂිත ප්‍රචාරණ යටිතල පහසුකම්', body: 'බාහිර ජාලවලින් හුදෙකලා කළ (air-gapped) මෙහෙයුම් කාමර, අන්තයේ සිට අන්තයට සංකේතනය කළ පණිවිඩ හුවමාරුව සහ රතු-කණ්ඩායම් පුහුණු ව්‍යාජ තොරතුරු ප්‍රතිරෝධය.' }
      ]
    },
    ecosystem: {
      h2a: 'නිෂ්පාදන දෙකක්. ',
      h2b: 'එක් සංඥාවක්.',
      news: { tag: 'නොමිලේ සහ ගෙවීම් · AI පුවත් සැපයුම', desc: 'දේශපාලන අඛණ්ඩතාව කේන්ද්‍ර කරගත් AI-සංස්කරණය කළ පුවත් කාමරයකි: ශ්‍රී ලංකාවේ දෛනික දේශපාලන සංඥාව එකම සංග්‍රහයකට ගොනු කර, බොහෝ පාඨකයින්ට අවශ්‍ය මට්ටමින් නොමිලේ ලබා දෙයි.' },
      talks: { tag: 'සම්පූර්ණ දෙමළ පොඩ්කාස්ට් වැඩසටහන', desc: 'ශ්‍රී ලංකාවේ පොදු ජීවිතයේ සංවිධායකයින්, මාධ්‍යවේදීන් සහ විකල්ප මත දරන්නන් සමඟ පැවැත්වෙන දීර්ඝ දෙමළ භාෂා සංවාද.' },
      roadmap: { tag: 'මාර්ග සිතියම', title: 'AAMA ඇට්ලස්', desc: 'අන්තර්ක්‍රියාකාරී මැතිවරණ සිතියම්කරණය. පොදු නිකුත් කිරීමේ කාලය: සිව්වන කාර්තුව (Q4).' },
      comingSoon: 'ඉක්මනින් පැමිණේ'
    },
    impact: {
      h2a: 'වසර දොළහක ',
      h2b: 'සංඥා මත ගොඩනැගී ඇත.',
      stats: [
        { value: 'වසර 12', label: 'ආකෘතියට පුහුණු කළ දිස්ත්‍රික් මට්ටමේ මැතිවරණ, ජනවිකාස සහ හැසිරීම් දත්ත' },
        { value: '3', label: 'සෑම ආකෘතියක් හා සංග්‍රහයක් පුරාම ක්‍රියාත්මක වන භාෂා: දෙමළ, සිංහල සහ ඉංග්‍රීසි' },
        { value: '2', label: 'කොළඹ සහ යාපනයේ ක්ෂේත්‍ර කාර්යාල' },
        { value: '4', label: '2025 සිට 2026 දක්වා පදනමේ සිට පූර්ණ පරාස බුද්ධි විශ්ලේෂණය දක්වා අදියරගත මාර්ග සිතියම' }
      ]
    },
    process: {
      h2a: 'ප්‍රචාරණ ව්‍යාපාරයක් ',
      h2b: 'ගොඩනගන ආකාරය.',
      steps: [
        { n: '01', title: 'තොරතුරු ලබාගැනීම', body: 'දිස්ත්‍රික් මට්ටමේ මැතිවරණ ඉතිහාසය, ප්‍රචාරණ ඉලක්ක සහ අප ආකෘතිගත කරන ක්ෂේත්‍ර පසුබිම.' },
        { n: '02', title: 'ආකෘතිකරණය සහ සිතියම්ගත කිරීම', body: 'නිශ්චිත ඡන්ද කොට්ඨාසයට අනුව ක්‍රමාංකනය කළ පුරෝකථන ඡන්දදායක විශ්ලේෂණය සහ හැඟීම් සිතියම්කරණය.' },
        { n: '03', title: 'ක්‍රියාත්මක කිරීම', body: 'බාහිර ජාලවලින් හුදෙකලා කළ මෙහෙයුම් කාමරය, සංකේතනය කළ පණිවිඩ හුවමාරුව සහ ක්‍රියාත්මක කිරීමට පෙර රතු-කණ්ඩායම් පරීක්ෂාව.' },
        { n: '04', title: 'නිරීක්ෂණය', body: 'මැතිවරණ දිනය දක්වාත් ඉන් පසුවත් ප්‍රචාරණ මෙහෙයුම්කරුවන් සඳහා තථ්‍ය කාලීන හැඟීම් පුවරු.' }
      ]
    },
    faq: {
      h2a: 'ඇසිය යුතු ',
      h2b: 'ප්‍රශ්න.',
      items: [
        { q: 'ප්‍රචාරණ දත්ත ආරක්ෂා කරන්නේ කෙසේද?', a: 'යටිතල පහසුකම් බාහිර ජාලවලින් හුදෙකලා කර ක්‍රියාත්මක වන අතර, අන්තයේ සිට අන්තයට සංකේතනය කළ පණිවිඩ හුවමාරුව සහ දියත් කිරීමට පෙර රතු-කණ්ඩායම් පුහුණු ව්‍යාජ තොරතුරු ප්‍රතිරෝධය සහිතය.' },
        { q: '“ත්‍රිභාෂා” යන්නෙන් සැබවින්ම ආවරණය වන්නේ කුමක්ද?', a: 'දෙමළ, සිංහල සහ ඉංග්‍රීසි. හැඟීම් සිතියම්කරණය සහ අන්තර්ගතය පරිවර්තනය කළ ලේබල් සහිත ඉංග්‍රීසි පමණක් නොව, භාෂා තුනෙන්ම සෘජුවම ක්‍රියාත්මක වේ.' },
        { q: 'පුරෝකථන තහවුරු කරන්නේ කෙසේද?', a: 'ආකෘති එක් මැතිවරණ චක්‍රයකින් පමණක් නොව, වසර දොළහක දිස්ත්‍රික් මට්ටමේ මැතිවරණ, ජනවිකාස සහ හැසිරීම් දත්ත මත පුහුණු කෙරේ.' },
        { q: 'AAMA පුවත් සහ AAMA කතාබහ දියත් වන්නේ කවදාද?', a: 'මේ දෙකම සකස් වෙමින් පවතී. වත්මන් අදියර සහ පොදු නිකුත් කිරීමේ කාලය සඳහා මාර්ග සිතියම බලන්න.' }
      ]
    },
    trust: {
      h2a: 'එන්ජිම ගොඩනැගී ඇත්තේ ',
      h2b: 'කුමක් මතද.',
      line: 'එන්ජිමේ ඇති සෑම ආකෘතියක්ම එකම පදනමක් මත ක්‍රියාත්මක වේ.',
      items: ['වසර 12 ක දිස්ත්‍රික් මට්ටමේ මැතිවරණ වාර්තා', 'දෙමළ · සිංහල · ඉංග්‍රීසි හැඟීම් දත්ත', 'බාහිර ජාලවලින් හුදෙකලා කළ, රතු-කණ්ඩායම් පරීක්ෂාවට ලක් කළ යටිතල පහසුකම්']
    },
    deploy: {
      h2a: 'ඔබේ ප්‍රචාරණ ව්‍යාපාරය ගැන ',
      h2b: 'කතා කිරීමට සූදානම්ද?',
      sub: 'ඔබේ විද්‍යුත් තැපැල් ලිපිනය ලබා දෙන්න; අපගේ කණ්ඩායම පැය 24 ක් ඇතුළත ඔබව සම්බන්ධ කර ගනු ඇත.',
      placeholder: 'you@example.com',
      cta: 'සම්බන්ධ වන්න',
      sendingLabel: 'යවමින් පවතී',
      sentLabel: 'යවන ලදී',
      statusSending: 'ඔබේ පණිවිඩය යවමින් පවතී...',
      statusDone: 'ස්තුතියි. අපි පැය 24 ක් ඇතුළත සම්බන්ධ වන්නෙමු.',
      statusErr: 'එය වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ලෙස නොපෙනේ. කරුණාකර නැවත උත්සාහ කරන්න.',
      statusFail: 'යම් දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න හෝ අප වෙත සෘජුවම විද්‍යුත් තැපෑලක් එවන්න.'
    },
    footer: {
      tag: 'ආදි මාධ්‍ය ආයතනය (Aadhi Media Agency)',
      sub: 'ශ්‍රී ලංකාව පුරා ක්‍රියාත්මක වන තාක්ෂණය පදනම් කරගත් දේශපාලන ප්‍රචාරණ සහ මාධ්‍ය ආයතනයකි.',
      cols: [
      { title: 'පරිසර පද්ධතිය', items: ['AAMA පුවත්', 'AAMA කතාබහ', 'මාර්ග සිතියම'] },
      { title: 'එන්ජිම', items: ['පුරෝකථන විශ්ලේෂණය', 'හැඟීම් සිතියම්කරණය', 'සයිබර් යටිතල පහසුකම්'] },
      { title: 'කාර්යාලය', items: ['කොළඹ', 'යාපනය', 'මාධ්‍ය විමසුම්'] }],

      legal: 'AAMA · ආදි මාධ්‍ය ආයතනය (පුද්ගලික) සමාගම'
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
    { href: 'explainers/', label: t.nav.explainers },
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
