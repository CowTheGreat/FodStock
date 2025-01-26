import { generateMockStockData } from "./mockData";
import { faker } from "@faker-js/faker";

export const NIFTY500_STOCKS = [
  ...Array.from({ length: 500 }).map((_, index) => ({
    id: index + 1,
    symbol: faker.string.alphanumeric(5).toUpperCase(),
    name: faker.company.name(),
    logo: `https://dummyimage.com/100x100/000/fff&text=STOCK${index + 1}`,
    currentPrice: parseFloat((Math.random() * 5000).toFixed(2)),
    change: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
    data: generateMockStockData(),
  })),
];

// import stockData from "./stock_data.json";

// export const NIFTY500_STOCKS = stockData;
