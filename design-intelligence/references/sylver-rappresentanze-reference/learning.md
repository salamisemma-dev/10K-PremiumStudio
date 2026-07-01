# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://sylverrappresentanze.it/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; reference study only.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `hospitality-place`
  - Reference influence reviewed from https://sylverrappresentanze.it/. The site states its exclusive territory in Umbria and Toscana, separates Hôtellerie and Ristorazione, lists product categories and brand logos, and includes segmented contact fields.
- Pattern or issue: For B2B representation, hospitality, interiors, and suppliers, structure around buyer contexts, proof of territory/selection, brand roster, and segmented commercial contact.
- Affected owner file: learning/patterns.md
- Proposed change: Add a B2B supplier pattern: two or three buyer-context chapters, selected capability bullets, curated brand wall, showroom/contact proof, and segmented lead form without repeating content blocks.
- Pros:
  - Turns a broad catalog into clear buyer journeys.
  - Signals quality through territory, curation, and partner brands.
  - Makes sales contact more efficient by segmenting region, category, and role.
- Cons and fixes:
  - Con: Logo walls can become clutter or borrowed prestige.
    Fix: Curate logos by relevance, add alt text, and pair brand proof with the agency’s own value.
  - Con: Duplicated sections and repeated forms can feel noisy.
    Fix: Keep one canonical contact area and one source of repeated content.
  - Con: Direct contact details and forms can expose privacy or validation risks.
    Fix: Use privacy text, validation states, env-configured submission, and avoid publishing personal data unless explicitly approved.
- Reviewer decision: Proposed for categorized learning memory; do not promote to a blueprint rule until a real build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
