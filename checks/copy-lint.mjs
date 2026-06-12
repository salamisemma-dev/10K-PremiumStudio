import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.cwd();
const scanRoots = ["brand", "blueprints", "prompts", "skills", "projects", "apps/_template-site/src"];
const allowedExtensions = new Set([".md", ".astro", ".js", ".css"]);
const failures = [];
const headings = new Map();

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (allowedExtensions.has(extname(full))) {
      lintFile(full);
    }
  }
}

function words(value) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function stripInlineMarkup(value) {
  return value
    .replace(/[`*_>#:[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function lintFile(file) {
  const text = readFileSync(file, "utf8");
  const rel = file.replace(root, "").replace(/^[/\\]/, "");

  if (text.includes("—")) failures.push(`${rel}: contains em dash character`);

  const lines = text.split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    const mdHeading = line.match(/^#{1,3}\s+(.+)$/);
    if (mdHeading) checkHeading(rel, index + 1, stripInlineMarkup(mdHeading[1]));

    const htmlHeading = line.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/);
    if (htmlHeading) checkHeading(rel, index + 1, stripInlineMarkup(htmlHeading[1].replace(/<[^>]+>/g, "")));

    const caption = line.match(/data-caption="([^"]+)"/);
    if (caption && words(caption[1]).length > 5) failures.push(`${rel}:${index + 1}: caption exceeds five words`);
  }
}

function checkHeading(rel, line, heading) {
  if (!heading) return;
  const count = words(heading).length;
  if (count > 5 && rel.includes("apps/_template-site/src")) {
    failures.push(`${rel}:${line}: app headline exceeds five words: "${heading}"`);
  }
  const key = heading.toLowerCase();
  const previous = headings.get(key);
  if (previous && rel.includes("apps/_template-site/src")) {
    failures.push(`${rel}:${line}: repeated app headline "${heading}" also seen at ${previous}`);
  } else {
    headings.set(key, `${rel}:${line}`);
  }
}

for (const dir of scanRoots) {
  walk(join(root, dir));
}

if (failures.length) {
  console.error("Copy lint failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Copy lint passed: no em dash characters or app copy violations found.");
