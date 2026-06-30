Version 1.0.3

- Fixed missing pullback confirmation level variables that caused a Pine compilation error.

Version 1.0.2

- Aligned pullback signal logic with Trend Pullback Signals [Aventra].
- Pullback signals now use Slow MA as the trend filter and Fast MA as the default pullback area instead of requiring Fast MA and Slow MA alignment.
- Pullback Window Bars default is now 10 and Require Slow MA Slope is enabled by default.

Version 1.0.1

- Added distinct crossover markers while keeping pullback markers separate.
- Added MA trend fill between Fast MA and Slow MA, enabled by default.

Version 1.0.0

- Initial release of MA Crossover Pullback Signals [Aventra]
- Added bullish and bearish MA crossover signal detection
- Added bullish and bearish MA pullback continuation signal detection
- Added Crossover, Pullback, and Crossover + Pullback signal modes
- Added configurable Fast MA and Slow MA lengths
- Added EMA and SMA selection
- Added Pullback Source selection: Fast MA, Slow MA, or Both
- Added ATR-based pullback tolerance and confirmation buffer
- Added optional slow MA slope filter
- Added relative volume and RSI filters
- Added signal markers, labels, pullback lines, pullback zones, and alerts
