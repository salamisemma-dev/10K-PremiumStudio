---
id: intake-conversion-integration
type: orchestration
version: 1.0
status: approved
owner: studio-maintainer
depends_on: [external-skills-triage]
consumed_by: [premium-website-builder-skill]
---

## Intent

Bridge client source documents (`.docx`/`.pdf`/`.pptx`/...) into the markdown the
discovery brief is built from, using Microsoft markitdown (MIT) — without making the
studio depend on Python or breaking the offline-first Node pipeline. Permanent record
of why it is wired as an optional, graceful tool and not a gate.

## Contract

1. `checks/intake-convert.mjs` (`npm run intake:convert -- <source> [out.md]`) converts
   a source doc to markdown via markitdown if available (resolved from PATH /
   `python -m markitdown` / `uvx` / `pipx`). If none is found it graceful-skips (exit 0)
   with an install hint — it never fails a pipeline.
2. It is **NOT** part of `npm run check`. markitdown is Python; the constitution's
   technology standard requires the Node path to always cover daily work, so the
   converter is optional and user-invoked.
3. Markdown stays the source of truth (`AGENTS.md`): the converted `.md` is normalized
   into `projects/<client>/`; the Word/PDF remains an archived input. The converter does
   not auto-install markitdown.
4. Owners updated, not duplicated: `Template/AGENTS.md` and
   `prompts/00-discovery-master.md` describe the optional step; `checks/intake-convert.mjs`
   owns the mechanism.

## Business rules

- Conflict avoided: wiring markitdown into the gate would add a heavy Python dependency
  and break offline-first. Resolution: optional graceful wrapper, never a gate. This is
  the one tension and how it is reconciled.
- No Python/markitdown entry is added to `package.json` (the project stays Node-only).
- markitdown's MCP server and Azure/OCR plugins are out of scope (online/heavy); only
  the local CLI conversion is referenced.

## Downstream impact

- New `checks/intake-convert.mjs` + `intake:convert` script (not in `check`).
- `Template/AGENTS.md`, `prompts/00-discovery-master.md`, `skills/.../SKILL.md`
  (+ packaged mirror), root `AGENTS.md`/`README.md` reference the optional step.

## Verification

- `tests/intake-conversion.test.mjs` — asserts the helper exists and exports the pure
  `buildOutPath` (correct `.docx`→`.md` mapping), that no markitdown/python dependency
  was added to `package.json`, that the converter is absent from the `check` chain, and
  that the owners document the optional step. Run: `node tests/intake-conversion.test.mjs`.
- `scripts/bob_validate.mjs --strict .` — constitution + spec gate.
- Manual: `npm run intake:convert` (no args) exits 0 with usage; with a source and no
  markitdown installed, exits 0 with an install hint (graceful-skip).
