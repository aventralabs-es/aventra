import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";
import { getTickerArgs } from "./ticker-args";

type MassiveTickerOverview = {
  active?: boolean;
  address?: unknown;
  branding?: unknown;
  cik?: string;
  composite_figi?: string;
  currency_name?: string;
  delisted_utc?: string;
  description?: string;
  homepage_url?: string;
  list_date?: string;
  locale?: string;
  market?: string;
  market_cap?: number;
  name?: string;
  phone_number?: string;
  primary_exchange?: string;
  round_lot?: number;
  share_class_figi?: string;
  share_class_shares_outstanding?: number;
  sic_code?: string;
  sic_description?: string;
  ticker?: string;
  ticker_root?: string;
  ticker_suffix?: string;
  total_employees?: number;
  type?: string;
  weighted_shares_outstanding?: number;
};

type MassiveTickerOverviewResponse = {
  results?: MassiveTickerOverview;
};

function getDateArg() {
  const dateArg = process.argv.find((arg) => arg.startsWith("--date="));
  return dateArg?.slice("--date=".length) || process.env.MASSIVE_TICKER_DATE;
}

function buildTickerOverviewPath(ticker: string, date?: string) {
  const params = new URLSearchParams();

  if (date) {
    params.set("date", date);
  }

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return `/v3/reference/tickers/${encodeURIComponent(ticker)}${suffix}`;
}

async function main() {
  loadLocalEnv();

  const tickers = getTickerArgs();
  const date = getDateArg();
  const pool = createDbPool();

  try {
    const overviews: MassiveTickerOverview[] = [];

    for (const ticker of tickers) {
      try {
        const payload = await fetchMassiveJson<MassiveTickerOverviewResponse>(
          buildTickerOverviewPath(ticker, date),
        );

        if (payload.results) {
          overviews.push(payload.results);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        if (message.includes("404 Not Found")) {
          console.warn(`Skipping ${ticker}: ticker overview not found.`);
          continue;
        }

        throw error;
      }
    }

    await withTransaction(pool, async (client) => {
      for (const overview of overviews) {
        await client.query(
          "delete from massive.ticker_overviews where ticker = $1 and query_date is not distinct from $2",
          [overview.ticker ?? null, date ?? null],
        );

        await client.query(
          `
            insert into massive.ticker_overviews (
              ticker,
              query_date,
              active,
              address,
              branding,
              cik,
              composite_figi,
              currency_name,
              delisted_utc,
              description,
              homepage_url,
              list_date,
              locale,
              market,
              market_cap,
              name,
              phone_number,
              primary_exchange,
              round_lot,
              share_class_figi,
              share_class_shares_outstanding,
              sic_code,
              sic_description,
              ticker_root,
              ticker_suffix,
              total_employees,
              type,
              weighted_shares_outstanding,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)
          `,
          [
            overview.ticker ?? null,
            date ?? null,
            overview.active ?? null,
            overview.address ? JSON.stringify(overview.address) : null,
            overview.branding ? JSON.stringify(overview.branding) : null,
            overview.cik ?? null,
            overview.composite_figi ?? null,
            overview.currency_name ?? null,
            overview.delisted_utc ?? null,
            overview.description ?? null,
            overview.homepage_url ?? null,
            overview.list_date ?? null,
            overview.locale ?? null,
            overview.market ?? null,
            overview.market_cap ?? null,
            overview.name ?? null,
            overview.phone_number ?? null,
            overview.primary_exchange ?? null,
            overview.round_lot ?? null,
            overview.share_class_figi ?? null,
            overview.share_class_shares_outstanding ?? null,
            overview.sic_code ?? null,
            overview.sic_description ?? null,
            overview.ticker_root ?? null,
            overview.ticker_suffix ?? null,
            overview.total_employees ?? null,
            overview.type ?? null,
            overview.weighted_shares_outstanding ?? null,
            JSON.stringify(overview),
          ],
        );
      }
    });

    console.log(`Ingested ${overviews.length} Massive ticker overviews.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
