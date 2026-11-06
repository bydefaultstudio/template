---
name: new-word
description: >
  Capture a word Erlen has learned into his glossary (glossary.bydefault.studio)
  under the Erlen's Words collection, writing the entry and creating it directly
  in the Payload CMS via REST. Use when Erlen says he has learned or come across
  a word, or asks to add a word or term to his glossary. Trigger phrases:
  "new word", "I learned a word", "add <word> to my glossary", "glossary this".
user_invocable: true
---

# /bd:new-word — capture a learned word into the glossary

Works from any directory; nothing here needs a repo checkout. The reader site
is `https://glossary.bydefault.studio`; the CMS API base (`<api>` below) is
`https://glossary-cms.bydefault.workers.dev`. Reads are public; the one write
uses a dedicated capture login whose password lives in the macOS Keychain.

Read `references/entry-rules.md` (beside this file) before drafting — it holds
the field spec, the writing rules, and the ready-made create script.

## The flow

**1. Confirm the spelling.** Erlen dictates via Wispr Flow, so the word may
arrive mis-transcribed. Echo the word and the slug you intend
(lowercase-hyphenated) and get a yes before anything else. A mistake here
becomes a permanent wrong URL.

**2. Duplicate-check by concept, not just slug.** Fetch the corpus light list:

```
GET <api>/api/entries?limit=200&page=<n>&depth=0&sort=name&select[name]=true&select[slug]=true&select[shortDescription]=true
```

Page through `hasNextPage`/`nextPage`. Compare the new word's NAME and MEANING
against existing entries — three past entries duplicated live ones under
different slugs, so a slug check alone proves nothing. If it already exists,
stop and hand back the live link instead.

**3. Review the taxonomy.** `GET <api>/api/tags?limit=200&depth=0`. The entry
always carries `erlens-words`. Add at most one or two existing subject tags
when one genuinely fits (a word about type belongs in `typography` too).
Exact live slugs only — never invent a tag; a typo'd slug would corrupt the
taxonomy the next time the CMS repo's scripts run.

**4. Draft the entry** per `references/entry-rules.md`, and show it to Erlen
for approval before creating. Include where he met the word if he said
(that context often makes the best closing judgement).

**5. Create it** using the script in the references file — it reads the
password from the Keychain (`security find-generic-password -s glossary-cms
-w`), logs in as `dev@bydefault.studio`, resolves tag and related-entry slugs
to ids, refuses em/en dashes, and POSTs with `status: "reviewed"`. Never paste
the password into a command line or a file yourself; the script keeps it out
of both.

**6. Verify from outside.** Unauthenticated
`GET <api>/api/entries?where[slug][equals]=<slug>` must return the entry
(that proves it is public through the reviewed filter — a 200 from the entry
page URL proves only routing). Then hand back:

- the entry: `https://glossary.bydefault.studio/entry.html?term=<slug>`
- the collection: `https://glossary.bydefault.studio/?tag=erlens-words`

**7. Best-effort git record.** If a `glossary-cms` checkout exists on this
machine (on Erlen's Mac: `~/Library/Mobile Documents/com~apple~CloudDocs/Claude/glossary-cms`),
also write the 8-key rewrite file to
`scripts/rewrites/<slug>.json` there (shape in the references file) and commit
it in that repo — lowercase short message, e.g. `record <slug> captured via
new-word`. This keeps the corpus in git and future link passes complete. Do
NOT run any loader script; the entry is already live. Skip silently when the
repo is absent — capture must never block on it.

## Hard rules

- UK English. **No em or en dashes anywhere** (`—` `–`), including the
  shortDescription. The create script refuses them; fix the prose, never the
  script.
- `erlens-words` is always among the tags.
- `status` is always `reviewed`; `sourceLink` is `null` unless a real
  authoritative reference exists (never uxcel.com).
- Related entries only when a live entry genuinely connects; verify each slug
  exists before including it.
