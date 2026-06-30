Order Blocks & Breakers [Aventra] is a Pine Script v6 indicator that detects bullish and bearish order blocks after market structure breaks and optionally highlights breaker blocks when an order block is invalidated in the opposite direction.

It is designed to help traders track institutional-style reaction zones, monitor mitigation, and follow potential breaker areas directly on the chart.

## Features

- Bullish and bearish Order Block detection
- Optional Breaker Block display, disabled by default
- Configurable calculation timeframe, defaulting to the chart timeframe
- Swing-based structure break detection
- Configurable order block candle lookback
- Separate maximum limits for Order Blocks and Breaker Blocks
- Active, mitigated, and breaker block styling
- Optional labels, hidden by default
- Optional mitigation / breaker labels
- Equilibrium line, enabled by default
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Swing Length: pivot length used to define structure breaks
- Order Block Lookback: number of candles searched backward to find the order block candle
- Show Order Blocks: toggles classic bullish and bearish order block zones, enabled by default
- Show Breaker Blocks: toggles breaker conversion and breaker styling, disabled by default
- Maximum Order Blocks: maximum order block zones kept per bullish/bearish side, default 50 and up to 200
- Maximum Breaker Blocks: maximum breaker zones kept per bullish/bearish side, default 50 and up to 200
- Show Labels: toggles OB/breaker labels, hidden by default
- Show Equilibrium: toggles the equilibrium line for each visible block, enabled by default
- Keep Mitigated Blocks: keeps mitigated blocks visible up to the mitigation bar in a faded style, disabled by default
- Show Mitigation Labels: toggles mitigation and breaker labels
- Bullish Order Block Color: bullish order block color
- Bearish Order Block Color: bearish order block color
- Bullish Breaker Color: bullish breaker block color
- Bearish Breaker Color: bearish breaker block color
- Mitigated Block Color: mitigated block color
- Equilibrium Color: equilibrium line color
- Order Block Label Color: order block and breaker label background color
- Mitigation Label Color: mitigation and breaker label background color

## Signal Logic

Bullish Order Block: price closes above the latest swing high, then the indicator marks the most recent bearish candle within the lookback window.

Bearish Order Block: price closes below the latest swing low, then the indicator marks the most recent bullish candle within the lookback window.

Bullish Order Block mitigated: price trades into the bullish block equilibrium. If kept visible, the block stops at the mitigation bar.

Bearish Order Block mitigated: price trades into the bearish block equilibrium. If kept visible, the block stops at the mitigation bar.

Bullish Breaker: a bearish order block is invalidated by a close above its upper boundary.

Bearish Breaker: a bullish order block is invalidated by a close below its lower boundary.

## Notes

Order blocks and breakers are price action zones derived from structure breaks and prior candle ranges. This indicator is intended for visual market structure analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.