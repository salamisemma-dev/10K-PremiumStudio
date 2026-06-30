# TEMPLATE: Hero-Immersive

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap waar één overweldigend beeld de hoofdrol speelt en tekst bijzaak is.
Past op elke branche met een sterke visuele scène — de vorm, niet het producttype, bepaalt
de keuze.

## De Structuur (5 secties)

1. **Hero (100vh):** full-screen scene-beeld of -video. Kop minimaal (max 3 woorden),
   zweeft als een watermerk. Eén subtiele CTA.
2. **The Reveal:** bij scrollen schuift de hero rustig weg; de kernboodschap fadet in.
3. **The Collection:** 2×2 grid van vier kenmerken; zachte hover-zoom.
4. **The Pivot:** een onverwachte wending — citaat of technisch detail.
5. **The Close:** minimalistische CTA met één actie.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een verlaten bergweg net na zonsondergang." — vervang door
  de klant-scène; de scène wint.
- **Palet & licht:** afgeleid van de scène-belichting (`blueprints/01`), niet van de branche.

## Typografie

- Hero-kop: zeer groot, `font-black`, `tracking-tight`, `leading-none` (tracking nooit
  verbreden — banned tell).
- Body: klein, `font-light`. Labels: `uppercase`, `tracking-widest`.

## Motion

- Tokens `--ease-out` / `--ease-in-out`; transform/opacity-only; hero langzame zoom (1.05→1.0);
  parallax subtiel; secties fade-up met stagger 30–80 ms.
- `prefers-reduced-motion`: parallax en zoom uit, content direct zichtbaar (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-beeld/-video, 2 kenmerk-beelden, 1 achtergrondgradiënt (lokale SVG), 1 logo/watermerk
(SVG). Geen stock-URL's; vaste `width`/`height`.

## Self-Check

- [ ] Is de hero visueel overweldigend zonder teveel tekst?
- [ ] Eén `<h1>`, JSON-LD aanwezig, mediadimensies vast?
- [ ] Werkt de pagina leesbaar zonder JavaScript en met reduced-motion?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
