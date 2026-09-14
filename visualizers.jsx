/* global React */
const { useEffect, useRef } = React;

// ===== Hero particle mesh =====
function ParticleMesh({ variant = 'mesh', intensity = 'subtle' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0,h = 0,dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    let particles = [];
    const COUNT = variant === 'topo' ? 0 : variant === 'voronoi' ? 80 : 120;
    const LINK_DIST = 140;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;h = rect.height;
      canvas.width = w * dpr;canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.7 + Math.random() * 1.4,
          life: Math.random()
        });
      }
    }

    let mouse = { x: -9999, y: -9999 };
    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;mouse.y = e.clientY - r.top;
    }
    function onLeave() {mouse.x = -9999;mouse.y = -9999;}

    function drawMesh() {
      const dark = isDark();
      const inkRgb = dark ? '244,241,236' : '15,15,14';
      const mintRgb = '164,210,197';

      ctx.clearRect(0, 0, w, h);

      // soft atmospheric orb (mint, very subtle)
      const orb = ctx.createRadialGradient(w * 0.3, h * 0.55, 0, w * 0.3, h * 0.55, Math.max(w, h) * 0.55);
      orb.addColorStop(0, `rgba(${mintRgb}, ${dark ? 0.10 : 0.18})`);
      orb.addColorStop(0.5, `rgba(${mintRgb}, ${dark ? 0.04 : 0.06})`);
      orb.addColorStop(1, `rgba(${mintRgb}, 0)`);
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, w, h);

      const orb2 = ctx.createRadialGradient(w * 0.85, h * 0.2, 0, w * 0.85, h * 0.2, Math.max(w, h) * 0.4);
      orb2.addColorStop(0, `rgba(${mintRgb}, ${dark ? 0.06 : 0.10})`);
      orb2.addColorStop(1, `rgba(${mintRgb}, 0)`);
      ctx.fillStyle = orb2;
      ctx.fillRect(0, 0, w, h);

      // particles
      for (let p of particles) {
        p.x += p.vx;p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // mouse repel
        const dx = p.x - mouse.x,dy = p.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 120) {
          const f = (120 - md) / 120 * 0.5;
          p.x += dx / md * f;
          p.y += dy / md * f;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${inkRgb}, ${dark ? 0.55 : 0.42})`;
        ctx.fill();
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i],b = particles[j];
          const dx = a.x - b.x,dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * (dark ? 0.18 : 0.14);
            ctx.strokeStyle = `rgba(${inkRgb}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function drawOrbs() {
      const dark = isDark();
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, w, h);
      const orbs = [
      { hue: '164,210,197', x: 0.3 + Math.sin(t * 0.18) * 0.05, y: 0.5 + Math.cos(t * 0.22) * 0.04, r: 0.55, a: dark ? 0.18 : 0.32 },
      { hue: '26,58,57', x: 0.78 + Math.cos(t * 0.15) * 0.04, y: 0.3 + Math.sin(t * 0.2) * 0.05, r: 0.42, a: dark ? 0.16 : 0.10 },
      { hue: '164,210,197', x: 0.65 + Math.sin(t * 0.12) * 0.03, y: 0.78 + Math.cos(t * 0.18) * 0.03, r: 0.38, a: dark ? 0.10 : 0.18 }];

      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.x * w, o.y * h, 0, o.x * w, o.y * h, Math.max(w, h) * o.r);
        g.addColorStop(0, `rgba(${o.hue}, ${o.a})`);
        g.addColorStop(0.5, `rgba(${o.hue}, ${o.a * 0.25})`);
        g.addColorStop(1, `rgba(${o.hue}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function drawTopo() {
      const dark = isDark();
      const inkRgb = dark ? '244,241,236' : '15,15,14';
      const mintRgb = '164,210,197';
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, w, h);

      // mint orb
      const orb = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.6);
      orb.addColorStop(0, `rgba(${mintRgb}, ${dark ? 0.12 : 0.18})`);
      orb.addColorStop(1, `rgba(${mintRgb}, 0)`);
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5,cy = h * 0.55;
      const rings = 22;
      for (let i = 0; i < rings; i++) {
        const phase = (t * 0.4 + i * 0.16) % 1;
        const radius = phase * Math.max(w, h) * 0.7;
        const alpha = (1 - phase) * (dark ? 0.22 : 0.16);
        ctx.strokeStyle = `rgba(${inkRgb}, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function drawVoronoi() {
      const dark = isDark();
      const inkRgb = dark ? '244,241,236' : '15,15,14';
      const mintRgb = '164,210,197';
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, w, h);

      // orb
      const orb = ctx.createRadialGradient(w * 0.4, h * 0.5, 0, w * 0.4, h * 0.5, Math.max(w, h) * 0.55);
      orb.addColorStop(0, `rgba(${mintRgb}, ${dark ? 0.12 : 0.20})`);
      orb.addColorStop(1, `rgba(${mintRgb}, 0)`);
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, w, h);

      // tessellation: triangulate moving particles via simple nearest-pairs
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      // draw lines from each point to its nearest 3 neighbours
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ds = [];
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          ds.push({ d, b });
        }
        ds.sort((x, y) => x.d - y.d);
        for (let k = 0; k < 3 && k < ds.length; k++) {
          const { d, b } = ds[k];
          if (d < 220) {
            ctx.strokeStyle = `rgba(${inkRgb}, ${(1 - d / 220) * (dark ? 0.20 : 0.16)})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${inkRgb}, ${dark ? 0.55 : 0.4})`;
        ctx.fill();
      }
    }

    function draw() {
      if (variant === 'orbs') drawOrbs();else
      if (variant === 'topo') drawTopo();else
      if (variant === 'voronoi') drawVoronoi();else
      drawMesh();
    }

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) draw();else
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} />;
}

