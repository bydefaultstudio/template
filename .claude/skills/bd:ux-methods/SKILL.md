---
name: ux-methods
description: "Use for UX audits, usability reviews, user journeys, research planning, interviews, concept testing and feedback or loading behaviour. Includes the heuristic audit method and severity scale."
---

# UX

## Heuristic audit

1. **Walk through cold**, first as a new user, then as an expert, then task by task. Record each task as: step, expected, actual, severity.
2. **Check Nielsen's 10 heuristics:** visibility of status, match with the real world, user control and freedom, consistency, error prevention, recognition over recall, flexibility, minimalist design, error recovery, help.
3. **Krug's trunk test** on key pages. Can a stranger tell: what site is this, what page, what are the main sections, what can I do here, where am I, where's search?
4. **Five-second test:** from the first screen, can someone say what this is and what to do?
5. **Write it up:** counts per severity, the top severity 3 and 4 issues, a quick-wins table, fixes grouped by severity.

### Severity scale (0 to 4)

| Score | Meaning | Action |
|---|---|---|
| 0 | Not a problem | None |
| 1 | Cosmetic | Fix if time allows |
| 2 | Minor, slows people down | Schedule it |
| 3 | Major, people fail the task | Fix soon |
| 4 | Catastrophic, blocks the task | Fix now |

Weigh by how often it happens, how bad it is, and whether people can work around it.

## Rules of thumb

- Clear labels beat clever ones.
- Confidence at each click matters more than the number of clicks.
- Cut half the words, then half again.
- Undo beats confirmation dialogs.
- Progressive disclosure hides secondary things, never primary actions.
- Never put critical information behind hover only.
- Every view answers: where am I, where can I go, how do I get out?

## Response times

| Wait | What the user should see |
|---|---|
| Under 100ms | Instant response to the press, no indicator |
| 100ms to 1s | Subtle indicator or skeleton |
| 1 to 10s | Clear state, progress if possible |
| Over 10s | Progress, time estimate, option to carry on elsewhere |

- Don't flash a spinner for actions under about 400ms.
- Skeletons for layouts you already know.
- Toasts: 3 to 5 seconds, never steal focus, errors stay until dismissed.

## Concepts

- Concepts must differ in behaviour (sequence, entry point, what the user does, when they commit), not just visuals. Same steps with different styling is one concept.
- Show concepts at the same fidelity.
- Write down the question the set of concepts answers before making them.
- **Choosing:** fix the criteria first. Each one must be able to fail a concept ("done in 3 steps or fewer", not "better UX"). Mark each as must-have or trade-off. Don't graft bits of losing concepts onto the winner. Record why each one lost.

## Research

- **Interviews:** talk about their life, ask about specific past events, let them talk 80% of the time. Compliments, opinions about the future and feature requests are weak evidence.
- **Plan:** intro 2 to 3 min, warm-up 3 to 5, core 20 to 30, scenarios 10 to 15, wrap-up 3 to 5. Rewrite any leading or yes/no question.
- **Jobs to be done:** "When [situation], I want to [progress], so I can [outcome]." Never name the product in it. Cover functional, emotional and social sides.
- **Four forces:** push of the current situation, pull of the new one, versus anxiety and habit. Reducing anxiety often works better than adding more pull.
- **Hypothesis format:** "We believe [outcome] will happen if [audience] can [action] with [feature]." Set success criteria before testing. Use the lowest fidelity that answers the question.
- **Testing:** 5 users per round finds most big problems. Book 6 to cover a no-show.

## Dark patterns

Never design confirmshaming, hidden costs, forced continuity, roach motels, disguised ads or pre-ticked consent. Flag them if a brief asks for them.

Sources: wondelai ux-heuristics, mom-test, jobs-to-be-done, continuous-discovery, lean-ux; Owl-Listener/designer-skills parallel-concepts, concept-selection, doherty-threshold, loading-states (all MIT).
