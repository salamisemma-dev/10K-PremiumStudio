---
name: premium-website-builder
description: >-
  Build a premium 10K-PremiumStudio landing page from this repository's brand,
  blueprints, prompts, and checks. Use this skill whenever the user wants to
  create, generate, scaffold, or ship a premium / cinematic / high-end landing
  page or client website with this repo, mentions a new client site, the
  "10K" or "PremiumStudio" system, the discovery questionnaire, the
  five-asset rule, scene-based color, or wants a landing page that must pass
  Lighthouse, schema, accessibility, and delivery checks. Trigger even when the
  user does not name the repo but clearly wants a restrained, premium, one-scene
  landing page built to a verifiable quality bar.
---

# Premium Website Builder

## Why this skill exists

This repository is a production machine, not a prompt collection. Its whole point
is that every premium site comes out the same way: brand-true, evidence-backed,
and free of drift. The danger is an agent that improvises, copies rules into the
wrong file, or ships a pretty page that fails the quality gate. This skill keeps
you on the rail: read the owners, gate on client facts, build in the right place,
prove it with checks.

You are smart enough to design a landing page unaided. Resist that. The value
here is consistency across many clients, which only holds if you defer to the
repo's source-of-truth files instead of your own taste.

## Where truth lives (read before building)

Each rule has exactly one owner. Read the owner, do not re-derive its content.

| Concern | Owner file | Read it for |
|---|---|---|
| Identity, tone, hard brand laws | `brand/manifest.md` | voice, the 5-asset rule, "delete over add" |
| Visual + motion architecture | `blueprints/01-core-architecture.md` | layout laws, typographic scale, GSAP layers |
| SEO + performance + a11y | `blueprints/02-seo-frontpage-matrix.md` | semantics, JSON-LD, Core Web Vitals, alt text |
| Agent behavior + workflow | `skills/premium-dev-skill.md` | the six pillars, tone toward the user |
| Asset prompts (scene method) | `prompts/01-visual-assets.md` | how to brief images/video by scene |
| Copy rules | `prompts/02-copywriting.md` | short headlines, hard claims, no em dash |
| Discovery to project facts | `prompts/00-discovery-master.md` | how intake becomes a brief |
| Client intake questionnaire | `Template/klant-website-discovery-vragenlijst.md` | the human questions |
| Reference implementation | `apps/_template-site/` | a passing Astro + Tailwind + GSAP page |
| Quality gate | `checks/` + root `package.json` | what "done" must prove |

Always walk the DOX chain first: read root `AGENTS.md`, then the `AGENTS.md` of
each folder you touch. The closest `AGENTS.md` wins on local detail. This is how
the repo prevents blind edits.

## The build workflow

### 1. Gather client facts (discovery)

Premium work fails when the agent guesses. Turn intake into written facts:

- Start from `Template/klant-website-discovery-vragenlijst.md` and
  `prompts/00-discovery-master.md`.
- Create `projects/<client>/` with `brief.md`, `content.md`, `assets.md`,
  `acceptance.md` (copy `projects/_template/` as the starting shape).

### 2. The six-field gate

Do not write site code until the brief carries all six canonical fields, or each
missing one is an explicit, recorded assumption in `projects/<client>/brief.md`:

`klantnaam`, `one thing`, `scene`, `proof`, `assets`, `CTA`.

The mapping from questionnaire answers to these six is owned by the PVA's
"Canonieke Zes Velden" section and `projects/AGENTS.md`. If a field is missing,
the right move is to ask or to assume on the record, not to invent silently. This
single gate is what stops drift at the third client.

### 3. Translate scene into color, proof into claims

- The `scene` sentence dictates lighting and palette. Do not pick hex codes from
  taste; derive them from the scene, per `blueprints/01-core-architecture.md`.
- The `proof` becomes hard, specific claims in the Thesis and Feature sections,
  per `prompts/02-copywriting.md`. Replace vague marketing language with facts.

### 4. Build the site

- For a new client, copy `apps/_template-site/` to `apps/<client>-site/` and adapt
  it. Keep the template itself intact as the reference.
- Hold the non-negotiables from the blueprints: one `<h1>` tied to the one thing,
  semantic landmarks, JSON-LD in the head, fixed media `width`/`height`,
  `fetchpriority="high"` on the hero, `loading="lazy"` below the fold.
- Motion must never break access or crawlability: respect
  `prefers-reduced-motion`, keep the page readable without JavaScript, and let
  GSAP enhance rather than gate content. `src/scripts/motion.js` shows the pattern.
- Keep `astro.config.mjs` on `strictPort: true`, port 4321. This prevents the
  stale dev-server drift that produces phantom 500s on a squatted port. If a dev
  server seems broken, suspect an orphaned process on 4321 before suspecting code.

### 5. Prove it with checks (evidence over trust)

Run the gate from the repository root and fix until green:

```bash
npm run check
```

This chains: structure, copy lint, Astro build, Playwright browser audit
(desktop + mobile, console-error free), Lighthouse, and the site audit. Useful
single steps while iterating: `npm run check:structure`, `check:copy`,
`check:browser`, `check:lighthouse`, `check:site`.

Notes that save time:
- Lighthouse runs desktop form factor and is Windows-hardened in
  `checks/lighthouse-audit.mjs`. Thresholds are overridable via `LH_*` env vars.
- Browser and Lighthouse audits spin up their own ephemeral static servers and
  close them. They do not need `npm run dev` running.

### 6. Fill delivery evidence

`checks/site-audit.mjs` fails on purpose if `apps/<site>/delivery.md` still says
`pending` or lacks evidence. After a green run, write real values into the
required sections: `URL`, `Commands`, `Screenshots`, `Lighthouse`, `Schema`,
`Asset Manifest`, `Open Risks`. Pull scores from
`delivery/lighthouse-summary.json` and screenshot paths from
`delivery/screenshots/`. "Done" means proven, not promised.

### 7. DOX pass before you call it finished

After meaningful changes, re-read the DOX chain and update the nearest owning
`AGENTS.md` when structure, contracts, workflow, or artifacts changed. Refresh
each affected Child DOX Index. Remove stale text. A change that updates a brand,
blueprint, or workflow rule updates the owner first, then the code.

## Definition of done

- Six fields present or assumed on the record in `projects/<client>/brief.md`.
- `npm run check` exits green.
- `delivery.md` carries real evidence with no `pending`.
- DOX chain re-checked and owning `AGENTS.md` files current.

## Anti-patterns to avoid

- Inventing visual rules in page code instead of reading the blueprint.
- Copying brand or blueprint text into prompts or code (one rule, one owner).
- Coding before the six-field gate is satisfied.
- Calling the site done on a screenshot alone, with checks unrun or red.
- Adding heavy binary media to git; keep media light or out of the repo per
  `.gitignore` and `apps/_template-site/AGENTS.md`.
