#!/usr/bin/env node
// Runs the impeccable anti-pattern detector over the studio's UI source as a
// quality gate. Enforces only the objective anti-patterns 10K has adopted as law
// (blueprints/05-craft-and-bans.md); subjective/DESIGN.md-coupled rules are
// disabled in .impeccable/config.json because they conflict with the scene-first
// discipline and the design-intelligence corpus.
//
// Exit: 0 = clean (or detector not installed -> graceful skip), 2 = anti-patterns
// found. Detector is an optional devDependency; CI installs it so the gate is
// enforced there. Locally without it, the gate warns and passes.

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bin = join(root, "node_modules", "impeccable", "cli", "bin", "cli.js");

// Default targets: all app UI source. Override by passing paths as args.
const targets = process.argv.slice(2);
const scan = targets.length ? targets : ["apps"];

if (!existsSync(bin)) {
  console.warn("impeccable detector not installed (devDependency). Skipping design audit.");
  console.warn("Install with: npm install   (or: npm i -D impeccable)");
  process.exit(0);
}

// Nothing to scan yet (e.g. only the template) is not a failure.
const existing = scan.filter((t) => existsSync(join(root, t)));
if (existing.length === 0) {
  console.log(`impeccable audit: no targets found (${scan.join(", ")}) — nothing to scan.`);
  process.exit(0);
}

console.log(`impeccable audit: scanning ${existing.join(", ")} (objective rules only)`);
const res = spawnSync("node", [bin, "detect", ...existing], { cwd: root, stdio: "inherit" });

if (res.error) {
  console.error(`impeccable audit failed to run: ${res.error.message}`);
  process.exit(1);
}
if (res.status === 2) {
  console.error("\nimpeccable audit: anti-patterns found. Fix per blueprints/05-craft-and-bans.md, or record an intentional exception in .impeccable/config.json.");
  process.exit(2);
}
process.exit(res.status ?? 0);
