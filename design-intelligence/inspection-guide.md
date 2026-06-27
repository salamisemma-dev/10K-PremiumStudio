# Reference-study guide — study to inform, never to clone

A method for inspecting a reference site so its *lessons* feed a bespoke, scene-first
10K build. Adapted from JCodesMore's website-inspection guide (MIT). The original is a
**pixel-perfect cloner**; that is rejected here. 10K never clones — cloning drops the
scene, the brand, accessibility, and SEO, and produces exactly the slop the studio
exists to avoid. Use this to learn structure and tokens, then design from the client
scene.

## Hard rule

Study a reference to understand *why* it works, then build something original for the
client's scene. Never reproduce a site's layout, copy, or identity. If the output
could be mistaken for the reference, it failed (the AI-slop test, `blueprints/05`).

## Phase 1 — Visual audit (what to capture)

- Screenshots: each breakpoint (desktop/tablet/mobile), key states (hover, active,
  open menu, modal), loading/empty/error states.
- Design tokens to read (not copy): color roles (bg, text primary/secondary/muted,
  accent, border, states), typography (family, size scale, weights, line-height,
  tracking), spacing scale, radius, shadows/elevation, breakpoints, icon system.

## Phase 2 — Component inventory

For each distinct component note: name, structure, variants, states (default/hover/
active/disabled/loading/error/empty), responsive behavior, interactions, animations.
This is a *vocabulary* exercise — what patterns exist — not a parts list to copy.

## Phase 3 — Translate into a 10K build (the part the cloner skips)

The cloner explicitly puts a11y and SEO "out of scope". 10K does the opposite:

1. Derive the palette from the client **scene** (`blueprints/01` + `04`), using the
   reference only to sanity-check contrast and rhythm.
2. Keep the section *roles* (`blueprints/03` micro-narrative + `prompts/03-storytelling`),
   not the reference's exact sections.
3. Apply the bans (`05`), UX laws (`06`), and motion standards (`07`) — the reference
   does not override them.
4. Prove it: `npm run check` (a11y, SEO, structure, impeccable, ux, motion).
5. Log what you studied and what you deliberately did differently in
   `projects/<client>/brief.md`.

## When to use

The discovery / reference-study step, when a client points at a site they admire. Pull
the lessons here, pair with `examples-*.md` and `npm run design:lookup`, then design
original work. Browser inspection needs a browser MCP; capture is manual and optional.
