# PvA — externe skills triage (vercel / taste-skill / cloner)

**Doel:** drie externe skill-repos beoordelen en alleen wat 10K versterkt overnemen;
alles wat botst met de stack of de filosofie laten liggen. BOB-aanpak: recall → spec
(`specs/external-skills-triage.spec.md`) → additieve docs/regels → test → persist.

**Repos:** `vercel-labs/agent-skills` (MIT), `Leonxlnx/taste-skill` (MIT),
`JCodesMore/ai-website-cloner-template` (MIT).

---

## Per repo — voor/nadeel + fix op elk nadeel

### A. vercel-labs/agent-skills

- **Voor:** `web-design-guidelines` (a11y/focus/forms/perf/UX), `deploy-to-vercel`,
  `writing-guidelines` — volwassen, framework-agnostische review/deploy hulp.
- **Nadeel 1:** de meeste skills (`react-best-practices`, `composition-patterns`,
  `react-native`, `react-view-transitions`) zijn **React/Next** — 10K is Astro/Tailwind/
  GSAP. Overnemen zou de codebase beschadigen.
  - **Fix:** React-skills **niet overgenomen** (expliciet in de left-out tabel). De test
    faalt als `react`/`react-dom`/`next` ooit in `package.json` belanden.
- **Nadeel 2:** `web-design-guidelines` overlapt wat 10K al afdwingt (impeccable +
  `check:ux` + `check:structure`); dubbel inbouwen = dubbele/onsamenhangende regels.
  - **Fix:** als **referentie/second-opinion audit** genoteerd in `external-tools.md`,
    niet gedupliceerd. `deploy-to-vercel` als optioneel deploy-pad (buiten de
    offline-first gate).

### B. Leonxlnx/taste-skill

- **Voor:** concrete craft-regels die 10K nog niet expliciet had: H1 2–3 regel-limiet,
  gapless bento grid (`grid-flow-dense`), hero-element-bans, massieve sectie-spacing.
- **Nadeel 1:** bevat tegenstrijdigheden — "NEVER Inter", Python-random layout, glass
  pill nav, en een `brutalist-skill` (luid).
  - **Fix:** alleen de **niet-tegenstrijdige** craft-regels in
    `blueprints/06-ux-principles.md §3b`; de rest in de left-out tabel met reden
    (Inter = scene/brand-keuze + corpus; random = 10K is scene-deterministisch; glass =
    `05`-ban; brutalist = anti-restraint).
- **Nadeel 2:** imagegen/brandkit-skills genereren losse reference-boards — risico op
  generieke output die de scene negeert.
  - **Fix:** als optionele aid genoteerd (zelfde rol als khroma/uizard): kandidaat-input
    voor de scene, nooit een layout-besluit.

### C. JCodesMore/ai-website-cloner-template

- **Voor:** zeer grondige **inspectie-methode** (design-tokens, component-inventory,
  states) — nuttig voor de reference-study/discovery fase.
- **Nadeel (scherp):** de kern is **pixel-perfect klonen** van een site; laat
  expliciet a11y + SEO vallen ("out of scope") en is "pure emulation". Dat is de
  **inverse** van 10K (bespoke, scene-first, a11y/SEO verplicht, anti-slop).
  - **Fix:** de **clone-skill niet overgenomen** (left-out). Alleen de inspectie-methode,
    herkaderd in `design-intelligence/inspection-guide.md`: *bestudeer om te informeren,
    nooit klonen*; a11y + SEO blijven verplicht; eindig altijd via `npm run check`. De
    test eist dat de guide "never clone" zegt en a11y/SEO behoudt.

---

## Wat is opgeleverd

| Artefact | Pad |
|---|---|
| Adopted craft-regels (taste-skill) | `blueprints/06-ux-principles.md §3b` |
| Reference-study methode (cloner, herkaderd) | `design-intelligence/inspection-guide.md` |
| Referenced + left-out triage | `design-intelligence/external-tools.md` |
| Spec + test | `specs/external-skills-triage.spec.md`, `tests/external-skills.test.mjs` |

## Wat bewust NIET overgenomen (geen schade)

- Alle React/Next-skills (verkeerde stack — zou Astro-codebase schaden).
- `clone-website` (klonen vs bespoke; laat a11y/SEO vallen).
- `brutalist-skill`, "NEVER Inter", Python-random layout, glass pill nav (tegen restraint/
  scene-first/`05`).
- `web-design-guidelines`/`writing-guidelines` als ingebouwde gates (overlap; alleen
  referentie).

## Hoe dit de studio versterkt

1. Scherpere layout-craft (H1-limiet, gapless grid, hero-bans) als wet.
2. Een veilige reference-study methode die inspiratie toelaat zonder te klonen.
3. Heldere, geteste triage zodat dezelfde conflicten niet opnieuw worden afgewogen.
4. Geen stack-vervuiling: React/clone/brutalist blijven buiten de deur.

## Open punten

- Optioneel: `deploy-to-vercel` later als echte deploy-helper toevoegen wanneer client
  sites gepubliceerd worden.
- Optioneel: een ad-hoc `web-interface-guidelines` audit-run documenteren als extra
  review-stap.
