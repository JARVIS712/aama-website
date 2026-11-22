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
  ramp-6: "#2D6B62"
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
  chip: "8px"
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
    backgroundColor: "{colors.ramp-6}"
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
    rounded: "{rounded.chip}"
    padding: "5px 10px"
---

# Design System: AAMA

<!-- impeccable:design-map -->
Name: AAMA
Colors: primary: palmyra-ink #1A3A39; secondary: lagoon-mint #A4D2C5; neutral: paper #F4F1EC; data: data-blue #2A78D6; neutral: paper-soft #FAF8F4; neutral: sheet #FFFFFF (+21 more in the sidecar)
Fonts: Fraunces (display, display-mega, headline, title); Inter (body, body-lg, figure, label); JetBrains Mono (mono); Noto Sans Tamil (tamil); Noto Serif Tamil (tamil-display); Noto Sans Sinhala (sinhala); Noto Serif Sinhala (sinhala-display)
Spacing: gutter-mobile 16px, gutter 32px, gutter-wide 48px, card-mobile 18px, card 24px, section 48px, container 1280px
Radius: bar 4px, chip 8px, field 10px, row 12px, tile 14px, card 18px, panel 22px, pill 9999px
North Star: "The Annotated Record"
Rules:
- The Paper-and-Ink Rule. The page is paper, text is ink.
- The Charts-Only Rule. Categorical data colours appear only inside charts and their legends.
- The Strength-Is-Darkness Rule. Ordinal scales run light to dark, weakest to strongest.
- The Light Serif Rule. Fraunces is set at weight 300 only (400–500 at small heading sizes).
- The Figures-in-Sans Rule. Numbers that carry meaning are Inter 600 or JetBrains Mono, with tabular figures in tables.
- The Script-Native Rule. Tamil and Sinhala text switch to Noto Sans/Serif Tamil and Sinhala with looser display line heights (1.18 and 1.32) and near-zero tracking.
- The One-Column Truth Rule. Reading text never runs wider than about 76 characters, even inside wide cards.
- The Flat-at-Rest Rule. A card at rest has a hairline, not a shadow.
Elevation:
- Floating bar: 0 8px 32px -16px rgba(15,15,14,.18)
- Hover lift: 0 18px 40px -24px rgba(15,15,14,.18)
- Drawer: 0 18px 40px -24px rgba(15,15,14,.28)
Don't:
- Don't use photographs of human remains or graphic imagery on explainers about violence.
- Don't flood a section with Palmyra Ink or Lagoon Mint; brand colour stays a mark.
- Don't use the categorical data colours outside charts and their legends.
- Don't bold Fraunces or set figures in it.
- Don't add resting shadows to cards.
- Don't show tooltips on touch, or leave one on screen after the content under it changes.
Do:
- Do keep pages on Paper (#F4F1EC) and put content on Sheet cards with 1px Hairline borders.
- Do set titles in Fraunces 300 and every meaningful number in Inter 600 or JetBrains Mono.
- (+4 more)
Full: .impeccable/design-full.md (read a section when you need its detail)
