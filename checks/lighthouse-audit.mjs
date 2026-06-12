import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { startStaticServer } from "./static-server.mjs";

const root = process.cwd();
const dist = join(root, "apps", "_template-site", "dist");
const outputDir = join(root, "apps", "_template-site", "delivery");
mkdirSync(outputDir, { recursive: true });

const thresholds = {
  performance: Number(process.env.LH_PERFORMANCE_THRESHOLD ?? 0.9),
  accessibility: Number(process.env.LH_ACCESSIBILITY_THRESHOLD ?? 0.95),
  "best-practices": Number(process.env.LH_BEST_PRACTICES_THRESHOLD ?? 0.95),
  seo: Number(process.env.LH_SEO_THRESHOLD ?? 0.95)
};

const { server, url } = await startStaticServer(dist);
let chrome;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"]
  });

  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
    onlyCategories: Object.keys(thresholds),
    throttlingMethod: "provided",
    formFactor: "desktop",
    screenEmulation: {
      mobile: false,
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false
    }
  });

  const categories = result?.lhr?.categories ?? {};
  const scores = {};
  const failures = [];

  for (const [name, threshold] of Object.entries(thresholds)) {
    const score = categories[name]?.score;
    scores[name] = score;
    if (typeof score !== "number") {
      failures.push(`${name} score missing`);
    } else if (score < threshold) {
      failures.push(`${name} score ${score} below threshold ${threshold}`);
    }
  }

  writeFileSync(
    join(outputDir, "lighthouse-summary.json"),
    `${JSON.stringify({ thresholds, scores }, null, 2)}\n`
  );

  if (failures.length) {
    console.error("Lighthouse audit failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`Lighthouse audit passed: ${JSON.stringify(scores)}`);
  }
} finally {
  try {
    await chrome?.kill();
  } catch (error) {
    // Windows holds a lock on Chrome's temp dir during cleanup; the kill
    // still terminates Chrome, only the temp rm fails. Ignore that case.
    if (error?.code !== "EPERM") throw error;
  }
  await new Promise((resolve) => server.close(resolve));
}
