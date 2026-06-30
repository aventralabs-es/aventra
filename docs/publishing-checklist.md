# TradingView Publishing Checklist

## Before Publishing

- Confirm the script compiles in TradingView Pine Editor.
- Confirm the chart is not visually cluttered on default settings.
- Confirm all labels, inputs, and alerts are English.
- Confirm `indicator()` title and shorttitle match.
- Confirm the version comment is updated.
- Confirm release notes include the latest version.
- Confirm publish description is clean and non-promotional.
- Confirm category selection and tags are ready.

## Recommended Category Pattern

- Pick up to 3 categories.
- Use the most literal categories first.
- Avoid forcing unrelated categories for discoverability.

## Tag Pattern

- Include concept tags, technique tags, and Aventra brand tag.
- Example:
  - `trend`
  - `pullback`
  - `ema`
  - `volume`
  - `signals`
  - `aventra`

## After Publishing

- Save the TradingView script URL in `docs/indicator-index.md` if needed.
- Monitor comments and feedback.
- Update release notes for meaningful changes.
- Keep the same script name for incremental updates.
