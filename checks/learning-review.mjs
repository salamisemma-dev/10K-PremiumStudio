#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const allowedStatuses = new Set(["draft", "proposed", "accepted", "rejected", "shipped"]);
const read = (rel) => readFileSync(join(root, rel), "utf8").replace(/\r\n/g, "\n");
const exists = (rel) => existsSync(join(root, rel));

function projectDirs() {
  const dir = join(root, "projects");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name !== "_template")
    .map((name) => ({ name, path: join(dir, name) }))
    .filter((entry) => statSync(entry.path).isDirectory());
}

function rejectMisplacedReferenceProjects(projects) {
  for (const project of projects) {
    if (project.name.endsWith("-reference")) {
      failures.push(`projects/${project.name} is a reference dossier; move it to design-intelligence/references/${project.name}`);
    }
  }
}

function referenceDirs() {
  const dir = join(root, "design-intelligence", "references");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((name) => ({ name, path: join(dir, name) }))
    .filter((entry) => statSync(entry.path).isDirectory());
}

function hasFilledDeliveryEvidence(projectName) {
  const rel = `projects/${projectName}/acceptance.md`;
  if (!exists(rel)) return false;
  const text = read(rel);
  const evidence = text.match(/## Delivery Evidence([\s\S]*)$/);
  if (!evidence) return false;
  return ["URL:", "Build command:", "Check command:", "Screenshot paths:", "Lighthouse result:"]
    .every((label) => new RegExp(`${label}\\s*\\S`, "i").test(evidence[1]));
}

function validateTemplate() {
  const rel = "projects/_template/learning.md";
  if (!exists(rel)) return failures.push(`${rel} missing`);
  const text = read(rel);
  for (const field of ["## Status", "## Delivery Evidence Reviewed", "## Lessons", "Evidence:", "Pattern or issue:", "Affected owner file:", "Proposed change:", "Pros:", "Cons and fixes:", "Reviewer decision:", "Status:", "## No Durable Lessons"]) {
    if (!text.includes(field)) failures.push(`${rel} missing ${field}`);
  }
}

function validateReferenceLabel(name) {
  const rels = [
    `design-intelligence/references/${name}/learning.md`,
    `design-intelligence/references/${name}/acceptance.md`,
  ];
  const text = rels.filter(exists).map(read).join("\n");
  if (!/reference[- ]only|not a delivered site|not a delivered website/i.test(text)) {
    failures.push(`design-intelligence/references/${name} must label itself as reference-only, not delivered client work`);
  }
}

function validateLearning(rel, requireComplete = false) {
  if (!exists(rel)) {
    if (requireComplete) failures.push(`${rel} missing for completed project`);
    return;
  }
  const text = read(rel);
  for (const heading of ["## Status", "## Delivery Evidence Reviewed", "## Lessons"]) if (!text.includes(heading)) failures.push(`${rel} missing ${heading}`);
  const status = text.match(/## Status\s*\n+[-*]\s*`?([a-z-]+)`?/i)?.[1];
  if (!status || !allowedStatuses.has(status)) failures.push(`${rel} must declare one allowed status: ${[...allowedStatuses].join(", ")}`);
  if (/automatically\s+(rewrite|update|mutate|change)/i.test(text)) failures.push(`${rel} must not promise automatic mutation of source owners`);

  const lessonBlocks = text.split(/^###\s+/m).slice(1);
  const hasNoDurable = /## No Durable Lessons\s*\n+[-*]\s+\S/i.test(text);
  if (!lessonBlocks.length && !hasNoDurable) failures.push(`${rel} must include at least one lesson or a No Durable Lessons note`);

  for (const block of lessonBlocks) {
    for (const field of ["Evidence:", "Pattern or issue:", "Affected owner file:", "Proposed change:", "Pros:", "Cons and fixes:", "Reviewer decision:", "Status:"]) if (!block.includes(field)) failures.push(`${rel} lesson missing ${field}`);
    const owner = (block.match(/Affected owner file:\s*([^\n]+)/i)?.[1] || "").trim().replace(/`/g, "");
    const lessonStatus = (block.match(/Status:\s*([a-z-]+)/i)?.[1] || "").trim();
    if (lessonStatus && !allowedStatuses.has(lessonStatus)) failures.push(`${rel} lesson has invalid status: ${lessonStatus}`);
    if (["accepted", "shipped"].includes(lessonStatus) && (!owner || !exists(owner))) failures.push(`${rel} accepted/shipped lesson references missing owner file: ${owner || "(blank)"}`);
    const cons = [...block.matchAll(/\bCon:\s*([^\n]*)/gi)];
    const fixes = [...block.matchAll(/\bFix:\s*([^\n]*)/gi)];
    if (cons.length && fixes.length < cons.length) failures.push(`${rel} every Con must have a Fix in the same lesson`);
  }
}

validateTemplate();
const projects = projectDirs();
rejectMisplacedReferenceProjects(projects);
for (const project of projects) validateLearning(`projects/${project.name}/learning.md`, hasFilledDeliveryEvidence(project.name));
for (const reference of referenceDirs()) {
  validateReferenceLabel(reference.name);
  validateLearning(`design-intelligence/references/${reference.name}/learning.md`, false);
}

if (failures.length) {
  console.error("learning-review failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("learning-review passed: client project and reference learning records are present and well formed.");