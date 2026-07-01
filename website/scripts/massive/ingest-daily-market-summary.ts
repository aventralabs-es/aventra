import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveDailyMarketBar = {
  T?: string;
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  t?: number;
  v?: number;
  vw?: number;
};

type MassiveDailyMarketSummaryResponse = {
  adjusted?: boolean;
  queryCount?: number;
  results?: MassiveDailyMarketBar[];
  resultsCount?: number;
  status?: string;
};

function getDateArg() {
  const dateArg = process.argv.find((arg) => arg.startsWith("--date="));
  const date = dateArg?.slice("--date=".length) || process.env.MASSIVE_DAILY_MARKET_DATE;

  if (!date) {
    throw new Error(
      "Missing date. Use -- --date=YYYY-MM-DD or set MASSIVE_DAILY_MARKET_DATE.",
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD.`);
  }

  return date;
}

function getBooleanOption(name: string, defaultValue: boolean) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  const rawValue =
    arg?.slice(`--${name}=`.length) ||
    process.env[`MASSIVE_DAILY_MARKET_${name.toUpperCase()}`];

  if (rawValue === undefined) {
    return defaultValue;
  }

  return rawValue.toLowerCase() === "true";
}

function toTimestamp(milliseconds?: number) {
  return milliseconds === undefined ? null : new Date(milliseconds).toISOString();
}

function buildDailyMarketSummaryPath(
  date: string,
  adjusted: boolean,
  includeOtc: boolean,
) {
  const params = new URLSearchParams({
    adjusted: String(adjusted),
    include_otc: String(includeOtc),
  });

  return `/v2/aggs/grouped/locale/us/market/stocks/${date}?${params.toString()}`;
}

async function main() {
  loadLocalEnv();

  const date = getDateArg();
  const adjusted = getBooleanOption("adjusted", true);
  const includeOtc = getBooleanOption("include_otc", false);
  const pool = createDbPool();

  try {
    const path = buildDailyMarketSummaryPath(date, adjusted, includeOtc);
    const payload = await fetchMassiveJson<MassiveDailyMarketSummaryResponse>(path);
    const bars = payload.results || [];

    await withTransaction(pool, async (client) => {
      await client.query(
        `
          delete from massive.daily_market_summaries
          where trading_date = $1
            and adjusted = $2
            and include_otc = $3
        `,
        [date, adjusted, includeOtc],
      );

      for (const bar of bars) {
        await client.query(
          `
            insert into massive.daily_market_summaries (
              trading_date,
              ticker,
              adjusted,
              include_otc,
              volume,
              volume_weighted_average_price,
              open,
              close,
              high,
              low,
              window_start,
              transactions,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          `,
          [
            date,
            bar.T ?? null,
            adjusted,
            includeOtc,
            bar.v ?? null,
            bar.vw ?? null,
            bar.o ?? null,
            bar.c ?? null,
            bar.h ?? null,
            bar.l ?? null,
            toTimestamp(bar.t),
            bar.n ?? null,
            JSON.stringify(bar),
          ],
        );
      }
    });

    console.log(
      `Ingested ${bars.length} Massive daily market summary bars for ${date}.`,
    );
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
