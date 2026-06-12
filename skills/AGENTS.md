# Purpose

- Own the AI-agent behavior contract for building websites from this repository.

## Ownership

- `premium-dev-skill.md` describes agent behavior and workflow.
- `premium-website-builder/SKILL.md` is the triggerable Claude Code skill that orchestrates the full repo build workflow. It points to owners; it must not duplicate their content.
- Design rules live in `blueprints/`.
- Brand rules live in `brand/`.
- Project facts live in `projects/`.

## Local Contracts

- Skills must avoid duplicating full blueprint text.
- Skills must point agents to source files before implementation.

## Work Guidance

- Keep behavior operational and short.

## Verification

- `npm run check:copy`

## Child DOX Index

- `premium-dev-skill.md` - Agent workflow for premium website delivery.
- `premium-website-builder/` - Triggerable skill orchestrating discovery, build, checks, and delivery.
