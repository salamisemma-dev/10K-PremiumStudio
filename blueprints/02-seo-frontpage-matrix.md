# Blueprint: SEO And Frontpage Ranking Matrix

## Goal

Make every premium page technically legible to users, assistive technology, and search engines.

## Core Web Vitals

- The largest above-the-fold asset must be intentional and dimensioned.
- Use `fetchpriority="high"` only for the primary hero image when appropriate.
- Define width and height for media.
- Lazy-load media below the fold.
- Avoid animation that changes layout after load.

## Semantic Structure

- Exactly one `h1` per page.
- Use `header`, `nav`, `main`, `section`, and `footer`.
- Use list markup for proof points when scannability matters.
- Use descriptive link and button text.

## Structured Data

- Each site must include JSON-LD.
- Schema type must come from the client brief.
- Valid defaults: `WebSite`, `LocalBusiness`, `Product`, or `Service`.
- Include `name`, `url`, and `description`.

## Accessibility

- Every meaningful image needs unique alt text.
- Decorative media must be hidden from assistive technology.
- Interactive motion and canvas elements need accessible names.
- Reduced-motion users must receive a calm static experience.

## Content Order

1. Hero with the one thing.
2. Thesis and proof.
3. Feature details.
4. Call to action.

## Route-Level SEO

For multi-page sites, apply the matrix per route:

- Exactly one `h1` per route.
- Unique title and meta description per route.
- Canonical URL per route.
- JSON-LD strategy is explicit: one site-level entity plus route-specific `Service`, `Product`, `AboutPage`, `ContactPage`, or `WebPage` when useful.
- Navigation links are crawlable HTML links.
- Tables with proof data need captions or surrounding source context.
- Forms need named fields, labels, validation, privacy context, and a documented endpoint or recorded no-backend assumption.
