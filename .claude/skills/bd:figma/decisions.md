# Figma decisions

Every Figma preference and rule change, newest first. One decision per entry. Never delete an entry; add a new one that says what it replaces. The current rules live in `SKILL.md`; this file is why they are what they are.

<!--
## YYYY-MM-DD: <decision>
- **Why:**
- **Decided by:** Erlen | Syeda | kobbie
- **Replaces:** <earlier entry, if any>
-->

## 2026-11-05: The Formats library is the source of truth for platform parts
- **Why:** Erlen, cleaning up the Social Media file: "The formats library is the source of truth for the style of components … If any components are similar to the formats components, then we don't need them." The file had six deleted local copies still drawing 108 instances that could never update. A local copy drifts from the library; one source means one change reaches every file.
- **Decided by:** Erlen

## 2026-11-05: A page marked Archive becomes a section on an archive page
- **Why:** Erlen: "If there's any page that has archive on it, that means it's no longer needed so move it to the archive … one archive page or potentially two archive pages and then inside them, organise them into sections." Ten such pages crowded the Social Media page list. Later the same day: "the sections are too big, rearrange the artwork and make sure the sections fit on the viewable area", so moved pages are repacked to fit the screen.
- **Decided by:** Erlen

## 2026-11-05: Empty pages are deleted, process pages excepted
- **Why:** Erlen: "Are there any empty pages? Let's delete them and add pages back if we need them." He kept the Social Media file's empty `Ready to post`, because it is a step in the content flow (In progress, Ready to post, Posted).
- **Decided by:** Erlen

## 2026-11-05: Clip content is off by default on frames that hold text
- **Why:** Erlen: "we don't always need to clip content"; on auto layout frames with text layers, clipping "sometimes clips the ascenders or descenders, especially when the text has vertical trim to the baseline". The old line only said to turn it off where trimmed text sits; now off is the default, and on needs a reason (a mask, a crop, a scroll area).
- **Decided by:** Erlen
- **Replaces:** "Turn Clip content off on frames that hold trimmed text" (§6).

