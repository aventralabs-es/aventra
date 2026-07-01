import { fetchMassivePages } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveSplit = {
  adjustment_type?: string;
  execution_date?: string;
  historical_adjustment_factor?: number;
  id?: string;
  split_from?: number;
  split_to?: number;
  ticker?: string;
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

function buildSplitsPath() {
  const params = new URLSearchParams({
    limit: getArg("limit") || process.env.MASSIVE_SPLITS_LIMIT || "1000",
    sort: getArg("sort") || process.env.MASSIVE_SPLITS_SORT || "execution_date",
    order: getArg("order") || process.env.MASSIVE_SPLITS_ORDER || "desc",
  });

  appendOptionalParam(params, "ticker", getArg("ticker") || process.env.MASSIVE_SPLITS_TICKER);
  appendOptionalParam(
    params,
    "execution_date",
    getArg("execution-date") || process.env.MASSIVE_SPLITS_EXECUTION_DATE,
  );
  appendOptionalParam(
    params,
    "execution_date.gte",
    getArg("execution-date-gte") || process.env.MASSIVE_SPLITS_EXECUTION_DATE_GTE,
  );
  appendOptionalParam(
    params,
    "execution_date.lte",
    getArg("execution-date-lte") || process.env.MASSIVE_SPLITS_EXECUTION_DATE_LTE,
  );

  return `/stocks/v1/splits?${params.toString()}`;
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const path = buildSplitsPath();

  try {
    const splits = await fetchMassivePages<MassiveSplit>(path);

    await withTransaction(pool, async (client) => {
      for (const split of splits) {
        await client.query(
          `
            delete from massive.splits
            where id is not distinct from $1
              and ticker is not distinct from $2
              and execution_date is not distinct from $3
          `,
          [split.id ?? null, split.ticker ?? null, split.execution_date ?? null],
        );

        await client.query(
          `
            insert into massive.splits (
              id,
              ticker,
              execution_date,
              adjustment_type,
              split_from,
              split_to,
              historical_adjustment_factor,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8)
          `,
          [
            split.id ?? null,
            split.ticker ?? null,
            split.execution_date ?? null,
            split.adjustment_type ?? null,
            split.split_from ?? null,
            split.split_to ?? null,
            split.historical_adjustment_factor ?? null,
            JSON.stringify(split),
          ],
        );
      }
    });

    console.log(`Ingested ${splits.length} Massive splits from ${path}.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
