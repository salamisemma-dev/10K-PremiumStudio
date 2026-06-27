---
id: external-skills-triage
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [motion-standards-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Triage three external skill repos (vercel-labs/agent-skills, Leonxlnx/taste-skill,
JCodesMore/ai-website-cloner-template) — adopt only the parts that strengthen 10K, and
leave everything that contradicts the stack or the philosophy. Permanent record of the
adopt/leave decisions so the same conflicts are not re-litigated.

## Contract

1. **Adopted craft rules** (taste-skill, MIT) live in `blueprints/06-ux-principles.md`
   §3b: H1 two-to-three line rule, gapless bento grid (`grid-flow-dense`), hero element
   bans (no badge stamps / pill-tags / raw stats), massive section spacing. They
   reinforce `03`/`05`; they do not loosen a ban.
2. **Reference-study method** (cloner INSPECTION_GUIDE, MIT) lives in
   `design-intelligence/inspection-guide.md`, reframed: study a reference to inform a
   bespoke scene-first build, **never clone**. a11y + SEO stay mandatory (the cloner
   drops them).
3. **Referenced-not-wired** aids + the **left-out** list live in
   `design-intelligence/external-tools.md`: vercel web-interface-guidelines / deploy /
   writing as optional aids; clone-website, brutalist, "NEVER Inter", python random
   layout, glass pill nav, and all React/composition skills as left-out conflicts.
4. Additive only: no existing file is renamed/removed; no React/Next dependency or
   pattern enters the Astro codebase; all existing gates stay green.

## Business rules

- The cloner's pixel-perfect clone is the sharpest conflict: it copies a site wholesale
  and explicitly drops a11y + SEO — the inverse of 10K. Only its inspection *method* is
  kept; the cloning is rejected.
- taste-skill's "NEVER Inter" repeats the impeccable `overused-font` decision: font is a
  scene + brand call, the corpus recommends Inter — so the ban is left out.
- vercel's React/composition/native skills target the wrong stack; adopting them would
  damage the Astro/Tailwind/GSAP codebase, so they are left out (not merely skipped).
- web-interface-guidelines overlaps the existing `impeccable` + `check:ux` +
  `check:structure` gates; referenced as a second-opinion audit, not duplicated.

## Downstream impact

- New: `design-intelligence/inspection-guide.md`; `blueprints/06` §3b; extended
  `design-intelligence/external-tools.md`.
- `skills/premium-website-builder/SKILL.md` owner table + `design-intelligence/AGENTS.md`
  index gain the inspection guide.
- No `package.json` / template / gate changes (nothing executable was non-contradictory).

## Verification

- `tests/external-skills.test.mjs` — asserts the inspection guide (study-not-clone +
  forbids cloning + keeps a11y/SEO), blueprint 06 §3b craft rules + the left-out note,
  and the external-tools referenced + left-out sections (clone-website, brutalist,
  React, NEVER-Inter). Run: `node tests/external-skills.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
