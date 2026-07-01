export type MassiveFundamentalsEndpoint =
  | "balance-sheets"
  | "cash-flow-statements"
  | "income-statements"
  | "ratios"
  | "short-interest"
  | "short-volume"
  | "float";

type EndpointKind = "financial-statement" | "short-interest" | "short-volume" | "float";

export type MassiveFundamentalsConfig = {
  endpoint: MassiveFundamentalsEndpoint;
  path: string;
  tableName: string;
  kind: EndpointKind;
  tickerParam: string;
  defaultSort: string;
  defaultOrder?: string;
  dateParam: string;
};

export const FUNDAMENTALS_ENDPOINTS: MassiveFundamentalsConfig[] = [
  {
    endpoint: "balance-sheets",
    path: "/stocks/financials/v1/balance-sheets",
    tableName: "balance_sheets",
    kind: "financial-statement",
    tickerParam: "tickers.any_of",
    defaultSort: "period_end",
    dateParam: "period_end",
  },
  {
    endpoint: "cash-flow-statements",
    path: "/stocks/financials/v1/cash-flow-statements",
    tableName: "cash_flow_statements",
    kind: "financial-statement",
    tickerParam: "tickers.any_of",
    defaultSort: "period_end",
    dateParam: "period_end",
  },
  {
    endpoint: "income-statements",
    path: "/stocks/financials/v1/income-statements",
    tableName: "income_statements",
    kind: "financial-statement",
    tickerParam: "tickers.any_of",
    defaultSort: "period_end",
    dateParam: "period_end",
  },
  {
    endpoint: "ratios",
    path: "/stocks/financials/v1/ratios",
    tableName: "financial_ratios",
    kind: "financial-statement",
    tickerParam: "tickers.any_of",
    defaultSort: "period_end",
    dateParam: "period_end",
  },
  {
    endpoint: "short-interest",
    path: "/stocks/v1/short-interest",
    tableName: "short_interest",
    kind: "short-interest",
    tickerParam: "ticker.any_of",
    defaultSort: "settlement_date",
    defaultOrder: "desc",
    dateParam: "settlement_date",
  },
  {
    endpoint: "short-volume",
    path: "/stocks/v1/short-volume",
    tableName: "short_volume",
    kind: "short-volume",
    tickerParam: "ticker.any_of",
    defaultSort: "date",
    defaultOrder: "desc",
    dateParam: "date",
  },
  {
    endpoint: "float",
    path: process.env.MASSIVE_FLOAT_PATH || "/stocks/v1/float",
    tableName: "float",
    kind: "float",
    tickerParam: "ticker.any_of",
    defaultSort: "date",
    defaultOrder: "desc",
    dateParam: "date",
  },
];

export function findFundamentalsConfig(endpoint: string) {
  return FUNDAMENTALS_ENDPOINTS.find((config) => config.endpoint === endpoint);
}
