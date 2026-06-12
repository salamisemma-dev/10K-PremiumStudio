# Purpose

- Own reusable human intake templates.

## Ownership

- The Word questionnaire is an archived intake source, not implementation truth.
- `klant-website-discovery-vragenlijst.md` is the normalized human intake template.
- Normalized project facts must be written into `projects/<client>/`.

## Local Contracts

- Do not let templates override `projects/AGENTS.md`.
- If the questionnaire changes, update `prompts/00-discovery-master.md` and `projects/_template/brief.md` when the canonical mapping changes.

## Work Guidance

- Keep templates human-friendly.

## Verification

- `npm run check:structure`

## Child DOX Index

- `klant-website-discovery-vragenlijst.md` - Normalized markdown discovery questionnaire.
- `Klant-Website Discovery -Vragenlijst.docx` - Human discovery questionnaire.
