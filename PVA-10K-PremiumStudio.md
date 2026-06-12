# PVA: 10K-PremiumStudio Repository

## Korte Diagnose

De docx heeft een sterk concept: een kleine, duidelijke repo die AI-agents dwingt om premium websites te bouwen vanuit brand, blueprints, prompts en skills. De kern is goed: weinig assets, sterke scene-based art direction, korte copy, semantiek, SEO, GSAP-motion en performance.

Brutale waarheid: als je dit 1-op-1 bouwt, krijg je waarschijnlijk een mooie prompt-map, geen betrouwbare productiemachine. De structuur mist contracts, validatie, testbare outputs, klantdata-flow, versiebeheer voor generated assets, en scheiding tussen instructies en implementatie. Dat is precies waar drift ontstaat.

## Doel

Bouw een repo die niet alleen websites kan genereren, maar consequent dezelfde standaard afdwingt:

- Premium visual direction zonder template-chaos.
- Herhaalbare intake van klantdata naar code.
- Duidelijke DOX-contracten per domein.
- Meetbare kwaliteit via lint, build, SEO, a11y en browser checks.
- Geen verborgen beslissingen in losse prompts.

## Voordelen

1. **Heldere mentale structuur**
   De verdeling in `blueprints`, `prompts` en `skills` is makkelijk te begrijpen.

   **Versterking:** houd deze scheiding, maar voeg `brand`, `projects`, `apps` en `checks` toe zodat strategie, input, code en verificatie niet door elkaar lopen.

2. **Sterke premium positionering**
   De 5-asset regel, scene-based kleur en stille copy zijn onderscheidend.

   **Versterking:** maak dit een bindend brand contract in `brand/manifest.md` en verwijs ernaar vanuit DOX.

3. **AI-agent krijgt gedragsregels**
   `premium-dev-skill.md` geeft richting aan stijl en workflow.

   **Versterking:** splits gedrag, designwetten en technische acceptatiecriteria. Een skill moet gedrag sturen, geen complete productdocumentatie dupliceren.

4. **SEO en performance zitten vroeg in het ontwerp**
   De SEO-matrix voorkomt dat visueel werk losraakt van ranking en snelheid.

   **Versterking:** maak SEO controleerbaar met scripts en checklists, niet alleen tekstuele verplichtingen.

5. **Discovery-template is de juiste start**
   De klantvragenlijst kan de brug worden tussen intake en bouw.

   **Versterking:** maak per klant een ingevuld projectdossier, anders gaan agents alsnog gokken.

## Nadelen En Fixes

1. **Nadeel: README wordt "master-instructie" genoemd**
   README's zijn voor mensen. Agents gaan drift vertonen als alle regels in README, prompts en skills dubbel staan.

   **Fix:** gebruik `AGENTS.md` voor werkcontracten, `README.md` voor menselijke onboarding, en verwijs naar bronbestanden in plaats van regels te kopieren.

2. **Nadeel: geen DOX-hierarchie**
   Zonder lokale `AGENTS.md` per domein weet een agent niet welke regels gelden in `prompts`, `blueprints`, `brand` of code.

   **Fix:** initialiseer DOX nu met root `AGENTS.md`. Voeg later child `AGENTS.md` toe in duurzame grenzen: `brand/`, `blueprints/`, `prompts/`, `skills/`, `projects/`, `apps/`, `checks/`.

3. **Nadeel: prompts en blueprints dupliceren elkaar**
   Dezelfde regels over 5 assets, korte copy en scene-based kleur komen op meerdere plekken terug. Dat wordt snel inconsistent.

   **Fix:** wijs per regel een eigenaar aan. Brandfilosofie in `brand/manifest.md`, visuele regels in `blueprints/01-core-architecture.md`, uitvoeringsgedrag in `skills/premium-dev-skill.md`, generatieformules in `prompts/`.

4. **Nadeel: geen echte klantdata-pipeline**
   De discovery-template bestaat, maar er is geen pad van ingevulde vragenlijst naar projectconfiguratie.

   **Fix:** voeg `projects/<client>/brief.md`, `projects/<client>/content.md`, `projects/<client>/assets.md` en `projects/<client>/acceptance.md` toe. Code mag pas starten als deze vier bestaan of bewust zijn afgevinkt.

