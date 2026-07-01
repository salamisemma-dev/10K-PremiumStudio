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
- Markdown files in `Template/`, `brand/`, `blueprints/`, `prompts/`, `skills/`, `projects/`, `ideas/`, `design-intelligence/references/`, `apps/`, and `checks/` are the normalized source of truth. Word documents are source inputs or archived references only.
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
- `design-intelligence/` - Vendored, consulted design corpus (palettes, styles, fonts, UX, Astro stack) plus reference-learning dossiers under `references/`. Candidates only; the scene wins (constitution §5).
- `templates/` - Optional curated layer of 12 narrative-form blueprint-presets (a startpunt, not an eindproduct); selection by form, the scene wins; offline-first; gated by `npm run test:templates`.
- `docs/` - Human-facing guides (e.g. the templates user guide). Explanatory, not normative.
- `projects/` - Client project inputs, assumptions, asset manifests, and acceptance records.
- `ideas/` - Speculative website-idea backlog (concepts with no client yet); not client work, not reference studies; gated by `npm run check:ideas` / `test:ideas`.
- `apps/` - Production website code and reusable runtime templates.
- `checks/` - Executable quality checks and delivery verification.
- `learning/` - Reviewed website lessons and reusable pattern records from completed builds.
- `hero-front/` - Hero Front Expert method for premium first-viewport image prompts.
- `specs/` - Executable specifications (Spec-Driven Development); gated by `scripts/bob_validate.mjs`.
- `scripts/` - Spec-gate validator and packaging sync helpers (`bob_validate.mjs`, `sync-packaged-skill.mjs`).
- `tests/` - Plain-node verification tests referenced by specs.
- `constitution.md` - Supreme contract; everything conforms to it.
- `.claude-plugin/` - Plugin + marketplace manifests so the skill is installable (cowork).
- `.impeccable/` - Curated detector config (objective bans on; subjective/DESIGN.md rules off). See `blueprints/05-craft-and-bans.md`.
- `PVA-10K-PremiumStudio.md` - Brutal plan of approach for turning the source proposal into a stable repository.
- `PVA-design-intelligence-integration.md` - Plan + pros/cons (with a fix per con) for the design-intelligence integration.
- `PVA-motion-standards-integration.md` - Plan + pros/cons (with a fix per con) for the Emil motion standards integration.
- `PVA-external-skills-round.md` - Triage + pros/cons (with a fix per con) for vercel / taste-skill / cloner skills.
- `PVA-markitdown-intake.md` - Plan + pros/cons (with a fix per con) for the optional markitdown intake bridge.
- `PVA-templates-collection.md` - Plan + pros/cons (with a fix per con) for the curated template-preset layer.
