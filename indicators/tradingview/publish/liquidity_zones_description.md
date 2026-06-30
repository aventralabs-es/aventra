Liquidity Zones [Aventra] is a Pine Script v6 indicator that detects equal high and equal low liquidity areas using confirmed pivots, then visualizes those areas as active liquidity zones on the chart.

It is designed to help traders identify buy-side liquidity above equal highs, sell-side liquidity below equal lows, and sweep events where price runs liquidity and closes back inside the zone area.

## Features

- Equal high and equal low liquidity zone detection
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable pivot left/right bars
- ATR-based equal level tolerance
- ATR-based zone padding
- Configurable maximum visible zones
- Optional zone labels
- Buy-side and sell-side sweep labels
- Active and swept zone styling
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Pivot Left Bars: number of bars to the left of a pivot point
- Pivot Right Bars: number of bars to the right of a pivot point
- ATR Length: ATR period used for tolerance and zone padding
- Equal Level Tolerance ATR: maximum distance between pivots to qualify as equal highs/lows
- Zone Padding ATR: extra padding added around each liquidity zone
- Maximum Zones: maximum number of buy-side and sell-side zones kept on chart
- Show Zone Labels: toggles liquidity zone labels
- Show Sweep Labels: toggles sweep event labels
- Keep Swept Zones: keeps swept zones visible in a faded style
- Buy-Side Liquidity Color: color for liquidity above equal highs
- Sell-Side Liquidity Color: color for liquidity below equal lows
- Swept Zone Color: color used after liquidity is swept

## Signal Logic

Buy-side liquidity zone: two confirmed pivot highs are close enough to be considered equal highs.

Sell-side liquidity zone: two confirmed pivot lows are close enough to be considered equal lows.

Buy-side sweep: price trades above a buy-side liquidity zone and closes back below the zone top.

Sell-side sweep: price trades below a sell-side liquidity zone and closes back above the zone bottom.

## Notes

Liquidity zones are based on confirmed pivots, so zones appear after the selected pivot confirmation period. This indicator is intended for visual liquidity analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
