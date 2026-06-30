# TEMPLATE: Video-3D-Reveal

> Blueprint-preset, geen eindproduct. Dit template levert de **skeletvorm**; de scène
> bepaalt kleur, typografie en licht (constitution §5). Offline-first, geen externe CDN
> of stock (§2). Motion via de template-tokens + reduced-motion (blueprint 07).

## Wanneer te gebruiken

Voor een propositie waar één scene-afgeleide video of ruimtelijke productdemo het bewijs
levert: een object, interface, venue, installatie of proces dat pas overtuigt wanneer je
het in beweging ziet. De vorm past alleen wanneer de video de *one thing* verduidelijkt;
als de video vooral sfeer is, kies `hero-immersive`.

## De Structuur (5 secties)

1. **Hero Frame:** één video/object centraal in een stabiel perspectiefvlak, met één H1
   en één primaire CTA. De poster/first frame is leesbaar zonder JavaScript.
2. **Spatial Reveal:** bij scrollen kantelt of verschuift het frame subtiel; copy legt de
   belofte bloot in maximaal drie korte claims.
3. **Proof Orbit:** drie bewijsdetails verschijnen rond het frame als vaste punten, nooit
   als losse decoratie.
4. **Mechanism Slice:** één doorsnede, workflow of before/after die uitlegt waarom het
   werkt.
5. **Still Close:** rustige CTA met een stil eindbeeld, zodat de pagina niet eindigt in
   beweging.

## Visuele Stijl & Scène

- **Scene-haak (voorbeeld):** "Een matzwart object draait langzaam onder koud studiolicht."
  Vervang dit door de klant-scène; de scène wint.
- **Diepte:** gebruik perspectief, schaduw en schaal als ruimtelijke taal. Geen generieke
  tech-glow; licht en materiaal komen uit de scène.

## Typografie

- Hero-kop: compact en stevig, `font-black`, `tracking-tight`, `leading-none`.
- Bewijslabels: klein, helder, `uppercase`, `tracking-widest`; bodytekst blijft rustig en
  functioneel naast de bewegende media.

## Motion

- Tokens `--ease-out` / `--ease-in-out`; transform/opacity-only; perspectiefreveal via
  `translate3d`, `rotateX`/`rotateY` of GSAP timelines binnen de bestaande app-stack.
- Video start nooit als verplichte contentpoort: tekst, CTA en bewijs blijven zonder
  JavaScript zichtbaar.
- `prefers-reduced-motion`: video toont poster/eindframe, scroll-kanteling uit, bewijs en
  CTA direct zichtbaar (verplicht).

## Assets (5 totaal, scene-afgeleid)

1 hero-video met poster, 1 stil product/proofbeeld, 2 detailbeelden, 1 logo/watermerk (SVG).
Geen stock-URL's; vaste `width`/`height`; video gecomprimeerd, lokaal gehost en optioneel
vervangen door poster bij reduced-motion.

## Self-Check

- [ ] Bewijst de video de *one thing*, of is het alleen sfeer?
- [ ] Blijft de pagina semantisch leesbaar zonder JavaScript en met reduced-motion?
- [ ] Eén `<h1>`, JSON-LD aanwezig, mediadimensies vast en geen extra asset-explosie?

---
Constitution: scène wint (§5) · offline-first, geen CDN/stock (§2) · motion via tokens + reduced-motion (blueprint 07) · JSON-LD + één H1 + vaste mediadimensies (§4).