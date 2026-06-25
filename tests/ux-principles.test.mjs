#!/usr/bin/env node
// Verification for specs/ux-principles-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

// 1. Blueprint 06: the adopted UX laws + the deliberately-left-out conflict.
const bp = read("blueprints/06-ux-principles.md");
ok(bp, "blueprints/06-ux-principles.md missing");
for (const law of ["Hick", "Jakob", "Miller", "Fitts", "Confirmation Bias", "Nudge"])
  ok(new RegExp(law, "i").test(bp), `blueprint 06 must cover ${law}`);
ok(/not adopted|left.on.the.table|do not widen|wide tracking/i.test(bp), "blueprint 06 must record the left-out wide-tracking conflict");
ok(/check:ux/.test(bp), "blueprint 06 must reference the enforced check:ux");

// 2. Storytelling prompt: 4 acts, mapped to existing owners.
const story = read("prompts/03-storytelling.md");
ok(story, "prompts/03-storytelling.md missing");
for (const act of ["Act 1", "Act 2", "Act 3", "Act 4"])
  ok(story.includes(act), `storytelling must define ${act}`);
ok(/03-design-laws\.md/.test(story) && /02-copywriting\.md/.test(story), "storytelling must cross-ref the owning blueprints, not duplicate them");

// 3. External tools referenced WITH conflict caveats, not wired.
const tools = read("design-intelligence/external-tools.md");
for (const t of ["khroma", "use.ai", "uizard"]) ok(new RegExp(t, "i").test(tools), `external-tools must cover ${t}`);
ok(/scene-first|scene\b/i.test(tools) && /conflict|leave it|caveat/i.test(tools), "external-tools must mark conflicts (scene-first wins)");

// 4. Additive only: existing required file still present (gate intact).
ok(existsSync(join(root, "blueprints/03-design-laws.md")), "03-design-laws.md must still exist (additive integration)");

// 5. Template a11y fix present.
const css = read("apps/_template-site/src/styles/global.css");
ok(/:focus-visible/.test(css), "template global.css must define a :focus-visible state");

// 6. check:ux passes on the template.
try {
  execFileSync("node", [join(root, "checks", "ux-lint.mjs")], { stdio: "pipe" });
} catch (e) {
  fails.push(`check:ux failed: ${e.stdout?.toString() || e.stderr?.toString() || e.message}`);
}

if (fails.length) {
  console.error("ux-principles test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("ux-principles test passed: blueprint 06, storytelling, external-tools caveats, focus fix, ux-lint all OK.");
