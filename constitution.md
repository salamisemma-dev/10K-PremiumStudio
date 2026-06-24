# 10K-PremiumStudio — Constitution

The supreme contract. Everything in `brand/`, `blueprints/`, `prompts/`, `skills/`,
`design-intelligence/`, `apps/`, and `checks/` conforms to this. When a rule here and
a rule elsewhere conflict, this wins; change this first, then the code.

## 1. Purpose

Produce calm, cinematic, high-performance premium landing pages at consistent
quality across many clients, without prompts, brand rules, client input, and code
drifting apart.

## 2. Technology standards

- Astro 5 + Tailwind 3 + GSAP. Node-based, offline-first toolchain.
- Dev server pinned: `strictPort: true`, port `4321`.
- No runtime dependency on external services to build or verify a site.
- Python is optional (only the design-intelligence reasoning engine uses it); the
  Node path must always cover day-to-day work.

## 3. Source-of-truth & ownership (one rule, one owner)

- `brand/manifest.md` — identity, tone, hard brand laws, the 5-asset rule.
- `blueprints/` — visual/motion architecture, SEO, a11y, performance, design laws.
- `prompts/` — generation templates (discovery, assets, copy).
- `projects/` — client input and assumptions.
- `apps/` — implementation code.
- `checks/` — executable verification.
- `design-intelligence/` — **consulted** design corpus; candidates only, never an
  owner of brand or visual law (see §5).
- Markdown in these folders is the normalized source of truth. Word docs are inputs
  or archives only. A rule lives in exactly one file; never copy it into another.

## 4. Architecture rules

- Every site: one `<h1>` tied to the one thing, semantic landmarks, JSON-LD in head,
  fixed media `width`/`height`, `fetchpriority="high"` hero, lazy below the fold.
- Motion uses `transform`/`opacity`, respects `prefers-reduced-motion`, and never
  gates content or crawlability. The page is readable without JavaScript.
- The six-field gate (`klantnaam`, one thing, scene, proof, assets, CTA) precedes any
  site code; missing fields are recorded assumptions, never silent invention.

## 5. Scene-first invariant (governs design-intelligence)

Palette, type mood, and motion are derived **from the client `scene`**, not from a
product type or trend. The `design-intelligence/` corpus may inform, validate
(contrast, font candidates, anti-patterns), and enrich a scene-derived decision — it
may never replace the scene-first rule. The scene wins every conflict.

## 6. Quality governance

- "Done" means proven: `npm run check` green (structure, design selfcheck, copy,
  build, browser, Lighthouse, site) and `delivery.md` carrying real evidence, no
  `pending`.
- Spec gate: `node scripts/bob_validate.mjs --strict .` green before code; CI runs it.
- Secrets: never committed; documented in `.env.example`; `.env` stays out of git.

## 7. Amendment

Change requires updating this file (and `docs/FLEET.md` if a shared/fleet invariant),
then the affected specs, then code. Unratified deviations from a shared invariant are
drift until ratified.
