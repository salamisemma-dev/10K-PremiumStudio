# Purpose

- Own client project input, assumptions, asset manifests, copy, acceptance criteria, and delivery evidence.

## Ownership

- `_template/` defines the required project files and optional decision artifacts.
- Each client folder must use the same file names unless a local `AGENTS.md` says otherwise.
- `concepts.html` is optional and used only when comparing three landing-page concepts before build.
- `learning.md` records post-delivery lessons for repo, skill, template, prompt, and check improvements.
- Reference-learning dossiers do not live here; place studied external references under `design-intelligence/references/`.

## Local Contracts

- A website may not start until `brief.md`, `content.md`, `assets.md`, `acceptance.md`, and `learning.md` exist.
- The canonical six fields live in `brief.md`.
- Missing facts must be marked as explicit assumptions.

## Work Guidance

- Keep project data separate from code.
- Do not store heavy binary assets in git. Use URLs, hashes, dimensions, and license notes in `assets.md`.
- Use `concepts.html` to compare directions; record the chosen template and rejected runner-up in `brief.md` before building.
- After delivery, complete `learning.md`; every reusable lesson needs pros, cons, and a fix for each con.

## Verification

- `npm run check:structure`
- `npm run check:copy`
- `npm run test:learning`
- `npm run check:learning`
- `node tests/concept-preview.test.mjs`

## Child DOX Index

- `_template/` - Required files for new client project dossiers, optional `concepts.html` preview, and post-delivery `learning.md`.

