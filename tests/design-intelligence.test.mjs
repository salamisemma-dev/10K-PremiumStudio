#!/usr/bin/env node
// Verification for specs/design-intelligence-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure. No test runner needed.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

// 1. Datasets present + non-trivial row counts.
const expected = {
  "design-intelligence/data/colors.csv": 100,
  "design-intelligence/data/styles.csv": 50,
  "design-intelligence/data/typography.csv": 50,
  "design-intelligence/data/ui-reasoning.csv": 100,
  "design-intelligence/data/ux-guidelines.csv": 80,
  "design-intelligence/data/landing.csv": 20,
  "design-intelligence/data/stacks/astro.csv": 30,
};
for (const [rel, min] of Object.entries(expected)) {
  const p = join(root, rel);
  if (!existsSync(p)) { fails.push(`missing dataset: ${rel}`); continue; }
  const lines = readFileSync(p, "utf8").trim().split(/\r?\n/).length - 1; // minus header
  ok(lines >= min, `${rel}: expected >= ${min} rows, got ${lines}`);
}

// 2. Governing + provenance docs present (the adapter, not just the data).
for (const rel of [
  "blueprints/04-design-intelligence.md",
  "design-intelligence/AGENTS.md",
  "design-intelligence/README.md",
  "design-intelligence/ATTRIBUTION.md",
  "design-intelligence/UPSTREAM-LICENSE",
  "checks/design-intel.mjs",
]) ok(existsSync(join(root, rel)), `missing governing file: ${rel}`);

// 3. The Node lookup selfcheck must pass (datasets parse + columns intact).
try {
  execFileSync("node", [join(root, "checks", "design-intel.mjs"), "--selfcheck"], { stdio: "pipe" });
} catch (e) {
  fails.push(`design-intel --selfcheck failed: ${e.stderr?.toString() || e.message}`);
}

// 4. Scene-first invariant is stated where it must be.
const ag = existsSync(join(root, "design-intelligence/AGENTS.md")) && readFileSync(join(root, "design-intelligence/AGENTS.md"), "utf8");
ok(ag && /scene wins/i.test(ag), "design-intelligence/AGENTS.md must state the scene-wins rule");

if (fails.length) {
  console.error("design-intelligence test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("design-intelligence test passed: datasets, governing docs, selfcheck, scene-first invariant all OK.");
