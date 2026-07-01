# Hero Front Expert

The Hero Front Expert turns client facts into one precise image-generation prompt for the first viewport. It does not replace the website builder. It prepares the front image so the builder can create a calm, cinematic, premium hero with confidence.

## Inputs

Use project source files, in this order:

1. `projects/<client>/brief.md`: `klantnaam`, `one thing`, `scene`, `proof`, `CTA`, page architecture, reference lessons.
2. `projects/<client>/assets.md`: cinematic scene, lighting, color direction, texture, hero role, dimensions, alt text.
3. `brand/manifest.md` and `blueprints/01-core-architecture.md`: one scene, five assets, scene-derived color, restraint.
4. `hero-front/references.md`: reference roles to adopt or leave.

## Output Contract

Every hero-front prompt must include:

- Hero job: what the first viewport must make the visitor feel and understand.
- Subject: product, person, object, space, or abstract scene.
- Camera view: lens feel, distance, angle, crop, and focal priority.
- Background: environment, depth, negative space, and route use.
- Lighting: direction, contrast, temperature, reflection, and shadow behavior.
- Materials and texture: surface truth from the scene.
- Composition: placement, safe text area, CTA area, and mobile crop note.
- Motion implication: still image, subtle video loop, or no motion.
- Negative prompt: no clutter, no fake UI, no generic stock pose, no text baked into image, no copied reference brand cues.
- Accessibility and SEO notes: alt-text direction, fixed dimensions, load strategy.

## Reference Lessons

- Duten pattern: material object, restrained product confidence, detail harmony, finish as story.
- Breakfast pattern: large claim, energetic collage rhythm, cultural texture, bold but focused typography.
- Juice pattern: direct agency claim, high-contrast portfolio energy, clear work-first path.
- Rolls-Royce pattern: full-bleed prestige, sparse copy, slow composition, object carries status.
- GoodVisuals pattern: scene metaphor turns business promise into visual clarity.

## Pros, Cons, Fixes

- Pro: Better hero prompts make the first viewport feel custom instead of generic.
- Pro: Camera and background choices become explicit before image generation.
- Pro: The repo can ask for premium image assets without hardcoding a style.
- Con: A generator can produce formulaic prompts.
  Fix: Require scene-derived inputs and reference lessons to be adopted or rejected per project.
- Con: Reference inspiration can become imitation.
  Fix: Prompt must name what to avoid and must not copy exact brand, layout, copy, or visual metaphor.
- Con: Image models can bake text into the hero image.
  Fix: Negative prompt always bans text, logos, UI copy, and unreadable typography inside the image.
- Con: A beautiful hero can hurt accessibility or performance.
  Fix: Prompt output includes alt-text direction, fixed dimensions, safe text area, mobile crop, and load strategy.