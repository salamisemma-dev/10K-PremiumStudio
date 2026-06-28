#!/usr/bin/env node
// Optional intake bridge — convert a client source document (.docx/.pdf/.pptx/.xlsx/
// .html/...) into Markdown for the discovery brief, using Microsoft markitdown (MIT)
// if it is available. Markdown is the studio's source of truth (AGENTS.md); this only
// turns a Word/PDF intake into the markdown the brief is built from.
//
// OFFLINE-FIRST / PYTHON-OPTIONAL: markitdown is Python and is NOT a dependency of this
// repo. If it is not installed, this command graceful-skips (exit 0) with an install
// hint, so it never breaks the Node pipeline. It is deliberately NOT part of
// `npm run check`.
//
// Usage:
//   npm run intake:convert -- <source-file> [out.md]
//   node checks/intake-convert.mjs "Template/Klant-Website Discovery -Vragenlijst.docx"

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, resolve } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Candidate ways to invoke markitdown, in preference order. Each is [cmd, ...prefixArgs].
export const CONVERTER_CANDIDATES = [
  ["markitdown"],
  ["python", "-m", "markitdown"],
  ["python3", "-m", "markitdown"],
  ["uvx", "markitdown"],
  ["pipx", "run", "markitdown"],
];

// Pure: derive the output .md path from a source path (+ optional explicit out).
export function buildOutPath(src, out) {
  if (out) return out;
  const ext = extname(src);
  return ext ? src.slice(0, -ext.length) + ".md" : src + ".md";
}

// Probe a candidate without converting. Returns true if it responds to --version.
export function probe(candidate, spawn = spawnSync) {
  const [cmd, ...prefix] = candidate;
  try {
    const r = spawn(cmd, [...prefix, "--version"], { stdio: "ignore", timeout: 8000 });
    return !r.error && (r.status === 0 || r.status === null);
  } catch {
    return false;
  }
}

export function resolveConverter(candidates = CONVERTER_CANDIDATES, spawn = spawnSync) {
  for (const c of candidates) if (probe(c, spawn)) return c;
  return null;
}

const HINT = `markitdown not found — intake conversion skipped.
Install (optional, Python): pip install 'markitdown[all]'   or   uvx markitdown <file>
Then re-run: npm run intake:convert -- <source-file> [out.md]
Markdown stays the source of truth; commit the converted .md, not the source doc.`;

function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: npm run intake:convert -- <source-file> [out.md]");
    console.log("Converts a client .docx/.pdf/.pptx/... into Markdown for the brief (needs markitdown).");
    return 0;
  }
  const src = args[0];
  const out = buildOutPath(src, args[1]);
  if (!existsSync(resolve(root, src)) && !existsSync(src)) {
    console.error(`Source not found: ${src}`);
    return 1;
  }
  const converter = resolveConverter();
  if (!converter) {
    console.log(HINT);
    return 0; // graceful — never break a pipeline because an optional tool is absent
  }
  const [cmd, ...prefix] = converter;
  console.log(`intake-convert: ${cmd} ${src} -> ${out}`);
  const r = spawnSync(cmd, [...prefix, src, "-o", out], { stdio: "inherit" });
  if (r.error) { console.error(`conversion failed: ${r.error.message}`); return 1; }
  return r.status ?? 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(main(process.argv));
}
