# PvA — Design-Intelligence integratie in 10K-PremiumStudio

**Doel:** de studio krachtiger maken bij het bouwen van top-model websites door de
open `ui-ux-pro-max` design-dataset (v2.6.2) te integreren — zonder de scene-first
discipline te verzwakken die elke 10K-site samenhangend houdt.

**Aanpak (BOB):** recall → spec-laag (constitution + executable spec) → plan →
test-first uitvoeren achter quality gates → persist. De dataset is **vendored** in
`design-intelligence/`, bevraagbaar via Node (`npm run design:lookup`), en
gereconcilieerd met de scene-discipline in `blueprints/04-design-intelligence.md`.

**Bronnen bestudeerd voor voorbeelden:** 21st.dev (component-first, "crafted not AI
slop") en het editorial save-the-date archetype (savethedategw). Patronen
vastgelegd in `design-intelligence/examples-21st-savethedate.md`.

---

## Wat is opgeleverd

| Artefact | Pad |
|---|---|
| Vendored corpus (161 paletten, 76 stijlen, 73 font-paren, 161 industry-regels, 98 UX-regels, Astro-stack) | `design-intelligence/data/` |
| Reasoning-engine (optioneel, Python) | `design-intelligence/scripts/` |
| Node lookup-CLI (zero-dep) | `checks/design-intel.mjs` |
| Scene-discipline adapter (de reconciliatie) | `blueprints/04-design-intelligence.md` |
| Voorbeeldenbibliotheek | `design-intelligence/examples-21st-savethedate.md` |
| Constitution + executable spec | `constitution.md`, `specs/design-intelligence-integration.spec.md` |
| Spec-gate + tests + CI | `scripts/bob_validate.mjs`, `tests/design-intelligence.test.mjs`, `.github/workflows/spec-gate.yml` |

---

## Voor- en nadelen — met een fix op elk nadeel

Per beslissing: het voordeel, het reële nadeel, en de concrete fix die al in deze
integratie zit (of als next step staat). De fixes zijn wat de studio *sterker* maakt,
niet alleen veiliger.

### 1. Grote dataset toevoegen (161 paletten / 76 stijlen / 73 fonts)

- **Voor:** ontwerpkeuzes zijn gegrond in een groot, WCAG-gecheckt corpus i.p.v.
  smaak. Snellere, consistentere keuzes; minder "lege-pagina" twijfel.
- **Nadeel:** botst frontaal met de 10K-regel "kleur volgt de scene, niet het
  producttype". Risico: agents kiezen voortaan paletten op industrie en de cinematic
  identiteit vervlakt naar generieke SaaS-looks.
- **Fix:** de dataset is expliciet **consult-only**. `constitution.md §5` +
  `blueprints/04` leggen vast: scene wint altijd; corpus valideert contrast / levert
  font-kandidaten / filtert anti-patterns. De `design-intel.mjs` output eindigt elke
  keer met "candidates only — filter through the scene". Drift is daarmee een
  contractbreuk, geen ongelukje.

### 2. Vendoren (kopie in repo) i.p.v. git submodule / npm install

- **Voor:** offline-first, versioned mét de repo, bevraagbaar zonder netwerk of
  Python. Reproduceerbare builds.
- **Nadeel:** de kopie veroudert; upstream verbetert en wij missen het. Provenance/
  licentie kan zoekraken.
- **Fix:** `ATTRIBUTION.md` legt versie (2.6.2), datum, en exact refresh-recept vast;
  `UPSTREAM-LICENSE` (MIT) bewaart de licentie; `npm run check:design` faalt als het
  schema verschuift na een refresh, zodat veroudering zichtbaar wordt. Next step:
  half-jaarlijkse refresh-reminder.

### 3. Python-reasoning-engine meeleveren

- **Voor:** volledige BM25 multi-domain reasoning beschikbaar voor wie het wil.
- **Nadeel:** de studio is Node/offline-first; een Python-afhankelijkheid in het
  hoofdpad zou de toolchain fragiel maken op Windows-clients.
- **Fix:** Python is strikt **optioneel**. Het ondersteunde pad is
  `checks/design-intel.mjs` (zero-dep Node). Constitution §2 verankert "Node-pad dekt
  altijd het dagelijkse werk". Python staat gedocumenteerd maar nergens in `npm run
  check`.

### 4. Productie-paletten zijn WCAG-aangepast, maar generiek

- **Voor:** kant-en-klare contrast-veilige Primary/Accent/Background combinaties.
- **Nadeel:** generieke paletten kunnen een premium scene goedkoper maken als ze
  klakkeloos worden overgenomen.
- **Fix:** workflow in `blueprints/04`: neem de **hue-familie** van de scene, gebruik
  het corpus alleen om contrast te repareren (behoud de scene-tint). Elke gebruikte
  waarde wordt met scene-rechtvaardiging gelogd in `projects/<client>/brief.md` —
  inclusief de afgewezen alternatieven. Audit-spoor i.p.v. blind plakken.

### 5. Voorbeelden uit externe sites verzamelen

- **Voor:** bewezen section-patronen (sticky nav, testimonials vóór CTA, single-column
  editorial) verrijken het 10K-vocabulaire.
- **Nadeel a:** 21st.dev/Canva-patronen kunnen trend-ruis of conversie-trucs
  binnenbrengen die de "restraint before spectacle"-wet ondermijnen.
- **Nadeel b:** `savethedategw` is een JS-gerenderde Canva-pagina; niet
  machine-leesbaar via fetch (gaf enkel "Invitation" terug).
- **Fix a:** elk patroon in `examples-21st-savethedate.md` is gekoppeld aan de 10K-wet
  die het dient én de corpus-rij die het staaft; patronen zonder wet-koppeling worden
  niet opgenomen.
- **Fix b:** het archetype is eerlijk gedocumenteerd als archetype (editorial
  save-the-date) met de instructie "verifieer in de browser vóór exacte waarden". Geen
  verzonnen scrape-data. Next step (optioneel): live capture via Chrome-MCP voor
  exacte hex/typografie.

### 6. `check`-keten uitbreiden met `check:design`

- **Voor:** een corrupte/gewijzigde dataset blokkeert delivery automatisch.
- **Nadeel:** langere CI/lokale runs; nog een ding dat rood kan worden.
- **Fix:** de selfcheck is een pure in-memory CSV-parse (milliseconden, geen netwerk,
  geen browser) en staat vooraan in de keten zodat hij snel faalt. Verwaarloosbare
  kost, hoge vangnetwaarde.

### 7. BOB spec-laag toevoegen (constitution + spec + gate)

- **Voor:** intentie wordt permanent en machine-checkbaar; over 6 maanden weet men
  nog *waarom* de integratie zo is. Drift wordt door CI gevangen.
- **Nadeel:** meer onderhoud — spec en code moeten synchroon blijven; extra bestanden.
- **Fix:** de gate is geautomatiseerd (`spec-gate.yml` + `bob_validate.mjs --strict`),
  dus sync wordt afgedwongen i.p.v. gehoopt. De spec is bewust dun (één orchestration-
  spec) zodat onderhoud laag blijft. Regel: spec eerst wijzigen, dan code.

---

## Hoe dit de studio "krachtiger" maakt (samengevat)

1. **Snellere, betere eerste keuze** — font/palette/style-kandidaten in seconden
   (`npm run design:lookup`), in plaats van vanaf nul ontwerpen.
2. **Hoger contrast-/a11y-floor** — WCAG-aangepaste paletten als vangnet onder elke
   scene-keuze.
3. **Astro-specifieke build-discipline** — `stacks/astro.csv` (islands, zero-JS
   default, juiste client-directives) direct toepasbaar op `apps/`.
4. **Anti-patroon-filter** — cheapening-keuzes worden actief afgevangen.
5. **Geen identiteitsverlies** — scene-first blijft de baas; het corpus dient, regeert
   niet.
6. **Duurzaam geheugen** — elke keuze + afwijzing gelogd; CI bewaakt drift.

## Open punten / next steps

- Half-jaarlijkse upstream-refresh (volgende: ~2026-12) — alleen oppakken als upstream
  betekenisvol wijzigt; `ATTRIBUTION.md` bevat het recept.
- Optionele live-capture van `savethedategw` via Chrome-MCP voor exacte tokens.
- Eventueel een Node-port van de BM25-reasoning (nu Python-only) als het Python-pad
  te weinig wordt gebruikt.
