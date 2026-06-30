# TEMPLATE: Service-Agency

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die expertise en bewezen resultaten verkoopt: bureaus, consultants,
professionals. De vorm bepaalt de keuze, niet de branche.

## De Structuur (6 secties)

1. **Hero:** grote kernbelofte + korte subline.
2. **Diensten (3 kaarten):** icoon + kop (max 3 woorden) + korte omschrijving.
3. **Case-studies:** twee cases naast elkaar, elk met beeld, kop en een resultaat-cijfer.
4. **Team (optioneel):** kleine portretten met namen en functies.
5. **Werkwijze:** een stappenplan (3 stappen) met nummers en beknopte uitleg.
6. **CTA:** "Praat met ons" met knop of formulier.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een lichte, minimalistische kantoorruimte." — vervang door
  de klant-scène; de scène wint.
- **Palet & licht:** zacht/diffuus, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Koppen: groot, `font-bold`, `tracking-tight`. Body: `font-light`, `leading-relaxed`.
- Resultaat-cijfers: zeer groot, `font-black`, accent uit de scène. Tracking near-normal.

## Motion

- Tokens `--ease-out`/`--ease-in-out`; secties komen rustig in beeld; case-hover toont
  een extra laag; transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: geen in-beeld-verschuiving of hover-laag-animatie (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-beeld (kantoor/team), 2 case-beelden, 1 teamfoto, 1 korte intro-clip. Geen
stock-URL's; vaste `width`/`height`.

## Self-Check

- [ ] Is de expertise duidelijk en geloofwaardig, met één `<h1>`?
- [ ] Zijn de cases meetbaar en specifiek (harde cijfers)?
- [ ] Is de CTA laagdrempelig; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
