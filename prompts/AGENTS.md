# Purpose

- Own reusable prompt templates for discovery, visual assets, and copy generation.

## Ownership

- Prompts transform source inputs into structured project data or asset/copy drafts.
- Prompts do not own brand rules or implementation rules.

## Local Contracts

- Reference `brand/manifest.md` and `blueprints/` instead of duplicating their rules.
- Generated copy must obey the copy-linter constraints.

## Work Guidance

- Keep prompts specific enough to produce project files, not vague inspiration.

## Verification

- `npm run check:copy`

## Child DOX Index

- `00-discovery-master.md` - Converts discovery answers into the canonical project brief.
- `01-visual-assets.md` - Generates prompts and manifests for visual assets.
- `02-copywriting.md` - Generates short, factual premium copy.
