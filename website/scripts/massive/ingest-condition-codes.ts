import { fetchMassivePages } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveConditionCode = {
  abbreviation?: string;
  asset_class?: string;
  data_types?: unknown;
  description?: string;
  exchange?: number;
  id: number;
  legacy?: boolean;
  name?: string;
  sip_mapping?: unknown;
  type?: string;
  update_rules?: unknown;
};

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const conditions = await fetchMassivePages<MassiveConditionCode>(
      "/v3/reference/conditions",
    );

    await withTransaction(pool, async (client) => {
      await client.query("truncate table massive.condition_codes");

      for (const condition of conditions) {
        await client.query(
          `
            insert into massive.condition_codes (
              id,
              abbreviation,
              asset_class,
              data_types,
              description,
              exchange,
              legacy,
              name,
              sip_mapping,
              type,
              update_rules,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          `,
          [
            condition.id,
            condition.abbreviation ?? null,
            condition.asset_class ?? null,
            condition.data_types ? JSON.stringify(condition.data_types) : null,
            condition.description ?? null,
            condition.exchange ?? null,
            condition.legacy ?? null,
            condition.name ?? null,
            condition.sip_mapping ? JSON.stringify(condition.sip_mapping) : null,
            condition.type ?? null,
            condition.update_rules ? JSON.stringify(condition.update_rules) : null,
            JSON.stringify(condition),
          ],
        );
      }
    });

    console.log(`Ingested ${conditions.length} Massive condition codes.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
