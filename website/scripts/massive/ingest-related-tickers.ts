import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";
import { getTickerArgs } from "./ticker-args";

type MassiveRelatedTicker = {
  ticker?: string;
};

type MassiveRelatedTickersResponse = {
  results?: MassiveRelatedTicker[];
};

function buildRelatedTickersPath(ticker: string) {
  return `/v1/related-companies/${encodeURIComponent(ticker)}`;
}

async function main() {
  loadLocalEnv();

  const tickers = getTickerArgs();
  const pool = createDbPool();

  try {
    let insertedRows = 0;

    await withTransaction(pool, async (client) => {
      for (const ticker of tickers) {
        let relatedTickers: MassiveRelatedTicker[] = [];

        try {
          const payload = await fetchMassiveJson<MassiveRelatedTickersResponse>(
            buildRelatedTickersPath(ticker),
          );
          relatedTickers = payload.results || [];
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);

          if (message.includes("404 Not Found")) {
            console.warn(`Skipping ${ticker}: related tickers not found.`);
            await client.query("delete from massive.related_tickers where ticker = $1", [
              ticker,
            ]);
            continue;
          }

          throw error;
        }

        await client.query("delete from massive.related_tickers where ticker = $1", [
          ticker,
        ]);

        for (const relatedTicker of relatedTickers) {
          const result = await client.query(
            `
              insert into massive.related_tickers (
                ticker,
                related_ticker,
                raw_payload
              )
              values ($1, $2, $3)
              on conflict do nothing
            `,
            [ticker, relatedTicker.ticker ?? null, JSON.stringify(relatedTicker)],
          );
          insertedRows += result.rowCount || 0;
        }
      }
    });

    console.log(`Ingested ${insertedRows} Massive related ticker rows.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
