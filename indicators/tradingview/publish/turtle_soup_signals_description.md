Turtle Soup Signals [Aventra] is a Pine Script v6 indicator for identifying Turtle Soup style false breakout signals around prior swing highs, swing lows, and optional higher-timeframe FVG rejection areas.

The indicator is designed for traders who watch liquidity raids, failed breakouts, FVG reactions, and reversal setups after price briefly trades beyond a previous level or rejects from a higher-timeframe imbalance.

## Features

- Bullish Turtle Soup detection below prior swing lows
- Bearish Turtle Soup detection above prior swing highs
- Optional higher-timeframe FVG source, disabled by default
- Higher-timeframe FVG boxes, midpoint lines, and timeframe labels, extended until mitigation and disabled by default
- FVG Timeframe input, default 4H
- Swing sweep source and HTF FVG source can both be checked at the same time
- Configurable swing calculation timeframe, default 4H
- Configurable swing length
- Configurable lookback bars, default 50
- ATR-based sweep tolerance for equal or near-equal false breakouts
- FVG detection aligned with FVG & IFVG [Aventra], including minimum ATR gap filtering and midpoint mitigation
- Historical signal markers, enabled by default
- Optional sweep lines from the original level to the signal bar, enabled by default
- Optional signal labels, enabled by default
- Reaction FVG boxes after a signal, with midpoint lines and timeframe labels, extended until mitigation and enabled by default
- Reaction FVG Timeframe input, default 15 minutes
- Optional MSS line and label drawings after Turtle Soup signals, enabled by default
- Keep Signals mode, enabled by default
- Configurable maximum saved signal, HTF FVG, and reaction FVG drawings
- TradingView alerts for bullish and bearish Turtle Soup signals and reaction FVGs

## Inputs

- Swing Calculation Timeframe: timeframe used to calculate swing-based Turtle Soup levels, default 4H
- Use Swing Sweep Source: enables classic swing high / low Turtle Soup logic, enabled by default
- Use HTF FVG Source: enables higher-timeframe FVG rejection signals, disabled by default
- FVG Timeframe: timeframe used for FVG context, default 4H
- Swing Length: pivot length used to identify prior swing highs and lows, default 5
- Lookback Bars: number of previous bars used to scan swing levels, default 50
- ATR Length: ATR length used for sweep tolerance, default 14
- Sweep Tolerance ATR: tolerance multiplier for equal or near-equal false breakouts, default 0.05
- Minimum FVG ATR: minimum FVG size filter using ATR, default 0.10
- Show Signal Markers: toggles historical TS markers, enabled by default
- Show Sweep Lines: toggles level-to-signal lines, enabled by default
- Show Signal Labels: toggles signal labels, enabled by default
- Show HTF FVG: displays the higher-timeframe FVG source zones and extends them until mitigation, disabled by default
- Keep Mitigated HTF FVG: keeps mitigated HTF FVG boxes visible from formation until mitigation, enabled by default
- Show FVG Midpoint: toggles midpoint lines for HTF and Reaction FVG boxes, enabled by default
- Show FVG Labels: toggles timeframe-based FVG labels, enabled by default
- Show Reaction FVG: displays newly formed FVGs after a Turtle Soup signal and extends them until mitigation, enabled by default
- Reaction FVG Timeframe: lower timeframe used to search for impulse FVG confirmation after a signal, default 15
- Reaction FVG Window: maximum number of bars after a signal to search for a new reaction FVG, default 10
- Show MSS: toggles Market Structure Shift lines and labels after Turtle Soup signals, enabled by default
- Keep Signals: keeps previous signal drawings on the chart, enabled by default
- Maximum Signals: maximum saved signal drawings, default 55
- Maximum HTF FVG: maximum saved higher-timeframe FVG boxes, default 55
- Maximum Reaction FVG: maximum saved reaction FVG boxes, default 1
- Maximum MSS: maximum saved MSS drawings, default 55
- Bullish Signal Color: bullish signal color, default 10% opacity
- Bearish Signal Color: bearish signal color, default 10% opacity
- Bullish HTF FVG Color: bullish higher-timeframe FVG box color
- Bearish HTF FVG Color: bearish higher-timeframe FVG box color
- Mitigated HTF FVG Color: mitigated higher-timeframe FVG box color
- Bullish Reaction FVG Color: bullish reaction FVG box color
- Bearish Reaction FVG Color: bearish reaction FVG box color
- FVG Midpoint Color: midpoint line color for HTF and Reaction FVG boxes, aligned with FVG & IFVG [Aventra]
- Bullish MSS Color: bullish MSS line color
- Bearish MSS Color: bearish MSS line color
- Label Color: signal, FVG, and MSS label background color

## Signal Logic

Bullish Swing Turtle Soup: price trades below a prior local swing low and closes back above that level.

Bearish Swing Turtle Soup: price trades above a prior local swing high and closes back below that level.

Bullish HTF FVG Reaction: price trades into an active bullish higher-timeframe FVG and closes back above the FVG top.

Bearish HTF FVG Reaction: price trades into an active bearish higher-timeframe FVG and closes back below the FVG bottom.

HTF FVG boxes: source FVG zones use the same three-candle detection and direct box creation flow as FVG & IFVG [Aventra]. Bullish FVG requires current low above high[2], bearish FVG requires current high below low[2], the box starts from chart time[1] when the raw FVG event is received, minimum size is filtered by Minimum FVG ATR, active boxes extend to the current bar, and mitigation is checked at the gap midpoint.

Reaction FVG: after a bullish or bearish signal, the indicator watches for the latest newly formed same-direction FVG on the selected Reaction FVG Timeframe using the same FVG & IFVG [Aventra] detection rules, draws it as a box when it forms after the signal, extends unmitigated boxes to the current bar, and stops the box when midpoint mitigation occurs. HTF and Reaction FVG labels use the selected timeframe name, for example 4H FVG or 15m FVG.

MSS: after a bullish Turtle Soup signal, the indicator watches for price to close above the latest confirmed pivot high. After a bearish Turtle Soup signal, it watches for price to close below the latest confirmed pivot low. When this happens, an MSS line and label are drawn if Show MSS is enabled.

## Notes

The FVG source is an extended SMC-style context for Turtle Soup style reversal workflows, not the original classic Turtle Soup rule by itself. This indicator does not place orders, calculate position sizing, or guarantee reversals. Use it together with market structure, volatility, session context, and risk management.













