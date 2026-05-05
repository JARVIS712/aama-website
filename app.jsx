/* global React, ReactDOM, Nav, Hero, Engine, Bento, Architects, TerminalFooter, i18n, useReveal,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakSlider */
const { useEffect } = React;

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme || 'light');
  }, [tweaks.theme]);

  // Apply font pair
  useEffect(() => {
    const root = document.documentElement;
    const pairs = {
      'fraunces-inter': { display: "'Fraunces', 'Times New Roman', serif", body: "'Inter', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      'space-grotesk': { display: "'Space Grotesk', sans-serif", body: "'Inter', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
      'plex': { display: "'IBM Plex Serif', serif", body: "'IBM Plex Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }
    };
    const p = pairs[tweaks.fontPair] || pairs['fraunces-inter'];
    root.style.setProperty('--font-display', p.display);
    root.style.setProperty('--font-body', p.body);
    root.style.setProperty('--font-mono', p.mono);
  }, [tweaks.fontPair]);

  // Accent color
  useEffect(() => {
    const root = document.documentElement;
    const accents = {
      mint:    { mint: '#A4D2C5', forest: '#1A3A39' },
      sky:     { mint: '#A8C8E8', forest: '#1A2D3A' },
      saffron: { mint: '#F4D29A', forest: '#3A2A1A' },
      lavender:{ mint: '#C8B8E0', forest: '#2A1A3A' },
      rose:    { mint: '#E8B8C4', forest: '#3A1A28' }
    };
    const a = accents[tweaks.accent] || accents.mint;
    root.style.setProperty('--mint', a.mint);
    root.style.setProperty('--forest', a.forest);
  }, [tweaks.accent]);

  // Animation intensity
  useEffect(() => {
    document.body.classList.toggle('anim-off', tweaks.anim === 'off');
  }, [tweaks.anim]);

  useReveal();

  const lang = tweaks.lang || 'en';
  const t = i18n[lang] || i18n.en;

  return (
    <>
      <Nav lang={lang} setLang={(l) => setTweak('lang', l)} t={t} theme={tweaks.theme} />
      <Hero heroBg={tweaks.heroBg || 'mesh'} t={t} lang={lang} />
      <Engine />
      <Bento density={tweaks.bentoDensity || 'expanded'} />
      <Architects />
      <TerminalFooter t={t} lang={lang} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Language" />
        <TweakRadio
          label="Script"
          value={lang}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'ta', label: 'தமிழ்' },
            { value: 'si', label: 'සිං' }
          ]}
          onChange={(v) => setTweak('lang', v)}
        />

        <TweakSection label="Canvas" />
        <TweakRadio
          label="Theme"
          value={tweaks.theme}
          options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakSelect
          label="Accent"
          value={tweaks.accent}
          options={[
            { value: 'mint', label: 'Mint × Forest (brand)' },
            { value: 'sky', label: 'Sky × Navy' },
            { value: 'saffron', label: 'Saffron × Earth' },
            { value: 'lavender', label: 'Lavender × Plum' },
            { value: 'rose', label: 'Rose × Wine' }
          ]}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="Hero" />
        <TweakSelect
          label="Background"
          value={tweaks.heroBg}
          options={[
            { value: 'mesh', label: 'Particle mesh' },
            { value: 'orbs', label: 'Drifting orbs' },
            { value: 'topo', label: 'Topographic pulse' },
            { value: 'voronoi', label: 'Voronoi tessellation' }
          ]}
          onChange={(v) => setTweak('heroBg', v)}
        />

        <TweakSection label="Type" />
        <TweakSelect
          label="Pairing"
          value={tweaks.fontPair}
          options={[
            { value: 'fraunces-inter', label: 'Fraunces · Inter · Mono' },
            { value: 'space-grotesk', label: 'Space Grotesk · Inter' },
            { value: 'plex', label: 'IBM Plex (Serif/Sans/Mono)' }
          ]}
          onChange={(v) => setTweak('fontPair', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Bento density"
          value={tweaks.bentoDensity}
          options={[
            { value: 'minimal', label: 'Minimal' },
            { value: 'expanded', label: 'Expanded' }
          ]}
          onChange={(v) => setTweak('bentoDensity', v)}
        />
        <TweakRadio
          label="Animation"
          value={tweaks.anim}
          options={[
            { value: 'off', label: 'Off' },
            { value: 'subtle', label: 'Subtle' },
            { value: 'full', label: 'Full' }
          ]}
          onChange={(v) => setTweak('anim', v)}
        />
      </TweaksPanel>
    </>
  );
}

// Lazily load alternate fonts when needed
(function loadAlternates() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=IBM+Plex+Serif:wght@300;400&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap';
  document.head.appendChild(link);
})();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
