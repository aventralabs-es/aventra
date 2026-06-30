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

