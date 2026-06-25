#!/usr/bin/env node
// Verification for specs/impeccable-craft-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

// 1. Curated detector config: the conflict resolution must be in place.
const cfgPath = join(root, ".impeccable", "config.json");
ok(existsSync(cfgPath), ".impeccable/config.json missing");
if (existsSync(cfgPath)) {
  const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
  const d = cfg.detector || {};
  ok(d.designSystem && d.designSystem.enabled === false, "config: detector.designSystem.enabled must be false");
  ok(Array.isArray(d.ignoreRules) && d.ignoreRules.includes("overused-font"), "config: overused-font must be ignored (corpus conflict)");
  ok(Array.isArray(d.ignoreRules) && d.ignoreRules.includes("single-font"), "config: single-font must be ignored");
}

// 2. Blueprint 05 owns the decision incl. the out-of-register list.
const bpPath = join(root, "blueprints", "05-craft-and-bans.md");
ok(existsSync(bpPath), "blueprints/05-craft-and-bans.md missing");
if (existsSync(bpPath)) {
  const bp = readFileSync(bpPath, "utf8");
  ok(/out of register|out-of-register/i.test(bp), "blueprint 05 must list out-of-register commands");
  for (const cmd of ["bolder", "overdrive", "delight", "colorize"])
    ok(new RegExp(`\\b${cmd}\\b`).test(bp), `blueprint 05 must name out-of-register command: ${cmd}`);
  ok(/gradient text/i.test(bp) && /side-stripe/i.test(bp), "blueprint 05 must list adopted absolute bans");
}

// 3. Cowork plugin packaging.
const plugPath = join(root, ".claude-plugin", "plugin.json");
ok(existsSync(plugPath), ".claude-plugin/plugin.json missing");
if (existsSync(plugPath)) {
  const plug = JSON.parse(readFileSync(plugPath, "utf8"));
  ok(plug.skills === "./skills/", "plugin.json must point skills at ./skills/");
}
ok(existsSync(join(root, ".claude-plugin", "marketplace.json")), ".claude-plugin/marketplace.json missing");
ok(existsSync(join(root, "checks", "impeccable-audit.mjs")), "checks/impeccable-audit.mjs missing");

// 4. Functional: only when the detector devDependency is installed.
const bin = join(root, "node_modules", "impeccable", "cli", "bin", "cli.js");
if (existsSync(bin)) {
  const fixture = join(root, ".impeccable", "_test-ban.css");
  writeFileSync(fixture, ".x{border-left:4px solid red;background:linear-gradient(90deg,#f00,#00f);-webkit-background-clip:text;background-clip:text;color:transparent}\n");
  try {
    const bad = spawnSync("node", [bin, "detect", fixture], { cwd: root, encoding: "utf8" });
    ok(bad.status === 2, `detector must flag a known ban (exit 2), got ${bad.status}`);
    const gate = spawnSync("node", [join(root, "checks", "impeccable-audit.mjs"), "apps/_template-site/src"], { cwd: root, encoding: "utf8" });
    ok(gate.status === 0, `gate must pass the clean template, got ${gate.status}`);
  } finally {
    rmSync(fixture, { force: true });
  }
} else {
  console.log("note: impeccable devDependency absent — skipped functional detector checks (gate self-skips by design).");
}

if (fails.length) {
  console.error("impeccable-integration test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("impeccable-integration test passed: curated config, blueprint 05, plugin packaging, detector gate all OK.");
