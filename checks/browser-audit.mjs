import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { startStaticServer } from "./static-server.mjs";

const root = process.cwd();
const dist = join(root, "apps", "_template-site", "dist");
const screenshotDir = join(root, "apps", "_template-site", "delivery", "screenshots");
const htmlPath = join(dist, "index.html");

if (!existsSync(htmlPath)) {
  console.error("Browser audit failed: built HTML missing. Run npm run build before check:browser.");
  process.exit(1);
}
mkdirSync(screenshotDir, { recursive: true });

const { server, url } = await startStaticServer(dist);
const errors = [];
let browser;

try {
  browser = await chromium.launch({ headless: true });

  for (const target of [
    { name: "desktop", width: 1280, height: 900 },
    { name: "mobile", width: 375, height: 812 }
  ]) {
    const page = await browser.newPage({
      viewport: { width: target.width, height: target.height },
      reducedMotion: target.name === "mobile" ? "reduce" : "no-preference"
    });

    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`${target.name} console error: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`${target.name} page error: ${error.message}`));

    const response = await page.goto(url, { waitUntil: "networkidle" });
    if (!response?.ok()) errors.push(`${target.name} response was ${response?.status() ?? "missing"}`);

    await page.waitForTimeout(1200);

    const h1 = await page.locator("h1").textContent();
    if (h1?.trim() !== "Quiet work sells.") errors.push(`${target.name} unexpected h1: ${h1}`);

    const jsonLd = await page.locator('script[type="application/ld+json"]').count();
    if (jsonLd !== 1) errors.push(`${target.name} expected one JSON-LD script, found ${jsonLd}`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    if (overflow) errors.push(`${target.name} has horizontal overflow`);

    const brokenImages = await page.locator("img").evaluateAll((images) => images
      .filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0)
      .map((image) => image.getAttribute("src") || "unknown"));
    for (const src of brokenImages) errors.push(`${target.name} image failed to load: ${src}`);

    const h1FontSize = await page.locator("h1").evaluate((node) => parseFloat(getComputedStyle(node).fontSize));
    if (h1FontSize < 40) errors.push(`${target.name} h1 styling did not load; font size was ${h1FontSize}px`);

    if (target.name === "mobile") {
      const reducedMotion = await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      if (!reducedMotion) errors.push("mobile reduced-motion emulation was not active");
    }

    await page.screenshot({ path: join(screenshotDir, `${target.name}.png`), fullPage: true });
    await page.close();
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}

if (errors.length) {
  console.error("Browser audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Browser audit passed: desktop and mobile screenshots written to ${screenshotDir}.`);
