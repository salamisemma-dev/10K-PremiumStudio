# Website Quality Checklist

Use this after automated checks.

## Browser

- Desktop layout inspected.
- Mobile layout inspected.
- Text does not overlap.
- CTA is visible and usable.
- Reduced-motion mode checked.
- No-JS page remains readable.

## SEO

- One `h1`.
- JSON-LD present.
- Schema type matches the project brief.
- Images have alt text.
- Media dimensions are fixed.

## Performance

- Hero asset is intentional.
- Below-fold media is lazy-loaded.
- Motion does not create layout shift.
- Heavy assets live outside git unless Git LFS is explicitly chosen.

## Delivery

- `npm run check` output captured.
- Screenshot paths recorded.
- Lighthouse result recorded when available.
- Open risks recorded.
