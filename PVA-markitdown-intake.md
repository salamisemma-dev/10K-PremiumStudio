# PvA — markitdown intake-bridge in 10K-PremiumStudio

**Doel:** client-bronbestanden (`.docx`/`.pdf`/`.pptx`/...) omzetten naar de markdown
waarop de discovery-brief wordt gebouwd, met Microsoft markitdown (MIT) — zonder 10K
afhankelijk te maken van Python of de offline-first Node-pipeline te breken.

**Bron:** `microsoft/markitdown` (MIT) — file→markdown converter, CLI
`markitdown <file> -o out.md`, `pip install 'markitdown[all]'`.

**Aanpak (BOB):** recall → spec (`specs/intake-conversion-integration.spec.md`) →
optionele wrapper + owner-docs → test → persist.

---

## Voor- en nadelen — met een fix op elk nadeel

### 1. markitdown als intake-brug gebruiken

- **Voor:** sluit een echte gap. 10K's AGENTS zegt "markdown is source of truth, Word
  is archief"; de repo heeft zelfs een `.docx` vragenlijst. markitdown maakt van een
  ingevulde `.docx`/`.pdf` direct de markdown waaruit de brief komt — minder handwerk,
  minder fouten.
- **Nadeel:** markitdown is **Python** met zware deps; in de Node/offline-first gate
  zetten breekt de constitutie ("Node-pad dekt altijd het dagelijkse werk").
  - **Fix:** gewired als **optionele, graceful wrapper** (`checks/intake-convert.mjs`),
    **niet** in `npm run check`. Geen markitdown/python in `package.json` (test bewaakt
    dit). Ontbreekt de tool, dan exit 0 + install-hint — nooit een pipeline-breuk.

### 2. Een wrapper bouwen i.p.v. markitdown vendoren

- **Voor:** geen 2000-file Python-repo in 10K; de wrapper roept de tool aan als hij
  bestaat (PATH / `python -m` / `uvx` / `pipx`).
- **Nadeel:** afhankelijk van een externe install die er niet altijd is; risico op
  verwarrende fouten als de tool half werkt.
  - **Fix:** meerdere invocatie-kandidaten geprobeerd; `--version` probe vóór gebruik;
    bij afwezigheid heldere hint. Pure helper `buildOutPath` is unit-getest
    (sandbox-veilig, geen nested spawn in de test).

### 3. Bronbestand vs source-of-truth

- **Voor:** snelle conversie van klant-input.
- **Nadeel:** risico dat de gegenereerde `.md` of het Word-bestand "waarheid" wordt en
  de genormaliseerde `projects/<client>/`-facts omzeilt.
  - **Fix:** wrapper + docs herhalen expliciet: markdown is source of truth, normaliseer
    de output naar `projects/<client>/`, commit de `.md` niet de bron. Owners
    (`Template/AGENTS.md`, `prompts/00-discovery-master.md`) documenteren de stap; de
    converter dupliceert geen intake-logica.

### 4. markitdown extra's (MCP-server, OCR, Azure)

- **Voor:** krachtige extra conversies (OCR, Document Intelligence).
- **Nadeel:** online/zwaar/betaald — botst met offline-first en scope.
  - **Fix:** **buiten scope**; alleen de lokale CLI-conversie wordt aangeroepen. Genoteerd
    in de spec.

---

## Wat is opgeleverd

| Artefact | Pad |
|---|---|
| Optionele intake-converter (graceful) | `checks/intake-convert.mjs` → `npm run intake:convert` |
| Owner-docs | `Template/AGENTS.md`, `prompts/00-discovery-master.md` |
| Spec + test | `specs/intake-conversion-integration.spec.md`, `tests/intake-conversion.test.mjs` |

## Wat bewust NIET gedaan (geen schade)

- markitdown niet als dependency/gate toegevoegd (offline-first; Python optioneel).
- MCP-server / OCR / Azure-plugins niet geïntegreerd (online/zwaar/scope).
- Geen auto-install van markitdown.

## Hoe dit de studio versterkt

1. Wrijvingsloze intake: klant-`.docx`/`.pdf` → markdown brief met één commando.
2. Geen stack-vervuiling: Node/offline-first blijft intact; tool is puur optioneel.
3. Source-of-truth-discipline bewaakt in code + docs + test.

## Open punten

- Optioneel: markitdown-MCP later koppelen voor agent-gedreven conversie.
- Optioneel: een `projects/<client>/` normalisatie-helper bovenop de ruwe conversie.
