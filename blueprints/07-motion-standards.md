# Blueprint: Motion Standards (Emil Kowalski integration)

## Goal

Give the studio precise, craft-grade motion rules — easing curves, durations,
physicality, interruptibility — so animations *feel right*, not just run. Distilled
from Emil Kowalski's animation standards (animations.dev, MIT). This deepens the
"performance-preserved motion" law in `03-design-laws.md` and the motion bans in
`05-craft-and-bans.md`; it does not loosen them.

The testable subset is enforced by `npm run check:motion` (`checks/motion-lint.mjs`);
the rest is reviewer judgement.

## Governing constraint (10K wins)

Where Emil says a rare/first-time element "can add delight", **10K restraint still
governs** (`brand/manifest.md`, `03`): a few memorable motion moments per page, never
constant motion. Adopt Emil's *technique* (how to animate well); keep 10K's *restraint*
(how much to animate). When unsure whether motion helps, delete it.

## Should it animate? (frequency)

| Frequency | Decision |
|---|---|
| 100+/day (keyboard, command palette) | No animation, ever |
| Tens/day (hover, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, celebration) | May add delight — within 10K restraint |

Valid purposes: spatial consistency, state indication, explanation, feedback,
preventing a jarring change. "It looks cool" on a frequently-seen element is not valid.

## Easing (adopted)

- Entering / exiting → **ease-out**. Moving / morphing → **ease-in-out**. Hover / color
  → **ease**. Constant (marquee, progress) → **linear**. Default → **ease-out**.
- **Never bare `ease-in` on UI** — it delays the moment the user watches most. Enforced
  by `check:motion`.
- Built-in easings are weak. Use the strong custom curves, shipped as tokens in
  `apps/_template-site/src/styles/global.css`:
  - `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
  - `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
  - `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`
- No overshoot/bounce curves (keeps the impeccable `bounce-easing` ban; bounce only for
  drag-to-dismiss / playful, ≤ 0.1–0.3, which 10K rarely uses).

## Duration (guide, not gated)

Button press 100–160ms · tooltips 125–200ms · dropdowns 150–250ms · modals/drawers
200–500ms. Emil's "UI < 300ms" rule is for app UI; **10K sites are marketing**, where
longer cinematic timing is legitimate — so duration is a review call, not a lint.

## Physicality (adopted)

- **Never `scale(0)`** — start from `scale(0.9–0.97)` + `opacity: 0`. Enforced by
  `check:motion`.
- **Origin-aware** popovers/dropdowns/tooltips scale from the trigger
  (`transform-origin: var(--radix-...)`), not center. Modals stay centered.
- **Press feedback**: `transform: scale(0.97)` on `:active`, ~160ms `--ease-out`.
  Shipped as a default in the template; reduced-motion drops it.

## Interruptibility & performance (adopted)

- Predetermined motion → CSS transitions / `@starting-style` / WAAPI. Dynamic,
  gesture-driven → springs (retarget from current velocity).
- Animate **`transform` + `opacity` only** (GPU). No layout props
  (`width/height/margin/padding/top/left`) — also an impeccable ban.
- Don't drive child transforms via a parent CSS variable (recalc storm); set transform
  on the element. Use full `transform` strings over Framer Motion `x`/`y` shorthands.

## Asymmetric timing & stagger (adopted)

- Slow where the user decides (a hold, a deliberate press), snap where the system
  responds.
- Stagger group entrances 30–80ms; stagger is decorative, never blocks interaction.

## Accessibility (adopted, with a 10K note)

- `prefers-reduced-motion`: reduce — keep opacity/color that aids comprehension, drop
  movement. Emil's "gentler, not zero". The reference template currently takes the
  stricter route (near-instant), which is acceptable for 10K's restraint; new sites may
  use the gentler approach. Either way, reduced motion must be handled — enforced by
  `check:motion`.
- Gate hover motion behind `@media (hover: hover) and (pointer: fine)`.

## Acceptance

- `npm run check:motion` passes (no `transition:all`, no bare `ease-in`, no `scale(0)`,
  reduced-motion handled).
- Motion uses `transform`/`opacity`, strong ease-out, scene-justified, within restraint.
- Attribution: motion standards + curves derive from Emil Kowalski / animations.dev
  (MIT). See `design-intelligence/ATTRIBUTION.md`.
