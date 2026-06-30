import Script from "next/script";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-main">
        <a className="brand logo-link" href="/#home" aria-label="Aventra home">
          <img className="brand-logo" src="/assets/aventra-wordmark-cropped-hq.png" alt="Aventra" />
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="/#indicators">Indicators</a>
          <a href="/#education">Education</a>
          <a href="/market-radar">Market Radar</a>
          <a href="/#support">Support</a>
        </nav>
      </div>
      <div className="market-quote-strip" aria-label="Live market quotes from TradingView">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget" />
          <Script
            id="tradingview-ticker-tape"
            src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
            strategy="afterInteractive"
          >
            {JSON.stringify({
              symbols: [
                { proName: "OANDA:SPX500USD", title: "S&P 500" },
                { proName: "OANDA:NAS100USD", title: "Nasdaq 100" },
                { proName: "TVC:USOIL", title: "Oil" },
                { proName: "OANDA:XAUUSD", title: "Gold" },
                { proName: "OANDA:XAGUSD", title: "Silver" }
              ],
              showSymbolLogo: true,
              isTransparent: true,
              displayMode: "regular",
              colorTheme: "light",
              locale: "en"
            })}
          </Script>
        </div>
      </div>
    </header>
  );
}
