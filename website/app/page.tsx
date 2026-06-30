import { IndicatorCatalog } from "./components/IndicatorCatalog";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="home">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">TradingView indicators and technical setup tools</p>
            <h1 id="hero-title" className="hero-logo-title">
              <img className="hero-logo" src="/assets/aventra-wordmark-cropped-hq.png" alt="Aventra" />
            </h1>
            <p className="hero-text">
              Practical indicators for structure, liquidity, trend, volume, and setup context across active markets.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#indicators">
                Browse indicators
              </a>
              <a className="button secondary" href="/market-radar">
                View Market Radar
              </a>
            </div>
          </div>

          <div className="market-panel" aria-label="Aventra market analysis preview">
            <div className="panel-topline">
              <span>BTCUSDT - 1H</span>
              <strong>Trend Context</strong>
            </div>
            <div className="chart-preview" aria-hidden="true">
              <span className="zone zone-supply" />
              <span className="zone zone-demand" />
              <svg viewBox="0 0 620 250" role="img" aria-label="Illustrative market chart">
                <defs>
                  <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#47b39d" stopOpacity=".28" />
                    <stop offset="100%" stopColor="#47b39d" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="grid-line" d="M0 55H620M0 125H620M0 195H620" />
                <path
                  className="area-line"
                  d="M0 188 C55 150 70 167 112 132 C160 92 192 116 225 82 C270 36 305 57 340 92 C378 130 415 108 452 76 C494 40 526 66 555 92 C584 116 598 104 620 78 L620 250 L0 250 Z"
                />
                <path
                  className="price-line"
                  d="M0 188 C55 150 70 167 112 132 C160 92 192 116 225 82 C270 36 305 57 340 92 C378 130 415 108 452 76 C494 40 526 66 555 92 C584 116 598 104 620 78"
                />
              </svg>
              <span className="signal buy">BOS</span>
              <span className="signal sell">Sweep</span>
            </div>
            <div className="panel-metrics">
              <span>
                <strong>Structure</strong>Bullish
              </span>
              <span>
                <strong>Volume</strong>Rising
              </span>
              <span>
                <strong>Risk</strong>Educational
              </span>
            </div>
          </div>
        </section>

        <section className="section intro-strip" aria-label="Platform overview">
          <div>
            <strong>Current focus</strong>
            <span>TradingView Pine Script indicators</span>
          </div>
          <div>
            <strong>Next platforms</strong>
            <span>MetaTrader and cTrader ports</span>
          </div>
          <div>
            <strong>Product direction</strong>
            <span>Market Radar for pattern and setup scanning</span>
          </div>
        </section>

        <section className="section" id="indicators" aria-labelledby="indicators-title">
          <div className="section-heading">
            <p className="eyebrow">Indicator catalog</p>
            <h2 id="indicators-title">Published TradingView indicators</h2>
            <p>Explore the current Aventra TradingView portfolio by the trading context each indicator helps evaluate.</p>
          </div>
          <IndicatorCatalog />
        </section>

        <section className="section education-section" id="education" aria-labelledby="education-title">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2 id="education-title">Build a complete market analysis foundation</h2>
            <p>
              Learn market context through technical analysis and fundamental analysis. Educational content is for
              market analysis and does not constitute financial advice.
            </p>
          </div>
          <div className="education-pillars">
            <article className="education-pillar">
              <div className="pillar-heading">
                <span className="track-label">Technical Analysis</span>
                <h3>Chart-based market reading</h3>
                <p>Understand price behavior, levels, trends, patterns, liquidity, and advanced chart concepts.</p>
              </div>
              <div className="education-subcards">
                <div className="education-subcard">
                  <h4>Classical Technical Analysis</h4>
                  <div className="topic-grid compact-topics">
                    <a className="topic-link" href="/blog/support-resistance.html">
                      Support &amp; Resistance
                    </a>
                    <a className="topic-link" href="/blog/trendlines-channels.html">
                      Trendlines &amp; Channels
                    </a>
                    <a className="topic-link" href="/blog/chart-patterns.html">
                      Chart Patterns
                    </a>
                    <a className="topic-link" href="/blog/candlestick-basics.html">
                      Candlestick Basics
                    </a>
                    <a className="topic-link" href="/blog/moving-averages.html">
                      Moving Averages
                    </a>
                    <a className="topic-link" href="/blog/volume-analysis.html">
                      Volume Analysis
                    </a>
                  </div>
                </div>
                <div className="education-subcard">
                  <h4>Advanced Technical Analysis</h4>
                  <div className="topic-grid compact-topics">
                    <span>Market Structure</span>
                    <span>Liquidity Concepts</span>
                    <span>Fair Value Gaps</span>
                    <span>Premium / Discount</span>
                    <span>Order Blocks</span>
                    <span>ICT Concepts</span>
                  </div>
                </div>
              </div>
            </article>
            <article className="education-pillar">
              <div className="pillar-heading">
                <span className="track-label">Fundamental Analysis</span>
                <h3>Market drivers and business quality</h3>
                <p>Read the broader economic environment and analyze company-specific financial performance.</p>
              </div>
              <div className="education-subcards">
                <div className="education-subcard">
                  <h4>Macro Analysis</h4>
                  <div className="topic-grid compact-topics">
                    <span>Interest Rates</span>
                    <span>Inflation</span>
                    <span>Central Banks</span>
                    <span>Economic Calendar</span>
                    <span>Risk Sentiment</span>
                    <span>Sector Rotation</span>
                  </div>
                </div>
                <div className="education-subcard">
                  <h4>Company Analysis</h4>
                  <div className="topic-grid compact-topics">
                    <span>Financial Statements</span>
                    <span>Revenue Analysis</span>
                    <span>Earnings Quality</span>
                    <span>Margins &amp; Profitability</span>
                    <span>Debt &amp; Cash Flow</span>
                    <span>Valuation Basics</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section radar-section" id="market-radar" aria-labelledby="radar-title">
          <div className="section-heading">
            <p className="eyebrow">Market Radar</p>
            <h2 id="radar-title">Pattern and setup scanning framework</h2>
            <p>
              Market Radar will organize watchlist candidates by direction, behavior, pattern type, quality score, and
              market context. The goal is to surface market context for review, not to provide trade recommendations.
            </p>
          </div>
          <div className="radar-table" role="table" aria-label="Market Radar concept">
            <div role="row">
              <span role="columnheader">Layer</span>
              <span role="columnheader">Purpose</span>
              <span role="columnheader">Examples</span>
            </div>
            <div role="row">
              <span role="cell">Direction</span>
              <span role="cell">Classifies the scan as bullish or bearish.</span>
              <span role="cell">Bullish, bearish.</span>
            </div>
            <div role="row">
              <span role="cell">Behavior</span>
              <span role="cell">Separates continuation patterns from reversal patterns.</span>
              <span role="cell">Continuation, reversal.</span>
            </div>
            <div role="row">
              <span role="cell">Market Context</span>
              <span role="cell">Interprets the pattern inside trend, range, pullback, or exhaustion context.</span>
              <span role="cell">Uptrend pullback, downtrend exhaustion, range breakout.</span>
            </div>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="/market-radar">
              Open Market Radar roadmap
            </a>
          </div>
        </section>

        <section className="section support-section" id="support" aria-labelledby="support-title">
          <div>
            <p className="eyebrow">Support</p>
            <h2 id="support-title">Clear product help</h2>
            <p>Support content should cover installation, indicator settings, platform availability, billing, and access status.</p>
          </div>
          <div className="support-links" aria-label="Support links">
            <a href="mailto:aventralabs@gmail.com">aventralabs@gmail.com</a>
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#risk">Risk Disclaimer</a>
          </div>
        </section>

        <section className="legal-band" aria-label="Legal summaries">
          <article id="terms">
            <h2>Terms</h2>
            <p>Use Aventra tools for technical analysis and education. Final trading decisions remain the user&apos;s responsibility.</p>
          </article>
          <article id="privacy">
            <h2>Privacy</h2>
            <p>Future account and payment flows should publish clear data handling terms.</p>
          </article>
          <article id="risk">
            <h2>Risk Disclaimer</h2>
            <p>Trading involves risk. Aventra tools do not guarantee outcomes and are not financial advice.</p>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
