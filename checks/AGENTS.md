# Purpose

- Own executable verification for repo structure, copy rules, build readiness, and delivery quality.

## Ownership

- `structure-check.mjs` checks required files, DOX boundaries, semantic HTML, schema, and media safeguards.
- `astro-command.mjs` runs Astro commands with telemetry disabled.
- `browser-audit.mjs` renders the built site in desktop and mobile viewports, captures screenshots, and fails on browser console errors.
- `build-template.mjs` runs Astro check and build through `astro-command.mjs`.
- `copy-lint.mjs` checks brand copy constraints.
- `design-intel.mjs` validates every vendored design-intelligence CSV and the required lookup columns.
- `lighthouse-audit.mjs` runs Lighthouse against the built site and enforces performance, accessibility, best-practices, and SEO thresholds.
- `intake-convert.mjs` optionally bridges client source docs to markdown via markitdown; it is user-invoked, not a gate.
- `ux-lint.mjs` enforces the objective UX subset and exports `runUxLint` for tests.
- `motion-lint.mjs` enforces the objective Emil motion subset and exports `runMotionLint` for tests.
- `site-audit.mjs` checks the built template site for SEO, a11y, image dimensions, schema, and delivery evidence.
- `website-quality-checklist.md` records manual verification steps.

## Local Contracts

- Prefer executable checks over promises.
- Any new hard rule should have a check when practical.

## Work Guidance

- Checks must run from the repository root.
- Keep failure output actionable.

## Verification

- `npm run check:structure`
- `npm run check:copy`
- `npm run check:design`
- `npm run check:impeccable`
- `npm run check:site`
- `npm run check:browser`
- `npm run check:lighthouse`
- `npm run check:ux`
- `npm run check:motion`
- `npm run intake:convert -- <source> [out.md]` (optional, not in `npm run check`)

## Child DOX Index

- `astro-command.mjs` - Telemetry-free Astro command runner.
- `browser-audit.mjs` - Playwright desktop/mobile render and screenshot check.
- `build-template.mjs` - Telemetry-free Astro check and build runner.
- `structure-check.mjs` - Required file and template-site structural checks.
- `copy-lint.mjs` - Copy constraint linter.
- `design-intel.mjs` - Design-intelligence CSV parser, lookup CLI, and selfcheck gate.
- `lighthouse-audit.mjs` - Lighthouse score and a11y quality gate.
- `intake-convert.mjs` - Optional markitdown bridge from client documents to markdown.
- `ux-lint.mjs` - Objective UX lint and importable test gate.
- `motion-lint.mjs` - Objective motion lint and importable test gate.
- `site-audit.mjs` - Built HTML audit for SEO, a11y, schema, media, and delivery evidence.
- `website-quality-checklist.md` - Manual browser and delivery checks.
