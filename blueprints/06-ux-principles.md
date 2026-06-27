# Blueprint: UX Principles & Laws (uxhints integration)

## Goal

Translate the bite-sized UX principles from uxhints.com into concrete, testable rules
the studio applies on every site. These reinforce - never replace - the existing
laws: `01-core-architecture.md` (scene, hierarchy, motion), `03-design-laws.md`
(narrative, anchor, restraint), `05-craft-and-bans.md` (anti-slop bans). Where this
file and another blueprint overlap, the more specific one wins; nothing here loosens a
ban.

The testable subset is enforced by `npm run check:ux` (`checks/ux-lint.mjs`); the rest
is reviewer judgment.

## 1. UX laws (how people read interfaces)

- **Hick's Law** - more options, harder decisions. Max 2 primary CTAs per page; one
  primary action per section; nav under ~5 items. (Reinforces restraint.)
- **Jakob's Law** - users expect your site to work like the ones they already know.
  Familiar patterns for nav, forms, and CTAs unless a deviation clearly wins. Matches
  `brand/manifest.md` design law 6.
- **Miller's Law** - group content in small chunks (~5±2); don't dump long ungrouped
  lists. Supports the micro-narrative law.
- **Fitts's Law** - primary targets are large and easy to hit; min 44px touch height.
- **Aesthetic–Usability Effect** - craft buys trust, but never let polish hide a
  broken flow. Beauty serves the message (ties to `05`).
- **Peak–End Rule** - design the strongest moment and the final moment deliberately;
  the hero and the CTA carry disproportionate weight.
- **Confirmation Bias** - people seek evidence for what they already feel. Put proof
  (testimonials, numbers) right after the hero; match the audience's expectations;
  avoid claims that read as too good to be true. (Drives storytelling Akte 2–3.)
- **Nudge** - subtle cues steer choices. Use micro-interactions and placement to make
  the wanted action the easy one - never fake urgency or dark patterns.

## 2. Accessibility (a requirement, not a nicety)

- **Contrast** ≥ 4.5:1 body text, ≥ 3:1 large text. (Also caught by the impeccable
  gate + Lighthouse.)
- **Visible focus** on every interactive element (`:focus-visible`). Enforced by
  `check:ux`.
- **Alt text** on every image. (Enforced by `check:structure`.)
- **ARIA** labels on icons and non-standard controls; landmarks on regions.
- **Keyboard** reachability for all functionality.

## 3. Typography & readability

- Max **2 web font families** (one display, one text). Enforced by `check:ux`.
- Body line-height ≥ ~1.5 (`leading-relaxed`+). Enforced by `check:ux`.
- Body line length 65–75ch.
- Relative units (rem/em) for scale.
- Headlines: large, heavy, tight leading (`leading-none`/`leading-tight`).

> Deliberately **not adopted** from the source notes: "wide tracking on headings".
> It contradicts the adopted impeccable bans (`wide-tracking`,
> `extreme-negative-tracking`) and the display letter-spacing floor in `05`. Headline
> tracking stays near-normal; do not widen it. This is a left-on-the-table conflict.

## 3b. Layout & hero craft (taste-skill)

Net-new craft rules adopted from the taste-skill (Leonxlnx, MIT). They reinforce
restraint (`03`) and the bans (`05`); the contradictory parts of that skill are left
out (see `design-intelligence/external-tools.md`).

- **H1 two-to-three line rule.** A hero headline must never wrap to 4–6 lines. Use a
  wide container and a fluid clamp so the words flow horizontally
  (`clamp(3rem, 5vw, 5.5rem)`, `max-w-5xl`+). A six-line headline wall is a failure -
  reduce the size or widen the container, never narrow it. (Pairs with the
  `text-overflow` ban in `05` and Typographic Dominance in `03`.)
- **Gapless grids.** Bento / feature grids must not leave dead empty cells. Use
  `grid-auto-flow: dense` (`grid-flow-dense`) and verify spans interlock. Prefer 3–5
  intentional cells over 8 messy ones (also avoids the `identical card grids` ban).
- **Hero element bans.** No floating badge/stamp icons on the hero text, no pill-tag
  row under the hero, no raw stat block in the hero (the hero-metric tell, `05`). The
  hero carries one message and the visual anchor, nothing decorative.
- **Massive section spacing.** Sections read as distinct cinematic chapters
  (`py-32`/`py-48`-scale), never cramped - reinforces large section spacing (`01`).

> Left out from taste-skill (contradicts 10K): the "NEVER Inter" font ban (font is a
> scene + brand call, and the corpus recommends Inter), Python-driven random layout
> selection (10K is scene-deterministic), glass pill navs (glassmorphism ban, `05`),
> and the brutalist skill (loud - against restraint). Details in
> `design-intelligence/external-tools.md`.

## 4. Design process (discovery → proof)

1. **Discovery** - core message, audience, USPs (`prompts/00-discovery-master.md`).
2. **Strategy** - story structure (`prompts/03-storytelling.md`).
3. **Design** - scene → assets → palette (`01` + `04`), candidates filtered by scene.
4. **Build** - code to the architecture + bans.
5. **Verify** - `npm run check` (structure, design, copy, build, browser, Lighthouse,
   site, impeccable, ux).

## 5. User-centric rules for the agent

- If the audience is unclear, ask: "Who is the ideal visitor of this site?" Record the
  answer in `projects/<client>/brief.md`; do not assume.
- Base choices on client input, not generic assumptions.
- If a design choice does not serve the core message, cut it (distill).

## Self-check (run before delivery)

- [ ] ≤ 2 primary CTAs; one primary action per section (Hick).
- [ ] Every interactive element keyboard-reachable with a visible focus state.
- [ ] Every image has descriptive alt text.
- [ ] Contrast ≥ 4.5:1 (body) / 3:1 (large).
- [ ] ≤ 2 font families; body leading ≥ ~1.5; line length 65–75ch.
- [ ] Proof placed where the audience expects it (confirmation bias).
- [ ] `npm run check:ux` passes.

If any check fails, fix before delivery.
