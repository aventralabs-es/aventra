Dynamic Support Resistance [Aventra] is a Pine Script v6 indicator that automatically identifies pivot-based support and resistance levels and extends them on the chart.

It is designed to help traders monitor important price areas, detect breakout and breakdown events, and create alerts when price crosses the latest dynamic support or resistance level.

## Features

- Pivot-based dynamic support and resistance levels
- Optional grouping of nearby support/resistance levels into cleaner zones
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable pivot left/right bars
- Configurable maximum visible levels or zones
- Configurable ATR-based zone tolerance for nearby levels
- Optional zone midline
- Optional support/resistance price labels
- Breakout/Breakdown signal labels
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Pivot Left Bars: number of bars to the left of a pivot point
- Pivot Right Bars: number of bars to the right of a pivot point
- Maximum Levels: maximum number of support/resistance levels or zones kept on chart
- Group Nearby Levels: combines close support/resistance levels into zones
- Zone ATR Length: ATR period used for zone grouping tolerance
- Zone Tolerance ATR: ATR multiple used to decide whether nearby levels belong to the same zone
- Show Zone Midline: toggles the midpoint line inside grouped zones
- Show Breakout Labels: toggles Breakout/Breakdown labels
- Break Label Size: controls the Breakout/Breakdown marker font size
- Show Price Labels: toggles support/resistance price labels
- Level Label Size: controls the support/resistance and zone label font size
- Resistance Color: resistance line and label color
- Support Color: support line and label color
- Line Width: support/resistance line width

## Signal Logic

BREAKOUT signal: price crosses above the latest resistance level.

BREAKDOWN signal: price crosses below the latest support level.

## Notes

Support and resistance levels are based on confirmed pivots, so they appear after the selected pivot confirmation period. This indicator is intended for visual analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
