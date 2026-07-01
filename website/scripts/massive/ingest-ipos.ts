import { fetchMassiveJson } from "./client";
import { createDbPool, withTransaction } from "./db";
import { loadLocalEnv } from "./env";

type MassiveIpo = Record<string, unknown>;

type MassiveListResponse<T> = {
  results?: T[];
  next_url?: string;
  status?: string;
  request_id?: string;
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

function getMaxPages() {
  const value = getArg("max-pages") || process.env.MASSIVE_IPOS_MAX_PAGES;

  if (!value) {
    return null;
  }

  const maxPages = Number(value);

  if (!Number.isInteger(maxPages) || maxPages < 1) {
    throw new Error(`Invalid max pages: ${value}`);
  }

  return maxPages;
}

function asString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function buildIposPath() {
  const basePath = process.env.MASSIVE_IPOS_PATH || "/vX/reference/ipos";
  const params = new URLSearchParams({
    limit: getArg("limit") || process.env.MASSIVE_IPOS_LIMIT || "1000",
  });

  appendOptionalParam(params, "sort", getArg("sort") || process.env.MASSIVE_IPOS_SORT);
  appendOptionalParam(params, "order", getArg("order") || process.env.MASSIVE_IPOS_ORDER);
  appendOptionalParam(params, "ticker", getArg("ticker") || process.env.MASSIVE_IPOS_TICKER);
  appendOptionalParam(params, "ticker.any_of", getArg("tickers") || process.env.MASSIVE_TICKERS);
  appendOptionalParam(params, "ipo_date", getArg("ipo-date") || process.env.MASSIVE_IPOS_IPO_DATE);
  appendOptionalParam(params, "ipo_date.gte", getArg("ipo-date-gte") || getArg("from") || process.env.MASSIVE_IPOS_IPO_DATE_GTE);
  appendOptionalParam(params, "ipo_date.lte", getArg("ipo-date-lte") || getArg("to") || process.env.MASSIVE_IPOS_IPO_DATE_LTE);

  return `${basePath}?${params.toString()}`;
}

async function fetchIpoPages(path: string, maxPages: number | null) {
  const results: MassiveIpo[] = [];
  let nextUrl: string | undefined = path;
  let pageCount = 0;

  while (nextUrl) {
    pageCount += 1;
    const payload: MassiveListResponse<MassiveIpo> = await fetchMassiveJson<MassiveListResponse<MassiveIpo>>(nextUrl);
    results.push(...(payload.results || []));

    if (maxPages && pageCount >= maxPages) {
      break;
    }

    nextUrl = payload.next_url;
  }

  return { results, pageCount };
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();
  const path = buildIposPath();
  const maxPages = getMaxPages();

  try {
    const { results: ipos, pageCount } = await fetchIpoPages(path, maxPages);

    await withTransaction(pool, async (client) => {
      for (const ipo of ipos) {
        const ticker = asString(ipo.ticker);
        const ipoDate = asString(ipo.ipo_date) || asString(ipo.listing_date);

        await client.query(
          `
            delete from massive.ipos
            where ticker is not distinct from $1
              and ipo_date is not distinct from $2
          `,
          [ticker, ipoDate],
        );

        await client.query(
          `
            insert into massive.ipos (
              ticker,
              ipo_date,
              listing_date,
              issuer_name,
              issue_name,
              security_type,
              final_issue_price,
              shares_offered,
              total_offer_size,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          `,
          [
            ticker,
            ipoDate,
            asString(ipo.listing_date),
            asString(ipo.issuer_name),
            asString(ipo.issue_name),
            asString(ipo.security_type),
            asNumber(ipo.final_issue_price),
            asNumber(ipo.shares_offered),
            asNumber(ipo.total_offer_size),
            JSON.stringify(ipo),
          ],
        );
      }
    });

    console.log(`Ingested ${ipos.length} Massive IPO rows from ${pageCount} page(s): ${path}.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

