Version 1.3.8

- Fixed FVG, IFVG, and Price Gap start times on lower-timeframe charts by drawing from the source gap bar time
Version 1.3.7

- Set the default Midpoint Color transparency to 80, which equals roughly 20 percent visible opacity

Version 1.3.6

- Set the default Midpoint Color opacity to 20 while keeping it editable from the color input

Version 1.3.5

- Midpoint opacity now comes from the Midpoint Color input instead of being forced in code

Version 1.3.4

- Gap fill opacity now comes from the color inputs instead of being forced in code
- Mitigated FVG Color opacity changes now apply correctly on chart

Version 1.3.3

- Removed visible borders from FVG, IFVG, and Price Gap boxes for a cleaner chart view

Version 1.3.2

- Reduced default gap zone fill opacity so FVG, IFVG, and Price Gap zones are less visually dominant

Version 1.3.1

- Set the default Maximum Price Gaps value to 50 so FVG, IFVG, and Price Gap limits share the same default

Version 1.3.0

- Replaced the single Maximum Gaps input with separate Maximum FVG, Maximum IFVG, and Maximum Price Gaps inputs
- Added internal gap type tracking so FVG, IFVG, and true price gap limits are managed independently
- IFVG conversions now count against the IFVG limit instead of the original FVG or price gap bucket

Version 1.2.8

- Show Price Gaps is now disabled by default
- Added separate bullish and bearish price gap color inputs
- Price gap zones now use their own colors instead of FVG colors

Version 1.2.7

- Reordered Show FVG and Show IFVG inputs so they appear together
- Reduced gap midpoint opacity for a softer visual appearance
- Clarified Show Price Gaps as true two-candle price gaps in the publish description

Version 1.2.6

- Added Show FVG input, enabled by default
- Classic FVG detection can now be controlled separately from true price gaps
- Gap midpoint lines are now drawn with full opacity and dashed styling for better visibility

Version 1.2.5

- Active unmitigated FVG, IFVG, and price gap zones now draw only up to the current candle instead of extending into future bars

Version 1.2.4

- Classic FVG boxes and midpoint lines now start from the related impulse candle instead of the confirmation candle
- True price gaps still start from the actual gap bar

Version 1.2.3

- Gap boxes, IFVG zones, and midpoint lines now start at the gap bar open, attaching them to the previous candle's right edge without a visual delay

Version 1.2.2

- Mitigated gap boxes and midpoint lines now end at the mitigation candle's left edge using the bar open time

Version 1.2.1

- Gap boxes, IFVG zones, and midpoint lines now start at the signal bar close using time-based coordinates, so they appear attached to the candle's right edge

Version 1.2.0

- Mitigation now uses the gap midpoint instead of the far boundary
- FVG, IFVG, price gap boxes, and midpoint lines now start from the right side of the signal bar
- Kept mitigated gaps still stop at the mitigation bar

Version 1.1.0

- Added bullish and bearish true price gap detection
- Added Show Price Gaps input, enabled by default
- Consecutive valid FVG and price gap candles can now be marked instead of suppressing follow-up imbalance candles
- Added TradingView alert conditions for bullish and bearish price gaps
- Kept FVG and IFVG naming consistent with searchable marketplace terms

Initial release baseline included:

- Bullish and bearish Fair Value Gap detection
- Optional Inverse Fair Value Gap display, disabled by default
- Chart-default calculation timeframe input
- ATR-based minimum gap size filter
- Configurable maximum visible gaps, default 50 and maximum 200
- Active, mitigated, and inverse gap styling
- Optional gap labels, hidden by default and synced with visible gaps
- Gap midpoint lines, enabled by default
- Optional mitigation and IFVG labels