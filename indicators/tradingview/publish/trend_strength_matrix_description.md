Trend Strength Matrix [Aventra] is a Pine Script v6 indicator that combines EMA direction, RSI momentum, ADX trend strength, and optional ATR volatility filtering into a clear bullish, bearish, or neutral trend state.

It uses multiple technical components to produce a configurable trend score. The goal is to help traders evaluate trend direction, trend quality, and market state without relying on a single signal source.

## Features

- Multi-factor trend strength score
- Configurable calculation timeframe, defaulting to the chart timeframe
- Fast and slow EMA trend component
- RSI momentum component
- DMI/ADX trend strength component
- Optional ATR volatility filter
- Bullish, bearish, and neutral trend states
- Trend fill between EMAs
- Configurable trend fill and background colors
- Optional trend-based bar coloring
- Optional trend background shading
- Trend strength matrix table
- TradingView alert conditions

## Inputs

- Source: price source used for EMA and RSI calculations
- Calculation Timeframe: empty by default, which means chart timeframe
- Fast EMA Length: fast EMA period
- Slow EMA Length: slow EMA period
- RSI Length: RSI period
- RSI Bullish Level: RSI threshold for bullish momentum
- RSI Bearish Level: RSI threshold for bearish momentum
- ADX Length: DMI/ADX period
- ADX Smoothing: ADX smoothing period
- Minimum ADX: minimum ADX required for the DMI score
- Use ATR Volatility Filter: toggles volatility filtering
- ATR Length: ATR period
- Minimum ATR %: minimum ATR percentage required when the filter is enabled
- Minimum Trend Score: minimum score required for bullish or bearish state
- Show Trend Change Labels: toggles BULLISH/BEARISH/NEUTRAL labels
- Trend Label Size: controls the trend change label font size
- Color Bars by Trend: toggles trend-based candle coloring
- Show Trend Background: toggles background shading, enabled by default
- Bullish/Bearish/Neutral Fill Color: controls the EMA fill colors
- Bullish/Bearish/Neutral Background Color: controls the trend background colors
- Show Matrix Table: toggles the trend strength matrix table

## Signal Logic

Bullish trend: the trend score is greater than or equal to the minimum score and the volatility filter is satisfied.

Bearish trend: the trend score is less than or equal to the negative minimum score and the volatility filter is satisfied.

Neutral trend: neither bullish nor bearish trend conditions are active.

## Notes

This indicator is intended for visual trend analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
