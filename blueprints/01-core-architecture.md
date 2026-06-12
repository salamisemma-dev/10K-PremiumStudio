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
