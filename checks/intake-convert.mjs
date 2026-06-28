#!/usr/bin/env node
// Optional intake bridge - convert a client source document (.docx/.pdf/.pptx/.xlsx/
// .html/...) into Markdown for the discovery brief, using Microsoft markitdown (MIT)
// if it is already installed. Markdown is the studio's source of truth (AGENTS.md);
// this only turns a Word/PDF intake into intermediate markdown for normalization.
//
// OFFLINE-FIRST / PYTHON-OPTIONAL: markitdown is Python and is NOT a dependency of this
// repo. If it is not installed, this command graceful-skips (exit 0) with an install
// hint, so it never breaks the Node pipeline. It is deliberately NOT part of
// `npm run check`, and it never invokes transient package runners that may auto-install.
//
// Usage:
//   npm run intake:convert -- <source-file> [out.md]
//   node checks/intake-convert.mjs "Template/Klant-Website Discovery -Vragenlijst.docx"

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, resolve } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Candidate ways to invoke an already-installed markitdown. Each is [cmd, ...prefixArgs].
// Do not include uvx/pipx run here: they may fetch packages and violate no auto-install.
export const CONVERTER_CANDIDATES = [
  ["markitdown"],
  ["python", "-m", "markitdown"],
  ["python3", "-m", "markitdown"],
];

// Pure: derive the output .md path from a source path (+ optional explicit out).
export function buildOutPath(src, out) {
  if (out) return out;
  const ext = extname(src);
  return ext ? src.slice(0, -ext.length) + ".md" : src + ".md";
}

// Probe a candidate without converting. Returns true only on a clean --version exit.
export function probe(candidate, spawn = spawnSync) {
  const [cmd, ...prefix] = candidate;
  try {
    const r = spawn(cmd, [...prefix, "--version"], { stdio: "ignore", timeout: 8000 });
    return !r.error && r.status === 0;
  } catch {
    return false;
  }
}

export function resolveConverter(candidates = CONVERTER_CANDIDATES, spawn = spawnSync) {
  for (const c of candidates) if (probe(c, spawn)) return c;
  return null;
}

const HINT = `markitdown not found - intake conversion skipped.
Install (optional, Python): pip install 'markitdown[all]'
Then re-run: npm run intake:convert -- <source-file> [out.md]
Markdown stays the source of truth; normalize converted text into projects/<client>/ before committing.`;

export function main(argv, { spawn = spawnSync, log = console.log, error = console.error } = {}) {
  const args = argv.slice(2);
  if (args.length === 0) {
    log("Usage: npm run intake:convert -- <source-file> [out.md]");
    log("Converts a client .docx/.pdf/.pptx/... into Markdown for the brief (needs markitdown).");
    return 0;
  }
  const src = args[0];
  const out = buildOutPath(src, args[1]);
  if (!existsSync(resolve(root, src)) && !existsSync(src)) {
    error(`Source not found: ${src}`);
    return 1;
  }
  const converter = resolveConverter(CONVERTER_CANDIDATES, spawn);
  if (!converter) {
    log(HINT);
    return 0;
  }
  const [cmd, ...prefix] = converter;
  log(`intake-convert: ${cmd} ${src} -> ${out}`);
  const r = spawn(cmd, [...prefix, src, "-o", out], { stdio: "inherit" });
  if (r.error) { error(`conversion failed: ${r.error.message}`); return 1; }
  return r.status ?? 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exit(main(process.argv));
}