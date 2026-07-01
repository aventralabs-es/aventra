import * as cheerio from "cheerio";
import { createDbPool, withTransaction } from "../massive/db";
import { loadLocalEnv } from "../massive/env";

type IndexMember = {
  universe_code: "nasdaq_100" | "sp_500";
  ticker: string;
  company_name: string | null;
  sector: string | null;
  industry: string | null;
  source: string;
  source_url: string;
  raw_payload: Record<string, string | null>;
};

const sources = {
  nasdaq_100: "https://en.wikipedia.org/wiki/Nasdaq-100",
  sp_500: "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies",
} as const;

function cleanText(value: string) {
  return value.replace(/\[[^\]]*]/g, "").replace(/\s+/g, " ").trim();
}

function normalizeTicker(value: string) {
  return cleanText(value).replace(/\s+/g, "").replace("-", ".").toUpperCase();
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "AventraMarketRadar/0.1 (+local development)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function getHeaderIndexes($: cheerio.CheerioAPI, table: Parameters<cheerio.CheerioAPI>[0]) {
  const headers = $(table)
    .find("tr")
    .first()
    .find("th,td")
    .map((_, cell) => cleanText($(cell).text()).toLowerCase())
    .get();

  return {
    headers,
    ticker: headers.findIndex((header) =>
      ["ticker", "symbol", "ticker symbol"].includes(header),
    ),
    company: headers.findIndex((header) =>
      ["company", "security", "company name"].includes(header),
    ),
    sector: headers.findIndex((header) => header.includes("sector")),
    industry: headers.findIndex((header) => header.includes("industry")),
  };
}

function tableRows($: cheerio.CheerioAPI, table: Parameters<cheerio.CheerioAPI>[0]) {
  return $(table).find("tr").slice(1).toArray();
}

function extractMembersFromTable(
  $: cheerio.CheerioAPI,
  table: Parameters<cheerio.CheerioAPI>[0],
  universeCode: IndexMember["universe_code"],
  sourceUrl: string,
) {
  const indexes = getHeaderIndexes($, table);

  if (indexes.ticker === -1 || indexes.company === -1) {
    return [];
  }

  return tableRows($, table)
    .map((row) => {
      const cells = $(row)
        .find("td,th")
        .map((_, cell) => cleanText($(cell).text()))
        .get();
      const ticker = normalizeTicker(cells[indexes.ticker] || "");

      if (!ticker) {
        return null;
      }

      const member: IndexMember = {
        universe_code: universeCode,
        ticker,
        company_name: cells[indexes.company] || null,
        sector: indexes.sector === -1 ? null : cells[indexes.sector] || null,
        industry: indexes.industry === -1 ? null : cells[indexes.industry] || null,
        source: "wikipedia",
        source_url: sourceUrl,
        raw_payload: Object.fromEntries(
          indexes.headers.map((header, index) => [header || `column_${index}`, cells[index] || null]),
        ),
      };

      return member;
    })
    .filter((member): member is IndexMember => member !== null);
}

async function fetchIndexMembers(universeCode: IndexMember["universe_code"]) {
  const sourceUrl = sources[universeCode];
  const html = await fetchHtml(sourceUrl);
  const $ = cheerio.load(html);
  const tables = $("table.wikitable").toArray();

  for (const table of tables) {
    const members = extractMembersFromTable($, table, universeCode, sourceUrl);

    if (members.length > 50) {
      return members;
    }
  }

  throw new Error(`Could not find ${universeCode} membership table at ${sourceUrl}`);
}

async function main() {
  loadLocalEnv();

  const pool = createDbPool();

  try {
    const memberships = [
      ...(await fetchIndexMembers("nasdaq_100")),
      ...(await fetchIndexMembers("sp_500")),
    ];

    await withTransaction(pool, async (client) => {
      await client.query(
        "delete from market_data.index_memberships where universe_code in ('nasdaq_100', 'sp_500')",
      );

      for (const member of memberships) {
        await client.query(
          `
            insert into market_data.index_memberships (
              universe_code,
              ticker,
              company_name,
              sector,
              industry,
              source,
              source_url,
              raw_payload
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8)
          `,
          [
            member.universe_code,
            member.ticker,
            member.company_name,
            member.sector,
            member.industry,
            member.source,
            member.source_url,
            JSON.stringify(member.raw_payload),
          ],
        );
      }
    });

    const nasdaqCount = memberships.filter(
      (member) => member.universe_code === "nasdaq_100",
    ).length;
    const spCount = memberships.filter((member) => member.universe_code === "sp_500")
      .length;

    console.log(
      `Ingested ${nasdaqCount} NASDAQ 100 and ${spCount} S&P 500 members.`,
    );
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
