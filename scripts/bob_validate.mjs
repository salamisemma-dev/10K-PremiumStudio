#!/usr/bin/env node
// scripts/bob_validate.mjs — CANONICAL BOB anti-vibe gate (copy into each project).
// Run: node scripts/bob_validate.mjs [--strict] [project-root]
//
// Generic checks (project-agnostic):
//   1. constitution.md exists at root.
//   2. Every specs/**/*.spec.md has frontmatter (id,type,version,status,owner) and a
//      "## Verification" section naming a real file.
//   3. Governance: any constitution/spec containing "pending core ratification" => WARN
//      by default, ERROR under --strict (unratified deviation is drift until core ratifies it).
//
// CRLF-SAFE: all content is normalised \r\n -> \n before parsing. (Earlier versions
// failed on Windows checkouts — every Galaxy project needed a CRLF-fix commit. Fixed here
// once and for all.)
//
// PROJECT-SPECIFIC DRIFT CHECKS: add them in the marked section near the bottom
// (e.g. "schema spec column X must match code Y"). Keep the generic core unchanged.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const roots = args.filter((arg) => arg !== '--strict');
const ROOT = roots[0] ?? process.cwd();
const errors = [];
const warnings = [];
const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

// 1. constitution
if (!existsSync(join(ROOT, 'constitution.md'))) {
  errors.push('Missing constitution.md at project root.');
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// 3 (scan): governance deviation marker across constitution + specs
for (const f of [join(ROOT, 'constitution.md'), ...walk(join(ROOT, 'specs'))].filter(existsSync)) {
  if (/pending core ratification/i.test(read(f))) {
    const msg = `${f.slice(ROOT.length + 1).replace(/\\/g, '/')}: contains an UNRATIFIED deviation (pending core ratification) — ratify in the core constitution + FLEET.md.`;
    (strict ? errors : warnings).push(msg);
  }
}

// 2. specs
const specs = walk(join(ROOT, 'specs')).filter((f) => f.endsWith('.spec.md'));
if (specs.length === 0) errors.push('No specs found under specs/**.');

const REQUIRED_KEYS = ['id', 'type', 'version', 'status', 'owner'];
const PATH_RE = /(package\.json|(?:tests|scripts|checks|blueprints|design-intelligence|specs|supabase|src|app|apps|shared|core|lib)\/[A-Za-z0-9_./-]+)/g;

for (const file of specs) {
  const rel = file.slice(ROOT.length + 1).replace(/\\/g, '/');
  const text = read(file);

  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { errors.push(`${rel}: missing YAML frontmatter.`); continue; }
  for (const key of REQUIRED_KEYS) {
    if (!new RegExp(`^${key}:`, 'm').test(fm[1])) {
      errors.push(`${rel}: frontmatter missing "${key}".`);
    }
  }
  const status = (fm[1].match(/^status:\s*(\S+)/m) || [])[1];
  if (status && status !== 'approved') warnings.push(`${rel}: status is "${status}" (not approved).`);

  const ver = text.match(/##\s*Verification([\s\S]*?)(\n##\s|\s*$)/);
  if (!ver) { errors.push(`${rel}: missing "## Verification" section.`); continue; }
  const realRefs = [...ver[1].matchAll(PATH_RE)].map((m) => m[1]).filter((r) => existsSync(join(ROOT, r)));
  if (realRefs.length === 0) {
    errors.push(`${rel}: Verification names no existing file (a spec untied to a real test is how drift slips in).`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT-SPECIFIC DRIFT CHECKS — add yours below (schema↔code, naming, etc.).
// Example pattern (uncomment + adapt):
//   const dream = existsSync(join(ROOT,'src/cron/nightlyDream.ts')) && read(join(ROOT,'src/cron/nightlyDream.ts'));
//   if (dream) { /* assert columns/invariants */ }
// ─────────────────────────────────────────────────────────────────────────────

// 10K-PremiumStudio drift checks for the design-intelligence integration spec.
try {
  const pkg = JSON.parse(read(join(ROOT, 'package.json')));
  const scripts = pkg.scripts || {};
  for (const name of ['spec:validate', 'test', 'test:design', 'test:ux', 'test:motion', 'test:external', 'test:intake', 'check:design', 'check:ux', 'check:motion', 'intake:convert', 'check']) {
    if (!scripts[name]) errors.push(`package.json: missing required script "${name}".`);
  }
  for (const gate of ['test:design', 'test:ux', 'test:motion', 'test:external', 'test:intake']) {
    if (scripts.test && !scripts.test.includes(gate)) errors.push(`package.json: "test" must run ${gate}.`);
  }
  if (scripts['check:design'] && !/checks\/design-intel\.mjs\s+--selfcheck/.test(scripts['check:design'])) {
    errors.push('package.json: "check:design" must run checks/design-intel.mjs --selfcheck.');
  }
  if (scripts['intake:convert'] && scripts['intake:convert'] !== 'node checks/intake-convert.mjs') {
    errors.push('package.json: "intake:convert" must run node checks/intake-convert.mjs.');
  }
  if (scripts.check && scripts.check.includes('intake:convert')) {
    errors.push('package.json: "check" must not include intake:convert.');
  }
  const deps = JSON.stringify({ dependencies: pkg.dependencies || {}, devDependencies: pkg.devDependencies || {} });
  if (/markitdown|python/i.test(deps)) {
    errors.push('package.json: markitdown/python must remain optional and out of dependencies.');
  }
  if (scripts.check) {
    for (const gate of ['spec:validate', 'test', 'check:design', 'check:ux', 'check:motion']) {
      if (!scripts.check.includes(gate)) errors.push(`package.json: "check" must include ${gate}.`);
    }
  }
} catch (e) {
  errors.push(`package.json: could not parse project scripts (${e.message}).`);
}

try {
  const designIntel = read(join(ROOT, 'checks/design-intel.mjs'));
  if (!/export function selfcheck/.test(designIntel)) {
    errors.push('checks/design-intel.mjs: must export selfcheck for tests.');
  }
  if (!/--selfcheck/.test(designIntel) || !/process\.exit\(selfcheck\(\)/.test(designIntel)) {
    errors.push('checks/design-intel.mjs: CLI --selfcheck must use the exported selfcheck.');
  }
} catch (e) {
  errors.push(`checks/design-intel.mjs: could not read (${e.message}).`);
}
for (const w of warnings) console.warn(`⚠️  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`❌ ${e}`);
  console.error(`\nBOB validate FAILED — ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`✅ BOB validate passed — ${specs.length} spec(s), constitution present${warnings.length ? `, ${warnings.length} warning(s)` : ''}.`);
