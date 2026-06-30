# TEMPLATE: Event-Conference

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een boodschap die naar een datum of inschrijving toewerkt: conferenties,
lanceringen, workshops, festivals. De vorm bepaalt de keuze, niet de branche.

## De Structuur (6 secties)

1. **Hero:** eventnaam + datum + countdown-timer.
2. **Over het event:** korte beschrijving (max 3 zinnen) + sfeerbeeld/-clip.
3. **Sprekers:** grid van 4–6 met portret, naam en titel.
4. **Programma:** een eenvoudige tijdlijn (tijd, titel, spreker).
5. **Sponsors:** logo's in een horizontale balk.
6. **CTA:** "Registreer nu" met knop.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een groot podium met spotlights, nog leeg." — vervang door
  de klant-scène; de scène wint.
- **Palet & licht:** dramatisch contrast, afgeleid van de scène (`blueprints/01`), niet van de branche.

## Typografie

- Eventnaam: zeer groot, `font-black`. Datum: `uppercase`, `tracking-widest`.
- Tracking op de kop near-normal; datum-label mag wijd.

## Motion

- Tokens `--ease-out`; countdown updatet rustig (geen layout-jank); sprekers komen één
  voor één in beeld (stagger 30–80 ms); transform/opacity-only.
- `prefers-reduced-motion`: countdown toont cijfers zonder animatie, geen in-beeld-beweging (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-beeld/-clip (podium), 3 sprekerportretten, 1 eventlogo (SVG). Geen stock-URL's;
vaste `width`/`height`.

## Self-Check

- [ ] Is de urgentie duidelijk zonder te schreeuwen, met één `<h1>`?
- [ ] Zijn de sprekers geloofwaardig; JSON-LD (Event) aanwezig?
- [ ] Is de CTA prominent; reduced-motion + no-JS leesbaar (datum/tijd zichtbaar zonder JS)?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).
