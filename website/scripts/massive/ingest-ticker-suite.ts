import { spawnSync } from "node:child_process";

const passthroughArgs = process.argv.slice(2);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function runScript(scriptName: string, args: string[] = []) {
  const result = spawnSync(npmCommand, ["run", scriptName, "--", ...args], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`${scriptName} failed with exit code ${result.status}`);
  }
}

function main() {
  runScript("ingest:massive:tickers");
  runScript("ingest:massive:ticker-types");
  runScript("ingest:massive:ticker-overview", passthroughArgs);
  runScript("ingest:massive:related-tickers", passthroughArgs);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
