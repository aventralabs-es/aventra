# Aventra Website Guidance

## Product Role

The website is the central Aventra brand hub. It should support public indicator discovery first, then premium access, documentation, education, and later setup scanning.

## Preferred Stack

- The website is now a Next.js + TypeScript app in `website/`.
- Tailwind CSS and shadcn/ui for a clean product interface.
- Supabase for auth and database when building account features.
- Stripe for payment flows unless the user chooses another provider.
- Vercel for deployment unless the user chooses another host.

Before changing Market Radar, auth, analytics, SEO, or product architecture, read `../docs/market-radar-architecture.md`.

## UX Direction

- Build a product catalog, not a generic marketing-only landing page.
- Prioritize indicators, platform coverage, pricing, docs, and setup education.
- Keep wording international, clear, and non-hype.
- Avoid guaranteed profit language.
- Separate educational setup analysis from financial advice.

## Initial Pages

- Home
- Indicators
- TradingView
- Pricing
- Education
- Setup Radar
- Support
- Terms
- Privacy
- Risk Disclaimer
