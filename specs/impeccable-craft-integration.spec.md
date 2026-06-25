---
id: impeccable-craft-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [design-intelligence-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Adopt the objective, anti-slop craft rules from the open `impeccable` skill (Paul
Bakaus, Apache-2.0) as enforceable 10K law and wire its detector as a quality gate,
while explicitly leaving out the parts that contradict the studio's first law
(restraint before spectacle; color from the scene, not taste). Permanent record of
what was taken, what was left, and why.

## Contract

1. `impeccable` is an optional devDependency (the npm detector CLI only, not the
   2000-file skill). The gate `checks/impeccable-audit.mjs` (`npm run check:impeccable`)
   runs it over `apps/` and is part of `npm run check`.
2. Rule curation lives in `.impeccable/config.json` under `detector`:
   `designSystem.enabled=false` (10K uses `brand/manifest.md`, not impeccable's
   DESIGN.md) and `ignoreRules=[overused-font, single-font]` (conflict with the
   design-intelligence corpus font recommendations). Every objective ban stays on.
3. The detector exits `2` on findings; the gate propagates that as failure. If the
   devDependency is absent the gate self-skips (exit 0) so the skill still runs in a
   minimal cowork sandbox.
4. `blueprints/05-craft-and-bans.md` owns the adopted bans and the out-of-register
   list. The impeccable commands `bolder`, `overdrive`, `delight`, `colorize` are NOT
   adopted (they push spectacle/added color vs 10K restraint + scene-first).
5. The skill is packaged for cowork: `.claude-plugin/plugin.json` + `marketplace.json`
   make `premium-website-builder` installable; SKILL.md documents cowork bootstrap,
   outputs convention, and graceful degradation.

## Business rules

- Cross-source contradiction: impeccable flags Inter/Geist as overused; the corpus
  recommends them. Resolution: font novelty is not a 10K law; those two rules are off,
  font choice stays a scene + brand decision. This is the canonical "leave the
  contradiction" case.
- Intentional exceptions are recorded in `.impeccable/config.json` `ignoreValues` with
  a reason, never suppressed silently.
- Provenance: impeccable is Apache-2.0; only consumed as an npm devDependency, not
  vendored, so its license travels with the package.

## Downstream impact

- `package.json`: `impeccable` devDependency + `check:impeccable`/`design:audit`
  scripts; `check` chain extended.
- `skills/premium-website-builder/SKILL.md`: craft-bans owner row, audit step,
  out-of-register note, Cowork usage section.
- New `blueprints/05-craft-and-bans.md`; root `AGENTS.md` / `README.md` updated.
- If impeccable's config schema changes across versions, `.impeccable/config.json`
  and the disabled-rule rationale must be re-synced.

## Verification

- `tests/impeccable-integration.test.mjs` — asserts the curated config (designSystem
  off, both rules ignored), blueprint 05 + its out-of-register list, the plugin
  manifest, and the audit gate; when the detector devDependency is present it also
  asserts the detector catches a known ban (exit 2) and passes the clean template.
  Run: `node tests/impeccable-integration.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
- `npm run check:impeccable` — the live gate over `apps/`.
