# Examples library — huly.io & motionsites.ai, mapped to 10K laws

Two motion-rich references. huly.io is restrained, enterprise-dark, whitespace-led —
mostly aligned with the studio. motionsites.ai is a motion-driven template gallery —
useful for *technique*, but much of its spectacle hits the adopted bans
(`blueprints/05-craft-and-bans.md`). Each pattern below is marked **adopt** (use it),
or **leave** (contradicts restraint / a ban). The scene + design laws always decide.

> Both sites were read directly. Patterns are technique notes, not pixel copies —
> verify against the live site and re-derive values from the client scene.

---

## Source A — huly.io (dark enterprise SaaS, restrained)

| Pattern | Verdict | 10K law it serves | Backing / how to apply |
|---|---|---|---|
| Generous negative space between sections | **adopt** | Large section spacing (`01`), restraint (`03`) | Keep big vertical rhythm; vary it (`monotonous-spacing` ban) |
| Scroll-triggered progressive reveals | **adopt** | Performance-preserved motion (`03`) | GSAP ScrollTrigger on `transform`/`opacity`; reveal an already-visible default; honor `prefers-reduced-motion` |
| Minimal, focused CTAs (not aggressive) | **adopt** | Hick's Law (`06`), micro-narrative action | Max 2 primary CTAs; one per section |
| Product-screenshot-led credibility | **adopt** | Visual anchor (`01`/`03`), confirmation bias (`06`) | One strong anchor image per section, fixed `width`/`height`, lazy below fold |
| Sticky nav with dropdowns | **adopt (carefully)** | Jakob's Law (`06`) | Compensate body padding (`ux-guidelines` sticky rule); keep nav < ~5 items |
| Icon + text feature cards | **adopt sparingly** | Miller's Law (`06`) | Avoid `identical card grids` + `nested-cards` (`05`); vary, or use leading numbers only when a real sequence |
| Exclusively dark mode "because SaaS" | **leave** | Color from scene, not category (`01`, `04`) | Dark is a *scene* decision, not a default. Write the scene sentence; let it force light/dark |
| Subtle gradient background accents | **adopt (low dose)** | Restraint (`03`) | Soft, single-hue, scene-derived; never `gradient-text`, never the cream-default (`05`) |

**Net:** huly is close to the 10K register. Borrow its spacing, restrained reveals,
and screenshot-anchored sections almost directly; just keep dark/color a scene call.

---

## Source B — motionsites.ai (motion-driven, mixed register)

| Pattern | Verdict | Reason |
|---|---|---|
| Staggered scroll-reveal entrance timing | **adopt** | Legitimate per impeccable (stagger within a list is fine); use `transform`/`opacity`, reduced-motion fallback |
| Cinematic full-screen scroll sequences (synced text + bg) | **adopt (one moment)** | Matches "one cinematic scene"; one memorable motion moment per page (`03`), not constant |
| Video preview loop, autoplay on hover | **adopt** | Fits the 5-asset rule (≤2 videos); muted, lazy, with a static poster for reduced-motion |
| Hover lift / subtle scale on cards | **adopt (subtle)** | Micro-interaction for clarity; keep small, ease-out (no bounce/elastic — `05`) |
| Gradient color-shift transitions | **leave** | Decorative; drifts toward `gradient-text` / glow tells; color must come from the scene |
| Glassmorphism / frosted reveals | **leave** | `glassmorphism as default` is an absolute ban (`05`); rare + purposeful or nothing |
| Cursor-following interactive elements | **leave** | Spectacle, not clarity; conflicts with restraint and reduced-motion |
| 3D depth / perspective for show | **leave** | Three.js only when 3D has a real purpose (`brand/manifest.md`), not as decoration |
| Dense template gallery, many CTAs | **leave** | Conflicts with Hick's Law + one-message focus |

**Net:** motionsites is a technique catalogue. Take the performant motion primitives
(staggered reveal, hover-scale, one cinematic scroll sequence, hover-play video);
discard the gradient/glass/cursor/3D spectacle — it is exactly what 10K removes.

---

## Reusable motion checklist (from both, 10K-safe)

- Animate `transform` + `opacity` only (no layout-property animation — `05`).
- Ease-out (quart/quint/expo); no bounce, no elastic.
- One to a few memorable motion moments per page, not constant motion (`03`).
- Reveals enhance an already-visible default; never gate content on a transition.
- Every animation has a `prefers-reduced-motion: reduce` fallback (crossfade/instant).
- Video: muted, lazy, static poster; counts toward the 5-asset budget.

## How to use

1. Pick the register: product/app site ≈ huly (restrained dark, screenshots); cinematic
   marketing ≈ one motionsites-style scroll sequence over a scene.
2. Adopt only the rows marked **adopt**; the **leave** rows are recorded conflicts.
3. Pull supporting values with `npm run design:lookup` and verify with
   `npm run check:impeccable` + `npm run check:ux`.
4. Log chosen patterns + rejected ones in `projects/<client>/brief.md`.
