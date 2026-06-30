---
id: templates-collection-integration
type: orchestration
version: 1.1
status: approved
owner: studio-maintainer
depends_on: [motion-standards-integration, ux-principles-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Add a curated template layer that combines the speed of a template model with the
uniqueness of a bespoke build, without weakening the constitution, the scene-first law,
or the craft gates. Templates are **blueprint-presets** (narrative skeletons) for the
existing Astro template, never standalone CDN pages. Permanent record of what was adopted
from the source proposal (`10k Update 29-6-2026.md`), what was deliberately not taken, and
why.

## Contract

1. `templates/` owns the preset layer: `README.md`, `selection-guide.md`, `AGENTS.md`, and
   twelve `<naam>/blueprint.md` presets (hero-immersive, narrative-driven, product-first,
   service-agency, saas-dashboard, portfolio-minimal, event-conference, culinary-experience,
   ngo-mission, consultant-authority, art-gallery, video-3d-reveal).
2. A template is a **structure preset, not a style preset**: it never sets palette,
   typography mood, or lighting — the client `scene` does (constitution §5). Selection is by
   narrative form, owned by `selection-guide.md`, which states "the scene wins".
3. Offline-first (§2): no template file may reference an external CDN (`cdn.tailwindcss.com`,
   `cdnjs`), stock images (`unsplash`, `pexels`, `picsum`), or `transition: all`. Assets stay
   scene-derived (5-asset rule).
4. Every `blueprint.md` keeps the same seven sections (Wanneer te gebruiken · De Structuur ·
   Visuele Stijl & Scène · Typografie · Motion · Assets · Self-Check), handles
   `prefers-reduced-motion`, and carries the constitution footer (`scène wint (§5)`). Motion
   defers to `blueprints/07-motion-standards.md`.
5. `docs/templates-user-guide.md` explains usage and frames a template as a startpunt, not an
   eindproduct. `Examples/hero-immersive-example.md` is a fictional worked walkthrough
   (discovery → template → six-field mapping) showing the scene driving the choice.
6. The skill workflow (`skills/premium-dev-skill.md`) reads `templates/selection-guide.md` as
   an optional selection step before the six-field gate; selection logic is not duplicated.

## Business rules

- The template model is **optional**: when no preset fits, build bespoke from
  `apps/_template-site`. The blueprints and the scene-first law are not optional.
- AI-video / Emergent-style 3D inspiration is adopted only as the narrative-form preset
  `video-3d-reveal`: a scene-derived product or proof video drives a spatial reveal. It is
  not a tool workflow, not a second stack, and not permission to depend on external
  generation services at build or verification time.
- The source proposal's standalone Tailwind-CDN HTML pages, stock-image URLs,
  `transition: all` motion, and the video/presentation/release marketing material are
  deliberately not adopted (they break offline-first or are untestable). Recorded in
  `PVA-templates-collection.md`.

## Downstream impact

- `package.json`: `test:templates`; the `test` chain runs it.
- `skills/premium-dev-skill.md` + `skills/premium-website-builder/SKILL.md`: selection step +
  owner row.
- DOX: `templates/AGENTS.md`, `docs/AGENTS.md`, `Examples/AGENTS.md`, root `AGENTS.md`,
  `README.md`.

## Verification

- `tests/templates-collection.test.mjs` — asserts the twelve presets (seven sections each,
  reduced-motion, constitution footer), README/selection-guide framing + the scene-wins rule,
  the offline-first ban (no CDN/stock/`transition: all` in `templates/` + the guide + the
  example), the docs guide, the worked example's six-field mapping, the skill reference, and
  the `package.json` wiring. Run: `node tests/templates-collection.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
