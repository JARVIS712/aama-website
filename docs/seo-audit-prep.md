# SEO audit prep: aama.lk

Prepared 2026-11-14. Internal document (`docs/` is excluded from deploys).
Canonical host: **https://www.aama.lk** (the apex `aama.lk` redirects to it).

## 1. What is now in place

| Item | Status |
|---|---|
| `sitemap.xml` | 6 URLs: `/`, `/budget-2027/`, and the four sub-pages (spaces encoded as `%20`). `lastmod` from git history. |
| `robots.txt` | Allow all; blocks `/uploads/` and `/budget-2027/tools/`; points to the sitemap. JS, CSS and data are **not** blocked, so Google can render the explorer. |
| Canonical, description, robots meta | All 6 pages. Canonical URLs match the sitemap and `www`. |
| Open Graph + Twitter card | All 6 pages. Two 1200×630 images: `assets/og-aama.png`, `budget-2027/og.png` (regenerate with `docs/make-og.mjs`). |
| Structured data (JSON-LD) | Home: `Organization` + `WebSite`. Explorer: `WebPage`. Only facts already on the site; no address, phone or social profiles were invented. |
| Crawler fallback content | Home `#root` and explorer `#view` ship real HTML (h1, summary, links) that the app replaces on load. Non-JS crawlers, link previews and most AI crawlers now see text instead of an empty page. |
| Heading structure | Explorer: exactly one `<h1>` per view (the first view heading is promoted). Home: one `<h1>`. |
| Titles | Explorer sets a descriptive title per view. Home and Roadmap titles lengthened (Roadmap was "AAMA Roadmap, AAMA"). |

## 2. Self-audit result (`docs/seo-check.mjs`)

Checks every sitemap URL: title 30–65 chars, description 70–160, canonical = sitemap URL, og:url/og:image/twitter:card, exactly one h1, `lang`, viewport, image alt, valid JSON-LD, JS errors, text and h1 present **without JavaScript**, internal links resolve, sitemap URLs map to files, robots references the sitemap.

**Result: all on-page checks pass for 6/6 URLs.** I also confirmed the live React home page still renders over the fallback (one h1, nav and 8 sections, no errors).

Re-run: `python3 -m http.server 8765 &` then `PW=$(npm root -g)/playwright node docs/seo-check.mjs`.

## 3. Findings an auditor will raise (need a decision)

**High**
1. **Apex redirect is a 307 (temporary).** `aama.lk` → `www.aama.lk` is `307`. Use a permanent redirect (308/301) so link equity consolidates. Vercel dashboard → Project → Domains → `aama.lk` → edit redirect status code. *(Read from the Vercel API; not changed.)*
2. **Home page is client-rendered with in-browser Babel from unpkg.** First paint waits on three CDN scripts and a JSX compile, so Largest Contentful Paint will score poorly, indexing depends on the renderer, and a CDN outage means a blank page. The fallback softens the SEO risk but does not fix speed. Real fix: a build step (e.g. Vite) or pre-rendering, self-hosting React.
3. **English, Tamil and Sinhala share one URL** (a client-side toggle). Tamil/Sinhala copy cannot be indexed or ranked in those languages, and `hreflang` is impossible. Fix: separate URLs (`/ta/`, `/si/`) with `hreflang`.

**Medium**
4. **Ugly sub-page URLs:** `Predictive Analytics.html`, `Sentiment Mapping.html`, etc. (spaces, capitals, `.html`). Move to `/predictive-analytics` etc. with 301s from the old URLs (`vercel.json` redirects) and update the sitemap and canonicals.
5. **The Budget explorer is one URL.** All views use `#/…`, which search engines ignore, so "Budget 2027 tax calculator" or "Budget 2027 sector totals" cannot rank separately. Fix: real paths per view (`/budget-2027/sectors/`) pre-rendered, or dedicated landing pages for the high-intent views.
6. **The explorer is orphaned.** Nothing on the home page links to `/budget-2027/`. Add a nav or footer link (also passes authority).
7. **Titles on sub-pages** repeat the brand and carry no search terms (e.g. "Predictive Voter Analytics, AAMA"). Fine technically; a copy decision.
8. **Search Console / analytics not verified.** I could not see either. Add the domain property (DNS verification), submit `https://www.aama.lk/sitemap.xml`, and use URL Inspection on `/` and `/budget-2027/`.
9. **`/uploads/` is public** (design notes and screenshots, 1.2 MB, including `DESIGN-elevenlabs.md`). `robots.txt` disallows crawling but does not hide the files. Consider excluding the folder from deploys.

**Low**
10. Google Fonts CSS is render-blocking; self-host or preload.
11. Explorer payload is about 370 KB of JS/data/CSS before fonts; fine on broadband, worth measuring on throttled mobile.
12. Sub-pages have no structured data (a `BreadcrumbList` would be a cheap win).

## 4. What I could not verify

- **Lighthouse / Core Web Vitals:** not run here (the sandbox blocked the tool download). Run: `npx lighthouse https://www.aama.lk/ --view` and again for `/budget-2027/`, mobile profile.
- **The live site:** the sandbox cannot reach aama.lk. Check after deploy: `https://www.aama.lk/sitemap.xml`, `/robots.txt`, `/assets/og-aama.png`, `/budget-2027/og.png` all return 200, then paste the URLs into the Facebook Sharing Debugger / LinkedIn Post Inspector and Google's Rich Results Test.
- **Rankings, backlinks, indexing status:** need Search Console and a crawler (Screaming Frog, Ahrefs).

## 5. Suggested order

1. Deploy this change; submit the sitemap in Search Console. (Today)
2. Switch the apex redirect to 308. (5 minutes)
3. Link the explorer from the home page. (Small change)
4. Clean URLs with redirects; decide on language URLs. (A sprint)
5. Build step / pre-rendering for the home page and the explorer. (Largest win for speed and indexing)
