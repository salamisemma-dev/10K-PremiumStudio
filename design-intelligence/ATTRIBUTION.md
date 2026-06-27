# Attribution

The datasets and Python scripts under `design-intelligence/data/` and
`design-intelligence/scripts/` are vendored from:

- **Project:** ui-ux-pro-max-skill
- **Author:** NextLevelBuilder
- **Source:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Version vendored:** 2.6.2
- **License:** MIT — full text in `UPSTREAM-LICENSE`.
- **Vendored on:** 2026-06-25

## What was vendored

- `data/`: colors (161 product palettes, WCAG-adjusted), styles (84), typography
  (73 pairings), ui-reasoning (161 industry rules), ux-guidelines (98), charts,
  landing patterns, products, icons, app-interface, google-fonts, plus
  `stacks/{astro,react,nextjs,svelte,vue,html-tailwind,shadcn,threejs}.csv`.
- `scripts/`: `search.py`, `core.py`, `design_system.py` (BM25 reasoning engine).

## What was NOT vendored

The upstream CLI installer, multi-platform templates, the other bundled skills
(brand, slides, banner-design, etc.), and `design.csv`/`draft.csv` (large WIP corpora
not needed here). Refresh by re-cloning upstream and re-copying the files above.

## Why vendored (not a submodule)

The studio is offline-first and Node-based; vendoring keeps the dataset versioned
with the repo and queryable via `checks/design-intel.mjs` without a network or Python
dependency. Provenance and license are preserved here and in `UPSTREAM-LICENSE`.

## Motion standards (blueprints/07-motion-standards.md)

- **Project:** skills (review-animations / emil-design-eng)
- **Author:** Emil Kowalski — https://animations.dev/
- **Source:** https://github.com/emilkowalski/skills
- **License:** MIT.
- **What was adopted:** the animation standards (easing decision + custom curves,
  duration guidance, physicality, interruptibility, asymmetric timing, GPU-only,
  stagger, reduced-motion) as a 10K blueprint, plus the strong easing-curve tokens
  (`--ease-out`/`--ease-in-out`/`--ease-drawer`) and the `:active` press-feedback in the
  reference template. Not vendored as code/data — adapted into blueprint + tokens.
