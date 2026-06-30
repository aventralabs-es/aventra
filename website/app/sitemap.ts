import type { MetadataRoute } from "next";

const baseUrl = "https://www.aventralab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/market-radar",
    "/blog/support-resistance.html",
    "/blog/trendlines-channels.html",
    "/blog/chart-patterns.html",
    "/blog/candlestick-basics.html",
    "/blog/moving-averages.html",
    "/blog/volume-analysis.html"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/blog") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/market-radar" ? 0.9 : 0.7
  }));
}
