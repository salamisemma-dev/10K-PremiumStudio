#!/usr/bin/env node
// Verification for specs/intake-conversion-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildOutPath, CONVERTER_CANDIDATES } from "../checks/intake-convert.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

ok(existsSync(join(root, "checks/intake-convert.mjs")), "checks/intake-convert.mjs missing");
ok(buildOutPath("client.docx") === "client.md", "buildOutPath must map .docx to .md");
ok(buildOutPath("client.pdf", "converted.md") === "converted.md", "buildOutPath must respect explicit output path");
ok(buildOutPath("client") === "client.md", "buildOutPath must append .md when no extension exists");
ok(CONVERTER_CANDIDATES.some(([cmd]) => cmd === "markitdown"), "converter candidates must include markitdown CLI");
ok(CONVERTER_CANDIDATES.some(([cmd, flag]) => cmd === "python" && flag === "-m"), "converter candidates must include python -m markitdown fallback");

const pkg = JSON.parse(read("package.json"));
const scripts = pkg.scripts || {};
ok(scripts["intake:convert"] === "node checks/intake-convert.mjs", "package.json must expose intake:convert script");
ok(!scripts.check.includes("intake:convert"), "intake:convert must not be part of npm run check");
ok(scripts.test.includes("test:intake"), "npm test must include test:intake");
ok(!JSON.stringify(pkg.dependencies || {}).match(/markitdown|python/i), "markitdown/python must not be a runtime dependency");
ok(!JSON.stringify(pkg.devDependencies || {}).match(/markitdown|python/i), "markitdown/python must not be a devDependency");

for (const rel of ["Template/AGENTS.md", "prompts/00-discovery-master.md", "skills/premium-website-builder/SKILL.md", "README.md"]) {
  const text = read(rel);
  ok(/intake:convert|markitdown/i.test(text), `${rel} must document the optional intake conversion step`);
}

const script = read("checks/intake-convert.mjs");
ok(/graceful-skips|return 0/.test(script), "intake converter must graceful-skip when markitdown is absent");
const intakeSpec = read("specs/intake-conversion-integration.spec.md");
ok(/not\s+(?:a\s+)?(?:part\s+of\s+)?(?:`npm run check`|`check`|gate)/i.test(intakeSpec), "spec must record that intake conversion is not a gate");

if (fails.length) {
  console.error("intake-conversion test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("intake-conversion test passed: optional markitdown bridge, package wiring, owners, and no Python dependency all OK.");
