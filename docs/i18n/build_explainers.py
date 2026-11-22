"""Builds explainers/ta/index.html and explainers/si/index.html from explainers/index.html
and the translations in docs/i18n/aama-translations.csv.

Run from the repo root:  python3 docs/i18n/build_explainers.py
Fails loudly if a string has no translation, so nothing ships half in English by accident.
"""
import csv, json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = (ROOT / 'explainers/index.html').read_text(encoding='utf-8')
ROWS = list(csv.DictReader(open(ROOT / 'docs/i18n/aama-translations.csv', encoding='utf-8-sig', newline='')))
COL = {'ta': 'tamil', 'si': 'sinhala'}

# Words the worksheet did not carry. Supplied by AAMA; flagged for the translator's review.
SUPPLIED = {
    'ta': {'Jaffna': 'யாழ்ப்பாணம்', 'Switch to light mode': 'ஒளிப் பயன்முறைக்கு மாறவும்', 'Language': 'மொழி'},
    'si': {'Jaffna': 'යාපනය', 'Switch to light mode': 'ආලෝක ප්‍රකාරයට මාරු වන්න', 'Language': 'භාෂාව'},
}
# Strings that exist in the worksheet under another surface (home nav, social image).
ALIAS = {
    'Explainers': 'home:nav.explainers',
    'Chemmani: what the record shows': 'social:img.chemmani',
    'Sri Lanka Budget 2027': 'social:img.budget',
    'Court finding': 'social:img.grade.court',
    'News report': 'social:img.grade.news',
    # Short forms from the social image, used until the Chemmani grade labels are translated:
    'Official or expert record': 'social:img.grade.record',
    'Human-rights group': 'social:img.grade.ngo',
    'Claim or position': 'social:img.grade.claim',
}
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

byid = {r['id']: r for r in ROWS}
by_en = {}
for r in ROWS:
    if r['surface'] == 'explainers':
        by_en.setdefault(r['english'], r)
for r in ROWS:
    by_en.setdefault(r['english'], r)

missing = []


def T(en, lang):
    """Translation of an English worksheet string (may contain {placeholders})."""
    if en in SUPPLIED[lang]:
        return SUPPLIED[lang][en]
    row = byid.get(ALIAS[en]) if en in ALIAS else by_en.get(en)
    val = row[COL[lang]].strip() if row else ''
    if not val:
        missing.append((lang, en))
        return en
    return val


def fill(template, *values):
    out = template
    for v in values:
        out = re.sub(r'\{[a-z]+\}', lambda m: str(v), out, count=1)
    return out


def named(template, **kw):
    """Fill placeholders by name, wherever the translation puts them."""
    for k, v in kw.items():
        template = template.replace('{' + k + '}', str(v))
    return template


