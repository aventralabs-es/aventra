# TradingView Indicators

This folder contains Aventra indicators built for TradingView Pine Script v6.

## Naming Standard

Indicator display names use the international marketplace style:

`Concept [Aventra]`

Current indicators:

- `MA Crossover Signals [Aventra]`
- `Dynamic Support Resistance [Aventra]`
- `Trend Strength Matrix [Aventra]`
- `Liquidity Zones [Aventra]`
- `Volume Pressure [Aventra]`
- `Market Structure [Aventra]`
- `FVG & IFVG [Aventra]`

The `indicator()` title and `shorttitle` should match unless there is a strong product reason to shorten the status-line name.

## Versioning Standard

Use a stable product name and track changes through release notes and source comments.

Recommended source comment:

```pine
// Aventra Version: 1.0.0
```

Version rules:

- `1.0.0`: first stable public release
- `1.1.0`: backward-compatible feature addition
- `1.1.1`: bug fix or small polish update
- `2.0.0`: breaking behavior change, especially signal logic changes

Do not add version numbers to the indicator display name unless a separate product line is intentionally created.

## MA Crossover Signals [Aventra]

File: `aventra_moving_average.pine`

Display name: `MA Crossover Signals [Aventra]`

Pine version: `//@version=6`

### Features

- Configurable price source
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable moving average type: SMA, EMA, WMA, RMA, VWMA
- Fast and slow moving averages
- BUY/SELL crossover signals
- Trend fill
- Optional trend-based bar coloring
- TradingView alert conditions

### Signal Logic

- BUY signal: fast moving average crosses above slow moving average
- SELL signal: fast moving average crosses below slow moving average

## Dynamic Support Resistance [Aventra]

File: `aventra_dynamic_support_resistance.pine`

Display name: `Dynamic Support Resistance [Aventra]`

Pine version: `//@version=6`

### Features

- Pivot-based dynamic support and resistance levels
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable pivot left/right bars
- Configurable maximum visible levels
- Optional support/resistance price labels
- BREAKOUT/BREAKDOWN signal labels
- TradingView alert conditions

### Signal Logic

- BREAKOUT signal: price crosses above the latest resistance level
- BREAKDOWN signal: price crosses below the latest support level

## Trend Strength Matrix [Aventra]

File: `aventra_trend_strength_matrix.pine`

Display name: `Trend Strength Matrix [Aventra]`

Pine version: `//@version=6`

### Features

- Multi-factor trend strength score
- Configurable calculation timeframe, defaulting to the chart timeframe
- Fast and slow EMA trend component
- RSI momentum component
- DMI/ADX trend strength component
- Optional ATR volatility filter
- Bullish, bearish, and neutral trend states
- Trend fill, optional bar coloring, optional background coloring
- Trend strength matrix table
- TradingView alert conditions

### Signal Logic

- Bullish trend: trend score is greater than or equal to the minimum score and volatility is acceptable
- Bearish trend: trend score is less than or equal to the negative minimum score and volatility is acceptable
- Neutral trend: neither bullish nor bearish trend conditions are active

## Liquidity Zones [Aventra]

File: `aventra_liquidity_zones.pine`

Display name: `Liquidity Zones [Aventra]`

Pine version: `//@version=6`

### Features

- Equal high and equal low liquidity zone detection
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable pivot left/right bars
- ATR-based equal level tolerance and zone padding
- Configurable maximum visible zones
- Optional zone labels
- Buy-side and sell-side sweep labels
- Active and swept zone styling
- TradingView alert conditions

### Signal Logic

- Buy-side liquidity zone: two confirmed pivot highs are close enough to be considered equal highs
- Sell-side liquidity zone: two confirmed pivot lows are close enough to be considered equal lows
- Buy-side sweep: price trades above a buy-side liquidity zone and closes back below the zone top
- Sell-side sweep: price trades below a sell-side liquidity zone and closes back above the zone bottom

## Volume Pressure [Aventra]

File: `aventra_volume_pressure.pine`

Display name: `Volume Pressure [Aventra]`

Pine version: `//@version=6`

Panel: lower panel (`overlay=false`)

### Features

- Volume pressure histogram
- Configurable calculation timeframe, defaulting to the chart timeframe
- Candle-location based bullish/bearish pressure estimate
- Volume moving average and relative volume
- Relative volume spike detection
- Smoothed pressure line
- Optional relative volume line, hidden by default
- Optional compact bullish and bearish pressure labels, hidden by default
- Compact bullish and bearish volume spike markers
- TradingView alert conditions