// ===== Pillar visualizers (small SVG animations) =====
function PillarViz({ kind }) {
  // Three pillars: predictive (scatter+regression), sentiment (waveform/heatmap), cyber (lock + lattice)
  if (kind === 'predictive') {
    return (
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="predGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--mint)" stopOpacity="0.0" />
            <stop offset="60%" stopColor="var(--mint)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--mint)" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* grid */}
        {[0, 1, 2, 3, 4].map((i) =>
        <line key={i} x1={i * 64} y1={0} x2={i * 64} y2={120} stroke="var(--hairline)" strokeWidth="0.5" />
        )}
        {[0, 1, 2, 3].map((i) =>
        <line key={i} x1={0} y1={i * 30} x2={320} y2={i * 30} stroke="var(--hairline)" strokeWidth="0.5" />
        )}
        {/* regression line */}
        <path d="M 8 96 Q 100 80, 160 56 T 312 16" fill="none" stroke="var(--ink)" strokeWidth="1.4" strokeDasharray="0" opacity="0.85">
          <animate attributeName="stroke-dasharray" from="0,400" to="400,0" dur="2.4s" fill="freeze" />
        </path>
        <path d="M 8 96 Q 100 80, 160 56 T 312 16 L 312 120 L 8 120 Z" fill="url(#predGrad)" opacity="0.6" />
        {/* points */}
        {[[20, 98], [55, 90], [88, 82], [120, 72], [150, 60], [180, 50], [212, 42], [245, 32], [278, 22], [305, 16]].map(([x, y], i) =>
        <circle key={i} cx={x} cy={y} r="2.3" fill="var(--ink)">
            <animate attributeName="r" values="0;2.3" dur="0.4s" begin={`${i * 0.08}s`} fill="freeze" />
          </circle>
        )}
        {/* x-axis tick labels */}
        <text x="8" y="115" fontFamily="JetBrains Mono" fontSize="8" fill="var(--muted)" letterSpacing="0.05em">T-90</text>
        <text x="285" y="115" fontFamily="JetBrains Mono" fontSize="8" fill="var(--muted)">T-0</text>
      </svg>);

  }
  if (kind === 'sentiment') {
    return (
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {/* waveform bars */}
        {Array.from({ length: 56 }).map((_, i) => {
          const seed = Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.6) * 0.5;
          const h = 8 + Math.abs(seed) * 80;
          return (
            <rect key={i} x={i * 5.7 + 2} y={(120 - h) / 2} width="2.6" height={h} fill="var(--ink)" opacity={0.35 + Math.abs(seed) * 0.5}>
              <animate attributeName="height" values={`${h * 0.6};${h};${h * 0.6}`} dur={`${1.8 + i % 5 * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="y" values={`${(120 - h * 0.6) / 2};${(120 - h) / 2};${(120 - h * 0.6) / 2}`} dur={`${1.8 + i % 5 * 0.3}s`} repeatCount="indefinite" />
            </rect>);

        })}
        <line x1="0" y1="60" x2="320" y2="60" stroke="var(--mint)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6" />
      </svg>);

  }
  if (kind === 'cyber') {
    return (
      <svg viewBox="0 0 320 120" preserveAspectRatio="none" style={{ height: '100%', width: "405.336px" }}>
        {/* hex lattice */}
        <defs>
          <pattern id="hex" x="0" y="0" width="32" height="28" patternUnits="userSpaceOnUse">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke="var(--hairline-strong)" strokeWidth="0.6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill="url(#hex)" />
        {/* central padlock-ish geometry */}
        <g transform="translate(160 60)">
          <circle r="22" fill="var(--canvas)" stroke="var(--ink)" strokeWidth="1" />
          <rect x="-10" y="-4" width="20" height="14" rx="2" fill="var(--ink)" />
          <path d="M -6 -4 L -6 -10 A 6 6 0 0 1 6 -10 L 6 -4" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        </g>
        {/* signal pings */}
        {[0, 1, 2].map((i) =>
        <circle key={i} cx="160" cy="60" r="22" fill="none" stroke="var(--mint)" strokeWidth="0.8" opacity="0.6">
            <animate attributeName="r" from="22" to="56" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
          </circle>
        )}
      </svg>);

  }
  return null;
}

// ===== Bento visualizers =====
function BentoNewsViz() {
  // News: ticker rows + "feed" lines
  return (
    <svg viewBox="0 0 480 220" preserveAspectRatio="xMidYMax slice" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--surface-card)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--surface-card)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* feed rows */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) =>
      <g key={i} transform={`translate(0 ${i * 28 + 12})`} opacity={1 - i * 0.1}>
          <rect x="24" y="0" width="60" height="9" rx="2" fill="var(--mint)" opacity="0.5" />
          <rect x="92" y="0" width={120 + i % 3 * 60} height="9" rx="2" fill="var(--ink)" opacity="0.85" />
          <rect x={224 + i % 3 * 60} y="0" width={80 + i % 2 * 40} height="9" rx="2" fill="var(--muted)" opacity="0.4" />
          <rect x="24" y="14" width={260 + i % 4 * 30} height="6" rx="2" fill="var(--hairline-strong)" opacity="0.55" />
        </g>
      )}
      {/* fade overlay */}
      <rect x="0" y="0" width="480" height="40" fill="url(#fade)" />
    </svg>);

}

function BentoTalksViz() {
  // Talks: long oscilloscope waveform with timecode
  return (
    <svg viewBox="0 0 480 132" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
      <line x1="0" y1="66" x2="480" y2="66" stroke="var(--hairline-soft)" strokeWidth="0.5" />
      {Array.from({ length: 70 }).map((_, i) => {
        const seed = Math.sin(i * 0.65) * 0.6 + Math.sin(i * 0.22) * 0.4 + Math.sin(i * 1.1) * 0.2;
        const h = 6 + Math.abs(seed) * 64;
        return (
          <rect key={i} x={i * 6.6 + 4} y={(132 - h) / 2} width="3" height={h} rx="1" fill="var(--ink)" opacity={0.32 + Math.abs(seed) * 0.55}>
            <animate attributeName="height" values={`${h * 0.7};${h};${h * 0.7}`} dur={`${2 + i % 7 * 0.22}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${(132 - h * 0.7) / 2};${(132 - h) / 2};${(132 - h * 0.7) / 2}`} dur={`${2 + i % 7 * 0.22}s`} repeatCount="indefinite" />
          </rect>);

      })}
      <text x="14" y="124" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)" letterSpacing="0.06em">00:00</text>
      <text x="430" y="124" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)" letterSpacing="0.06em">42:18</text>
    </svg>);

}

Object.assign(window, { ParticleMesh, PillarViz, BentoNewsViz, BentoTalksViz });