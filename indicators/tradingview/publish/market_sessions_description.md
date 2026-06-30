Market Sessions [Aventra] is a Pine Script v6 indicator that highlights Asia, London, and New York trading sessions with lightweight background coloring, session high / low lines, and optional labels.

It is designed to help traders separate market activity by time window, monitor session ranges, and compare liquidity behavior across major trading periods directly on the chart.

## Features

- Asia, London, and New York session background coloring
- Overlapping sessions are shown using the enabled session colors without an extra overlap color
- Configurable session timezone
- Custom session time inputs
- Session high and low tracking
- Optional session high and low price labels
- Optional centered session labels, hidden by default
- Configurable maximum visible sessions, default 50
- Lightweight background-only session display
- Editable session colors with low visual dominance
- TradingView alert conditions for session starts

## Inputs

- Session Timezone: timezone used to calculate session windows, default Europe/Paris
- Show Only Intraday: hides session boxes on daily and higher timeframes, enabled by default
- Show Asia Session: toggles Asia session display, enabled by default
- Show London Session: toggles London session display, enabled by default
- Show New York Session: toggles New York session display, enabled by default
- Asia Session: Asia session time range, default 02:00-11:00 Europe/Paris
- London Session: London session time range, default 09:00-18:00 Europe/Paris
- New York Session: New York session time range, default 14:00-23:00 Europe/Paris
- Maximum Sessions: maximum sessions kept per session type, default 50 and up to 200
- Show High / Low: toggles session high and low lines, enabled by default
- Show High / Low Labels: toggles session high and low price labels, hidden by default
- Show Session Labels: toggles centered session labels, hidden by default
- Asia Session Color: Asia session background color, default roughly 20 percent visible opacity
- London Session Color: London session background color, default roughly 20 percent visible opacity
- New York Session Color: New York session background color, default roughly 20 percent visible opacity
- High Line Color: session high line color
- Low Line Color: session low line color
- Label Color: session label background color

## Signal Logic

Asia Session Started: triggers when price enters the configured Asia session window.

London Session Started: triggers when price enters the configured London session window.

New York Session Started: triggers when price enters the configured New York session window.

Session High / Low: updates during the active session and stops when the session ends.

Overlap Background: shown by applying the enabled session colors on the same bar, without adding a separate overlap color.

## Notes

Session windows are calculated from the selected Session Timezone. The default sessions use Spain / Central European summer-time style ranges through Europe/Paris, not short kill zone windows, so adjust the timezone or session windows to match your market and workflow. This indicator is intended for visual session analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.


