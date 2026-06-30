# Aventra Indicators

This repository is organized to develop the same indicator logic first for TradingView, then for MetaTrader and cTrader.

## Roadmap

1. TradingView Pine Script v6 indicators
2. MetaTrader MQL4/MQL5 indicators
3. cTrader cAlgo / C# indicators

## Naming Standard

Indicator display names use the international marketplace style: `Concept [Aventra]`.

Examples:

- `MA Crossover Signals [Aventra]`
- `Dynamic Support Resistance [Aventra]`
- `Trend Strength Matrix [Aventra]`
- `Liquidity Zones [Aventra]`
- `Volume Pressure [Aventra]`
- `Market Structure [Aventra]`
- `FVG & IFVG [Aventra]`

## TradingView Indicators

### MA Crossover Signals [Aventra]

File: `indicators/tradingview/aventra_moving_average.pine`

A Pine Script v6 indicator that plots two configurable moving averages and crossover signals.

### Dynamic Support Resistance [Aventra]

File: `indicators/tradingview/aventra_dynamic_support_resistance.pine`

A Pine Script v6 indicator that plots pivot-based dynamic support/resistance levels and BREAKOUT/BREAKDOWN signals.

### Trend Strength Matrix [Aventra]

File: `indicators/tradingview/aventra_trend_strength_matrix.pine`

A Pine Script v6 indicator that combines EMA trend, RSI momentum, DMI/ADX trend strength, and optional ATR volatility filtering into bullish, bearish, and neutral trend states.

### Liquidity Zones [Aventra]

File: `indicators/tradingview/aventra_liquidity_zones.pine`

A Pine Script v6 indicator that detects equal high/equal low liquidity zones and buy-side/sell-side sweep events.

### Volume Pressure [Aventra]

File: `indicators/tradingview/aventra_volume_pressure.pine`

A Pine Script v6 lower-panel indicator that estimates bullish/bearish volume pressure, relative volume, and volume spike events.

### Market Structure [Aventra]

File: `indicators/tradingview/aventra_market_structure.pine`

A Pine Script v6 indicator that detects swing highs/lows, BOS, CHoCH, and active structure levels.

### FVG & IFVG [Aventra]

File: `indicators/tradingview/aventra_fair_value_gaps.pine`

A Pine Script v6 indicator that detects Fair Value Gaps, mitigations, and optional Inverse Fair Value Gaps.

Shared behavior:

- Default calculation timeframe is the chart timeframe
- Users can select another calculation timeframe from indicator settings
- Visible labels, inputs, and alerts are written in English for international use

## Platform Mapping Note

After the TradingView logic is finalized, the same calculation core will be ported to MetaTrader and cTrader so the signal behavior stays consistent across platforms.
