# Master Discovery Transformer

## Goal

Convert the client discovery questionnaire into `projects/<client>/brief.md`.

If the client returned a `.docx`/`.pdf` rather than text, first convert it to markdown
with `npm run intake:convert -- <source> [out.md]` (optional markitdown bridge; graceful-skips if
not installed), then read the markdown. Markdown is the source of truth.

## Input Fields

- KLANTNAAM
- ELEVATOR PITCH
- HOOFDDOEL
- SFEER
- FILM SCENE
- WOW-FACTOR
- UNIEKE BEWIJSVOERING

## Output Fields

- `klantnaam`: from KLANTNAAM.
- `one thing`: distilled from ELEVATOR PITCH and HOOFDDOEL.
- `scene`: distilled from FILM SCENE and SFEER.
- `proof`: from UNIEKE BEWIJSVOERING.
- `assets`: the planned five-asset set or explicit assumptions.
- `CTA`: the desired action from HOOFDDOEL.

## Rule

If one of the six output fields is missing, write an explicit assumption in the brief before code starts.

## Route Map Output

When the intake suggests more than one visitor job, add a `Page Architecture` section to `brief.md` before build:

- Route:
- Visitor job:
- One route message:
- Proof needed:
- CTA:
- Why this cannot live on the landing page:

If the site remains one page, record that choice in one sentence. Extra pages are justified by user jobs, not by wanting the site to feel larger.
