MA Crossover Pullback Signals [Aventra] is a Pine Script v6 indicator that combines moving average crossover signals with pullback continuation signals.

The indicator is designed for traders who want a flexible moving-average signal package. It can show direct fast/slow MA crossover events, pullback continuation setups after MA alignment, or both signal types together.

## Features

- Bullish and bearish MA crossover signals
- Bullish and bearish MA pullback continuation signals
- Signal Mode input: Crossover, Pullback, or Crossover + Pullback
- Configurable calculation timeframe, default Chart
- Fast MA and Slow MA inputs, default 21 and 55
- EMA or SMA selection
- Pullback Source input: Fast MA, Slow MA, or Both
- ATR-based pullback tolerance
- Pullback confirmation window
- Aggressive, Balanced, and Conservative confirmation modes
- Relative volume filter enabled by default
- RSI filter enabled by default
- Optional slow MA slope filter
- Fast MA and Slow MA display controls
- Optional MA trend fill between Fast MA and Slow MA
- Distinct marker styles for crossover and pullback signals
- Pullback line and pullback zone display controls
- Signal markers and signal labels
- Relative volume and RSI values on signal labels when filters are enabled
- TradingView alerts for crossover and pullback signals

## Inputs

- Calculation Timeframe: timeframe used to calculate moving averages and signals, default Chart
- Signal Mode: Crossover, Pullback, or Crossover + Pullback, default Crossover + Pullback
- Signal Direction: Both, Bullish Only, or Bearish Only, default Both
- Fast MA Length: fast moving average length, default 21
- Slow MA Length: slow moving average length, default 55
- MA Type: EMA or SMA, default EMA
- Pullback Source: moving average used as the pullback reference, default Fast MA
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
- Require Slow MA Slope: requires slow MA slope to agree with signal direction, enabled by default
- Show MA Trend Fill: colors the area between Fast MA and Slow MA by trend direction, enabled by default
- Bullish MA Fill Color: fill color used when Fast MA is above Slow MA
- Bearish MA Fill Color: fill color used when Fast MA is below Slow MA

## Signal Logic

Bullish Crossover:

1. Fast MA crosses above Slow MA.
2. Optional volume, RSI, and slow MA slope filters must pass.

Bearish Crossover:

1. Fast MA crosses below Slow MA.
2. Optional volume, RSI, and slow MA slope filters must pass.

Bullish Pullback:

1. Price is above Slow MA.
2. Slow MA is rising over the selected slope bars.
3. Price pulls back into the selected moving average area.
4. Price confirms continuation using the selected confirmation mode.
5. Optional volume, RSI, and slow MA slope filters must pass.

Bearish Pullback:

1. Price is below Slow MA.
2. Slow MA is falling over the selected slope bars.
3. Price pulls back into the selected moving average area.
4. Price confirms continuation using the selected confirmation mode.
5. Optional volume, RSI, and slow MA slope filters must pass.

## Notes

MA Crossover Pullback Signals [Aventra] does not place trades and does not guarantee future performance. It is intended to highlight moving-average crossover and pullback continuation setups and should be used together with market context, risk management, and independent analysis.
