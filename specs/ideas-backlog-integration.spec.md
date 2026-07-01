---
id: ideas-backlog-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [reference-dossier-separation]
consumed_by: [premium-website-builder-skill]
---

## Intent

Give speculative website ideas — concepts with no client and no studied external source — a
gated home (`ideas/`) so the studio can collect them inside the rail without making
`projects/` look like unfinished client delivery or `design-intelligence/references/` look
like a study of a real site. Ideas are candidates, never law; the scene-first invariant
still wins when an idea becomes a build.

## Contract

1. `ideas/` owns the speculative backlog: `AGENTS.md`, `README.md`, `_template.md`, and one
   light markdown file per idea (`ideas/<slug>.md`).
2. Every idea carries `## Status` (`spark` · `exploring` · `promote` · `parked`), a
   `## One-liner`, and the idea-only guard ("idea-only; geen klant, geen levering").
3. An idea may not carry delivery evidence (Site URL, Lighthouse result). If it does it is a
   build and belongs in `projects/<client>/`. An idea file named `*-reference.md` is rejected;
   studies of real external sites live in `design-intelligence/references/`.
4. The backlog may be empty (only `_template.md`); the gate still passes.
5. Ideas are not client deliverables and not reference studies. Promotion copies the useful
   parts into `projects/<client>/brief.md` and sets the idea status to `promote`.

## Business rules

- The three doors are exclusive: invented concept → `ideas/`; real client → `projects/`;
  studied external site → `design-intelligence/references/`.
- An idea's scene seed or narrative-form guess never overrides the client scene once built
  (constitution §5).

## Downstream impact

- `package.json`: `test:ideas` (in the `test` chain) and `check:ideas` (in the `check` chain).
- `scripts/bob_validate.mjs`: `test:ideas` + `check:ideas` are required scripts and chain members.
- DOX: `ideas/AGENTS.md`, root `AGENTS.md` Child DOX Index, and constitution §3 ownership.

## Verification

- `tests/ideas-backlog.test.mjs` — asserts the `ideas/` structure, the template shape, the
  checker's boundary guards (reject `*-reference.md` and delivery evidence, enforce statuses),
  the boundary docs, and the `package.json` wiring. Run: `node tests/ideas-backlog.test.mjs`.
- `checks/ideas-review.mjs` — the live backlog gate (`npm run check:ideas`).
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
