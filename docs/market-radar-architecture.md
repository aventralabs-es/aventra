# Aventra Market Radar Architecture

## Product Positioning

Aventra Market Radar is a setup and pattern search product for educational technical analysis. It should surface detected conditions and watchlist candidates, not direct trade recommendations.

Use careful language:

- Potential setup
- Detected condition
- Watchlist candidate
- Market context
- Invalidation level
- Educational scenario

Avoid language such as guaranteed signal, buy now, take this trade, or certain profit.

## Current MVP Decision

The first Market Radar implementation should focus on trend-continuation pattern search before broader setup search or reversal detection.

Initial continuation scope:

- Bull flag
- Bear flag
- Ascending triangle in an uptrend
- Descending triangle in a downtrend
- Breakout retest
- Breakdown retest
- MA pullback
- Range continuation

The scanner should prioritize clear trend context, consolidation quality, breakout/retest structure, volume context, and invalidation clarity.

Initial timeframe scope:

- 1D for swing and broader trend-continuation candidates
- 4H for active continuation structures inside the broader trend
- 15M for shorter intraday continuation candidates

## Search Filter Model

Market Radar search should use a seven-step filter hierarchy:

1. Market Type
2. Country
3. Exchange
4. Index / Universe
5. Pattern Behavior
6. Direction
7. Chart Pattern

Market Type options:

- Stocks: MVP priority
- Forex: planned later
- Crypto: planned later

The MVP should prioritize stocks first. Forex and crypto should be designed into the filter model from the start, but added after the stock scanner is reliable because symbol formats, sessions, volume behavior, and liquidity profiles differ by market.

Country and Exchange options:

- United States: NASDAQ, NYSE
- Turkiye: BIST

The MVP should start with NASDAQ, NYSE, and BIST. Later phases can expand country and exchange coverage after the stock scanner is reliable.

Index / Universe options:

- NASDAQ 100 / NQ universe for large Nasdaq-listed growth and technology names
- S&P 500 universe for broad US large-cap stocks
- BIST 100 universe for the primary Turkiye stock universe

The index/universe filter should define the actual scan list inside the selected country and exchange scope. Later phases can add more indices, custom watchlists, sectors, and thematic lists.

Pattern Behavior options:

- Continuation
- Reversal later

Direction options:

- Both
- Bullish
- Bearish

Default MVP selection:

- Market Type: Stocks
- Country: United States and Turkiye
- Exchanges: NASDAQ, NYSE, BIST
- Index / Universe: NASDAQ 100 / NQ, S&P 500, BIST 100
- Pattern Behavior: Continuation
- Direction: Both
- Timeframes: 1D, 4H, 15M

Chart Pattern options should be filtered by the selected behavior and direction. For the continuation MVP:

| Pattern Behavior | Direction | Available Chart Patterns |
| --- | --- | --- |
| Continuation | Both | Bull flag, bear flag, ascending triangle, descending triangle, breakout retest, breakdown retest, MA pullback, range continuation |
| Continuation | Bullish | Bull flag, ascending triangle in an uptrend, breakout retest, MA pullback in an uptrend, bullish range continuation |
| Continuation | Bearish | Bear flag, descending triangle in a downtrend, breakdown retest, MA pullback in a downtrend, bearish range continuation |

The UI should ask for direction as a first-class filter because continuation patterns can exist in both rising and falling markets. Pattern names should not decide direction by themselves; trend context, breakout/breakdown direction, and market structure should determine the final classification.

## Data Architecture Decision

Market Radar should pull market data from a data provider into an Aventra-controlled database before running scanner logic.

This is preferred over running scans directly against external APIs because it gives Aventra:

- Faster repeated scans across the same universes
- More stable pattern detection and backtesting inputs
- Provider abstraction if the data vendor changes later
- Better control over symbol normalization, exchange mapping, and index membership
- A persistent history of detected candidates and quality scores

