import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const runner = join(root, "checks", "astro-command.mjs");

for (const args of [["check"], ["build"]]) {
  const result = spawnSync(process.execPath, [runner, ...args], {
    cwd: root,
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
}
