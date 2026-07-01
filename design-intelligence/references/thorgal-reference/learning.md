# Project Learning

## Status

- `proposed`

Use `draft`, `proposed`, `accepted`, `rejected`, or `shipped`.

## Delivery Evidence Reviewed

- Site URL: https://www.thorgal.com/
- Delivery file: Reference-only learning dossier; no delivered site.
- Screenshot paths: Not captured; reference study only.
- Lighthouse result: Not run; reference study only.
- Checks run: npm run test:learning; npm run check:learning

## Lessons

### Lesson 1

- Evidence:
  - Category: `entertainment-ip-storyworld`
  - Reference influence reviewed from https://www.thorgal.com/. The page exposes menu items for L’univers, Les albums, Les personnages, Les auteurs, La communauté, “Porte 01” through “Porte 05,” discover links, scroll-to-explore, news, and sound toggle.
- Pattern or issue: For culture, publishing, fandom, and editorial worlds, organize deep content as portal doors with numbered destinations and explicit discovery links.
- Affected owner file: learning/patterns.md
- Proposed change: Add a entertainment-ip-storyworld pattern: portalized content taxonomy, numbered door sections, sound/motion controls, crawlable destination links, and a calm index for deep worlds.
- Pros:
  - Makes large fictional or editorial worlds approachable.
  - Turns navigation into narrative without hiding the IA.
  - Supports both newcomers and returning fans.
- Cons and fixes:
  - Con: Portal metaphors can hide basic navigation.
    Fix: Keep plain menu labels, skip links, and crawlable links next to the metaphor.
  - Con: Sound and immersive effects can exclude users.
    Fix: Make sound opt-in/toggleable and provide reduced-motion fallback.
  - Con: Numbered doors can become decorative if every section looks equal.
    Fix: Prioritize the most important visitor jobs and give each door a clear purpose.
- Reviewer decision: Proposed for categorized learning memory; do not promote to a blueprint rule until a real build proves it under 10K quality gates.
- Status: proposed

## No Durable Lessons

- Not used; this reference produced one proposed reusable learning pattern.
