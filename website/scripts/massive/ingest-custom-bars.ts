import { fetchMassiveJson } from "./client";
import { createDbPool } from "./db";
import { loadLocalEnv } from "./env";
import { getTickerArgs } from "./ticker-args";

type Timeframe = "1d" | "4h" | "15m";

type TimeframeConfig = {
  multiplier: number;
  tableName: "aggregate_bars_1d" | "aggregate_bars_4h" | "aggregate_bars_15m";
  timespan: "day" | "hour" | "minute";
};

type MassiveAggregateBar = {
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  otc?: boolean;
  t?: number;
  v?: number;
  vw?: number;
};

type MassiveAggregateResponse = {
  adjusted?: boolean;
  next_url?: string;
  queryCount?: number;
  results?: MassiveAggregateBar[];
  resultsCount?: number;
  status?: string;
  ticker?: string;
};

const timeframeConfigs: Record<Timeframe, TimeframeConfig> = {
  "1d": {
    multiplier: 1,
    tableName: "aggregate_bars_1d",
    timespan: "day",
  },
  "4h": {
    multiplier: 4,
    tableName: "aggregate_bars_4h",
    timespan: "hour",
  },
  "15m": {
    multiplier: 15,
    tableName: "aggregate_bars_15m",
    timespan: "minute",
  },
};

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function requireDateArg(name: "from" | "to") {
  const value =
    getArg(name) || process.env[`MASSIVE_CUSTOM_BARS_${name.toUpperCase()}`];

  if (!value) {
    throw new Error(`Missing --${name}=YYYY-MM-DD.`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ${name} date: ${value}. Expected YYYY-MM-DD.`);
  }

  return value;
}

function getTimeframe() {
  const value = getArg("timeframe") || process.env.MASSIVE_CUSTOM_BARS_TIMEFRAME;

  if (value !== "1d" && value !== "4h" && value !== "15m") {
    throw new Error("Missing or invalid --timeframe. Expected 1d, 4h, or 15m.");
  }

  return value;
}

function getAdjusted() {
  const value = getArg("adjusted") || process.env.MASSIVE_CUSTOM_BARS_ADJUSTED;
  return value === undefined ? true : value.toLowerCase() === "true";
}

function getLimit() {
  const value = Number(
    getArg("limit") || process.env.MASSIVE_CUSTOM_BARS_LIMIT || 50000,
  );

  return Number.isFinite(value) && value > 0 ? value : 50000;
}

function getUniverse() {
  return getArg("universe") || process.env.MASSIVE_CUSTOM_BARS_UNIVERSE;
}

function toTimestamp(milliseconds?: number) {
  return milliseconds === undefined ? null : new Date(milliseconds).toISOString();
}

function buildCustomBarsPath(
  ticker: string,
  config: TimeframeConfig,
  from: string,
  to: string,
  adjusted: boolean,
  limit: number,
) {
  const params = new URLSearchParams({
    adjusted: String(adjusted),
    limit: String(limit),
    sort: "asc",
  });

  return `/v2/aggs/ticker/${encodeURIComponent(ticker)}/range/${config.multiplier}/${config.timespan}/${from}/${to}?${params.toString()}`;
}

async function fetchAggregatePages(path: string) {
  const bars: MassiveAggregateBar[] = [];
  let nextPath: string | undefined = path;

  while (nextPath) {
    const payload: MassiveAggregateResponse =
      await fetchMassiveJson<MassiveAggregateResponse>(nextPath);
    bars.push(...(payload.results || []));
    nextPath = payload.next_url;
  }

  return bars;
}

async function getUniverseTickers() {
  const universe = getUniverse();

  if (universe !== "initial-us") {
    return getTickerArgs();
  }

  const pool = createDbPool();

  try {
    const result = await pool.query<{ ticker: string }>(
      `
        select distinct ticker
        from market_data.index_memberships
        where universe_code in ('nasdaq_100', 'sp_500')
        order by ticker
      `,
    );

    return result.rows.map((row) => row.ticker);
  } finally {
    await pool.end();
  }
}

async function insertBars(
  pool: ReturnType<typeof createDbPool>,
  ticker: string,
  bars: MassiveAggregateBar[],
  timeframe: Timeframe,
  from: string,
  to: string,
  adjusted: boolean,
) {
  const config = timeframeConfigs[timeframe];

  for (const bar of bars) {
    await pool.query(
      `
        insert into massive.${config.tableName} (
          ticker,
          adjusted,
          multiplier,
          timespan,
          request_from,
          request_to,
          window_start,
          open,
          high,
          low,
          close,
          volume,
          volume_weighted_average_price,
          transactions,
          otc,
          raw_payload
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        on conflict (ticker, window_start, adjusted) do update set
          multiplier = excluded.multiplier,
          timespan = excluded.timespan,
          request_from = excluded.request_from,
          request_to = excluded.request_to,
          open = excluded.open,
          high = excluded.high,
          low = excluded.low,
          close = excluded.close,
          volume = excluded.volume,
          volume_weighted_average_price = excluded.volume_weighted_average_price,
          transactions = excluded.transactions,
          otc = excluded.otc,
          raw_payload = excluded.raw_payload
      `,
      [
        ticker,
        adjusted,
        config.multiplier,
        config.timespan,
        from,
        to,
        toTimestamp(bar.t),
        bar.o ?? null,
        bar.h ?? null,
        bar.l ?? null,
        bar.c ?? null,
        bar.v ?? null,
        bar.vw ?? null,
        bar.n ?? null,
        bar.otc ?? null,
        JSON.stringify(bar),
      ],
    );
  }
}

async function main() {
  loadLocalEnv();

  const timeframe = getTimeframe();
  const config = timeframeConfigs[timeframe];
  const from = requireDateArg("from");
  const to = requireDateArg("to");
  const adjusted = getAdjusted();
  const limit = getLimit();
  const tickers = await getUniverseTickers();
  const pool = createDbPool();
  let totalBars = 0;

  try {
    for (const ticker of tickers) {
      const path = buildCustomBarsPath(ticker, config, from, to, adjusted, limit);
      const bars = await fetchAggregatePages(path);
      await insertBars(pool, ticker, bars, timeframe, from, to, adjusted);
      totalBars += bars.length;
    }
  } finally {
    await pool.end();
  }

  console.log(
    `Ingested ${totalBars} ${timeframe} custom aggregate bars for ${tickers.length} tickers from ${from} to ${to}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
