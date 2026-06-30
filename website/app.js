const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    productCards.forEach((card) => {
      const shouldShow = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
const marketCards = document.querySelectorAll("[data-quote-symbol]");
const quoteSymbols = [...marketCards].map((card) => card.dataset.quoteSymbol);

function formatQuotePrice(value) {
  if (!Number.isFinite(value)) return "--";
  if (value >= 1000) return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (value >= 100) return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatQuoteChange(value) {
  if (!Number.isFinite(value)) return "--";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function applyQuote(card, quote) {
  const priceNode = card.querySelector("[data-price]");
  const changeNode = card.querySelector("[data-change]");
  const price = quote?.regularMarketPrice;
  const changePercent = quote?.regularMarketChangePercent;

  if (priceNode) priceNode.textContent = formatQuotePrice(price);
  if (changeNode) changeNode.textContent = formatQuoteChange(changePercent);

  if (Number.isFinite(changePercent)) {
    card.classList.toggle("is-up", changePercent >= 0);
    card.classList.toggle("is-down", changePercent < 0);
  }
}

async function fetchQuoteJson(endpoint) {
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error("Quote request failed");
    return response.json();
  } catch (error) {
    const proxyEndpoint = `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`;
    const proxyResponse = await fetch(proxyEndpoint, { cache: "no-store" });
    if (!proxyResponse.ok) throw new Error("Proxy quote request failed");
    return proxyResponse.json();
  }
}

async function updateMarketQuotes() {
  if (!quoteSymbols.length) return;

  const endpoint = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(quoteSymbols.join(","))}`;

  try {
    const data = await fetchQuoteJson(endpoint);
    const quotes = new Map((data?.quoteResponse?.result || []).map((quote) => [quote.symbol, quote]));

    marketCards.forEach((card) => {
      applyQuote(card, quotes.get(card.dataset.quoteSymbol));
    });
  } catch (error) {
    marketCards.forEach((card) => {
      const changeNode = card.querySelector("[data-change]");
      if (changeNode) changeNode.textContent = "Live";
    });
  }
}

updateMarketQuotes();
setInterval(updateMarketQuotes, 60000);


