MA Crossover Signals [Aventra] is a Pine Script v6 indicator designed to visualize moving average crossover conditions directly on the chart.

It plots a configurable fast moving average and slow moving average, highlights the trend relationship between them, and marks BUY/SELL crossover signals when the fast average crosses the slow average.

## Features

- Configurable price source
- Configurable calculation timeframe, defaulting to the chart timeframe
- Configurable moving average type: SMA, EMA, WMA, RMA, VWMA
- Fast and slow moving average lines
- BUY/SELL crossover labels
- Trend fill between the averages
- Optional trend-based bar coloring
- TradingView alert conditions

## Inputs

- Source: price source used for the moving average calculation
- Calculation Timeframe: empty by default, which means chart timeframe
- Fast Length: fast moving average period
- Slow Length: slow moving average period
- Moving Average Type: SMA, EMA, WMA, RMA, or VWMA
- Show Crossover Signals: toggles BUY/SELL labels
- Color Bars by Trend: toggles trend-based candle coloring

## Signal Logic

BUY signal: the fast moving average crosses above the slow moving average.

SELL signal: the fast moving average crosses below the slow moving average.

## Notes

This indicator is intended for visual analysis and alert-based monitoring. It does not place trades and should be used together with proper risk management and your own market analysis.
