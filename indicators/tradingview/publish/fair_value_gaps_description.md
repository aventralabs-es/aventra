FVG & IFVG [Aventra] is a Pine Script v6 indicator that detects bullish and bearish fair value gaps, true price gaps, tracks active imbalance zones, and optionally highlights inverse fair value gaps when a gap is invalidated in the opposite direction.

It is designed to help traders identify price imbalances, monitor mitigation, and follow potential IFVG reaction zones directly on the chart.

## Features

- Bullish and bearish Fair Value Gap detection
- Bullish and bearish true price gap detection, enabled by default
- Optional Inverse Fair Value Gap display, disabled by default
- Configurable calculation timeframe, defaulting to the chart timeframe
- ATR-based minimum gap size filter
- Separate maximum visible limits for FVG, IFVG, and Price Gaps
- Active, mitigated, and inverse gap styling
- Optional gap labels, hidden by default and synced with visible gaps
- Optional mitigation / IFVG labels
- Gap midpoint line, enabled by default
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- ATR Length: ATR period used for minimum gap filtering
- Minimum Gap ATR: minimum FVG size relative to ATR
- Maximum FVG: maximum classic FVG zones kept per bullish/bearish side, default 50 and up to 200
- Maximum IFVG: maximum inverse FVG zones kept per bullish/bearish side, default 50 and up to 200
- Maximum Price Gaps: maximum true price gap zones kept per bullish/bearish side, default 50 and up to 200
- Show FVG: toggles classic Fair Value Gap zones, enabled by default
- Show Price Gaps: toggles true two-candle price gaps where current low is above previous high or current high is below previous low, disabled by default
- Show Gap Labels: toggles FVG/IFVG/price gap labels, hidden by default; labels are hidden when their gap is hidden
- Show Mitigation Labels: toggles mitigation and IFVG labels; mitigation labels require Keep Mitigated Gaps to be enabled
- Show IFVG: toggles IFVG conversion and IFVG styling, disabled by default
- Keep Mitigated Gaps: keeps mitigated gaps visible up to the mitigation bar in a faded style, disabled by default
- Show Gap Midpoint: toggles the midpoint line for each visible gap, enabled by default
- Bullish FVG Color: bullish fair value gap color
- Bearish FVG Color: bearish fair value gap color
- Bullish Price Gap Color: bullish true price gap color
- Bearish Price Gap Color: bearish true price gap color
- Bullish IFVG Color: inverse bullish fair value gap color
- Bearish IFVG Color: inverse bearish fair value gap color
- Mitigated FVG Color: mitigated gap color

## Signal Logic

Bullish price gap: current low is above the previous bar high.

Bearish price gap: current high is below the previous bar low.

Bullish FVG: current low is above the high from two bars back.

Bearish FVG: current high is below the low from two bars back.

Bullish FVG mitigated: price trades into the bullish gap midpoint. If kept visible, the gap stops at the mitigation bar.

Bearish FVG mitigated: price trades into the bearish gap midpoint. If kept visible, the gap stops at the mitigation bar.

Bullish IFVG: a bearish FVG is invalidated by a close above its upper boundary.

Bearish IFVG: a bullish FVG is invalidated by a close below its lower boundary.

## Notes

Fair value gaps are imbalance zones derived from candle structure. IFVG behavior is optional and can be disabled from the settings. FVG, IFVG, and price gap zones start at the gap bar open, which attaches the zone to the previous candle right edge. This indicator is intended for visual imbalance analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
