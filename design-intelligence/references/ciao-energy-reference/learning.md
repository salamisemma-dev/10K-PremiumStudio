# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://www.ciaoenergy.com/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; reference study only.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `consumer-product-cpg`
  - Reference influence reviewed from https://www.ciaoenergy.com/. The page lists flavors, “moins de sucre,” natural aromas, natural caffeine from coffee beans, stevia, FAQ answers, newsletter signup, and legal/privacy links.
- Pattern or issue: For consumer products, a range-led scroll can pair sensory product names with benefit comparisons and a practical FAQ to make claims feel concrete.
- Affected owner file: learning/patterns.md
- Proposed change: Add a CPG/product pattern for sensory range storytelling: flavor/product sequence, claim-vs-alternative proof blocks, FAQ as trust layer, newsletter/community CTA, and strict claim substantiation.
- Pros:
  - Lets a product line feel abundant without needing separate pages for every SKU.
  - Pairs emotion and taste with concrete ingredient proof.
  - FAQ handles objections and safety questions near the conversion path.
- Cons and fixes:
  - Con: Flavor carousels can become visually noisy.
    Fix: Limit visible products per moment, keep consistent product framing, and use one dominant rhythm.
  - Con: Nutrition and health claims can create legal risk.
    Fix: Store source data, avoid unsupported comparative claims, and add disclaimers where required.
  - Con: Newsletter and social CTAs can distract from product comprehension.
    Fix: Place secondary CTAs after the product and proof story, not before users understand the offer.
- Reviewer decision: Proposed for categorized learning memory; do not promote to a blueprint rule until a real build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
