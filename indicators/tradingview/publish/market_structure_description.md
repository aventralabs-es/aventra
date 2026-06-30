Market Structure [Aventra] is a Pine Script v6 indicator that detects swing highs, swing lows, break of structure, and change of character directly on the chart.

It is designed to help traders follow market structure shifts, identify bullish or bearish structure breaks, and monitor the latest active swing levels.

## Features

- Swing high and swing low detection
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable swing left/right bars
- Bullish BOS and bearish BOS detection
- Bullish CHoCH and bearish CHoCH detection
- Optional swing high/low labels
- BOS/CHoCH structure labels
- Structure break lines
- Current swing high/low levels
- Separate swing high and swing low color controls
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Swing Left Bars: number of bars to the left of a swing point
- Swing Right Bars: number of bars to the right of a swing point
- Show Swing Labels: toggles SH/SL labels
- Show BOS/CHoCH Labels: toggles structure event labels
- Show Structure Lines: toggles horizontal structure break lines
- Show Current Swing Levels: toggles the latest active swing high/low levels
- Bullish Color: bullish structure color
- Bearish Color: bearish structure color
- Neutral Color: neutral color reserved for future visual states
- Swing High Color: color for SH labels and active swing high levels
- Swing Low Color: color for SL labels and active swing low levels
- Line Width: structure break line width

## Signal Logic

Bullish BOS: price closes above the latest active swing high while structure is not bearish.

Bearish BOS: price closes below the latest active swing low while structure is not bullish.

Bullish CHoCH: price closes above the latest active swing high after a bearish structure state.

Bearish CHoCH: price closes below the latest active swing low after a bullish structure state.

## Notes

Market structure levels are based on confirmed pivots, so swing points appear after the selected swing confirmation period. This indicator is intended for visual structure analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
