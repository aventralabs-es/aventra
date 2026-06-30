Breakout Retest Signals [Aventra] is a Pine Script v6 indicator that identifies confirmed breakout-and-retest setups around recent swing highs and swing lows.

The indicator is designed for price action traders who want to wait for a structure level to break, then watch for price to retest the broken level before printing a directional confirmation signal.

## Features

- Bullish breakout retest detection after price breaks above a recent swing high
- Bearish breakout retest detection after price breaks below a recent swing low
- Configurable calculation timeframe, default Chart
- Configurable swing left and right bars
- Configurable retest window after breakout
- ATR-based retest tolerance around the broken level
- ATR-based minimum breakout filter
- Confirmation modes: Aggressive, Balanced, and Conservative
- Trend filter, enabled by default using selectable-timeframe EMA
- Optional relative volume filter for confirmation candles
- Optional Trend MA line display when Use Trend Filter is enabled
- Historical signal markers and labels, enabled by default
- Relative volume value on signal labels when Use Volume Filter is enabled
- Optional breakout level lines
- Optional retest zone boxes
- Keep Signals mode, enabled by default
- Configurable maximum saved signal drawings
- TradingView alerts for bullish and bearish breakout retest signals

## Inputs

- Calculation Timeframe: timeframe used to calculate breakout and retest logic, default Chart
- Swing Left Bars: left-side pivot bars used for swing detection, default 5
- Swing Right Bars: right-side pivot bars used for swing detection, default 5
- Retest Window Bars: maximum number of bars after breakout to allow a retest signal, default 20
- ATR Length: ATR length used for retest tolerance and breakout filters, default 14
- Retest Tolerance ATR: tolerance around the broken level, default 0.15
- Minimum Breakout ATR: minimum breakout distance filter, default 0.10
- Confirmation Buffer ATR: extra close distance required in Conservative mode, default 0.05
- Breakout Mode: Close Break or Wick Break, default Close Break
- Confirmation Mode: signal strictness, default Balanced
- Use Trend Filter: requires bullish signals above EMA and bearish signals below EMA, enabled by default
- Trend MA Length: EMA length used by the optional trend filter, default 55
- Trend MA Timeframe: timeframe used for the trend filter EMA, default 1D
- Show Trend MA: displays the trend filter EMA when Use Trend Filter is enabled, enabled by default
- Trend MA Color: color used for the Trend MA line
- Use Volume Filter: requires confirmation candle volume to be above the relative volume threshold, enabled by default
- Volume MA Length: volume average length used for relative volume, default 21
- Minimum Relative Volume: minimum volume divided by volume average required when the volume filter is enabled, default 1.20
- Show Signal Markers: toggles directional signal markers, enabled by default
- Show Signal Labels: toggles signal labels, enabled by default
- Show Breakout Lines: draws the broken level from source swing to signal, enabled by default
- Show Retest Zones: draws the retest tolerance area, enabled by default
- Keep Signals: keeps previous signals on the chart, enabled by default
- Maximum Signals: maximum saved signal drawings, default 100

## Signal Logic

Bullish Signal:

1. A recent swing high is detected.
2. Price breaks above that swing high.
3. Price retests the broken level within the Retest Window.
4. The candle confirms back above the level according to the selected Confirmation Mode.
5. If Use Volume Filter is enabled, confirmation candle relative volume must be at or above the Minimum Relative Volume threshold.

Bearish Signal:

1. A recent swing low is detected.
2. Price breaks below that swing low.
3. Price retests the broken level within the Retest Window.
4. The candle confirms back below the level according to the selected Confirmation Mode.
5. If Use Volume Filter is enabled, confirmation candle relative volume must be at or above the Minimum Relative Volume threshold.

Confirmation Modes:

- Aggressive: retest touch and close back beyond the broken level
- Balanced: retest touch, close beyond the level, and candle direction agrees with the signal
- Conservative: Balanced conditions plus an ATR confirmation buffer and continuation beyond the previous candle

## Notes

Breakout Retest Signals [Aventra] does not place trades and does not guarantee future performance. It is intended to mark structured breakout retest conditions and should be used together with risk management, market context, and independent analysis.
