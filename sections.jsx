/* global React, ParticleMesh, PillarViz, BentoNewsViz, BentoTalksViz */
const { useState, useEffect, useRef } = React;

// Strings live in i18n.jsx (window.i18n).

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


// ===== Shared email form logic =====
// Both forms post to the same Formspree endpoint; `source` tells them apart.
function useEmailForm(source) {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | err | fail

  async function submit(e, extra) {
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
        body: JSON.stringify({ email: val.trim(), source, ...(extra || {}) })
      });
      setStatus(res.ok ? 'done' : 'fail');
    } catch {
      setStatus('fail');
    }
  }

  function onChange(e) {
    setVal(e.target.value);
    if (status === 'err' || status === 'fail') setStatus('idle');
  }

  return { val, status, submit, onChange };
}

// ===== Nav =====
function Nav({ lang, setLang, t, theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '#practices', label: t.nav.practices },
    { href: '#paperly', label: t.nav.paperly },
    { href: '#engine', label: t.nav.engine },
    { href: '#media', label: t.nav.media },
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

// ===== Paperly wordmark =====
function PaperlyMark({ size = 22 }) {
  return (
    <span className="pp-wordmark" style={{ fontSize: size }} aria-label="Paperly">
      paperly<span className="pp-dot">.</span>
    </span>);
}

// ===== Hero mark card =====
// A sample marked answer, showing what Paperly does in one glance.
function MarkCard({ t, lang }) {
  const c = t.card;
  return (
    <figure className="mark-card" lang={lang} aria-label={c.badge}>
      <div className="mark-card-top">
        <PaperlyMark size={17} />
        <span className="mark-card-badge mono">{c.badge}</span>
      </div>
      <div className="mark-card-subject mono">{c.subject}</div>
      <p className="mark-card-q">{c.question}</p>

      <div className="mark-card-sheet" aria-hidden="true">
        <div className="hand hand-1">V = IR</div>
        <div className="hand hand-2">I = 12 / 6</div>
        <div className="hand hand-3">I = <span className="hl">2</span></div>
        <div className="hand-margin">{c.margin}</div>
        <div className="mark-score">2<span>/4</span></div>
      </div>

      <ul className="mark-scheme">
        {c.scheme.map((s, i) =>
        <li key={i} className={'mark-scheme-row ' + (s.ok ? 'ok' : 'lost')} style={{ animationDelay: (900 + i * 450) + 'ms' }}>
            <span className="mark-scheme-icon" aria-hidden="true">{s.ok ? '✓' : '✗'}</span>
            <span className="mark-scheme-label">{s.label}</span>
            <span className="mark-scheme-marks mono">{s.marks}</span>
          </li>
        )}
      </ul>

      <figcaption className="mark-feedback">{c.feedback}</figcaption>
    </figure>);
}

// ===== Hero =====
function Hero({ heroBg, t, lang }) {
  return (
    <section className="hero" data-screen-label="01 Hero" lang={lang}>
      <ParticleMesh variant={heroBg} />
      <div className="hero-content container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-meta reveal mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <span>{t.hero.eyebrow}</span>
            </div>
            <h1 className="display display-mega hero-h1 reveal">
              {t.hero.h1a}<br />
              {t.hero.h1b}<em>{t.hero.h1c}</em>
            </h1>
            <p className="hero-sub reveal">{t.hero.sub}</p>
            <div className="hero-ctas reveal">
              <a className="btn btn-primary" href="#paperly">{t.hero.ctaPrimary} <span aria-hidden="true">→</span></a>
              <a className="btn btn-ghost" href="#practices">{t.hero.ctaSecondary}</a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <MarkCard t={t} lang={lang} />
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <div className="hero-foot-row container">
          <div className="hero-coords">{t.hero.coords}</div>
        </div>
      </div>
    </section>);

}

// ===== Practices =====
function Practices({ t, lang }) {
  const p = t.practices;
  return (
    <section id="practices" className="section container" data-screen-label="02 Practices" lang={lang}>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{p.label}</span>
        <h2 className="display display-lg">{p.h2a}<em style={{ fontStyle: 'italic' }}>{p.h2b}</em></h2>
      </div>
      <p className="body-lg reveal" style={{ maxWidth: '64ch', marginBottom: 56 }}>{p.intro}</p>
      <div className="practices reveal-stagger">
        {p.items.map((it) =>
        <a key={it.n} href={it.href} className={'practice' + (it.isNew ? ' practice-new' : '')}>
            <div className="pillar-number">
              <span>{it.n}</span>
              <span>{it.isNew ? <span className="practice-new-tag">{p.newLabel}</span> : null}{it.tag}</span>
            </div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
            <ul className="practice-links">
              {it.links.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <span className="bento-link practice-cta">{it.cta} <span className="arrow">→</span></span>
          </a>
        )}
      </div>
    </section>);
}

// ===== Paperly spotlight =====
const PP_FEATURE_ICONS = { Papers: '▤', Mark: '✓', Progress: '↗', Mock: '◷' };

function Paperly({ t, lang }) {
  const p = t.paperly;
  const form = useEmailForm('paperly-waitlist');
  const busy = form.status === 'sending' || form.status === 'done';

  return (
    <section id="paperly" className="section container" data-screen-label="03 Paperly" lang={lang}>
      <div className="pp reveal">
        <div className="pp-head">
          <div className="pp-brand">
            <PaperlyMark size={40} />
            <span className="pp-by mono">{p.by}</span>
          </div>
          <span className="pp-status mono"><span className="pp-status-dot" aria-hidden="true"></span>{p.status}</span>
        </div>

        <div className="pp-intro">
          <h2 className="pp-h2">{p.h2}</h2>
          <p className="pp-sub">{p.sub}</p>
        </div>

        <blockquote className="pp-quote">
          {p.quoteA}<mark>{p.quoteB}</mark>
        </blockquote>

        <div className="pp-features">
          {p.features.map((f) =>
          <article key={f.name} className="pp-feature">
              <span className="pp-feature-icon" aria-hidden="true">{PP_FEATURE_ICONS[f.name]}</span>
              <h3>{f.name}</h3>
              <p>{f.body}</p>
            </article>
          )}
        </div>

        <div className="pp-curricula">
          <span className="pp-label mono">{p.curriculaLabel}</span>
          <ul>
            {p.curricula.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>

        <div className="pp-stats">
          {p.stats.map((s, i) =>
          <div key={i} className="pp-stat">
              <div className="pp-stat-value">{s.value}</div>
              <p>{s.label}</p>
            </div>
          )}
        </div>

        <div className="pp-audiences">
          {p.audiences.map((a) =>
          <article key={a.who} className="pp-audience">
              <span className="pp-label mono">{a.who}</span>
              <h3>{a.head}</h3>
              <p>{a.line}</p>
            </article>
          )}
        </div>

        <div className="pp-cta">
          <div className="pp-cta-copy">
            <h3>{p.waitlistTitle}</h3>
            <p>{p.waitlistSub}</p>
            <p className="pp-launch">{p.launch}</p>
          </div>
          <div className="pp-cta-form">
            <form className="pp-form" onSubmit={(e) => form.submit(e, { lang })}>
              <input
                type="email"
                value={form.val}
                onChange={form.onChange}
                placeholder={p.placeholder}
                disabled={busy}
                aria-label="Email" />
              <button type="submit" disabled={busy}>
                {form.status === 'sending' ? t.deploy.sendingLabel : form.status === 'done' ? t.deploy.sentLabel : p.cta}
              </button>
            </form>
            <div className={'pp-form-status' + (form.status === 'done' ? ' success' : '')} role="status">
              {form.status === 'sending' && t.deploy.statusSending}
              {form.status === 'done' && p.statusDone}
              {form.status === 'err' && t.deploy.statusErr}
              {form.status === 'fail' && t.deploy.statusFail}
            </div>
            <a className="pp-site mono" href="https://paperly.academy" target="_blank" rel="noopener">{p.site} ↗</a>
          </div>
        </div>
      </div>
    </section>);
}

// ===== Engine =====
function Engine({ t, lang }) {
  const kinds = ['predictive', 'sentiment', 'cyber'];
  const pillars = t.engine.pillars.map((p, i) => ({ ...p, n: '0' + (i + 1), kind: kinds[i] }));

  return (
    <section id="engine" className="section container" data-screen-label="04 Engine" lang={lang}>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{t.engine.label}</span>
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

// ===== Bento (media) =====
function Bento({ density, t, lang }) {
  const showSoon = density !== 'minimal';
  return (
    <section id="media" className="section container" data-screen-label="05 Media" lang={lang}>
      <span id="ecosystem" aria-hidden="true"></span>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{t.ecosystem.label}</span>
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
    <section id="impact" className="section container" data-screen-label="06 Impact" lang={lang}>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{t.impact.label}</span>
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
    <section id="process" className="section container" data-screen-label="07 Process" lang={lang}>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{t.process.label}</span>
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
    <section id="faq" className="section container" data-screen-label="08 FAQ" lang={lang}>
      <div className="section-head reveal-stagger">
        <span className="section-head-label mono">{t.faq.label}</span>
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
    <section id="trust" className="section container section-tight" data-screen-label="09 Trust" lang={lang}>
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
  const form = useEmailForm('contact');
  const [topic, setTopic] = useState('');
  const busy = form.status === 'sending' || form.status === 'done';
  const cols = t.footer.cols;

  return (
    <section id="deploy" className="deploy-section" data-screen-label="10 Contact">
      <div className="container">
        <div className="deploy-panel reveal" lang={lang}>
          <h2 className="display display-lg" style={{ color: 'var(--on-dark)' }}>
            {t.deploy.h2a}<em style={{ fontStyle: 'italic' }}>{t.deploy.h2b}</em>
          </h2>
          <p className="deploy-sub">{t.deploy.sub}</p>

          <div className="deploy-topics" role="group" aria-label={t.deploy.topicsLabel}>
            <span className="deploy-topics-label mono">{t.deploy.topicsLabel}</span>
            {t.deploy.topics.map((tp) =>
            <button
              key={tp.id}
              type="button"
              className={'deploy-topic' + (topic === tp.id ? ' is-active' : '')}
              aria-pressed={topic === tp.id}
              disabled={busy}
              onClick={() => setTopic(topic === tp.id ? '' : tp.id)}>
                {tp.label}
              </button>
            )}
          </div>

          <form className="deploy-form" onSubmit={(e) => form.submit(e, { interest: topic || 'unspecified', lang })}>
            <input
              type="email"
              value={form.val}
              onChange={form.onChange}
              placeholder={t.deploy.placeholder}
              disabled={busy}
              aria-label="Email" />

            <button type="submit" disabled={busy}>
              {form.status === 'sending' ? t.deploy.sendingLabel : form.status === 'done' ? t.deploy.sentLabel : t.deploy.cta}
            </button>
          </form>
          <div className={'deploy-status' + (form.status === 'done' ? ' success' : '')} role="status">
            {form.status === 'sending' && t.deploy.statusSending}
            {form.status === 'done' && t.deploy.statusDone}
            {form.status === 'err' && t.deploy.statusErr}
            {form.status === 'fail' && t.deploy.statusFail}
          </div>
        </div>

        <div className="footer-grid" lang={lang}>
          <div className="footer-col">
            <img src="assets/logo-main-white.png" alt="AAMA" style={{ height: 48, marginBottom: 18 }} />
            <p className="footer-brand-sub">{t.footer.sub}</p>
          </div>
          <div className="footer-col">
            <h4>{cols[0]}</h4>
            <ul>
              <li>AAMA News <span className="footer-soon">({t.ecosystem.comingSoon})</span></li>
              <li>AAMA Talks <span className="footer-soon">({t.ecosystem.comingSoon})</span></li>
              <li><a href="Roadmap.html">Roadmap</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{cols[1]}</h4>
            <ul>
              <li><a href="Predictive Analytics.html">Predictive Analytics</a></li>
              <li><a href="Sentiment Mapping.html">Sentiment Mapping</a></li>
              <li><a href="Cyber Infrastructure.html">Cyber Infrastructure</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{cols[2]}</h4>
            <ul>
              <li><a href="#paperly">Paperly</a></li>
              <li><a href="#paperly">{t.footer.paperlyWaitlist}</a></li>
              <li><a href="https://paperly.academy" target="_blank" rel="noopener">paperly.academy ↗</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{cols[3]}</h4>
            <ul>
              <li>{t.footer.office[0]}</li>
              <li>{t.footer.office[1]}</li>
              <li><a href="https://wa.me/94721271999" target="_blank" rel="noopener">{t.footer.office[2]} ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 · {t.footer.legal}</span>
        </div>
      </div>
    </section>);

}

Object.assign(window, { useReveal, Nav, Hero, Practices, Paperly, Engine, Bento, Impact, Process, Faq, Trust, ContactFooter });
