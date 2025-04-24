import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { 
  selectSelectedCrypto, 
  selectIsCryptoFavorite,
  setSelectedCryptoId
} from '../store/cryptoSlice';
import { formatNumber } from '../services/mockData';
import FavoriteToggle from './FavoriteToggle';
import CryptoIcon from './CryptoIcon';
import PriceChart from './PriceChart';
import { exportAsCSV, exportAsJSON } from '../utils/exportUtils';

const DetailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CryptoNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CryptoName = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CryptoSymbol = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
  margin-left: 5px;
`;

const CryptoRank = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const PriceCard = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: 6px;
`;

const PriceLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 5px;
`;

const PriceValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ChangeValue = styled.div`
  font-size: 16px;
  color: ${({ theme, value }) => 
    value > 0 
      ? theme.colors.positive 
      : value < 0 
        ? theme.colors.negative 
        : theme.colors.text.primary};
  margin-top: 5px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const StatItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: 6px;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text.primary};
  padding: 10px 15px;
  cursor: pointer;
  font-weight: ${({ active }) => active ? '500' : 'normal'};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExportButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ExportButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CryptoDetailView = () => {
  const dispatch = useDispatch();
  const crypto = useSelector(selectSelectedCrypto);
  const isFavorite = useSelector(state => crypto ? selectIsCryptoFavorite(state, crypto.id) : false);
  
  const [activeTab, setActiveTab] = useState('chart');
  
  const handleBack = () => {
    dispatch(setSelectedCryptoId(null));
  };
  
  const handleExportCSV = () => {
    if (crypto) {
      exportAsCSV([crypto], `${crypto.symbol}-data`);
    }
  };
  
  const handleExportJSON = () => {
    if (crypto) {
      exportAsJSON([crypto], `${crypto.symbol}-data`);
    }
  };
  
  if (!crypto) return null;
  
  return (
    <>
      <DetailContainer>
        <Header>
          <BackButton onClick={handleBack}>
            ← Back to all cryptocurrencies
          </BackButton>
          <CryptoInfo>
            <CryptoNameContainer>
              <CryptoIcon symbol={crypto.symbol} name={crypto.name} size="32px" />
              <CryptoName>
                {crypto.name}
                <CryptoSymbol>{crypto.symbol}</CryptoSymbol>
              </CryptoName>
            </CryptoNameContainer>
            <CryptoRank>Rank #{crypto.rank}</CryptoRank>
            <FavoriteToggle cryptoId={crypto.id} />
          </CryptoInfo>
        </Header>
        
        <PriceInfo>
          <PriceCard>
            <PriceLabel>Price</PriceLabel>
            <PriceValue>${formatNumber(crypto.price)}</PriceValue>
          </PriceCard>
          <PriceCard>
            <PriceLabel>1h Change</PriceLabel>
            <ChangeValue value={crypto.percentChange1h}>
              {crypto.percentChange1h > 0 ? '+' : ''}{formatNumber(crypto.percentChange1h)}%
            </ChangeValue>
          </PriceCard>
          <PriceCard>
            <PriceLabel>24h Change</PriceLabel>
            <ChangeValue value={crypto.percentChange24h}>
              {crypto.percentChange24h > 0 ? '+' : ''}{formatNumber(crypto.percentChange24h)}%
            </ChangeValue>
          </PriceCard>
          <PriceCard>
            <PriceLabel>7d Change</PriceLabel>
            <ChangeValue value={crypto.percentChange7d}>
              {crypto.percentChange7d > 0 ? '+' : ''}{formatNumber(crypto.percentChange7d)}%
            </ChangeValue>
          </PriceCard>
        </PriceInfo>
        
        <StatsGrid>
          <StatItem>
            <StatLabel>Market Cap</StatLabel>
            <StatValue>${formatNumber(crypto.marketCap)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Volume (24h)</StatLabel>
            <StatValue>${formatNumber(crypto.volume24h)}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Circulating Supply</StatLabel>
            <StatValue>{formatNumber(crypto.circulatingSupply)} {crypto.symbol}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Max Supply</StatLabel>
            <StatValue>
              {crypto.maxSupply ? `${formatNumber(crypto.maxSupply)} ${crypto.symbol}` : 'Unlimited'}
            </StatValue>
          </StatItem>
        </StatsGrid>
        
        <ExportButtonsContainer>
          <ExportButton onClick={handleExportCSV}>
            Export as CSV
          </ExportButton>
          <ExportButton onClick={handleExportJSON}>
            Export as JSON
          </ExportButton>
        </ExportButtonsContainer>
        
        <TabsContainer>
          <TabButton 
            active={activeTab === 'chart'} 
            onClick={() => setActiveTab('chart')}
          >
            Price Chart
          </TabButton>
          <TabButton 
            active={activeTab === 'markets'} 
            onClick={() => setActiveTab('markets')}
          >
            Markets
          </TabButton>
          <TabButton 
            active={activeTab === 'historical'} 
            onClick={() => setActiveTab('historical')}
          >
            Historical Data
          </TabButton>
        </TabsContainer>
        
        {activeTab === 'chart' && (
          <PriceChart crypto={crypto} />
        )}
        
        {activeTab === 'markets' && (
          <div>
            <h3>Markets for {crypto.name}</h3>
            <p>Exchange data for {crypto.name} would be displayed here.</p>
          </div>
        )}
        
        {activeTab === 'historical' && (
          <div>
            <h3>Historical Data for {crypto.name}</h3>
            <p>Historical price charts for {crypto.name} would be displayed here.</p>
          </div>
        )}
      </DetailContainer>
    </>
  );
};

export default CryptoDetailView;
