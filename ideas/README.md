# Ideas — speculative website backlog

A gated home for website concepts you invented that are **not yet a client** and **not a
study of an existing site**. Park them here freely, inside the rail, without polluting
`projects/` (client builds) or `design-intelligence/references/` (studies).

## Add an idea

1. Copy `_template.md` to `ideas/<slug>.md` (e.g. `ideas/quiet-luxury-microsite.md`).
2. Fill `## Status`, `## One-liner`, and keep the idea-only guard line.
3. Add whatever is cheap and useful: why it could work, a scene seed, a likely narrative
   form (see `templates/selection-guide.md`), open questions.
4. `npm run check:ideas` keeps the backlog well formed.

## The three doors (pick by type)

| Type | Home | Gate |
|------|------|------|
| A concept you invented (no client yet) | `ideas/<slug>.md` | `check:ideas` |
| A real client you will build | `projects/<client>/` | six-field gate → `apps/` → delivery |
| A study of an existing external site | `design-intelligence/references/<name>-reference/` | `check:learning` (reference-only) |

## Promotion

When a real client appears, promote: copy the useful parts into
`projects/<client>/brief.md`, set the idea `## Status` to `promote`. The scene still wins
(§5); the idea's guesses never override the client scene.
