# Concept Preview Guide

Use `projects/_template/concepts.html` when the user wants multiple landing-page directions
or when the six-field brief could honestly fit more than one template.

The file is a **decision aid, not a final website**. It helps choose one route before any
production build starts in `apps/`.

## When To Use It

- The user asks for 3 sample landing page concepts.
- Template choice is ambiguous after reading `templates/selection-guide.md`.
- Brand direction, layout rhythm, or proof strategy needs to be compared visually.
- A client needs a lightweight preview before committing to one premium build.

## How It Works

1. Copy `projects/_template/concepts.html` to `projects/<client>/concepts.html`.
2. Fill the six fields in the header from `projects/<client>/brief.md`:
   `klantnaam`, `one thing`, `scene`, `proof`, `assets`, `CTA`.
3. Shape three different concepts. Each concept must include:
   selected template, rejected runner-up, layout rhythm, brand direction, asset plan,
   CTA direction, and why it fits the `one thing` plus `scene`.
4. Choose one route. Do not merge the three concepts into one overloaded site.
5. Record the selected template, rejected runner-up, and one scene-based reason in
   `projects/<client>/brief.md` before building.

## Design Rules

The preview may compare layout and brand mood, but it must not invent a second design
law. The scene still decides palette, typography mood, light, and motion restraint. The
five-asset rule still applies.

Keep the preview offline-first: no CDN, no remote fonts, no stock URLs, and no runtime
generator dependency. Use local placeholders, CSS shapes, or text notes until real assets
are approved.