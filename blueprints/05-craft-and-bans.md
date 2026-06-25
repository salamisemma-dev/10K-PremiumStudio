# Blueprint: Craft Laws & Absolute Bans (impeccable integration)

## Goal

Adopt the objective, anti-slop craft rules from the open `impeccable` skill
(Paul Bakaus, Apache-2.0, v3.8.0) as enforceable 10K law, and wire its detector as a
quality gate. Take what reinforces the studio; **leave what contradicts it.** This
blueprint owns that decision and the detector's rule selection.

## Why impeccable fits

impeccable and 10K share one philosophy: refuse AI slop, commit to craft, derive
design from a concrete scene. impeccable even instructs "write one sentence of
physical scene before choosing a theme" — the same rule as
`blueprints/01-core-architecture.md`. So its objective rules *strengthen* the studio
rather than fight it. The detector turns several 10K design laws from prose into an
automated check.

## Adopted as law (the Absolute Bans)

These are now hard bans for every 10K site. The detector enforces them
(`npm run check:impeccable`); the reviewer enforces the rest by reading.

- **Side-stripe / one-side accent borders** (`side-tab`, `border-accent-on-rounded`).
- **Gradient text** (`background-clip: text` + gradient) (`gradient-text`).
- **Glassmorphism as default** decoration (`dark-glow`, glass patterns).
- **The hero-metric template** (big number + label + gradient) — SaaS cliché.
- **Identical card grids** and **nested cards** (`nested-cards`, `icon-tile-stack`).
- **Eyebrow / kicker on every section** (`hero-eyebrow-chip`, `repeated-section-kickers`).
- **Numbered section markers as default scaffolding** (`numbered-section-markers`).
- **Text that overflows its container** at any breakpoint (`text-overflow`).
- **Clipped dropdowns** in `overflow:hidden` stacking contexts (`clipped-overflow-container`).
- **Low contrast / gray-on-color** body text (`low-contrast`, `gray-on-color`).
- **Cramped padding, tight leading, monotonous spacing** (`cramped-padding`,
  `tight-leading`, `monotonous-spacing`).
- **Over-long line length** beyond 65–75ch (`line-length`).
- **Bounce / elastic easing**, **layout-property animation** (`bounce-easing`,
  `layout-transition`).
- **Cream/sand AI-default body background** unless the scene truly justifies it
  (`cream-palette`, `ai-color-palette`).
- **Copy tells**: em-dash overuse, marketing buzzwords, aphoristic cadence
  (`em-dash-overuse`, `marketing-buzzword`, `aphoristic-cadence`). These complement the
  existing `checks/copy-lint.mjs` "no em dash" rule.

Full contrast/typography/layout/motion guidance: see impeccable's General Rules; the
studio treats them as elaboration of `blueprints/03-design-laws.md`.

## Left out — contradicts 10K (do NOT adopt)

The studio's first law is **restraint before spectacle** and **color from the scene,
not from taste**. These impeccable commands push the opposite and are **out of
register** for 10K — do not offer or run them as part of the build:

| impeccable command | Why it conflicts with 10K |
|---|---|
| `bolder` | Amplifies impact/personality; 10K removes before it adds. |
| `overdrive` | "Push past conventional limits" (shaders, spring physics) vs measured, performance-preserved motion. |
| `delight` | Adds decorative personality; 10K motion must serve clarity, not delight. |
| `colorize` | Adds strategic color to monochrome UIs; 10K color is scene-derived, never added for vibrance. |

If a client scene genuinely calls for more energy, that is a **scene** decision made
through `blueprints/01` + `04`, not a generic "make it bolder" pass.

### Detector rules disabled (and why)

Set in `.impeccable/config.json` (`detector`):

- `designSystem.enabled: false` — the design-system-font/color/radius drift checks
  assume impeccable's `DESIGN.md` token system. 10K's source of truth is
  `brand/manifest.md` + the scene, so these would flag every site as "drift". Off.
- `overused-font`, `single-font` — impeccable flags Inter/Geist/etc. as overused and
  warns on single-family use. The `design-intelligence/` corpus deliberately
  recommends those faces, and one family in multiple weights is valid 10K typography.
  Enforcing impeccable's font-novelty opinion here would contradict the corpus, so
  these two rules are off. Font choice stays a scene + brand decision.

Everything else in the detector stays **on**.

## The aligned commands (use freely, they reinforce 10K)

`audit`, `critique`, `polish`, `distill`, `harden`, `clarify`, `adapt`, `optimize`,
`layout`, `typeset` — all reinforce restraint, clarity, and production quality. Use
impeccable directly for these when iterating; they sit downstream of the blueprints.

## Acceptance

- `npm run check:impeccable` passes (objective rules clean) before delivery.
- No out-of-register command output ships in a 10K site.
- Any intentional exception is recorded in `.impeccable/config.json` `ignoreValues`
  with a reason, not silently suppressed.
- The disabled-rule rationale above stays in sync with `.impeccable/config.json`.
