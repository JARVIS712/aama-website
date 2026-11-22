/* Interface translation for the Chemmani explainer (and any page that loads a CH_I18N map).
   The data (timeline, sources, report, disputes) arrives already translated in data/i18n/ch.<lang>.js;
   this layer translates the interface text the app writes around it: labels, headings, tooltips,
   screen-reader labels and the page title. It runs after every render.
   Map: window.CH_I18N = { lang, months, exact: { english: translation }, templates: [[english, translation], ...] } */
(function () {
  var I = window.CH_I18N; if (!I) return;
  var norm = function (s) { return String(s == null ? '' : s).replace(/\s+/g, ' ').trim(); };
  var hasWords = function (s) { return /[A-Za-z]{2,}/.test(s); };

  // Templates: "{n} sources" -> /^(.+?) sources$/ ; placeholders filled by name, in order
  var T = (I.templates || []).map(function (t) {
    var names = (t[0].match(/\{[a-z]+\}/g) || []);
    var src = '^' + t[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{[a-z]+\\\}/g, '(.+?)') + '$';
    return { rx: new RegExp(src), names: names, out: t[1] };
  });
  // English month names inside a filled-in value (e.g. a date) become this language's month names
  var EN_MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MRX = /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b/g;
  function monthName(m) { for (var i = 0; i < 12; i++) if (EN_MON[i].indexOf(m.replace(/^Sept$/, 'Sep')) === 0) return I.months[i]; return m; }
  function months(v) {
    if (!I.months) return v;
    if (I.lang === 'si') v = v.replace(/\b(\d{1,2}(?:–\d{1,2})?) ([A-Z][a-z]+) (\d{4})\b/g, function (all, d, m, y) { return MRX.test(m) ? y + ' ' + m + ' ' + d : all; })
                          .replace(/\b([A-Z][a-z]+) (\d{4})\b/g, function (all, m, y) { MRX.lastIndex = 0; return MRX.test(m) ? y + ' ' + m : all; });
    MRX.lastIndex = 0;
    return v.replace(MRX, monthName);
  }
  var cache = Object.create(null);
  function tr(s) {
    s = norm(s); if (!s || !hasWords(s)) return null;
    if (s in cache) return cache[s];
    var r = I.exact[s] || null;
    if (!r) for (var i = 0; i < T.length; i++) {
      var m = s.match(T[i].rx); if (!m) continue;
      var vals = {}; T[i].names.forEach(function (n, k) { var v = m[k + 1]; (vals[n] = vals[n] || []).push(I.exact[norm(v)] || months(v)); });
      // {n} fills in order; {n#2} takes the 2nd English value (set by the build where a translation reorders them)
      var used = {}; r = T[i].out.replace(/\{([a-z]+)(?:#(\d+))?\}/g, function (ph, name, idx) { var key = '{' + name + '}', arr = vals[key] || []; if (idx) return arr[+idx - 1] != null ? arr[+idx - 1] : ph; used[key] = (used[key] || 0) + 1; return arr[used[key] - 1] != null ? arr[used[key] - 1] : ph; });
      break;
    }
    return (cache[s] = r);
  }

  var INLINE = function (el) { return getComputedStyle(el).display === 'inline'; };
  var INLINEISH = function (el) { return /^inline/.test(getComputedStyle(el).display); };
  var letters = function (n) { return n.nodeType === 3 && /[A-Za-z஀-௿඀-෿]{2,}/.test(n.data); };

  function eachText(el, fn) { var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null); var list = []; while (w.nextNode()) list.push(w.currentNode); list.forEach(fn); }
  function textNode(n) { var t = tr(n.data); if (t) n.data = (/^\s/.test(n.data) ? ' ' : '') + t + (/\s$/.test(n.data) ? ' ' : ''); }
  function applyBlock(el, t) {
    var kids = el.childNodes, els = [], direct = false;
    for (var i = 0; i < kids.length; i++) { if (kids[i].nodeType === 1) els.push(kids[i]); else if (letters(kids[i])) direct = true; }
    if (!els.length) { el.textContent = t; return; }
    if (!direct && els.length === 1) { applyBlock(els[0], t); return; }
    if (!el.querySelector('a,button,input,select,textarea,svg')) { el.textContent = t; return; }
    eachText(el, textNode); // keep links and controls: translate their pieces instead
  }
  function blockOf(n) { var el = n.parentElement; while (el && el !== document.body && INLINE(el) && el.parentElement) el = el.parentElement; return el; }

  function pass() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: function (n) { var p = n.parentElement; return p && !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName) && hasWords(n.data) ? 1 : 2; } });
    var blocks = new Set(); while (w.nextNode()) blocks.add(blockOf(w.currentNode));
    blocks.forEach(function (el) {
      if (!el) return;
      var kids = el.childNodes, inlineOnly = true, prose = false, allInlineish = true;
      for (var i = 0; i < kids.length; i++) { var c = kids[i]; if (c.nodeType === 1) { if (!INLINE(c)) inlineOnly = false; if (!INLINEISH(c)) allInlineish = false; } else if (letters(c)) prose = true; }
      if (inlineOnly || (prose && allInlineish)) {
        var t = tr(el.textContent);
        if (t) applyBlock(el, t);
        else if (el.children.length) { for (var j = 0; j < el.children.length; j++) { var ct = tr(el.children[j].textContent); if (ct) applyBlock(el.children[j], ct); } eachText(el, textNode); }
        else eachText(el, textNode);
      } else for (var k = 0; k < kids.length; k++) {
        var c2 = kids[k];
        if (c2.nodeType === 3) textNode(c2);
        else if (c2.nodeType === 1 && INLINE(c2)) { var it = tr(c2.textContent); if (it) applyBlock(c2, it); }
      }
    });
    ['aria-label', 'title', 'placeholder', 'alt'].forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) { var t = tr(el.getAttribute(a)); if (t) el.setAttribute(a, t); });
    });
    document.querySelectorAll('[data-tip]').forEach(function (el) {
      var parts = el.getAttribute('data-tip').split('|'), changed = false;
      parts = parts.map(function (p) { var t = tr(p); if (t) { changed = true; return t; } return p; });
      if (changed) {
        var before = el.getAttribute('data-tip').split('|').join('. ');
        el.setAttribute('data-tip', parts.join('|'));
        // chart points read their tooltip aloud: keep the screen-reader label in step
        if (el.getAttribute('aria-label') === before) el.setAttribute('aria-label', parts.join('. '));
      }
    });
    var dt = tr(document.title); if (dt) document.title = dt;
  }

  var queued = false, obs;
  function run() { queued = false; obs.disconnect(); try { pass(); } finally { obs.observe(document.body, { childList: true, subtree: true }); } }
  obs = new MutationObserver(function () { if (!queued) { queued = true; requestAnimationFrame(run); } });
  var start = function () { run(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
  // The app sets document.title after each view; translate it when it changes
  var tEl = document.querySelector('title');
  if (tEl) new MutationObserver(function () { var t = tr(document.title); if (t && t !== document.title) document.title = t; }).observe(tEl, { childList: true });
})();
