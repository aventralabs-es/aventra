import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveMarketHoliday = {
  close?: string;
  date?: string;
  exchange?: string;
  name?: string;
  open?: string;
  status?: string;
};

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const holidays = await fetchMassiveJson<MassiveMarketHoliday[]>(
      "/v1/marketstatus/upcoming",
    );

    await withTransaction(pool, async (client) => {
      await client.query("truncate table massive.market_holidays");

      for (const holiday of holidays) {
        await client.query(
          `
            insert into massive.market_holidays (
              date,
              exchange,
              name,
              status,
              open,
              close,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            holiday.date ?? null,
            holiday.exchange ?? null,
            holiday.name ?? null,
            holiday.status ?? null,
            holiday.open ?? null,
            holiday.close ?? null,
            JSON.stringify(holiday),
          ],
        );
      }
    });

    console.log(`Ingested ${holidays.length} Massive market holidays.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
