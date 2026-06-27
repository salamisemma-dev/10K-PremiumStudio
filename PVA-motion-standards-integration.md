# PvA — Emil Kowalski motion standards in 10K-PremiumStudio

**Doel:** de studio craft-grade motion geven (easing, duur, fysica, interruptibility)
uit Emil Kowalski's animation standards (animations.dev / emilkowalski/skills, MIT),
zonder de bestaande restraint-wetten of de motion-bans te verzwakken.

**Aanpak (BOB):** recall → spec (`specs/motion-standards-integration.spec.md`) →
blueprint 07 + herbruikbare code in de template → motion-lint gate → test → persist.
Bron beoordeeld; tegenstrijdig/​schadelijk laten liggen; bruikbaar gebouwd en getest.

---

## Wat is opgeleverd

| Artefact | Pad |
|---|---|
| Motion-standaarden als wet | `blueprints/07-motion-standards.md` |
| Sterke easing-curves + press-feedback (echte code) | `apps/_template-site/src/styles/global.css` |
| Motion-lint gate | `checks/motion-lint.mjs` → `npm run check:motion` |
| Spec + test | `specs/motion-standards-integration.spec.md`, `tests/motion-standards.test.mjs` |
| Attributie (MIT) | `design-intelligence/ATTRIBUTION.md` + blueprint 07 |

---

## Voor- en nadelen — met een fix op elk nadeel

### 1. Emil-standaarden adopteren als 10K-wet

- **Voor:** verheft "performance-preserved motion" (`03`) van vaag naar precies —
  ease-out voor enter/exit, geen `scale(0)`, GPU-only, origin-aware, asymmetrisch,
  stagger 30–80ms. Agents kiezen niet meer de verkeerde easing.
- **Nadeel:** Emil is permissiever ("delight" op zeldzame elementen, springs, 3D,
  clip-path) dan 10K's "restraint before spectacle". Risico: agents grijpen de
  spectacle-technieken en de kalme identiteit vervlakt.
- **Fix:** governing-constraint vastgelegd in blueprint 07 + spec: **10K-restraint
  wint**. Adopteer de *techniek* (hoe goed animeren), behoud de *restraint* (hoeveel).
  "Bij twijfel: verwijder de animatie." Getest (`motion-standards.test` eist die regel).

### 2. Easing-curves + press-feedback in de template zetten (echte code)

- **Voor:** de studio levert nu Emil-grade interactie-defaults: sterke
  `--ease-out/--ease-in-out/--ease-drawer` tokens + subtiele `:active` scale(0.97).
  Concreet "kloon de nodige code", direct bruikbaar in elke site.
- **Nadeel:** overshoot-curves zouden de impeccable `bounce-easing`-ban kunnen breken;
  een globale `:active`-transform kan op touch of bij reduced-motion ongewenst zijn.
- **Fix:** gekozen curves hebben **geen overshoot** (y ≤ 1) — de test verifieert dit
  per `cubic-bezier`. Press-feedback wordt uitgezet onder `prefers-reduced-motion`.
  `check:impeccable` + `check:ux` blijven groen.

### 3. Motion-lint als gate toevoegen

- **Voor:** objectieve fouten (`transition:all`, bare `ease-in`, `scale(0)`, ontbrekende
  reduced-motion) worden automatisch geblokkeerd vóór oplevering.
- **Nadeel:** valse positieven konden de marketing-aard van 10K raken — Emil's
  "<300ms UI" duurregel zou legitieme cinematische timing afkeuren; een naïeve
  `ease-in`-regex matcht `ease-in-out`.
- **Fix:** **duur wordt NIET gegate** (review-only; marketing mag langer). De regex
  gebruikt een negatieve lookahead zodat `ease-in-out` niet matcht. Gate draait op de
  template = groen, geen valse fail.

### 4. Reduced-motion: Emil "zachter, niet nul" vs 10K template "vrijwel nul"

- **Voor:** Emil's nuance (opacity/kleur behouden, beweging weg) is toegankelijker en
  comfortabeler.
- **Nadeel:** de template zet nu álle animatie vrijwel op nul; dat botst licht met
  Emil's voorkeur. Het template wijzigen kan gedrag/breuk veroorzaken.
- **Fix:** **niet geforceerd gewijzigd** (breek niks). Beide voldoen aan "reduced-motion
  afgehandeld"; blueprint 07 documenteert de zachtere route voor nieuwe sites, de
  template houdt de striktere route (past bij 10K-restraint). Gate eist alleen *dat* het
  afgehandeld is.

### 5. `review-animations` is een aparte review-skill (Emil)

- **Voor:** sterke gestructureerde motion-review (findings-tabel, verdict, escalatie).
- **Nadeel:** het is een losse skill met `disable-model-invocation`, niet 10K-eigen;
  klakkeloos overnemen zou de skill-structuur dupliceren.
- **Fix:** niet de skill geïmporteerd maar de **STANDARDS** gedestilleerd naar blueprint
  07 + een geautomatiseerde lint. De review-discipline leeft nu in de gate + de reviewer,
  passend in 10K's "evidence over trust".

---

## Wat is bewust NIET overgenomen (geen schade)

- De `review-animations`/`emil-design-eng` skills als losse skills (dupliceert structuur;
  inhoud is gedestilleerd i.p.v. gekopieerd).
- Framework-specifieke snippets (Radix/Base UI CSS-vars, Framer Motion-voorbeelden):
  als referentie in de blueprint, niet als code — 10K is Astro/Tailwind/GSAP.
- Duur-hardcap als gate (zou cinematische marketing-timing breken).

## Hoe dit de studio krachtiger maakt

1. Juiste easing/fysica by default — geen sluggish `ease-in`, geen "uit het niets".
2. Herbruikbare sterke curves + press-feedback in elke site.
3. Geautomatiseerde motion-gate vangt de klassieke fouten vóór oplevering.
4. Restraint blijft de baas; techniek dient, regeert niet.

## Open punten

- Optioneel: template-reduced-motion later naar Emil's "zachter, niet nul" tillen.
- Optioneel: origin-aware popover-helper + `@starting-style` snippet toevoegen wanneer
  een site echte popovers/dropdowns krijgt.
