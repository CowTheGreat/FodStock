function generateMockStockData() {
  const now = new Date();
  
  // Generate data for different timeframes
  const weekData = generateTimeseriesData(7, now, 0.02); // 2% daily variation
  const monthData = generateTimeseriesData(30, now, 0.03); // 3% daily variation
  const yearData = generateTimeseriesData(365, now, 0.04); // 4% daily variation

  return {
    '1W': weekData,
    '1M': monthData,
    '1Y': yearData
  };
}

function generateTimeseriesData(days, endDate, volatility) {
  const data = [];
  const basePrice = Math.random() * 1000 + 100; // Random base price between 100 and 1100
  let currentPrice = basePrice;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    
    // Add random price movement with specified volatility
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
    currentPrice = Math.max(1, currentPrice + change); // Ensure price doesn't go below 1
    
    data.push({
      date: date.getTime(),
      price: currentPrice
    });
  }

  return data;
}

export { generateMockStockData };