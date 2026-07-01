import { fetchMassivePages } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveDividend = {
  id?: string;
  ticker?: string;
  cash_amount?: number;
  currency?: string;
  declaration_date?: string;
  distribution_type?: string;
  ex_dividend_date?: string;
  frequency?: number;
  pay_date?: string;
  record_date?: string;
};

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function appendOptionalParam(params: URLSearchParams, name: string, value?: string) {
  if (value) {
    params.set(name, value);
  }
}

function buildDividendsPath() {
  const params = new URLSearchParams({
    limit: getArg("limit") || process.env.MASSIVE_DIVIDENDS_LIMIT || "1000",
    sort: getArg("sort") || process.env.MASSIVE_DIVIDENDS_SORT || "ex_dividend_date",
    order: getArg("order") || process.env.MASSIVE_DIVIDENDS_ORDER || "desc",
  });

  appendOptionalParam(params, "ticker", getArg("ticker") || process.env.MASSIVE_DIVIDENDS_TICKER);
  appendOptionalParam(params, "ticker.any_of", getArg("tickers") || process.env.MASSIVE_TICKERS);
  appendOptionalParam(params, "ex_dividend_date", getArg("ex-dividend-date") || process.env.MASSIVE_DIVIDENDS_EX_DIVIDEND_DATE);
  appendOptionalParam(params, "ex_dividend_date.gte", getArg("ex-dividend-date-gte") || getArg("from") || process.env.MASSIVE_DIVIDENDS_EX_DIVIDEND_DATE_GTE);
  appendOptionalParam(params, "ex_dividend_date.lte", getArg("ex-dividend-date-lte") || getArg("to") || process.env.MASSIVE_DIVIDENDS_EX_DIVIDEND_DATE_LTE);
  appendOptionalParam(params, "record_date", getArg("record-date") || process.env.MASSIVE_DIVIDENDS_RECORD_DATE);
  appendOptionalParam(params, "declaration_date", getArg("declaration-date") || process.env.MASSIVE_DIVIDENDS_DECLARATION_DATE);
  appendOptionalParam(params, "pay_date", getArg("pay-date") || process.env.MASSIVE_DIVIDENDS_PAY_DATE);

  return `/stocks/v1/dividends?${params.toString()}`;
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const path = buildDividendsPath();

  try {
    const dividends = await fetchMassivePages<MassiveDividend>(path);

    await withTransaction(pool, async (client) => {
      for (const dividend of dividends) {
        await client.query(
          `
            delete from massive.dividends
            where id is not distinct from $1
              and ticker is not distinct from $2
              and ex_dividend_date is not distinct from $3
          `,
          [dividend.id ?? null, dividend.ticker ?? null, dividend.ex_dividend_date ?? null],
        );

        await client.query(
          `
            insert into massive.dividends (
              id,
              ticker,
              cash_amount,
              currency,
              declaration_date,
              distribution_type,
              ex_dividend_date,
              frequency,
              pay_date,
              record_date,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          `,
          [
            dividend.id ?? null,
            dividend.ticker ?? null,
            dividend.cash_amount ?? null,
            dividend.currency ?? null,
            dividend.declaration_date ?? null,
            dividend.distribution_type ?? null,
            dividend.ex_dividend_date ?? null,
            dividend.frequency ?? null,
            dividend.pay_date ?? null,
            dividend.record_date ?? null,
            JSON.stringify(dividend),
          ],
        );
      }
    });

    console.log(`Ingested ${dividends.length} Massive dividends from ${path}.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

