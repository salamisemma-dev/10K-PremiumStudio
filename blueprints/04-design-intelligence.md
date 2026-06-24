# Blueprint: Design Intelligence (consulting the vendored corpus)

## Goal

Give the studio a large, WCAG-checked design corpus to lean on — without weakening
the scene-first discipline that keeps every 10K site coherent. This blueprint owns
**how** `design-intelligence/` is used. The corpus is a library of candidates; this
blueprint is the filter.

## The conflict it resolves

- `blueprints/01-core-architecture.md` says: **derive palette and mood from the
  client `scene`.** Never invent a palette after the fact.
- The vendored corpus says: **pick palette/style/fonts from the product type.**

These can disagree. The rule is fixed: **the scene wins.** Product-type data informs
and validates a scene decision; it never replaces it.

## When to consult (and when not)

Consult after the six-field gate is satisfied and the `scene` is written — never
before. Use it for:

1. **Contrast safety.** Cross-check a scene-derived palette against the nearest
   `colors.csv` rows (they carry WCAG-adjusted accents and notes). If the scene
   colour fails contrast, adjust toward the corpus value, keep the scene hue family.
2. **Font candidates.** `typography.csv` proposes pairings with Google Fonts imports.
   Pick the candidate whose mood matches the scene, then confirm against brand voice.
3. **Anti-pattern filter.** `styles.csv` "Do Not Use For" and `ui-reasoning.csv`
   "Anti_Patterns" catch cheapening choices (e.g. neumorphism on a data-heavy page).
4. **Section order.** `landing.csv` offers conversion-tested section sequences; adapt,
   do not paste — the micro-narrative law (`03-design-laws.md`) still governs role.
5. **Framework guidance.** `stacks/astro.csv` is Astro-specific and directly applies
   to `apps/` (islands, zero-JS default, client directives). This one is closest to
   authoritative because it is technical, not aesthetic — follow it unless a blueprint
   says otherwise.

Do **not** use it to: skip discovery, pick a palette by industry, add a trend style
the scene doesn't justify, or override brand laws.

## Workflow (slots into the skill build steps)

```
scene written  ->  npm run design:lookup -- font "<scene mood words>"
               ->  npm run design:lookup -- palette "<industry or mood>"
               ->  npm run design:lookup -- style "<intended feel>"
               ->  filter every candidate through: scene match? brand-true?
                   passes 03-design-laws (narrative, anchor, type dominance,
                   restraint, performance-preserved motion)?  ->  record choice
                   + rejected alternatives in projects/<client>/brief.md
```

Record *why* a candidate was chosen or rejected. That note is the durable memory of
the design decision; it is what stops the next client drifting.

## Acceptance

- Any palette/font/style pulled from the corpus is logged in
  `projects/<client>/brief.md` with a one-line scene justification.
- Final contrast still meets `blueprints/02-seo-frontpage-matrix.md` a11y targets.
- `npm run check:design` passes (datasets intact).
- No corpus row is copied into `brand/` or `prompts/` — one rule, one owner. The
  corpus stays in `design-intelligence/`; only the chosen *value* lands in the project.
