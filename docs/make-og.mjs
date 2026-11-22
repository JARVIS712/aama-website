// Generates the 1200x630 social-preview images:  assets/og-aama.png  and  budget-2027/og.png
// Run: PW=$(npm root -g)/playwright node docs/make-og.mjs
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url'; import {createRequire} from 'node:module';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(import.meta.url)(process.env.PW || 'playwright');

const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(root, 'assets', 'logo-main.png')).toString('base64');
const base = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#F4F1EC;color:#0F0F0E;font-family:Inter,system-ui,sans-serif;position:relative;overflow:hidden}
  .orb{position:absolute;right:-140px;top:-160px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#A4D2C5 0%,rgba(164,210,197,.35) 45%,transparent 70%)}
  .wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:14px;font-family:Fraunces,serif;font-weight:300;font-size:34px;letter-spacing:-.02em}
  .brand img{height:78px;width:auto;display:block}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:#6B675E;margin-top:auto}
  h1{font-family:Fraunces,serif;font-weight:300;font-size:72px;line-height:1.04;letter-spacing:-.03em;margin-top:18px;max-width:980px}
  .sub{font-size:26px;color:#4A4843;margin-top:22px}
  .chips{display:flex;gap:16px;margin-top:30px}
  .chip{background:#fff;border:1px solid #DCD7CC;border-radius:18px;padding:14px 22px}
  .chip b{display:block;font-size:34px;font-weight:600;letter-spacing:-.02em}
  .chip span{font-size:16px;color:#6B675E}
  .url{position:absolute;right:72px;bottom:56px;font-family:'JetBrains Mono',monospace;font-size:18px;color:#6B675E}
</style>`;

const cards = {
  [path.join(root, 'assets', 'og-aama.png')]: `${base}<div class="orb"></div><div class="wrap">
    <div class="brand"><img src="${logo}" alt="AAMA"></div>
    <div class="eyebrow">Aadhi Media Agency · Sri Lanka</div>
    <h1>Political media and campaign infrastructure.</h1>
    <div class="sub">Predictive modelling, trilingual sentiment tracking and secured campaign operations.</div></div><div class="url">aama.lk</div>`,
  [path.join(root, 'budget-2027', 'og.png')]: `${base}<div class="orb"></div><div class="wrap">
    <div class="brand"><img src="${logo}" alt="AAMA"></div>
    <div class="eyebrow">Budget 2027 explorer · 81st Budget Speech</div>
    <h1>Where the Budget gets its money, where it goes, and who it affects.</h1>
    <div class="chips"><div class="chip"><b>Rs 6.18tn</b><span>Revenue and grants</span></div><div class="chip"><b>Rs 7.93tn</b><span>Total spending</span></div><div class="chip"><b>Rs 1.75tn</b><span>Deficit, 4.5% of GDP</span></div></div></div><div class="url">aama.lk/budget-2027</div>`,
  [path.join(root, 'chemmani', 'og.png')]: `${base}<div class="wrap">
    <div class="brand"><img src="${logo}" alt="AAMA"></div>
    <div class="eyebrow">Jaffna · 1996 to 2026 · 36 sources</div>
    <h1>Chemmani: what the record shows.</h1>
    <div class="sub">Every figure and finding with its source and an evidence grade. Where sources disagree, both are shown.</div></div><div class="url">aama.lk/chemmani</div>`,
  [path.join(root, 'explainers', 'og.png')]: `${base}<div class="wrap">
    <div class="brand"><img src="${logo}" alt="AAMA"></div>
    <div class="eyebrow">Explainers · Budget 2027 · Chemmani</div>
    <h1>Public issues, worked through from the documents.</h1>
    <div class="sub" style="max-width:780px">Every figure links to the page it came from. Where sources disagree, you see both.</div></div><div class="url">aama.lk/explainers</div>`
};

const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [file, html] of Object.entries(cards)) {
  await p.setContent(html, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: file }); console.log('wrote', path.relative(root, file));
}
await b.close();