## 2026-11-05: Font families come from the font variables, never a typed name
- **Why:** Erlen: "always use a font variable instead of the actual font names. We have `font/primary`, `font/secondary`, `font/tertiary` and others. Let's always use the brand variables where possible." A typed name breaks the moment a brand's typeface changes, and can't be swapped in one place. The variables already existed (Default Styling's `font/primary`, the Foundations set); this makes binding them the rule for every text style and local layer.
- **Decided by:** Erlen

## 2026-11-05: Vertical trim cap height to baseline is the rule for all design work, with named exceptions
- **Why:** Erlen: it's "easier to align and design with when the vertical trim is cap height to baseline". The rule was already in §6 for text layers; this makes it the default for all design work in every file, and names the exceptions instead of leaving them to judgement: website and product components that must match what the browser renders (the browser doesn't trim), and illustrations (Erlen's call: off). Any other exception needs his yes and a line in §6.
- **Transition:** sessions already designing fix the text layers they touch from 5 November; a whole-file pass belongs to the clean-up checklist (§11, step 8).
- **Decided by:** Erlen
- **Replaces:** adds to "Vertical trim: cap height to baseline on every text layer" (§6).

## 2026-11-02: Everything uses variables
- **Why:** Erlen: "please make sure everything always use variables, it's important." Unbound values drift from the code and can't change in one place. Zeros too; a value off the scale goes to Erlen.
- **Decided by:** Erlen

## 2026-11-02: The cover is a thumbnail only
- **Why:** Erlen: "cover, thumb only, we don't need anything else." Status, client, dates and sign-off belong on Contents, which people read.
- **Decided by:** Erlen
- **Replaces:** filling in client and date on the cover (§2).

## 2026-11-02: Contents opens with About this file; a centred header titled with the file name
- **Why:** Erlen: About this file is "the first thing someone will read … treat it like the intro page, somewhere to learn everything about the file". He re-laid out the Website Contents with a centred header, the file name as title and a short line.
- **Decided by:** Erlen

## 2026-11-02: Figma sections only when there's design work to organise
- **Why:** Erlen: sections "are needed when there is multiple design work to organise, it isn't needed on the contents page, or pages with very few things on there."
- **Decided by:** Erlen

## 2026-11-02: Guides have no separate About note
- **Why:** Erlen: About this page and Notes "can go in the main typography guide". A guide already says what it is.
- **Decided by:** Erlen
- **Replaces:** "Every page has an About this page note" (2026-11-01), for guides and Contents.

## 2026-11-02: Guides are 960, one column, sections with dividers, demos on doc variables
- **Why:** Erlen moved Contents to 960 and asked the guides to follow; the contents rail and page nav "are only for the website". The divider + `section` structure was first added to the Button guide by another session by mistake; Erlen reviewed it ("button looks right") and had it rolled out. Demos simplified on his review: one `demo` frame, one topic frame, no light-mode labels, square corners, loose-mark frames fill the width "so it can be comfortably edited". He kept the 680 copy measure. A `doc` collection holds the layout values "so everything can be updated in one go".
- **Decided by:** Erlen
- **Replaces:** the 1080 / 780 / 220 layout with a rail and page nav (2026-11-01).

## 2026-11-02: One page per group of components, Component frame plus Guide
- **Why:** Erlen split the Website file's Design System page so components can be "organised properly": each group gets a page, each component a Component frame (master set and specimens, no max width) and a Guide, in one row.
- **Decided by:** Erlen

## 2026-11-02: Default Styling publishes four Doc styles and a Page header; it is the team's default library
- **Why:** Erlen: "do we need components for paragraphs and headings? Can't this just be normal text layers with a style?" So `Doc/Title`, `Doc/Heading`, `Doc/Body` and `Doc/Eyebrow` publish, and the only docs component is `Page header`; dividers and Contents rows are plain layers on the `doc` variables. Erlen set Default Styling as the team default (All files) and turned Erlen's Secret Files off.
- **Decided by:** Erlen
- **Replaces:** "Default Styling's text styles are private" (2026-10-25), for these four only.

## 2026-11-01: Guides and information pages are built as OS docs pages
- **Why:** Erlen asked for guides and info to be built "as if they were pages on the OS site". A guide drawn at the site's real measure (1080px frame, 780px article, 220px rail, from `docs-site.css`) and from the file's website components can move into By Default OS without a redesign. Only the content column: the site's sidebar and header belong to the site, not the page.
- **Decided by:** Erlen (asked 2026-11-01; picked the 1080 column only)
- **Replaces:** the section-and-columns layout for a Contents page in the entry below.

## 2026-11-01: Every page has an About this page note
- **Why:** nobody, person or agent, could tell what a page was for without reading all of it. A short section top left says what the page is for and how to use it, in the file's own body style. The Annotation kit has no paragraph part (its annotation box was deleted on 2026-10-25), and native annotations can't sit on a section.
- **Decided by:** Erlen (picked "About section, file styles")

## 2026-11-01: Every file has a Contents page, and it replaces Start here
- **Why:** the Website file had 49 pages and no way to see what was where or what was current. Contents is the file's table of contents, kept up to date after every piece of work. Start here and Contents did the same job; in the Website file the Start here instance had never been filled in and linked to another brand's files, the risk of a component nobody keeps up. Cover stays its own page: Figma zooms to fit the first page when a file opens, so a cover sharing a page shows up tiny. Erlen: "Contents is a better version of Start here."
- **Decided by:** Erlen
- **Replaces:** `Start here` as a fixed page (§3) and "Fill in Start here" (§2). The Default Styling Start here component is deprecated, not deleted, so existing instances keep working.

## 2026-11-01: One list of every Figma file, in the agency repo
- **What:** the Work archive (`bydefaultstudio/agency`, `internal/work-archive/archive.md`) is the one list of By Default's Figma files. Every session reads it before looking for a file and updates it when a file is made, renamed or archived. §1 and §2 say how.
- **Why:** Erlen wanted the list available to every session. It stays in the agency repo, not this plugin, so it updates the moment a pull request merges (no release needed) and client links stay out of a repo shared with freelancers. Only current files for now; older files stay out (agency decision 2026-10-25).

## 2026-10-29: A measure's frame is the measured distance; the value sits outside it
- **Why:** snapping the instance to a gap measures it, with no maths, the same as On line. The value hangs outside in a zero-size anchor 6px off the line (12px Large), aligned so a longer value grows away from the line, never over it. Erlen's design; tested on every placement with values from "24" to "754 × 1384".
- **Decided by:** Erlen
- **Replaces:** the auto layout build in the entry below, where the frame included the value.

## 2026-10-29: `measure` places its value Left, Right, Top or Bottom
- **Why:** `Beside` only put the value one way (after a horizontal line, under a vertical one), and its line was a fixed 16px, so resizing an instance changed nothing. Four placements let the value sit wherever there is space, and every one stretches its line when the instance is resized.
- **Decided by:** Erlen
- **Replaces:** `Value=Beside` (horizontal Beside is now Right, vertical Beside is now Bottom; existing instances keep their link).

## 2026-10-29: Annotation marks get a Size property, not a second kit
- **Why:** social templates are 1080 × 1920 and read zoomed out, so the guide-sized marks (11px value, 1px line) are too small. A `Size` variant (Default, Large) on the existing sets keeps one kit with the same Colour, Orientation and Value options, and one place to restyle. Scaling instances by hand had left the Instagram Reels template with measures at several different sizes. Variable modes were ruled out: they break "one collection, kept few" and hide the size from whoever opens the file. Large is 24px text (a new private `_Doc/Label large` style), 2px lines and 14px ticks.
- **Decided by:** Erlen

## 2026-10-26: Nested sections alternate light and dark
- **Why:** with four fills, a section inside a section needs a fill that reads against its parent at any depth. Alternating tone at each level (same strength: faded with faded, solid with solid) keeps every level distinct; a single fill or a faded-then-solid pair runs out after two levels.
- **Decided by:** Erlen
- **Replaces:** "A rule for several layers of nested sections is still to decide" in "Pick a section's fill to suit the components inside it".

## 2026-10-26: A client cover uses the file's own colour tokens and modes
- **Why:** a client cover should look like the client. Bind the cover's background and text to the file's native semantic variables (background primary, text primary, text secondary) and pick the mode (Light or Dark) on the cover instance, so it switches with the file's own light and dark modes. Default Styling's black is only the starting point.
- **Decided by:** Erlen

## 2026-10-26: The Cover has a Logo area slot for client logos
- **Why:** swapping a client logo into the Cover's fixed logo frame squashed it, and the size couldn't be overridden inside the instance. The `Logo` layout now has a Logo area slot that centres whatever goes in and keeps its proportions. Figma won't link a component property to a layer inside a slot, so the slot's logo no longer follows the old Logo swap.
- **Decided by:** Erlen
- **Replaces:** the Cover's Logo swap property for client logos in the `Logo` layout.

## 2026-10-26: Icons are not sets of one
- **Why:** an icon library made of single-variant sets is noise. Each icon is a plain component, named for the icon. Make a set only when an icon has real variants (weights or sizes), then all those variants live in it.
- **Decided by:** Erlen
- **Replaces:** icons under "Every component is built as a component set, even if it only ever has one variant".

## 2026-10-26: Pick a section's fill to suit the components inside it
- **Why:** Default Styling now has four section fills: `section/fill`, `section/fill-faded`, `section/fill-dark` and `section/fill-dark-faded` (Erlen renamed the tokens). Light components get `fill-dark-faded`, dark ones a light fill. A rule for several layers of nested sections is still to decide.
- **Decided by:** Erlen
- **Replaces:** section fill always white 95%, parents white 10% (`section/fill-parent`).

## 2026-10-25: One Annotation kit, colour picked for contrast, not meaning
- **Why:** the Docs kit and Spec kit did the same job (marks on or beside work) with overlapping parts, and the Spec kit's 11 Roles tied colour to meaning, which nobody could read without a key and which left black marks on black work. One kit; every mark has the same Colour property (Ink, White, Red, Blue, Pink, Green) chosen so it reads on what it sits on. Inside one diagram, keep one colour per kind of mark by habit, not by component.
- **Decided by:** Erlen
- **Replaces:** the Spec kit Role colours ("Spec kit colours are fixed values, except ink") and the separate Docs kit and Spec kit.

## 2026-10-25: The Docs kit annotation component is deleted
- **Why:** guides are written as articles now, so a box of paragraphs beside the work is redundant.
- **Decided by:** Erlen
- **Replaces:** "The annotation component stays for notes beside work in design files" in the article-guides rule.

## 2026-10-25: Web line heights are percentages, taken from what the CSS renders
- **Why:** the code's line heights are unitless ratios (1.4 means 1.4 times the font size), so a Figma percentage is the exact match and scales with the size; pixels freeze it. Read the value the CSS actually applies, including inheritance, not the docs: a plain `p` inherits 1.6 from `body`, so `Body/M` is 160%. Default Styling keeps pixel line heights, copying Figma's UI.
- **Decided by:** Erlen
- **Replaces:** Body/M at 140% (the Website text style rename earlier today).

## 2026-10-25: Website text styles follow the code; styles not in the code go to Legacy/
- **Why:** the code is the source of truth, so each style is named for what it is there: the element and the code's size (`Body/M`), a component and its variant (`UI/Button/Small`), or a role and its breakpoint (`Headline/Desktop`, because the code's role tokens change size by screen width). A style with no match in the code moves to `Legacy/` until it is deleted.
- **Decided by:** Erlen

