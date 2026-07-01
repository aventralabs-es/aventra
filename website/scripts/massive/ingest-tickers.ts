import { fetchMassivePages } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveTicker = {
  active?: boolean;
  base_currency_name?: string;
  base_currency_symbol?: string;
  cik?: string;
  composite_figi?: string;
  currency_name?: string;
  currency_symbol?: string;
  delisted_utc?: string;
  last_updated_utc?: string;
  locale?: string;
  market?: string;
  name?: string;
  primary_exchange?: string;
  share_class_figi?: string;
  ticker?: string;
  type?: string;
};

function buildTickersPath() {
  const params = new URLSearchParams({
    market: process.env.MASSIVE_TICKERS_MARKET || "stocks",
    active: process.env.MASSIVE_TICKERS_ACTIVE || "true",
    limit: process.env.MASSIVE_TICKERS_LIMIT || "1000",
  });

  return `/v3/reference/tickers?${params.toString()}`;
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const path = buildTickersPath();

  try {
    const tickers = await fetchMassivePages<MassiveTicker>(path);

    await withTransaction(pool, async (client) => {
      await client.query("truncate table massive.tickers");

      for (const ticker of tickers) {
        await client.query(
          `
            insert into massive.tickers (
              ticker,
              name,
              market,
              locale,
              primary_exchange,
              type,
              active,
              currency_name,
              currency_symbol,
              base_currency_name,
              base_currency_symbol,
              cik,
              composite_figi,
              share_class_figi,
              last_updated_utc,
              delisted_utc,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          `,
          [
            ticker.ticker ?? null,
            ticker.name ?? null,
            ticker.market ?? null,
            ticker.locale ?? null,
            ticker.primary_exchange ?? null,
            ticker.type ?? null,
            ticker.active ?? null,
            ticker.currency_name ?? null,
            ticker.currency_symbol ?? null,
            ticker.base_currency_name ?? null,
            ticker.base_currency_symbol ?? null,
            ticker.cik ?? null,
            ticker.composite_figi ?? null,
            ticker.share_class_figi ?? null,
            ticker.last_updated_utc ?? null,
            ticker.delisted_utc ?? null,
            JSON.stringify(ticker),
          ],
        );
      }
    });

    console.log(`Ingested ${tickers.length} Massive tickers from ${path}.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
