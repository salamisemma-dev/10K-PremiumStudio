# Purpose

- Own production website code and reusable runtime templates.

## Ownership

- `_template-site/` is the reference implementation for Astro, Tailwind CSS, and GSAP.
- Client websites should be added as sibling app folders or generated from `_template-site/`.

## Local Contracts

- Heavy binary assets are not committed by default. Use CDN or bucket URLs in project asset manifests.
- No API keys in source code.
- Site code must remain readable without JavaScript.
- Motion must respect `prefers-reduced-motion`.
- Dev servers must use a strict canonical port instead of silently hopping to another port.

## Work Guidance

- Use semantic HTML.
- Keep content driven by project files where practical.
- Avoid adding new brand or blueprint rules directly in app code.

## Verification

- `npm run build`
- `npm run check:structure`
- `npm run check:copy`
- `npm run check:site`

## Child DOX Index

- `_template-site/` - Reference Astro site with Tailwind, GSAP, schema, accessibility, and reduced-motion behavior.
