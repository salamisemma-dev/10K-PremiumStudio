---
id: ux-principles-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [impeccable-craft-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Adopt the concrete, applicable UX principles distilled from uxhints.com (UX laws,
accessibility, typography, design process, storytelling) as additive 10K law and
enforce the testable subset, without breaking the existing rail or contradicting the
adopted craft bans. Permanent record of what was taken and what was deliberately left.

## Contract

1. `blueprints/06-ux-principles.md` owns the UX laws (Hick, Jakob, Miller, Fitts,
   aesthetic-usability, peak-end, confirmation bias, nudge), a11y requirements,
   typography, and the design-process/self-check. It reinforces — never loosens —
   `03-design-laws.md` and `05-craft-and-bans.md`.
2. `prompts/03-storytelling.md` owns the 4-act narrative, mapped 1:1 to the
   Micro-Narrative roles in `03` and obeying `prompts/02-copywriting.md`.
3. `design-intelligence/external-tools.md` catalogues khroma / use.ai / uizard as
   optional aids with their conflicts marked; none is wired into the pipeline.
4. The testable subset is enforced by `checks/ux-lint.mjs` (`npm run check:ux`, in
   `npm run check`): visible focus state, ≤ 2 web font families, readable body leading.
5. Additive only: no existing file renamed or removed; `check:structure` still lists
   `blueprints/03-design-laws.md`. The template gains a `:focus-visible` style (a real
   a11y fix), nothing is broken.

## Business rules

- Left on the table (contradiction): the source's "wide tracking on headings" guidance
  conflicts with the adopted impeccable bans `wide-tracking` /
  `extreme-negative-tracking` and the display letter-spacing floor in `05`. Not adopted;
  headline tracking stays near-normal.
- Left unwired (contradiction/scope): khroma trains palettes on personal taste vs 10K
  scene-first; uizard produces generic mockups that are the slop `05` bans. Referenced
  with caveats, never used to decide color or layout.
- The user's proposed file tree (which renamed `03` and dropped `design-intelligence/`,
  `04`, `05`, `checks/`) was not followed literally; its content was integrated
  additively to keep the gate and prior work intact.

## Downstream impact

- `package.json`: `check:ux` script + `check` chain extended.
- `apps/_template-site/src/styles/global.css`: `:focus-visible` rule added.
- `skills/premium-website-builder/SKILL.md`: owner rows + a storytelling/UX step.
- DOX: `blueprints/AGENTS.md`, `prompts/AGENTS.md`, root `AGENTS.md`, `README.md`.

## Verification

- `tests/ux-principles.test.mjs` — asserts blueprint 06 (laws + the left-out
  wide-tracking note), the storytelling prompt (4 acts), the external-tools caveats,
  the template focus style, and that `check:ux` passes on the template. Run:
  `node tests/ux-principles.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
- `npm run check:ux` — the live UX lint over `apps/`.
