import { fetchMassivePages } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";
import {
  FUNDAMENTALS_ENDPOINTS,
  MassiveFundamentalsConfig,
  findFundamentalsConfig,
} from "./fundamentals-config";

type MassiveFundamentalsRow = Record<string, unknown>;

type NormalizedFinancialStatement = {
  cik: string | null;
  tickers: string[] | null;
  primaryTicker: string | null;
  periodEnd: string | null;
  filingDate: string | null;
  fiscalYear: number | null;
  fiscalQuarter: number | null;
  timeframe: string | null;
};

function getArg(name: string) {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg?.slice(`--${name}=`.length);
}

function getEndpointArg() {
  return getArg("endpoint") || process.env.MASSIVE_FUNDAMENTALS_ENDPOINT || "all";
}

function getLimit() {
  return getArg("limit") || process.env.MASSIVE_FUNDAMENTALS_LIMIT || "1000";
}

function getBatchSize() {
  const value = getArg("batch-size") || process.env.MASSIVE_FUNDAMENTALS_BATCH_SIZE || "100";
  const batchSize = Number(value);

  if (!Number.isInteger(batchSize) || batchSize < 1) {
    throw new Error(`Invalid batch size: ${value}`);
  }

  return batchSize;
}

function splitCsv(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function optionalParam(params: URLSearchParams, name: string, value?: string) {
  if (value) {
    params.set(name, value);
  }
}

function addRangeParams(params: URLSearchParams, paramName: string) {
  const from = getArg("from") || process.env.MASSIVE_FUNDAMENTALS_FROM;
  const to = getArg("to") || process.env.MASSIVE_FUNDAMENTALS_TO;
  const exact = getArg(paramName.replaceAll("_", "-")) || process.env[`MASSIVE_FUNDAMENTALS_${paramName.toUpperCase()}`];

  optionalParam(params, paramName, exact);
  optionalParam(params, `${paramName}.gte`, getArg(`${paramName.replaceAll("_", "-")}-gte`) || from);
  optionalParam(params, `${paramName}.lte`, getArg(`${paramName.replaceAll("_", "-")}-lte`) || to);
}

function addCommonParams(params: URLSearchParams, config: MassiveFundamentalsConfig) {
  params.set("limit", getLimit());
  params.set("sort", getArg("sort") || process.env.MASSIVE_FUNDAMENTALS_SORT || config.defaultSort);

  const order = getArg("order") || process.env.MASSIVE_FUNDAMENTALS_ORDER || config.defaultOrder;
  optionalParam(params, "order", order);
  optionalParam(params, "cik", getArg("cik") || process.env.MASSIVE_FUNDAMENTALS_CIK);
  optionalParam(params, "timeframe", getArg("timeframe") || process.env.MASSIVE_FUNDAMENTALS_TIMEFRAME);
  optionalParam(params, "fiscal_year", getArg("fiscal-year") || process.env.MASSIVE_FUNDAMENTALS_FISCAL_YEAR);
  optionalParam(params, "fiscal_quarter", getArg("fiscal-quarter") || process.env.MASSIVE_FUNDAMENTALS_FISCAL_QUARTER);
  optionalParam(params, "filing_date", getArg("filing-date") || process.env.MASSIVE_FUNDAMENTALS_FILING_DATE);
  optionalParam(params, "filing_date.gte", getArg("filing-date-gte") || process.env.MASSIVE_FUNDAMENTALS_FILING_DATE_GTE);
  optionalParam(params, "filing_date.lte", getArg("filing-date-lte") || process.env.MASSIVE_FUNDAMENTALS_FILING_DATE_LTE);
  addRangeParams(params, config.dateParam);
}

function buildPath(config: MassiveFundamentalsConfig, tickers: string[]) {
  const params = new URLSearchParams();
  addCommonParams(params, config);

  if (tickers.length > 0) {
    params.set(config.tickerParam, tickers.join(","));
  }

  return `${config.path}?${params.toString()}`;
}

async function getUniverseTickers(pool: ReturnType<typeof createDbPool>) {
  const explicitTickers = splitCsv(getArg("tickers") || process.env.MASSIVE_TICKERS);

  if (explicitTickers.length > 0) {
    return explicitTickers;
  }

  const universe = getArg("universe") || process.env.MASSIVE_FUNDAMENTALS_UNIVERSE;

  if (universe !== "initial-us") {
    return [];
  }

  const result = await pool.query<{ ticker: string }>(`
    select distinct ticker
    from market_data.index_memberships
    where index_code in ('nasdaq_100', 'sp_500')
      and ticker is not null
    order by ticker
  `);

  return result.rows.map((row) => row.ticker);
}

function asString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asTickerArray(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  const tickers = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.toUpperCase());

  return tickers.length > 0 ? tickers : null;
}

function normalizeFinancialStatement(row: MassiveFundamentalsRow): NormalizedFinancialStatement {
  const tickers = asTickerArray(row.tickers);

  return {
    cik: asString(row.cik),
    tickers,
    primaryTicker: tickers?.[0] ?? null,
    periodEnd: asString(row.period_end),
    filingDate: asString(row.filing_date),
    fiscalYear: asNumber(row.fiscal_year),
    fiscalQuarter: asNumber(row.fiscal_quarter),
    timeframe: asString(row.timeframe),
  };
}

