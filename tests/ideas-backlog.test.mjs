#!/usr/bin/env node
// Verification for specs/ideas-backlog-integration.spec.md
// Plain-node test: exits 0 on pass, 1 on failure.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

// 1. Structure
ok(read("ideas/AGENTS.md"), "ideas/AGENTS.md missing");
ok(read("ideas/README.md"), "ideas/README.md missing");
const tpl = read("ideas/_template.md");
ok(tpl, "ideas/_template.md missing");
for (const f of ["## Status", "## One-liner", "## Why it could work", "## Open questions"])
  ok(tpl.includes(f), `ideas/_template.md missing ${f}`);
for (const s of ["spark", "exploring", "promote", "parked"])
  ok(tpl.includes(s), `ideas/_template.md must mention status "${s}"`);
ok(/idea[- ]only|geen klant/i.test(tpl), "ideas/_template.md must carry the idea-only guard");

// 2. Checker enforces the lane
const checker = read("checks/ideas-review.mjs");
ok(checker, "checks/ideas-review.mjs missing");
ok(/-reference\.md/.test(checker), "ideas-review must reject *-reference.md studies (route to references)");
ok(/Lighthouse result|Site URL/.test(checker), "ideas-review must reject delivery evidence (belongs in projects/)");
ok(/spark|exploring|promote|parked/.test(checker), "ideas-review must enforce the allowed statuses");
ok(/idea\[- \]only\|geen klant/.test(checker), "ideas-review must enforce the idea-only guard");

// 3. Boundary docs
const ideasAgents = read("ideas/AGENTS.md");
ok(/not a client|geen klant/i.test(ideasAgents), "ideas/AGENTS.md must state ideas are not client work");
ok(/references/i.test(ideasAgents), "ideas/AGENTS.md must distinguish ideas from reference studies");
ok(/ideas\//.test(read("AGENTS.md")), "root AGENTS.md must index ideas/");
ok(/Markdown files[\s\S]*ideas\//.test(read("AGENTS.md")), "root AGENTS.md must list ideas/ as normalized source of truth");
ok(/ideas\//.test(read("constitution.md")), "constitution must document the ideas/ boundary");
ok(/ideas-review\.mjs/.test(read("checks/AGENTS.md")), "checks/AGENTS.md must document ideas-review.mjs");
ok(/check:ideas/.test(read("checks/AGENTS.md")), "checks/AGENTS.md must list check:ideas");

// 4. Example idea passes the shape (proves the pipeline)
const ex = read("ideas/example-quiet-luxury-microsite.md");
ok(ex, "ideas/example-quiet-luxury-microsite.md missing");
ok(/##\s*Status/.test(ex) && /idea[- ]only|geen klant/i.test(ex), "example idea must carry Status + idea-only guard");
ok(!/Site URL:\s*https?:\/\//i.test(ex) && !/Lighthouse result:\s*\S/i.test(ex), "example idea must not carry delivery evidence");

// 5. package.json wiring
let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch (e) { fails.push(`package.json parse: ${e.message}`); }
const s = pkg.scripts || {};
ok(s["test:ideas"] === "node tests/ideas-backlog.test.mjs", "package.json must define test:ideas");
ok(s["check:ideas"] === "node checks/ideas-review.mjs", "package.json must define check:ideas");
ok(s.test && s.test.includes("test:ideas"), 'package.json "test" chain must run test:ideas');
ok(s.check && s.check.includes("check:ideas"), 'package.json "check" chain must run check:ideas');

if (fails.length) {
  console.error("ideas-backlog test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("ideas-backlog test passed: structure, checker guards, boundary docs, example, and package wiring all OK.");
