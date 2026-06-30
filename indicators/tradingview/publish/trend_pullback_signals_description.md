Trend Pullback Signals [Aventra] is a Pine Script v6 indicator designed to identify pullback continuation signals inside an existing trend.

The indicator combines trend direction, pullback interaction, continuation confirmation, optional RSI filtering, and optional relative volume confirmation. It is built for traders who want to avoid chasing extended candles and instead focus on trend-continuation setups after price returns toward a moving average area.

## Features

- Bullish pullback signals in rising trends
- Bearish pullback signals in falling trends
- Configurable calculation timeframe, default Chart
- Trend MA and Pullback MA inputs
- EMA or SMA selection for both moving averages
- Trend slope filter using configurable bars
- ATR-based pullback tolerance
- Pullback window for confirmation timing
- Aggressive, Balanced, and Conservative confirmation modes
- Optional relative volume filter
- Volume MA Length input, default 21
- Optional RSI filter, enabled by default
- Trend MA and Pullback MA display controls
- Pullback line and pullback zone display controls
- Signal markers and signal labels
- Historical signal retention with maximum signal limit
- TradingView alerts for bullish and bearish pullback signals

## Inputs

- Calculation Timeframe: timeframe used to calculate trend, pullback, and signals, default Chart
- Signal Direction: Both, Bullish Only, or Bearish Only, default Both
- Trend MA Length: main trend moving average length, default 55
- Trend MA Type: EMA or SMA, default EMA
- Pullback MA Length: pullback reference moving average length, default 21
- Pullback MA Type: EMA or SMA, default EMA
- Trend Slope Bars: bars used to confirm trend MA direction, default 5
- Pullback Window Bars: maximum bars allowed between pullback touch and confirmation, default 10
- ATR Length: ATR length used for tolerance and label offsets, default 14
- Pullback Tolerance ATR: distance around the pullback MA accepted as pullback area, default 0.25
- Confirmation Buffer ATR: extra confirmation buffer above or below the previous bar, default 0.05
- Confirmation Mode: Aggressive, Balanced, or Conservative, default Balanced
- Use Volume Filter: requires relative volume confirmation, enabled by default
- Volume MA Length: volume average length used for relative volume, default 21
- Minimum Relative Volume: minimum relative volume required when volume filter is enabled, default 1.20
- Use RSI Filter: requires RSI confirmation, enabled by default
- RSI Length: RSI calculation length, default 14
- Bullish RSI Minimum: minimum RSI for bullish signals, default 50
- Bearish RSI Maximum: maximum RSI for bearish signals, default 50

## Signal Logic

Bullish Signal:

1. Price is above the Trend MA.
2. The Trend MA is rising over the selected slope bars.
3. Price pulls back into the Pullback MA area.
4. Price confirms continuation using the selected confirmation mode.
5. Optional RSI and volume filters must pass if enabled.

Bearish Signal:

1. Price is below the Trend MA.
2. The Trend MA is falling over the selected slope bars.
3. Price pulls back into the Pullback MA area.
4. Price confirms continuation using the selected confirmation mode.
5. Optional RSI and volume filters must pass if enabled.

## Notes

Trend Pullback Signals [Aventra] does not place trades and does not guarantee future performance. It is intended to highlight trend-continuation pullback setups and should be used together with market context, risk management, and independent analysis.
