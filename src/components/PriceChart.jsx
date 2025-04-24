import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { formatNumber } from '../services/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: 5px;
`;

const TimeframeButton = styled.button`
  background: ${({ theme, active }) => active ? theme.colors.primary : 'none'};
  color: ${({ theme, active }) => active ? 'white' : theme.colors.text.secondary};
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, active }) => active ? 'white' : theme.colors.primary};
  }
`;

// Generate mock historical data
const generateHistoricalData = (currentPrice, days, volatility = 0.05) => {
  const data = [];
  let price = currentPrice;
  
  // Generate data points for the specified number of days
  for (let i = days; i >= 0; i--) {
    // Calculate date for this data point
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some random price movement
    const change = (Math.random() - 0.5) * volatility * price;
    price = Math.max(0.01, price + change);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price
    });
  }
  
  return data;
};

const PriceChart = ({ crypto }) => {
  const [timeframe, setTimeframe] = useState('7d');
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    if (!crypto) return;
    
    // Map timeframe to days
    const daysMap = {
      '24h': 1,
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const days = daysMap[timeframe];
    
    // Generate historical data based on current price
    const historicalData = generateHistoricalData(crypto.price, days);
    
    // Prepare data for Chart.js
    const labels = historicalData.map(item => item.date);
    const prices = historicalData.map(item => item.price);
    
    // Determine if price trend is positive or negative
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const isPositive = endPrice >= startPrice;
    
    setChartData({
      labels,
      datasets: [
        {
          label: `${crypto.name} Price (USD)`,
          data: prices,
          borderColor: isPositive ? '#16c784' : '#ea3943',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            if (isPositive) {
              gradient.addColorStop(0, 'rgba(22, 199, 132, 0.5)');
              gradient.addColorStop(1, 'rgba(22, 199, 132, 0)');
            } else {
              gradient.addColorStop(0, 'rgba(234, 57, 67, 0.5)');
              gradient.addColorStop(1, 'rgba(234, 57, 67, 0)');
            }
            return gradient;
          },
          borderWidth: 2,
          pointRadius: timeframe === '24h' ? 3 : 0,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: true
        }
      ]
    });
  }, [crypto, timeframe]);
  
  if (!crypto || !chartData) return null;
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${formatNumber(context.parsed.y)}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6,
          color: '#888'
        }
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.1)'
        },
        ticks: {
          callback: (value) => `$${formatNumber(value)}`,
          color: '#888'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };
  
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Price Chart</ChartTitle>
        <TimeframeSelector>
          <TimeframeButton 
            active={timeframe === '24h'} 
            onClick={() => setTimeframe('24h')}
          >
            24H
          </TimeframeButton>
          <TimeframeButton 
            active={timeframe === '7d'} 
            onClick={() => setTimeframe('7d')}
          >
            7D
          </TimeframeButton>
          <TimeframeButton 
            active={timeframe === '30d'} 
            onClick={() => setTimeframe('30d')}
          >
            30D
          </TimeframeButton>
          <TimeframeButton 
            active={timeframe === '90d'} 
            onClick={() => setTimeframe('90d')}
          >
            90D
          </TimeframeButton>
          <TimeframeButton 
            active={timeframe === '1y'} 
            onClick={() => setTimeframe('1y')}
          >
            1Y
          </TimeframeButton>
        </TimeframeSelector>
      </ChartHeader>
      <div style={{ height: '300px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </ChartContainer>
  );
};

export default PriceChart;
