Version 2.5.0

- Added ATR Length and Sweep Tolerance ATR inputs
- Sweep detection now supports equal or near-equal liquidity sweeps using a small ATR-based tolerance
- This helps catch cases where price tests a prior swing high or low without breaking it by an exact tick

Version 2.4.1

- Set Bullish Sweep Color and Bearish Sweep Color defaults to 30% opacity
- Set Show Sweep Labels default to disabled to reduce chart clutter

Version 2.4.0

- Removed Show Active Liquidity Levels input
- Removed active buy-side and sell-side reference colors and related drawing logic
- Simplified the indicator around sweep markers, sweep lines, and sweep labels

Version 2.3.0

- Removed Consume Level On input to simplify behavior
- Liquidity levels are now always consumed on the first wick touch
- This keeps sweep lines from continuing after a level has already been touched

Version 2.2.1

- Changed Consume Level On default to First Wick Touch
- Lines now stop at the first wick touch by default to avoid showing liquidity lines after the level has been swept or touched
- First Valid Sweep remains available for users who want less aggressive level consumption

Version 2.2.0

- Added Consume Level On input with First Valid Sweep and First Wick Touch modes
- Default consume behavior is now First Valid Sweep to avoid missing later valid sweeps after minor wick touches
- First Wick Touch remains available for stricter one-touch liquidity consumption

Version 2.1.2

- Fixed sweep lines being redrawn after a liquidity level had already been touched by a wick
- Liquidity levels are now considered consumed after the first wick touch, independent of the selected Sweep Detection mode
- This prevents later bars from extending or recreating lines for already-touched levels

Version 2.1.1

- Fixed repeated sweep drawings after a liquidity level had already been swept
- Sweep lines now stop at the first sweep bar for that level instead of being redrawn on later bars
- Reduced unnecessary line and label creation caused by already-swept levels

Version 2.1.0

- Changed detection from single lookback high / low to scanning local swing highs and swing lows inside Lookback Bars
- Sweep markers now search multiple historical swing liquidity levels on every bar
- This version is designed to show more practical sweep events on real charts

Version 2.0.0

- Rebuilt the indicator with a direct lookback high / low liquidity sweep model
- Added Lookback Bars input, default 300
- Set Sweep Detection default to Wick Only
- Set Keep Sweeps default to enabled
- Set Maximum Sweeps default to 100
- Disabled active liquidity reference lines by default to reduce chart clutter
Version 1.5.0

- Reworked detection to track multiple active swing high and swing low liquidity levels instead of only the latest lookback high / low
- Added Sweep Detection input with Wick Touch, Close Back, and Wick Only modes
- Restored Maximum Active Levels so older unswept liquidity pools can remain valid sweep targets
- Historical sweep markers now reflect sweeps against all tracked active liquidity levels

Version 1.4.0

- Added Show Sweep Markers, enabled by default
- Historical sweep events are now plotted with lightweight markers so they remain visible even when Keep Sweeps is disabled
- Sweep lines and labels remain optional drawing objects, while markers provide the full historical scanner view

Version 1.3.1

- Fixed an early-chart runtime error caused by negative historical offsets in active liquidity time references
- Added first-bar protection before reading lookback liquidity timestamps

Version 1.3.0

- Reworked active liquidity detection to use the previous Swing Length high and low instead of waiting for confirmed pivots
- Active buy-side and sell-side liquidity levels now stay visible even on symbols/timeframes with few confirmed pivots
- Sweep detection now checks the current candle against the active lookback liquidity levels
- Improved reliability on higher timeframes and large Swing Length values

Version 1.2.0

- Reworked sweep detection to track multiple active liquidity levels instead of only the latest buy-side and sell-side level
- Added Maximum Active Levels input, default 20
- Active liquidity lines now remain visible for all tracked unswept levels
- Sweeps can now be detected against older active swing and equal liquidity levels

Version 1.1.0

- Added Show Active Liquidity Levels input, enabled by default
- Added active buy-side and sell-side liquidity reference lines and labels
- Active liquidity references are hidden after that side is swept

Version 1.0.0

Initial release.

- Added bullish and bearish liquidity sweep detection
- Added equal high and equal low sweep classification
- Added ATR-based equal level tolerance
- Added optional sweep lines and labels
- Added Keep Sweeps input, disabled by default
- Added Maximum Sweeps input, default 50
- Added TradingView alert conditions for bullish and bearish sweeps

























