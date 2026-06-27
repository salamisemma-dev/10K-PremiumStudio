# DOX framework

- DOX is the operating rail for this repository.
- AGENTS.md files are binding work contracts for their subtrees.
- Before editing files, read this file and every AGENTS.md on the route to the target path.
- After meaningful edits, re-check the applicable DOX chain and update the nearest owning AGENTS.md when structure, contracts, workflow, artifacts, or durable user preferences changed.

## Project Contract

- This repository is for 10K-PremiumStudio: a premium website production system built around calm, cinematic, high-performance landing pages.
- Keep source-of-truth documents explicit. Do not let prompts, blueprints, brand rules, and implementation code contradict each other.
- Prefer fewer, stronger rules over duplicated prompt text.
- When building the planned repo, create durable boundaries for brand, blueprints, prompts, skills, examples, templates, and implementation code.
- Every generated website must preserve the core principle: one scene, five assets, semantic HTML, strong SEO, accessibility, and measured motion.
- Markdown files in `brand/`, `blueprints/`, `prompts/`, `skills/`, `projects/`, `apps/`, and `checks/` are the normalized source of truth. Word documents are source inputs or archived references only.
- Never hardcode secrets. Use environment variables, document required names in `.env.example`, and keep `.env` files out of git.

## Work Guidance

- Read the relevant blueprint, brand, prompt, and skill files before writing implementation code.
- Treat the discovery input as required project data, not optional inspiration.
- Capture assumptions in project docs before they leak into code.
- Use concrete acceptance checks for every website: Lighthouse targets, schema markup, one H1, alt text, fixed media dimensions, responsive layout, and motion fallback.
- Avoid adding new visual rules in implementation files unless the governing blueprint or brand contract is updated.

## Verification

- For planning changes, verify the plan against the current source document and the existing repository contents.
- For future implementation changes, run the project's relevant lint, build, accessibility, and browser checks once those tools exist.

## Child DOX Index

- `Examples/` - Example source materials and reference inputs.
- `Template/` - Reusable client discovery and intake templates.
- `brand/` - Brand identity, tone, and non-negotiable premium rules.
- `blueprints/` - Design, motion, SEO, accessibility, and performance architecture.
- `prompts/` - Prompt templates for discovery, assets, and copy generation.
- `skills/` - AI-agent behavior contract for building premium websites.
- `design-intelligence/` - Vendored, consulted design corpus (palettes, styles, fonts, UX, Astro stack). Candidates only; the scene wins (constitution §5).
- `projects/` - Client project inputs, assumptions, asset manifests, and acceptance records.
- `apps/` - Production website code and reusable runtime templates.
- `checks/` - Executable quality checks and delivery verification.
- `specs/` - Executable specifications (Spec-Driven Development); gated by `scripts/bob_validate.mjs`.
- `scripts/` - Spec-gate validator (`bob_validate.mjs`).
- `tests/` - Plain-node verification tests referenced by specs.
- `constitution.md` - Supreme contract; everything conforms to it.
- `.claude-plugin/` - Plugin + marketplace manifests so the skill is installable (cowork).
- `.impeccable/` - Curated detector config (objective bans on; subjective/DESIGN.md rules off). See `blueprints/05-craft-and-bans.md`.
- `PVA-10K-PremiumStudio.md` - Brutal plan of approach for turning the source proposal into a stable repository.
- `PVA-design-intelligence-integration.md` - Plan + pros/cons (with a fix per con) for the design-intelligence integration.
- `PVA-motion-standards-integration.md` - Plan + pros/cons (with a fix per con) for the Emil motion standards integration.
- `PVA-external-skills-round.md` - Triage + pros/cons (with a fix per con) for vercel / taste-skill / cloner skills.
