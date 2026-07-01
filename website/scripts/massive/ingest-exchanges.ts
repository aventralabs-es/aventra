import { fetchMassivePages } from "./client";
import { createDbPool } from "./db";
import { loadLocalEnv } from "./env";

type MassiveExchange = {
  id: number;
  acronym?: string;
  asset_class?: string;
  locale?: string;
  mic?: string;
  name?: string;
  operating_mic?: string;
  participant_id?: string;
  type?: string;
  url?: string;
};

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const exchanges = await fetchMassivePages<MassiveExchange>(
      "/v3/reference/exchanges",
    );

    for (const exchange of exchanges) {
      await pool.query(
        `
          insert into massive.exchanges (
            id,
            acronym,
            asset_class,
            locale,
            mic,
            name,
            operating_mic,
            participant_id,
            type,
            url,
            raw_payload
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          on conflict (id) do update set
            acronym = excluded.acronym,
            asset_class = excluded.asset_class,
            locale = excluded.locale,
            mic = excluded.mic,
            name = excluded.name,
            operating_mic = excluded.operating_mic,
            participant_id = excluded.participant_id,
            type = excluded.type,
            url = excluded.url,
            raw_payload = excluded.raw_payload
        `,
        [
          exchange.id,
          exchange.acronym ?? null,
          exchange.asset_class ?? null,
          exchange.locale ?? null,
          exchange.mic ?? null,
          exchange.name ?? null,
          exchange.operating_mic ?? null,
          exchange.participant_id ?? null,
          exchange.type ?? null,
          exchange.url ?? null,
          JSON.stringify(exchange),
        ],
      );
    }

    console.log(`Ingested ${exchanges.length} Massive exchanges.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
