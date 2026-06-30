Version 1.6.5

- Changed Use HTF FVG Source default to disabled
- Changed Show HTF FVG default to disabled
Version 1.6.4

- Changed Show Signal Labels default to enabled so Turtle Soup signal text is visible by default
Version 1.6.3

- Aligned MSS structure confirmation with the selected Swing Calculation Timeframe instead of always using the chart timeframe
- Changed same-bar double sweep resolution to prefer the side with the larger liquidity sweep distance
- Added final bullish/bearish signal conflict resolution so only one direction can print on ambiguous bars
Version 1.6.2

- Added sweep direction conflict resolution so a bar that sweeps both sides only opens one setup direction
- Prevented MSS confirmation from using structure levels that were already broken on the sweep bar
- Required MSS confirmation to occur after the sweep setup bar instead of on the same bar
Version 1.6.1

- Fixed stale setup state so an old bullish or bearish setup cannot trigger much later after an opposite sweep appears
- Limited final Reaction FVG entry signals to the Reaction FVG Window after the confirming FVG is created
- Moved signal markers and labels to the actual signal bar instead of older setup timestamps
Version 1.6.0

- Added Signal Confirmation modes so the main signal can require the full sequence: liquidity sweep, MSS confirmation, and Reaction FVG entry
- Changed the default confirmation flow to Sweep + MSS + FVG Entry for higher-quality Turtle Soup signals
- Reaction FVG detection now waits for MSS confirmation before creating the final entry setup
Version 1.5.19

- Added Signal Mode with Aggressive, Balanced, and Conservative options
- Added Minimum Sweep ATR and Signal Cooldown Bars filters to reduce noisy repeated Turtle Soup signals
- Tightened Balanced and Conservative HTF FVG reaction rules so FVG touches require deeper reaction and stronger close confirmation
Version 1.5.18

- Fixed Reaction FVG label sync so label text keeps 50% opacity after chart updates
Version 1.5.17

- Changed HTF FVG and Reaction FVG label text opacity to 50% by default while keeping label backgrounds transparent
Version 1.5.16

- Removed TS text from signal markers so markers act as clean directional triangles while signal labels carry the full Turtle Soup text
Version 1.5.15

- Changed signal labels to always show Bullish Turtle Soup or Bearish Turtle Soup, regardless of whether the signal came from a swing sweep or HTF FVG reaction
Version 1.5.14

- Changed default Bullish Signal Color and Bearish Signal Color opacity to 50%
- Matched signal label text color to the selected bullish or bearish signal color while keeping the label background transparent
Version 1.5.13

- Removed the Label Color input and made label backgrounds transparent while keeping label text visibility controls
Version 1.5.12

- Changed default Bullish MSS Color and Bearish MSS Color opacity to 50%
Version 1.5.11

- Removed MSS label background fill and kept MSS label text colored by bullish or bearish MSS direction
Version 1.5.10

- Changed MSS labels so the text color matches the bullish or bearish MSS color while the label background keeps the shared Label Color
Version 1.5.9

- Matched MSS label background colors with the bullish and bearish MSS marker/line colors
Version 1.5.8

- Added ATR-based Signal Label Offset and MSS Label Offset inputs to reduce label overlap when signals and MSS appear near the same level
Version 1.5.7

- Fixed HTF FVG box and midpoint start times on lower-timeframe charts by using the source timeframe FVG bar time
Version 1.5.6

- Changed default Maximum Signals, Maximum HTF FVG, Maximum Reaction FVG, and Maximum MSS to 55, 55, 1, and 55
- Aligned FVG midpoint lines with FVG & IFVG [Aventra] using dashed style and the same default midpoint color
Version 1.5.5

- Changed default Swing Calculation Timeframe to 4H
- Changed default Lookback Bars to 50
- Changed default Maximum Signals, Maximum HTF FVG, Maximum Reaction FVG, and Maximum MSS to 20
- Changed all default input color opacity values to 10%
Version 1.5.4

- Fixed signal marker placement when Swing Calculation Timeframe is higher than the chart timeframe
- Signal markers now use the same signal time and level as signal labels instead of chart-bar plotshape placement
Version 1.5.3

- Fixed Reaction FVG detection when Reaction FVG Timeframe matches the chart timeframe by using direct chart FVG events instead of same-timeframe request.security values
Version 1.5.2

- Fixed Reaction FVG creation when no previous Reaction FVG existed by allowing the first bullish or bearish reaction timestamp through the duplicate filter
Version 1.5.1

- Fixed Reaction FVG filtering by comparing the FVG confirmation time instead of the box start time
- Split bullish and bearish Reaction FVG duplicate tracking so opposite-direction FVGs do not block each other
Version 1.5.0

