---
id: reference-dossier-separation
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [design-intelligence-integration, learning-program-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Separate inspiration/reference studies from client project dossiers so exploratory
design learning can compound without making `projects/` look like unfinished client
delivery work.

## Contract

1. `projects/` owns client project input, assumptions, acceptance criteria, delivery
   evidence, and post-delivery `learning.md` records.
2. `design-intelligence/references/` owns reference-learning dossiers for studied
   external sites, brands, campaigns, portfolios, and product experiences.
3. Reference-learning dossiers may reuse the five-file dossier shape
   (`brief.md`, `content.md`, `assets.md`, `acceptance.md`, `learning.md`) when useful,
   but they must be labeled as reference studies and not delivered client sites.
4. `projects/AGENTS.md` must not index `*-reference` studies. The nearest owning
   contract for reference studies is `design-intelligence/references/AGENTS.md`.
5. `checks/learning-review.mjs` validates client project learning records separately
   from reference-study learning records. Client delivery evidence may require a
   complete client learning record; reference studies are validated only when their
   `learning.md` exists and must not be treated as completed client delivery.
6. `checks/copy-lint.mjs` keeps `projects/` in its scan roots for client-facing
   source text, but reference studies under `design-intelligence/references/` are not
   part of that client-copy gate.
7. Root docs and ownership descriptions must state the boundary so future studies are
   added under `design-intelligence/references/`, not under `projects/`.

## Business rules

- Studied references are candidates, never visual law; the scene-first invariant
  still wins every conflict.
- Reference studies may name pros, cons, and fixes, but must not instruct agents to
  clone protected brand codes, campaign identities, or proprietary layouts.
- The build gate should fail for malformed client learning and malformed checked-in
  reference learning, not because an inspiration folder is missing client delivery
  evidence.

## Downstream impact

- Move existing `projects/*-reference/` dossiers to `design-intelligence/references/`.
- Update DOX contracts for `projects/`, `design-intelligence/`, and
  `design-intelligence/references/`.
- Update `checks/learning-review.mjs`, `tests/learning-program.test.mjs`, and
  ownership docs to encode the separation.

## Verification

- `tests/learning-program.test.mjs` - asserts reference-study ownership and learning
  review separation.
- `checks/learning-review.mjs` - validates client and reference learning records
  through separate roots.
- `scripts/bob_validate.mjs --strict .` - constitution and spec gate.