Initial data scope:

- OHLCV candles for 1D, 4H, and 15M
- Symbol metadata: ticker, name, market type, country, exchange, currency, active status
- Index/universe membership: NASDAQ 100 / NQ, S&P 500, BIST 100
- Scanner runs: scan timestamp, filters, provider snapshot, and result count
- Scanner results: symbol, timeframe, pattern behavior, direction, chart pattern, quality score, explanation, invalidation level

Suggested storage model:

- `symbols`
- `exchanges`
- `index_universes`
- `index_memberships`
- `candles`
- `scanner_runs`
- `scanner_results`

The first implementation can use a simple scheduled ingestion job and local/Postgres storage. Supabase/Postgres remains a good fit once user accounts, saved scans, watchlists, and premium features are added.

Provider selection should be decided separately after comparing coverage for US stocks, BIST data, intraday history, rate limits, licensing, cost, and redistribution rules.

## Provider Strategy

The first practical MVP can start with Massive Stocks Starter for US stocks so the Market Radar scanner, local PostgreSQL ingestion, candle normalization, and continuation-pattern logic can be developed against NASDAQ/NYSE data before adding BIST coverage.

BIST should be added later through a provider that has reliable Turkiye/BIST coverage, intraday data, corporate actions, and acceptable commercial usage terms.

Provider isolation decision:

- Use provider-specific PostgreSQL schemas for raw imported data, such as `provider_massive` and later `provider_eodhd` or another BIST-capable provider.
- Use a provider-neutral canonical schema for Aventra-normalized data, such as `market_data` or `core_market`.
- Scanner logic should read from canonical tables, not directly from provider-specific raw tables.
- Provider adapters should map raw provider symbols, exchanges, candles, fundamentals, and corporate actions into the canonical Aventra model.
- Keep provider request/response metadata and sync logs in provider schemas or ingestion tables for debugging and migration audits.

This gives isolation while keeping the application portable. Provider schemas protect raw vendor differences; canonical tables protect the scanner and dashboard from provider changes.

Suggested schema layout:

- `provider_massive`: raw Massive symbols, exchanges, aggregates/candles, corporate actions, provider sync logs
- `provider_bist_candidate`: later raw BIST-capable provider data during evaluation
- `market_data`: canonical exchanges, symbols, index universes, candles, fundamentals, corporate actions
- `market_radar`: scanner runs, scanner results, pattern classifications, quality scores

Migration rule:

- Adding or replacing a provider should require a new provider adapter and raw schema mapping, not changes to scanner logic.
- If a provider changes split-adjusted historical candles, rebuild canonical adjusted candles and invalidate affected scanner results before showing them as current.

## Initial Ingestion Scope

The first ingestion layer should collect the data needed to build and maintain the scan universe before running pattern detection.

Initial ingestion tasks:

1. Fetch exchange list and trading calendars for supported markets.
2. Fetch symbols listed on each supported exchange.
3. Fetch or maintain index/universe membership for NASDAQ 100 / NQ, S&P 500, and BIST 100.
4. Fetch OHLCV candles for each active symbol on 1D, 4H, and 15M timeframes.
5. Fetch basic fundamental data needed for filtering and display, such as company name, sector, industry, market cap, currency, and active/listing status.
6. Fetch corporate actions, especially splits, and store them separately from candles.

Suggested additional storage model:

- `fundamentals` for basic company and instrument-level fields
- `corporate_actions` for splits, dividends later, symbol changes, and delistings
- `ingestion_runs` for provider sync status, errors, and last successful timestamp per job

Candle adjustment policy:

- Store provider raw candles when available.
- Store provider adjusted candles when available and clearly mark the adjustment source.
- Prefer provider-adjusted historical candles for split-adjusted scanning when the provider supports it reliably.
- If a split is detected and provider-adjusted candles are unavailable or delayed, recalculate adjusted historical prices internally using the stored split ratio.
- After any split/corporate action update, mark affected symbols and timeframes for candle refresh or adjustment rebuild before scanner results are trusted.

