#!/usr/bin/env node
// Verification for specs/ux-principles-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, mkdtempSync, readFileSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { lintSite, runUxLint } from "../checks/ux-lint.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

function withFixture(files, assertFn) {
  const dir = mkdtempSync(join(tmpdir(), "10k-ux-"));
  try {
    mkdirSync(join(dir, "src"), { recursive: true });
    for (const [name, source] of Object.entries(files)) {
      writeFileSync(join(dir, "src", name), source);
    }
    assertFn(lintSite(dir));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const bp = read("blueprints/06-ux-principles.md");
ok(bp, "blueprints/06-ux-principles.md missing");
for (const law of ["Hick", "Jakob", "Miller", "Fitts", "Confirmation Bias", "Nudge"])
  ok(new RegExp(law, "i").test(bp), `blueprint 06 must cover ${law}`);
ok(/not adopted|left.on.the.table|do not widen|wide tracking/i.test(bp), "blueprint 06 must record the left-out wide-tracking conflict");
ok(/check:ux/.test(bp), "blueprint 06 must reference the enforced check:ux");

const story = read("prompts/03-storytelling.md");
ok(story, "prompts/03-storytelling.md missing");
for (const act of ["Act 1", "Act 2", "Act 3", "Act 4"])
  ok(story.includes(act), `storytelling must define ${act}`);
ok(/03-design-laws\.md/.test(story) && /02-copywriting\.md/.test(story), "storytelling must cross-ref the owning blueprints, not duplicate them");

const tools = read("design-intelligence/external-tools.md");
for (const t of ["khroma", "use.ai", "uizard"]) ok(new RegExp(t, "i").test(tools), `external-tools must cover ${t}`);
ok(/scene-first|scene\b/i.test(tools) && /conflict|leave it|caveat/i.test(tools), "external-tools must mark conflicts (scene-first wins)");

ok(existsSync(join(root, "blueprints/03-design-laws.md")), "03-design-laws.md must still exist (additive integration)");

const css = read("apps/_template-site/src/styles/global.css");
ok(/:focus-visible/.test(css), "template global.css must define a :focus-visible state");
ok(runUxLint({ silent: true }), "check:ux failed on the template");

withFixture({ "fixture.css": "body{font-family:Inter,sans-serif;line-height:1.5}" }, (siteFails) => {
  ok(siteFails.some((f) => /focus state/.test(f)), "ux-lint must reject missing focus state");
});
withFixture({ "fixture.css": ":focus-visible{outline:2px solid #000} body{font-family:Inter,sans-serif}.a{font-family:Georgia,serif}.b{font-family:Arial,sans-serif;line-height:1.5}" }, (siteFails) => {
  ok(siteFails.some((f) => /font families/.test(f)), "ux-lint must reject more than two font families");
});
withFixture({ "fixture.css": ":focus-visible{outline:2px solid #000} body{font-family:Inter,sans-serif;line-height:1.4}" }, (siteFails) => {
  ok(siteFails.some((f) => /line-height/.test(f)), "ux-lint must reject line-height below 1.5");
});

if (fails.length) {
  console.error("ux-principles test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("ux-principles test passed: blueprint 06, storytelling, external-tools caveats, focus fix, negative fixtures, ux-lint all OK.");