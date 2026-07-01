---
id: learning-program-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [templates-collection-integration, concept-preview-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Add a lightweight learning loop so every completed website can improve the repo, skill, templates, and checks without allowing automatic drift. Lessons are captured from real delivery evidence, reviewed, and then applied through normal source-owner edits.

## Contract

1. `projects/_template/learning.md` is the reusable project learning artifact. Each client project copies it to `projects/<client>/learning.md`.
   External reference studies live under `design-intelligence/references/<study>/learning.md`,
   not under `projects/`.
2. Every lesson records delivery evidence, pattern or issue, affected owner file, proposed change, pros, cons, a fix for each con, reviewer decision, and status.
3. Allowed statuses are `draft`, `proposed`, `accepted`, `rejected`, and `shipped`.
4. `learning/patterns.md` owns reviewed reusable pattern records. It is memory only: it may propose changes, but it never overrides the constitution or owner files.
5. `docs/learning-program.md` explains the workflow and states that lessons require review before changing `skills/`, `templates/`, `blueprints/`, prompts, checks, or project templates.
6. `skills/premium-dev-skill.md` and `skills/premium-website-builder/SKILL.md` include a post-delivery learning step. They must instruct agents to capture proposals and update owner files only through reviewed edits.
7. `checks/learning-review.mjs` scans client project learning records and reference-study learning records separately. It fails malformed lessons, accepted or shipped lessons whose owner file does not exist, cons without fixes, and text that promises automatic mutation of skills or templates. Reference studies must not be treated as completed client delivery.
8. CI runs the learning test and review through `npm run check` and the spec gate.

## Business rules

- Learning is evidence-backed. A screenshot impression alone is not enough; use delivery evidence, source HTML/CSS/JS review, user feedback, or a named reference.
- Each downside must include a fix. If a lesson has no meaningful downside, write the residual risk and how it is monitored.
- Inspiration sites such as Rolls-Royce may inform restraint, pacing, and composition, but they are never cloned.
- The loop optimizes compounding quality, not unchecked self-modification.

## Downstream impact

- `package.json`: `test:learning`; `check:learning`; both are wired into `test` and `check`.
- `scripts/bob_validate.mjs`: requires learning scripts and chain wiring.
- `.github/workflows/spec-gate.yml`: runs the learning test and review check.
- DOX: root `AGENTS.md`, `projects/AGENTS.md`, `docs/AGENTS.md`, `checks/AGENTS.md`, `skills/AGENTS.md`, and `learning/AGENTS.md`.

## Verification

- `tests/learning-program.test.mjs` - asserts the learning artifact, guide, reviewed pattern file, reference-study separation, skill references, package scripts, DOX index, and CI wiring.
- `checks/learning-review.mjs` - validates project learning records.
- `scripts/bob_validate.mjs --strict .` - constitution + spec gate.