## 2026-10-25: Product text styles are named Element / Size, weight only when not Regular
- **Why:** the Website's names mixed three schemes (code size letters, raw `--font-*` tokens, HTML element names), so "M" meant 16px in one style and 18px in another. One pattern: a folder per element (`Body/`, `Heading/`), the code's size letter, and the weight only when it isn't Regular (`Body/M`, `Body/M Semibold`, `Body/S Medium`). Slashes, not dots, so the picker shows folders.
- **Decided by:** Erlen

## 2026-10-25: Default Styling's text styles are private, named by use
- **Why:** published, they showed in every file's style picker beside the file's own styles, and the guide's text pulled them in. Prefixing with `_` keeps them in Default Styling for its components only. Named by job (`_Doc/Title`, `_Doc/Body`, `_Doc/Label`...), not as a type ramp. Guides and loose text use the styles of the file they sit in.
- **Decided by:** Erlen
- **Replaces:** the Figma UI3 ramp names (heading/..., body/..., doc/...) in "Default Styling uses Figma's own type ramp" and "Figma's two confusing headings renamed by job"; the sizes stay.

## 2026-10-25: Foundations holds font families only
- **Why:** Foundations feeds every By Default file (Website, Presentation, social and others), so a typeface change should happen once there. Sizes, weights, line heights, letter spacing and width belong to each file's own type system (Website mirrors the code; Default Styling copies Figma's UI), so the four collections for them were deleted. Website's local font copy was removed so it reads the families from Foundations.
- **Decided by:** Erlen

