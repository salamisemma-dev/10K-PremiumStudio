# Docs — DOX contract

## Purpose

- Hold human-facing guides that explain how to use the studio. Guides reference the
  source-of-truth files; they never restate or override brand, blueprint, or constitution
  rules (one rule, one owner).

## Local Contracts

- Docs are explanatory, not normative. If a doc and an owner file disagree, the owner file
  wins; fix the doc.
- Keep docs offline-first and scene-first in tone, consistent with the constitution.

## Verification

- `node tests/templates-collection.test.mjs` (asserts the templates user guide exists and
  frames templates as a startpunt, not an eindproduct).

## Child DOX Index

- `templates-user-guide.md` — how to build a site with the template-collection.
