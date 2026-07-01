import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveTickerType = {
  asset_class?: string;
  code?: string;
  description?: string;
  locale?: string;
};

type MassiveTickerTypesResponse = {
  results?: MassiveTickerType[];
};

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const payload = await fetchMassiveJson<MassiveTickerTypesResponse>(
      "/v3/reference/tickers/types",
    );
    const tickerTypes = payload.results || [];

    await withTransaction(pool, async (client) => {
      await client.query("truncate table massive.ticker_types");

      for (const tickerType of tickerTypes) {
        await client.query(
          `
            insert into massive.ticker_types (
              asset_class,
              code,
              description,
              locale,
              raw_payload
            )
            values ($1, $2, $3, $4, $5)
          `,
          [
            tickerType.asset_class ?? null,
            tickerType.code ?? null,
            tickerType.description ?? null,
            tickerType.locale ?? null,
            JSON.stringify(tickerType),
          ],
        );
      }
    });

    console.log(`Ingested ${tickerTypes.length} Massive ticker types.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
