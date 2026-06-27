#!/usr/bin/env node
// Verification for specs/external-skills-triage.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

// 1. Reference-study guide: study-not-clone, keeps a11y/SEO, forbids cloning.
const insp = read("design-intelligence/inspection-guide.md");
ok(insp, "design-intelligence/inspection-guide.md missing");
ok(/never\s+clone/i.test(insp), "inspection-guide must forbid cloning");
ok(/scene/i.test(insp) && /(a11y|accessibility)/i.test(insp) && /SEO/i.test(insp), "inspection-guide must keep scene-first + a11y + SEO (what the cloner drops)");

// 2. Blueprint 06 §3b adopted craft rules + left-out note.
const bp = read("blueprints/06-ux-principles.md");
ok(/two-to-three line|2-3 line|2 to 3 line/i.test(bp) || /never wrap to 4/i.test(bp), "blueprint 06 must adopt the H1 line-limit rule");
ok(/grid-flow-dense|grid-auto-flow/i.test(bp), "blueprint 06 must adopt the gapless grid rule");
ok(/hero/i.test(bp) && /(badge|pill-tag|raw stat)/i.test(bp), "blueprint 06 must adopt the hero element bans");
ok(/NEVER Inter|font ban/i.test(bp) && /(brutalist|glass|random)/i.test(bp), "blueprint 06 must record the taste-skill left-out conflicts");

// 3. external-tools: referenced aids + left-out conflict table.
const ext = read("design-intelligence/external-tools.md");
ok(/web-design-guidelines|web interface guidelines/i.test(ext), "external-tools must reference vercel web-design-guidelines");
ok(/deploy-to-vercel/i.test(ext), "external-tools must reference deploy-to-vercel");
ok(/Left out/i.test(ext), "external-tools must have a Left-out section");
ok(/clone-website/i.test(ext) && /brutalist/i.test(ext) && /react/i.test(ext), "left-out must name clone-website, brutalist, and the React skills");

// 4. Additive: no React/Next dependency leaked into the project.
const pkg = JSON.parse(read("package.json") || "{}");
const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
for (const bad of ["react", "react-dom", "next"])
  ok(!(bad in allDeps), `additive integration must not add ${bad} to the Astro project`);

// 5. Owner index references the inspection guide.
const agents = read("design-intelligence/AGENTS.md");
ok(/inspection-guide\.md/.test(agents), "design-intelligence/AGENTS.md must index inspection-guide.md");

if (fails.length) {
  console.error("external-skills test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("external-skills test passed: inspection guide, blueprint 06 craft rules, external-tools triage, no-React, owner index all OK.");
