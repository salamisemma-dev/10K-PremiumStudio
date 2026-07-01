# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://cartier-waw-dev-0224.dev.60fps.fr/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; reference study only.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `luxury-brand-retail`
  - Reference influence reviewed from https://cartier-waw-dev-0224.dev.60fps.fr/. The reachable page identifies itself as Cartier WAW 2024, but detailed content was not available as crawlable text during review.
- Pattern or issue: Luxury campaign microsites can use one dominant art-directed scene, restrained loading/pacing, and sparse onward cues to create prestige without over-explaining.
- Affected owner file: learning/patterns.md
- Proposed change: Add a luxury/brand-campaign pattern for cinematic microsites: full-bleed art direction, minimal copy, one clear journey, reduced-motion/static fallback, semantic content outside the animation layer, and no dependency on JS for meaning.
- Pros:
  - Creates immediate prestige through composition and restraint.
  - Works for launches, campaigns, events, and high-end editorial moments.
  - Encourages fewer, stronger assets instead of many decorative blocks.
- Cons and fixes:
  - Con: JS-heavy luxury sites can hide content from accessibility, SEO, or slow devices.
    Fix: Keep semantic HTML, route metadata, alt text, and a static fallback as the real content layer; let motion enhance only after load.
  - Con: Ceremonial pacing can become friction.
    Fix: Use measured entrance timing, provide visible progress only when needed, and keep CTAs reachable without waiting through animation.
  - Con: Luxury reference cues can tempt brand imitation.
    Fix: Reuse only the role of cinematic restraint; never copy Cartier visual codes, product cues, type, layout, or campaign metaphors.
- Reviewer decision: Proposed for categorized learning memory; do not promote to a blueprint rule until a real build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
