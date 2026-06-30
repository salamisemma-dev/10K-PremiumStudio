# TEMPLATE: Art-Gallery

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die beeld als ruimte/collectie presenteert: galerieën, exposities,
collecties, kunstenaars. De vorm bepaalt de keuze, niet de branche.

## De Structuur (4 secties)

1. **Entree (Hero):** één werk full-bleed, veel witruimte, minimale tekst.
2. **De Collectie:** een rustig galerie-ritme van werken met royale marges.
3. **Het Verhaal:** korte context bij de collectie of de kunstenaar.
4. **Bezoek/Contact:** openingstijden of contact in één regel.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Witte zaal, strijklicht langs de doeken." — vervang door
  de klant-scène; de scène wint.
- **Palet & licht:** neutraal met accenten uit de werken zelf, afgeleid van de scène
  (`blueprints/01`), niet van een stijltrend.

## Typografie

- Titels: rustig, `font-light`, `tracking-wide`. Body: minimaal, veel ademruimte.
- Tracking near-normal; typografie concurreert nooit met de werken.

## Motion

- Tokens `--ease-out`; werken fade-in bij scroll, traag en rustig; geen carrousel-spektakel;
  transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: werken direct zichtbaar, geen fade-beweging (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-werk, 3 collectiewerken, 1 ruimte-/contextbeeld. Geen stock-URL's; vaste
`width`/`height`.

## Self-Check

- [ ] Zijn de werken het onbetwiste middelpunt, met één `<h1>`?
- [ ] Is er genoeg witruimte en rust?
- [ ] JSON-LD (VisualArtwork/Event) waar passend; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
