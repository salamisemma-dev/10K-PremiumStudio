# Purpose

- Provide the reference implementation for a 10K-PremiumStudio landing page.

## Ownership

- `src/pages/index.astro` owns page semantics, schema, copy structure, and layout.
- `src/scripts/motion.js` owns GSAP behavior.
- `src/styles/global.css` owns Tailwind layers and global visual tokens.
- `delivery.md` owns the delivery record. It must carry real evidence and no `pending` markers; `check:site` enforces this.
- `delivery/` holds generated evidence: `screenshots/desktop.png`, `screenshots/mobile.png`, and `lighthouse-summary.json`. Screenshots and the summary are produced by `check:browser` and `check:lighthouse`; do not edit them by hand.

## Local Contracts

- Keep exactly one `h1`.
- Keep JSON-LD in the page head.
- Keep the page readable without JavaScript.
- Do not add heavy binary assets to `public/`.
- Keep `astro.config.mjs` on `strictPort: true` for port 4321 to prevent stale dev-server drift.

## Work Guidance

- Use SVG placeholders only for the template. Real client assets must come from `projects/<client>/assets.md`.

## Verification

- `npm run check`

## Child DOX Index

- `src/` - Astro page, motion script, and global styles.
- `public/` - Lightweight public placeholders only.
- `astro.config.mjs` - Astro site and strict dev-server port configuration.
- `delivery.md` - Delivery record with real evidence, gated by `check:site`.
- `delivery/` - Generated screenshots and Lighthouse summary evidence.
