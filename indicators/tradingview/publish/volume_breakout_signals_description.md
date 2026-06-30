Volume Breakout Signals [Aventra] is a Pine Script v6 indicator that detects bullish and bearish structure breakouts confirmed by relative volume.

The indicator is designed for traders who want to identify price breakouts that occur with stronger-than-average volume instead of marking every ordinary level break.

## Features

- Bullish volume breakout detection above recent swing highs
- Bearish volume breakout detection below recent swing lows
- Configurable calculation timeframe, default Chart
- Configurable swing left and right bars
- Close Break and Wick Break breakout modes
- Bullish-only, bearish-only, or both-direction signal mode
- ATR-based minimum breakout filter
- Relative volume confirmation using volume divided by volume average
- Volume MA Length input, default 21
- Minimum Relative Volume input, default 1.50
- Trend filter using selectable-timeframe EMA, enabled by default
- Trend MA Timeframe input, default 1D
- Optional Trend MA line display when Use Trend Filter is enabled
- Historical signal markers and labels, enabled by default
- Relative volume value on signal labels
- Optional breakout level lines
- TradingView alerts for bullish and bearish volume breakout signals

## Inputs

- Calculation Timeframe: timeframe used to calculate swing levels and breakout signals, default Chart
- Swing Left Bars: left-side pivot bars used for swing detection, default 5
- Swing Right Bars: right-side pivot bars used for swing detection, default 5
- Breakout Mode: Close Break or Wick Break, default Close Break
- Signal Direction: Both, Bullish Only, or Bearish Only, default Both
- ATR Length: ATR length used for minimum breakout filtering, default 14
- Minimum Breakout ATR: minimum breakout distance measured by ATR, default 0.10
- Volume MA Length: volume average length used for relative volume, default 21
- Minimum Relative Volume: minimum volume divided by volume average required for signals, default 1.50
- Use Trend Filter: requires bullish signals above EMA and bearish signals below EMA, enabled by default
- Trend MA Length: EMA length used by the optional trend filter, default 55
- Trend MA Timeframe: timeframe used for the trend filter EMA, default 1D
- Show Trend MA: displays the trend filter EMA when Use Trend Filter is enabled, enabled by default
- Trend MA Color: color used for the Trend MA line
- Show Signal Markers: toggles directional signal markers, enabled by default
- Show Signal Labels: toggles signal labels, enabled by default
- Show Breakout Lines: draws the broken level from source swing to signal, enabled by default
- Keep Signals: keeps previous signals on the chart, enabled by default
- Maximum Signals: maximum saved signal drawings, default 100

## Signal Logic

Bullish Signal:

1. A recent swing high is detected.
2. Price breaks above that swing high using the selected Breakout Mode.
3. Breakout distance meets the Minimum Breakout ATR filter.
4. Relative volume is at or above the Minimum Relative Volume threshold.
5. If Use Trend Filter is enabled, price must be above the Trend MA.

Bearish Signal:

1. A recent swing low is detected.
2. Price breaks below that swing low using the selected Breakout Mode.
3. Breakout distance meets the Minimum Breakout ATR filter.
4. Relative volume is at or above the Minimum Relative Volume threshold.
5. If Use Trend Filter is enabled, price must be below the Trend MA.

## Notes

Volume Breakout Signals [Aventra] does not place trades and does not guarantee future performance. It is intended to highlight structure breaks with elevated volume and should be used together with market context, risk management, and independent analysis.
