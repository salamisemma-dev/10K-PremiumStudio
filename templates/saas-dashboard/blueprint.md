# TEMPLATE: SaaS-Dashboard

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die een softwareproduct in actie toont: tech-startups, tools,
analytics. De vorm bepaalt de keuze, niet de branche.

## De Structuur (5 secties)

1. **Hero:** een productbeeld (full-width) met kop en subline.
2. **Features (3 kolommen):** drie kernfuncties met icoon en kort voordeel.
3. **Data in actie:** een geanimeerde grafiek of gesimuleerde demo (lokaal, CSS/GSAP).
4. **Integraties:** logo's van partners in een horizontale rij.
5. **CTA:** "Start gratis proef" of "Vraag een demo aan".

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een rustige, donkere kamer met één monitor." — vervang door
  de klant-scène; de scène wint.
- **Palet & licht:** gedimd met een lichte gloed, afgeleid van de scène (`blueprints/01`),
  niet van een tech-trend.

## Typografie

- Koppen: groot, `font-extrabold`, `tracking-tight`. Body: klein, `font-medium`.
- Tracking near-normal; geen verbrede letters.

## Motion

- Tokens `--ease-out`; grafiek vult bij scroll (transform/opacity, geen layout-thrash);
  features met stagger 30–80 ms.
- `prefers-reduced-motion`: grafiek toont eindstaat direct, geen vul-animatie (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-productbeeld (lokaal), 3 icoontjes (SVG), 1 korte demo-clip. Geen stock-URL's;
vaste `width`/`height`.

## Self-Check

- [ ] Is het product duidelijk zichtbaar, met één `<h1>` en JSON-LD?
- [ ] Zijn de voordelen meetbaar (bijv. "20% sneller")?
- [ ] Is de data-animatie crawlable; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
