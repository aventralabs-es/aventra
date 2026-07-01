import { createDbPool } from "./db";
import { loadLocalEnv } from "./env";

type RefreshPlanRow = {
  execution_date: string;
  refresh_from: string;
  refresh_to: string;
  split_from: string | null;
  split_to: string | null;
  table_name: string;
  ticker: string;
};

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function getSinceDate() {
  return getArg("since") || process.env.MASSIVE_SPLIT_REFRESH_SINCE;
}

function getTicker() {
  return getArg("ticker") || process.env.MASSIVE_SPLIT_REFRESH_TICKER;
}

function shouldIncludeFuture() {
  return (
    process.argv.includes("--include-future") ||
    process.env.MASSIVE_SPLIT_REFRESH_INCLUDE_FUTURE === "true"
  );
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const since = getSinceDate();
  const ticker = getTicker();
  const includeFuture = shouldIncludeFuture();

  try {
    const result = await pool.query<RefreshPlanRow>(
      `
        with relevant_splits as (
          select distinct
            ticker,
            execution_date,
            split_from,
            split_to
          from massive.splits
          where ticker is not null
            and execution_date is not null
            and ($1::date is null or execution_date >= $1::date)
            and ($2::text is null or ticker = $2::text)
            and ($3::boolean or execution_date <= current_date)
        ),
        bar_ranges as (
          select
            ticker,
            'aggregate_bars_4h' as table_name,
            min(window_start)::date as first_bar_date
          from massive.aggregate_bars_4h
          where adjusted = true
          group by ticker
          union all
          select
            ticker,
            'aggregate_bars_15m' as table_name,
            min(window_start)::date as first_bar_date
          from massive.aggregate_bars_15m
          where adjusted = true
          group by ticker
          union all
          select
            ticker,
            'daily_market_summaries' as table_name,
            min(trading_date)::date as first_bar_date
          from massive.daily_market_summaries
          where adjusted = true
          group by ticker
        )
        select
          s.ticker,
          s.execution_date::text,
          r.table_name,
          r.first_bar_date::text as refresh_from,
          current_date::text as refresh_to,
          s.split_from::text,
          s.split_to::text
        from relevant_splits s
        join bar_ranges r
          on r.ticker = s.ticker
        where r.first_bar_date < s.execution_date
        order by s.execution_date desc, s.ticker, r.table_name
      `,
      [since ?? null, ticker ?? null, includeFuture],
    );

    if (result.rows.length === 0) {
      console.log("No split-driven refresh candidates found.");
      return;
    }

    console.table(result.rows);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
