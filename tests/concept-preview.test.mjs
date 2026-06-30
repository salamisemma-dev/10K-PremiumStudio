#!/usr/bin/env node
// Verification for specs/concept-preview-integration.spec.md

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

const html = read("projects/_template/concepts.html");
ok(html, "projects/_template/concepts.html missing");

const conceptMatches = html.match(/data-concept=/g) || [];
ok(conceptMatches.length === 3, `concepts.html must contain exactly 3 concept cards, found ${conceptMatches.length}`);

for (const label of ["Concept A", "Concept B", "Concept C"]) {
  ok(html.includes(label), `concepts.html missing ${label}`);
}

for (const required of [
  "Canonical six fields",
  "Selected template",
  "Rejected runner-up",
  "Layout rhythm",
  "Brand direction",
  "Asset plan",
  "CTA direction",
  "Why this fits",
]) {
  ok(html.includes(required), `concepts.html missing required decision field: ${required}`);
}

for (const field of ["klantnaam", "one thing", "scene", "proof", "assets", "CTA"]) {
  ok(html.includes(field), `concepts.html must reference six-field input: ${field}`);
}

ok(/decision aid/i.test(html) && /not a final website/i.test(html), "concepts.html must frame itself as a decision aid, not a final website");
ok(/scene wins/i.test(html) || /sc[eè]ne wint/i.test(html), "concepts.html must preserve scene-first framing");
ok(/prefers-reduced-motion/.test(html), "concepts.html must include reduced-motion handling");
ok(/<main\b/i.test(html) && /<section\b/i.test(html), "concepts.html must use semantic landmarks");

const banned = ["cdn.tailwindcss.com", "cdnjs", "unsplash", "pexels", "picsum", "fonts.googleapis", "transition: all", "transition:all"];
for (const bad of banned) ok(!html.toLowerCase().includes(bad), `concepts.html contains banned offline-first violation: ${bad}`);

const doc = read("docs/concept-preview-guide.md");
ok(doc, "docs/concept-preview-guide.md missing");
ok(/three concept/i.test(doc) || /drie concept/i.test(doc), "concept guide must explain the three concept preview");
ok(/projects\/_template\/concepts\.html/.test(doc), "concept guide must reference projects/_template/concepts.html");

const projectAgents = read("projects/AGENTS.md");
ok(/concepts\.html/.test(projectAgents), "projects/AGENTS.md must document concepts.html");

const devSkill = read("skills/premium-dev-skill.md");
ok(/concepts\.html/.test(devSkill), "premium-dev-skill must mention concepts.html workflow");
ok(/templates\/selection-guide\.md/.test(devSkill), "premium-dev-skill must still reference template selection guide");

let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch (e) { fails.push(`package.json parse: ${e.message}`); }
const scripts = pkg.scripts || {};
ok(scripts["test:concepts"] === "node tests/concept-preview.test.mjs", 'package.json must define test:concepts = "node tests/concept-preview.test.mjs"');
ok(scripts.test && scripts.test.includes("test:concepts"), 'package.json "test" chain must run test:concepts');

if (fails.length) {
  console.error("concept-preview test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("concept-preview test passed: reusable three-concept HTML, docs, skill, DOX, and package wiring all OK.");