The scanner should run on adjusted candles for pattern quality and historical continuity, while raw candles can be retained for audit, display choices, and provider validation.

## Ingestion Job Scheduling

Market Radar ingestion should be split into independent jobs with different schedules instead of one large refresh task.

Recommended MVP job schedule:

| Job | Purpose | Suggested Local Schedule | Notes |
| --- | --- | --- | --- |
| `ingest:exchanges` | Refresh supported exchanges and trading calendars | Once daily before market sessions or manually when provider metadata changes | Low frequency; needed for market hours and holiday awareness |
| `ingest:symbols` | Refresh exchange-listed symbols and active/listing status | Once daily before market sessions or after market close | Detects new listings, delistings, symbol changes |
| `ingest:index-memberships` | Refresh NASDAQ 100 / NQ, S&P 500, and BIST 100 universes | Once daily, preferably after market close | Index membership changes are not intraday-critical |
| `ingest:fundamentals` | Refresh basic fundamentals and company metadata | Daily or weekly depending on provider limits | Market cap can change daily; sector/industry changes rarely |
| `ingest:corporate-actions` | Refresh splits, dividends later, symbol changes, delistings | Daily before candle adjustment jobs | Split updates can invalidate historical adjusted candles |
| `ingest:candles:1d` | Fetch daily OHLCV candles | Once after each exchange close | Use exchange calendar and local market close times |
| `ingest:candles:4h` | Fetch or aggregate 4H candles | After each completed 4H bar during active sessions | Can be built from lower timeframe data if provider does not supply 4H directly |
| `ingest:candles:15m` | Fetch or aggregate 15M candles | After each completed 15M bar during active sessions | Highest-frequency MVP ingestion job |
| `rebuild:adjustments` | Rebuild adjusted candles after split/corporate action changes | Triggered after corporate action changes, otherwise on demand | Must run before scanner trusts affected symbols |
| `scan:market-radar` | Run continuation pattern scanner | After relevant candle ingestion completes | Scanner schedule can be per timeframe or combined |

The scheduler should be market-calendar aware. US and BIST jobs should not assume the same session hours, holidays, or close times.

Suggested command structure:

- `npm run ingest:exchanges`
- `npm run ingest:symbols`
- `npm run ingest:index-memberships`
- `npm run ingest:fundamentals`
- `npm run ingest:corporate-actions`
- `npm run ingest:candles -- --timeframe=1d`
- `npm run ingest:candles -- --timeframe=4h`
- `npm run ingest:candles -- --timeframe=15m`
- `npm run rebuild:adjustments`
- `npm run scan:market-radar -- --timeframe=15m`

Each job should write an `ingestion_runs` row with status, started time, finished time, provider, affected market, affected exchange, affected timeframe, fetched rows, skipped rows, and errors.

The combined local command `npm run market-radar:refresh` can remain useful for development, but production-style scheduling should trigger these jobs separately.

## Local Ingestion Automation

During local-first development, data ingestion should run as a standalone Node.js/TypeScript worker script that writes into the local PostgreSQL database.

Recommended local flow:

1. Fetch or refresh exchanges, trading calendars, symbols, and index membership data.
2. Fetch basic fundamentals for active symbols.
3. Fetch corporate actions, especially splits.
4. Fetch missing OHLCV candles from the selected data provider.
5. Normalize provider symbols into Aventra symbols.
6. Upsert candles into PostgreSQL with unique keys on symbol, timeframe, and timestamp.
7. Rebuild adjusted candle values when split data changes or provider-adjusted data is refreshed.
8. Aggregate lower timeframes when needed, such as 15M from 5M or 4H from 1H.
9. Run scanner jobs after ingestion completes.
10. Store scanner runs and scanner results for the dashboard.

