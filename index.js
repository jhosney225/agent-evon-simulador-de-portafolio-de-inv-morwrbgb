
```javascript
const Anthropic = require("@anthropic-ai/sdk");
const readline = require("readline");

const client = new Anthropic();

// Data structure for portfolio
let portfolio = {
  stocks: {},
  bonds: {},
  cryptoCurrencies: {},
  totalValue: 0,
};

// Historical data for charting (simplified)
let priceHistory = {};

// Function to display ASCII chart
function displayChart(data, title, width = 50) {
  console.log(`\n${title}`);
  console.log("=".repeat(width));

  if (data.length === 0) {
    console.log("No data to display");
    return;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  data.forEach((value, index) => {
    const normalized = (value - min) / range;
    const barLength = Math.round(normalized * 30);
    const bar = "█".repeat(barLength);
    console.log(`${index.toString().padStart(3)}: ${bar} ${value.toFixed(2)}`);
  });
}

// Function to calculate portfolio metrics
function calculateMetrics() {
  let totalValue = 0;
  let totalCost = 0;
  let assetCount = 0;

  for (const symbol in portfolio.stocks) {
    const stock = portfolio.stocks[symbol];
    totalValue += stock.currentPrice * stock.quantity;
    totalCost += stock.buyPrice * stock.quantity;
    assetCount++;
  }

  for (const symbol in portfolio.bonds) {
    const bond = portfolio.bonds[symbol];
    totalValue += bond.currentPrice * bond.quantity;
    totalCost += bond.buyPrice * bond.quantity;
    assetCount++;
  }

  for (const symbol in portfolio.cryptoCurrencies) {
    const crypto = portfolio.cryptoCurrencies[symbol];
    totalValue += crypto.currentPrice * crypto.quantity;
    totalCost += crypto.buyPrice * crypto.quantity;
    assetCount++;
  }

  portfolio.totalValue = totalValue;
  const gainLoss = totalValue - totalCost;
  const gainLossPercent =
    totalCost > 0 ? ((gainLoss / totalCost) * 100).toFixed(2) : 0;

  return {
    totalValue: totalValue.toFixed(2),
    totalCost: totalCost.toFixed(2),
    gainLoss: gainLoss.toFixed(2),
    gainLossPercent,
    assetCount,
  };
}

// Function to display portfolio summary
function displayPortfolioSummary() {
  const metrics = calculateMetrics();
  console.log("\n=== PORTFOLIO SUMMARY ===");
  console.log(`Total Value: $${metrics.totalValue}`);
  console.log(`Total Cost: $${metrics.totalCost}`);
  console.log(`Gain/Loss: $${metrics.gainLoss}`);
  console.log(`Gain/Loss %: ${metrics.gainLossPercent}%`);
  console.log(`Assets: ${metrics.assetCount}`);

  if (metrics.assetCount > 0) {
    console.log("\n--- STOCKS ---");
    for (const symbol in portfolio.stocks) {
      const stock = portfolio.stocks[symbol];
      const value = stock.currentPrice * stock.quantity;
      const gain =
        ((stock.currentPrice - stock.buyPrice) / stock.buyPrice * 100).toFixed(2);
      console.log(
        `${symbol}: ${stock.quantity} shares @ $${stock.currentPrice} (Total: $${value.toFixed(2)}, Gain: ${gain}%)`
      );
    }

    console.log("\n--- BONDS ---");
    for (const symbol in portfolio.bonds) {
      const bond = portfolio.bonds[symbol];
      const value = bond.currentPrice * bond.quantity;
      const gain =
        ((bond.currentPrice - bond.buyPrice) / bond.buyPrice * 100).toFixed(2);
      console.log(
        `${symbol}: ${bond.quantity} @ $${bond.currentPrice} (Total: $${value.toFixed(2)}, Gain: ${gain}%)`
      );
    }

    console.log("\n--- CRYPTOCURRENCIES ---");
    for (const symbol in portfolio.cryptoCurrencies) {
      const crypto = portfolio.cryptoCurrencies[symbol];
      const value = crypto.currentPrice * crypto.quantity;
      const gain =
        ((crypto.currentPrice - crypto.buyPrice) / crypto.buyPrice * 100).toFixed(2);
      console.log(
        `${symbol}: ${crypto.quantity} coins @ $${crypto.currentPrice} (Total: $${value.toFixed(2)}, Gain: ${gain}%)`
      );
    }
  }
}

// Function to simulate price movement
function simulatePriceMovement() {
  const changePercent = (Math.random() - 0.5) * 0.1; // -5% to +5%

  for (const symbol in portfolio.stocks) {
    const stock = portfolio.stocks[symbol];
    stock.currentPrice = Math.max(
      1,
      stock.currentPrice * (1 + changePercent)
    );
    if (!priceHistory[symbol]) priceHistory[symbol] = [];
    priceHistory[symbol].push(stock.currentPrice);
    if (priceHistory[symbol].length > 20)
      priceHistory[symbol].shift();
  }

  for (const symbol in portfolio.bonds) {
    const bond = portfolio.bonds[symbol];
    bond.currentPrice = Math.max(
      1,
      bond.currentPrice * (1 + changePercent * 0.5)
    );
    if (!priceHistory[symbol]) priceHistory[symbol] = [];
    priceHistory[symbol].push(bond.currentPrice);
    if (priceHistory[symbol].length > 20)
      price