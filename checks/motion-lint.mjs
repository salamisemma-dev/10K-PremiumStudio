#!/usr/bin/env node
// Motion lint — enforces the objective subset of blueprints/07-motion-standards.md
// (Emil Kowalski's animation standards) across app sites. Feel/timing judgement stays
// in the blueprint + reviewer; these are mechanical and pass the reference template:
//   1. No `transition: all` (unbounded, off-GPU property animation).
//   2. No bare `ease-in` on UI (delays the moment the user watches; use ease-out).
//   3. No `scale(0)` entrances (nothing appears from nothing — use scale(0.9–0.97)).
//   4. If a site animates, it must handle `prefers-reduced-motion`.
// Duration is NOT gated: 10K sites are marketing, where longer cinematic timing is
// legitimate (Emil's <300ms rule is for app UI). That stays a review call.
// Scans apps/**; passes when there is nothing to scan.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appsDir = join(root, "apps");

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    if (name === "node_modules" || name === "dist" || name === ".astro") return [];
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p, exts) : (exts.some((e) => p.endsWith(e)) ? [p] : []);
  });
}

function lintSite(siteDir) {
  const fails = [];
  const files = walk(join(siteDir, "src"), [".css", ".astro", ".html", ".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte"]);
  let animates = false;
  let hasReducedMotion = false;

  for (const f of files) {
    const text = readFileSync(f, "utf8");
    const rel = f.slice(siteDir.length + 1).replace(/\\/g, "/");

    if (/transition:\s*all\b/i.test(text)) fails.push(`${rel}: \`transition: all\` — specify exact properties (transform/opacity).`);
    if (/(^|[^-])\bease-in\b(?!-out)/i.test(text)) fails.push(`${rel}: bare \`ease-in\` on UI — use ease-out / a strong custom curve.`);
    if (/scale\(\s*0\s*[,)]/i.test(text)) fails.push(`${rel}: \`scale(0)\` entrance — start from scale(0.9–0.97) + opacity.`);
    if (/scale3d\(\s*0\s*,/i.test(text)) fails.push(`${rel}: \`scale3d(0,...)\` entrance — start from a visible scale.`);

    if (/@keyframes|animation:|transition:|gsap|\.animate\(|framer-motion|motion\//i.test(text)) animates = true;
    if (/prefers-reduced-motion/i.test(text) || /useReducedMotion/i.test(text)) hasReducedMotion = true;
  }

  if (animates && !hasReducedMotion) {
    fails.push("site animates but never handles prefers-reduced-motion (gentler, not necessarily zero).");
  }
  return fails;
}

const sites = existsSync(appsDir)
  ? readdirSync(appsDir).map((n) => join(appsDir, n)).filter((p) => statSync(p).isDirectory() && existsSync(join(p, "src")))
  : [];

if (sites.length === 0) {
  console.log("motion-lint: no app sites with src/ to scan — nothing to check.");
  process.exit(0);
}

let failed = false;
for (const site of sites) {
  const rel = site.slice(root.length + 1).replace(/\\/g, "/");
  const fails = lintSite(site);
  if (fails.length) {
    failed = true;
    console.error(`motion-lint FAILED for ${rel}:`);
    for (const f of fails) console.error(`  - ${f}`);
  } else {
    console.log(`motion-lint ok: ${rel}`);
  }
}

if (failed) {
  console.error("\nFix per blueprints/07-motion-standards.md before delivery.");
  process.exit(1);
}
console.log(`motion-lint passed: ${sites.length} site(s).`);