## 2026-10-25: Only update the pages in use
- **Why:** files carry old work (archives, earlier site versions, experiments) that may never be needed. File-wide changes touch only the pages being worked on; old pages are updated when they come back into use.
- **Decided by:** Erlen

## 2026-10-25: Article guides use paragraphs and tables, not annotation boxes
- **Why:** in an article-style guide the annotation component is a box of paragraphs inside a page of paragraphs. Write What it is and Build notes as normal blocks (eyebrow, heading, paragraphs). Anything that maps one thing to another, like a component's properties to its code, goes in a table on a grey card (columns In Figma, In code, Options). The annotation component stays for notes beside work in design files.
- **Decided by:** Erlen

## 2026-10-25: A callout's dot sits beside its target, never on it
- **Why:** a dot or line on top of a button hides what it points at. Put the dot about 8px clear of the target, and route the line through empty space; shorten the callout if its number would land on other content. Callout lines now stretch, so any callout can be resized to length.
- **Decided by:** Erlen

## 2026-10-25: Figma's two confusing headings renamed by job
- **Why:** in Figma's ramp heading.small (13px) is bigger than heading.medium (11px), because Figma names them by role. Renamed `heading/heading.medium` to `heading/heading.panel` (11/25, panel section headers) and `heading/heading.small` to `heading/heading.dialog` (13/22, dialog and card titles). Sizes unchanged; descriptions note Figma's names.
- **Decided by:** Erlen
- **Replaces:** the heading names in the ramp entry below

