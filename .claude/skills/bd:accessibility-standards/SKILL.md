---
name: accessibility-standards
description: "Use on every piece of digital work before it goes to Erlen: contrast, targets, focus, keyboard, forms, motion and media. Targets WCAG 2.2 AA as the minimum, with stricter house rules."
---

# Accessibility

**Minimum standard: WCAG 2.2 AA.** House rules go further where noted. Accessibility is part of "done", not a later phase.

## Contrast

| What | Minimum |
|---|---|
| Body text | 4.5:1 |
| Large text (24px+, or 18.66px+ bold) | 3:1 |
| UI components, icons, focus rings, chart lines | 3:1 against what's next to them |
| AAA body text (aim for long reading) | 7:1 |

- Measure, don't eyeball. Report each failing pair with its actual ratio. Some published "safe" greys are wrong: for example #9CA3AF on white is about 2.5:1 and fails even for large text.
- Check muted text, placeholders (40% opacity usually fails), disabled text, dark mode, and text over images.
- Colour is never the only signal (add text, shape, icon or underline).
- Check for colour-blindness (red-green especially) and forced colours / high contrast mode.

## Targets and pointer

- WCAG 2.2 AA minimum: 24×24px. **House rule: 44×44px** for anything touch, with at least 8px between targets.
- Extend small controls' hit area with padding or a pseudo-element.
- Every drag or gesture has a simple click or tap alternative.

## Keyboard and focus

- Everything works by keyboard, in a logical order that follows the visual order. No keyboard traps.
- Visible focus on everything: 2px outline, 2px offset, at least 3:1 contrast. Use `:focus-visible`. Never remove an outline without a replacement.
- Sticky headers, cookie banners and chat widgets must not cover the focused element (WCAG 2.2).
- Skip link to main content. Move focus to the main content after a page change in a web app.
- Modals trap focus, close on Escape, and return focus to the button that opened them.

## Structure

- Real headings in order (one h1). Real buttons for actions and links for navigation.
- Alt text that says what the image means. Decorative images `alt=""`, decorative icons `aria-hidden="true"`. Icon-only buttons get a label.
- Status messages and toasts use `aria-live="polite"`.

## Forms

- Persistent visible labels. Errors linked to fields (`aria-describedby`, `aria-invalid`) and a focusable error summary.
- Allow paste and password managers. Don't make people re-enter information they already gave (WCAG 2.2).
- Help in a consistent place across pages.

## Layout

- Works at 320px wide with no sideways scrolling, at 200% and 400% zoom, and with user text-spacing overrides.
- Works in both orientations.

## Motion and media

- Respect `prefers-reduced-motion` (see `/bd:motion`): fewer, gentler animations, not a broken page.
- Anything that moves or autoplays for more than 5 seconds gets pause or stop.
- No more than 3 flashes per second. No full-screen moving backgrounds or slow pulsing loops for people with vestibular sensitivity.
- Captions on video, transcripts for audio.

## Testing

1. **Automated** (axe, Lighthouse, WAVE). Catches only around a third of issues.
2. **Manual:** keyboard only, screen reader (VoiceOver and NVDA), 200% zoom, high contrast, reduced motion.
3. **Real assistive technology users** for important launches.

Write issues as: description, location, WCAG criterion, severity (critical, major, minor), impact, fix.

> UK note: public sector sites must meet the Public Sector Bodies Accessibility Regulations, and the European Accessibility Act applies to many products sold into the EU from June 2025. Flag to Erlen if a client may be in scope.

Sources: wondelai ux-heuristics WCAG checklist, nextlevelbuilder quick-reference, Owl-Listener/designer-skills accessibility test plan, vercel-labs/web-interface-guidelines (all MIT). Contrast figures re-checked by calculation.
