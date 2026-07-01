#!/usr/bin/env node
// Verification for specs/hero-front-expert-integration.spec.md

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateHeroFrontPrompt, selfCheck } from "../checks/hero-front-prompt.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
const read = (rel) => (existsSync(join(root, rel)) ? readFileSync(join(root, rel), "utf8") : "");

for (const rel of [
  "hero-front/AGENTS.md",
  "hero-front/hero-front-expert.md",
  "hero-front/references.md",
  "prompts/04-hero-front-prompt.md",
  "checks/hero-front-prompt.mjs",
]) ok(read(rel), `${rel} missing`);

const expert = read("hero-front/hero-front-expert.md");
for (const term of ["Camera view", "Background", "Lighting", "Materials and texture", "Negative prompt", "Accessibility", "Duten", "Breakfast", "Juice", "Rolls-Royce", "GoodVisuals"]) ok(expert.includes(term), `hero-front-expert.md missing ${term}`);

const references = read("hero-front/references.md");
for (const term of ["Duten", "Breakfast", "Juice", "Pros:", "Cons and fixes:", "Fix:"]) ok(references.includes(term), `references.md missing ${term}`);

const promptDoc = read("prompts/04-hero-front-prompt.md");
for (const term of ["Nano Banana Pro", "ChatGPT", "Camera view", "Negative prompt", "no text baked into the image"]) ok(promptDoc.includes(term), `prompt doc missing ${term}`);

const assets = read("projects/_template/assets.md");
for (const term of ["Hero Front Direction", "Hero subject", "Camera view", "Background", "Aspect ratio", "Text-safe area", "Generated hero prompt"]) ok(assets.includes(term), `assets template missing ${term}`);

const skill = read("skills/premium-website-builder/SKILL.md");
ok(/hero-front\/hero-front-expert\.md/.test(skill), "premium-website-builder skill must reference hero-front expert");
ok(/hero:prompt/.test(skill), "premium-website-builder skill must mention hero:prompt");
const devSkill = read("skills/premium-dev-skill.md");
ok(/hero-front\/hero-front-expert\.md/.test(devSkill), "premium-dev-skill must reference hero-front expert");

const prompt = generateHeroFrontPrompt("projects/_template");
for (const term of ["HERO FRONT IMAGE PROMPT", "CAMERA VIEW", "BACKGROUND", "LIGHTING", "NEGATIVE PROMPT", "ACCESSIBILITY", "16:9", "4:5"]) ok(prompt.includes(term), `generated prompt missing ${term}`);

const check = selfCheck();
ok(check.ok, `selfCheck failed: ${(check.errors || []).join(", ")}`);

let pkg = {};
try { pkg = JSON.parse(read("package.json")); } catch (e) { fails.push(`package.json parse: ${e.message}`); }
const scripts = pkg.scripts || {};
ok(scripts["hero:prompt"] === "node checks/hero-front-prompt.mjs", "package.json must define hero:prompt");
ok(scripts["test:hero"] === "node tests/hero-front-expert.test.mjs", "package.json must define test:hero");
ok(scripts["check:hero"] === "node checks/hero-front-prompt.mjs --selfcheck", "package.json must define check:hero");
ok(scripts.test && scripts.test.includes("test:hero"), "package.json test chain must run test:hero");
ok(scripts.check && scripts.check.includes("check:hero"), "package.json check chain must run check:hero");

const ci = read(".github/workflows/spec-gate.yml");
for (const term of [
  "node tests/hero-front-expert.test.mjs",
  "node checks/hero-front-prompt.mjs --selfcheck",
  "node scripts/sync-packaged-skill.mjs --check",
]) ok(ci.includes(term), `spec-gate.yml missing ${term}`);

if (fails.length) {
  console.error("hero-front-expert test FAILED:");
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("hero-front-expert test passed: docs, prompt generator, project template, skills, and package wiring all OK.");