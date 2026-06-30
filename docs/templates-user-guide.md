# Handleiding — werken met de template-collectie

Deze handleiding legt uit hoe je een premium landingspagina bouwt met de
template-collectie. Onthoud de kernregel: **een template is een startpunt, geen
eindproduct.** Het levert de skeletvorm; jouw scène maakt het uniek.

## Wat je nodig hebt

De zes velden uit de discovery (`prompts/00-discovery-master.md`):
`klantnaam`, `one thing`, `scene`, `proof`, `assets`, `CTA`. Ontbreekt er één? Leg een
expliciete aanname vast in `projects/<client>/brief.md` voordat je bouwt.

## Stap 1 — Kies je route

- **Template-route:** sneller, vanaf een bewezen narratief-skelet. Aanbevolen voor de
  meeste klanten.
- **Vrijhandse route:** volledig maatwerk vanaf `apps/_template-site`. Voor de meest
  veeleisende, unieke builds. Beide leiden tot één premium resultaat.

## Stap 2 — Kies een template op narratief-vorm

Open `templates/selection-guide.md` en match de **dominante boodschap-vorm** (beeld /
verhaal / product / autoriteit / urgentie / werk-tonen / missie / zintuiglijk) — niet de
branche. De scène kleurt de build; het template levert alleen de vorm.

Leg in `projects/<client>/brief.md` vast: gekozen template, de afgewezen runner-up en één
zin waarom de scène deze vorm draagt.

## Stap 3 — Lees de blueprint

Elke `templates/<naam>/blueprint.md` heeft dezelfde zeven secties: Wanneer te gebruiken ·
De Structuur · Visuele Stijl & Scène · Typografie · Motion · Assets · Self-Check. Lees ze
en gebruik de Self-Check als afvinklijst.

## Stap 4 — Bouw op de scène

- Het palet komt uit de **scène-belichting** (`blueprints/01-core-architecture.md`), niet
  uit het template. **De scène wint.**
- Motion via de template-tokens (`--ease-out`, `--ease-in-out`), transform/opacity-only,
  `prefers-reduced-motion` afgehandeld (`blueprints/07-motion-standards.md`).
- Assets: de vijf scene-afgeleide assets, geen stock. Vaste `width`/`height`, één `<h1>`,
  JSON-LD in de head.

## Stap 5 — Bewijs het

Bouw in `apps/<client>-site/` en draai `npm run check`. "Done" betekent bewezen:
de gate groen en `delivery.md` met echte evidence (geen `pending`).

## Veelgestelde vragen

**Voelt een template niet als minder maatwerk?** Nee — het template is alleen de vorm; de
scène-personalisatie is het premium werk. De klant krijgt een bewezen skelet én een unieke
scène.

**Mag ik secties weglaten of toevoegen?** Ja, mits het narratief klopt en de wetten
(één `<h1>`, JSON-LD, vaste mediadimensies, reduced-motion) overeind blijven.

**Geen passend template?** Bouw vrijhands. Het template-model is optioneel; de blueprints
en de scene-first wet niet.
