import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const required = [
  "AGENTS.md",
  "README.md",
  ".gitignore",
  ".env.example",
  "brand/AGENTS.md",
  "brand/manifest.md",
  "blueprints/AGENTS.md",
  "blueprints/01-core-architecture.md",
  "blueprints/02-seo-frontpage-matrix.md",
  "prompts/AGENTS.md",
  "prompts/00-discovery-master.md",
  "prompts/01-visual-assets.md",
  "prompts/02-copywriting.md",
  "skills/AGENTS.md",
  "skills/premium-dev-skill.md",
  "projects/AGENTS.md",
  "projects/_template/brief.md",
  "projects/_template/content.md",
  "projects/_template/assets.md",
  "projects/_template/acceptance.md",
  "apps/AGENTS.md",
  "apps/_template-site/AGENTS.md",
  "apps/_template-site/package.json",
  "apps/_template-site/astro.config.mjs",
  "apps/_template-site/src/pages/index.astro",
  "apps/_template-site/src/scripts/motion.js",
  "apps/_template-site/src/styles/global.css",
  "checks/AGENTS.md",
  "checks/astro-command.mjs",
  "checks/browser-audit.mjs",
  "checks/build-template.mjs",
  "checks/copy-lint.mjs",
  "checks/lighthouse-audit.mjs",
  "checks/site-audit.mjs",
  "checks/static-server.mjs",
  "checks/structure-check.mjs",
  "checks/website-quality-checklist.md",
  "Template/AGENTS.md",
  "Template/klant-website-discovery-vragenlijst.md",
  "Examples/AGENTS.md",
  ".github/workflows/quality.yml"
];

const failures = [];

for (const file of required) {
  if (!existsSync(join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const pagePath = join(root, "apps/_template-site/src/pages/index.astro");
if (existsSync(pagePath)) {
  const page = readFileSync(pagePath, "utf8");
  const h1Count = (page.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) failures.push(`Expected exactly one h1 in template site, found ${h1Count}`);
  for (const token of ["<header", "<nav", "<main", "<section", "<footer"]) {
    if (!page.includes(token)) failures.push(`Template site missing semantic token: ${token}`);
  }
  if (!page.includes('type="application/ld+json"')) failures.push("Template site missing JSON-LD script");
  if (!page.includes("width=") || !page.includes("height=")) failures.push("Template site must dimension media or visual placeholders");
  if (!page.includes("alt=")) failures.push("Template site must include image alt text");
}

const motionPath = join(root, "apps/_template-site/src/scripts/motion.js");
if (existsSync(motionPath)) {
  const motion = readFileSync(motionPath, "utf8");
  if (!motion.includes("prefers-reduced-motion")) failures.push("Motion script must respect prefers-reduced-motion");
}

const astroConfigPath = join(root, "apps/_template-site/astro.config.mjs");
if (existsSync(astroConfigPath)) {
  const config = readFileSync(astroConfigPath, "utf8");
  if (!config.includes("strictPort: true")) failures.push("Astro config must use strictPort: true");
  if (!config.includes("port: 4321")) failures.push("Astro config must pin the canonical dev port 4321");
}

if (failures.length) {
  console.error("Structure check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Structure check passed: ${required.length} required files and template safeguards verified.`);
