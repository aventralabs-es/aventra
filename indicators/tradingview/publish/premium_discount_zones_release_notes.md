Version 1.4.0

- Removed Show Historical Ranges and all historical range rendering
- The indicator now keeps only the active dealing range to prevent overlap and chart clutter
- Reduced object limits because historical objects are no longer used

Version 1.3.2

- Adjusted historical range boundaries so each completed range ends just before the next range starts
- Historical ranges no longer share the exact same time boundary with the following range

Version 1.3.1

- Reduced historical equilibrium and range boundary line visibility to further lower visual clutter
- Added label visibility synchronization so historical labels are hidden whenever Show Historical Labels is disabled

Version 1.3.0

- Changed historical range rendering to non-overlapping time segments
- Historical ranges now close when a new range starts instead of extending into the next range
- Active-only mode still draws the current range from its source high / low start time

Version 1.2.2

- Changed default Equilibrium Color from white to amber for better visibility on both light and dark chart themes

Version 1.2.1

- Fixed Show Equilibrium and Show Range High / Low so they also control historical range lines
- Historical fade now respects line visibility toggles instead of forcing hidden lines to remain visible

Version 1.2.0

- Added Fade Historical Ranges input, enabled by default
- Added Show Historical Labels input, disabled by default
- Historical ranges now become visually lighter when archived
- Historical labels are hidden by default to reduce clutter when Show Historical Ranges is enabled

Version 1.1.1

- Fixed Lookback High / Low mode when TradingView returns negative highestbars or lowestbars offsets
- Converted lookback offsets to safe positive bars-back references before reading range timestamps

Version 1.1.0

- Added Range Mode input with Lookback High / Low and Latest Swings options
- Set default range mode to Lookback High / Low for a broader active dealing range
- Added Lookback Bars input, default 100

Version 1.0.2

- Added Show Historical Ranges input, disabled by default
- Default display now keeps only the active dealing range to reduce chart clutter
- Maximum Ranges now applies when historical ranges are enabled

Version 1.0.1

- Fixed initial range creation when the script loads with no active stored range yet

Version 1.0.0

Initial release.

- Added automatic premium and discount zones from confirmed swing high / low ranges
- Added equilibrium midpoint line
- Added optional range high and low lines
- Added optional labels for Premium, Discount, and Equilibrium
- Added configurable calculation timeframe, swing length, and maximum ranges
- Added TradingView alert conditions for new range, premium entry, discount entry, and equilibrium touch






















