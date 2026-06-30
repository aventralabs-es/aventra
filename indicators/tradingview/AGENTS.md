# TradingView Guidance

## Pine Script Standard

- Use Pine Script v6.
- Use `indicator("Name [Aventra]", shorttitle="Name [Aventra]", ...)`.
- Keep public strings in English.
- Keep defaults aligned across indicators unless the user asks otherwise.
- Use `Calculation Timeframe` with default Chart when the indicator supports multi-timeframe calculation.
- Ask or preserve the requested timeframe behavior when a period/timeframe input is involved.

## Visual Defaults

- Prefer low visual intensity by default.
- Keep label opacity around 50 when labels need visible color.
- Keep boxes/fills subtle, usually high transparency.
- Avoid box borders unless explicitly requested.
- Separate marker styles for different signal types when one indicator produces multiple signal families.
- When drawing FVG, IFVG, zones, or similar ranges, start and end drawings at the relevant bar boundaries consistently across Aventra indicators.

## Publishing Standard

- Every public indicator should have:
  - `indicators/tradingview/publish/<indicator>_description.md`
  - `indicators/tradingview/publish/<indicator>_release_notes.md`
- Description should explain purpose, features, inputs, signal logic, and notes.
- Release notes should be versioned with the latest version at the top.
- Avoid direct financial advice language.
- Avoid TradingView publish text that sounds like guaranteed profit, buy/sell instruction, or external solicitation.

## Preferred Defaults

- Volume MA: 21 when a volume filter is used.
- Trend MA: 55 when a trend filter is used.
- Trend MA default color: `color.new(color.rgb(33, 150, 243), 30)`.
- Signal label text color should usually follow the selected bullish/bearish signal color.
- Use `Maximum ...` inputs for display object counts, not historical lookback, unless explicitly named as lookback.
