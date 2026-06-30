# Aventra Indicators Guidance

## Scope

This folder contains all Aventra indicator implementations across supported platforms.

## Platform Layout

- TradingView scripts live in `indicators/tradingview/`.
- TradingView publish descriptions and release notes live in `indicators/tradingview/publish/`.
- MetaTrader work lives in `indicators/metatrader/`.
- cTrader work lives in `indicators/ctrader/`.

## Shared Indicator Rules

- Keep product names aligned across platforms where possible.
- Public-facing names, inputs, labels, alerts, descriptions, categories, and tags must be English.
- Keep defaults practical and visually clean.
- Preserve Aventra naming: `Concept [Aventra]`.
- Prefer shared behavior across platform ports unless a platform limitation requires a difference.
- Update docs and release notes when behavior changes.