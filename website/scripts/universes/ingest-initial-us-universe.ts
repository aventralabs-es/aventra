import { spawnSync } from "node:child_process";
import { createDbPool } from "../massive/db";
import { loadLocalEnv } from "../massive/env";

const npmCommand = "npm";

function runScript(scriptName: string, args: string[] = []) {
  const result = spawnSync(npmCommand, ["run", scriptName, "--", ...args], {
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    const errorMessage = result.error ? `: ${result.error.message}` : "";
    throw new Error(`${scriptName} failed with exit code ${result.status}${errorMessage}`);
  }
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function getBatchSize() {
  const batchSizeArg = process.argv.find((arg) => arg.startsWith("--batch-size="));
  const value = Number(
    batchSizeArg?.slice("--batch-size=".length) ||
      process.env.MASSIVE_UNIVERSE_BATCH_SIZE ||
      50,
  );

  return Number.isFinite(value) && value > 0 ? value : 50;
}

function shouldRefreshAll() {
  return (
    process.argv.includes("--refresh-all") ||
    process.env.MASSIVE_UNIVERSE_REFRESH_ALL === "true"
  );
}

async function getInitialUniverseTickers() {
  const pool = createDbPool();

  try {
    const result = await pool.query<{ ticker: string }>(
      `
        select distinct m.ticker
        from market_data.index_memberships m
        where m.universe_code in ('nasdaq_100', 'sp_500')
          and (
            $1::boolean
            or not exists (
              select 1
              from massive.ticker_overviews o
              where o.ticker = m.ticker
                and o.query_date is null
            )
          )
        order by m.ticker
      `,
      [shouldRefreshAll()],
    );

    return result.rows.map((row) => row.ticker);
  } finally {
    await pool.end();
  }
}

async function main() {
  loadLocalEnv();

  const batchSize = getBatchSize();

  runScript("ingest:universes:memberships");
  runScript("ingest:massive:tickers");
  runScript("ingest:massive:ticker-types");

  const tickers = await getInitialUniverseTickers();

  for (const tickerBatch of chunk(tickers, batchSize)) {
    const tickerArg = `--tickers=${tickerBatch.join(",")}`;
    runScript("ingest:massive:ticker-overview", [tickerArg]);
    runScript("ingest:massive:related-tickers", [tickerArg]);
  }

  console.log(`Ingested initial US universe details for ${tickers.length} tickers.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
