# PvA — Template-collectie in 10K-PremiumStudio

**Doel:** een *curated* template-laag toevoegen die de snelheid van een
template-model combineert met de uniciteit van een vrijhandse build — zonder de
constitution, de scene-first wet of de craft-gates te verzwakken. De templates zijn
**blueprint-presets** voor de bestaande Astro-template (`apps/_template-site`), geen
losse pagina's.

**Aanpak (BOB):** bron (`10k Update 29-6-2026.md`) beoordeeld → spec
(`specs/templates-collection-integration.spec.md`) → `templates/`-laag (12
scene-first blueprints + selectiegids) → docs + voorbeeld → test-gate
(`tests/templates-collection.test.mjs` via `npm run test:templates`) → wiring in skill,
README en DOX → persist. Tegenstrijdig/​schadelijk laten liggen; bruikbaar gebouwd en
getest.

---

## Wat is opgeleverd

| Artefact | Pad |
|---|---|
| Master-overzicht + DOX-contract | `templates/README.md`, `templates/AGENTS.md` |
| Scene-first selectiegids (de scène wint) | `templates/selection-guide.md` |
| 12 template-blueprints | `templates/<naam>/blueprint.md` |
| Eindgebruikers-handleiding | `docs/templates-user-guide.md` (+ `docs/AGENTS.md`) |
| Voorbeeld-output (discovery → template → mapping) | `examples/hero-immersive-example.md` (+ `examples/AGENTS.md`) |
| Spec + test-gate | `specs/templates-collection-integration.spec.md`, `tests/templates-collection.test.mjs` |
| Wiring | `skills/premium-dev-skill.md`, `skills/premium-website-builder/SKILL.md`, `README.md`, `AGENTS.md`, `package.json` |

De 12 templates: `hero-immersive`, `narrative-driven`, `product-first`,
`service-agency`, `saas-dashboard`, `portfolio-minimal`, `event-conference`,
`culinary-experience`, `ngo-mission`, `consultant-authority`, `art-gallery`,
`video-3d-reveal`.

---

## Voor- en nadelen — met een fix op elk nadeel

### 1. Een template-laag toevoegen (snelheid + voorspelbaarheid)

- **Voor:** verkort de time-to-market drastisch. Elke site start vanaf een bewezen,
  hoogwaardig vertrekpunt; de studio kan meer klanten aan zonder kwaliteitsverlies.
- **Nadeel:** templates organiseren op product-type (saas, product, portfolio…) botst
  frontaal met constitution §5 — *de scène* bepaalt palet, type en motion, niet het
  producttype of een trend.
- **Fix:** templates zijn **structuur-presets, geen stijl-presets**. De selectiegids kiest
  op narratief-vorm (immersief / verhalend / product / autoriteit …), niet op branche;
  elke blueprint herhaalt expliciet "de scène bepaalt kleur/typografie/licht — dit
  template levert alleen de skeletvorm". De test eist die scene-wint-regel in de gids.

### 2. De templates als zelfstandige Tailwind-CDN-HTML leveren (zoals in het document)

- **Voor:** direct in een browser te openen, makkelijk te demonstreren.
- **Nadeel:** het brondocument laadt Tailwind + GSAP via CDN en gebruikt
  Unsplash/Pexels/Picsum-beelden. Dat breekt constitution §2 (offline-first, geen
  externe runtime-deps), de 5-asset-regel én `check:impeccable`/`check:motion`
  (`transition: all`, geen `prefers-reduced-motion`). `npm run check` zou falen.
- **Fix:** **niet als losse CDN-pagina's overgenomen.** De templates worden
  blueprint-presets voor de bestaande Astro-template (offline build, Tailwind 3 lokaal,
  GSAP devDependency, scene-assets i.p.v. stock). Geen enkel `cdn.tailwindcss.com`,
  `cdnjs…/gsap`, `unsplash`, `pexels` of `picsum` in de template-laag — de test bant
  ze. Zo blijven alle gates groen.

### 3. Motion en interactie uit de brontemplates

- **Voor:** kant-en-klare hover-, parallax- en stagger-patronen per template.
- **Nadeel:** de bron gebruikt `transition: all`, ongemarkeerde `ease`-curves en geen
  reduced-motion — exact wat `checks/motion-lint.mjs` en `05-craft-and-bans.md` blokkeren.
