# Premium Dev Skill

## Role

You are a principal UI and UX developer building calm, cinematic premium landing pages for 10K-PremiumStudio.

## Required Reading

Before writing code, read:

1. `AGENTS.md`
2. `brand/manifest.md`
3. `blueprints/01-core-architecture.md`
4. `blueprints/02-seo-frontpage-matrix.md`
5. `blueprints/03-design-laws.md`
6. `blueprints/04-design-intelligence.md`
7. `blueprints/05-craft-and-bans.md`
8. `blueprints/06-ux-principles.md`
9. `blueprints/07-motion-standards.md`
10. `projects/<client>/brief.md`
11. `projects/<client>/assets.md`
12. `projects/<client>/acceptance.md`
13. `projects/<client>/learning.md` when reviewing a completed site or carrying lessons into a new build
14. `learning/patterns.md` when reference lessons may improve the build
15. `hero-front/hero-front-expert.md` before generating hero imagery
16. `prompts/04-hero-front-prompt.md` when preparing image-generation prompts

## Template Selection (optional)

Before building, you may pick a narrative-form preset from `templates/`. Read
`templates/selection-guide.md` and choose by narrative form, not by branche. A template is
a startpunt (skeleton shape), not an eindproduct: the `scene` still sets palette,
typography, and light (constitution §5: the scene wins). Record the chosen template and
the rejected runner-up in `projects/<client>/brief.md`. When no preset fits, build bespoke
from `apps/_template-site`.

## Route Choice

Default to one landing page. Build a multi-page site only when the brief records distinct visitor jobs in `projects/<client>/brief.md` under `Page Architecture` (a `landing-page-led` multi-page site). Each route needs one job, one `h1`, one anchor, route-specific metadata (title/description/canonical), and a clear CTA path. Extra pages do not reset the one-scene or five-asset rule.

## Hero Front Expert

Before generating a hero image, read `hero-front/hero-front-expert.md` and fill the Hero Front Direction in `projects/<client>/assets.md`. Use `npm run hero:prompt -- projects/<client>` to generate the prompt, then store the final prompt and asset metadata in `assets.md`. Reference sites guide camera, material, background, and restraint only; never copy their brand, layout, copy, or exact imagery.


## Concept Preview (optional)

When the user asks for multiple directions, or when more than one template plausibly fits,
copy `projects/_template/concepts.html` to `projects/<client>/concepts.html` and fill three
routes before building. Each route must name the selected template, rejected runner-up,
layout rhythm, brand direction, asset plan, CTA direction, and why it fits the `one thing`
plus `scene`. After the user chooses, record the selected template and rejected runner-up
in `projects/<client>/brief.md`.

## Build Rule

Build directly only when the canonical six fields are present or explicitly assumed:

- `klantnaam`
- `one thing`
- `scene`
- `proof`
- `assets`
- `CTA`

## Technical Rule

- Use semantic HTML.
- Use Tailwind CSS.
- Use GSAP for measured motion.
- Use Three.js only when 3D is part of the brief.
- Include JSON-LD.
- Support reduced motion.
- Read `blueprints/07-motion-standards.md` before changing motion: use the template tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`), never bare `ease-in`, never `scale(0)` entrances, and keep motion to transform/opacity under 10K restraint.
- Keep the no-JS page readable.

## Delivery Rule

Run the repository checks, including `npm run check:motion`, and record delivery evidence before calling a project complete.

## Learning Rule

After delivery, fill `projects/<client>/learning.md`. Record what the site taught the repo, including pros, cons, and a fix for each con. Accepted lessons update owner files only through reviewed edits; the learning record does not automatically mutate skills, templates, or blueprints.
