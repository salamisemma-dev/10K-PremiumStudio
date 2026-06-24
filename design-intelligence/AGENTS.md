# AGENTS.md — design-intelligence/

## Role in this repo

This folder is a **consulted reference library**, not a new source of authority. It
vendors the open `ui-ux-pro-max` design dataset (styles, palettes, typography,
industry reasoning, UX guidelines, stack guidance) so the studio can ground design
decisions in a large, WCAG-checked corpus instead of taste.

It does **not** override the existing owners. Order of authority is unchanged:

1. `brand/manifest.md` — identity, tone, the 5-asset rule, "delete over add".
2. `blueprints/` — visual/motion architecture, SEO, a11y, performance, design laws.
3. `blueprints/04-design-intelligence.md` — **how** this dataset is consulted under
   the scene discipline. Read it before using anything here.
4. `design-intelligence/` (this folder) — raw recommendations to be filtered by the
   above. A row here is a candidate, never a verdict.

## Hard rule (anti-drift)

The studio derives palette and mood **from the client `scene`**, not from a product
type. This dataset suggests palettes/fonts/styles **by product type**. When they
disagree, the scene wins. Use this data to *enrich and sanity-check* a scene-derived
decision (contrast ratios, font pairing candidates, anti-patterns), never to replace
the scene-first rule in `blueprints/01-core-architecture.md`.

## Files

- `data/*.csv` — vendored datasets (source of truth for this folder only). Do not
  hand-edit rows; refresh from upstream and re-run checks. See `ATTRIBUTION.md`.
- `scripts/*.py` — upstream reasoning engine (BM25 search + design-system generator).
  Optional; needs Python. The Node path below is the supported in-repo path.
- `examples-21st-savethedate.md` — curated real-world patterns mapped to our design laws.
- `README.md` — what each dataset contains and how to query it.

## How to query (no Python needed)

```bash
npm run design:lookup -- palette "wedding"
npm run design:lookup -- type "elegant editorial"
npm run design:lookup -- style "minimal"
npm run design:lookup -- ux navigation
npm run design:lookup -- astro
```

Backed by `checks/design-intel.mjs` (zero-dependency CSV reader).

## Verification

- `node checks/design-intel.mjs --selfcheck` must exit 0 (all CSVs parse, expected
  columns present).
- Changing the consult workflow updates `blueprints/04-design-intelligence.md` first,
  then this file.
