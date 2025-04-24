// Generate mock cryptocurrency data
export const initialCryptoData = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 50000 + Math.random() * 5000,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 950000000000 + Math.random() * 50000000000,
    volume24h: 30000000000 + Math.random() * 10000000000,
    circulatingSupply: 19000000 + Math.random() * 100000,
    maxSupply: 21000000
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3000 + Math.random() * 500,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 350000000000 + Math.random() * 20000000000,
    volume24h: 15000000000 + Math.random() * 5000000000,
    circulatingSupply: 120000000 + Math.random() * 1000000,
    maxSupply: null
  },
  {
    id: 'binancecoin',
    rank: 3,
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 400 + Math.random() * 50,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 65000000000 + Math.random() * 5000000000,
    volume24h: 2000000000 + Math.random() * 500000000,
    circulatingSupply: 160000000 + Math.random() * 1000000,
    maxSupply: 200000000
  },
  {
    id: 'cardano',
    rank: 4,
    name: 'Cardano',
    symbol: 'ADA',
    price: 1.2 + Math.random() * 0.3,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 40000000000 + Math.random() * 3000000000,
    volume24h: 1500000000 + Math.random() * 500000000,
    circulatingSupply: 33000000000 + Math.random() * 100000000,
    maxSupply: 45000000000
  },
  {
    id: 'solana',
    rank: 5,
    name: 'Solana',
    symbol: 'SOL',
    price: 100 + Math.random() * 20,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 35000000000 + Math.random() * 3000000000,
    volume24h: 2500000000 + Math.random() * 500000000,
    circulatingSupply: 350000000 + Math.random() * 10000000,
    maxSupply: null
  },
  {
    id: 'ripple',
    rank: 6,
    name: 'XRP',
    symbol: 'XRP',
    price: 0.8 + Math.random() * 0.2,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 38000000000 + Math.random() * 2000000000,
    volume24h: 3000000000 + Math.random() * 1000000000,
    circulatingSupply: 46000000000 + Math.random() * 100000000,
    maxSupply: 100000000000
  },
  {
    id: 'polkadot',
    rank: 7,
    name: 'Polkadot',
    symbol: 'DOT',
    price: 20 + Math.random() * 5,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 20000000000 + Math.random() * 2000000000,
    volume24h: 1000000000 + Math.random() * 300000000,
    circulatingSupply: 1000000000 + Math.random() * 50000000,
    maxSupply: null
  },
  {
    id: 'dogecoin',
    rank: 8,
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.15 + Math.random() * 0.05,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 19000000000 + Math.random() * 1000000000,
    volume24h: 1200000000 + Math.random() * 300000000,
    circulatingSupply: 130000000000 + Math.random() * 1000000000,
    maxSupply: null
  },
  {
    id: 'avalanche',
    rank: 9,
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 70 + Math.random() * 10,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 17000000000 + Math.random() * 1000000000,
    volume24h: 800000000 + Math.random() * 200000000,
    circulatingSupply: 240000000 + Math.random() * 5000000,
    maxSupply: 720000000
  },
  {
    id: 'terra-luna',
    rank: 10,
    name: 'Terra',
    symbol: 'LUNA',
    price: 85 + Math.random() * 15,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 30000000000 + Math.random() * 2000000000,
    volume24h: 2000000000 + Math.random() * 500000000,
    circulatingSupply: 350000000 + Math.random() * 10000000,
    maxSupply: 1000000000
  },
  {
    id: 'chainlink',
    rank: 11,
    name: 'Chainlink',
    symbol: 'LINK',
    price: 25 + Math.random() * 5,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 12000000000 + Math.random() * 1000000000,
    volume24h: 1000000000 + Math.random() * 300000000,
    circulatingSupply: 460000000 + Math.random() * 10000000,
    maxSupply: 1000000000
  },
  {
    id: 'litecoin',
    rank: 12,
    name: 'Litecoin',
    symbol: 'LTC',
    price: 150 + Math.random() * 20,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 10000000000 + Math.random() * 1000000000,
    volume24h: 1500000000 + Math.random() * 500000000,
    circulatingSupply: 67000000 + Math.random() * 1000000,
    maxSupply: 84000000
  },
  {
    id: 'uniswap',
    rank: 13,
    name: 'Uniswap',
    symbol: 'UNI',
    price: 20 + Math.random() * 5,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 9000000000 + Math.random() * 1000000000,
    volume24h: 300000000 + Math.random() * 100000000,
    circulatingSupply: 450000000 + Math.random() * 10000000,
    maxSupply: 1000000000
  },
  {
    id: 'algorand',
    rank: 14,
    name: 'Algorand',
    symbol: 'ALGO',
    price: 1.5 + Math.random() * 0.3,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 9000000000 + Math.random() * 500000000,
    volume24h: 300000000 + Math.random() * 100000000,
    circulatingSupply: 6000000000 + Math.random() * 100000000,
    maxSupply: 10000000000
  },
  {
    id: 'stellar',
    rank: 15,
    name: 'Stellar',
    symbol: 'XLM',
    price: 0.3 + Math.random() * 0.05,
    percentChange1h: Math.random() * 2 - 1,
    percentChange24h: Math.random() * 10 - 5,
    percentChange7d: Math.random() * 20 - 10,
    marketCap: 7500000000 + Math.random() * 500000000,
    volume24h: 500000000 + Math.random() * 100000000,
    circulatingSupply: 24000000000 + Math.random() * 100000000,
    maxSupply: 50000000000
  }
];

// Format number with commas and limit decimal places
export const formatNumber = (num, maxDecimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  
  // Determine appropriate number of decimal places based on the value
  let decimals = maxDecimals;
  if (Math.abs(num) < 0.01 && num !== 0) {
    decimals = 6;
  } else if (Math.abs(num) < 1 && num !== 0) {
    decimals = 4;
  }
  
  // Format the number
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  }).format(num);
};
