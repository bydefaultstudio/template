---
name: motion
description: "Use for any animation, transition, interaction or motion spec, from button presses to page loads, scroll sequences and campaign moments. Two modes: product UI and brand/campaign."
---

# Motion

## Should this move at all?

1. **Name the purpose** or cut it: feedback, showing where something came from, showing a change of state, softening a jarring change, explaining, or delight.
2. **Check how often people see it:**
   - Hundreds of times a day (shortcuts, menus opened by keyboard): no animation.
   - Tens of times a day: none or barely noticeable.
   - Occasionally (modals, drawers, toasts): standard.
   - Rarely (onboarding, success, launches, campaign moments): this is where delight goes.
3. One orchestrated moment beats scattered effects. Build it static first; motion is the last layer.

**The biggest tell:** every section fading up on scroll. Don't.

## Two modes

### Product UI (apps, tools, dashboards, forms)

| Interaction | Duration |
|---|---|
| Press feedback | 100 to 160ms |
| Tooltip | 125 to 200ms |
| Dropdown, popover | 150 to 250ms |
| Modal, drawer | 200 to 350ms |

Keep product UI under 300ms where possible.

### Brand and campaign (sites, launches, interactive advertising)

| Moment | Duration |
|---|---|
| Hover colour | 180 to 200ms |
| Hover with movement | 300 to 400ms |
| Content reveals | 600 to 900ms |
| Image or hero openings | 1,000 to 1,300ms |

Justify anything over 1.2s. The page should be settled and usable within 1.2s of load. No preloaders.

**Page-load choreography (brand):** structure 0 to 200ms, headline lines 200 to 600ms, supporting copy 400 to 800ms, nav 600 to 900ms, the rest by 1,200ms. Nothing above the fold waits for a scroll.

## Easing (house curves)

| Token | Curve | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Things entering, most UI |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Long brand reveals (800ms+) |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Things moving on screen, wipes |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Drawers and sheets |
| `ease` | browser default | Colour changes only |
| `linear` | | Progress, marquees, scroll-linked motion |

- Never ease-in on interface elements, except very short exits.
- No bounce or overshoot unless the brand is genuinely playful and Erlen agrees.
- Exits run at 60 to 70% of the entrance duration.

## Choreography

- Stagger: 30 to 50ms for UI lists, 50 to 90ms for items, 80 to 110ms for lines of text, 20 to 40ms per character only for 1 to 3 word headlines. Four steps at most.
- Lead with the most important element.
- Text lines rise individually, they don't fade in as one block.
- Reveals fire once, when the element is 85 to 90% down the viewport, rising 12 to 32px.
- Same group, same duration and easing.
- Mirror directions: in from the right, out to the left.

## Physical feel

- Never scale from 0. Start at 0.95 to 0.97 with opacity 0.
- Press feedback: `scale(0.97)`, never below 0.95.
- Popovers grow from their trigger (`transform-origin`). Modals stay centred.
- Springs: critically damped by default (no bounce). A little bounce only after a flick or throw.
- Everything is interruptible. Never block input during an animation. Celebrations can be skipped.
- Slow where the user decides (hold to delete), fast where the system responds.

## Performance

- Animate only `transform`, `opacity` and `clip-path`. Never `transition: all`.
- Use `scale()` instead of width and height, `translate()` instead of top and left.
- Add `will-change` only to fix a visible problem.
- Test on a mid-range phone. Smooth matters more than impressive.
- Parallax: decorative layers only, small movement, never on text.

## Reduced motion: gentler, not broken

Under `prefers-reduced-motion: reduce`:

- Keep opacity and colour changes. Remove travel, scale, parallax and autoplay.
- Keep essential indicators (progress, spinners).
- Hide-then-reveal styles only apply under `prefers-reduced-motion: no-preference`, so the reduced page is the finished page.
- Check the setting in JavaScript before starting smooth-scroll or GSAP.
- Loops pause when off-screen and stop under reduce.

## Spec format (for handoff)

Trigger, rules, feedback (visual, sound, haptic), duration and easing token, loops, reduced-motion version, what must not animate.

## Craft tips

- `clip-path: inset()` for reveals and wipes.
- A 2px blur can hide a muddy crossfade.
- Review animations at 2 to 5 times slower, and again the next day.

Sources: emilkowalski/skill (STANDARDS, animation-performance, apple-design), Owl-Listener/designer-skills motion-system, Leonxlnx/taste-skill motion, wondelai top-design and microinteractions, Dammyjay93/interface-design (all MIT).
