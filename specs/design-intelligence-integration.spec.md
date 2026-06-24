---
id: design-intelligence-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: []
consumed_by: [premium-website-builder-skill]
---

## Intent

Make the studio measurably stronger at building top-tier websites by grounding design
decisions in a large, WCAG-checked corpus (vendored from `ui-ux-pro-max` v2.6.2) —
without weakening the scene-first discipline that keeps every 10K site coherent. The
corpus is a consulted library of candidates, never a new source of authority. This
spec is the permanent record of *how* the two are reconciled.

## Contract

1. The corpus lives under `design-intelligence/data/` (CSV) and
   `design-intelligence/scripts/` (optional Python engine). It is queried from Node
   via `checks/design-intel.mjs` (`npm run design:lookup`, `npm run check:design`).
2. `design-intelligence/AGENTS.md` and `blueprints/04-design-intelligence.md` define
   the consult-not-override workflow. Authority order: constitution → brand →
   blueprints → design-intelligence (candidates).
3. The scene-first invariant (constitution §5) holds: corpus rows inform/validate a
   scene-derived choice; they never select palette/style by product type.
4. Any corpus value used in a client site is logged in `projects/<client>/brief.md`
   with a one-line scene justification and the rejected alternatives.
5. No corpus row is copied into `brand/` or `prompts/` (one rule, one owner). Only the
   chosen *value* lands in the project.
6. Provenance + license preserved in `design-intelligence/ATTRIBUTION.md` and
   `design-intelligence/UPSTREAM-LICENSE` (MIT).

## Business rules

- Upstream picks palettes/fonts by product type; 10K derives them from the scene.
  On conflict the scene wins — this is the whole point of the adapter, not a caveat.
- `stacks/astro.csv` is technical (not aesthetic) and is closest to authoritative for
  `apps/` build choices; still subordinate to the blueprints.
- The corpus is offline-vendored (not a submodule) because the studio is offline-first
  and Node-based. Refresh = re-clone upstream + re-copy + re-run `check:design`.
- Python is optional; the Node lookup path must always work without it.

## Downstream impact

- `skills/premium-website-builder/SKILL.md` gains a "consult design intelligence"
  step and an owner-table row; the build workflow references blueprint 04.
- `package.json` `check` chain now includes `check:design`; a red selfcheck blocks
  delivery.
- Root `AGENTS.md` child index and `README.md` list `design-intelligence/`.
- If the corpus schema changes (columns renamed), `checks/design-intel.mjs` selfcheck
  fails and must be updated before the data is trusted.

## Verification

- `tests/design-intelligence.test.mjs` — asserts every dataset parses, expected
  columns exist, the Astro stack file loads, and the governing docs
  (`blueprints/04-design-intelligence.md`, `design-intelligence/AGENTS.md`,
  `design-intelligence/ATTRIBUTION.md`) are present. Run: `node tests/design-intelligence.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + this spec gate (CI + local).
- `npm run check:design` — wraps the selfcheck in `checks/design-intel.mjs`.
