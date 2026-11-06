---
name: figma
description: "Use for any work in a Figma file: starting a new file, where it goes, pages, sections and how to lay them out, section titles, naming frames, text layers, components, annotations and mockups, and which libraries to use. Also use when Erlen states a new Figma preference, to record it, and to tidy an existing file."
---

# Figma

How By Default sets up and works in Figma files. These are Erlen's preferences. Where a client's brand kit says otherwise, the brand kit wins on brand (colours, type), but these file rules still apply.

**Everything uses variables.** Every padding, gap, width, radius, stroke and colour on a frame is bound to a variable, zeros included. A value that isn't on the file's scale is a question for Erlen, never a raw number. The only exception is a page background (§3), because Figma pages can't take variables.

> **Status, 2026-11-02.** The Website file is the reference: every Engine component has its own page (one page per group), each with a Component frame and a Guide, all on a `doc` variable collection. Default Styling publishes four `Doc/*` text styles and a `Page header`, and is the team's default library. The Project Template opens Cover, then Contents, built from Default Styling. **2026-11-01.** Every file is listed in the Work archive (§1). **Earlier, 2026-10-26.** Default Styling has its variables (four section fills), eleven private text styles, Section Title, Section Status, Cover (with a Logo area slot for client logos), Start here, Logo and the Annotation kit (which replaced the Docs kit and Spec kit). Still open: the Project Template switch-over and the icon workflow. That work is tracked in the agency repo, `internal/figma-defaults/`.

## 1. Libraries

| Library | File key | Use for |
|---|---|---|
| Default Styling | `FbcjQSYBBQnVGJaDNyODQZ` | File furniture: variables, private text styles, the four published `Doc/*` styles, Section Title, Section Status, Cover, Logo, Page header and the Annotation kit (Start here is deprecated: use a Contents page, §3). **The By Default team's default library**, on for All files, so every team file has it without adding it. It's By Default branded on purpose: it's our workspace, not the client's design |
| Foundations | `A5B6I0mPwdqGYQU1AwnRol` | By Default's colour primitives and **font families only** (primary, secondary, tertiary, quaternary, display, script, code, editorial, playful). Change a typeface here and every file follows. Sizes, weights, line heights and spacing belong to each file's own type system |
| Website | `KW1Olx0Jq27MJjhuNtT5KB` | Web and product UI |
| Presentation | `XDYrzbKkLZlN8kwjQP6bgI` | Decks in Figma Slides |
| Formats | `IZsSvHtEHt0vSvVMpxj707` | Platform parts for every format: artwork overlays (safe area, cropped area, covered area, measurements), app screens, phone screens and platform icons. **The source of truth for anything shaped by a platform.** A file never keeps its own copy: a local component like a Formats one is swapped for it and archived (Erlen, 2026-11-05) |
| Mockups | `0ELtDkGOXK4Z6DFsdmCm4p` | Device frames, browser chrome, social posts, placeholder images for presenting work |
| Project Template | `b0PQqrf0ryzQKk93BE17QU` | The starting point for every new design file |

### Every other file: the Work archive

The libraries above are the shared files. **Every** By Default Figma file, client and internal, is listed in one place: the agency repo's `internal/work-archive/archive.md` (one row per file: name, link, client, project, year, state, portfolio, public, pages).

