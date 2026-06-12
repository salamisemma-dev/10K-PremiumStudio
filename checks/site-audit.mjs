import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const htmlPath = join(root, "apps/_template-site/dist/index.html");
const deliveryPath = join(root, "apps/_template-site/delivery.md");
const desktopScreenshot = join(root, "apps/_template-site/delivery/screenshots/desktop.png");
const mobileScreenshot = join(root, "apps/_template-site/delivery/screenshots/mobile.png");
const lighthouseSummary = join(root, "apps/_template-site/delivery/lighthouse-summary.json");
const failures = [];

if (!existsSync(htmlPath)) {
  failures.push("Built HTML missing. Run npm run build before site audit.");
} else {
  const html = readFileSync(htmlPath, "utf8");

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) failures.push(`Expected exactly one h1 in built HTML, found ${h1Count}`);

  for (const token of ["<header", "<nav", "<main", "<section", "<footer"]) {
    if (!html.includes(token)) failures.push(`Built HTML missing semantic token: ${token}`);
  }

  if (!html.includes('type="application/ld+json"')) failures.push("Built HTML missing JSON-LD");
  if (!html.includes('name="description"')) failures.push("Built HTML missing meta description");

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  if (images.length === 0) failures.push("Built HTML has no images to validate");

  for (const image of images) {
    if (!/\balt=/.test(image)) failures.push(`Image missing alt text: ${image}`);
    if (!/\bwidth=/.test(image)) failures.push(`Image missing width: ${image}`);
    if (!/\bheight=/.test(image)) failures.push(`Image missing height: ${image}`);
  }

  const lazyImages = images.filter((image) => /\bloading="lazy"/.test(image));
  if (images.length > 1 && lazyImages.length === 0) failures.push("Below-fold images should use lazy loading");

  if (!html.includes("data-reveal")) failures.push("Built HTML missing reveal hooks for measured motion");
}

if (!existsSync(deliveryPath)) {
  failures.push("delivery.md missing for template site");
} else {
  const delivery = readFileSync(deliveryPath, "utf8");
  for (const label of ["URL", "Commands", "Screenshots", "Lighthouse", "Schema", "Asset Manifest", "Open Risks"]) {
    if (!delivery.includes(`## ${label}`)) failures.push(`delivery.md missing section: ${label}`);
  }
  if (/\bpending\b/i.test(delivery)) failures.push("delivery.md still contains pending evidence");
}

if (!existsSync(desktopScreenshot)) failures.push("Desktop screenshot evidence missing");
if (!existsSync(mobileScreenshot)) failures.push("Mobile screenshot evidence missing");
if (!existsSync(lighthouseSummary)) failures.push("Lighthouse summary evidence missing");

if (failures.length) {
  console.error("Site audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Site audit passed: built HTML, schema, media, a11y basics, and delivery evidence verified.");
