#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const args = process.argv.slice(2);
const selfcheck = args.includes("--selfcheck");
const projectArg = args.find((arg) => arg !== "--selfcheck") || "projects/_template";

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : "";
}

function fieldValue(text, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp("^- `" + escaped + "`:[ \\t]*([^\\r\\n]*)$", "im"),
    new RegExp("^- " + escaped + ":[ \\t]*([^\\r\\n]*)$", "im"),
  ];
  for (const pattern of patterns) {
    const value = text.match(pattern)?.[1]?.trim();
    if (value) return value;
  }
  return `[${key}]`;
}

const bulletValue = fieldValue;
const sectionValue = fieldValue;

export function generateHeroFrontPrompt(projectDir = "projects/_template") {
  const resolved = resolve(root, projectDir);
  const brief = readIfExists(join(resolved, "brief.md"));
  const assets = readIfExists(join(resolved, "assets.md"));

  const klantnaam = bulletValue(brief, "klantnaam");
  const oneThing = bulletValue(brief, "one thing");
  const scene = bulletValue(brief, "scene");
  const proof = bulletValue(brief, "proof");
  const cta = bulletValue(brief, "CTA");
  const adopted = sectionValue(brief, "Adopted reference lessons");
  const rejected = sectionValue(brief, "Rejected reference lessons");
  const cinematicScene = sectionValue(assets, "Cinematic scene");
  const lighting = sectionValue(assets, "Lighting");
  const color = sectionValue(assets, "Color direction");
  const texture = sectionValue(assets, "Texture");

  return `HERO FRONT IMAGE PROMPT

Create a premium first-viewport hero image for ${klantnaam}.

HERO JOB
Make the visitor understand this in one glance: ${oneThing}. Support the CTA: ${cta}. Use proof as visual credibility: ${proof}.

SUBJECT
Choose one primary subject from the client scene: ${scene}. If the subject is unclear, use a refined object, space, or material detail that symbolizes the one thing.

CAMERA VIEW
Prestige editorial camera view, deliberate crop, one focal point, realistic lens compression, no wide-angle distortion. Keep a clean text-safe area for headline and CTA.

BACKGROUND
${cinematicScene}. Add depth and calm negative space. Remove distracting props. The background must feel specific, not stock.

LIGHTING
${lighting}. Color direction: ${color}. Controlled reflections, realistic shadows, premium contrast, no artificial glow unless the scene requires it.

MATERIAL AND TEXTURE
${texture}. Make surface truth visible: material, grain, reflection, weight, craft, or atmosphere.

COMPOSITION
Desktop 16:9 master, mobile 4:5 crop safe, subject offset with clear copy area, CTA area preserved, no text baked into the image.

MOTION IMPLICATION
The image must work as a still frame. Optional motion may be a subtle loop only if it supports the scene.

REFERENCE INFLUENCE
Adopt: ${adopted}. Reject: ${rejected}. Do not clone any reference site.

NEGATIVE PROMPT
No stock-photo smile, no fake UI, no random props, no generic luxury car cues unless the client sells cars, no copied brand marks, no text, no watermarks, no low-resolution artifacts, no clutter.

ACCESSIBILITY AND DELIVERY
Write final alt text after image selection. Use fixed width and height. Preload only if this is the primary hero image. Store the final prompt and asset metadata in projects/<client>/assets.md.`;
}

export function selfCheck() {
  const docs = [
    "hero-front/AGENTS.md",
    "hero-front/hero-front-expert.md",
    "hero-front/references.md",
    "prompts/04-hero-front-prompt.md",
  ];
  const missing = docs.filter((doc) => !existsSync(join(root, doc)));
  if (missing.length) return { ok: false, errors: missing.map((doc) => `Missing ${doc}`) };
  const prompt = generateHeroFrontPrompt("projects/_template");
  const required = ["CAMERA VIEW", "BACKGROUND", "LIGHTING", "COMPOSITION", "NEGATIVE PROMPT", "ACCESSIBILITY", "16:9", "4:5"];
  const errors = required.filter((term) => !prompt.includes(term)).map((term) => `Generated prompt missing ${term}`);
  return { ok: errors.length === 0, errors };
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  if (selfcheck) {
    const result = selfCheck();
    if (!result.ok) {
      console.error("hero-front prompt selfcheck failed:");
      for (const error of result.errors) console.error(`- ${error}`);
      process.exit(1);
    }
    console.log("hero-front prompt selfcheck passed.");
  } else {
    console.log(generateHeroFrontPrompt(projectArg));
  }
}