- **Read it before you search for, open or make a file.** It is the quickest way to find the right file and its link. Never guess a file key.
- **Outside the agency repo,** read it from GitHub: `bydefaultstudio/agency`, path `internal/work-archive/archive.md` (attach the repo with read access if the session doesn't have it).
- **Client confidentiality still applies.** Use only the rows for the client you are working on, and never quote another client's rows.
- **Keep it current.** When you make a file, rename one, move one to archive, or find one that isn't listed, change its row. In the agency repo, edit the row in your pull request. Anywhere else, put the row in your handoff and Manny adds it at the next Stand-up. Store links without Figma's `t=` share parameter.

- **Use the By Default Foundations** for tokens, unless it's a brand new identity project that needs its own variables. Then build the client's variables in their own file and record that in the project's `decisions.md`.
- **Never recreate a token or component** that a library already has. Search the libraries first.

### Default Styling's variables: one collection, kept few

Default Styling is our template, not a design system. It has **one collection, `Default Styling`, kept to a few variables.** Only make something a variable if someone would actually change it. Sizes, radii, status colours and one-off colours are fixed values.

- **Brand** (change these to rebrand the template):
  - `colour/black`, `colour/white`
  - `colour/black-10`, `colour/black-60`, `colour/white-15`: tints. **Update them when you change black or white.**
  - `font/primary`: the one typeface (needs Regular and Medium). Every text style's family is bound to it.
- **Figma working values:** four section fills (`section/fill`, `section/fill-faded`, `section/fill-dark`, `section/fill-dark-faded`, see §4), `section/radius` (16), `section/radius-full` (999: **anything pill-shaped**, such as status labels, callout labels, measurement values and number badges), `component/border`, `component/fill-dark`, `component/spacing` (20, padding and gap).
- **Logo:** the `Logo` component, the default in the Cover's **Logo area** slot. In a client file, drop the client's logo into that slot: it centres the logo and keeps its proportions, so nothing gets squashed. The Cover's `Name` layout keeps its small logo as an instance swap.
- Before adding a variable, ask: would anyone rebranding the template change this? If not, use a fixed value.
- **Text styles: 11, private, named by use.** Every name starts with `_` so it is never published: other files' style pickers never show them, but Default Styling's components still render with them everywhere. `_Doc/Cover` 128/136, `_Doc/Cover small` 48/56, `_Doc/Page title` 24/32, `_Doc/Title` 18/32, `_Doc/Body` 13/22, `_Doc/Body strong` 13/22, `_Doc/Note` 11/16, `_Doc/Label` 11/16, `_Doc/Label large` 24/32 (the Annotation kit's `Size=Large`), `_Doc/Eyebrow` 11/16 (capitals, 6%), `_Doc/Code` 12/16 (IBM Plex Mono). Inter, as Figma's own UI, with **pixel** line heights. Don't add a style for a one-off size; use the nearest.
- **Four published styles for docs:** `Doc/Title` (Inter Medium 40), `Doc/Heading` (24), `Doc/Body` (Regular 16) and `Doc/Eyebrow` (Medium 12, capitals). They are the exception to "private": any file without its own website styles writes its Contents and guides as plain text layers in these styles. Don't add more.
- **A second collection, `doc`, for Contents and guide pages** in files that don't have their own (see §8): `doc/page-width` 960, `gutter` 24, `section-gap` 32, `content-gap` 16, `text-gap` 8, `page-bottom` 48, `header-padding` 96, `row-padding` 16, `none` 0, and colours `page-fill`, `header-fill`, `ink`, `ink-faded`, `rule` pointing at the `colour/*` variables.
- **Default library setting** (Professional plan): file browser, **All folders**, the **By Default** dropdown next to the team name, **View settings**, **Libraries**, **View team's libraries**, then each library's Off / Design files / All files dropdown. Not in Admin, and not in account settings (that one is drafts only). A republish can reset a default to Off, so if Default Styling goes missing from new files, check here first.
- **Gotcha:** unbinding a variable on a range of styled text detaches that range from its text style. Unbind on the style, not the text.

**Gotcha:** once a colour variable is bound to a fill, Figma takes the transparency from the variable and ignores the fill's own opacity. A faded colour needs its own variable (a tint), never "black at 40% fill opacity".

## 2. Starting a new file

1. **Start from the Project Template.** Duplicate it, never start blank.
2. **Put it in the right folder.** Client work goes in that client's folder; internal work in the internal folder. A file left in Drafts is a file nobody can find.
3. **The cover is the thumbnail and nothing else.** Set the project name (and the version line) so the thumbnail is right; status, client, dates and sign-off live on Contents, not the cover. In a client file, make it look like the client:
   - Use the `Logo` layout and drop the client's logo into the **Logo area** slot.
   - Bind the cover's background and text to the file's own semantic colour variables (background primary, text primary, text secondary), not Default Styling's black.
   - Pick the mode (Light or Dark) on the cover instance, so it follows the file's own light and dark modes.
4. **Fill in Contents** (§3): About this file first (what it is, links, libraries, how to work in it), a row for every page, and a Last updated line.
5. **Record the link** wherever the project keeps its notes (in the agency repo: the project's `brief.md` and `log.md`), and add the file to the Work archive (§1).

**What an agent can and can't do here.** The Figma connection can create a blank file inside a folder, but it can't duplicate the template or move a file. So:

- If Erlen hasn't made the file, ask him to duplicate the template into the right folder and paste the link. Name the exact folder.
- If he asks the agent to make it anyway, create it in the right folder (never Drafts), add the Default Styling library, rebuild the cover from it and add a Contents page (§3), then tell him it wasn't a true duplicate.
- Folder IDs for each client and the internal folder aren't recorded yet. Ask for the folder link once and add it to the project's notes.

## 3. Pages

### What a page is

- **The file is the project** (for example, the Black Doctor design file).
- **Each page is one design request**: `Homepage`, `Event poster`, `Instagram launch`.
- **Rounds, options and deliverables are sections on that page, never separate pages** (see §4 and §5).

### Page names

- **Sentence case, short, the name of the request.** Fixed pages keep their names: `Cover`, `Contents`, `Components`, `Mockups`, `Archive`.
- **A status emoji at the start, only when it helps a page stand out** in a long list:
  - ✅ latest or approved
  - 🟡 in progress or in review
  - 🔴 problem or blocked

  Example: `✅ Homepage`, `🔴 Event poster`. No emoji means nothing to flag. Don't put one on every page; the point is the pattern interrupt.
- **Sub-pages** start with `↳ ` (`↳ Mobile`).
- **Dividers** are a page called `---`. Plain, nothing else in the name.
- **Page background: `#666666`, as a raw hex.** Every page, every time, including new ones. Figma pages can't take variables, so type the hex in.
- Old work goes to `Archive`, never deleted.
- **A page marked Archive is no longer needed** (Erlen, 2026-11-05). A page with "Archive" in its name moves into a section of the same name on the `Archive` page, layout kept, and the page is deleted. When there are many, use a second page, `Archive · old pages`. The section's Section Title meta says which page it was and when it was archived. Repack each section so it fits the screen (`cleanup-scripts.md` B10).
- **No empty pages** (Erlen, 2026-11-05). Delete an empty page and add it back when it's needed. The exception is a page that is a step in a working process (a status page such as `Ready to post`), which stays even when empty.

### Contents: the file's table of contents

**Every file opens `Cover`, then `Contents`.** Contents replaces Start here: it says what the file is for and lists everything in it, and it is kept up to date, which a Start here never was. The Start here component in Default Styling is deprecated.

- **About this file comes first.** It's the first thing anyone reads, so treat Contents as the file's intro page: what the file is, what's in it, the libraries it publishes and uses, where the code, brief and project notes live (linked), and how to work in it. The table of contents follows.
- **Built as an OS docs page** (see *Guides and information pages* in §8): a centred page header, its title the Figma file's name and its eyebrow "Table of Contents"; then About this file; then the page groups, each a list of linked pages with what's on each and its status. In the Website file that's `section-header` and `book-contents`; in a file without website components, Default Styling's `Page header` with `Doc/*` text and lines bound to `doc/rule` (the Project Template has one to copy).
- **No Figma section on Contents.** The frame sits straight on the canvas.
- **After the page groups:** Key links (the sections, frames and guides people use most), Prototypes (every flow starting point and its page), Not touched (any page left alone, and why) and Last updated (newest first: date, who, what changed, session link).
- **Links are full file URLs** (`…?node-id=12-34`). Figma won't take a page as a node-link target.
- **Who updates it, and when:** whoever works in the file, person or agent, at the end of every piece of work: the page's row and status, any new key links or flows, and a new Last updated entry. A page added, renamed, moved or archived is a Contents change too.
- **Rolling out:** files get a Contents page one at a time, in the order of the agency repo's Work archive (`internal/work-archive/archive.md`).

### Pages of design work have an About this page note

Guide pages don't: a guide already says what it is, so its purpose goes in its header and a closing *Using this guide* section. Contents doesn't either; About this file does that job.

A section named `About this page`, top left, 200px clear of the page's work. Inside: a `Section Title` (`Large=True`, status if it helps), then two short paragraphs, **What this page is for** and **How to use it**, and a *Last tidied* line. Text in the file's own body style (in Website: `Body/M`, `text/text-primary`), never Default Styling's private styles. Old pages get the note and nothing else (§11).

## 4. Sections

### How a section looks

- **Fill: pick one of the four section fills to suit the components inside.** `section/fill`, `section/fill-faded`, `section/fill-dark` or `section/fill-dark-faded`, all in Default Styling. Light components sit on `fill-dark-faded`; dark ones on a light fill. Use the same fill across a file unless a section's contents need the other.
- **Corner radius: 16px**, bound to `section/radius` on all four corners.
- **Sections inside sections: alternate light and dark at each level.** The child takes the other tone and keeps the same strength: `fill-dark-faded` holds `fill-faded`, `fill-dark` holds `fill`, and back again at the next level. Every level stays readable however deep it goes. Same 16px radius on all of them.
- **Padding: 100px** between a section's edge and its content.
- **Only when there's design work to organise.** Contents, guide pages and pages with only a few things on them sit straight on the canvas, with no section and no Section Title.
- One section per idea. On a design request page, sections hold the **rounds, options or deliverables** (`Round 1`, `Option A`, `Poster`), nested when needed (a `Round 2` section holding `Option A` and `Option B`).

### Laying sections out on the page

Don't stack everything in one long column. A page you only scroll down is hard to scan and gets very tall. Balance it across and down.

- **Work in columns.** Related sections stack in a column; the reader goes down a column, then back up and across to the next one, like a newspaper.
- **Keep the page wider than it is tall.** When a column gets taller than the page is wide, start a new column to the right.
- **Top-align columns** so each one starts on the same line. Left-align the sections within a column.
- **200px between sections, the same everywhere** on the page, across and down, at every level (top-level sections and the sections inside a parent). Never less than 200px; never mixed gaps on one page.
- Order follows reading: what someone needs first goes top left.

### Section names and Section Titles

- **The section's own name is the main label.** Figma draws it at the same size at every zoom level, so it stays readable when zoomed right out, even if names overlap. Name every section well: short, obvious, no `Section 1`.
- **The Section Title component goes inside the section, at the top left** (100px in). Never above or outside a section.
- **How often:** one Section Title in each **top-level** section, `Large=True`, with a Status. Sections inside a parent rely on their own names and **don't get a Section Title**, unless that child needs its own Status or note; then use `Large=False`.
- Don't repeat the name as loose text. The section name and the Section Title say it.
- **Status pill:** project files use **Draft, In progress, In review, Approved, Handed off**. Engine, Part, Legacy, Docs site and Deprecated are for design-system files only.
- See the Default Styling file's `Components` page for a working example of all of this.

## 5. Naming

Short, obvious, **sentence case** (`Event poster`, not `Event Poster`). If a name needs explaining, it's wrong. AI tools tend to over-name layers: name only what this table says, and when in doubt, leave it.

| What | Rule | Examples |
|---|---|---|
| Page | The design request, status emoji first if needed | `✅ Homepage`, `Event poster` |
| Section | Plain words for the round, option or deliverable; nest when needed | `Round 1`, `Option A`, `Poster`, `Instagram` |
| Top-level frame | The thing only | `Homepage`, `Poster`, `Story` |
| Two of the same thing | Add the shortest suffix that tells them apart | `Homepage v2`, `Poster option 2`, `Homepage mobile` |
| Mockup frame | The thing plus `mockup` | `Poster mockup`, `Homepage mockup` |
| Frames and groups inside | Always named, one or two words | `Nav`, `Hero`, `Card`, `Footer`, `Form` |
| Images | Named simply for what they are | `Image`, `Photo`, `Logo` |
| Text layers | **Never renamed** unless Erlen asks. Figma names them by their text | |
| Shapes and vectors | Leave Figma's names | `Rectangle`, `Vector` |
| Component instances | **Never renamed.** Keep the component's name so they can be found in search and updated | |

- **Frames and groups never keep Figma's defaults** (`Frame 17`, `Group 2641`, `iPhone 16 Pro Max - 1`).
- **No dates or "final", "copy", "new" in names.** Use a section for the round, the Status pill, version history or `Archive`.

### Components

- **Main components:** plain names. Component names keep their own capitals (`Section Title`).
- **Variants** use plain property names (`Size=Large`, `Theme=Dark`), not `Property 1=Default`.
- **Library components** can use slash groups to organise the assets panel (`Instagram/Header`). Follow the pattern the file already uses.
- **A leading `_` (or `.`) keeps a component or style private.** Figma won't publish it, so other files can't pick it, but published components that use it still render. Use it for internal parts that live inside other components (`_dot`, `_badge`) and for Default Styling's text styles. Anything other files should pick has no underscore.

### Text style names in product files

Product files (Website and any file that mirrors code) name text styles after the code, which is the source of truth:

| Group | Pattern | Examples |
|---|---|---|
| Body | Element / the code's size letter, **weight only when it isn't Regular** | `Body/M`, `Body/M Semibold`, `Body/S Medium`, `Body/Eyebrow` |
| Heading | The HTML element | `Heading/H1` to `Heading/H6` |
| Display roles | Role / breakpoint (one code token that changes size with screen width) | `Headline/Desktop`, `Title/Mobile` |
| UI | Component / variant, in the code's words | `UI/Button/Small`, `UI/Dialog/Title` |
| Legacy | Not in the code, waiting to be deleted | `Legacy/Display 130` |

Slashes, not dots, so the style picker shows folders. Each style's description names its class or token.

## 6. Text layers

- **Vertical trim: cap height to baseline** on every text layer, in every file, for all design work (Erlen, 2026-11-05). It makes auto layout spacing between text and other objects exact, and it's easier to align and design with. Standard trim (off) is the exception, and each exception is named here:
  - **Website and product components that must match the browser.** The browser doesn't trim, so a component whose box has to match what the live site renders keeps standard trim. Only where the match matters; everything else in the file is trimmed.
  - **Illustrations.** Text inside cover illustrations and pictograms keeps standard trim.
  - Any other exception needs Erlen's yes, and goes in this list with the reason.
- **Existing work:** the rule applies from 5 November 2026. A session working in a file that pre-dates it fixes the text layers it touches as it goes (styles first, then local layers), and says in the log which pages are done. A whole-file pass is part of the clean-up checklist (§11, step 8).
- The best way is to set it in the **text styles**, so every use inherits it. Every new text style gets it from the start.
- Use library text styles, not local overrides.

### Which type goes where

| What | Type | Where the styles live |
|---|---|---|
| File furniture: headers, status, cover, the Annotation kit | `font/primary` (Inter) | Default Styling's private `_Doc/` styles |
| Guides, Contents and loose notes | The type of the file the guide sits in | That file's own styles (in Website: `Heading/H4`, `Body/M`, `Body/Eyebrow`); in a file with none, Default Styling's published `Doc/*` styles |
| Mockups: devices, browsers, social posts | The platform's own type, never By Default's, so it looks real | Mockups |
| The design itself | The client's type, or By Default's for our own work | The client's library, or Foundations |

Furniture has its own styles on purpose. If it borrowed deck or website styles, changing a deck heading would resize every section header in every file.
- **Line heights.** Web and product files use **percentages**, taken from what the CSS actually renders, including inheritance (a plain `p` inherits `--body-leading` 1.6 from `body`, so `Body/M` is 160%), not from the docs. The code's line heights are ratios (1.4 = 140%), so a percentage is the exact match; `rem` only sets the font size. Default Styling keeps pixel line heights because it copies Figma's UI.
- Build with auto layout. Spacing comes from variables, not nudged by eye.
- **Clip content is off by default** on auto layout frames that hold text (Erlen, 2026-11-05). With cap-height trim, ascenders and descenders (g, p, y) sit outside the text box, so a clipping frame cuts them off. Turn Clip content on only where something has to be masked (an image crop, a scrolling area), and never on a frame whose text is trimmed.
- **The font family comes from a variable, never a typed name** (Erlen, 2026-11-05). Every text style and every local text layer binds its family to the brand's font variables: `font/primary`, `font/secondary`, `font/tertiary` and any others the library defines. By Default's live in Foundations, a client's in its own library, Default Styling's furniture uses its own `font/primary`. Set it in the text style so every use inherits it. If a face has no variable yet, add one to the library and bind it; don't type the name.

## 7. Components

### Always a component set

**Every component is built as a component set, even if it only ever has one variant.**

Why: copy a lone main component into another file and Figma can paste the main component itself, so a second "master" ends up living in the wrong file. Copy something from a component set and you get an instance; the main component stays in its original file. A set of one is the safe default.

- A set of one still gets a proper variant property, for example `Variant=Default`. Never `Property 1=Default`.
- When a second variant arrives, add it to the existing set. Don't start a new one.

### Icons are the exception

**Icons are plain components, not sets of one.** An icon library made of single-variant sets is noise. Name each icon for what it shows.

- Make a set only when an icon has real variants (weights or sizes); then every variant of that icon lives in the one set.

### How a component set is laid out

- **Auto layout on the set**: horizontal, vertical or wrap (grid), whichever suits the variants.
- **20px padding on every side and a 20px gap** (both directions when it wraps). Bind both to `component/spacing` in Default Styling.
- **Dashed border** in `#9747FF`, bound to `component/border`. This purple is a working colour, not the brand purple. Never swap it for `brand/purple` and never use it in a design.
- **The set hugs its variants.** Its own width and height are Hug.
- **Light variants get a dark set.** If a set's variants are light and hard to read on the white section, fill the set with **black at 70%** (`component/fill-dark`). Otherwise leave the set unfilled. Section Status is the example.

### Variants hug or are fixed, never Fill

- **Each variant inside a set is Hug or Fixed** on both axes. **Never Fill.**
- Figma often switches a child to Fill when it goes into an auto layout, so the variants stretch to the width of the set. Check every variant after adding it, and set it back to Hug or Fixed.
- Why: a variant's size belongs to the component, not to whatever box it sits in. Fill makes a component change size when its neighbours change.

### Everything else

- Components that belong to one file stay on that file's `Components` page. Anything reusable across projects goes to a library (see §9).
- Plain property names, a description on every component set, and no stray instances left lying on the canvas.

## 8. Annotations

**Annotate with the Annotation kit on the canvas by default.** Its parts sit in the layout beside the artwork and scale with it, so they never cover the work at any zoom. Figma's native annotations draw at the same size at every zoom, so on a busy page they hide the artwork.

> **Draft, 2026-10-24.** Erlen is still deciding exactly when native annotations are worth it. Practice examples are on the `Experiments` page in Default Styling (a made-up client, Northside Run Club).

### Guides read like an article

A guide (a component guide, a client how-to) is **one section read top to bottom**: an eyebrow, a heading and paragraphs, then the example on a grey card underneath, topic after topic. This is an exception to the column layout in §4, for guides only.

### Guides and information pages are built as OS docs pages

Build every guide, Contents page and page of information **as if it were a page on the By Default OS docs site**: one content column, from the file's own components and text styles. No site sidebar, no "On this page" rail and no page nav: those are website-only.

- **Frame:** 960 wide (`doc/page-width`), `doc/page-fill`, square. A centred `page-header` (eyebrow, title, one short line), then the article.
- **Article:** a lead line, then for each topic a **divider** and a **`section` frame**: a heading, paragraphs, then the demo. Gaps: `doc/section-gap` between sections, `doc/content-gap` inside one. Body copy is `doc/measure` wide (680, about 75 characters); headings, demos and tables fill the article (912).
- **Demos:** each is one frame called `demo` (fill `doc/demo-fill`, padding and gap `doc/demo-padding`, radius `doc/demo-radius`, which is 0: demos are square) holding **one frame per topic** named for it (`anatomy`, `variants`, `sizes`, `states`, `colour`, `do-dont`). No `Examples` wrapper, no white light panel, no groups, and no LIGHT MODE label; only a dark example is labelled, because it's the exception. Rows of like things sit in a Figma grid; marks that point at things (callouts, measures) sit loose, and a frame of loose marks fills the demo's width with its content centred so there's room to edit. Name layers for what they are (`button outline`, `label outline`, `measure height`, `dark mode`).
- **Measures:** a measure's value sits on its line unless that covers something; then use the measure's `Value` position (Top or Bottom for a horizontal one, Left or Right for a vertical one), keeping the line where it is.
- **Layout comes from variables.** The Website file has a `doc` collection (page width, fill, gutter, section and content gaps, page bottom, measure, demo fill, padding, gap and radius) aliased to its own scale; change one and every guide follows. Default Styling has the same idea for files without a design system (§1).
- **Component pages:** one page per group of components (`Buttons`, `Form controls`…). Each component gets two frames in one row, 200 apart: a **Component frame** (centred header, the master set, then a divider and a Specimens section in light and dark mode), which hugs its content and has no max width, and its **Guide**.
- **Start from the templates, don't redraw them.** The Website file's `Page templates` page holds a Doc page and a Contents page; the Project Template holds a Contents page built from Default Styling.

- **Headings say the point** in plain English: "Pick a size", "States are paint, not variants". Not just "Sizes".
- **Write in paragraphs and tables, not annotation boxes.** Anything that maps one thing to another (a component's properties to its code) is a table on a grey card: In Figma, In code, Options.
- **Guide text uses the type of the file it sits in**, never Default Styling's private styles.
- Reference layouts: the `Buttons` page (Component frames and Guides) and the Typography and Colour guides in the Website file, and the Project Template's Contents.

### The Annotation kit

In Default Styling's `Components` page. **Marks** go on or beside the work; **Panels** sit beside it.

| Part | Use |
|---|---|
| `label` | A value or word: a measurement, a state (hover), a verdict (do). Filled or Text |
| `number` | A numbered marker for anatomy, matched to a numbered paragraph or table row. Filled or Outline |
| `measure` | A dimension line with its value. **Value On line** when there's room. When the gap is too short to hold the pill, put the value **Left, Right, Top or Bottom** of the line, wherever there's space. The instance is always exactly the line: snap it to the gap and it's measured. The value sits outside, 6px off the line (12px Large), and grows away from it as the text gets longer |
| `callout` | A leader line from a marker to the part it names. Swap the marker for a label to name it in words |
| `zone` | An area: padding, safe zone, hit area. Area (12% wash) or Ring |
| `guide` | A dashed alignment line |
| `note` | A rule with a note for a proportion or unit (1/2 X) |
| Panels: `context`, `token-header`, `token-row` | The light or dark ground an example sits on, and the token table under an anatomy |

- **Size: Default or Large.** Default is for component guides and anything viewed near 100%. **Large** doubles the mark (24px value, 2px lines, 14px ticks) for big canvases read zoomed out: social templates (1080 × 1920), print and posters. Pick one size per diagram and switch it on the instance; never scale a mark with the Scale tool, or every instance ends up a slightly different size. Today `label` and `measure` have Large; add it to another mark the first time a Large diagram needs it, in the same set.
- **Colour is picked for contrast, not meaning.** Every mark has the same Colour property: **Ink, White, Red, Blue, Pink, Green.** Ink on light work, White on dark work (a measurement on a black button is White), a bright to stand out or to tell two kinds of mark apart. Inside one diagram, keep one colour per kind of mark (all spacing Pink, say); that's a habit, not a rule the component enforces.
- **A callout's point sits about 8px beside its target, never on it**, and the line runs through empty space. Shorten the callout if its marker would land on other content.
- Leave room for the notes in the layout. Notes go in space set aside beside the artwork, never on top of it.

### Native annotations (sparingly)

Not everyone who opens a file is a developer or a confident Figma user. Clients and non-designers with event, social or print artwork get lost in a pile of notes.

- At most one note per artwork or part of a screen. Never one per layer.
- Never repeat what Figma already shows (sizes, colours, spacing). Dev Mode shows those.
- Candidate uses, being tested on the Experiments page: one note for a whole artwork set, delivery specs (size, format, bleed, file name), how-to-edit notes on templates for non-designers, and a lean developer handoff.
- Categories in every file: Development, Interaction, Accessibility, Content, Delivery, How to edit.
- Sections can't hold annotations. A note for a section goes on its main frame.
- Approval isn't an annotation. Use the Status pill.

## 9. Mockups

- **Present work with the Mockups library**: device frames (iPhone, MacBook), browser chrome, social posts (Instagram, TikTok, LinkedIn, Slack), SEO and share previews, placeholder images.
- **Keep it up to date.** If a project needs a mockup that isn't there (a new device, a new platform), build it properly and add it to the Mockups file rather than leaving a one-off in the project. Note it in the agency repo's `internal/figma-defaults/log.md` and tell Erlen it needs publishing.
- Agents never publish a library. Erlen publishes.

## 10. Sign-off

Every design file or deck an agent makes gets a sign-off on the cover or the last slide. In the agency repo it is `Design: Kobbie / Direction: Erlen`.

## 11. Cleaning up a file

A checklist for tidying an existing file to these rules. Work through it in order.

The scripts that do most of this quickly are in `cleanup-scripts.md`, next to this file: audits first, then fixes once Erlen says yes, then checks.

**Before you start**
- Read the whole file first: pages, sections, components, which libraries are on.
- Never delete work. Anything unused or old goes to `Archive`.
- Only update the pages in use. Old pages (archives, earlier versions, experiments) are left as they are until they come back into use.
- Client files: tidy the furniture (pages, sections, names, notes), never the client's design, brand colours or type. Ask Erlen before restructuring a client file.
- For a big change, note the current state in version history first (File > Save to version history) so it can be undone in one step.
- **Audit the file, not the register.** The Work archive row can be out of date: another session may have reorganised the file since. Run A4 and A5 (`cleanup-scripts.md`) on every page, two to four pages per call.
- **Find who else works in the file** (the project's log; content and format sessions). Their pages are theirs: change only what Erlen names there, and re-read a node before moving it.
- **Ask the forks in one go,** with the proposal: how far a library swap reaches (old pages only, or pages in use too), what a vague request means ("the correct cover"), which empty pages are process steps, and whether section bindings reach pages other sessions own.

**1. Libraries**
- Switch on Default Styling. Add Foundations, Mockups or the client's library only if the file uses them.
- Platform parts come from Formats. Swap local copies and orphaned instances (a main component that was deleted, A5) to the Formats version (B7), then archive the local copy in a `Replaced by Formats` section.

**2. Pages** (§3)
- `Cover` first, then `Contents`. No Start here page: fold its content into Contents.
- One page per design request; rounds and options become sections, not pages.
- Sentence case names; status emoji only where it helps (✅ 🟡 🔴); plain `---` dividers; `↳ ` for sub-pages.
- Background `#666666` on every page.
- Pages marked Archive become sections on an archive page (B8); empty pages are deleted, process pages excepted.

**3. Sections** (§4)
- Every piece of work sits in a section on pages with several pieces of work; Contents, guides and sparse pages have none. Fill and radius bound (one of the four `section/fill*` fills, chosen for the components inside, and `section/radius`).
- Section names in plain words: `Round 1`, `Option A`, `Poster`.

**4. Layout** (§4)
- Columns, read down then across; the page wider than it is tall; columns top-aligned.
- 200px between sections everywhere; 100px padding inside.
- A section that won't fit the screen (artwork scattered on an old page) gets repacked (B10).

**5. Section Titles** (§4)
- One inside each top-level section, top left, `Large=True`, with a Status. None in child sections unless they need their own status. None above sections.

**6. Names** (§5)
- Fix `Frame 17`, `Group 2641` and other defaults on frames and groups. Name images `Image`, `Photo`, `Logo`.
- Leave text layers, shapes and component instances as they are.

**7. Components** (§7)
- Every component a set (icons excepted: plain components unless they have real variants). Auto layout, `component/spacing`, dashed `component/border`, set hugs, no Fill children, `component/fill-dark` behind light variants.
- Plain variant names, a description on each set, stray instances to `Archive`.
- Every local component on the `Components` page, in sections by use (B9). Moving a main component within the file keeps its instances linked.

**8. Text** (§6)
- Library text styles. Vertical trim cap height to baseline on every text style and every local text layer, except the named exceptions in §6 (components that must match the browser, illustrations). Font family bound to the font variables (`font/primary`, `font/secondary`, `font/tertiary`), never a typed name. Clip content off on frames that hold text.

**9. Notes** (§8)
- Explanations as canvas notes with the Annotation kit, guides as articles. Native annotations only for the few agreed uses.

**10. About notes and Contents** (§3)
- An About this page note on every page of design work, old pages included. None on guides or Contents.
- Contents lists every page with its status, and a Last updated entry says what the clean-up changed. In a file without website components, build it from Default Styling's parts (`cleanup-scripts.md`, *Default Styling keys*).

**When you finish**
- Zoom right out on each page and check: nothing overlaps, gaps are even, every section has a readable name.
- Write what changed in the project's log, and tell Erlen anything you moved to `Archive` or couldn't fix.

## 12. Learning new preferences

These rules grow. When Erlen states a Figma preference, corrects something, or a choice comes up twice:

1. Add or change the rule in this file, in the right section.
2. Add a dated entry to `decisions.md` in this skill's folder saying what changed and why. Never delete an old entry; add one that replaces it.
3. Both files live in bd-plugin (`skills/figma/`), so the change goes in as a pull request there and reaches every repo with the next release.
4. If it needs work in a Figma file (a new variable, a component change), add it to the agency repo's `internal/figma-defaults/brief.md`.

If a preference is unclear, ask Erlen one question before writing it down.