- **Fix:** elke blueprint verwijst naar `blueprints/07-motion-standards.md` en de
  template-tokens (`--ease-out`/`--ease-in-out`), schrijft transform/opacity-only,
  stagger 30–80 ms en **reduced-motion verplicht** voor. De techniek is overgenomen,
  de 10K-restraint regeert. De test eist de reduced-motion-vermelding per blueprint.

### 4. Het "het is maar een template"-gevoel bij de klant

- **Voor:** templates maken het aanbod tastbaar en uitlegbaar (een "showroom").
- **Nadeel:** klanten kunnen denken dat ze minder maatwerk/waarde krijgen dan de
  vrijhandse build.
- **Fix:** consequente framing als **blueprint, geen eindproduct**, in README,
  selectiegids en de eindgebruikers-handleiding: het template is het startpunt; de
  scène-personalisatie is het werk. Beide routes leiden tot één premium resultaat.

### 5. Een bibliotheek van 12 templates onderhouden

- **Voor:** brede dekking van veelvoorkomende narratief-vormen.
- **Nadeel:** onderhoudslast en risico op divergentie tussen blueprints (de ene mist een
  sectie die de andere wel heeft → drift).
- **Fix:** **één vaste blueprint-vorm** (Wanneer / Structuur / Visuele Stijl & Scène /
  Typografie / Motion / Assets / Self-Check + een constitution-regel). De test
  controleert die zeven secties in álle twaalf bestanden, zodat afwijking direct rood wordt.

### 6. Scope-uitbreiding richting docs/voorbeelden/marketing

- **Voor:** een handleiding en voorbeeld-output maken het systeem zelf-uitlegbaar.
- **Nadeel:** het brondocument bevat ook video-script, presentatie-outline en
  release-checklist — zwak toetsbaar marketing-materiaal dat de repo opzwelt.
- **Fix:** deze ronde levert alleen de **toetsbare** laag: templates + selectiegids +
  één handleiding + één voorbeeld, allemaal door de spec/test gedekt. Video/presentatie/
  release blijven bewust buiten scope (zie "Open punten").

---

### 7. AI-video / Emergent-style 3D als nieuwe bron

- **Voor:** de workflow maakt een sterk verkoopbaar patroon zichtbaar: één gegenereerde of
  geproduceerde video kan als bewijsdrager door een ruimtelijke landingpage heen lopen.
- **Nadeel:** als dit als tool-workflow wordt overgenomen, ontstaat een tweede stack en een
  afhankelijkheid van externe generators; dat botst met offline-first, scene-first en de
  template-definitie.
- **Fix:** alleen het herbruikbare narratief is geadopteerd als `video-3d-reveal`: een
  blueprint-preset voor video-led productbewijs met ruimtelijke reveal. Geen afhankelijkheid van Emergent, geen CDN, geen extra asset-explosie; bouwen blijft in `apps/_template-site`.

## Wat is bewust NIET overgenomen (geen schade)

- Losse Tailwind-CDN `index.html`-pagina's (breken offline-first + de gates).
- Stock-beeld-URL's (Unsplash/Pexels/Picsum) — assets blijven scene-afgeleid, 5-asset-regel.
- `transition: all`, bounce/overshoot-easing en reduced-motion-loze motion uit de bron.
- Video-script, presentatie-outline en release-checklist (marketing, niet toetsbaar — open punt).`n- Emergent als verplichte workflow of runtime-afhankelijkheid; het idee is alleen als narratieve vorm aangenomen.
- Een aparte "Template Architect" system-prompt: de selectiestap leeft in de bestaande
  skill-workflow + de selectiegids (één rol, één eigenaar).

## Hoe dit de studio krachtiger maakt

1. Snellere start per klant zonder de scene-first wet te verliezen.
2. Eén vaste blueprint-vorm voorkomt drift tussen presets.
3. Selectie op narratief-vorm houdt het premium en uniek (de scène kleurt elke build).
4. Spec + test borgen offline-first en restraint; geen CDN/stock sluipt binnen.

## Open punten

- Optioneel later: per template een echte Astro-sectievariant in `apps/_template-site`
  (nu blueprint-presets; de huidige template blijft de reference-build).
- Optioneel: video-script / presentatie-outline / release-checklist als losse,
  niet-gegate docs onder `docs/` wanneer daar vraag naar is.
