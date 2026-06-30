---
id: concept-preview-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [templates-collection-integration, design-intelligence-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Add a lightweight concept-preview step for projects where the best template, layout, or
brand direction is not obvious from the six-field brief alone. The preview gives the user
three landing-page directions in one offline HTML file before production code starts, so
selection becomes explicit instead of hidden in a chat or prompt.

## Contract

1. `projects/_template/concepts.html` is the reusable preview artifact. Copy it to
   `projects/<client>/concepts.html` when a project needs side-by-side concept selection.
2. The file must present exactly three concept options. Each option names a template,
   runner-up, layout rhythm, brand/design direction, asset plan, CTA direction, and the
   reason the concept fits the `one thing` + `scene`.
3. The concept preview is a decision aid, not a final website. It must say this in the
   file and must not replace `brief.md`, `content.md`, `assets.md`, or `acceptance.md`.
4. Selection remains scene-first: the preview may compare layouts and brand moods, but the
   client `scene` still decides palette, typography, light, and motion restraint.
5. Offline-first rules apply: no external CDN, no stock URLs, no remote fonts, no runtime
   service dependency, and no `transition: all`.
6. After a concept is chosen, record the selected template, rejected runner-up, and one
   scene-based reason in `projects/<client>/brief.md` before building in `apps/`.

## Business rules

- Use the concept preview when a user asks for multiple landing-page concepts, asks how
  the repo picks a template, or when two or more templates plausibly fit the same brief.
- Do not create three production sites. The preview is one static HTML artifact that helps
  choose one direction.
- The three concepts should be meaningfully different by narrative form, layout rhythm,
  brand feel, proof strategy, and asset plan. Do not vary only colors.

## Downstream impact

- `docs/concept-preview-guide.md`: human guide for using the three-concept preview.
- `projects/AGENTS.md`: records `concepts.html` as an optional project decision artifact.
- `skills/premium-dev-skill.md`: instructs agents to use the preview before building when
  template choice is ambiguous or the user asks for options.
- `package.json`: `test:concepts`; the `test` chain runs it.

## Verification

- `tests/concept-preview.test.mjs` — asserts the reusable HTML exists, contains exactly
  three concepts, carries the required decision fields, preserves scene-first and
  not-final framing, avoids offline-first bans, and verifies docs/skill/package wiring.
  Run: `node tests/concept-preview.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.