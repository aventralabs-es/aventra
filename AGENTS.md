# Aventra Codex Guidance

## Product Context

Aventra is an international trading tools brand. The current focus is TradingView indicators, followed by MetaTrader, cTrader, a public website, and later setup/pattern scanning products.

Before Market Radar, website architecture, auth, hosting, analytics, SEO, or scanning-product work, read `docs/market-radar-architecture.md`, `docs/product-decisions.md`, and `docs/roadmap.md`.

## Global Rules

- Use English for all public indicator names, inputs, labels, alerts, publish descriptions, categories, and tags.
- Keep indicator names in the format `Concept [Aventra]`.
- Keep `indicator()` `title` and `shorttitle` identical unless the user explicitly asks otherwise.
- Use semantic version comments near the top of scripts: `// Aventra Version: x.y.z`.
- Prefer conservative defaults that make the chart readable on first load.
- Avoid dense labels, oversized boxes, and visual clutter by default.
- When changing a public script, update the release notes.
- When providing a script for publishing, also provide publish description, 3 categories, and tags.
- Do not add sales language, links, or solicitation text inside TradingView publish descriptions unless the user explicitly approves a compliant vendor approach.

## Product Quality

- Make indicators useful with default settings before adding advanced options.
- Add parameters only when they control behavior a trader would reasonably expect.
- Prefer consistency across indicators: colors, opacity, label style, max object defaults, and timeframe defaults.
- If a feature causes confusion or chart clutter, simplify it or make it optional with a safe default.

## File Organization

- TradingView Pine scripts live in `indicators/tradingview/`.
- TradingView publish text and release notes live in `indicators/tradingview/publish/`.
- MetaTrader work lives in `indicators/metatrader/`.
- cTrader work lives in `indicators/ctrader/`.
- Website and product site work should live in `website/`. The website is now a Next.js + TypeScript app.
- Strategy, product, and process notes live in `docs/`.

## Delivery Checklist

- Confirm the script name and version.
- Confirm label/input/alert text is English.
- Confirm defaults are readable.
- Confirm publish description exists.
- Confirm release notes are updated.
- Provide 3 TradingView categories and tags when publishing is involved.
