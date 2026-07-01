# Prompt Blueprint: Hero Front Image

## Goal

Generate one precise first-viewport image prompt for a premium hero front. Use this before generating images in Nano Banana Pro, ChatGPT image generation, or another image model.

## Required Inputs

- `klantnaam`
- `one thing`
- `scene`
- `proof`
- `CTA`
- hero subject
- lighting
- material or texture
- chosen reference lesson
- rejected reference lesson

## Prompt Shape

Create a premium hero-front image for `[klantnaam]`.

Hero job: make the visitor understand `[one thing]` in one glance.

Subject: `[hero subject]`.

Camera view: `[lens feel]`, `[distance]`, `[angle]`, `[crop]`, with the focal point placed for a clear text-safe area.

Background: `[scene background]`, with depth, calm negative space, and no distracting objects.

Lighting: `[lighting]`, scene-derived color temperature, controlled reflections, realistic shadows.

Materials and texture: `[material or texture]`, tactile detail, premium finish, no artificial gloss unless the scene justifies it.

Composition: first viewport, 16:9 desktop master, 4:5 mobile crop safe, CTA area preserved, no text baked into the image.

Motion implication: `[still image or subtle loop]`; motion must be optional and readable as a static frame.

Reference influence: adopt `[chosen reference lesson]`; reject `[rejected reference lesson]`.

Negative prompt: no stock-photo smile, no fake UI, no random props, no generic luxury car cues unless the client sells cars, no copied brand marks, no text, no watermarks, no low-resolution artifacts, no clutter.

Accessibility notes: write alt text from the final image, fix width and height, preload only if this is the primary hero image.

## Output Rule

A generated hero prompt is project data. Store it in `projects/<client>/assets.md` under the hero asset row or in a project-specific asset note.