Initial automation options:

- Manual command during development: `npm run ingest:market-data`
- Manual scanner run: `npm run scan:market-radar`
- Combined local pipeline: `npm run market-radar:refresh`
- Later local scheduling: Windows Task Scheduler calling the same npm command
- Later production scheduling: Vercel Cron, VPS cron, or a dedicated worker queue depending on the final hosting choice

The ingestion script should be idempotent. Running it multiple times should not duplicate candles or scanner results. It should fetch from the last stored candle timestamp per symbol/timeframe and only backfill missing data.

Local environment variables:

- `DATABASE_URL`
- `MARKET_DATA_PROVIDER`
- `MARKET_DATA_API_KEY`
- `INGESTION_SECRET` later for protected HTTP-triggered jobs

The worker should stay independent from the UI so the same ingestion and scanner logic can run locally, on Vercel Cron, or on a VPS without rewriting the core code.

## Build Sequence

### Phase 1: Continuation Pattern Radar

Scan bullish and bearish trend-continuation structures where price consolidates or pulls back inside an existing trend.

Examples:

- Bull flag
- Bear flag
- Ascending triangle
- Descending triangle
- MA pullback
- Breakout retest
- Breakdown retest
- Range continuation

### Phase 2: Reversal Pattern Radar

Scan context-dependent reversal structures around exhaustion, failed moves, liquidity sweeps, and structure shifts.

Examples:

- Double bottom
- Double top
- Inverse head and shoulders
- Head and shoulders
- Falling wedge
- Rising wedge
- Failed breakout
- Failed breakdown
- Liquidity sweep reversal
- Divergence reversal

### Phase 3: Ready Setup Radar

Combine pattern, trend context, volume, key levels, invalidation, and scoring into watchlist candidates.

Examples:

- Trend template
- Volume breakout
- Momentum setup
- Liquidity sweep reversal
- FVG reaction
- Premium/discount context

## Core Classification Model

Market Radar should classify every detected candidate with these fields:

```text
market_type
- stocks
- forex
- crypto

country
- united_states
- turkiye

exchange
- nasdaq
- nyse
- bist

index_universe
- nasdaq_100
- sp_500
- bist_100

direction
- bullish
- bearish

behavior
- continuation
- reversal

pattern_family
- flag
- wedge
- triangle
- channel
- head_shoulders
- double_top_bottom
- range
- retest
- divergence
- liquidity_sweep

pattern_variant
- bull_flag
- bear_flag
- falling_wedge
- rising_wedge
- ascending_triangle
- descending_triangle
- inverse_head_shoulders
- head_shoulders
- double_bottom
- double_top
- breakout_retest
- breakdown_retest

market_context
- uptrend
- downtrend
- range
- pullback
- breakout
- breakdown
- accumulation
- distribution
- exhaustion

quality_score
- 0 to 100

explanation
- why this pattern was detected
- what confirms it
- what invalidates it
```

## Important Modeling Rule

Pattern variant alone should not decide the final interpretation. Pattern plus market context should decide direction and behavior.

Examples:

- `falling_wedge + uptrend pullback = bullish continuation`
- `falling_wedge + downtrend exhaustion = bullish reversal`
- `rising_wedge + downtrend pullback = bearish continuation`
- `rising_wedge + uptrend exhaustion = bearish reversal`

This keeps the scanner aligned with technical analysis context instead of naming patterns too early.

## Website Stack Decision

The Aventra website has moved from a static HTML MVP to a Next.js + TypeScript application in `website/`.

Current stack:

- Next.js App Router
- TypeScript
- Vercel hosting and Web Analytics
- Legacy blog HTML pages served from `website/public/blog/` until migrated

Future stack additions:

- Supabase for auth, user data, watchlists, saved scans, and account features
- Stripe for payment flows when premium access begins
- GitHub Actions for CI checks when lint, tests, and type checks are formalized






















