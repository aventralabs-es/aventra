"use client";

import { useState } from "react";

type Indicator = {
  title: string;
  category: "structure" | "liquidity" | "trend" | "volume" | "sessions";
  href?: string;
  image?: string;
  description: string;
  status?: "published" | "coming-soon";
};

const indicators: Indicator[] = [
  {
    title: "MA Crossover Pullback Signals [Aventra]",
    category: "trend",
    href: "https://www.tradingview.com/script/xpOzYL6M-MA-Crossover-Pullback-Signals-Aventra/",
    image: "https://s3.tradingview.com/x/xpOzYL6M_mid.png?v=1782840170",
    description: "Combines moving-average crossover events with pullback continuation signals after trend alignment."
  },
  {
    title: "Trend Pullback Signals [Aventra]",
    category: "trend",
    href: "https://www.tradingview.com/script/TGHTCF9O-Trend-Pullback-Signals-Aventra/",
    image: "https://s3.tradingview.com/t/TGHTCF9O_mid.png?v=1782839976",
    description: "Identifies trend-continuation pullbacks using trend direction, confirmation, RSI, and volume filters."
  },
  {
    title: "Volume Breakout Signals [Aventra]",
    category: "volume",
    href: "https://www.tradingview.com/script/R3a4d4Gz-Volume-Breakout-Signals-Aventra/",
    image: "https://s3.tradingview.com/r/R3a4d4Gz_mid.png?v=1782839777",
    description: "Detects bullish and bearish structure breakouts confirmed by stronger-than-average relative volume."
  },
  {
    title: "Breakout Retest Signals [Aventra]",
    category: "structure",
    href: "https://www.tradingview.com/script/tktoygM4-Breakout-Retest-Signals-Aventra/",
    image: "https://s3.tradingview.com/t/tktoygM4_mid.png?v=1782839393",
    description: "Identifies confirmed breakout-and-retest setups around recent swing highs and swing lows."
  },
  {
    title: "FVG & IFVG [Aventra]",
    category: "liquidity",
    href: "https://www.tradingview.com/script/txJdcgg7-FVG-IFVG-Aventra/",
    image: "https://s3.tradingview.com/t/txJdcgg7_mid.png?v=1782837236",
    description: "Detects fair value gaps, active imbalance zones, mitigation, and optional inverse FVG reactions."
  },
  {
    title: "Liquidity Sweeps [Aventra]",
    category: "liquidity",
    href: "https://www.tradingview.com/script/YSutg7hg-Liquidity-Sweeps-Aventra/",
    image: "https://s3.tradingview.com/y/YSutg7hg_mid.png?v=1782836982",
    description: "Marks bullish and bearish liquidity sweeps around recent buy-side and sell-side liquidity levels."
  },
  {
    title: "Premium Discount Zones [Aventra]",
    category: "structure",
    href: "https://www.tradingview.com/script/moVEgaVS-Premium-Discount-Zones-Aventra/",
    image: "https://s3.tradingview.com/m/moVEgaVS_mid.png?v=1782836826",
    description: "Builds the active dealing range and separates it into premium, equilibrium, and discount areas."
  },
  {
    title: "Market Sessions [Aventra]",
    category: "sessions",
    href: "https://www.tradingview.com/script/3sjFLfWn-Market-Sessions-Aventra/",
    image: "https://s3.tradingview.com/3/3sjFLfWn_mid.png?v=1782836626",
    description: "Highlights Asia, London, and New York sessions with ranges and optional labels."
  },
  {
    title: "Order Blocks & Breakers [Aventra]",
    category: "liquidity",
    href: "https://www.tradingview.com/script/ly1BaTr8-Order-Blocks-Breakers-Aventra/",
    image: "https://s3.tradingview.com/l/ly1BaTr8_mid.png?v=1782835913",
    description: "Detects bullish and bearish order blocks after structure breaks and optional breaker blocks."
  },
  {
    title: "Market Structure [Aventra]",
    category: "structure",
    href: "https://www.tradingview.com/script/Mrn3tjul-Market-Structure-Aventra/",
    image: "https://s3.tradingview.com/m/Mrn3tjul_mid.png?v=1782835446",
    description: "Detects swing highs, swing lows, break of structure, and change of character directly on the chart."
  },
  {
    title: "Volume Pressure [Aventra]",
    category: "volume",
    href: "https://www.tradingview.com/script/lI1UJbTP-Volume-Pressure-Aventra/",
    image: "https://s3.tradingview.com/l/lI1UJbTP_mid.png?v=1782834781",
    description: "Estimates bullish and bearish volume pressure using candle direction, close location, and volume."
  },
  {
    title: "Liquidity Zones [Aventra]",
    category: "liquidity",
    href: "https://www.tradingview.com/script/tc2OfxvT-Liquidity-Zones-Aventra/",
    image: "https://s3.tradingview.com/t/tc2OfxvT_mid.png?v=1782833890",
    description: "Visualizes equal high and equal low liquidity zones and marks sweeps."
  },
  {
    title: "Trend Strength Matrix [Aventra]",
    category: "trend",
    href: "https://www.tradingview.com/script/IQgZDjzk-Trend-Strength-Matrix-Aventra/",
    image: "https://s3.tradingview.com/i/IQgZDjzk_mid.png?v=1782833031",
    description: "Combines EMA direction, RSI momentum, ADX strength, and optional ATR filtering."
  },
  {
    title: "Dynamic Support Resistance [Aventra]",
    category: "structure",
    href: "https://www.tradingview.com/script/X6ADS4dg-Dynamic-Support-Resistance-Aventra/",
    image: "https://s3.tradingview.com/x/X6ADS4dg_mid.png?v=1782831944",
    description: "Automatically identifies pivot-based support and resistance levels and alerts on breaks."
  },
  {
    title: "Turtle Soup Signals [Aventra]",
    category: "liquidity",
    description: "Failed breakout and reversal-style Turtle Soup conditions are being refined before release.",
    status: "coming-soon"
  }
];

