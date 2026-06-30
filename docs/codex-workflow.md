# Codex Workflow For Aventra

## Recommended Thread Structure

- `Aventra Strategy / Roadmap`: product direction, naming, pricing, public/private decisions.
- `TradingView Indicators`: small Pine fixes, publish descriptions, categories, tags.
- One thread per complex indicator when debugging logic or visuals.
- `Website MVP`: site architecture, design, checkout, dashboard, legal pages.
- `Marketplace / Sales`: TradingView invite-only, MQL5 Market, cTrader Store, access workflow.
- `Setup Radar`: scanner and pattern search product planning.

## Recommended Project Structure

- Keep the current Aventra repo as the main product workspace.
- Use folder-level `AGENTS.md` files for platform-specific rules.
- Create a separate repo/project only when deployment, tooling, or ownership becomes truly separate.

## When To Split Into A Separate Repo

- The website has its own deployment pipeline.
- MetaTrader or cTrader code needs its own build/release process.
- A scanner/backend product needs services, jobs, database migrations, or market data integrations.

## Codex Usage Habits

- Put recurring rules into `AGENTS.md`.
- Put product decisions into `docs/product-decisions.md`.
- Put publishing steps into `docs/publishing-checklist.md`.
- Keep large explorations in separate threads to avoid mixing decisions with debug noise.
