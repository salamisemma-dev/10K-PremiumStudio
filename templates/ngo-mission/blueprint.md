# TEMPLATE: NGO-Mission

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die een missie en impact centraal zet: NGO's, goede doelen, sociale
ondernemingen. De vorm bepaalt de keuze, niet de branche.

## De Structuur (5 secties)

1. **Hero:** een mensgericht beeld + de missie in één zin.
2. **Het Probleem:** één scherp feit/cijfer dat de urgentie toont.
3. **De Aanpak:** drie stappen of pijlers, kort en concreet.
4. **Het Bewijs:** meetbare impact (cijfers) + een getuigenis.
5. **CTA:** "Doe mee" / "Doneer" met één heldere actie.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Ochtendlicht over een gemeenschap aan het werk." — vervang
  door de klant-scène; de scène wint.
- **Palet & licht:** eerlijk, warm-natuurlijk, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Koppen: helder, `font-bold`. Cijfers: groot, `font-black`, accent uit de scène.
- Body: leesbaar, `leading-relaxed`. Tracking near-normal.

## Motion

- Tokens `--ease-out`; secties fade-up; cijfers tellen rustig op bij scroll (geen jank);
  transform/opacity-only; stagger 30–80 ms.
- `prefers-reduced-motion`: cijfers tonen eindwaarde direct, geen verschuiving (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-beeld (mensen), 2 impact-/veldbeelden, 1 portret (begunstigde/vrijwilliger),
1 korte clip. Geen stock-URL's; vaste `width`/`height`.

## Self-Check

- [ ] Is de missie in één zin helder, met één `<h1>`?
- [ ] Zijn de impact-cijfers eerlijk en bronbaar?
- [ ] Is de doneer/doe-mee-CTA wrijvingsloos; reduced-motion + no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
