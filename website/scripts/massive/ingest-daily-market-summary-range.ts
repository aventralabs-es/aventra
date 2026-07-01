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

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function requireDateArg(name: "from" | "to") {
  const value = getArg(name) || process.env[`MASSIVE_DAILY_MARKET_${name.toUpperCase()}`];

  if (!value) {
    throw new Error(`Missing --${name}=YYYY-MM-DD.`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ${name} date: ${value}. Expected YYYY-MM-DD.`);
  }

  return value;
}

function getBooleanOption(name: string, defaultValue: boolean) {
  const rawValue = getArg(name) || process.env[`MASSIVE_DAILY_MARKET_${name.toUpperCase()}`];

  if (rawValue === undefined) {
    return defaultValue;
  }

  return rawValue.toLowerCase() === "true";
}

function toDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function eachDate(from: string, to: string, skipWeekends: boolean) {
  const dates: string[] = [];
  const current = toDate(from);
  const end = toDate(to);

  while (current <= end) {
    const day = current.getUTCDay();

    if (!skipWeekends || (day !== 0 && day !== 6)) {
      dates.push(toDateString(current));
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

function toTimestamp(milliseconds?: number) {
  return milliseconds === undefined ? null : new Date(milliseconds).toISOString();
}

function buildDailyMarketSummaryPath(date: string, adjusted: boolean, includeOtc: boolean) {
  const params = new URLSearchParams({
    adjusted: String(adjusted),
    include_otc: String(includeOtc),
  });

  return `/v2/aggs/grouped/locale/us/market/stocks/${date}?${params.toString()}`;
}

async function main() {
  loadLocalEnv();

  const from = requireDateArg("from");
  const to = requireDateArg("to");
  const adjusted = getBooleanOption("adjusted", true);
  const includeOtc = getBooleanOption("include_otc", false);
  const skipWeekends = getBooleanOption("skip_weekends", true);
  const dates = eachDate(from, to, skipWeekends);
  const pool = createDbPool();
  let totalBars = 0;

  try {
    for (const date of dates) {
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

      totalBars += bars.length;
      console.log(`Ingested ${bars.length} daily market summary bars for ${date}.`);
    }
  } finally {
    await pool.end();
  }

  console.log(`Finished daily market summary range ${from} to ${to}: ${totalBars} bars across ${dates.length} requested dates.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