### Signal Logic

- Bullish pressure signal: smoothed pressure crosses above the positive pressure threshold
- Bearish pressure signal: smoothed pressure crosses below the negative pressure threshold
- Bullish volume spike: bullish pressure is active and relative volume is above the spike threshold
- Bearish volume spike: bearish pressure is active and relative volume is above the spike threshold

## Market Structure [Aventra]

File: `aventra_market_structure.pine`

Display name: `Market Structure [Aventra]`

Pine version: `//@version=6`

### Features

- Swing high and swing low detection
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable swing left/right bars
- Bullish and bearish BOS detection
- Bullish and bearish CHoCH detection
- Optional swing high/low labels
- BOS/CHoCH structure labels
- Structure break lines
- Current swing high/low levels
- TradingView alert conditions

### Signal Logic

- Bullish BOS: price closes above the latest active swing high while structure is not bearish
- Bearish BOS: price closes below the latest active swing low while structure is not bullish
- Bullish CHoCH: price closes above the latest active swing high after a bearish structure state
- Bearish CHoCH: price closes below the latest active swing low after a bullish structure state

## FVG & IFVG [Aventra]

File: `aventra_fair_value_gaps.pine`

Display name: `FVG & IFVG [Aventra]`

Pine version: `//@version=6`

### Features

- Bullish and bearish Fair Value Gap detection
- Bullish and bearish true price gap detection, enabled by default
- Optional Inverse Fair Value Gap display, disabled by default
- Configurable calculation timeframe, defaulting to the chart timeframe
- ATR-based minimum gap size filter
- Configurable maximum visible gaps, default 50 and maximum 200
- Active, mitigated, and inverse gap styling
- Optional gap labels, hidden by default and synced with visible gaps
- Optional mitigation and IFVG labels
- Gap midpoint line, enabled by default
- TradingView alert conditions

### Signal Logic

- Bullish price gap: current low is above the previous bar high
- Bearish price gap: current high is below the previous bar low
- Bullish FVG: current low is above the high from two bars back
- Bearish FVG: current high is below the low from two bars back
- Bullish FVG mitigated: price trades into the bullish gap down to its lower boundary; if kept visible, the gap stops at the mitigation bar
- Bearish FVG mitigated: price trades into the bearish gap up to its upper boundary; if kept visible, the gap stops at the mitigation bar
- Bullish IFVG: a bearish FVG is invalidated by a close above its upper boundary
- Bearish IFVG: a bullish FVG is invalidated by a close below its lower boundary

## Publishing Checklist

Before publishing on TradingView:

- Confirm the script uses Pine Script v6
- Confirm all visible labels, inputs, alerts, and descriptions are in English
- Confirm the display name follows `Concept [Aventra]`
- Confirm `title` and `shorttitle` match when required
- Test default settings on a clean chart
- Test a custom calculation timeframe
- Confirm alerts trigger with the expected message text
- Publish privately first as a draft
- Review title, description, chart image, and release notes before public release

## Platform Porting Note

After the TradingView logic is finalized, the same calculation behavior should be ported to MetaTrader and cTrader so the signal behavior stays consistent across platforms.

## Order Blocks & Breakers [Aventra]

File: `aventra_order_blocks_breakers.pine`

Order Blocks & Breakers [Aventra] detects bullish and bearish order blocks after structure breaks and optionally converts invalidated blocks into breaker zones.

Key defaults:

- Pine Script v6
- Overlay indicator
- Calculation timeframe defaults to chart
- Show Order Blocks enabled by default
- Show Breaker Blocks disabled by default
- Maximum Order Blocks default 50
- Maximum Breaker Blocks default 50
- Labels disabled by default
- Equilibrium line enabled by default
- Light opacity colors and borderless boxes for a quieter Aventra visual style
## Market Sessions [Aventra]

File: `aventra_market_sessions.pine`

Market Sessions [Aventra] highlights Asia, London, and New York trading sessions with lightweight session boxes, session high / low lines, and optional labels.

Key defaults:

- Pine Script v6
- Overlay indicator
- Session Timezone defaults to UTC
- Asia, London, and New York enabled by default
- Maximum Sessions default 50 per session type
- Session boxes enabled by default
- Session high / low lines enabled by default
- Labels disabled by default
- Light opacity colors and borderless boxes for a quieter Aventra visual style