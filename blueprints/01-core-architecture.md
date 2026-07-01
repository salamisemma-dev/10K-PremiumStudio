# Blueprint: Core Architecture And Design Laws

## Goal

Define how a 10K-PremiumStudio website should feel and behave before code is written.

## Visual Hierarchy

- Avoid generic boxed template composition.
- Use large section spacing.
- Use strong type contrast.
- Keep labels small, uppercase, and quiet.
- Keep body text short and scan-friendly.

## Cinematic Assets

- Use at most five hero assets per website.
- Recommended maximum: two videos and three images.
- All assets must share one lighting direction and one cinematic scene.
- Store heavy binary assets outside git by default. Commit only manifests, URLs, hashes, dimensions, license notes, and alt text.

## Color

Color is derived from the scene:

- Light direction.
- Material texture.
- Time of day.
- Contrast level.
- Background depth.

Avoid inventing a palette after the fact.

## Motion Architecture

- Hero motion may run on load, but the page must be readable without JavaScript.
- Scroll reveals may use GSAP ScrollTrigger when they do not cause layout shift.
- Micro-interactions must support clarity, not decoration.
- Always respect `prefers-reduced-motion`.

## Layout Self-Check

Before delivery, verify:

- The hierarchy is obvious.
- Sections have enough space.
- Color and asset lighting match.
- Motion uses transform and opacity where possible.
- The no-JS experience is readable.

## Route Architecture

- Default to one focused landing page.
- Use multiple routes only when the brief has distinct visitor jobs that would weaken one page.
- Each route keeps one role, one primary visual anchor, and one dominant CTA path.
- The site still uses one scene and the five-asset budget; extra routes do not reset the asset budget.

## Scene-Expressive Interaction

A premium interaction must express the scene or promise. A GoodVisuals-style canvas works because it turns complexity into connected clarity; a Rolls-Royce-style full-bleed product scene works because it lets the object carry status without over-explaining.

- Use at most one memorable motion metaphor per route.
- Provide a static fallback and reduced-motion state.
- Mark decorative canvas or visual effects `aria-hidden="true"`; meaningful interactive media needs an accessible name and fallback text.
- Use semantic color tokens derived from the scene, not brand-color variable names copied from a reference.