async function insertFinancialStatement(
  client: import("pg").PoolClient,
  config: MassiveFundamentalsConfig,
  row: MassiveFundamentalsRow,
) {
  const normalized = normalizeFinancialStatement(row);

  await client.query(
    `
      delete from massive.${config.tableName}
      where cik is not distinct from $1
        and primary_ticker is not distinct from $2
        and period_end is not distinct from $3
        and fiscal_year is not distinct from $4
        and fiscal_quarter is not distinct from $5
        and timeframe is not distinct from $6
    `,
    [
      normalized.cik,
      normalized.primaryTicker,
      normalized.periodEnd,
      normalized.fiscalYear,
      normalized.fiscalQuarter,
      normalized.timeframe,
    ],
  );

  await client.query(
    `
      insert into massive.${config.tableName} (
        cik,
        tickers,
        primary_ticker,
        period_end,
        filing_date,
        fiscal_year,
        fiscal_quarter,
        timeframe,
        raw_payload
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [
      normalized.cik,
      normalized.tickers,
      normalized.primaryTicker,
      normalized.periodEnd,
      normalized.filingDate,
      normalized.fiscalYear,
      normalized.fiscalQuarter,
      normalized.timeframe,
      JSON.stringify(row),
    ],
  );
}

async function insertShortInterest(
  client: import("pg").PoolClient,
  config: MassiveFundamentalsConfig,
  row: MassiveFundamentalsRow,
) {
  const ticker = asString(row.ticker);
  const settlementDate = asString(row.settlement_date);

  await client.query(
    `
      delete from massive.${config.tableName}
      where ticker is not distinct from $1
        and settlement_date is not distinct from $2
    `,
    [ticker, settlementDate],
  );

  await client.query(
    `
      insert into massive.${config.tableName} (
        ticker,
        settlement_date,
        short_interest,
        avg_daily_volume,
        days_to_cover,
        raw_payload
      )
      values ($1, $2, $3, $4, $5, $6)
    `,
    [
      ticker,
      settlementDate,
      asNumber(row.short_interest),
      asNumber(row.avg_daily_volume),
      asNumber(row.days_to_cover),
      JSON.stringify(row),
    ],
  );
}

async function insertShortVolume(
  client: import("pg").PoolClient,
  config: MassiveFundamentalsConfig,
  row: MassiveFundamentalsRow,
) {
  const ticker = asString(row.ticker) || asString(row.T);
  const tradingDate = asString(row.date) || asString(row.trading_date);

  await client.query(
    `
      delete from massive.${config.tableName}
      where ticker is not distinct from $1
        and trading_date is not distinct from $2
    `,
    [ticker, tradingDate],
  );

  await client.query(
    `
      insert into massive.${config.tableName} (
        ticker,
        trading_date,
        short_volume,
        short_exempt_volume,
        total_volume,
        raw_payload
      )
      values ($1, $2, $3, $4, $5, $6)
    `,
    [
      ticker,
      tradingDate,
      asNumber(row.short_volume),
      asNumber(row.short_exempt_volume),
      asNumber(row.total_volume),
      JSON.stringify(row),
    ],
  );
}

async function insertFloat(
  client: import("pg").PoolClient,
  config: MassiveFundamentalsConfig,
  row: MassiveFundamentalsRow,
) {
  const ticker = asString(row.ticker);
  const floatDate = asString(row.effective_date) || asString(row.float_date) || asString(row.date);
  const freeFloat = asNumber(row.free_float) || asNumber(row.float);

  await client.query(
    `
      delete from massive.${config.tableName}
      where ticker is not distinct from $1
        and float_date is not distinct from $2
    `,
    [ticker, floatDate],
  );

  await client.query(
    `
      insert into massive.${config.tableName} (
        ticker,
        float_date,
        free_float,
        free_float_percent,
        shares_outstanding,
        raw_payload
      )
      values ($1, $2, $3, $4, $5, $6)
    `,
    [
      ticker,
      floatDate,
      freeFloat,
      asNumber(row.free_float_percent),
      asNumber(row.shares_outstanding),
      JSON.stringify(row),
    ],
  );
}

async function insertRows(
  pool: ReturnType<typeof createDbPool>,
  config: MassiveFundamentalsConfig,
  rows: MassiveFundamentalsRow[],
) {
  await withTransaction(pool, async (client) => {
    for (const row of rows) {
      if (config.kind === "financial-statement") {
        await insertFinancialStatement(client, config, row);
      } else if (config.kind === "short-interest") {
        await insertShortInterest(client, config, row);
      } else if (config.kind === "short-volume") {
        await insertShortVolume(client, config, row);
      } else {
        await insertFloat(client, config, row);
      }
    }
  });
}

async function ingestEndpoint(
  pool: ReturnType<typeof createDbPool>,
  config: MassiveFundamentalsConfig,
  tickers: string[],
) {
  const tickerBatches = tickers.length > 0 ? chunk(tickers, getBatchSize()) : [[]];
  let totalRows = 0;

  for (const tickerBatch of tickerBatches) {
    const path = buildPath(config, tickerBatch);
    const rows = await fetchMassivePages<MassiveFundamentalsRow>(path);
    await insertRows(pool, config, rows);
    totalRows += rows.length;

    console.log(
      `Ingested ${rows.length} ${config.endpoint} rows${tickerBatch.length > 0 ? ` for ${tickerBatch.length} tickers` : ""}.`,
    );
  }

  console.log(`Finished ${config.endpoint}: ${totalRows} rows.`);
}

async function main() {
  loadLocalEnv();

  const endpointArg = getEndpointArg();
  const configs = endpointArg === "all"
    ? FUNDAMENTALS_ENDPOINTS
    : [findFundamentalsConfig(endpointArg)].filter(Boolean) as MassiveFundamentalsConfig[];

  if (configs.length === 0) {
    throw new Error(`Unknown fundamentals endpoint: ${endpointArg}`);
  }

  const pool = createDbPool();

  try {
    const tickers = await getUniverseTickers(pool);

    for (const config of configs) {
      await ingestEndpoint(pool, config, tickers);
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


