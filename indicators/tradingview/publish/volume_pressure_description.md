Volume Pressure [Aventra] is a Pine Script v6 lower-panel indicator that estimates bullish and bearish volume pressure using candle direction, close location, volume, and relative volume.

It is designed to help traders see whether price movement is supported by stronger bullish participation, bearish participation, or abnormal relative volume activity.

## Features

- Lower-panel volume pressure histogram
- Configurable calculation timeframe, defaulting to the chart timeframe
- Candle-location based bullish/bearish pressure estimate
- Volume moving average
- Relative volume calculation
- Relative volume spike detection
- Smoothed pressure line
- Optional relative volume line, hidden by default
- Optional compact bullish and bearish pressure labels, hidden by default
- Compact bullish and bearish volume spike markers
- TradingView alert conditions

## Inputs

- Calculation Timeframe: empty by default, which means chart timeframe
- Volume MA Length: moving average period used for relative volume
- Pressure Smoothing: EMA smoothing period for pressure
- Relative Volume Spike Threshold: relative volume level required for spike detection, default 1.8
- Pressure Signal Threshold: pressure level required for bullish/bearish pressure signals, default 30
- Show Smoothed Pressure Line: toggles the smoothed pressure line
- Show Relative Volume: toggles the relative volume line, hidden by default
- Show Volume Spike Markers: toggles bullish/bearish volume spike markers
- Show Pressure Signal Labels: toggles compact BULL/BEAR labels, hidden by default
- Bullish Pressure Color: bullish pressure color
- Bearish Pressure Color: bearish pressure color
- Neutral Pressure Color: neutral pressure color

## Signal Logic

Bullish pressure signal: smoothed pressure crosses above the positive pressure threshold.

Bearish pressure signal: smoothed pressure crosses below the negative pressure threshold.

Bullish volume spike: bullish pressure is active and relative volume is above the spike threshold.

Bearish volume spike: bearish pressure is active and relative volume is above the spike threshold.

## Notes

Volume pressure is an analytical estimate, not direct order-flow data. This indicator is intended for visual volume analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
