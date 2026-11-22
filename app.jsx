/* global React, ReactDOM, Nav, Hero, Engine, Bento, Impact, Process, Faq, Trust, ContactFooter, i18n, useReveal */
const { useEffect, useState } = React;

function App() {
  const [lang, setLang] = useState(() => { try { const l = localStorage.getItem('aama-lang'); return ['en', 'ta', 'si'].includes(l) ? l : 'en'; } catch (e) { return 'en'; } });
  useEffect(() => { try { localStorage.setItem('aama-lang', lang); } catch (e) {} }, [lang]);
  const [theme, setTheme] = useState(() => localStorage.getItem('aama-theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aama-theme', theme);
  }, [theme]);

  useReveal();

  const t = i18n[lang] || i18n.en;

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} theme={theme} setTheme={setTheme} />
      <main>
        <Hero heroBg="mesh" t={t} lang={lang} />
        <Engine t={t} lang={lang} />
        <Bento density="expanded" t={t} lang={lang} />
        <Impact t={t} lang={lang} />
        <Process t={t} lang={lang} />
        <Faq t={t} lang={lang} />
        <Trust t={t} lang={lang} />
      </main>
      <ContactFooter t={t} lang={lang} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
