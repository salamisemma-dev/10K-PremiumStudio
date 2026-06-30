# TEMPLATE: Narrative-Driven

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die een verhaal of transformatie vertelt: een reis van probleem naar
oplossing. De vorm — niet de branche — bepaalt de keuze.

## De Structuur (4 secties + epiloog)

1. **Proloog (Hero):** rustige achtergrond, een intrigerende vraag als kop (max 5 woorden).
2. **Hoofdstuk 1 — Het Probleem:** één zin + een cijfer of citaat, met ingetogen beeld.
3. **Hoofdstuk 2 — De Oplossing:** drie kernvoordelen als opeenvolgende scroll-onthullingen.
4. **Hoofdstuk 3 — Het Bewijs:** een getuigenis of case in veel witruimte.
5. **Epiloog (CTA):** een zachte uitnodiging, zonder druk.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een bibliotheek bij schemering, één lamp op tafel." —
  vervang door de klant-scène; de scène wint.
- **Palet & licht:** laag contrast, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Koppen: groot, elegant (serif kan), `leading-tight`. Body: comfortabel `leading-relaxed`.
- Citaten: `italic`, `font-light`, linkerrand. Tracking near-normal.

## Motion

- Tokens `--ease-out`; elk hoofdstuk fade-up (y 40→0); subtiele achtergrond-gradient-shift;
  stagger 30–80 ms; transform/opacity-only.
- `prefers-reduced-motion`: onthullingen direct zichtbaar, geen y-verschuiving (verplicht).

## Assets (5 totaal, scene-afgeleid)

2 sfeerbeelden, 1 illustratie (lokale SVG), 1 portret (oprichter), 1 korte sfeerclip.
Geen stock-URL's; vaste `width`/`height`.

## Self-Check

- [ ] Is het verhaal logisch en meeslepend, met één `<h1>`?
- [ ] Zijn de overgangen tussen hoofdstukken vloeiend en crawlable (geen JS-gate)?
- [ ] Reduced-motion en no-JS leesbaar?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
