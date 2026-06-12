# Purpose

- Own durable design, motion, SEO, accessibility, and performance architecture.

## Ownership

- `01-core-architecture.md` owns visual hierarchy, asset discipline, color, and motion.
- `02-seo-frontpage-matrix.md` owns semantic structure, schema, Core Web Vitals, and ranking structure.
- `03-design-laws.md` owns the compact design decision laws for narrative, visual anchors, type, restraint, and performance-preserved motion.

## Local Contracts

- Do not place client-specific decisions here.
- Do not duplicate prompt formulas here.
- Any implementation that changes design or SEO rules must update this folder first.

## Work Guidance

- Keep rules testable where possible.
- Prefer named constraints over taste-only guidance.

## Verification

- `npm run check:structure`
- `npm run check:copy`

## Child DOX Index

- `01-core-architecture.md` - Visual, asset, color, and motion architecture.
- `02-seo-frontpage-matrix.md` - SEO, semantics, accessibility, and performance matrix.
- `03-design-laws.md` - Compact design laws that strengthen premium decisions without trend drift.
