Dynamic Support Resistance [Aventra] is a Pine Script v6 indicator that automatically identifies pivot-based support and resistance levels and extends them on the chart.

It is designed to help traders monitor important price areas, detect breakout and breakdown events, and create alerts when price crosses the latest dynamic support or resistance level.

## Features

- Pivot-based dynamic support and resistance levels
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable pivot left/right bars
- Configurable maximum visible levels
- Optional support/resistance price labels
- BREAKOUT/BREAKDOWN signal labels
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Pivot Left Bars: number of bars to the left of a pivot point
- Pivot Right Bars: number of bars to the right of a pivot point
- Maximum Levels: maximum number of support and resistance levels kept on chart
- Show Breakout Labels: toggles BREAKOUT/BREAKDOWN labels
- Show Price Labels: toggles support/resistance price labels
- Resistance Color: resistance line and label color
- Support Color: support line and label color
- Line Width: support/resistance line width

## Signal Logic

BREAKOUT signal: price crosses above the latest resistance level.

BREAKDOWN signal: price crosses below the latest support level.

## Notes

Support and resistance levels are based on confirmed pivots, so they appear after the selected pivot confirmation period. This indicator is intended for visual analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
