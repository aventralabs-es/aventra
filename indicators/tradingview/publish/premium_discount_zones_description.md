Premium Discount Zones [Aventra] is a Pine Script v6 indicator that builds the active dealing range from either the selected lookback high / low or the latest confirmed swing high / low, then separates that range into Premium, Equilibrium, and Discount areas.

It is designed for price action and smart money concept workflows where traders want to quickly see whether price is trading above equilibrium, below equilibrium, or near the midpoint of the active range.

## Features

- Active dealing range from lookback high / low or confirmed swing high / low
- Premium zone above equilibrium
- Discount zone below equilibrium
- Equilibrium midpoint line
- Optional range high and low lines
- Optional active zone labels
- Configurable calculation timeframe, default Chart
- Configurable range mode, default Lookback High / Low
- Configurable lookback bars, default 100
- Configurable swing length
- Low-opacity Aventra visual defaults
- Alerts for new range, premium entry, discount entry, and equilibrium touch

## Inputs

- Calculation Timeframe: timeframe used to calculate the range, default Chart
- Range Mode: range calculation method, default Lookback High / Low
- Lookback Bars: number of bars used by Lookback High / Low mode, default 100
- Swing Length: pivot length used by Latest Swings mode, default 5
- Show Premium Zone: toggles the premium area, enabled by default
- Show Discount Zone: toggles the discount area, enabled by default
- Show Equilibrium: toggles the midpoint line, enabled by default
- Show Range High / Low: toggles dealing range high and low lines, enabled by default
- Show Labels: toggles Premium, Discount, and Equilibrium labels, hidden by default
- Premium Zone Color: premium zone fill color
- Discount Zone Color: discount zone fill color
- Equilibrium Color: midpoint line color, default amber for visibility on light and dark themes
- Range High / Low Color: range boundary line color
- Label Color: label background color

## Signal Logic

New Range: triggers when a new active dealing range is detected.

Premium Entered: triggers when price enters the upper half of the active dealing range.

Discount Entered: triggers when price enters the lower half of the active dealing range.

Equilibrium Touched: triggers when price touches the midpoint of the active dealing range.

## Notes

Premium and discount zones use Lookback High / Low mode by default for a broader active dealing range. If Latest Swings mode is selected, zones are calculated from confirmed pivots, so the range updates after the swing confirmation period. The indicator intentionally shows only the active range to keep the chart clean. It does not place trades and should be used together with proper risk management and your own market analysis.
