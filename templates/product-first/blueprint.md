# TEMPLATE: Product-First

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap waar één fysiek product centraal staat: alles draait om het
productbeeld en zijn varianten. De vorm bepaalt de keuze, niet de branche.

## De Structuur (5 secties)

1. **Hero:** één productbeeld full-screen (of 80vh) met de productnaam centraal.
2. **Kenmerken (3 kolommen):** drie iconen + kort label + één meetbaar feit.
3. **De Productlijn:** horizontale scroll-carrousel van 4 varianten met scroll-snap.
4. **Technische details:** minimalistische specificatie-lijst (alleen de kern).
5. **CTA:** "Bekijk de collectie" met een rustige animatie.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een marmeren tafel bij helder daglicht, één product." —
  vervang door de klant-scène; de scène wint.
- **Palet & licht:** afgeleid van de scène (`blueprints/01`), niet van het producttype.

## Typografie

- Productnaam: zeer groot, `font-black`, `tracking-tight`. Labels: `uppercase`, `tracking-wider`.
- Specificaties: monospace, klein. Tracking near-normal op koppen.

## Motion

- Tokens `--ease-out`; carrousel scroll-snap zonder overshoot; hover subtiele schaal
  (≤1.03); transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: geen hover-schaal of auto-scroll, content direct zichtbaar (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-productbeeld, 3 variant-beelden, 1 korte clip (product in gebruik). Geen stock-URL's;
vaste `width`/`height`.

## Self-Check

- [ ] Zijn de productbeelden topkwaliteit en scene-consistent?
- [ ] Is de carrousel soepel, toegankelijk en zonder bounce?
- [ ] Eén `<h1>`, JSON-LD (Product), reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
