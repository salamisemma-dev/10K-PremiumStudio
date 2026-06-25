#!/usr/bin/env node
// Zero-dependency reader over the vendored design-intelligence CSV datasets.
// Lets the studio consult ui-ux-pro-max recommendations from the Node toolchain
// without Python. Recommendations are CANDIDATES filtered by the scene discipline
// (see blueprints/04-design-intelligence.md) — never automatic verdicts.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "design-intelligence", "data");

// --- tiny RFC4180-ish CSV parser (handles quoted commas + escaped quotes) ---
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c === "\r") { /* skip */ }
    else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function load(name) {
  const path = join(dataDir, name);
  if (!existsSync(path)) throw new Error(`Missing dataset: ${name}`);
  const rows = parseCsv(readFileSync(path, "utf8"));
  const header = rows.shift();
  if (!header?.length) throw new Error(`Missing header: ${name}`);
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

function listCsvFiles(dir = dataDir, prefix = "") {
  return readdirSync(dir)
    .flatMap((name) => {
      const path = join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      return statSync(path).isDirectory() ? listCsvFiles(path, rel) : [rel];
    })
    .filter((name) => name.endsWith(".csv"))
    .sort();
}

function score(record, terms) {
  const hay = Object.values(record).join(" ").toLowerCase();
  return terms.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
}

function search(name, query, fields, limit = 5) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const ranked = load(name)
    .map((rec) => ({ rec, s: score(rec, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit);
  return ranked.map(({ rec }) => fields.map((f) => `${f}: ${rec[f]}`).join("\n  "));
}

function print(title, results) {
  console.log(`\n=== ${title} ===`);
  if (!results.length) { console.log("  (no match — fall back to scene-derived choice)"); return; }
  results.forEach((r, i) => console.log(`\n[${i + 1}]\n  ${r}`));
}

const SETS = {
  palette: ["colors.csv", ["No", "Product Type", "Primary", "Accent", "Background", "Foreground", "Notes"]],
  type:    ["products.csv", ["No", "Product Type", "Primary Style Recommendation", "Landing Page Pattern", "Color Palette Focus", "Key Considerations"]],
  style:   ["styles.csv", ["No", "Style Category", "Keywords", "Best For", "Do Not Use For", "Accessibility", "Performance"]],
  font:    ["typography.csv", ["No", "Font Pairing Name", "Heading Font", "Body Font", "Mood/Style Keywords", "Best For", "CSS Import"]],
  ux:      ["ux-guidelines.csv", ["No", "Category", "Issue", "Description", "Do", "Don't", "Severity"]],
  landing: ["landing.csv", ["No", "Pattern Name", "Section Order", "Primary CTA Placement", "Recommended Effects", "Conversion Optimization"]],
  chart:   ["charts.csv", ["No", "Data Type", "Best Chart Type", "When to Use", "Accessibility Notes", "Library Recommendation"]],
};

export function selfcheck({ silent = false } = {}) {
  const log = (...args) => { if (!silent) console.log(...args); };
  const error = (...args) => { if (!silent) console.error(...args); };
  let ok = true;
  const datasets = listCsvFiles();

  for (const file of datasets) {
    try {
      const rows = load(file);
      if (rows.length === 0) { error(`FAIL ${file}: no data rows`); ok = false; }
      else log(`ok   csv      ${file} (${rows.length} rows)`);
    } catch (e) { error(`FAIL ${file}: ${e.message}`); ok = false; }
  }

  for (const [cmd, [file, fields]] of Object.entries(SETS)) {
    try {
      const rows = load(file);
      const missing = fields.filter((f) => !(f in (rows[0] || {})));
      if (missing.length) { error(`FAIL ${file}: missing columns ${missing.join(", ")}`); ok = false; }
      else log(`ok   ${cmd.padEnd(8)} ${file} columns`);
    } catch (e) { error(`FAIL ${file}: ${e.message}`); ok = false; }
  }

  try {
    const rows = load("stacks/astro.csv");
    const missing = ["Category", "Guideline", "Do", "Don't", "Severity"].filter((f) => !(f in (rows[0] || {})));
    if (missing.length) { error(`FAIL stacks/astro.csv: missing columns ${missing.join(", ")}`); ok = false; }
    else log("ok   astro    stacks/astro.csv columns");
  } catch (e) { error(`FAIL stacks/astro.csv: ${e.message}`); ok = false; }

  return ok;
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
const [cmd, ...rest] = process.argv.slice(2);
const query = rest.join(" ").trim();

if (isCli && cmd === "--selfcheck") process.exit(selfcheck() ? 0 : 1);
else if (isCli && cmd === "astro") {
  const rows = parseCsv(readFileSync(join(dataDir, "stacks", "astro.csv"), "utf8"));
  const header = rows.shift();
  const recs = rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
  const filtered = query ? recs.filter((r) => Object.values(r).join(" ").toLowerCase().includes(query.toLowerCase())) : recs;
  print(`Astro stack guidelines${query ? ` matching "${query}"` : ""}`, filtered.slice(0, 12).map((r) => `${r.Category} — ${r.Guideline}\n  Do: ${r.Do}\n  Don't: ${r["Don't"]} [${r.Severity}]`));
} else if (isCli && SETS[cmd]) {
  if (!query) { console.error(`Usage: design-intel ${cmd} "<keywords>"`); process.exit(1); }
  const [file, fields] = SETS[cmd];
  print(`${cmd} matches for "${query}"`, search(file, query, fields));
  console.log(`\nReminder: candidates only. Filter through the client scene + blueprints/04.`);
} else if (isCli) {
  console.log(`design-intel — consult the vendored design-intelligence datasets.

Usage:
  node checks/design-intel.mjs <command> "<keywords>"

Commands:
  palette  "<keywords>"   product/industry color palettes (WCAG-adjusted)
  type     "<keywords>"   product-type design recommendation
  style    "<keywords>"   UI style catalog (best-for / avoid / a11y)
  font     "<keywords>"   typography pairings (Google Fonts)
  ux       "<keywords>"   UX guidelines (do/don't/severity)
  landing  "<keywords>"   landing-page section patterns
  chart    "<keywords>"   chart-type recommendation
  astro    ["<keywords>"] Astro stack guidelines (this repo's framework)
  --selfcheck             validate all datasets parse and have expected columns

All output is candidate guidance, filtered by the scene discipline in
blueprints/04-design-intelligence.md. The scene always wins over product type.`);
}


