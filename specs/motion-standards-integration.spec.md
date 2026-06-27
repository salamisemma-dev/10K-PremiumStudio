---
id: motion-standards-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [ux-principles-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Adopt Emil Kowalski's animation standards (animations.dev / github.com/emilkowalski/skills,
MIT) as 10K motion law and ship the reusable parts (strong easing-curve tokens, press
feedback) into the template, without loosening the existing restraint laws or the motion
bans. Permanent record of what was adopted, what stays subordinate, and what is left.

## Contract

1. `blueprints/07-motion-standards.md` owns the adopted standards: frequency table,
   easing decision + custom curves, duration guidance, physicality (no `scale(0)`,
   origin-aware, press scale 0.97), interruptibility, asymmetric timing, GPU-only,
   stagger, reduced-motion, hover gating. It deepens `03-design-laws.md` and
   `05-craft-and-bans.md`; it never loosens a ban.
2. Reusable code shipped to the template (`apps/_template-site/src/styles/global.css`):
   the easing tokens `--ease-out` / `--ease-in-out` / `--ease-drawer` and a subtle
   `:active` press-feedback (dropped under reduced-motion). Curves have no overshoot, so
   the impeccable `bounce-easing` ban still holds.
3. The testable subset is enforced by `checks/motion-lint.mjs` (`npm run check:motion`,
   in `npm run check`): no `transition: all`, no bare `ease-in` on UI, no `scale(0)`
   entrance, reduced-motion handled when a site animates.
4. Duration is **not** gated: 10K sites are marketing, where longer cinematic timing is
   legitimate; Emil's "<300ms UI" rule applies to app UI and stays a review call.

## Business rules

- Governing constraint: where Emil permits "delight" on rare elements, 10K restraint
  still wins (a few motion moments per page, not constant). Adopt the technique, keep
  the restraint. This is the one place the two philosophies are reconciled, not a
  contradiction left on the table.
- reduced-motion nuance: Emil prefers "gentler, not zero"; the template keeps the
  stricter near-instant route (valid for 10K restraint). Both satisfy "handle
  reduced-motion"; not force-changed (break nothing).
- Attribution preserved in `design-intelligence/ATTRIBUTION.md` + inline in blueprint 07
  and the CSS token comment (MIT).

## Downstream impact

- `package.json`: `check:motion` + `test:motion`; `check` and `test` chains extended.
- `apps/_template-site/src/styles/global.css`: easing tokens + press feedback.
- `skills/premium-website-builder/SKILL.md`: owner row + build-step note.
- DOX: `blueprints/AGENTS.md`, root `AGENTS.md`, `README.md`.

## Verification

- `tests/motion-standards.test.mjs` — asserts blueprint 07 (easing/physicality/
  reduced-motion + the restraint-governs note), the easing tokens + press feedback in
  the template, the attribution, and that `check:motion` passes. Run:
  `node tests/motion-standards.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
- `npm run check:motion` — the live motion lint over `apps/`.
