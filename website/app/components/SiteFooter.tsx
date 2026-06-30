export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="footer-main">
        <div className="footer-contact">
          <a className="footer-brand logo-link" href="/#home" aria-label="Aventra home">
            <img className="footer-logo" src="/assets/aventra-wordmark-cropped-hq.png" alt="Aventra" />
          </a>
          <a className="footer-email" href="mailto:aventralabs@gmail.com">aventralabs@gmail.com</a>
        </div>
        <nav className="footer-social" aria-label="Social links">
          <a href="https://www.tradingview.com/u/aventralabs/" target="_blank" rel="noopener">
            <span>TradingView</span>
          </a>
          <a href="https://x.com/AventraLabs" target="_blank" rel="noopener">
            <span>X</span>
          </a>
          <a href="https://www.instagram.com/AventraLab" target="_blank" rel="noopener">
            <span>Instagram</span>
          </a>
          <a href="https://www.youtube.com/@AventraLabs" target="_blank" rel="noopener">
            <span>YouTube</span>
          </a>
          <a href="https://www.tiktok.com/@AventraLab" target="_blank" rel="noopener">
            <span>TikTok</span>
          </a>
        </nav>
      </div>
      <div className="footer-legal-notes" aria-label="Legal summaries">
        <section>
          <h2>Terms</h2>
          <p>Use Aventra tools for technical analysis and education. Final trading decisions remain the user&apos;s responsibility.</p>
        </section>
        <section>
          <h2>Privacy</h2>
          <p>Future account and payment flows should publish clear data handling terms.</p>
        </section>
        <section>
          <h2>Risk Disclaimer</h2>
          <p>Trading involves risk. Aventra tools do not guarantee outcomes and are not financial advice.</p>
        </section>
      </div>
    </footer>
  );
}

