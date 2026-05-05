/* global React, ParticleMesh, PillarViz, BentoNewsViz, BentoTalksViz, PortraitCode, PortraitGround */
const { useState, useEffect, useRef } = React;

// ===== i18n (hero + nav + footer only per spec) =====
const i18n = {
  en: {
    nav: { engine: 'The Engine', ecosystem: 'Ecosystem', architects: 'Architects', contact: 'Deploy' },
    hero: {
      eyebrow: 'AAMA / SRI LANKA / EST. 2026',
      h1a: 'Decoding Politics.',
      h1b: 'Engineering ',
      h1c: 'Victory.',
      sub: 'Welcome to AaMA. The first fully AI-optimized, data-driven political media ecosystem in Sri Lanka.',
      scroll: 'Scroll to initialise',
      coords: '06.9271° N · 79.8612° E'
    },
    footer: {
      tag: 'Aadhi Media Agency',
      sub: 'A tech-driven political campaign and media house operating across Sri Lanka.',
      cols: [
      { title: 'Ecosystem', items: ['AAMA News', 'AAMA Talks', 'Roadmap'] },
      { title: 'Engine', items: ['Predictive Analytics', 'Sentiment Mapping', 'Cyber Infrastructure'] },
      { title: 'Office', items: ['Colombo', 'Jaffna', 'Press Inquiries'] }],

      legal: 'AAMA · Aadhi Media Agency Pvt Ltd',
      build: 'BUILD 2026.04 · STABLE'
    }
  },
  ta: {
    nav: { engine: 'எஞ்சின்', ecosystem: 'சூழமைவு', architects: 'கட்டிடக்கலைஞர்கள்', contact: 'அனுப்பு' },
    hero: {
      eyebrow: 'AAMA / இலங்கை / 2024',
      h1a: 'அரசியலை விளக்குகிறோம்.',
      h1b: 'வெற்றியை ',
      h1c: 'வடிவமைக்கிறோம்.',
      sub: 'AaMA  வரவேற்கிறோம். இலங்கையின் முதல் முழு AI-சார்ந்த, தரவு-இயக்கப்பட்ட அரசியல் ஊடக சூழமைவு.',
      scroll: 'தொடங்க கீழே செல்லுங்கள்',
      coords: '06.9271° N · 79.8612° E'
    },
    footer: {
      tag: 'ஆதி மீடியா ஏஜென்சி',
      sub: 'இலங்கை முழுவதும் செயல்படும் தொழில்நுட்பம் சார்ந்த அரசியல் பிரச்சார மற்றும் ஊடக நிறுவனம்.',
      cols: [
      { title: 'சூழமைவு', items: ['AAMA செய்தி', 'AAMA உரையாடல்', 'திட்டப்பாதை'] },
      { title: 'எஞ்சின்', items: ['முன்கணிப்பு பகுப்பாய்வு', 'உணர்வு வரைபடம்', 'சைபர் உள்கட்டமைப்பு'] },
      { title: 'அலுவலகம்', items: ['கொழும்பு', 'யாழ்ப்பாணம்', 'பத்திரிக்கை விசாரணை'] }],

      legal: 'AAMA · ஆதி மீடியா ஏஜென்சி (பிரைவேட்) லிமிடெட்',
      build: 'BUILD 2026.04 · STABLE'
    }
  },
  si: {
    nav: { engine: 'එන්ජිම', ecosystem: 'පරිසරය', architects: 'නිර්මාපකයෝ', contact: 'යෙදවීම' },
    hero: {
      eyebrow: 'AAMA / ශ්‍රී ලංකාව / 2024',
      h1a: 'දේශපාලනය විකේතනය කරමින්.',
      h1b: 'ජයග්‍රහණය ',
      h1c: 'නිර්මාණය කරමින්.',
      sub: 'AaMA වෙත ඔබව සාදරයෙන් පිළිගනිමු. ශ්‍රී ලංකාවේ ප්‍රථම සම්පූර්ණයෙන්ම AI-ප්‍රශස්තකරණය කළ, දත්ත-මෙහෙයවන දේශපාලන මාධ්‍ය පරිසරය.',
      scroll: 'ආරම්භ කිරීමට ස්ක්‍රෝල් කරන්න',
      coords: '06.9271° N · 79.8612° E'
    },
    footer: {
      tag: 'Aadhi මාධ්‍ය ඒජන්සිය',
      sub: 'ශ්‍රී ලංකාව පුරා ක්‍රියාත්මක වන තාක්ෂණය මත පදනම් වූ දේශපාලන ව්‍යාපාර හා මාධ්‍ය ආයතනයකි.',
      cols: [
      { title: 'පරිසරය', items: ['AAMA පුවත්', 'AAMA කතාබහ', 'මාර්ග සිතියම'] },
      { title: 'එන්ජිම', items: ['පුරෝකථන විශ්ලේෂණය', 'හැඟීම් සිතියම්කරණය', 'සයිබර් යටිතල පහසුකම්'] },
      { title: 'කාර්යාලය', items: ['කොළඹ', 'යාපනය', 'මාධ්‍ය විමසුම්'] }],

      legal: 'AAMA · Aadhi Media Agency (පෞද්.) සමාගම',
      build: 'BUILD 2026.04 · STABLE'
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
function Nav({ lang, setLang, t, theme }) {
  return (
    <nav className="nav" data-screen-label="Nav">
      <a href="#" className="wordmark">
        <img src="assets/logo-main.png" alt="AAMA" style={{ height: 32, filter: 'var(--logo-filter, none)' }} />
      </a>
      <div className="nav-links">
        <a className="nav-link" href="#engine">{t.nav.engine}</a>
        <a className="nav-link" href="#ecosystem">{t.nav.ecosystem}</a>
        <a className="nav-link" href="#architects">{t.nav.architects}</a>
        <a className="nav-link" href="#deploy">{t.nav.contact}</a>
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
    </nav>);

}

// ===== Hero =====
function Hero({ heroBg, t, lang }) {
  return (
    <section className="hero" data-screen-label="01 Hero" lang={lang}>
      <ParticleMesh variant={heroBg} />
      <div className="hero-content container">
        <div className="hero-meta reveal mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          <span className="dot" aria-hidden="true"></span>
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
          <div className="scroll-indicator">
            <span>{t.hero.scroll}</span>
            <span className="scroll-indicator-line" aria-hidden="true"></span>
          </div>
          <div className="hero-coords">{t.hero.coords}</div>
        </div>
      </div>
    </section>);

}

// ===== Engine =====
function Engine() {
  const pillars = [
  {
    n: '01',
    tag: 'INFERENCE',
    title: 'Predictive Voter Analytics',
    body: 'Multivariate models trained on 12 years of electoral, demographic, and behavioural signal — surfacing swing turnout 90 days out.',
    kind: 'predictive'
  },
  {
    n: '02',
    tag: 'PERCEPTION',
    title: 'Automated Sentiment Mapping',
    body: 'Trilingual NLP across Tamil, Sinhala, and English social streams, mapped to district-level heat in near real time.',
    kind: 'sentiment'
  },
  {
    n: '03',
    tag: 'INTEGRITY',
    title: 'Cyber-Secured Campaign Infrastructure',
    body: 'Air-gapped war rooms, end-to-end encrypted message logistics, and red-team rehearsed disinformation defence.',
    kind: 'cyber'
  }];

  return (
    <section id="engine" className="section container" data-screen-label="02 Engine">
      <div className="section-mark">/ 02 — ENGINE</div>
      <div className="section-head reveal-stagger">
        <div className="label-mono">The AAMA Engine</div>
        <h2 className="display display-lg">Not just strategy. <em style={{ fontStyle: 'italic' }}>Algorithmic precision.</em></h2>
      </div>
      <p className="body-lg reveal" style={{ maxWidth: '64ch', marginBottom: 64 }}>
        A proprietary machine-learning framework, built specifically for the contours of South Asian electorates. Three pillars hold up every campaign we deploy.
      </p>
      <div className="pillars reveal-stagger">
        {pillars.map((p) =>
        <article key={p.n} className="pillar">
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
function Bento({ density }) {
  const showSoon = density !== 'minimal';
  return (
    <section id="ecosystem" className="section container" data-screen-label="03 Ecosystem">
      <div className="section-mark">/ 03 — ECOSYSTEM</div>
      <div className="section-head reveal-stagger">
        <div className="label-mono">The AAMA Ecosystem</div>
        <h2 className="display display-lg">Two products. <em style={{ fontStyle: 'italic' }}>One signal.</em></h2>
      </div>
      <div className="bento reveal-stagger">
        <article className="bento-tile large">
          <div className="bento-tile-header">
            <span className="bento-tag">Freemium · AI News Delivery</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>01 / 02</span>
          </div>
          <img src="assets/logo-news.png" alt="AAMA News" style={{ height: 56, filter: 'var(--logo-filter, none)', width: "107px" }} />
          <p>An AI-curated newsroom built around political integrity — distilling Sri Lanka's daily political signal into a single trusted feed, free at the tier most readers need.</p>
          <a className="bento-link" href="#">
            <span>Explore AAMA News</span>
            <span className="arrow">→</span>
          </a>
          <div className="bento-viz"><BentoNewsViz /></div>
        </article>

        <article className="bento-tile">
          <div className="bento-tile-header">
            <span className="bento-tag">Full-fledged Tamil Podcast</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>02 / 02</span>
          </div>
          <img src="assets/logo-talks.png" alt="AAMA Talks" style={{ height: 48, filter: 'var(--logo-filter, none)', width: "92px" }} />
          <p>Long-form Tamil-language conversations with the architects, organisers, and dissenters shaping Sri Lankan public life.</p>
          <a className="bento-link" href="#">
            <span>Listen to AAMA Talks</span>
            <span className="arrow">→</span>
          </a>
          <div className="bento-viz" style={{ height: '52%' }}><BentoTalksViz /></div>
        </article>

        {showSoon &&
        <article className="bento-tile soon">
            <div className="bento-tile-header">
              <span className="bento-tag" style={{ background: 'transparent', color: 'var(--muted)', border: '1px dashed var(--hairline-strong)' }}>Roadmap</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>—</span>
            </div>
            <h3>AAMA Atlas</h3>
            <p style={{ fontSize: 14 }}>Interactive electoral cartography. Public release window: Q4.</p>
          </article>
        }
      </div>
    </section>);

}

// ===== Architects =====
function Architects() {
  return (
    <section id="architects" className="section container" data-screen-label="04 Architects">
      <div className="section-mark">/ 04 — ARCHITECTS</div>
      <div className="section-head reveal-stagger">
        <div className="label-mono">The Architects</div>
        <h2 className="display display-lg">Two disciplines. <em style={{ fontStyle: 'italic' }}>One founding signal.</em></h2>
      </div>
      <div className="architects reveal">
        <div className="architect">
          <div className="architect-portrait"><PortraitCode /></div>
          <div className="architect-tag">Co-founder · 01</div>
          <h3>Janakan Mahendrarajah <em>— The Code</em></h3>
          <p className="architect-role">Cyber-security · ML Infrastructure · Platform</p>
          <p className="body-md" style={{ margin: '0 0 24px', maxWidth: '40ch' }}>
            Builds the silent half of the campaign. Designs the inference stack, hardens the perimeter, and writes the playbook for what gets shipped — and what stays out of public hands.
          </p>
          <div className="architect-domains">
            <span className="domain-chip">ML/INFRA</span>
            <span className="domain-chip">SECOPS</span>
            <span className="domain-chip">DATA ENG</span>
            <span className="domain-chip">PLATFORM</span>
          </div>
        </div>
        <div className="architect">
          <div className="architect-portrait"><PortraitGround /></div>
          <div className="architect-tag">Co-founder · 02</div>
          <h3>Janakan Sivanganam <em>— The Ground</em></h3>
          <p className="architect-role">Journalism · Grassroots · Narrative</p>
          <p className="body-md" style={{ margin: '0 0 24px', maxWidth: '40ch' }}>
            Builds the loud half. Two decades inside Tamil-language print and broadcast journalism — the operator who knows which village hall, which Tuesday, and what to say when the cameras turn on.
          </p>
          <div className="architect-domains">
            <span className="domain-chip">JOURNALISM</span>
            <span className="domain-chip">FIELD OPS</span>
            <span className="domain-chip">MEDIA</span>
            <span className="domain-chip">NARRATIVE</span>
          </div>
        </div>
      </div>
    </section>);

}

// ===== Terminal Footer =====
function TerminalFooter({ t, lang }) {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | err
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((s) => !s), 540);
    return () => clearInterval(id);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    if (!/^\S+@\S+\.\S+$/.test(val.trim())) {
      setStatus('err');return;
    }
    setStatus('sending');
    // Send email via mailto
    const email = val.trim();
    const subject = encodeURIComponent('AAMA potential client');
    const body = encodeURIComponent(`New inquiry from: ${email}`);
    window.open(`mailto:mjanakan@hotmail.com?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => setStatus('done'), 1100);
  }

  return (
    <section id="deploy" className="terminal-section" data-screen-label="05 Deploy">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, flexWrap: 'wrap', gap: 16 }} lang={lang}>
          <div className="mono" style={{ color: 'var(--mint)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>/ 05 — DEPLOY</div>
          <div className="mono" style={{ color: 'var(--on-dark-soft)', fontSize: 11, letterSpacing: '0.1em' }}>aama_init.sh · v 0.42.1</div>
        </div>

        <div className="terminal reveal">
          <div className="terminal-bar">
            <div className="terminal-bar-dots">
              <span className="terminal-bar-dot"></span>
              <span className="terminal-bar-dot"></span>
              <span className="terminal-bar-dot"></span>
            </div>
            <span className="terminal-bar-title">~/aama/init — bash</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span>aama init --campaign --region=lk</span>
            </div>
            <div className="terminal-output">→ verifying signing keys ............ ok</div>
            <div className="terminal-output">→ provisioning data mesh ............ ok</div>
            <div className="terminal-output">→ loading Tamil + Sinhala corpora ... ok</div>
            <div className="terminal-output">→ awaiting operator handshake</div>

            <div className="terminal-prompt-line">
              {status === 'done' ?
              <>Operator received. Standing by, <em style={{ fontStyle: 'italic' }}>Architect.</em></> :
              <>Ready to deploy your campaign?{showCursor && <span style={{ color: 'var(--mint)' }}>▍</span>}</>
              }
            </div>

            <form className="terminal-form" onSubmit={submit}>
              <span className="terminal-form-prefix">aama@deploy:~$</span>
              <input
                type="email"
                value={val}
                onChange={(e) => {setVal(e.target.value);if (status === 'err') setStatus('idle');}}
                placeholder="Enter your email to begin initialisation"
                disabled={status === 'sending' || status === 'done'}
                aria-label="Email" />
              
              <button type="submit" disabled={status === 'sending' || status === 'done'}>
                {status === 'sending' ? '...' : status === 'done' ? '✓ SENT' : 'EXECUTE'}
              </button>
            </form>
            <div className={'terminal-status ' + (status === 'done' ? 'success' : '')}>
              {status === 'idle' && '> awaiting input ...'}
              {status === 'sending' && '> handshaking with operator node ...'}
              {status === 'done' && '> handshake complete. expect contact within 24h.'}
              {status === 'err' && '> err: invalid email format. retry.'}
            </div>
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
              <li><a href="#" target="_blank" rel="noopener">AAMA News</a></li>
              <li><a href="#" target="_blank" rel="noopener">AAMA Talks</a></li>
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
          <button onClick={() => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: next } }, '*');
          }} style={{
            background: 'transparent', border: '1px solid var(--on-dark-hairline)',
            color: 'var(--on-dark-soft)', borderRadius: 9999, padding: '6px 14px',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
            cursor: 'pointer', transition: 'all 200ms ease'
          }}>◐ LIGHT / DARK</button>
          <span>{t.footer.build}</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { useReveal, Nav, Hero, Engine, Bento, Architects, TerminalFooter, i18n });