- Added FVG midpoint lines for HTF and Reaction FVG boxes
- Added FVG labels using the selected timeframe name, such as 4H FVG or 15m FVG
- Added optional MSS detection with line and label drawings after Turtle Soup signals
- Added inputs for Show FVG Midpoint, Show FVG Labels, Show MSS, Maximum MSS, and MSS colors

Version 1.4.4

- Fixed HTF FVG display start-time wiring after the direct FVG & IFVG display-flow refactor

Version 1.4.3

- Changed HTF FVG box creation to match FVG & IFVG [Aventra] more directly: raw event plus gap-size filter creates a box at chart time[1]
- Removed duplicate-time gating from HTF FVG box creation so display behavior matches the standalone FVG indicator
- Kept HTF FVG source logic separate from HTF FVG display logic

Version 1.4.2

- Added Keep Mitigated HTF FVG input, enabled by default
- Added Mitigated HTF FVG Color input
- Mitigated HTF FVG boxes now explicitly remain visible unless Keep Mitigated HTF FVG is disabled

Version 1.4.1

- Reworked HTF FVG box creation to mirror FVG & IFVG [Aventra]: raw FVG event, selected source top/bottom, and chart time[1] box start
- Added timeframe seconds matching so a 4H chart with 4H FVG Timeframe uses direct chart events
- Changed Maximum HTF FVG default to 100 to match the common FVG display setup

Version 1.4.0

- Aligned HTF FVG detection with FVG & IFVG [Aventra] logic
- Added Minimum FVG ATR input, default 0.10
- HTF FVG boxes now start from time[1], matching FVG & IFVG [Aventra]
- HTF and Reaction FVG mitigation now use gap midpoint checks
- Reaction FVG detection now uses the same minimum ATR gap filter

Version 1.3.3

- Changed Show Sweep Lines default back to enabled

Version 1.3.2

- Fixed same-timeframe FVG drawing by using direct chart FVG events when FVG Timeframe matches the chart timeframe
- Increased default HTF FVG visibility to 30% opacity
- Mitigated HTF FVG boxes are still kept from formation until the mitigation bar

Version 1.3.1

- Changed the default FVG Timeframe to 4H
- Reworked HTF FVG box creation to use actual FVG formation events instead of only the latest carried FVG value
- Increased default HTF FVG box visibility slightly while keeping boxes low-distraction
- HTF FVG box colors now update when visibility or color inputs are changed

Version 1.3.0

- Added visible HTF FVG source boxes with separate colors
- HTF FVG boxes now extend to the current bar while unmitigated and stop on the mitigation bar
- Added Maximum HTF FVG input, default 50
- Changed Show Sweep Lines default to disabled to keep the chart cleaner
- HTF FVG reaction signals now require the source FVG to still be active

Version 1.2.3

- Renamed Calculation Timeframe input label to Swing Calculation Timeframe for clearer source separation

Version 1.2.2

- Reaction FVG boxes now extend to the current bar while unmitigated
- Reaction FVG boxes stop on the mitigation bar once mitigated
- Newly created reaction FVG boxes are synced immediately on the signal bar

Version 1.2.1

- Fixed Reaction FVG detection on lower timeframes by carrying the latest LTF FVG through request.security
- Reaction FVG boxes can now appear even when the FVG formed inside the chart bar and was not the final lower-timeframe candle

Version 1.2.0

- Added Reaction FVG Timeframe input, default 15 minutes
- Reaction FVG confirmation now scans the selected lower timeframe instead of only the chart timeframe
- Reaction FVG boxes start from the selected timeframe FVG creation time and continue until mitigation

Version 1.1.1

- HTF FVG source signal labels now show Bullish HTF FVG or Bearish HTF FVG
- Reaction FVG boxes now extend until mitigation instead of stopping on the creation bar
- Added internal tracking for reaction FVG mitigation state

Version 1.1.0

- Added Use Swing Sweep Source input, enabled by default
- Added Use HTF FVG Source input, enabled by default
- Added FVG Timeframe input, default 1D
- Added higher-timeframe FVG rejection signals
- Added Show Reaction FVG and Reaction FVG Window inputs
- Added reaction FVG boxes after bullish or bearish Turtle Soup signals
- Added maximum saved reaction FVG setting and reaction FVG alerts

Version 1.0.0

Initial release.

- Added bullish and bearish Turtle Soup false breakout detection
- Added configurable calculation timeframe, default Chart
- Added Swing Length and Lookback Bars inputs
- Added ATR Length and Sweep Tolerance ATR inputs
- Added optional signal markers, sweep lines, and signal labels
- Added Keep Signals and Maximum Signals inputs
- Added TradingView alert conditions for bullish and bearish signals






















