# TEMPLATE: Portfolio-Minimal

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap waar het werk zelf spreekt: fotografen, illustratoren, ontwerpers,
makers. De vorm bepaalt de keuze, niet de branche.

## De Structuur (4 secties)

1. **Hero:** één full-bleed beeld (geen tekst, klein logo in de hoek).
2. **Projecten (masonry grid):** 6–8 projecten; titel verschijnt bij hover.
3. **Over:** korte bio met portret en een citaat.
4. **Contact:** één regel met e-mail en social-iconen.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een galerij met witte muren, natuurlijk licht." — vervang
  door de klant-scène; de scène wint.
- **Palet & licht:** helder/uniform, afgeleid van de scène en het werk (`blueprints/01`),
  niet van een stijltrend.

## Typografie

- Projecttitels: rustig, `font-light`, `tracking-wide`. Bio: comfortabel `leading-loose`.
- Tracking near-normal; minimale concurrentie met de beelden.

## Motion

- Tokens `--ease-out`; projecten fade-in bij scroll; hover licht de titel op
  (transform/opacity); stagger 30–80 ms.
- `prefers-reduced-motion`: titels direct zichtbaar, geen fade/hover-beweging (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-beeld (sterkste werk), 3 projectbeelden, 1 portret. Geen stock-URL's; vaste
`width`/`height`.

## Self-Check

- [ ] Zijn de beelden het belangrijkste element, met één `<h1>` (bijv. de maker)?
- [ ] Is de navigatie minimaal en intuïtief?
- [ ] Voelt het rustig; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
