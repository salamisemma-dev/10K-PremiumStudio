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
