#!/usr/bin/env node
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "skills/premium-website-builder/SKILL.md");
const packaged = join(root, ".claude-plugin/skills/premium-website-builder/SKILL.md");
const checkOnly = process.argv.includes("--check");

const fail = (message) => {
  console.error(`Packaged skill sync failed: ${message}`);
  process.exit(1);
};

if (!existsSync(source)) fail("missing source skill at skills/premium-website-builder/SKILL.md");
if (!existsSync(packaged)) fail("missing packaged skill at .claude-plugin/skills/premium-website-builder/SKILL.md");

if (checkOnly) {
  const sourceText = readFileSync(source, "utf8");
  const packagedText = readFileSync(packaged, "utf8");
  if (sourceText !== packagedText) {
    fail("packaged skill differs from source; run npm run sync:plugin-skill");
  }
  console.log("Packaged skill sync check passed.");
  process.exit(0);
}

copyFileSync(source, packaged);
console.log("Packaged premium-website-builder skill synced from source.");
