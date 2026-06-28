#!/usr/bin/env node
// Verification for specs/intake-conversion-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure. Sandbox-safe (no nested spawns).

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildOutPath, CONVERTER_CANDIDATES } from "../checks/intake-convert.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

// 1. Helper present + pure mapping correct.
ok(existsSync(join(root, "checks", "intake-convert.mjs")), "checks/intake-convert.mjs missing");
ok(buildOutPath("Template/x.docx") === "Template/x.md", "buildOutPath must map .docx -> .md");
ok(buildOutPath("a/b.pdf", "out.md") === "out.md", "buildOutPath must honor an explicit out path");
ok(buildOutPath("noext") === "noext.md", "buildOutPath must append .md when no extension");
ok(Array.isArray(CONVERTER_CANDIDATES) && CONVERTER_CANDIDATES.some((c) => c[0] === "markitdown"), "must try a markitdown invocation");

// 2. Offline-first: no Python/markitdown dependency added to the Node project.
const pkg = JSON.parse(read("package.json") || "{}");
const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
for (const bad of ["markitdown", "python", "python-shell"])
  ok(!(bad in allDeps), `offline-first: ${bad} must not be a dependency`);

// 3. The converter must NOT be part of the check chain (it's optional, Python-based).
ok(!/intake-convert|intake:convert/.test(pkg.scripts?.check || ""), "intake conversion must not be in `npm run check`");
ok(typeof pkg.scripts?.["intake:convert"] === "string", "package.json must expose the intake:convert script");

// 4. Owners document the optional step (not duplicated logic).
ok(/intake:convert/.test(read("Template/AGENTS.md")), "Template/AGENTS.md must mention the intake:convert step");
ok(/intake:convert|markitdown/i.test(read("prompts/00-discovery-master.md")), "discovery-master must mention the optional conversion");
ok(/source of truth/i.test(read("checks/intake-convert.mjs")), "intake-convert must state markdown stays source of truth");

if (fails.length) {
  console.error("intake-conversion test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("intake-conversion test passed: helper + pure mapping, offline-first (no python dep), not in check chain, owners documented.");
