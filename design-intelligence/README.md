# design-intelligence

A vendored, queryable design corpus the studio **consults** while building. It does
not replace the scene-first discipline — read `blueprints/04-design-intelligence.md`
and this folder's `AGENTS.md` before using it.

## Datasets (`data/`)

| File | Rows | What it gives you |
|---|---|---|
| `colors.csv` | 161 | Product/industry color palettes, WCAG-contrast-adjusted (Primary/Accent/Background/Foreground + notes) |
| `styles.csv` | 76 | UI style catalog: keywords, best-for, do-not-use-for, a11y + performance grades |
| `typography.csv` | 73 | Font pairings with mood keywords, best-for, Google Fonts CSS import + Tailwind config |
| `ui-reasoning.csv` | 161 | Industry reasoning rules: recommended pattern, color/typography mood, anti-patterns |
| `products.csv` | 161 | Product-type → style + landing pattern + palette focus + considerations |
| `ux-guidelines.csv` | 98 | UX do/don't with code examples + severity |
| `landing.csv` | 34 | Landing-page section orders, CTA placement, conversion notes |
| `charts.csv` | 25 | Chart-type selection + accessibility fallbacks |
| `icons.csv`, `app-interface.csv`, `google-fonts.csv` | — | Icon sets, app-shell patterns, font index |
| `stacks/astro.csv` | 53 | **Astro-specific** build guidelines — this repo's framework |
| `stacks/*.csv` | — | react, nextjs, svelte, vue, html-tailwind, shadcn, threejs |

## Query from Node (supported path)

```bash
npm run design:lookup -- font "elegant editorial"
npm run design:lookup -- palette "wedding"
npm run design:lookup -- style "minimal swiss"
npm run design:lookup -- landing "testimonials"
npm run design:lookup -- ux navigation
npm run design:lookup -- astro islands
npm run check:design          # selfcheck: all datasets parse + columns present
```

## Query from Python (optional, full BM25 engine)

```bash
python design-intelligence/scripts/search.py "luxury spa landing page"
python design-intelligence/scripts/design_system.py --design-system "wedding invitation"
```

Requires Python 3. The Node path covers day-to-day consulting without it.

## The one rule

Every row here is a **candidate**. The client `scene` (per
`blueprints/01-core-architecture.md`) and the brand laws decide. Use this data to
sanity-check contrast, pick font candidates, avoid anti-patterns — not to skip
discovery. Provenance + license: `ATTRIBUTION.md`, `UPSTREAM-LICENSE`.
