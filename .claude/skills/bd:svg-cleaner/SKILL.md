---
name: svg-cleaner
description: Clean and optimise SVG code for By Default projects — icons, logos, standalone files, and CSS data-URIs. Use when the user pastes SVG code, asks to clean or process an SVG, or adds a new icon or logo to a project.
user_invocable: true
---

# SVG Cleaner

Cleans SVG code with `@bydefaultstudio/svg-cleaner`. It reads from stdin and
writes to stdout (or `-o FILE`), so it works from any directory.

## Find the tool first

In order of preference:

1. `npx @bydefaultstudio/svg-cleaner --help` — works anywhere the package resolves.
2. A project-local install: `npx svg-cleaner --help`.
3. The checkout, if this machine has it:
   `node "<…>/Claude/svg-cleaner/bin/svg-cleaner.js" --help`.

Run `--help` once if unsure — the flag set has changed before, and it is the
authority over this file.

## Workflow

**1. Decide the output mode** — ask if it is not obvious from context:

| Intent | Mode |
| --- | --- |
| Inline in HTML | default (no mode flag) — strips `xmlns`, sizes to 100% |
| Icon | `--icon` — wraps in `<div class="svg-icn">` |
| Logo | `--logo` — wraps in a logo div with `aspect-ratio` |
| A `.svg` file for `<img>` or CSS `background` | `--standalone` — re-adds `xmlns`, keeps dimensions |
| CSS background data-URI | `--css` (with `--css-format url\|basic\|advanced\|bullets\|class`) |

Modes are mutually exclusive.

**2. Decide the output location** — ask if not obvious. Typical:
`assets/images/svg-icons/`, `assets/images/logos/`, `assets/images/illustrations/`.
Check what the project actually uses before assuming.

**3. Run it** with a heredoc, which avoids all shell escaping problems:

```bash
npx @bydefaultstudio/svg-cleaner [FLAGS] -o [OUTPUT_PATH] <<'SVGEOF'
<svg>...pasted code...</svg>
SVGEOF
```

## Flags

| Flag | Purpose |
| --- | --- |
| `--current-color` | Set all shape fills to `currentColor` (theme support) |
| `--size` / `--keep-size` | Force 100% sizing / keep original dimensions |
| `--icon-name NAME` | Icon name attribute (with `--icon`) |
| `--logo-name NAME` | Logo name attribute (with `--logo`) |
| `--strip-comments` | Remove XML/HTML comments |
| `--strip-metadata` | Remove `data-*` attributes and editor class names |
| `--precision N` | Round decimals to N places |
| `--minify` | Collapse whitespace, optimise path data |
| `--no-sanitise` | Keep scripts and event handlers — see the warning below |
| `-o, --output PATH` | Write to a file instead of stdout |
| `--config PATH` | Config file (defaults to `./svg-cleaner.config.json`) |

Common combinations:

- **Icon for HTML**: `--current-color --icon --icon-name "arrow-right" --strip-comments`
- **Logo inline**: `--current-color --logo --logo-name brand --strip-comments`
- **Logo as a file**: `--logo --logo-name brand --standalone --strip-comments -o assets/images/logos/brand.svg`
- **Illustration file**: `--standalone --strip-comments -o assets/images/illustrations/name.svg`

## Rules

- **Sanitising is on by default and stays on.** It strips scripts, event
  handlers, and `javascript:` links. Only pass `--no-sanitise` for an SVG the
  user has confirmed is trusted and genuinely needs scripting — declarative
  animation (CSS keyframes, SMIL) survives sanitising untouched, so animation
  alone is never a reason to disable it.
- A project may carry `svg-cleaner.config.json` setting its own icon/logo class
  and attribute names. Respect it; don't hardcode class names over it.
- Wrapper class defaults are `svg-icn` and `svg-logo`.
