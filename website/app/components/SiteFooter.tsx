export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <a className="footer-brand logo-link" href="/#home" aria-label="Aventra home">
        <img className="footer-logo" src="/assets/aventra-wordmark-cropped-hq.png" alt="Aventra" />
      </a>
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
    </footer>
  );
}
