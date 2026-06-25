#!/usr/bin/env node
// UX lint — enforces the testable subset of blueprints/06-ux-principles.md across
// app sites. Judgment-based UX laws stay in the blueprint + reviewer; these three
// are objective and machine-checkable:
//   1. Visible keyboard focus state exists (a11y, non-negotiable).
//   2. At most two web font families (typography restraint).
//   3. Body copy has a readable line-height / leading (>= ~1.5).
// Scans apps/**; passes when there is nothing to scan (template-only repos).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appsDir = join(root, "apps");

const GENERIC = new Set([
  "ui-sans-serif", "system-ui", "sans-serif", "serif", "monospace", "ui-serif",
  "ui-monospace", "cursive", "fantasy", "inherit", "initial", "unset",
  "-apple-system", "blinkmacsystemfont", "emoji", "math", "fangsong",
]);

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    if (name === "node_modules" || name === "dist" || name === ".astro") return [];
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p, exts) : (exts.some((e) => p.endsWith(e)) ? [p] : []);
  });
}

function firstFamily(decl) {
  // decl is the value after `font-family:`
  const first = decl.split(",")[0].trim().replace(/['"]/g, "").toLowerCase();
  return first;
}

function lintSite(siteDir) {
  const fails = [];
  const cssFiles = walk(join(siteDir, "src"), [".css"]);
  const markup = walk(join(siteDir, "src"), [".astro", ".html", ".jsx", ".tsx", ".vue", ".svelte"]);
  const allCss = cssFiles.map((f) => readFileSync(f, "utf8")).join("\n");
  const allMarkup = markup.map((f) => readFileSync(f, "utf8")).join("\n");

  // 1. focus state
  if (!/:focus(-visible)?\b/.test(allCss) && !/focus-visible:|focus:/.test(allMarkup)) {
    fails.push("no visible focus state found (need :focus-visible in CSS or focus-visible: utilities). a11y is required.");
  }

  // 2. font families (CSS font-family first tokens + Google Fonts family= params)
  const families = new Set();
  for (const m of allCss.matchAll(/font-family\s*:\s*([^;}{]+)/gi)) {
    const fam = firstFamily(m[1]);
    if (fam && !GENERIC.has(fam) && !fam.startsWith("var(")) families.add(fam);
  }
  for (const m of (allCss + allMarkup).matchAll(/fonts\.googleapis\.com\/css2\?([^"'\s)]+)/gi)) {
    for (const fm of m[1].matchAll(/family=([^&:]+)/gi)) families.add(decodeURIComponent(fm[1]).replace(/\+/g, " ").toLowerCase());
  }
  if (families.size > 2) {
    fails.push(`${families.size} font families used (${[...families].join(", ")}); max 2 per the typography law.`);
  }

  // 3. readable body leading
  const hasCssLeading = [...allCss.matchAll(/line-height\s*:\s*([0-9.]+)/gi)].some((m) => parseFloat(m[1]) >= 1.4);
  const hasUtilLeading = /\bleading-(relaxed|loose|7|8|9|10|\[1\.[5-9])/.test(allMarkup);
  if (!hasCssLeading && !hasUtilLeading) {
    fails.push("no readable body line-height found (need line-height >= 1.5 or a leading-relaxed/loose utility).");
  }

  return fails;
}

const sites = existsSync(appsDir)
  ? readdirSync(appsDir).map((n) => join(appsDir, n)).filter((p) => statSync(p).isDirectory() && existsSync(join(p, "src")))
  : [];

if (sites.length === 0) {
  console.log("ux-lint: no app sites with src/ to scan — nothing to check.");
  process.exit(0);
}

let failed = false;
for (const site of sites) {
  const rel = site.slice(root.length + 1).replace(/\\/g, "/");
  const fails = lintSite(site);
  if (fails.length) {
    failed = true;
    console.error(`UX lint FAILED for ${rel}:`);
    for (const f of fails) console.error(`  - ${f}`);
  } else {
    console.log(`ux-lint ok: ${rel}`);
  }
}

if (failed) {
  console.error("\nFix per blueprints/06-ux-principles.md before delivery.");
  process.exit(1);
}
console.log(`ux-lint passed: ${sites.length} site(s).`);
