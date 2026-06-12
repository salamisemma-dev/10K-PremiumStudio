# Delivery

## URL

- Local dev: `http://127.0.0.1:4321`
- Local static audit: served from `dist/` by `checks/static-server.mjs` on an ephemeral port.
- Production: not deployed for the reference template. Each client site records its own production URL.

## Commands

- Build: `npm run build -w apps/_template-site`
- Full check: `npm run check`

## Screenshots

- Desktop (1280x900, full page): `delivery/screenshots/desktop.png`
- Mobile (375x812, full page): `delivery/screenshots/mobile.png`
- Captured by `npm run check:browser` against the built `dist/` with zero browser console errors.

## Lighthouse

Source: `delivery/lighthouse-summary.json`, local `dist/` build, desktop form factor, run 2026-06-12.

- Performance: 100 (threshold 90)
- Accessibility: 100 (threshold 95)
- Best Practices: 96 (threshold 95)
- SEO: 100 (threshold 95)

## Schema

- JSON-LD type: `Service`.
- Status: implemented in `src/pages/index.astro`, verified present and singular by `check:site` and `check:browser`.

## Asset Manifest

- Hero: `/hero-forge.svg`, 1600 x 1000, `fetchpriority="high"`, placeholder SVG.
- Proof detail: `/proof-detail.svg`, 1200 x 900, `loading="lazy"`, placeholder SVG.

## Open Risks

- Placeholder SVGs ship only with the template. Each client site must replace them with assets defined in `projects/<client>/assets.md`.
- Lighthouse scores above are from the local static build. Re-run `npm run check:lighthouse` against the deployed or preview URL to capture production field scores before client sign-off.
- Best Practices sits at 96; investigate the single deduction if a client requires a perfect score.
