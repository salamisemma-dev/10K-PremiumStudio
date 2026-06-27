# External tools — optional aids, with their conflicts marked

Third-party SaaS tools that can help specific phases of a 10K build. None is wired into
the pipeline (they are paid/online services, out of scope for the offline-first gate);
they are referenced so the agent knows when one helps — and where it conflicts with the
studio discipline and must be left alone. The scene-first rule and the bans always win.

## khroma.co — AI color generator

- **What:** generates color palettes from an algorithm trained on colors *you* like.
- **Useful for 10K:** as a quick way to see OKLCH-adjacent combinations or check a hue
  against neighbors during the asset phase.
- **Conflict (leave it):** khroma picks color from *learned personal taste*. 10K derives
  color from the client **scene** (`blueprints/01` + `04`), never from taste. Do **not**
  use khroma to choose a site's palette. If consulted at all, treat output like a
  `design-intelligence` candidate: contrast sanity-check only, filtered by the scene.

## use.ai — background removal

- **What:** AI background removal / cutout for images.
- **Useful for 10K:** practical asset prep — clean cutouts, transparent product shots,
  isolating a subject before compositing into the one cinematic scene. Fits the
  5-asset pipeline in `prompts/01-visual-assets.md`.
- **Conflict:** none in principle. Caveat: a cutout must still match the single scene
  lighting (`brand/manifest.md` law 2). A floating, evenly-lit cutout pasted onto a
  cinematic scene breaks the lighting law — re-light or re-shoot, don't ship the mismatch.

## uizard.io — AI UI/mockup generator

- **What:** generates wireframes/mockups/UI from prompts or sketches.
- **Useful for 10K:** very early ideation only — blocking out where sections sit before
  the bespoke build.
- **Conflict (mostly leave it):** generic AI mockups are exactly the slop `05` bans
  (identical card grids, hero-metric template, eyebrow scaffolding). Never ship or
  directly translate a uizard mockup. If used, throw away the styling and keep only the
  rough information order, then design from the scene.

## Rule

These tools never override an owner. Color comes from the scene; layout comes from the
blueprints and the story; quality is proven by `npm run check`. An external tool's
output enters the project only as a candidate, logged with a scene justification in
`projects/<client>/brief.md`, the same as any `design-intelligence` row.

---

## Referenced agent-skills (optional, not wired)

Open skills worth knowing; none is installed into the pipeline. Use them as aids; the
10K gates remain the source of truth.

### vercel-labs/agent-skills (MIT)

- **web-design-guidelines** — review UI against Vercel's Web Interface Guidelines (a11y,
  focus, forms, perf, UX). Useful as a *second-opinion audit*, but it overlaps what 10K
  already enforces (`impeccable` + `check:ux` + `check:structure`). Run it ad hoc; do not
  duplicate its rules into the repo.
- **deploy-to-vercel / vercel-cli-with-tokens** — optional deploy path for finished
  client sites. Non-contradictory; deployment stays outside the offline-first gate.
- **writing-guidelines** — copy guidance; overlaps `prompts/02-copywriting.md` +
  `check:copy`. Reference only.

### Leonxlnx/taste-skill (MIT)

- **imagegen-frontend-web / -mobile, brandkit, image-to-code** — generate reference
  boards / brand frames with an image model, then build from them. Same role as the
  asset aids above: a candidate input to the scene, never a layout decision. The
  adopted craft rules from this skill (H1 line limit, gapless grid, hero bans) live in
  `blueprints/06-ux-principles.md`.

## Left out — contradicts 10K (do not adopt)

| Source | Item | Why it conflicts |
|---|---|---|
| JCodesMore/ai-website-cloner | `clone-website` (pixel-perfect clone) | Copies another site wholesale; explicitly drops a11y + SEO; the opposite of bespoke, scene-first, anti-slop. Only its inspection *method* is kept — `inspection-guide.md`. |
| Leonxlnx/taste-skill | `brutalist-skill` | Loud, aggressive — against "restraint before spectacle". |
| Leonxlnx/taste-skill | "NEVER Inter" font ban | Font is a scene + brand call; the corpus recommends Inter (same call as the impeccable `overused-font` ignore). |
| Leonxlnx/taste-skill | Python-driven random layout selection | 10K is scene-deterministic; randomized layout is not. |
| Leonxlnx/taste-skill | glass pill nav | Glassmorphism-as-default ban (`05`). |
| vercel-labs/agent-skills | react-best-practices, composition-patterns, react-native, react-view-transitions | Wrong stack — 10K is Astro/Tailwind/GSAP, not React. Adopting React patterns would damage the codebase. |