def date(d, lang):
    """'22 Nov 2026' or 'Oct 2026' -> translated month name, same order."""
    m = re.match(r'(?:(\d{1,2}) )?([A-Z][a-z]{2})[a-z]* (\d{4})', d)
    day, mon, yr = m.groups()
    i = [x[:3] for x in MONTHS].index(mon)
    name = byid[f'common:month.{i + 1}'][COL[lang]].strip() or MONTHS[i]
    return f'{day} {name} {yr}' if day else f'{name} {yr}'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def build(lang):
    h = SRC
    rep = []  # (old, new) exact replacements, applied in order

    def text(en, html_old=None, wrap=lambda x: x):
        rep.append((html_old or f'>{en}<', '>' + wrap(esc(T(en, lang))) + '<'))

    # ── head ──
    rep += [
        ('<html lang="en"', f'<html lang="{lang}"'),
        ('<title>Explainers · AAMA</title>', f'<title>{esc(T("Explainers · AAMA", lang))}</title>'),
        ('<link rel="canonical" href="https://www.aama.lk/explainers/" />', f'<link rel="canonical" href="https://www.aama.lk/explainers/{lang}/" />'),
        ('<meta property="og:url" content="https://www.aama.lk/explainers/" />', f'<meta property="og:url" content="https://www.aama.lk/explainers/{lang}/" />\n<meta property="og:locale" content="{lang}_LK" />'),
        ('<meta property="og:title" content="Explainers · AAMA" />', f'<meta property="og:title" content="{esc(T("Explainers · AAMA", lang))}" />'),
    ]
    for en in ['AAMA explainers take one public issue in Sri Lanka and work through the documents behind it. Every figure links to the page it came from; where sources disagree, both are shown.',
               'Public issues in Sri Lanka, worked through from the documents. Every figure links to its source.',
               'AAMA Explainers: public issues in Sri Lanka, worked through from the documents.']:
        rep.append((f'content="{en}"', f'content="{esc(T(en, lang))}"'))
    # structured data
    ld_old = re.search(r'<script type="application/ld\+json">(.*?)</script>', h).group(1)
    ld = json.loads(ld_old)
    ld['name'] = T('Explainers', lang)
    ld['url'] = f'https://www.aama.lk/explainers/{lang}/'
    ld['inLanguage'] = lang
    ld['description'] = T('AAMA explainers take one public issue in Sri Lanka and work through the documents behind it. Every figure links to the page it came from; where sources disagree, both are shown.', lang)
    rep.append((ld_old, json.dumps(ld, ensure_ascii=False)))
    fam = {'ta': 'Noto+Sans+Tamil:wght@400;500;600&family=Noto+Serif+Tamil:wght@400;500&family=Noto+Sans+Sinhala:wght@500', 'si': 'Noto+Sans+Sinhala:wght@400;500;600&family=Noto+Serif+Sinhala:wght@400;500&family=Noto+Sans+Tamil:wght@500'}[lang]
    rep.append(('family=Noto+Sans+Tamil:wght@500&family=Noto+Sans+Sinhala:wght@500&family=Fraunces:', f'family={fam}&family=Fraunces:'))

    # ── nav ──
    rep += [
        ('>Skip to content<', '>' + esc(T('Skip to content', lang)) + '<'),
        ('aria-label="Site"', f'aria-label="{esc(T("Site", lang))}"'),
        ('aria-label="AAMA home"', f'aria-label="{esc(T("AAMA home", lang))}"'),
        ('<span class="nav-title" aria-current="page">Explainers</span>', f'<span class="nav-title" aria-current="page">{esc(T("Explainers", lang))}</span>'),
        ('aria-label="Language"', f'aria-label="{esc(T("Language", lang))}"'),
        ('<a href="./" lang="en" aria-current="page">EN</a><a href="ta/" lang="ta" hreflang="ta">தமிழ்</a><a href="si/" lang="si" hreflang="si">සිංහල</a>',
         '<a href="../" lang="en" hreflang="en">EN</a>' + ('<a href="./" lang="ta" aria-current="page">தமிழ்</a><a href="../si/" lang="si" hreflang="si">සිංහල</a>' if lang == 'ta' else '<a href="../ta/" lang="ta" hreflang="ta">தமிழ்</a><a href="./" lang="si" aria-current="page">සිංහල</a>')),
        ('aria-label="Switch to dark mode">', f'aria-label="{esc(T("Switch to dark mode", lang))}">'),
        ("'Switch to light mode' : 'Switch to dark mode'", "'" + T('Switch to light mode', lang) + "' : '" + T('Switch to dark mode', lang) + "'"),
    ]

    # ── opening ──
    rep.append(('<h1>Explainers</h1>', f'<h1>{esc(T("Explainers", lang))}</h1>'))
    for en in ['Each explainer takes one public issue in Sri Lanka and works through the documents behind it: the budget speech, the court judgment, the official report, the news coverage. Every figure links to the page it came from, and where sources disagree you see both.',
               'Free to read, with no sign-in. In English for now; Tamil and Sinhala versions will follow.',
               'Published', 'Who they are for', 'How to read one', 'Our standards',
               'Anyone who wants to see what the record says before deciding what to think about it: voters, students and teachers, journalists, and Sri Lankans abroad following news from home. You do not need to know the subject first. Each explainer opens with a short overview, and the detail is there for when you want it.',
               'Explainers are kept apart from AAMA’s campaign work for clients. They take no side and carry no party message.',
               'Evidence grades', 'In the Chemmani explainer, each statement carries a tag for the kind of source it rests on. They are listed here from the strongest kind of source to the weakest.',
               'Found by a court in a written judgment.', 'Written by a statutory body or a court-appointed expert.',
               'Published by a group such as Amnesty International, from its own observation or sources.',
               'Reported by a news outlet. AAMA has not checked it independently.',
               'Said by a lawyer, MP, minister, official or someone convicted, and shown as their claim.',
               'Our own arithmetic or observation. You can check it on the page we cite.',
               'No source we read settles the question, so we leave it open.',
               'Source links', 'The small boxes under a statement name the document and the page. Tap one to see what the document is, how much of it we read, a link to the original, and everything else in the explainer that relies on it.',
               'When sources disagree', 'We print each figure with its source and date. We do not average them or pick one. These are three totals for the same Chemmani remains:',
               'Fact or analysis, in the Budget explorer',
               'Every figure links to the document and page it comes from.',
               'When sources disagree, both figures and both sources stay on the page.',
               'Questions that no source answers are marked “Not established”, and we do not fill them in.',
               'On violent subjects we open with a content note, show no photographs of remains, and name victims only as official records do.',
               'No party line and no campaign messaging.',
               'More explainers are being written', 'Excavation report', 'Supreme Court',
               'Court finding', 'Official or expert record', 'Human-rights group', 'News report', 'Claim or position', 'AAMA reading', 'Not established']:
        text(en)

    # ── contents entries ──
    rep += [
        ('<b>22 Nov 2026</b>Jaffna', f'<b>{date("22 Nov 2026", lang)}</b>{esc(T("Jaffna", lang))}'),
        ('<b>14 Nov 2026</b>National', f'<b>{date("14 Nov 2026", lang)}</b>{esc(T("National", lang))}'),
        ('<b>Next</b>In progress', f'<b>{esc(T("Next", lang))}</b>{esc(T("In progress", lang))}'),
        ('>Chemmani: what the record shows<', '>' + esc(T('Chemmani: what the record shows', lang)) + '<'),
        ('>Sri Lanka Budget 2027<', '>' + esc(T('Sri Lanka Budget 2027', lang)) + '<'),
        ('>The mass grave at Chemmani, from the 1996 murder case to the 2025 and 2026 excavation, with every statement graded by the kind of source behind it.<',
         '>' + esc(fill(T('The mass grave at Chemmani, from the {n} murder case to the {n} and {n} excavation, with every statement graded by the kind of source behind it.', lang), 1996, 2025, 2026)) + '<'),
        ('>Content note: killings, enforced disappearances and the remains of children. No photographs of remains.<',
         '>' + esc(T('Content note: killings, enforced disappearances and the remains of children. No photographs of remains.', lang)) + '<'),
        ('>Where the money comes from, where it goes and who it affects, built from the 81st Budget Speech of 12 November 2026, its annexures and the Citizens’ Budget. Includes income-tax and subsidy calculators.<',
         '>' + esc(named(T('Where the money comes from, where it goes and who it affects, built from the {n}st Budget Speech of {date}, its annexures and the Citizens’ Budget. Includes income-tax and subsidy calculators.', lang), n=81, date=date('12 Nov 2026', lang))) + '<'),
        ('aria-label="In this explainer"', f'aria-label="{esc(T("In this explainer", lang))}"'),
        ('aria-label="In this explainer"', f'aria-label="{esc(T("In this explainer", lang))}"'),
    ]
    for n, en in [(36, '{n} sources'), (43, '{n} dated events'), (9, '{n} disputes shown side by side'), (267, '{n} initiatives'), (84, '{n} new capital projects'), (29, '{n} laws announced')]:
        word = en.replace('{n} ', '')
        before, _, after = T(en, lang).partition('{n}')
        li = (f'<span>{esc(before.strip())}</span> ' if before.strip() else '') + str(n) + (f' <span>{esc(after.strip())}</span>' if after.strip() else '')
        rep.append((f'<li>{n} <span>{word}</span></li>', f'<li>{li}</li>'))

    # sentences that hold a link or a tag
    def with_mail(en, subject):
        t = esc(T(en, lang))
        assert 'explainers@aama.lk' in t, (lang, en)
        return t.replace('explainers@aama.lk', f'<a class="mail" href="mailto:explainers@aama.lk?subject={subject}">explainers@aama.lk</a>', 1)
    rep.append(('We take on an issue when there are documents to work from and people asking what they say. If there is one you would like us to cover, write to <a class="mail" href="mailto:explainers@aama.lk?subject=Explainer%20suggestion">explainers@aama.lk</a>.',
                with_mail('We take on an issue when there are documents to work from and people asking what they say. If there is one you would like us to cover, write to explainers@aama.lk.', 'Explainer%20suggestion')))
    rep.append(('Found a mistake, a misquote or a wrong page number? Write to <a class="mail" href="mailto:explainers@aama.lk?subject=Correction">explainers@aama.lk</a> and we will correct it.',
                with_mail('Found a mistake, a misquote or a wrong page number? Write to explainers@aama.lk and we will correct it.', 'Correction')))
    fx, an = esc(T('From the speech', lang)), esc(T('AAMA analysis', lang))
    para = esc(T('Figures and plans taken from the speech and its annexures are tagged From the speech. Our own reading of them is tagged AAMA analysis. The land and market views are analysis for information, not financial or legal advice.', lang))
    for word, cls in [(fx, 'fx'), (an, 'an')]:
        for q in [f'"{word}"', f'“{word}”', f'‘{word}’', word]:
            if q in para:
                para = para.replace(q, f'<span class="tag {cls}">{word}</span>', 1)
                break
        else:
            missing.append((lang, f'tag "{word}" not found in Budget paragraph'))
    rep.append(('Figures and plans taken from the speech and its annexures are tagged <span class="tag fx">From the speech</span>. Our own reading of them is tagged <span class="tag an">AAMA analysis</span>. The land and market views are analysis for information, not financial or legal advice.', para))

    # demo chips and side-by-side figures
    rep += [
        ('aria-label="Example source link"', f'aria-label="{esc(T("Example source link", lang))}"'),
        ('aria-label="Example: Excavation report, section 8, page 8"', f'aria-label="{esc(fill(T("Example: Excavation report, section {n} page {n}", lang), 8, 8))}"'),
        ('aria-label="Example: Supreme Court, page 39"', f'aria-label="{esc(fill(T("Example: Supreme Court, page {n}", lang), 39))}"'),
        ('sets identified · Jaffna Monitor, 19 Aug 2026', esc(fill(T('sets identified · Jaffna Monitor, {date}', lang), date('19 Aug 2026', lang)))),
        ('sets identified · IBC Tamil, 19 Aug 2026', esc(fill(T('sets identified · IBC Tamil, {date}', lang), date('19 Aug 2026', lang)))),
        ('minimum number of individuals · excavation report, Oct 2026', esc(fill(T('minimum number of individuals · excavation report, {date}', lang), date('Oct 2026', lang)))),
    ]

    # footer: first sentence stays bold
    foot = T('AAMA Explainers. Unofficial explainers built from court, statutory, human-rights and news sources, each linked. Official documents remain the authoritative record.', lang)
    first, _, rest = foot.partition('. ')
    rep.append(('<p><b>AAMA Explainers.</b> Unofficial explainers built from court, statutory, human-rights and news sources, each linked. Official documents remain the authoritative record.</p>',
                f'<p><b>{esc(first)}.</b> {esc(rest)}</p>'))

    # ── paths: one folder deeper ──
    for old, new in rep:
        if old not in h:
            sys.exit(f'[{lang}] source text not found, update the builder: {old[:90]}')
        h = h.replace(old, new, 1)
    h = h.replace('href="../', 'href="../../').replace('href="css/', 'href="../css/')
    # language-switch links were rewritten above with their own depth; undo the blanket ../ change for them
    h = h.replace('href="../../" lang="en"', 'href="../" lang="en"').replace('href="../../ta/" lang="ta"', 'href="../ta/" lang="ta"').replace('href="../../si/" lang="si"', 'href="../si/" lang="si"')
    out = ROOT / f'explainers/{lang}/index.html'
    out.parent.mkdir(exist_ok=True)
    out.write_text(h, encoding='utf-8')
    return out


paths = [build('ta'), build('si')]
if missing:
    print('Untranslated strings (English left in place):')
    for m in missing:
        print('  ', m)
    sys.exit(1)
print('wrote', *[str(p.relative_to(ROOT)) for p in paths])
