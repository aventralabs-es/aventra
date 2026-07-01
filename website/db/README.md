# Aventra Market Radar Database

Local PostgreSQL target:

```text
host: 127.0.0.1
port: 5432
database: marketdata
schema: massive
```

Massive tables are created step by step from the API endpoints used by Market Radar.

Current migrations:

```text
website/db/migrations/001_massive_schema.sql
website/db/migrations/002_market_data_universes.sql
```

Apply the Massive migration locally with PostgreSQL 17 on Windows:

```powershell
& 'C:\Program Files\PostgreSQL\17\bin\psql.exe' -h 127.0.0.1 -p 5432 -d marketdata -U postgres -f website\db\migrations\001_massive_schema.sql
```

## Current Massive Endpoints

`GET /v3/reference/exchanges`

```text
massive.exchanges
```

`GET /v1/marketstatus/upcoming`

```text
massive.market_holidays
```

`GET /v1/marketstatus/now`

```text
massive.market_status
```

`GET /v3/reference/conditions`

```text
massive.condition_codes
```

`GET /v3/reference/tickers`

```text
massive.tickers
```

Default ingestion filters: `market=stocks`, `active=true`, `limit=1000`.

`GET /v3/reference/tickers/types`

```text
massive.ticker_types
```

`GET /v3/reference/tickers/{ticker}`

```text
massive.ticker_overviews
```

`GET /v1/related-companies/{ticker}`

```text
massive.related_tickers
```

Run the four ticker endpoints together with:

```powershell
npm run ingest:massive:ticker-suite -- --tickers=AAPL,MSFT,NVDA
```

`GET /v2/aggs/grouped/locale/us/market/stocks/{date}`

```text
massive.daily_market_summaries
```

Daily market summary is used for efficient 1D US stock OHLCV ingestion:

```powershell
npm run ingest:massive:daily-market-summary -- --date=2026-06-30
```

`GET /v2/aggs/ticker/{ticker}/range/{multiplier}/{timespan}/{from}/{to}`

```text
massive.aggregate_bars_4h
massive.aggregate_bars_15m
```

Custom bars are used for 4H and 15M historical OHLCV ingestion:

```powershell
npm run ingest:massive:custom-bars -- --timeframe=4h --from=2026-06-01 --to=2026-06-30 --tickers=AAPL,MSFT
npm run ingest:massive:custom-bars -- --timeframe=15m --from=2026-06-30 --to=2026-06-30 --tickers=AAPL,MSFT
```

Use the initial NASDAQ 100 + S&P 500 universe with:

```powershell
npm run ingest:massive:custom-bars -- --timeframe=4h --from=2026-06-01 --to=2026-06-30 --universe=initial-us
```


`GET /stocks/v1/splits`

```text
massive.splits
```

Splits are used to detect when adjusted historical candles should be refreshed:

```powershell
npm run ingest:massive:splits -- --execution-date-gte=2026-01-01
npm run report:massive:split-refresh-plan -- --since=2026-01-01
```

Split refresh rule: for any ticker with a split, refresh adjusted candles from that ticker's earliest stored bar date through today for each affected timeframe. Raw Massive rows are kept as provider audit data; scanner/canonical candles should be rebuilt or re-fetched.
Tables store normalized endpoint fields plus aw_payload for provider audit/debugging.

Scanner logic should not read from Massive raw tables directly. Later migrations should map Massive raw data into canonical `market_data` tables, and Market Radar scans should read from the canonical layer.

## Current Market Data Universes

NASDAQ 100 and S&P 500 memberships are stored outside the Massive raw schema because index membership is a universe definition, not a Massive provider endpoint.

```text
market_data.index_memberships
```

Refresh the membership list:

```powershell
npm run ingest:universes:memberships
```

Refresh the initial US universe and fetch Massive ticker details for NASDAQ 100 + S&P 500 members:

```powershell
npm run ingest:universes:initial-us
```


`GET /stocks/financials/v1/balance-sheets`
`GET /stocks/financials/v1/cash-flow-statements`
`GET /stocks/financials/v1/income-statements`
`GET /stocks/financials/v1/ratios`
`GET /stocks/v1/short-interest`
`GET /stocks/v1/short-volume`
`GET /stocks/v1/float`

```text
massive.balance_sheets
massive.cash_flow_statements
massive.income_statements
massive.financial_ratios
massive.short_interest
massive.short_volume
massive.float
```

Fundamentals are stored with query/freshness keys plus `raw_payload` because statement line items and ratio fields vary by endpoint and may change over time. Run all fundamentals for the initial NASDAQ 100 + S&P 500 universe with:

```powershell
npm run ingest:massive:fundamentals -- --endpoint=all --universe=initial-us --from=2025-01-01 --to=2026-07-01
```

Run one endpoint with:

```powershell
npm run ingest:massive:income-statements -- --universe=initial-us --from=2025-01-01 --to=2026-07-01
npm run ingest:massive:short-interest -- --tickers=AAPL,MSFT --from=2026-01-01 --to=2026-07-01
```

`GET /vX/reference/ipos`
`GET /stocks/v1/dividends`
`GET /vX/reference/tickers/{id}/events`

```text
massive.ipos
massive.dividends
massive.ticker_events
```

Corporate actions beyond splits are stored as provider raw data with common query keys. Dividends use the current documented `/stocks/v1/dividends` path. IPO and ticker-events documentation currently shows `vX` placeholder paths, so the scripts support path overrides:

```powershell
npm run ingest:massive:dividends -- --tickers=AAPL,MSFT --from=2026-01-01 --to=2026-07-01
npm run ingest:massive:ipos -- --from=2026-01-01 --to=2026-07-01
npm run ingest:massive:ticker-events -- --tickers=AAPL,MSFT
```

Use `MASSIVE_IPOS_PATH` or `MASSIVE_TICKER_EVENTS_PATH` if Massive exposes a concrete versioned path for those experimental endpoints.


`GET /v3/trades/{stockTicker}`

```text
massive.trades
```

Trades are planned for a later market microstructure and volume-profile phase. They can support detecting low-volume price areas, liquidity gaps, traded-volume-by-price buckets, and weak auction zones. This endpoint is not enabled in the current Massive package, so only the raw table is prepared for now; ingestion should be added after plan access is available.
