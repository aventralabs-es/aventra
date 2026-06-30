# Aventra Roadmap

## Completed Milestones

- Created an initial public website page with the indicator catalog.
- Added Aventra logo to the website.
- Added social media links to the website.
- Updated social media profiles with Aventra bio, website link, and logo.
- Submitted the website to Google Search.
- Migrated the website codebase to Next.js + TypeScript.
- Added the initial Market Radar architecture route and documented the scanner data model.

## Phase 1: TradingView Public Portfolio

- Publish the most stable TradingView indicators publicly.
- Keep complex or experimental scripts private until they are visually and logically stable.
- Standardize descriptions, categories, tags, and release notes.
- Watch user feedback and update release notes after meaningful changes.

## Phase 2: Brand Website

- Build a clean Aventra product website.
- Include indicator catalog, platform pages, education content, and links to TradingView profile.
- Add legal pages: Terms, Privacy, Refund Policy, and Risk Disclaimer.
- Keep premium sales language separate from TradingView publish descriptions.

## Phase 3: Premium TradingView Pack

- Use invite-only scripts for premium TradingView access.
- Take payment on the website.
- Collect TradingView username during checkout/account setup.
- Manage access manually at first.
- Track access status in an admin dashboard later.

## Phase 4: MetaTrader And cTrader

- Translate stable TradingView concepts into MetaTrader and cTrader versions.
- Prefer platform marketplaces for paid distribution and license handling.
- Use the website as the central documentation and support hub.

## Phase 5: Market Radar

Source of truth: `docs/market-radar-architecture.md`.

- Build Aventra Market Radar as a setup/pattern search product rather than a direct trade recommendation service.
- Focus on detected technical conditions, watchlist candidates, and educational scenarios.
- First implementation focus: trend-continuation pattern search before reversal patterns or broader setup scoring.
- Initial MVP timeframes: 1D, 4H, and 15M.
- Initial market type priority: stocks first; forex and crypto later.
- Initial stock exchanges: NASDAQ, NYSE, and BIST.
- Initial scan universes: NASDAQ 100 / NQ, S&P 500, and BIST 100.
- Use provider-ingested OHLCV data stored in an Aventra-controlled database before running scanner logic.
- Potential setup types:
  - Breakout Retest
  - MA Pullback
  - FVG Reaction
  - Volume Breakout
  - Trend Continuation
  - Liquidity Sweep
  - Premium/Discount Context







