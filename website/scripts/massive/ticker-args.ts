export function getTickerArgs(defaultTicker = "AAPL") {
  const tickerArg = process.argv.find((arg) => arg.startsWith("--ticker="));
  const tickersArg = process.argv.find((arg) => arg.startsWith("--tickers="));
  const rawTickers =
    tickersArg?.slice("--tickers=".length) ||
    tickerArg?.slice("--ticker=".length) ||
    process.env.MASSIVE_TICKERS ||
    defaultTicker;

  return rawTickers
    .split(",")
    .map((ticker) => ticker.trim().toUpperCase())
    .filter(Boolean);
}
