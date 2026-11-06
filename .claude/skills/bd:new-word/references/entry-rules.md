# Entry rules and the create script

The authority for these rules is the CMS repo
(`glossary-cms/scripts/WRITING-BRIEF.md` and `Glossary/ENTRY_DELIVERY_FORMAT.md`
on Erlen's machine); this file is the condensed, capture-sized version. If they
ever disagree, those documents win.

## Fields the API takes (`POST /api/entries`)

| Field | Rule |
| --- | --- |
| `name` | The word, real capitalisation ("Petrichor", "Sprezzatura") |
| `slug` | lowercase-hyphenated, `^[a-z0-9]+(-[a-z0-9]+)*$`, becomes the public URL |
| `shortDescription` | One sentence, 8–27 words, sentence case, **no trailing full stop**, must not open with the word itself or "A term for" |
| `longDescription` | Markdown string. `##`/`###` headings only (`#` is reserved for the page title). Paragraphs separated by blank lines |
| `sourceLink` | `null`, or one real authoritative `https://` reference. Never uxcel.com |
| `status` | Always `"reviewed"` (anything else is invisible to the public site) |
| `tags` | Array of **numeric ids** — the script resolves slugs, you supply slugs |
| `relatedEntries` | Array of numeric ids of live entries — script resolves slugs |

## Writing rules

- **Open with a plain definition.** First sentence says what the word means.
  No throat-clearing.
- **UK English** (colour, organise, centre). **No em or en dashes anywhere** —
  use a comma, a full stop, or brackets. The script hard-refuses `—` and `–`.
- Length to suit the word. Subject entries in the corpus run ~290–620 words;
  a personal word is allowed to be shorter (roughly 120–350) because small
  words deserve short entries. Use `##` sections only past ~300 words.
- Name real people, dates, and sources where they exist; invent nothing. If
  unsure, leave it out rather than hedge.
- **End on a judgement, not a summary** — something Erlen can act on or argue
  with. Where he met the word is often the best material for this.
- Never write "In conclusion", "It's worth noting", "Remember that".
- Bold (`**word**`) for a term being defined inside a list; backticks for code.

## Worked example (personal-word length)

```json
{
  "name": "Petrichor",
  "slug": "petrichor",
  "shortDescription": "The earthy smell released when rain falls on dry ground, carried by an oil plants shed",
  "longDescription": "Petrichor is the smell of rain arriving on dry earth. The word was coined in 1964 by two CSIRO researchers, Isabel Bear and Richard Thomas, from the Greek petra (stone) and ichor (the fluid in the veins of the gods).\n\nThe smell is not the rain itself. During dry spells, plants shed an oil that soil and rock absorb; rain striking the ground aerosolises it, along with geosmin, a compound made by soil bacteria that humans can detect at astonishingly low concentrations. What reads as one smell is a mixture arriving all at once.\n\nThe judgement: petrichor is a reminder that the most familiar experiences often have the least familiar names, and that a precise word for a shared sensation is worth keeping.",
  "sourceLink": null,
  "status": "reviewed",
  "tags": ["erlens-words"],
  "relatedEntries": []
}
```

Write the draft to a temp file in exactly this shape (slugs, not ids — the
script resolves them).

## Creating the entry

Save the approved draft as JSON (shape above) to a temp file, then run:

```bash
python3 "<skill base directory>/references/create-entry.py" /path/to/draft.json
```

The base directory is printed at the top of the skill invocation (currently the
plugin cache, `~/.claude/plugins/cache/bydefault/bd/<version>/skills/new-word`).
Take it from there rather than hardcoding it: the version in that path changes
with every release, and the old personal copy at `~/.claude/skills/new-word/`
was deleted in 0.4.0.

The script: reads the Keychain password (service `glossary-cms`, account
`dev@bydefault.studio`), logs in, resolves `tags` and `relatedEntries` slugs to
ids (refusing unknown slugs), enforces the dash/slug/shortDescription guards,
POSTs, and prints the created id plus the public verification GET. It never
prints the password. If login fails with 401, the capture user's password has
changed — tell Erlen rather than guessing.

## The git record (when the CMS repo is present)

`glossary-cms/scripts/rewrites/<slug>.json`, the repo's 8-key shape — note the
differences from the API shape: `sourceLink` is `""` (not null) when absent,
`tags` stays slugs, `relatedTerms` (slugs) replaces `relatedEntries`, and
`notes` records what was included and why:

```json
{
  "slug": "petrichor",
  "name": "Petrichor",
  "shortDescription": "…same as posted…",
  "longDescription": "…same as posted…",
  "sourceLink": "",
  "tags": ["erlens-words"],
  "relatedTerms": [],
  "notes": "Captured via /new-word direct to the CMS on YYYY-MM-DD, already live; this file is the git record. Context: <where Erlen met the word>."
}
```

Do not run any loader afterwards — the entry is already in production, and the
loader is additive so the file is skipped anyway. Commit it in that repo.
