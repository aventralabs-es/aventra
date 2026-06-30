# Aventra Product Decisions

## Naming

- Indicator names follow: `Concept [Aventra]`.
- Use international marketplace-style naming.
- Keep `title` and `shorttitle` identical.
- Use searchable keywords in the name only when they are genuinely important, such as FVG/IFVG.

## Language

- All public UI text should be English.
- Internal discussion can be Turkish.
- Publish descriptions should be English.

## Versioning

- Keep a stable product name.
- Track changes through release notes and source comments.
- Use `// Aventra Version: x.y.z` in Pine files.
- For public TradingView updates, update the existing script when possible instead of creating a new name for minor improvements.

## Free Vs Premium

- Free/public scripts build trust and brand awareness.
- Premium scripts should be invite-only or marketplace-protected depending on the platform.
- Do not rush premium packaging until the public portfolio has enough trust and feedback.

## Trade Ideas And Setup Search

- Aventra should frame future trade-related products as setup/pattern search and educational technical analysis.
- Avoid language like guaranteed signal, buy now, or take this trade.
- Preferred phrasing:
  - Potential setup
  - Detected condition
  - Watchlist candidate
  - Invalidation level
  - Educational scenario


## Website And Product App Stack

- The website has moved from static HTML/CSS/JS to Next.js + TypeScript in `website/`.
- Vercel remains the hosting and deployment platform.
- Vercel Web Analytics is the default analytics choice for the MVP.
- Supabase is planned for auth, user data, watchlists, saved scans, and account features.
- Stripe is planned for payment flows when premium access begins.
- Keep legacy blog HTML available until migrated to native Next.js routes.

## Market Radar Model

- Market Radar classifies candidates by direction, behavior, pattern family, pattern variant, market context, quality score, and explanation.
- Direction is bullish or bearish.
- Behavior is continuation or reversal.
- Pattern variant alone must not decide interpretation; pattern plus market context decides the final reading.
- See `docs/market-radar-architecture.md` for the source-of-truth model.