## 2026-10-25: An eyebrow style for small capitals labels
- **Why:** Figma's ramp has no eyebrow, and labels like START HERE, STEP 2, LIGHT MODE and the status pills need one. `body/eyebrow`: Inter Semi Bold 11/16, letter spacing 6%, text case set to capitals by the style (so it can be typed in any case), cap-height trim. Applied to Section Status, Start here, context, token-header, the annotation label and the guide's step labels. Numbers and measurements keep `body/body.medium.strong`.
- **Decided by:** Erlen

## 2026-10-25: Default Styling uses Figma's own type ramp, pixel line heights
- **Why:** Erlen wants the furniture to feel native to Figma, so Default Styling now copies Figma UI3's ramp exactly, in Inter (Figma's Whyte isn't available), with **pixel line heights, not percentages**, and cap-height trim kept. The eight old styles were converted in place so every linked layer and instance follows: Display to `heading/display` 48/56, Title Large to `heading/heading.large` 24/32, Title to `doc/heading` 18/32, Body to `doc/description` 13/22, Text to `body/body.large` 13/22, Meta to `body/body.medium` 11/16, Label to `body/body.medium.strong` 11/16. Added: `heading/heading.medium` 11/25, `heading/heading.small` 13/22, `body/body.large.strong` 13/22, `body/body.small` 9/14, `body/body.small.strong` 9/14. `Code` stays (IBM Plex Mono 12, now 16px line height) because the token rows need a mono face.
- **Decided by:** Erlen
- **Replaces:** the 8 text styles at 6 sizes in `/bd:figma` §1, and percentage line heights

## 2026-10-25: Guides read like an article
- **Why:** a step-by-step guide is one section, laid out vertically like an article: a step label, a heading and the explanation, then the diagram (the Figma UI) underneath, step after step. Splitting every step into its own section was confusing to read. This is an exception to the column layout in `/bd:figma` §4, for guides only.
- **Decided by:** Erlen

## 2026-10-25: File furniture should feel native to Figma
- **Why:** Erlen reviewed Figma's own UI3 kit (https://www.figma.com/design/mbeVd1bGw4a0SCAS5LrCUq/UI3--Figma-s-UI-Kit--Community-) and wants Default Styling's furniture to look like Figma's: Inter as `font/primary`, and annotations, comments and measurements styled like Figma's. Looking native is the aim, not a risk. Inter is one variable change (`font/primary`), but it re-sets every text style, so check Section Title widths and the cover after the switch.
- **Decided by:** Erlen
- **Replaces:** Zalando Sans as `font/primary` (the furniture type in `/bd:figma` §6)

