Liquidity Sweeps [Aventra] is a Pine Script v6 indicator that marks bullish and bearish liquidity sweeps around recent buy-side and sell-side liquidity levels.

It is designed for price action and smart money concept workflows where traders want to identify stop hunts, liquidity grabs, and failed breakout attempts around recent high and low liquidity.

## Features

- Detects buy-side sweeps above local swing highs inside the lookback window
- Detects sell-side sweeps below local swing lows inside the lookback window
- Sweep Detection modes: Wick Only, Close Back, and Breakout Touch
- Configurable calculation timeframe, default Chart
- Configurable swing length for display compatibility
- Configurable lookback bars, default 300
- ATR-based sweep tolerance for equal or near-equal liquidity sweeps
- Historical sweep markers, enabled by default
- Optional sweep lines
- Optional sweep labels, disabled by default
- Keep Sweeps mode, enabled by default
- Configurable maximum saved sweep drawings
- TradingView alerts for bullish and bearish sweeps

## Inputs

- Calculation Timeframe: timeframe used to calculate liquidity levels, default Chart
- Swing Length: compatibility input for swing-style tuning, default 5
- Lookback Bars: number of previous bars used to scan swing liquidity, default 300
- ATR Length: ATR length used for sweep tolerance, default 14
- Sweep Tolerance ATR: tolerance multiplier for equal or near-equal sweeps, default 0.05
- Sweep Detection: controls how a sweep is confirmed, default Wick Only
- Show Sweep Markers: toggles historical sweep markers, enabled by default
- Show Sweep Lines: toggles sweep lines, enabled by default
- Show Sweep Labels: toggles sweep labels, disabled by default
- Keep Sweeps: keeps previous sweep drawings on the chart, enabled by default
- Maximum Sweeps: maximum saved sweep drawings, default 100
- Bullish Sweep Color: color for low-side bullish sweeps
- Bearish Sweep Color: color for high-side bearish sweeps
- Label Color: sweep label background color

## Signal Logic

Bullish Sweep: price trades below an active local swing low inside the lookback window.

Bearish Sweep: price trades above an active local swing high inside the lookback window.

Sweep Detection Modes:

- Wick Only: the wick trades beyond the level while the candle body remains inside it
- Close Back: the candle wick trades beyond the level and closes back inside it
- Breakout Touch: the candle wick trades beyond the liquidity level

## Notes

This version scans local swing highs and swing lows inside the lookback window to keep sweep detection practical on real charts. A level is consumed after the first wick touch so sweep lines do not continue after liquidity has already been touched. Sweep tolerance helps detect equal or near-equal highs and lows that may not break the level by an exact tick. It focuses on sweep events rather than persistent zones. It does not place trades and should be used together with proper risk management and your own market analysis.








