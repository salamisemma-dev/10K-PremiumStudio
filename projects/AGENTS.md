# Purpose

- Own client project input, assumptions, asset manifests, copy, acceptance criteria, and delivery evidence.

## Ownership

- `_template/` defines the required project files.
- Each client folder must use the same file names unless a local `AGENTS.md` says otherwise.

## Local Contracts

- A website may not start until `brief.md`, `content.md`, `assets.md`, and `acceptance.md` exist.
- The canonical six fields live in `brief.md`.
- Missing facts must be marked as explicit assumptions.

## Work Guidance

- Keep project data separate from code.
- Do not store heavy binary assets in git. Use URLs, hashes, dimensions, and license notes in `assets.md`.

## Verification

- `npm run check:structure`
- `npm run check:copy`

## Child DOX Index

- `_template/` - Required files for new client project dossiers.
