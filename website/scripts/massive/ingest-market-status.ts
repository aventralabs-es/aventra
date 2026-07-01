import { fetchMassiveJson } from "./client";
import { createDbPool } from "./db";
import { loadLocalEnv } from "./env";

type MassiveMarketStatus = {
  afterHours?: boolean;
  currencies?: unknown;
  earlyHours?: boolean;
  exchanges?: unknown;
  indicesGroups?: unknown;
  market?: string;
  serverTime?: string;
};

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const status = await fetchMassiveJson<MassiveMarketStatus>(
      "/v1/marketstatus/now",
    );

    await pool.query(
      `
        insert into massive.market_status (
          server_time,
          market,
          early_hours,
          after_hours,
          exchanges,
          currencies,
          indices_groups,
          raw_payload
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        status.serverTime ?? null,
        status.market ?? null,
        status.earlyHours ?? null,
        status.afterHours ?? null,
        status.exchanges ? JSON.stringify(status.exchanges) : null,
        status.currencies ? JSON.stringify(status.currencies) : null,
        status.indicesGroups ? JSON.stringify(status.indicesGroups) : null,
        JSON.stringify(status),
      ],
    );

    console.log("Ingested 1 Massive market status snapshot.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