## 2026-10-25: Small measurements put the value beside the line
- **Why:** when a measurement is too short to hold its label, the value sits next to the line, not on top of it (as the UI3 kit's redlines do, a bar plus a label beside it). Applies to the Spec kit's measure component.
- **Decided by:** Erlen

## 2026-10-25: Comment cards and tooltips for notes beside work
- **Why:** the UI3 kit's comment cards (avatar, number, author, text, replies, resolved state) and tooltips read well next to a component. Use comment-style cards to explain client work beside components, and tooltips to label parts of a component guide. To be built into the Docs kit in Default Styling.
- **Decided by:** Erlen

## 2026-10-25: Spec kit colours are fixed values, except ink
- **Why:** Default Styling keeps its 13 variables (decision of 2026-10-24 in `/bd:figma`). The Spec kit's ten role colours and their 12% washes are now fixed colours, as the status colours are. Ink was exactly `colour/black` (#1f1f1f), so it binds to `colour/black`, and its 12% wash merges into `colour/black-10`, as the Docs kit washes did. The section's white 95% is `section/fill`.
- **Decided by:** kobbie (following Erlen's "12 variables, no more")

## 2026-10-24: A project file has one page per design request; rounds and options are sections
- **Why:** Erlen organises client files this way (for example, Black Doctor): the file is the project, each page is a design request, and the artwork is organised into sections by round, deliverable or option.
- **Decided by:** Erlen

## 2026-10-24: Page names: sentence case, status emoji at the start when it helps, plain `---` dividers
- **Why:** in a long page list, a rare emoji is a pattern interrupt. Three only: ✅ latest or approved, 🟡 in progress or in review, 🔴 problem or blocked. Dividers stay a plain `---`.
- **Decided by:** Erlen

## 2026-10-24: Layer naming rules
- **Why:** AI tools over-name layers. Rules: sentence case; sections in plain words (`Round 1`, `Option A`); top-level frames are the thing only (`Homepage`), with the shortest suffix when there are two (`Homepage v2`, `option 2`, `mobile`); mockups are the thing plus `mockup`; every frame and group is named; images are named simply (`Image`, `Photo`, `Logo`); text layers and component instances are never renamed (instances keep their names so they can be searched and updated); shapes and vectors keep Figma's names.
- **Decided by:** Erlen
- **Replaces:** "No versions in frame names" (a short `v2` suffix is now allowed to tell two of the same thing apart) and "never leave Figma's defaults" for shapes.

## 2026-10-24: Add `section/radius-full` for pills
- **Why:** Erlen added it (999) for anything that needs a pill shape: status labels, callout labels, measurement values. Bound to the 10 status pills, number badges, token-row pills, the callout text labels and the state label (the last two were square before). The Spec kit's measure values get it when that kit moves in. Two radii in total: 16 for sections, full for pills.
- **Decided by:** Erlen

## 2026-10-24: One variable collection, `Default Styling`
- **Why:** Erlen: "We don't need two collections ... Let's have our own collection. Remember, this is our template." The 12 variables now live in one collection named after the library: `colour/...` (black, white, three tints), `font/primary`, `section/...` (fill, fill-parent, radius), `component/...` (border, fill-dark, spacing).
- **Decided by:** Erlen
- **Replaces:** the `Figma` and `Template` collections and their `figma/` and `template/` prefixes in "Default Styling keeps 12 variables, no more" below.

## 2026-10-24: Default Styling has 8 text styles at 6 sizes
- **Why:** Erlen chose fewer sizes. Display 120, Title Large 60, Title 36, Body 24, Meta 14, Text 14, Label 12, Code 12. Merged: Display 86 into Display 120 (both cover layouts), Eyebrow, Docs Label and Marker into Label, Docs Text Large into Body, Docs Text Medium into Text, Code and Key into Code. Only Regular and Medium weights are needed now.
- **Decided by:** Erlen

## 2026-10-24: Default Styling keeps 12 variables, no more
- **Why:** Erlen: "we are not building a complete library ... make it easy to change very few things." Template: black, white, three tints (black-10, black-60, white-15), font. Figma: section, section-parent, section-radius, component-border, component-dark, component-spacing (padding and gap merged, both 20). Spacing, radius, type sizes, status colours, accent, link, danger, grey and the mono font are now fixed values. Small visual merges: Docs kit borders and washes to 10%, faded text to 60%, secondary body text to solid black.
- **Decided by:** Erlen
- **Replaces:** the 43-variable Template collection in "Default Styling is self-contained and themeable" below, and `figma/page`, `figma/component-padding`, `figma/component-gap`.

## 2026-10-24: Default Styling is self-contained and themeable
- **Why:** Erlen wants anyone to rebrand the template by changing a few values. All colours, fonts, spacing, radius and text styles are now local. Two collections: `Figma` (`figma/...`, canvas working colours) and `Template` (`template/...`, the brand layer: colours, tints, status, fonts, sizes). Names are prefixed so they don't clash with a project's own tokens. The logo is a local `Logo` component with a swap property on the Cover. Icons and the Docs kit slot and divider are still instances from other libraries, recoloured with local variables.
- **Decided by:** Erlen (naming: Kobbie's proposal)
- **Replaces:** "Default Styling can stay By Default branded" for where the values live: still branded, but no longer borrowed from Foundations or Website. Also renames `page/background`, `section/fill`, `section/fill-parent`, `section/radius`, `component/border`, `component/fill-dark`, `component/padding`, `component/gap` to `figma/...`.

## 2026-10-24: Faded colours are their own tint variables
- **Why:** Figma ignores a fill's opacity once a colour variable is bound, so "black at 10%" can't come from the black variable. Tints (`template/tint/black-10` and so on) hold the faded versions. Found the hard way: the first re-link made every faded fill solid, then each was restored from its layer name and role.
- **Decided by:** kobbie

## 2026-10-24: Default Styling's annotation kits come from the By Default Website file only
- **Why:** the Black Doctor file is a client project, so we don't take from it or change it. Its Docs kit was pasted into Default Styling by accident and Erlen is undoing that. The Website file's Docs kit and Spec kit are ours and were built the same way.
- **Decided by:** Erlen

## 2026-10-24: Annotate with Docs kit components on the canvas by default
- **Why:** Erlen tried native annotations on the Experiments page. Their cards stay the same size at every zoom, so on a busy page they cover the artwork. Canvas components sit in the layout and scale with it. Native annotations stay for a few specific uses, still to be decided. Many people opening the files aren't developers or confident Figma users.
- **Decided by:** Erlen
- **Replaces:** "Build notes use Figma's native annotations..." below, for build notes.

## 2026-10-24: Lay sections out in columns, not one tall stack
- **Why:** pages built in one column get very tall and hard to scan. Read down a column, then across; keep the page wider than it is tall; top-align columns.
- **Decided by:** Erlen

## 2026-10-24: 200px between sections, equal everywhere
- **Why:** even spacing makes a page look organised. Minimum 200px, one gap per page, at every level. Padding inside a section is 100px (Kobbie's call, matching the Mockups file).
- **Decided by:** Erlen

## 2026-10-24: The section's own name is the main label; Section Title goes inside
- **Why:** Figma draws section names at the same size at every zoom, so they stay readable zoomed out. Section Title goes inside the section, top left, never above it. One per top-level section (`Large=True`); child sections only if they need a status.
- **Decided by:** Erlen (how often: Kobbie's proposal, to confirm)
- **Replaces:** "Parent sections are white 10%..." for the header part only (it said children get `Large=False` titles; now they usually get none). Also replaces the page-level title above the sections.

## 2026-10-24: Build notes use Figma's native annotations; documentation follows the Website button guide
- **Why:** native annotations take Figma's styling, attach to layers and show in Dev Mode. For explaining work on the canvas, the Website file's button guide is the reference: plain-English headings, a 320px note column, labelled example cards and the Docs kit markers. Four native categories in every file: Development, Interaction, Accessibility, Content.
- **Decided by:** Erlen

## 2026-10-24: Light component sets get a black 70% fill
- **Why:** light variants disappear on a 95% white section. Variable `component/fill-dark`, first used on Section Status (it had an unbound black 30% before).
- **Decided by:** Erlen

## 2026-10-24: Section fill is white at 95%
- **Why:** Erlen changed `section/fill` in Default Styling from 80% to 95%. Sections read as solid panels against the #666666 page.
- **Decided by:** Erlen
- **Replaces:** "Section fill is white at 80%, bound to `white/white-alpha-80`" below. Sections now bind to `section/fill` in Default Styling, not the Foundations variable.

## 2026-10-24: Parent sections are white 10%, the sections inside stay white 80%
- **Why:** Erlen's preference, so a group of sections reads as one block without competing with its children. Variable `section/fill-parent`. Parent header `Large=True`, children `Large=False` (Kobbie's call, to confirm).
- **Decided by:** Erlen

## 2026-10-24: Page backgrounds are raw hex
- **Why:** Erlen confirmed Figma pages can't take variables. Type `#666666` in by hand.
- **Decided by:** Erlen

## 2026-10-24: Every component is a component set, even with one variant
- **Why:** a lone main component copied into another file can paste as a second main component. Copying from a set pastes an instance, so the main component stays in its own file.
- **Decided by:** Erlen

## 2026-10-24: Component sets use auto layout, 20px padding, 20px gap and the dashed border
- **Why:** Erlen's standard for every set, horizontal, vertical or wrapped. Bound to `component/padding`, `component/gap` and `component/border` in Default Styling.
- **Decided by:** Erlen

## 2026-10-24: Variants hug or are fixed, never Fill
- **Why:** Figma tends to set children to Fill inside auto layout, which stretches components to their container. A component's size belongs to the component.
- **Decided by:** Erlen

## 2026-10-24: Frames holding trimmed text don't clip content
- **Why:** cap-height trim leaves descenders outside the text box, and clipping cuts them off. Found while building the Default Styling examples.
- **Decided by:** kobbie

## 2026-10-24: Cover and Start here move into Default Styling
- **Why:** every file's furniture in one library. They lived in "Erlen's Secret Files"; the logo stays there.
- **Decided by:** Erlen

## 2026-10-24: Status pill gets project values alongside the design-system ones
- **Why:** project files need Draft, In progress, In review, Approved and Handed off. Keeping Engine, Part, Legacy, Docs site and Deprecated means headers already in Foundations and Website don't break. One component, ten values.
- **Decided by:** Erlen

## 2026-10-24: Furniture has its own text styles in Default Styling
- **Why:** Section Title used the deck styles (`Deck/Heading/Title S` and `M`), so a deck change would have moved every header. Four styles (`Title Large`, `Title`, `Meta`, `Label`) copy the old values exactly, with cap-height trim.
- **Decided by:** kobbie

## 2026-10-24: Default Styling can stay By Default branded
- **Why:** Erlen: "I don't mind things staying branded as By Default because that is my agency." Section Title and Status keep using Foundations colours and spacing; a file using them doesn't need Foundations switched on. Only the four furniture variables are Default Styling's own.
- **Decided by:** Erlen
- **Replaces:** "Default Styling holds its own values, not aliases of Foundations" below, for components. The furniture variables keep their own values.

## 2026-10-24: Default Styling holds its own values, not aliases of Foundations
- **Why:** it goes into every file, including client files with their own brand. Aliasing to Foundations would tie every client file to By Default's brand library. Section Title and Status get re-bound to Default Styling variables once they move in.
- **Decided by:** kobbie (to confirm with Erlen)

## 2026-10-24: The defaults library is the "Default Styling" file
- **Why:** Erlen made it (`FbcjQSYBBQnVGJaDNyODQZ`). It replaces the working name "By Default | Defaults". Variables: `page/background`, `section/fill`, `section/radius`, `component/border`, in one collection called `defaults`.
- **Decided by:** Erlen
- **Replaces:** the name in "A separate Defaults library for file furniture" below

## 2026-10-24: Figma rules live in the agency `figma` skill for now
- **Why:** Kobbie can learn and update them straight away. They move to the `bd` plugin once settled, so every studio repo gets them.
- **Decided by:** Erlen

## 2026-10-24: A separate Defaults library for file furniture
- **Why:** page and section colours, the component border colour, Section Title, Status, Cover and Start here are needed in every file, including client files with their own brand. Keeping them out of Foundations means a client file doesn't have to enable By Default's brand to get section headers.
- **Decided by:** Erlen

## 2026-10-24: Section fill is white at 80%, bound to `white/white-alpha-80`
- **Why:** the brief said 85%, but Foundations already has an 80% variable. One bound value can't drift.
- **Decided by:** Erlen

## 2026-10-24: Sections have a 16px corner radius
- **Why:** Erlen's preference, and what the Mockups file already does.
- **Decided by:** Erlen

## 2026-10-24: Page background is `#666666`
- **Why:** Erlen's preference. Sections and components read clearly against it.
- **Decided by:** Erlen

## 2026-10-24: Components keep the dashed `#9747FF` border
- **Why:** Erlen's preference: components and component sets are obvious at a glance.
- **Decided by:** Erlen

## 2026-10-24: Text layers use vertical trim, cap height to baseline
- **Why:** spacing in auto layout between text and other objects is exact.
- **Decided by:** Erlen

## 2026-10-24: Short, obvious frame names
- **Why:** Erlen's preference. Long names and Figma's defaults make files hard to scan.
- **Decided by:** Erlen

## 2026-10-24: Every new file starts from the Project Template and goes in the right folder
- **Why:** consistent covers, pages and libraries, and files that can be found.
- **Decided by:** Erlen

## 2026-10-24: Use the By Default Foundations unless a project needs its own variables
- **Why:** one source of tokens. Brand new identity projects build their own.
- **Decided by:** Erlen

## 2026-10-24: Present work with the Mockups library and keep it up to date
- **Why:** one set of device and platform mockups across every project.
- **Decided by:** Erlen
