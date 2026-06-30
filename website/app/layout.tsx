import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../styles.css";

const siteUrl = "https://www.aventralab.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aventra Trading Tools",
    template: "%s | Aventra"
  },
  description:
    "Aventra builds TradingView indicators, market education, and setup scanning tools for technical traders.",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  },
  verification: {
    google: "EJ_jh0FZez33FmLTU8jE3geRQJRC5ppGU4XFbDNbyLI"
  },
  openGraph: {
    title: "Aventra Trading Tools",
    description:
      "TradingView indicators, market education, and future Market Radar scanning tools.",
    url: siteUrl,
    siteName: "Aventra",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
