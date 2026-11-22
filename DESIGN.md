---
name: AAMA
description: Warm paper, ink and margin marks. One visual world for AAMA's campaign pages and its public explainers.
colors:
  palmyra-ink: "#1A3A39"
  lagoon-mint: "#A4D2C5"
  paper: "#F4F1EC"
  paper-soft: "#FAF8F4"
  sheet: "#FFFFFF"
  sheet-strong: "#ECE7DE"
  ink: "#0F0F0E"
  ink-soft: "#2A2A28"
  body: "#4A4843"
  muted: "#6B675E"
  muted-soft: "#A8A39A"
  hairline: "#DCD7CC"
  hairline-soft: "#E8E3D8"
  hairline-strong: "#BFB8A9"
  data-blue: "#2A78D6"
  data-orange: "#EB6834"
  data-green: "#1BAF7A"
  data-amber: "#EDA100"
  data-pink: "#E87BA4"
  data-leaf: "#008300"
  data-violet: "#6250D6"
  data-red: "#E34948"
  data-neutral: "#7D7A72"
  ramp-1: "#E6F1ED"
  ramp-3: "#A4D2C5"
  ramp-5: "#478F82"
  ramp-7: "#1A3A39"
typography:
  display:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(32px, 6vw, 64px)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  display-mega:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(38px, 9vw, 104px)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(28px, 5vw, 48px)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Fraunces, 'Times New Roman', serif"
    fontSize: "clamp(21px, 2.6vw, 32px)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.005em"
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 48px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.12em"
  mono:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    fontFeature: "'ss01', 'ss02'"
  tamil:
    fontFamily: "'Noto Sans Tamil', Inter, sans-serif"
  tamil-display:
    fontFamily: "'Noto Serif Tamil', Fraunces, serif"
    lineHeight: 1.18
  sinhala:
    fontFamily: "'Noto Sans Sinhala', Inter, sans-serif"
  sinhala-display:
    fontFamily: "'Noto Serif Sinhala', Fraunces, serif"
    lineHeight: 1.32
rounded:
  bar: "4px"
  field: "10px"
  row: "12px"
  tile: "14px"
  card: "18px"
  panel: "22px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "32px"
  gutter-wide: "48px"
  card-mobile: "18px"
  card: "24px"
  section: "48px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.sheet-strong}"
  chip:
    backgroundColor: "{colors.sheet-strong}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  chip-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  card:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.card}"
    padding: "24px"
  field:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "9px 10px"
    height: "42px"
  segmented:
    backgroundColor: "{colors.sheet-strong}"
    rounded: "{rounded.pill}"
    padding: "3px"
  segmented-on:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  grade-court:
    backgroundColor: "{colors.ramp-7}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  grade-record:
    backgroundColor: "{colors.ramp-5}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  grade-ngo:
    backgroundColor: "{colors.ramp-3}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  grade-news:
    backgroundColor: "{colors.ramp-1}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
  source-chip:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink-soft}"
    rounded: "8px"
    padding: "5px 10px"
---

# Design System: AAMA

## Overview

**Creative North Star: "The Annotated Record"**

AAMA's pages read like a well-kept record on warm paper: dark ink for what is said, a quiet serif for what matters, and small, exact margin marks that say where each thing came from. Nothing on the page is decoration for its own sake. A tag, a hairline, a figure in mono: each is there because a source, a measurement or a choice put it there. The mood is calm, exact and warm. It suits a campaign client weighing whether to trust AAMA with data, and a reader working through a court judgment or a budget.

Density follows the job. Campaign pages breathe: large Fraunces headlines, generous sections, a single idea per block. Explainers are denser but never crowded: cards on paper, tables when the reader wants the numbers, and every claim carrying its citation chip within reach. Both live in the same world: same paper, same ink, same pill-shaped controls, same light and dark themes.

Colour is held back so that it can mean something. The palette is paper and ink; Palmyra Ink and Lagoon Mint are the brand; the data colours appear only inside charts, and the evidence-grade ramp only on grade tags.

**Key Characteristics:**
- Warm paper canvas (never pure white as the page), near-black ink, Fraunces 300 for display, Inter for reading, JetBrains Mono for figures and margin marks.
- Flat surfaces with hairline borders; shadows only on floating bars and on hover.
- Pill-shaped controls; 18px cards; nothing sharp, nothing bubbly.
- Every claim on a public page carries a citation chip and, where relevant, an evidence-grade tag.
- Full light and dark themes, switched with `data-theme` on the root element.
- Tamil and Sinhala get their own Noto faces and looser line heights, not Latin fallbacks.

## Colors

Paper and ink first; two brand colours used sparingly; a validated data palette reserved for charts.

