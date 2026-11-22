# Translating aama.lk into Tamil and Sinhala

`aama-translations.csv` holds every English string on aama.lk that needs Tamil and Sinhala. It's UTF-8 with a BOM, so Excel, Numbers and Google Sheets show Tamil and Sinhala correctly.

## Columns

| Column | What it is | Edit it? |
|---|---|---|
| id | Where the string lives. Used to put your translation back in the right place. | No |
| surface | Which part of the site: explainers, common, home, subpages, chemmani, budget, social | No |
| file | Source file | No |
| context | Where the reader sees it | No |
| english | The English text | No |
| tamil | Your Tamil | **Yes** |
| sinhala | Your Sinhala | **Yes** |
| status | new, review (an existing first-pass machine translation is filled in; correct it) or ta-done (Tamil you already gave) | Optional |
| notes | Guidance for that row | No |

## Rules

- Text in `{braces}` (`{n}`, `{date}`, `{amount}`, `{place}`, `{text}`, `{source}`, `{page}`) is filled in by the site. Keep each one exactly as written; you can move it to suit Tamil or Sinhala word order.
- Keep numbers, section marks (§36.1), page numbers and email addresses as they are.
- People's names: transliterate. Ministries, laws and projects: use the official Tamil or Sinhala name where the government has published one.
- Source titles (Chemmani `SOURCES…t`) are names of English documents. Translate them as a description; the site will keep the original title next to yours.
- Leave a cell empty if you're unsure. Empty cells fall back to English, so nothing breaks.
- Don't add, delete or reorder rows, and don't edit the id or english columns. Save as CSV (UTF-8).

## Size

About 3,850 rows and 24,000 English words. Most of it is the Budget 2027 data (about 2,300 rows: initiatives, annexure projects, tax changes). Suggested order if you go in stages: explainers, common, home, social, chemmani, then budget.

## Regenerating

With a local server on port 8765: `node docs/i18n/extract.mjs`. Rows already translated keep their ids, so a re-run can be merged with your work. The script rewrites the master CSV with empty translation cells, so to look for new strings write elsewhere and compare ids: `STATES=1 OUT=/tmp/new.csv node docs/i18n/extract.mjs`. `STATES=1` also clicks through every Budget view's tabs, filters, charts and panels, and captures the error state, so text that only appears after an interaction is found too.

## Building the translated pages

`python3 docs/i18n/build_explainers.py` writes `explainers/ta/index.html` and `explainers/si/index.html` from `explainers/index.html` and the CSV. It stops with a list if any string is missing a translation. Re-run it after editing the English page or the CSV.

Words the worksheet did not carry, supplied by AAMA and awaiting review: Jaffna (யாழ்ப்பாணம் / යාපනය), "Switch to light mode", "Language".

## Stage 2 file

`aama-translations-stage2.csv` (823 rows): all 630 Chemmani rows to translate first, then the 193 rows already translated (Explainers page, months, home page, social post) so they can be revised. Rows marked `review` hold suggestions or first-pass translations to check. Upload it back as is; changed cells replace the current text.

## Stage 3 (final) file

`aama-translations-stage3-final.csv` (2,956 rows, about 19,900 words): everything not yet translated, in this order: Chemmani data (timeline, sources, report, disputes, counts), the four home sub-pages, then Budget 2027. Each English text appears once; where it occurs in several places, the notes say how many, and your translation is applied to all of them on import. Rows marked `review (reused)` are filled from a translation you already gave elsewhere.

## Building the Chemmani explainer in Tamil and Sinhala

`node docs/i18n/build_chemmani.mjs` writes `chemmani/data/i18n/ch.ta.js` and `ch.si.js` (the data, translated by row id, plus the interface map) and the page shells `chemmani/ta/index.html` and `chemmani/si/index.html`. `assets/i18n/runtime.js` translates the interface text after each render. Where a translation puts repeated placeholders in a different order from the English, the `ORDER` table in the build script says which value goes where; check it when those rows change. Sinhala dates are written year first, as in the translated data.

## Building the Budget 2027 explorer in Tamil and Sinhala

`node docs/i18n/build_budget.mjs` writes `budget-2027/data/i18n/b27.ta.js` and `b27.si.js` and the page shells `budget-2027/ta/index.html` and `budget-2027/si/index.html`. Each data file loads after the English data and sets every translated string onto `B27` by its row id; then `assets/i18n/runtime.js` (shared with Chemmani) translates the interface text after each render.

- District names are the keys the initiatives point to, so they stay English in the data and are swapped as whole words on screen. `TAX[].who` (group ids) and the "Other, non-categorised" cadre row (found by the code) also stay English; none of them is shown as-is.
- Amounts the app formats use the rupee sign the translations use: ரூ. and රු.
- Where a translation reorders repeated placeholders, the `ORDER_BOTH` table says which English value goes where. Every template with a repeated placeholder must be listed there or in `IN_ORDER`; the build stops and names any new one.

## Stage 4 file

`aama-translations-stage4.csv` (132 rows, about 780 words): Budget interface text that only appears after a click (the Sectors treemap and panel, the Flow table, map tabs, the laws pipeline, the initiative panel, Land and Markets labels, the Sources table) and the short sector names on charts. Found by `STATES=1` above. Until these are translated they show in English.
