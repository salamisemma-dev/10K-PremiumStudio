# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://netwerknieuwrotterdam.nl/ontstaan-van-netwerk-nieuw-rotterdam/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; direct page access was blocked by bot verification.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `ngo-social-impact`
  - Reference influence supplied by user: https://netwerknieuwrotterdam.nl/ontstaan-van-netwerk-nieuw-rotterdam/; observed idea: embedded page-like story modules / "pagina in pagina" for NGO storytelling; user-supplied technical notes described a modern WordPress/Blocksy build with warm NGO palette, Inter typography, custom accent font, responsive clamp sizing, SEO metadata, consent-aware analytics, and intrinsic image sizing.
- Pattern or issue: Page-in-page story modules can help NGO sites present chapters, voices, timelines, initiatives, or origin stories without making the whole site feel fragmented.
- Affected owner file: learning/patterns.md
- Proposed change: Add a proposed learning pattern for calm embedded story modules plus transferable technical craft: one focused module at a time, restrained boundaries, tokenized color/spacing/type, clear heading hierarchy, semantic sections, SEO metadata, consent-aware analytics when tracking exists, fixed or intrinsic media dimensions, and no nested-scroll gimmick unless accessibility is proven.
- Pros:
  - Gives NGOs a way to show layered mission stories without needing many separate pages.
  - Supports campaign, origin-story, people, and impact modules inside one landing journey.
  - Keeps route architecture simpler when the visitor job is still one coherent story.
  - Encourages maintainable design tokens and accessible responsive typography for warm NGO brands.
- Cons and fixes:
  - Con: Page-in-page framing can become busy or editorially cluttered.
    Fix: Limit each module to one narrative job, one primary visual, short copy, and visible breathing room.
  - Con: Embedded modules can confuse heading order, landmarks, or SEO.
    Fix: Keep semantic section/article structure, one page H1, logical H2/H3 sequence, descriptive links, and schema only where relevant.
  - Con: Nested scroll, faux browser frames, or heavy cards can feel gimmicky.
    Fix: Use subtle boundaries instead of fake app chrome; avoid nested scrolling unless keyboard and mobile behavior are verified.
  - Con: NGO references can tempt bright collage energy that weakens premium trust.
    Fix: Reuse the narrative role only; keep one dominant scene, calm photography, restrained typography, and measured motion.
  - Con: A polished WordPress/plugin stack can tempt the repo toward platform-specific defaults.
    Fix: Capture transferable roles only: tokens, SEO, consent, responsive navigation, and layout-shift prevention; keep the 10K implementation static-first/Astro unless the brief requires CMS editing.
  - Con: Accent fonts and bright palettes can become decorative or reduce readability.
    Fix: Use one accent font or color role sparingly, verify contrast, keep body copy in a highly readable face, and derive final colors from the client scene.
- Reviewer decision: Proposed for learning memory; do not promote to a blueprint rule until a real NGO build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
