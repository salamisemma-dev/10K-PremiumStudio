# TEMPLATE: Consultant-Authority

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die vertrouwen en autoriteit moet wekken: consultants, experts,
B2B-adviseurs. De vorm bepaalt de keuze, niet de branche.

## De Structuur (5 secties)

1. **Hero:** een scherpe stelling (de these van de expert) + korte onderbouwing.
2. **De Methode:** drie principes of stappen die de aanpak verklaren.
3. **Resultaten:** twee à drie cases met een hard cijfer per case.
4. **Over:** korte autoriteits-bio met portret en één bewijs (publicatie, award).
5. **CTA:** "Plan een gesprek" met één actie.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een rustige werkkamer, ochtendlicht op papieren." — vervang
  door de klant-scène; de scène wint.
- **Palet & licht:** ingetogen, zakelijk-warm, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Stelling-kop: groot, `font-bold`, `tracking-tight`. Cijfers: `font-black`, accent uit de scène.
- Body: rustig `leading-relaxed`. Tracking near-normal.

## Motion

- Tokens `--ease-out`/`--ease-in-out`; secties komen rustig in beeld; geen spektakel
  (autoriteit = restraint); transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: geen in-beeld-verschuiving, content direct zichtbaar (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-/sfeerbeeld, 1 portret (expert), 2 case-/bewijsbeelden, 1 logo-/publicatiestrook
(SVG). Geen stock-URL's; vaste `width`/`height`.

## Self-Check

- [ ] Is de stelling scherp en geloofwaardig, met één `<h1>`?
- [ ] Zijn de resultaten meetbaar en bronbaar?
- [ ] JSON-LD (Person/Organization) aanwezig; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
