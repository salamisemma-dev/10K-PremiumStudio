# TEMPLATE: Culinary-Experience

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een zintuiglijke, sfeervolle boodschap: restaurants, reizen, wellness, food-merken.
De vorm bepaalt de keuze, niet de branche.

## De Structuur (5 secties)

1. **Hero:** een warm, full-screen sfeerbeeld met de naam en één regel belofte.
2. **Het Verhaal:** korte herkomst/filosofie naast een detailbeeld.
3. **De Gerechten/Ervaringen:** drie onthullingen, elk beeld + korte zintuiglijke tekst.
4. **Sfeer:** een brede beeld-strook (ruimte/ambiance).
5. **CTA:** "Reserveer" of "Boek je ervaring".

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een tafel bij kaarslicht, damp boven het bord." — vervang
  door de klant-scène; de scène wint.
- **Palet & licht:** warm, laag-contrast, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Koppen: elegant, groot (serif kan), `leading-tight`. Body: comfortabel, `font-light`.
- Tracking near-normal; rust boven decoratie.

## Motion

- Tokens `--ease-out`; gerecht-onthullingen fade-up bij scroll; subtiele zoom op
  sfeerbeeld (≤1.05); transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: geen zoom of fade-verschuiving, beelden direct zichtbaar (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-sfeerbeeld, 3 gerecht-/ervaringsbeelden, 1 korte sfeerclip. Geen stock-URL's;
vaste `width`/`height`.

## Self-Check

- [ ] Roept de hero direct sfeer en honger/verlangen op, met één `<h1>`?
- [ ] Zijn de teksten zintuiglijk en kort, geen marketing-cliché?
- [ ] JSON-LD (Restaurant/LocalBusiness) aanwezig; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
