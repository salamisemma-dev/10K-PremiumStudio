# Ideas — DOX contract

## Purpose

- Own the **speculative website-idea backlog**: concepts you invented that are not yet a
  client and not a study of an existing external site. A safe place to park ideas inside
  the rail without polluting `projects/` or `design-intelligence/references/`.

## What belongs here (and what does not)

- **Here:** a website concept you dreamed up — "wouldn't it be strong to build X". One
  light markdown file per idea. Not a client, not a delivered site, not a study.
- **Not here — client work:** the moment there is a real client and the six fields, promote
  the idea to `projects/<client>/` (full dossier + delivery gate).
- **Not here — reference studies:** a study of a real external site/brand/campaign goes to
  `design-intelligence/references/<name>-reference/`, never here. Files named `*-reference.md`
  are rejected by the gate.

## Local Contracts

- One idea = one file `ideas/<slug>.md`, shaped like `ideas/_template.md`.
- Every idea carries a `## Status` (`spark` · `exploring` · `promote` · `parked`), a
  `## One-liner`, and the **idea-only guard** ("idea-only; geen klant, geen levering").
- An idea may not carry delivery evidence (Site URL, Lighthouse result). If it does, it is a
  build and belongs in `projects/<client>/`.
- Ideas are candidates, never law. The scene-first invariant (§5) still wins when an idea
  becomes a build.

## Work Guidance

- Keep ideas cheap: a one-liner, why it could work, an optional scene seed and narrative
  form, open questions. Do not over-engineer a concept that has no client.
- When an idea graduates, copy the useful parts into `projects/<client>/brief.md` and set the
  idea `## Status` to `promote`. Do not delete history; parked/promoted ideas stay for record.

## Verification

- `node checks/ideas-review.mjs` (`npm run check:ideas`).
- `node tests/ideas-backlog.test.mjs` (`npm run test:ideas`).
- `node scripts/bob_validate.mjs --strict .` (spec gate).

## Child DOX Index

- `README.md` — what the backlog is and how to add an idea.
- `_template.md` — the required idea shape.
- `<slug>.md` — one speculative idea each (e.g. `example-quiet-luxury-microsite.md`).
