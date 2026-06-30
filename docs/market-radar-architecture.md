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












