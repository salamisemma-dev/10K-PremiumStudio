#!/usr/bin/env node
// Verification for specs/templates-collection-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

const TEMPLATES = [
  "hero-immersive", "narrative-driven", "product-first", "service-agency",
  "saas-dashboard", "portfolio-minimal", "event-conference", "culinary-experience",
  "ngo-mission", "consultant-authority", "art-gallery", "video-3d-reveal",
];

const SECTIONS = [
  "## Wanneer te gebruiken", "## De Structuur", "## Visuele Stijl & Scène",
  "## Typografie", "## Motion", "## Assets", "## Self-Check",
];

// Offline-first bans: nothing in the template layer may pull external runtime deps or stock.
const BANNED = ["cdn.tailwindcss.com", "cdnjs", "unsplash", "pexels", "picsum", "transition: all", "transition:all"];

// 1. Master files
const readme = read("templates/README.md");
ok(readme, "templates/README.md missing");
ok(/startpunt/i.test(readme) && /eindproduct/i.test(readme), "templates/README.md must frame a template as a startpunt, not an eindproduct");
ok(read("templates/AGENTS.md"), "templates/AGENTS.md missing");

const guide = read("templates/selection-guide.md");
ok(guide, "templates/selection-guide.md missing");
ok(/sc[eè]ne wint/i.test(guide), "selection-guide must state the scene wins (scene-first, constitution §5)");
ok(/narratief-vorm/i.test(guide), "selection-guide must select by narrative form, not branche");
for (const t of TEMPLATES) ok(guide.includes(t), `selection-guide must list template "${t}"`);

// 2. Twelve presets, fixed shape
const scanFiles = ["templates/README.md", "templates/selection-guide.md"]; // AGENTS.md names the bans by design; not scanned
for (const t of TEMPLATES) {
  const rel = `templates/${t}/blueprint.md`;
  const bp = read(rel);
  ok(bp, `${rel} missing`);
  if (!bp) continue;
  scanFiles.push(rel);
  for (const s of SECTIONS) ok(bp.includes(s), `${rel} missing section "${s}"`);
  ok(/prefers-reduced-motion/.test(bp), `${rel} must handle prefers-reduced-motion`);
  ok(/sc[eè]ne wint \(§5\)/i.test(bp), `${rel} must carry the constitution footer (scène wint §5)`);
  ok(/--ease-out/.test(bp), `${rel} must reference the motion tokens (blueprint 07)`);
}

// 3. Offline-first ban across the template layer + guide + example
const scanned = [...scanFiles, "docs/templates-user-guide.md", "Examples/hero-immersive-example.md"];
for (const rel of scanned) {
  const text = read(rel).toLowerCase();
  for (const bad of BANNED) {
    ok(!text.includes(bad), `${rel} contains banned external/offline-first violation: "${bad}"`);
  }
}

// 4. Docs guide
const doc = read("docs/templates-user-guide.md");
ok(doc, "docs/templates-user-guide.md missing");
ok(/startpunt/i.test(doc) && /eindproduct/i.test(doc), "docs guide must frame a template as a startpunt, not an eindproduct");
ok(existsSync(join(root, "docs/AGENTS.md")), "docs/AGENTS.md missing");

// 5. Worked example: names a template + maps the six fields
const ex = read("Examples/hero-immersive-example.md");
ok(ex, "Examples/hero-immersive-example.md missing");
ok(/hero-immersive/.test(ex), "example must name the chosen template (hero-immersive)");
for (const field of ["klantnaam", "one thing", "scene", "proof", "assets", "CTA"])
  ok(ex.includes(field), `example must map the six-field "${field}"`);

// 6. Skill reads the selection guide (optional step), without duplicating selection logic
const devSkill = read("skills/premium-dev-skill.md");
ok(/templates\/selection-guide\.md/.test(devSkill), "premium-dev-skill must reference templates/selection-guide.md");

// 7. package.json wiring
let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch (e) { fails.push(`package.json parse: ${e.message}`); }
const scripts = pkg.scripts || {};
ok(scripts["test:templates"] === "node tests/templates-collection.test.mjs", 'package.json must define test:templates = "node tests/templates-collection.test.mjs"');
ok(scripts.test && scripts.test.includes("test:templates"), 'package.json "test" chain must run test:templates');

if (fails.length) {
  console.error("templates-collection test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`templates-collection test passed: ${TEMPLATES.length} presets, selection-guide, docs, example, skill wiring, and package scripts all OK.`);