### Primary
- **Palmyra Ink** (#1A3A39): the logo's deep green. Used for the AAMA wordmark and "A" mark (drawn as a mask in this colour), the darkest step of the grade ramp ("Court finding"), and checkbox and range accents. Never as a large background block.

### Secondary
- **Lagoon Mint** (#A4D2C5): the highlight. Used for the "From the speech" fact tag tint, the mid step of the grade ramp, and the hero glow on share images. In dark mode it replaces Palmyra Ink wherever ink-on-dark needs a brand accent.

### Neutral
- **Paper** (#F4F1EC): the page background in light mode. Dark mode: #0F0F0E.
- **Paper Soft** (#FAF8F4): input fields, table headers, source chips. Dark: #161614.
- **Sheet** (#FFFFFF): cards and panels sitting on paper. Dark: #1A1A18.
- **Sheet Strong** (#ECE7DE): segmented-control tracks, chips, hover fills, callouts. Dark: #242420.
- **Ink** (#0F0F0E): headlines, primary text, primary buttons, tooltips. Dark: #F4F1EC.
- **Ink Soft** (#2A2A28): nav links, chip text, secondary labels. Dark: #DCD7CC.
- **Body** (#4A4843): long-form paragraph text and ledes. Dark: #A8A39A.
- **Muted** (#6B675E): eyebrows, captions, metadata, axis labels. Dark: #8D897F.
- **Muted Soft** (#A8A39A): separators like the nav slash, disabled marks. Dark: #4A4843.
- **Hairline** (#DCD7CC), **Hairline Soft** (#E8E3D8), **Hairline Strong** (#BFB8A9): borders and dividers, in increasing weight. Dark: #2C2C2A, #1F1F1D, #383835.

### Data
- **Categorical slots** (fixed order): Data Blue (#2A78D6), Data Orange (#EB6834), Data Green (#1BAF7A), Data Amber (#EDA100), Data Pink (#E87BA4), Data Leaf (#008300), Data Violet (#6250D6), Data Red (#E34948); Data Neutral (#7D7A72) for "other". Each has a dark-mode twin in the stylesheet.
- **Sequential ramp** (Lagoon Mint to Palmyra Ink, 7 steps, Ramp 1 #E6F1ED to Ramp 7 #1A3A39): choropleth maps and ordinal scales such as the evidence grades. Text on steps 5 to 7 is white; on 1 to 4 it is ink.

### Named Rules
**The Paper-and-Ink Rule.** The page is paper, text is ink. Brand colour is a margin mark, never a wash: no full-bleed green or mint sections.

**The Charts-Only Rule.** Categorical data colours appear only inside charts and their legends. A button, link or heading is never Data Blue.

**The Strength-Is-Darkness Rule.** Ordinal scales run light to dark, weakest to strongest. A dashed outline, not a colour, marks claims, AAMA readings and "Not established".

## Typography

**Display Font:** Fraunces (with Times New Roman)
**Body Font:** Inter (with system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A light, soft-serif voice for anything that is named or claimed, set against a plain, legible sans for reading. Mono is the margin-note hand: dates, figures, page references and tags.

### Hierarchy
- **Display Mega** (300, clamp(38px, 9vw, 104px), 1.0): the home-page hero only.
- **Display** (300, clamp(32px, 6vw, 64px), 1.05): page titles on explainers and sub-pages.
- **Headline** (300, clamp(28px, 5vw, 48px), 1.1): view titles inside an explainer.
- **Title** (300, clamp(21px, 2.6vw, 32px), 1.15): section headings and card headings set in Fraunces.
- **Body** (400, 16px, 1.55): all reading text; ledes at 18px (Body Large) in Body colour, held to about 68 characters.
- **Figure** (Inter 600, clamp(34px, 4.2vw, 48px), 1.0, -0.035em): headline numbers in stat cards. Figures are sans, never serif.
- **Label** (Inter 500, 11px, 0.12em, uppercase): eyebrows and mini headings.
- **Mono** (JetBrains Mono 500, 10.5–13px, with ss01 and ss02): dates, page references, axis ticks, grade tags (uppercase, 0.05em).

### Named Rules
**The Light Serif Rule.** Fraunces is set at weight 300 only (400–500 at small heading sizes). Never bold.

**The Figures-in-Sans Rule.** Numbers that carry meaning are Inter 600 or JetBrains Mono, with tabular figures in tables. Never Fraunces.

**The Script-Native Rule.** Tamil and Sinhala text switch to Noto Sans/Serif Tamil and Sinhala with looser display line heights (1.18 and 1.32) and near-zero tracking.

## Layout

A single centred column with a 1280px container (1440px from 1600px screens, 1600px with 48px gutters from 2000px), 32px side gutters, 16px below 900px. Explainer sections are separated by about 48px; home-page sections are far roomier (120px top and bottom on wide screens); cards sit in 12–20px gaps. Grids collapse to one column at 900px (four-up figure cards to two at 1000px and one at 520px). No horizontal page scroll at any width; long controls wrap or scroll inside themselves.

Explainers add two fixed layers: a floating pill nav at the top (max 860px wide) and a floating pill tab bar at the bottom. Views reserve 120px of bottom padding so the tab bar never covers the last line.

### Named Rules
**The One-Column Truth Rule.** Reading text never runs wider than about 76 characters, even inside wide cards.

## Elevation & Depth

Flat by default. Structure comes from tone (paper, sheet, sheet strong) and hairline borders. Shadows exist only on things that float above the page, and as a brief response to hover.

### Shadow Vocabulary
- **Floating bar** (`box-shadow: 0 8px 32px -16px rgba(15,15,14,.18)` plus a 1px inner highlight): the top nav. The bottom tab bar uses a deeper `0 14px 38px -14px rgba(15,15,14,.38)`.
- **Hover lift** (`box-shadow: 0 18px 40px -24px rgba(15,15,14,.18)`): home-page cards while hovered, with a 4px rise and a Hairline Strong border.
- **Drawer** (`box-shadow: 0 18px 40px -24px rgba(15,15,14,.28)`): side panels and the mobile bottom sheet, over a 38% ink scrim.

Floating bars also use a translucent paper fill with an 18–24px backdrop blur.

### Named Rules
**The Flat-at-Rest Rule.** A card at rest has a hairline, not a shadow. If something needs to stand out, change its tone or border, not its elevation.

## Shapes

Soft, consistent rounding with no sharp corners and no blobs. Controls and tags are full pills; containers step down in radius as they get smaller: panels 22px, cards 18px, tiles and notes 14px, rows 12px, fields 10px, chart bars 4px (squared on the baseline). Borders are 1px hairlines; a dashed border marks something provisional or unverified (claims, AAMA readings, open questions). Left-border accents (3–4px) mark callouts and analyst notes.

## Components

### Buttons
Refined and quiet: one ink fill per view for the main action, everything else ghost.
- **Shape:** full pill (9999px), minimum 40px tall (44px touch targets in bars).
- **Primary:** Ink fill, Paper text, 14px Inter 500, 8px 18px padding.
- **Ghost:** transparent with a Hairline Strong border; Sheet Strong fill on hover.
- **Hover / Focus / Active:** colour change only on hover; a 2px Data Blue focus ring offset 2px; a 0.985 scale on press.
- **Link-button:** underlined text with a Hairline Strong underline that darkens to Ink on hover, used for in-text actions.

### Chips
- **Style:** Sheet Strong fill, Ink Soft text, 12px, pill.
- **State:** selected chips invert to Ink fill and Paper text; filter chips set `aria-pressed`.

### Segmented control
A Sheet Strong pill track (3px padding) holding pill buttons; the selected one becomes a Sheet pill with a 1px shadow. Used for view switches (chart/table, period).

### Cards / Containers
- **Corner Style:** 18px (16px on phones).
- **Background:** Sheet on Paper.
- **Shadow Strategy:** none at rest (see Elevation).
- **Border:** 1px Hairline.
- **Internal Padding:** 24px (18px on phones).

### Inputs / Fields
- **Style:** Paper Soft fill, 1px Hairline border, 10px radius, 42px tall, Ink text in Inter 14px.
- **Focus:** the shared 2px Data Blue focus ring.

### Navigation
- **Top nav:** a floating translucent pill: AAMA wordmark (masked logo in Palmyra Ink, Paper in dark mode), a muted slash, the section name, then text links and the theme toggle on the right.
- **Bottom tab bar:** a floating pill of text tabs; the current tab is an Ink pill with Paper text, led by the "A" mark. It shrinks to the "A" mark, the current tab name and a three-dot grip while the page scrolls, and opens again on tap, hover or keyboard.

### Evidence grade tag (signature)
A small mono uppercase pill that says what kind of source a statement rests on. Filled steps of the mint-to-ink ramp for record types (Court finding darkest, News lightest); a dashed outline for Claim, AAMA reading (orange dash) and Not established.

### Citation chip (signature)
A small Paper Soft button with a hairline border naming the source and the page ("Excavation report · §8, p. 8"). Opens a side panel (bottom sheet on phones) with the document, what was read, the original link and everything else that source supports.

### Tooltip
An Ink panel with Paper text, 10px radius, 12.5px: a bold first line and plain detail lines. Mouse and keyboard focus only; never on touch.

## Do's and Don'ts

### Do:
- **Do** keep pages on Paper (#F4F1EC) and put content on Sheet cards with 1px Hairline borders.
- **Do** set titles in Fraunces 300 and every meaningful number in Inter 600 or JetBrains Mono.
- **Do** give every public-facing figure a citation chip, and a grade tag where the source type matters.
- **Do** offer a table view beside any chart, and keep chart bars 24px or thinner with 4px rounded ends.
- **Do** define colours as tokens with dark-mode twins; test both themes.
- **Do** draw the logo and "A" mark from the masked PNGs so they follow the theme.

### Don't:
- **Don't** use photographs of human remains or graphic imagery on explainers about violence.
- **Don't** flood a section with Palmyra Ink or Lagoon Mint; brand colour stays a mark.
- **Don't** use the categorical data colours outside charts and their legends.
- **Don't** bold Fraunces or set figures in it.
- **Don't** add resting shadows to cards.
- **Don't** show tooltips on touch, or leave one on screen after the content under it changes.
