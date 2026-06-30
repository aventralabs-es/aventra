Version 1.1.3

- Enabled Show Session Labels by default
- Added an optional intraday warning when sessions are hidden on non-intraday charts

Version 1.1.2

- Added Show High / Low Labels input, disabled by default
- Added optional price labels for each session high and low line
- High / Low labels are cleaned up together with the maximum session limit

Version 1.1.1

- Removed the separate overlap color input to keep session coloring simple
- Overlap areas now use the enabled Asia, London, and New York session colors directly

Version 1.1.0

- Centered session labels across the visible session range when Show Session Labels is enabled
- Improved default high and low line visibility on both light and dark charts

Version 1.0.9

- Updated default Session Timezone to Europe/Paris for Spain/Central Europe usage
- Updated default full session ranges to Asia 02:00-11:00, London 09:00-18:00, and New York 14:00-23:00
- Added Europe/Madrid to the timezone options

Version 1.0.8

- Updated default Asia, London, and New York inputs from kill zone windows to full session ranges
- Default session ranges are now Asia 00:00-09:00 UTC, London 08:00-17:00 UTC, and New York 13:00-22:00 UTC

Version 1.0.7

- Removed Session Mode to keep the indicator focused on actual Asia, London, and New York session windows
- Removed Trading Day Split inputs to reduce confusion

Version 1.0.5

- Replaced multiple background color calls with one active session color selector so Asia, London, and New York colors do not override each other unpredictably

Version 1.0.4

- Set default Asia, London, and New York background colors to roughly 20 percent visible opacity
- Applied background coloring with separate session calls so each enabled session can render independently

Version 1.0.3

- Simplified session visualization to background coloring only
- Removed visible session box fills so candles are not covered

Version 1.0.1

- Added Show Only Intraday input, enabled by default
- Session boxes are now hidden on daily and higher timeframes by default to prevent full-chart color overlays

Initial release.

- Added Asia, London, and New York session boxes
- Added configurable session timezone
- Added custom session time inputs
- Added session high and low tracking
- Added optional session labels, hidden by default
- Added configurable maximum visible sessions, default 50
- Added lightweight borderless boxes using Aventra visual defaults
- Added TradingView alert conditions for session start events





