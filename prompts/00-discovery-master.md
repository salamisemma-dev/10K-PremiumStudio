# Master Discovery Transformer

## Goal

Convert the client discovery questionnaire into `projects/<client>/brief.md`.

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
