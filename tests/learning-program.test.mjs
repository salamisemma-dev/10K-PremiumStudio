#!/usr/bin/env node
// Verification for specs/learning-program-integration.spec.md

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

const learningTemplate = read("projects/_template/learning.md");
ok(learningTemplate, "projects/_template/learning.md missing");
for (const required of ["## Status", "## Delivery Evidence Reviewed", "## Lessons", "Evidence:", "Pattern or issue:", "Affected owner file:", "Proposed change:", "Pros:", "Cons and fixes:", "Reviewer decision:", "Status:", "## No Durable Lessons"]) ok(learningTemplate.includes(required), `learning template missing required field: ${required}`);
for (const status of ["draft", "proposed", "accepted", "rejected", "shipped"]) ok(learningTemplate.includes(status), `learning template must mention status "${status}"`);

const guide = read("docs/learning-program.md");
ok(guide, "docs/learning-program.md missing");
ok(/explanatory/i.test(guide), "learning guide must state it is explanatory");
ok(/review/i.test(guide), "learning guide must require review");
ok(/must not automatically rewrite/i.test(guide), "learning guide must reject automatic rewrites");

const patterns = read("learning/patterns.md");
ok(patterns, "learning/patterns.md missing");
for (const term of ["GoodVisuals", "Rolls-Royce", "Pros:", "Cons and fixes:", "Status:"]) ok(patterns.includes(term), `learning/patterns.md must capture reviewed pattern term: ${term}`);

ok(/learning\//.test(read("AGENTS.md")), "root AGENTS.md must index learning/");
ok(read("learning/AGENTS.md"), "learning/AGENTS.md missing");
const projectAgents = read("projects/AGENTS.md");
ok(/learning\.md/.test(projectAgents), "projects/AGENTS.md must document learning.md");
ok(/design-intelligence\/references\//.test(projectAgents), "projects/AGENTS.md must route reference dossiers to design-intelligence/references/");
ok(!/\w+-reference\//.test(projectAgents), "projects/AGENTS.md must not index reference dossiers as client projects");
ok(read("design-intelligence/references/AGENTS.md"), "design-intelligence/references/AGENTS.md missing");
ok(/reference-learning dossiers/i.test(read("design-intelligence/AGENTS.md")), "design-intelligence/AGENTS.md must document reference dossiers");
ok(/learning-program\.md/.test(read("docs/AGENTS.md")), "docs/AGENTS.md must index learning-program.md");
ok(/learning-review\.mjs/.test(read("checks/AGENTS.md")), "checks/AGENTS.md must document learning-review.mjs");
ok(/design-intelligence[\\/]+references/.test(read("checks/learning-review.mjs")), "learning-review must scan design-intelligence references separately");
ok(/endsWith\("-reference"\)/.test(read("checks/learning-review.mjs")), "learning-review must reject misplaced projects/*-reference dossiers");
ok(/reference\[- \]only\|not a delivered site\|not a delivered website/.test(read("checks/learning-review.mjs")), "learning-review must enforce reference-only labels");
ok(!existsSync(join(root, "projects/cartier-waw-reference")), "reference dossiers must not live under projects/");
ok(existsSync(join(root, "design-intelligence/references/cartier-waw-reference/learning.md")), "reference dossiers must live under design-intelligence/references/");

const devSkill = read("skills/premium-dev-skill.md");
ok(/learning\.md/.test(devSkill), "premium-dev-skill must include the learning step");
ok(/reviewed/i.test(devSkill), "premium-dev-skill must require reviewed owner edits");
const builderSkill = read("skills/premium-website-builder/SKILL.md");
ok(/learning\.md/.test(builderSkill), "premium-website-builder skill must include the learning step");
ok(/learning\/patterns\.md/.test(builderSkill), "premium-website-builder skill must reference learning/patterns.md");

let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch (e) { fails.push(`package.json parse: ${e.message}`); }
const scripts = pkg.scripts || {};
ok(scripts["test:learning"] === "node tests/learning-program.test.mjs", "package.json must define test:learning");
ok(scripts["check:learning"] === "node checks/learning-review.mjs", "package.json must define check:learning");
ok(scripts.test && scripts.test.includes("test:learning"), "package.json test chain must run test:learning");
ok(scripts.check && scripts.check.includes("check:learning"), "package.json check chain must run check:learning");

const specGate = read(".github/workflows/spec-gate.yml");
ok(/learning-program\.test\.mjs/.test(specGate), "spec-gate workflow must run learning-program test");
ok(/learning-review\.mjs/.test(specGate), "spec-gate workflow must run learning-review check");

if (fails.length) {
  console.error("learning-program test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("learning-program test passed: template, guide, patterns, skills, DOX, package scripts, and CI wiring all OK.");