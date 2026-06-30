# Template-selectiegids

Kies een template op **narratief-vorm**, niet op branche. Een NGO kan een
`hero-immersive` zijn; een autobedrijf kan `narrative-driven` zijn. **De scène wint
altijd** (constitution §5): het template levert de skeletvorm, de scène bepaalt kleur,
typografie en licht. Twijfel je tussen twee? Kies de vorm die het dichtst bij de
*one thing* en de *scene* van de klant ligt.

## Beslisvolgorde

1. Lees de zes velden in `projects/<client>/brief.md` (vooral `one thing` en `scene`).
2. Bepaal de **dominante boodschap-vorm** (beeld / verhaal / product / beweging / autoriteit /
   urgentie / werk-tonen / missie / zintuiglijk).
3. Match die vorm hieronder. Pas daarna kleur/typografie/motion aan op de scène —
   nooit andersom.

## Matrix (vorm → template)

| Als de boodschap vooral… | Kies | Omdat |
|---|---|---|
| draait om één overweldigend beeld, tekst is bijzaak | `hero-immersive` | hero domineert, tekst als watermerk |
| een verhaal/transformatie vertelt | `narrative-driven` | hoofdstukken + scroll-onthullingen |
| één fysiek product centraal zet | `product-first` | productbeeld + varianten |
| expertise en bewezen resultaten verkoopt | `service-agency` | diensten + case-studies |
| een softwareproduct in actie toont | `saas-dashboard` | productbeeld + data-animatie |
| het werk zelf laat spreken | `portfolio-minimal` | full-bleed beeld, minimale tekst |
| naar een datum/inschrijving toewerkt | `event-conference` | countdown + programma |
| zintuiglijk en sfeervol is (eten, reizen, wellness) | `culinary-experience` | warme reveals, sfeer |
| een missie en impact centraal zet | `ngo-mission` | probleem → bewijs → oproep |
| vertrouwen en autoriteit moet wekken | `consultant-authority` | stelling, methode, resultaten |
| beeld als ruimte/collectie presenteert | `art-gallery` | galerie-ritme, witruimte |
| bewijs levert via beweging, demo of ruimtelijke reveal | `video-3d-reveal` | video/object centraal, proof-punten rond de beweging |

## Na de keuze (verplicht)

- Leg in `projects/<client>/brief.md` vast: gekozen template, de afgewezen runner-up, en
  één zin waarom de scène deze vorm draagt.
- Personaliseer op de scène: het palet komt uit de scène-belichting
  (`blueprints/01-core-architecture.md`), niet uit dit template. **De scène wint.**
- Geen template past? Bouw vrijhands vanaf `apps/_template-site` — het template-model is
  optioneel, de blueprints en de scene-first wet niet.
