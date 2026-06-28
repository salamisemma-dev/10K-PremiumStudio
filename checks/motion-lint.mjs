#!/usr/bin/env node
// Motion lint - enforces the objective subset of blueprints/07-motion-standards.md
// (Emil Kowalski's animation standards) across app sites. Feel/timing judgement stays
// in the blueprint + reviewer; these are mechanical and pass the reference template:
//   1. No `transition: all` / `transition-property: all` / Tailwind `transition-all`.
//   2. No bare `ease-in` on UI (delays the moment the user watches; use ease-out).
//   3. No zero-scale entrances (`scale(0)`, `scale: 0`, GSAP `scale: 0`, scaleX/Y/Z 0).
//   4. If a site animates (including Tailwind motion utilities), it must handle
//      `prefers-reduced-motion`.
// Duration is NOT gated: 10K sites are marketing, where longer cinematic timing is
// legitimate (Emil's <300ms rule is for app UI). That stays a review call.
// Scans apps/**; passes when there is nothing to scan.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const thisFile = fileURLToPath(import.meta.url);
const root = join(dirname(thisFile), "..");
const appsDir = join(root, "apps");

const SOURCE_EXTS = [".css", ".astro", ".html", ".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte"];
const TAILWIND_MOTION = /(?:^|[\s"'`])(?:transition(?:-[a-z0-9:/\[\].%#(),-]+)?|animate-[a-z0-9:/\[\].%#(),-]+|duration-\d+|ease-(?:linear|in|out|in-out|\[[^\]]+\]))(?:$|[\s"'`])/i;

function walk(dir, exts = SOURCE_EXTS) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    if (name === "node_modules" || name === "dist" || name === ".astro") return [];
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p, exts) : (exts.some((e) => p.endsWith(e)) ? [p] : []);
  });
}

function hasMotion(text) {
  return /@keyframes|animation:|transition(?:-property)?:|gsap|\.animate\(|framer-motion|motion\//i.test(text)
    || TAILWIND_MOTION.test(text);
}

function zeroScaleFailures(text, rel) {
  const failures = [];
  const patterns = [
    [/\bscale(?:3d)?\(\s*0(?:\.0+)?\s*(?:[,)]|$)/i, "zero transform scale()"],
    [/\bscale[XYZ]?\(\s*0(?:\.0+)?\s*\)/i, "zero axis scale()"],
    [/\bscale\s*:\s*0(?:\.0+)?\b/i, "CSS individual `scale: 0`"],
    [/\bscale[XYZ]?\s*:\s*0(?:\.0+)?\b/i, "object-style scale key set to 0"],
    [/\bscale[XYZ]?\s*=\s*[{"']?0(?:\.0+)?[}"']?/i, "JSX scale prop set to 0"]
  ];
  for (const [pattern, label] of patterns) {
    if (pattern.test(text)) failures.push(`${rel}: ${label} - start from scale(0.9-0.97) + opacity.`);
  }
  return failures;
}

export function lintSite(siteDir) {
  const fails = [];
  const files = walk(join(siteDir, "src"));
  let animates = false;
  let hasReducedMotion = false;

  for (const f of files) {
    const text = readFileSync(f, "utf8");
    const rel = f.slice(siteDir.length + 1).replace(/\\/g, "/");

    if (/transition\s*:\s*all\b/i.test(text)) fails.push(`${rel}: \`transition: all\` - specify exact properties (transform/opacity).`);
    if (/transition-property\s*:\s*all\b/i.test(text)) fails.push(`${rel}: \`transition-property: all\` - specify exact properties (transform/opacity).`);
    if (/(?:^|[\s"'`])transition-all(?:$|[\s"'`])/i.test(text)) fails.push(`${rel}: Tailwind \`transition-all\` - use explicit transition utilities/properties.`);
    if (/(^|[^-])\bease-in\b(?!-out)/i.test(text)) fails.push(`${rel}: bare \`ease-in\` on UI - use ease-out / a strong custom curve.`);
    fails.push(...zeroScaleFailures(text, rel));

    if (hasMotion(text)) animates = true;
    if (/prefers-reduced-motion/i.test(text) || /useReducedMotion/i.test(text) || /motion-reduce:/i.test(text)) hasReducedMotion = true;
  }

  if (animates && !hasReducedMotion) {
    fails.push("site animates but never handles prefers-reduced-motion (gentler, not necessarily zero).");
  }
  return fails;
}

export function findSites(dir = appsDir) {
  return existsSync(dir)
    ? readdirSync(dir).map((n) => join(dir, n)).filter((p) => statSync(p).isDirectory() && existsSync(join(p, "src")))
    : [];
}

export function runMotionLint({ silent = false, sites = findSites() } = {}) {
  if (sites.length === 0) {
    if (!silent) console.log("motion-lint: no app sites with src/ to scan - nothing to check.");
    return true;
  }

  let failed = false;
  for (const site of sites) {
    const rel = site.slice(root.length + 1).replace(/\\/g, "/");
    const fails = lintSite(site);
    if (fails.length) {
      failed = true;
      if (!silent) {
        console.error(`motion-lint FAILED for ${rel}:`);
        for (const f of fails) console.error(`  - ${f}`);
      }
    } else if (!silent) {
      console.log(`motion-lint ok: ${rel}`);
    }
  }

  if (failed) {
    if (!silent) console.error("\nFix per blueprints/07-motion-standards.md before delivery.");
    return false;
  }

  if (!silent) console.log(`motion-lint passed: ${sites.length} site(s).`);
  return true;
}

if (process.argv[1] && thisFile === process.argv[1]) {
  process.exit(runMotionLint() ? 0 : 1);
}
