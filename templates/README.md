# Template-collectie — 10K-PremiumStudio

Twaalf **blueprint-presets** voor premium landingspagina's. Elk template is een
**startpunt, geen eindproduct**: het levert een bewezen *skeletvorm* (secties, ritme,
motion-patroon). De scène van de klant bepaalt vervolgens kleur, typografie en licht
(constitution §5 — *de scène wint*).

## Wat een template hier wél en niet is

- **Wel:** een narratief-skelet + sectie-ritme + motion-patroon dat je in de bestaande
  Astro-template (`apps/_template-site`) invult.
- **Niet:** een losse Tailwind-CDN-pagina, een stijl- of branche-thema, of een set
  stock-beelden. De studio blijft offline-first (§2) en scene-first (§5).

## Hoe gebruik je een template?

1. Schrijf eerst de **zes velden** (`klantnaam`, one thing, scene, proof, assets, CTA)
   via `prompts/00-discovery-master.md`.
2. Kies een template op **narratief-vorm** met `templates/selection-guide.md` — niet op
   branche. De scène kleurt de build; het template levert alleen de vorm.
3. Lees de `blueprint.md` van het gekozen template voor structuur, motion en self-check.
4. Bouw in `apps/<client>-site/` (kopie van `apps/_template-site`); houd de
   blueprint-wetten (`blueprints/01`–`07`) en de 5-asset-regel aan.
5. Bewijs met `npm run check`.

## Overzicht

| Map | Narratief-vorm | Kernkenmerk |
|-----|----------------|-------------|
| `hero-immersive` | Beeld eerst, tekst als watermerk | Full-screen hero + cinematische reveal |
| `narrative-driven` | Verhaal als een boek | Hoofdstukken, scroll-onthullingen |
| `product-first` | Eén product centraal | Minimal grid + variant-carrousel |
| `service-agency` | Expertise + bewijs | Krachtige typografie + case-studies |
| `saas-dashboard` | Product in actie | Productbeeld + geanimeerde data |
| `portfolio-minimal` | Werk spreekt | Full-bleed beelden, minimale tekst |
| `event-conference` | Urgentie + programma | Countdown, sprekers, tijdlijn |
| `culinary-experience` | Zintuiglijk, sfeer | Warme hero + gerecht-onthullingen |
| `ngo-mission` | Missie + impact | Probleem → bewijs → oproep |
| `consultant-authority` | Autoriteit + vertrouwen | Stelling, methode, resultaten |
| `art-gallery` | Beeld als ruimte | Galerie-ritme, veel witruimte |
| `video-3d-reveal` | Bewijs door beweging/ruimte | Video-led productbewijs + ruimtelijke reveal |

Zelf een template toevoegen? Volg de vaste vorm (zie elke `blueprint.md`) en breid
`selection-guide.md` + de test uit. Elke blueprint houdt dezelfde zeven secties.
