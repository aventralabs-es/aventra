import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Market Radar",
  description:
    "Aventra Market Radar roadmap for bullish and bearish continuation patterns, reversal patterns, and ready setup scans.",
  alternates: {
    canonical: "/market-radar"
  }
};

const roadmap = [
  {
    phase: "Phase 1",
    title: "Continuation Pattern Radar",
    description:
      "Scan bullish and bearish trend-continuation structures where price consolidates or pulls back inside an existing trend.",
    examples: ["Bull flag", "Bear flag", "Ascending triangle", "Descending triangle", "MA pullback", "Breakout retest"]
  },
  {
    phase: "Phase 2",
    title: "Reversal Pattern Radar",
    description:
      "Scan context-dependent reversal structures around exhaustion, failed moves, liquidity sweeps, and structure shifts.",
    examples: ["Double bottom", "Double top", "Inverse H&S", "Head & shoulders", "Falling wedge", "Rising wedge"]
  },
  {
    phase: "Phase 3",
    title: "Ready Setup Radar",
    description:
      "Combine pattern, trend context, volume, key levels, invalidation, and scoring into watchlist candidates.",
    examples: ["Trend template", "Volume breakout", "Momentum setup", "Liquidity sweep reversal", "FVG reaction"]
  }
];

const modelRows = [
  ["direction", "Bullish or bearish scan direction.", "bullish, bearish"],
  ["behavior", "Whether the pattern supports continuation or reversal context.", "continuation, reversal"],
  ["pattern_family", "The broad technical family being detected.", "flag, wedge, triangle, range, retest"],
  ["pattern_variant", "The specific detected formation.", "bull_flag, falling_wedge, double_bottom"],
  ["market_context", "The market state used to interpret the pattern.", "uptrend pullback, downtrend exhaustion, range breakout"],
  ["quality_score", "A 0-100 quality score based on clarity, location, volume, and confirmation.", "72, 84, 91"],
  ["explanation", "Plain-English reason why the candidate was detected.", "Compression near resistance with rising lows"]
];

export default function MarketRadarPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section" aria-labelledby="market-radar-title">
          <div className="section-heading">
            <p className="eyebrow">Market Radar</p>
            <h1 id="market-radar-title">Pattern scanner architecture</h1>
            <p>
              Market Radar will classify detected candidates by direction, behavior, pattern type, confidence, and
              context. It is designed as an educational watchlist workflow, not a trade recommendation engine.
            </p>
          </div>
          <div className="radar-table" role="table" aria-label="Market Radar data model">
            <div role="row">
              <span role="columnheader">Field</span>
              <span role="columnheader">Meaning</span>
              <span role="columnheader">Examples</span>
            </div>
            {modelRows.map(([field, meaning, examples]) => (
              <div role="row" key={field}>
                <span role="cell">{field}</span>
                <span role="cell">{meaning}</span>
                <span role="cell">{examples}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="radar-roadmap-title">
          <div className="section-heading">
            <p className="eyebrow">Build order</p>
            <h2 id="radar-roadmap-title">From patterns to setup candidates</h2>
            <p>
              The first release should focus on continuation patterns. Reversal patterns and full setup scoring come
              after the base scanner model is stable.
            </p>
          </div>
          <div className="catalog-grid">
            {roadmap.map((item) => (
              <article className="product-card" key={item.title}>
                <div className="product-link">
                  <span className="product-tag">{item.phase}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="topic-grid compact-topics">
                    {item.examples.map((example) => (
                      <span key={example}>{example}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
