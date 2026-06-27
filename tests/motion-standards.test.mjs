#!/usr/bin/env node
// Verification for specs/motion-standards-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

// 1. Blueprint 07: adopted standards + the restraint-governs reconciliation.
const bp = read("blueprints/07-motion-standards.md");
ok(bp, "blueprints/07-motion-standards.md missing");
ok(/ease-out/i.test(bp) && /ease-in\b/i.test(bp), "blueprint 07 must cover easing (ease-out / never bare ease-in)");
ok(/scale\(0\)/.test(bp), "blueprint 07 must cover the no-scale(0) physicality rule");
ok(/prefers-reduced-motion/i.test(bp), "blueprint 07 must cover reduced-motion");
ok(/restraint/i.test(bp) && /(governs|wins|subordinate)/i.test(bp), "blueprint 07 must state 10K restraint governs over Emil's delight permission");
ok(/check:motion/.test(bp), "blueprint 07 must reference the enforced check:motion");

// 2. Reusable code shipped to the template.
const css = read("apps/_template-site/src/styles/global.css");
for (const tok of ["--ease-out", "--ease-in-out", "--ease-drawer"])
  ok(css.includes(tok), `template global.css must ship the ${tok} easing token`);
ok(/:active\s*\{[^}]*scale\(0\.9[0-9]?\)/s.test(css) || /scale\(0\.97\)/.test(css), "template must ship subtle :active press feedback (scale ~0.97)");
ok(/prefers-reduced-motion/.test(css), "template must keep reduced-motion handling");

// 3. Curves must not overshoot/bounce (keeps the impeccable bounce ban).
for (const m of css.matchAll(/cubic-bezier\(([^)]+)\)/g)) {
  const [x1, y1, x2, y2] = m[1].split(",").map((n) => parseFloat(n));
  ok([x1, y1, x2, y2].every((n) => Number.isFinite(n)), `unparseable cubic-bezier: ${m[1]}`);
  ok(y1 <= 1.0001 && y2 <= 1.0001 && y1 >= -0.0001 && y2 >= -0.0001, `cubic-bezier(${m[1]}) overshoots/bounces — not 10K-safe`);
}

// 4. Attribution preserved.
const attr = read("design-intelligence/ATTRIBUTION.md");
ok(/emilkowalski|animations\.dev/i.test(attr) && /MIT/.test(attr), "ATTRIBUTION must credit Emil Kowalski (MIT)");

// 5. check:motion passes on the template.
try {
  execFileSync("node", [join(root, "checks", "motion-lint.mjs")], { stdio: "pipe" });
} catch (e) {
  fails.push(`check:motion failed: ${e.stdout?.toString() || e.stderr?.toString() || e.message}`);
}

if (fails.length) {
  console.error("motion-standards test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("motion-standards test passed: blueprint 07, easing tokens, press feedback, non-bounce curves, attribution, motion-lint all OK.");
