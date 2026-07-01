# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://invictus-elixir-experience.rabanne.com/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; reference study only.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `luxury-fragrance-campaign`
  - Reference influence reviewed from https://invictus-elixir-experience.rabanne.com/. The page opened as a JS-heavy shell with title “Rabanne - Invictus Elixir”; detailed crawlable content was not available during review, so this is recorded as limited-source immersive campaign inspiration.
- Pattern or issue: For fragrance and luxury launches, an experience microsite may carry the emotion while a semantic product layer carries meaning, claims, CTA, and fallback.
- Affected owner file: learning/patterns.md
- Proposed change: Add a luxury fragrance/campaign pattern: product myth scene, minimal claim stack, explicit shop/learn CTA, reduced-motion/static fallback, age/region/legal notes where needed, and no JS-only content.
- Pros:
  - Lets sensory products feel experiential online.
  - Supports campaign storytelling with very few assets.
  - Can separate emotional world-building from practical product information.
- Cons and fixes:
  - Con: Immersive shells can be invisible to SEO and assistive tech.
    Fix: Keep product name, claim, CTA, alt text, and metadata in semantic HTML.
  - Con: Fragrance language can become vague luxury fog.
    Fix: Use a few concrete notes, ingredients, bottle details, or campaign claims with sources.
  - Con: Heavy 3D/video can harm performance.
    Fix: Use compressed assets, poster frames, lazy loading below the fold, and reduced-motion fallback.
- Reviewer decision: Proposed for categorized learning memory; do not promote to a blueprint rule until a real build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
