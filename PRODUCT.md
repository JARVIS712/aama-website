# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

aama.lk serves two audiences, kept distinct by surface:

- **Campaign clients**: candidates, parties and campaign teams in Sri Lanka evaluating AAMA for campaign work. The home page and its sub-pages (Predictive Analytics, Sentiment Mapping, Cyber Infrastructure, Roadmap) are for them. Their job: judge whether AAMA can be trusted with data, strategy and security, and get in touch.
- **The public**: readers in Sri Lanka and the diaspora who want to understand a public issue from the record. The explainers (`budget-2027/`, `chemmani/`) are for them. Their job: find out what is actually known, where each fact comes from, and where sources disagree.

Neither audience's surface borrows the other's job: explainers carry no campaign pitch, and client pages are not presented as public-interest journalism.

## Product Purpose

AAMA (Aadhi Media Agency Pvt Ltd) is a political media and campaign-infrastructure company. The site does two things:

1. Presents AAMA's campaign services: predictive voter analytics, trilingual sentiment mapping, and secured campaign infrastructure, delivered as intake → model and map → deploy → monitor.
2. Publishes free public explainers that turn primary documents (budget speeches, court judgments, official and expert reports, news) into navigable, sourced accounts.

AAMA News (AI-curated political news, freemium) and AAMA Talks (long-form Tamil podcast) are in progress; AAMA Atlas (interactive electoral cartography) is on the roadmap.

## Positioning

A Sri Lankan political-data company that works natively in Tamil, Sinhala and English, with offices in Colombo and Jaffna, and that publishes public explainers held to a source-first standard: every statement linked to its document and page, graded by source type, with conflicting accounts shown side by side.

## Operating Context

- Explainers are built from documents the user supplies (e.g. the 81st Budget Speech and annexures; the Chemmani evidence pack on Google Drive) and published quickly after the event, then revised as new documents arrive.
- Readers arrive mostly on phones, often from shared links; each explainer view has its own URL.
- Some subjects are traumatic (killings, disappearances, mass graves). Those pages open with a content note and use no photographs of remains.

## Capabilities and Constraints

- Static site, no build step. Main site: HTML with in-browser React (`index.html`, `app.jsx`, `sections.jsx`). Explainers: vanilla JavaScript with hash routing, data in plain JS files, and validator scripts (`budget-2027/tools/validate.mjs`, `chemmani/tools/validate.mjs`).
- Deployed directly to Vercel (production: www.aama.lk; aama.lk redirects to it). `docs/` and `.claude/` are not deployed.
- Main site is trilingual (en, ta, si). Some ta/si blocks are first-pass machine translations awaiting native-speaker review. Explainers are English only so far.
- Explainer terminology: evidence grades are Court finding, Official or expert record, Human-rights group, News report, Claim or position; plus "AAMA reading" for AAMA's own arithmetic or observations and "Not established" for open questions. The Budget explorer separates "From the speech" from "AAMA analysis".
- Open: the founding year. The English home page says "EST. 2026"; the Tamil version says 2024. Do not state either until confirmed.

## Brand Commitments

- Name: AAMA, Aadhi Media Agency. Logo assets: `assets/logo-main.png` (and white, News and Talks variants); explainers use `assets/aama-logo-mask.png` and the "A" mark `assets/aama-mark-mask.png`.
- Confirmed facts that may be stated: offices in Colombo and Jaffna; models trained on 12 years of district-level electoral, demographic and behavioural data; air-gapped campaign infrastructure, end-to-end encrypted message logistics and red-team-tested disinformation defence; three working languages (Tamil, Sinhala, English).
- Explainers are neutral and source-first: no party line, no campaign messaging, no conclusions beyond what sources support. AAMA's own readings are labelled as such.

## Evidence on Hand

- Budget 2027: the 81st Budget Speech (treasury.gov.lk), Annexures I–VII, and the Citizens' Budget. Land and market lenses are editorial analysis, not advice.
- Chemmani: 36 cited sources (Supreme Court judgment, 2026 excavation report, HRCSL report, Amnesty and ITJP reports, news), working notes in `docs/chemmani-source-notes.md`. Thirteen video statements in the evidence pack are unverified and must not be cited until transcripts exist.
- No client testimonials, case studies, named clients, win rates or pricing exist on the site. Do not invent them.

## Product Principles

1. **Source before story.** On public surfaces, every figure and finding links to its document and page; gaps are labelled "Not established", never filled.
2. **Show disagreement, don't resolve it.** Conflicting figures and readings sit side by side with their sources and dates.
3. **Two audiences, two jobs.** Client persuasion and public explanation never share a surface or a voice.
4. **Three languages are native, not translated labels.** Tamil, Sinhala and English readers get the same substance.
5. **Dignity on hard subjects.** Name victims only as official records name them, attribute accusations to their source, warn before distressing content, and show no images of remains.
