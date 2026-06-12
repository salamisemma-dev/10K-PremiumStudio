import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, normalize } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = normalize(join(scriptDir, ".."));
const appDir = join(root, "apps", "_template-site");
const astroBin = join(root, "node_modules", "astro", "astro.js");
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node checks/astro-command.mjs <astro-command> [...args]");
  process.exit(1);
}

if (!existsSync(astroBin)) {
  console.error("Astro binary missing. Run npm install first.");
  process.exit(1);
}

const result = spawnSync(process.execPath, [astroBin, ...args], {
  cwd: appDir,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
    NO_TELEMETRY: "1"
  },
  stdio: "inherit",
  shell: false
});

process.exit(result.status ?? 1);
