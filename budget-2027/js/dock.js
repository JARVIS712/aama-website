/* Bottom tab bar ("dock"), modelled on the iOS minimising tab bar.
   - Opens on load.
   - Shrinks to the AAMA mark + current section while the page is scrolled or used.
   - Opens again only when reached for: tap, hover (mouse), or keyboard.
   - After choosing a section it shrinks again. Esc shrinks it. */
(function () {
  const dock = document.getElementById('dock'); if (!dock) return;
  const mini = document.getElementById('dock-mini'), tabs = document.getElementById('dock-tabs'), label = document.getElementById('dock-label');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let state = 'open', lastY = window.scrollY, hoverT = 0;

  const links = () => Array.from(tabs.querySelectorAll('a'));
  function openWidth() {
    const avail = Math.min(window.innerWidth - 24, 780);
    const nat = links().reduce((s, a) => s + a.offsetWidth + 4, 0) + 16;
    return Math.min(avail, nat);
  }
  function width() { dock.style.width = (state === 'open' ? openWidth() : mini.offsetWidth) + 'px'; }

  function set(next, opts = {}) {
    if (next === state && !opts.force) return;
    state = next;
    dock.dataset.state = next;
    mini.setAttribute('aria-expanded', String(next === 'open'));
    tabs.inert = next !== 'open';                       // hidden tabs can't take focus
    tabs.setAttribute('aria-hidden', String(next !== 'open'));
    width();
    if (next === 'open') {
      const a = tabs.querySelector('a.on');
      if (a) tabs.scrollTo({ left: a.offsetLeft - (tabs.clientWidth - a.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      if (opts.focus && a) a.focus({ preventScroll: true });
    }
  }
  const open = (o) => set('open', o), shrink = () => set('min');

  /* Shrink while the page moves or is used */
  window.addEventListener('scroll', () => {
    const y = window.scrollY; if (Math.abs(y - lastY) > 6 && state === 'open') shrink(); lastY = y;
  }, { passive: true });
  document.addEventListener('pointerdown', (e) => { if (state === 'open' && !dock.contains(e.target)) shrink(); }, { passive: true });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state === 'open' && dock.contains(document.activeElement)) { shrink(); mini.focus({ preventScroll: true }); } });

  /* Open when reached for */
  mini.addEventListener('click', (e) => open({ focus: e.detail === 0 }));      // detail 0 = keyboard: move focus into the bar
  dock.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && state === 'min') { clearTimeout(hoverT); hoverT = setTimeout(() => open(), 140); } });
  dock.addEventListener('pointerleave', () => clearTimeout(hoverT));

  /* Choosing a section: let the selection show, then shrink */
  tabs.addEventListener('click', (e) => { if (e.target.closest('a')) setTimeout(shrink, 260); });

  /* Keep the label and width in step with the route */
  function sync() { const a = tabs.querySelector('a.on'); if (a) label.textContent = a.textContent.trim(); if (state === 'min') width(); }
  new MutationObserver(sync).observe(tabs, { attributes: true, subtree: true, attributeFilter: ['class'] });
  window.addEventListener('resize', width);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sync(); width(); });
  window.addEventListener('load', () => { sync(); set(state, { force: true }); });
  sync(); set('open', { force: true });
})();
