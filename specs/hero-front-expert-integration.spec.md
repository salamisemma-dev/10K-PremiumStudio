---
id: hero-front-expert-integration
type: ai-workflow
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [learning-program-integration, design-intelligence-integration]
consumed_by: [premium-website-builder-skill]
---

## Intent

Add a Hero Front Expert layer that turns project facts into a precise image-generation prompt for an elegant, prestigious first viewport. The workflow studies Duten, Breakfast, Juice, Rolls-Royce, and GoodVisuals as references without cloning them.

## Contract

1. `hero-front/` owns the hero-front method and reference lessons.
2. `prompts/04-hero-front-prompt.md` owns the reusable prompt shape for Nano Banana Pro, ChatGPT image generation, or another image model.
3. `checks/hero-front-prompt.mjs` generates a prompt from `projects/<client>/brief.md` and `projects/<client>/assets.md` without writing files.
4. `projects/_template/assets.md` includes hero-front fields for subject, camera view, background, aspect ratio, text-safe area, and prompt storage.
5. `skills/premium-dev-skill.md` and `skills/premium-website-builder/SKILL.md` point to the Hero Front Expert before image generation.
6. Reference lessons must include pros, cons, and a fix for each con. References inform camera, material, pacing, and composition only.
7. Generated prompts must include camera view, subject, background, lighting, material/texture, composition, negative prompt, aspect ratio, mobile crop, and accessibility notes.
8. The prompt generator is wired into `package.json`, Bob validation, structure check, and CI.

## Business rules

- The client scene still wins. Hero Front Expert cannot override the six-field gate, brand rules, or blueprints.
- The output is a prompt and project artifact, not a generated image committed to git.
- The prompt must ban text baked into images, copied brand marks, generic stock imagery, and reference-site imitation.
- A hero image is not done until final dimensions, alt text, license or ownership, and load strategy are recorded.

## Verification

- `tests/hero-front-expert.test.mjs` - asserts docs, prompt contract, scripts, skill wiring, and project template fields.
- `checks/hero-front-prompt.mjs --selfcheck` - validates docs exist and generated prompt contains required sections.
- `scripts/bob_validate.mjs --strict .` - constitution + spec gate.