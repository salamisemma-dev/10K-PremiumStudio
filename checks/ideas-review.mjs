#!/usr/bin/env node
// checks/ideas-review.mjs — keeps the speculative idea backlog well formed and in its lane.
// An idea is a concept with no client yet. It may not masquerade as client delivery
// (projects/) or as a study of a real external site (design-intelligence/references/).
// An empty backlog (only _template.md) passes.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const allowed = new Set(["spark", "exploring", "promote", "parked"]);
const read = (rel) => readFileSync(join(root, rel), "utf8").replace(/\r\n/g, "\n");
const exists = (rel) => existsSync(join(root, rel));
const GUARD = /idea[- ]only|geen klant/i;
const SKIP = new Set(["README.md", "AGENTS.md", "_template.md"]);

function ideaFiles() {
  const dir = join(root, "ideas");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md") && !SKIP.has(name))
    .filter((name) => statSync(join(dir, name)).isFile());
}

function validateTemplate() {
  const rel = "ideas/_template.md";
  if (!exists(rel)) return failures.push(`${rel} missing`);
  const text = read(rel);
  for (const field of ["## Status", "## One-liner", "## Why it could work", "## Open questions", "spark", "exploring", "promote", "parked"]) {
    if (!text.includes(field)) failures.push(`${rel} missing ${field}`);
  }
  if (!GUARD.test(text)) failures.push(`${rel} must carry the idea-only guard (idea-only / geen klant)`);
}

function validateIdea(name) {
  const rel = `ideas/${name}`;
  const text = read(rel);
  if (name.endsWith("-reference.md")) {
    failures.push(`${rel} looks like a reference study; move it to design-intelligence/references/${name.replace(/\.md$/, "")}`);
  }
  if (!text.includes("## Status")) failures.push(`${rel} missing ## Status`);
  const status = text.match(/## Status\s*\n+[-*]\s*`?([a-z-]+)`?/i)?.[1];
  if (!status || !allowed.has(status)) failures.push(`${rel} must declare one status: ${[...allowed].join(", ")}`);
  if (!text.includes("## One-liner")) failures.push(`${rel} missing ## One-liner`);
  if (!GUARD.test(text)) failures.push(`${rel} must carry the idea-only guard (idea-only; geen klant, geen levering)`);
  if (/Lighthouse result:\s*\S/i.test(text) || /Site URL:\s*https?:\/\//i.test(text)) {
    failures.push(`${rel} carries delivery evidence; a built site belongs in projects/<client>/, not ideas/`);
  }
}

validateTemplate();
const ideas = ideaFiles();
for (const name of ideas) validateIdea(name);

if (failures.length) {
  console.error("ideas-review failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`ideas-review passed: idea backlog is well formed (${ideas.length} idea(s)).`);
