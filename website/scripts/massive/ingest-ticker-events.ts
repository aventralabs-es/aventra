import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";
import { getTickerArgs } from "./ticker-args";

type MassiveTickerEvent = Record<string, unknown>;

type MassiveTickerEventsResponse = {
  results?: MassiveTickerEvent[] | { events?: MassiveTickerEvent[]; name?: string };
  request_id?: string;
  status?: string;
};

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function asString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asResults(payload: MassiveTickerEventsResponse | MassiveTickerEvent[]) {
  if (Array.isArray(payload)) {
    return { events: payload, name: null };
  }

  if (Array.isArray(payload.results)) {
    return { events: payload.results, name: null };
  }

  return {
    events: payload.results?.events || [],
    name: payload.results?.name || null,
  };
}

function buildTickerEventsPath(ticker: string) {
  const template = process.env.MASSIVE_TICKER_EVENTS_PATH || "/vX/reference/tickers/{ticker}/events";
  const basePath = template.replace("{ticker}", encodeURIComponent(ticker));
  const params = new URLSearchParams();
  const limit = getArg("limit") || process.env.MASSIVE_TICKER_EVENTS_LIMIT;
  const types = getArg("types") || process.env.MASSIVE_TICKER_EVENTS_TYPES;

  if (limit) {
    params.set("limit", limit);
  }

  if (types) {
    params.set("types", types);
  }

  return params.size > 0 ? `${basePath}?${params.toString()}` : basePath;
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const tickers = getTickerArgs("AAPL");
  let totalEvents = 0;

  try {
    await withTransaction(pool, async (client) => {
      for (const ticker of tickers) {
        const path = buildTickerEventsPath(ticker);
        const payload = await fetchMassiveJson<MassiveTickerEventsResponse | MassiveTickerEvent[]>(path);
        const { events, name } = asResults(payload);
        totalEvents += events.length;

        for (const event of events) {
          const eventId = asString(event.id) || asString(event.event_id);
          const eventType = asString(event.type) || asString(event.event_type);
          const eventDate = asString(event.date) || asString(event.event_date) || asString(event.effective_date);

          await client.query(
            `
              delete from massive.ticker_events
              where ticker is not distinct from $1
                and event_id is not distinct from $2
                and event_type is not distinct from $3
                and event_date is not distinct from $4
            `,
            [ticker, eventId, eventType, eventDate],
          );

          await client.query(
            `
              insert into massive.ticker_events (
                ticker,
                event_id,
                event_type,
                event_date,
                name,
                raw_payload
              )
              values ($1, $2, $3, $4, $5, $6)
            `,
            [
              ticker,
              eventId,
              eventType,
              eventDate,
              asString(event.name) || name,
              JSON.stringify(event),
            ],
          );
        }

        console.log(`Ingested ${events.length} Massive ticker events for ${ticker} from ${path}.`);
      }
    });

    console.log(`Finished ticker events: ${totalEvents} rows.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