5. **Nadeel: "stel geen onnodige vragen" botst met "stop en vraag bij twijfel"**
   De skill zegt direct bouwen, het brand manifest zegt bij twijfel stoppen. Dat is een driftbom.

   **Fix:** definieer een beslisregel met de canonieke zes velden (zie sectie "Canonieke Zes Velden"): `klantnaam`, `one thing`, `scene`, `proof`, `assets`, `CTA`. Agent bouwt direct als alle zes aanwezig zijn. Ontbreekt er een, dan eerst aanvullen of expliciet aannemen in `projects/<client>/brief.md`.

6. **Nadeel: tech stack is te smal geformuleerd**
   "Uitsluitend HTML5, Tailwind CDN, GSAP" is prima voor statische landingspagina's, maar zwak voor schaalbare repo's, bundling, image optimization en tests.

   **Fix:** kies een expliciete runtime. Aanbevolen: Astro of Next.js voor productie, Tailwind voor styling, GSAP voor motion, optioneel Three.js. Als je echt static-only wilt, leg dat vast en accepteer minder tooling.

7. **Nadeel: Lighthouse 99+ als absolute eis is marketingtaal**
   99+ kan afhangen van fonts, video, hosting, third-party scripts en netwerk. Als harde belofte zonder meetproces is dit gevaarlijk.

   **Fix:** maak het meetbaar: target `Performance >= 95`, `Accessibility >= 95`, `Best Practices >= 95`, `SEO >= 95` lokaal, met productie-doel 99 waar haalbaar. Leg uitzonderingen vast in `projects/<client>/acceptance.md`.

8. **Nadeel: assetstrategie mist bestandsregels**
   "Maximaal vijf assets" is sterk, maar er staat niets over namen, formaten, dimensies, rights, compressie of fallbacks.

   **Fix:** voeg `projects/<client>/assets.md` toe met regels: bronbestand, geoptimaliseerde output, alt text, width, height, focal point, license, preload/lazy strategy.

   **Aanvulling (binaire opslag):** 5 assets incl 2 video's per klant x N klanten = repo-bloat. Beslis nu waar zware media leeft. Aanbevolen: media buiten git in CDN/bucket, alleen een manifest (URL, hash, dimensies, license) in `assets.md`. Alternatief: Git LFS voor `*.mp4`, `*.webm`, `*.png` boven drempel. Leg de keuze vast in `apps/AGENTS.md` en `.gitignore`. Dit sluit het in de diagnose genoemde "versiebeheer voor generated assets".

9. **Nadeel: motion kan toegankelijkheid en performance slopen**
   GSAP en ScrollTrigger zijn krachtig, maar zonder fallback krijg je misselijkheid, jank en slechte crawls.

   **Fix:** verplicht `prefers-reduced-motion`, no-JS readable layout, delayed ScrollTrigger setup, cleanup bij route changes, en animaties die layout niet forceren.

10. **Nadeel: SEO-schema is te generiek**
    `LocalBusiness`, `Product` of `Service` kiezen zonder klantcontext kan foutieve structured data opleveren.

    **Fix:** laat `projects/<client>/brief.md` het schema-type bepalen. Voeg een schema-template toe en valideer met een structured-data check.

11. **Nadeel: geen test- of reviewlaag**
    De docx zegt dat de AI zichzelf moet controleren. Dat is onvoldoende.

    **Fix:** voeg `checks/` toe met **uitvoerbare** scripts (geen losse checklist) voor build, lint, Lighthouse, a11y, HTML semantics, image dimensions en schema. Draai ze in CI (GitHub Actions op push). Een handmatige checklist is alleen toegestaan voor de browser-stap die niet te automatiseren is.

    **Aanvulling (copy-linter):** de hardste merkregels worden nu nergens afgedwongen. Voeg een copy-linter toe die faalt op: em-dash (—), headline langer dan 5 woorden, caption langer dan 5 woorden, herhaalde koppen. Brand zegt "NOOIT em-dash" — dat hoort een check te zijn, geen belofte.

12. **Nadeel: geen scheiding tussen generator en output**
    Als prompts, klantdata en gebouwde site in dezelfde laag leven, wordt de repo snel rommelig.

    **Fix:** kies hard, geen alternatieven (anders kiest elke agent zelf):
    - `blueprints/` voor regels.
    - `projects/` voor klantinput.
    - `apps/` voor gebouwde websites.
    - `checks/` voor verificatie.

13. **Nadeel: "vermijd standaard UI-patronen" is te absoluut**
    Soms zijn bekende patronen juist premium omdat ze rustig en voorspelbaar zijn.

    **Fix:** herschrijf naar: vermijd generieke template-compositie; gebruik bekende interactiepatronen waar ze duidelijkheid, toegankelijkheid of conversie verbeteren.

