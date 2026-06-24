# Examples library — patterns mapped to 10K design laws

Curated reference patterns from two sources the studio was asked to study. Each
pattern is mapped to the design law it serves and the corpus row that backs it, so an
agent can reach for a proven move instead of improvising.

> Provenance note: 21st.dev was read directly. `savethedategw.my.canva.site` is a
> Canva-hosted, JavaScript-rendered single page — its DOM is not machine-readable via
> fetch (returns only "Invitation"). The patterns below describe the **editorial
> save-the-date archetype** it represents; verify against the live page in a browser
> before copying exact values.

---

## Source A — 21st.dev (component-first, "crafted, not AI slop")

A curated React/Tailwind component marketplace. What it teaches the studio:

| Pattern observed | 10K law it serves | Corpus backing | How to apply |
|---|---|---|---|
| Component-first, flat hierarchy; categories over visual noise | Restraint before spectacle (`03`) | `styles.csv` → Minimalism & Swiss | Build sections from a small set of strong primitives; resist decorative chrome |
| Hero states value in one italic line ("Build something *beautiful*") | Typographic dominance (`03`) | `typography.csv` → Classic Elegant | One dominant H1, one accent word; everything else quiet |
| Section taxonomy: hero, pricing, testimonials, footer as discrete blocks | Micro-narrative (one role per section, `03`) | `landing.csv` → Hero + Testimonials + CTA | Give each section exactly one job; sequence per `landing.csv` |
| "Crafted, not AI slop" positioning | Brand law: delete over add (`brand/manifest.md`) | `ui-reasoning.csv` anti-patterns | Fewer, intentional moves read as premium; volume reads as cheap |
| Component categories (forms, feedback, data display, navigation) | Visual anchor + clarity (`03`) | `ux-guidelines.csv` (navigation, states) | Lift interaction patterns (sticky nav padding, active states) from `ux` rows |

**Reusable section moves from 21st.dev's catalog** worth keeping in the studio's
vocabulary: sticky-nav with compensating body padding, feature-card hover lift,
testimonials carousel before the final CTA, pricing comparison block. Pull the exact
do/don't from `npm run design:lookup -- ux <topic>` and `-- landing <topic>`.

---

## Source B — editorial save-the-date archetype (savethedategw)

The premium wedding-invite archetype: photography-led, generous whitespace, large
display serif, soft neutral palette, a single RSVP/Invitation CTA, restrained motion.
This is the same family as a 10K cinematic landing page — one scene, one message.

| Archetype trait | 10K law it serves | Corpus backing | Concrete value |
|---|---|---|---|
| Large display serif + clean body | Typographic dominance (`03`) | `typography.csv` #1 Classic Elegant | Playfair Display + Inter (`@import ...Playfair+Display...&family=Inter`) |
| Script accent for the names/date | Visual anchor (`03`) | `typography.csv` #46 Wedding/Romance | Great Vibes (display only) + Cormorant Infant — use sparingly, one moment |
| Soft, warm neutral palette | Color from scene, not taste (`01`) | `colors.csv` #32 Beauty/Spa, #4 E-commerce Luxury | Soft pink/lavender OR premium off-white + muted gold (`#FAFAF9` / `#A16207`) |
| Full-bleed hero photo, one lighting direction | Cinematic assets, 5-asset rule (`01`, brand) | — | One hero image, fixed `width`/`height`, `fetchpriority="high"` |
| Generous spacing, single column | Restraint (`03`), large section spacing (`01`) | `landing.csv` #4 Minimal Single Column | Center, large CTA, 3-max benefit bullets, no nav clutter |
| Subtle fade/parallax only | Performance-preserved motion (`03`) | `ux-guidelines.csv` (smooth scroll) | `transform`/`opacity` only; honor `prefers-reduced-motion` |
| One CTA: "Invitation" / RSVP | Micro-narrative closes with action (`03`) | `landing.csv` CTA placement | Single deep CTA, high contrast (≥7:1) |

**Scene-first reminder:** for a real wedding client the palette comes from *their*
scene (venue light, season, materials) — the corpus rows above are the contrast/font
safety net, not the decision. See `blueprints/04-design-intelligence.md`.

---

## How to use this file

1. Identify the client's closest archetype (component SaaS ≈ Source A; editorial /
   event / luxury ≈ Source B).
2. Pull the backing corpus rows with `npm run design:lookup`.
3. Filter every candidate through `blueprints/03-design-laws.md` and the scene.
4. Log the chosen pattern + rejected alternatives in `projects/<client>/brief.md`.
