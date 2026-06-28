#!/usr/bin/env node
// Verification for specs/motion-standards-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, mkdtempSync, readFileSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { lintSite, runMotionLint } from "../checks/motion-lint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

function withFixture(source, assertFn) {
  const dir = mkdtempSync(join(tmpdir(), "10k-motion-"));
  try {
    mkdirSync(join(dir, "src"), { recursive: true });
    writeFileSync(join(dir, "src", "fixture.astro"), source);
    assertFn(lintSite(dir));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const bp = read("blueprints/07-motion-standards.md");
ok(bp, "blueprints/07-motion-standards.md missing");
ok(/ease-out/i.test(bp) && /ease-in\b/i.test(bp), "blueprint 07 must cover easing (ease-out / never bare ease-in)");
ok(/scale\(0\)/.test(bp), "blueprint 07 must cover the no-scale(0) physicality rule");
ok(/prefers-reduced-motion/i.test(bp), "blueprint 07 must cover reduced-motion");
ok(/restraint/i.test(bp) && /(governs|wins|subordinate)/i.test(bp), "blueprint 07 must state 10K restraint governs over Emil's delight permission");
ok(/check:motion/.test(bp), "blueprint 07 must reference the enforced check:motion");

const css = read("apps/_template-site/src/styles/global.css");
for (const tok of ["--ease-out", "--ease-in-out", "--ease-drawer"])
  ok(css.includes(tok), `template global.css must ship the ${tok} easing token`);
ok(/:active\s*\{[^}]*scale\(0\.9[0-9]?\)/s.test(css) || /scale\(0\.97\)/.test(css), "template must ship subtle :active press feedback (scale ~0.97)");
ok(/prefers-reduced-motion/.test(css), "template must keep reduced-motion handling");

for (const m of css.matchAll(/cubic-bezier\(([^)]+)\)/g)) {
  const [x1, y1, x2, y2] = m[1].split(",").map((n) => parseFloat(n));
  ok([x1, y1, x2, y2].every((n) => Number.isFinite(n)), `unparseable cubic-bezier: ${m[1]}`);
  ok(y1 <= 1.0001 && y2 <= 1.0001 && y1 >= -0.0001 && y2 >= -0.0001, `cubic-bezier(${m[1]}) overshoots/bounces - not 10K-safe`);
}

const attr = read("design-intelligence/ATTRIBUTION.md");
ok(/emilkowalski|animations\.dev/i.test(attr) && /MIT/.test(attr), "ATTRIBUTION must credit Emil Kowalski (MIT)");

ok(runMotionLint({ silent: true }), "check:motion failed on the template");

withFixture('<button class="transition-all duration-300">Bad</button>', (siteFails) => {
  ok(siteFails.some((f) => /transition-all/.test(f)), "motion-lint must reject Tailwind transition-all");
  ok(siteFails.some((f) => /prefers-reduced-motion/.test(f)), "class-only motion must require reduced-motion handling");
});
withFixture('<style>.x{transition-property:all;scale:0}</style><div class="x"></div>', (siteFails) => {
  ok(siteFails.some((f) => /transition-property: all/.test(f)), "motion-lint must reject transition-property: all");
  ok(siteFails.some((f) => /scale: 0/.test(f)), "motion-lint must reject CSS scale: 0");
});
withFixture('<script>gsap.from(".x", { scale: 0, scaleX: 0 })</script><div class="x"></div>', (siteFails) => {
  ok(siteFails.some((f) => /scale key set to 0/.test(f)), "motion-lint must reject GSAP/object scale: 0");
});

const devSkill = read("skills/premium-dev-skill.md");
ok(/blueprints\/07-motion-standards\.md/.test(devSkill), "premium-dev-skill must require reading blueprint 07");
ok(/check:motion/.test(devSkill), "premium-dev-skill must name the motion gate");

if (fails.length) {
  console.error("motion-standards test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("motion-standards test passed: blueprint 07, template tokens, lint fixtures, attribution, and skill docs all OK.");