14. **Nadeel: er is geen versieerbare outputdefinitie**
    Wat betekent "klaar"? Alleen code? Screenshot? Lighthouse? Promptlog? Assetlijst?

    **Fix:** elke site krijgt een `delivery.md` met URL, build command, screenshots, Lighthouse resultaat, schema-status, asset manifest en open risico's.

15. **Nadeel: zes velden tweemaal anders gedefinieerd**
    Nadeel 5 noemde `client brief`, Fase 2 noemt `klantnaam`, en de echte discovery-template (`00-discovery-master.md`) heeft 7 andere velden (KLANTNAAM, ELEVATOR PITCH, HOOFDDOEL, SFEER, FILM SCENE, WOW-FACTOR, UNIEKE BEWIJSVOERING). Drie veldsets = agent weet niet welke geldt. Driftbom.

    **Fix:** één canonieke lijst (zie sectie "Canonieke Zes Velden") en map die expliciet op de discovery-vragenlijst.

16. **Nadeel: geen secret-strategie**
    Assets genereren via externe AI-tools (Midjourney, Fal, image/video API's) vraagt API-keys. Geen `.env`-aanpak, geen `.gitignore`. Risico op gelekte sleutels in commits.

    **Fix:** voeg `.env.example` toe, een `.gitignore` die `.env` en `node_modules/` negeert, en een secret-regel in root `AGENTS.md`: nooit keys hardcoden, altijd via env.

17. **Nadeel: docx blijft tweede bron van waarheid**
    Fase 1 normaliseert de docx naar markdown maar zegt niet wat met de originele `.docx` gebeurt. Zolang docx en markdown beide leven, ontstaat drift bij elke update.

    **Fix:** na normalisatie de bron-docx archiveren in `Examples/_source/` of verwijderen. Root `AGENTS.md` markeert de markdown-files als enige bron van waarheid.

18. **Nadeel: Examples/ en Template/ zonder eigenaar**
    De aanbevolen structuur plaatst beide mappen onderaan zonder child `AGENTS.md`. Botst met de eigen DOX-regel dat elke duurzame map een eigen contract krijgt. `Examples/` bevat echte projectdata (nano-banana prompt CSV).

    **Fix:** voeg `Examples/AGENTS.md` en `Template/AGENTS.md` toe, of motiveer expliciet in root waarom ze geen eigen contract nodig hebben.

## Canonieke Zes Velden

Eén bron van waarheid voor de minimale projectinput. Eigenaar: `projects/AGENTS.md`. Agent bouwt pas als alle zes ingevuld of bewust aangenomen zijn in `projects/<client>/brief.md`.

| Veld | Discovery-vraag (bron) |
|------|------------------------|
| `klantnaam` | KLANTNAAM |
| `one thing` | ELEVATOR PITCH + HOOFDDOEL |
| `scene` | FILM SCENE (Visual & Vibe) + SFEER |
| `proof` | UNIEKE BEWIJSVOERING |
| `assets` | (max 5: 2 video, 3 beeld — zie assets.md) |
| `CTA` | HOOFDDOEL (gewenste actie) |

De WOW-FACTOR uit de vragenlijst voedt `scene` of `proof`, afhankelijk van de klant.

## Discovery-Keten (één pad, geen overlap)

Drie dingen raken discovery. Leg de volgorde vast zodat ze niet dupliceren:

1. `Template/Klant-Website Discovery -Vragenlijst` — de vragen aan de klant (mens vult in).
2. `prompts/00-discovery-master.md` — de transformer-prompt die antwoorden omzet naar projectdata.
3. `projects/<client>/brief.md` — de gestructureerde output (de canonieke zes velden).

## Aanbevolen Repo-Structuur

```text
/10k-website-machine
├── AGENTS.md
├── README.md
├── .gitignore
├── .env.example
├── brand/
│   ├── AGENTS.md
│   └── manifest.md
├── blueprints/
│   ├── AGENTS.md
│   ├── 01-core-architecture.md
│   └── 02-seo-frontpage-matrix.md
├── prompts/
│   ├── AGENTS.md
│   ├── 00-discovery-master.md
│   ├── 01-visual-assets.md
│   └── 02-copywriting.md
├── skills/
│   ├── AGENTS.md
│   └── premium-dev-skill.md
├── projects/
│   ├── AGENTS.md
│   └── _template/
│       ├── brief.md
│       ├── content.md
│       ├── assets.md
│       └── acceptance.md
├── apps/
│   ├── AGENTS.md
│   └── _template-site/
├── checks/
│   ├── AGENTS.md
│   └── website-quality-checklist.md
├── Template/
│   ├── AGENTS.md
│   └── Klant-Website Discovery -Vragenlijst.docx
└── Examples/
    ├── AGENTS.md
    ├── _source/                # gearchiveerde bron-docx (na normalisatie)
    └── nano-banana-pro-prompts-20260421.csv
```

## Gefaseerde Aanpak

### Fase 1: Stabiliseer De Bron Van Waarheid

- Maak root `AGENTS.md`.
- Maak `brand/manifest.md` de eigenaar van identiteit, toon en harde merkregels.
- Verplaats dubbele regels uit prompts en skills naar hun eigenaar.
- Leg vast welke documenten agents altijd moeten lezen.
- Archiveer de bron-docx in `Examples/_source/` na normalisatie; markdown is de enige bron van waarheid.
- Voeg `.gitignore` (`.env`, `node_modules/`) en `.env.example` toe; geen keys hardcoden.

**Klaar als:** een agent kan uitleggen welke map eigenaar is van brand, blueprint, prompt, skill, klantinput, code en checks.

### Fase 2: Maak Discovery Verplicht

- Zet de Word-vragenlijst om naar een markdown template.
- Voeg `projects/_template/brief.md`, `content.md`, `assets.md`, `acceptance.md` toe.
- Gebruik de canonieke zes velden: `klantnaam`, `one thing`, `scene`, `proof`, `assets`, `CTA` (zie sectie "Canonieke Zes Velden" voor de mapping op de discovery-vragenlijst).
- Leg de discovery-keten vast: vragenlijst -> `00-discovery-master.md` -> `brief.md`.

**Klaar als:** een website niet gestart wordt zonder ingevuld projectdossier of expliciete aannames.

### Fase 3: Bouw De Website-Runtime

- Kies runtime: Astro voor content-first premium landing pages, of Next.js als je later apps, dashboards of API-routes nodig hebt.
- Richt Tailwind, GSAP en optioneel Three.js in.
- Maak een templatesite die semantiek, schema, responsive media en motion fallback demonstreert.

**Klaar als:** `npm run build` werkt en de templatesite lokaal draait.

### Fase 4: Voeg Checks Toe

- Voeg lint/build checks toe als uitvoerbare scripts.
- Voeg Lighthouse en a11y checks toe.
- Voeg een copy-linter toe (em-dash, headline/caption woordtelling, herhaalde koppen).
- Draai alle checks in CI (GitHub Actions op push).
- Voeg handmatige browser-verificatie toe voor desktop en mobiel.
- Voeg een delivery checklist toe.

**Klaar als:** elke oplevering bewijs heeft, niet alleen vertrouwen.

### Fase 5: Productiseer De Workflow

- Maak per klant een projectfolder.
- Laat de agent eerst projectdata laden, dan blueprints, dan skill, dan pas code.
- Sla screenshots, scores en beslissingen op in `delivery.md`.

**Klaar als:** een tweede klantwebsite gebouwd kan worden zonder nieuwe regels te verzinnen.

## DOX Anti-Drift Regels

- Root `AGENTS.md` bewaakt repo-brede principes.
- Elke duurzame map krijgt alleen een child `AGENTS.md` als daar eigen regels gelden.
- Nieuwe regels komen in de dichtstbijzijnde eigenaar, niet willekeurig in prompts of code.
- Als een implementatie een brand-, blueprint- of workflowregel verandert, update eerst de eigenaar.
- Child DOX Indexen moeten kloppen met de echte mapstructuur.
- Duplicatie is verdacht. Een regel mag meestal maar een eigenaar hebben.

## Prioriteit

1. Init DOX en source-of-truth structuur (incl `.gitignore`, `.env.example`).
2. Normaliseer de docx naar markdown; archiveer bron-docx.
3. Fixeer canonieke zes velden + discovery-keten; maak projecttemplate.
4. Beslis binaire-asset-strategie (CDN/bucket of Git LFS).
5. Kies runtime en scaffold site.
6. Voeg checks toe als scripts + CI (incl copy-linter).
7. Bouw eerste demo-site als bewijs.

## Brutale Conclusie

Het idee is goed genoeg om te bouwen. De huidige docx is niet goed genoeg om als repo-contract te dienen.

Zonder DOX, projectdossiers en verificatie wordt dit een verzameling mooie instructies die bij de derde website uiteenloopt. Met DOX, duidelijke eigenaarschap per map en harde acceptance checks kan dit wel een stabiele premium website machine worden.