const filters = ["all", "structure", "liquidity", "trend", "volume", "sessions"] as const;

export function IndicatorCatalog() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("all");
  const visibleIndicators = indicators.filter(
    (indicator) => activeFilter === "all" || indicator.category === activeFilter
  );

  return (
    <>
      <div className="filter-bar" role="toolbar" aria-label="Indicator filters">
        {filters.map((filter) => (
          <button
            className={`filter-button ${activeFilter === filter ? "active" : ""}`}
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter === "all" ? "All" : filter[0].toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      <div className="catalog-grid">
        {visibleIndicators.map((indicator) => {
          const isComingSoon = indicator.status === "coming-soon";
          const content = (
            <>
              <div className="product-shot" aria-hidden={!indicator.image}>
                {indicator.image ? (
                  <img src={indicator.image} alt={`${indicator.title} screenshot`} loading="lazy" />
                ) : (
                  <>
                    <span />
                    <svg viewBox="0 0 320 180">
                      <path d="M0 128H320M0 88H320M0 48H320" />
                      <polyline points="12,104 46,86 82,92 120,58 154,44 188,92 226,102 268,78 308,86" />
                      <circle cx="154" cy="44" r="9" />
                    </svg>
                  </>
                )}
              </div>
              <span className="product-tag">{isComingSoon ? "Coming soon" : indicator.category}</span>
              <h3>{indicator.title}</h3>
              <p>{indicator.description}</p>
              <strong>{isComingSoon ? "Coming soon" : "View on TradingView"}</strong>
            </>
          );

          return (
            <article
              className={`product-card ${isComingSoon ? "coming-soon" : ""}`}
              data-category={indicator.category}
              key={indicator.title}
            >
              {indicator.href ? (
                <a className="product-link" href={indicator.href} target="_blank" rel="noopener">
                  {content}
                </a>
              ) : (
                <div className="product-link" aria-label={`${indicator.title} coming soon`}>
                  {content}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
