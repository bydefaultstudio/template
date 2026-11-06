---
name: typography
description: "Use for choosing and pairing typefaces, type scales, display and body settings, measure and leading, typographic details, and web font performance. Our house numbers where sources disagree."
---

# Typography

## Order of work

Set the body text first (face, size, leading, measure). Everything else is calibrated against it.

## Choosing faces

- One or two families. If two, they must be clearly different and each has one job (for example display and text). No third face for labels.
- Pair by clear contrast (structure, era, width or weight) or use one superfamily. Low-contrast pairs often work better than dramatic ones.
- Three weights per family at most. No more than two weights on one screen.
- Don't lead with Inter, Roboto, Arial, system-ui, Poppins, Space Grotesk or DM Sans for display. Look to independent foundries (for example Pangram Pangram, Dinamo, Grilli Type, Klim, Commercial Type) and to the subject itself.
- Check the web, app and print licence before proposing a face.

## House scale

| Role | Size |
|---|---|
| Small / caption | 13 to 14px (never below 13px on pages, 11px in dense app UI) |
| Body | 16 to 20px (18px for reading-heavy pages) |
| Lead | 20 to 26px |
| Heading | 32 to 64px |
| Display | `clamp(3rem, 1rem + 9vw, 9rem)` as a starting point |

- Five sizes in regular use at most, far enough apart to read as different (1.25x step minimum, 1.5x between hierarchy levels).
- Ratio: 1.2 for dense UI, 1.25 standard, 1.333 expressive.
- Expressive and editorial work: display at least 4x body; up to 10x for statement pages.
- On phones, shrink headings, never body text.

## Settings

| | Leading | Tracking |
|---|---|---|
| Display | 0.9 to 1.05 | -0.02 to -0.05em (tighter as it grows) |
| Headings | 1.1 to 1.25 | -0.01 to -0.02em |
| Body | 1.45 to 1.6 (1.5 default) | 0 |
| Long-form | 1.6 to 1.7 | 0 |
| All caps | about 1.0 | +0.03 to +0.06em, one line only |

- **Measure:** 45 to 75 characters, aim for 60 to 70. Use `max-width: 65ch` and count to check. Phones: 35 to 60. Each column in a multi-column layout must pass on its own. Wider measure needs more leading.
- Display lines: 3 to 7 words, manual line breaks where it matters, `text-wrap: balance` on headings.
- Light text on dark: drop one weight or add about 0.01em tracking.
- Never centre more than 3 lines. Never justify on the web.
- Heading: at least twice the space above as below. Three heading levels on a page is usually plenty. No hyphenation in headings.

## Details that separate professional work

- Curly quotes and apostrophes (’ “ ”), the ellipsis character (…), × for dimensions, real © ™ ®.
- En dash for number ranges in typeset work (10–12), with a non-breaking space where needed. (This is a typesetting detail. Our written prose still avoids dashes as separators.)
- Non-breaking spaces between numbers and units (10&nbsp;MB) and to stop single-word last lines.
- Bold or italic for emphasis, never both, never underline.
- Tabular figures for prices, data and live numbers. Old-style figures can suit running text.
- Links: underline offset about 0.18em, thickness about 0.07em. No weight change on hover.
- Optical alignment: pull round and pointed capitals (O, C, A, T, W) left by about 0.05em at display sizes.
- Long URLs and IDs: `overflow-wrap: anywhere`. Never `word-break: break-all` on prose.

## Avoid

- Scale drift (1 or 2px nudges off the scale).
- Display sizes with body leading.
- Centred headings over left-aligned body.
- One accented word in a headline. All-caps labels above everything. 01/02/03 numbering when the content isn't a sequence.

## Web font performance

WOFF2, subset to the characters needed, variable fonts where they save files, `font-display: swap`, preload only the critical file, keep the total under about 200KB. Test with real copy (never lorem ipsum) and at 200% zoom.

Sources: bencium typography (after Butterick's Practical Typography), Owl-Listener/designer-skills, Leonxlnx/taste-skill, wondelai web-typography and top-design, Dammyjay93/interface-design, vercel-labs/web-interface-guidelines (all MIT).
