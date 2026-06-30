# Templates — DOX contract

## Purpose

- Own the curated **blueprint-presets** (narrative skeletons) that speed up a build
  without overriding brand, blueprint, or scene law.

## Local Contracts

- A template is a **structure preset, not a style preset**. It never sets palette,
  typography mood, or lighting — the client `scene` does (constitution §5).
- Offline-first (§2): no external CDN, no stock-image URLs (unsplash/pexels/picsum), no
  CDN Tailwind/GSAP in any template file. Assets stay scene-derived (5-asset rule).
- Motion follows `blueprints/07-motion-standards.md`: template tokens, transform/opacity
  only, `prefers-reduced-motion` handled. No `transition: all`, no overshoot/bounce.
- Every `blueprint.md` keeps the same seven sections: Wanneer te gebruiken · De Structuur
  · Visuele Stijl & Scène · Typografie · Motion · Assets · Self-Check.
- Templates are presets for `apps/_template-site`; they do not introduce a second stack.

## Work Guidance

- Selection is by narrative form, owned by `selection-guide.md` (one owner). Do not
  duplicate selection logic into the skill or prompts.
- When adding a template: add the folder + `blueprint.md` (seven sections + constitution
  footer), extend `selection-guide.md`, and extend `tests/templates-collection.test.mjs`.

## Verification

- `node tests/templates-collection.test.mjs` (`npm run test:templates`).
- `node scripts/bob_validate.mjs --strict .` (spec gate).

## Child DOX Index

- `README.md` — collection overview and usage.
- `selection-guide.md` — scene-first selection by narrative form (the scene wins).
- `<naam>/blueprint.md` — one preset each (12 total).
