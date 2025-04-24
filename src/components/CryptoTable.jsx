import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  selectPaginatedCryptos, 
  selectSortConfig, 
  setSortConfig, 
  setSelectedCryptoId 
} from '../store/cryptoSlice';
import { formatNumber } from '../services/mockData';
import FavoriteToggle from './FavoriteToggle';
import CryptoIcon from './CryptoIcon';

const TableContainer = styled.div`
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.tr`
  cursor: pointer;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  cursor: ${({ sortable }) => sortable ? 'pointer' : 'default'};
  user-select: none;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme, sortable }) => sortable ? theme.colors.primary : theme.colors.text.secondary};
  }
`;

const SortIcon = styled.span`
  margin-left: 5px;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`;

const ChangeCell = styled.td`
  padding: 12px 15px;
  color: ${({ theme, value }) => 
    value > 0 
      ? theme.colors.positive 
      : value < 0 
        ? theme.colors.negative 
        : theme.colors.text.primary};
  white-space: nowrap;
`;

const CryptoName = styled.div`
  display: flex;
  align-items: center;
`;

const CryptoNameText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CryptoSymbol = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-top: 2px;
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.negative}22;
  color: ${({ theme }) => theme.colors.negative};
  border-radius: 4px;
  margin-bottom: 20px;
`;

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectPaginatedCryptos);
  const { key: sortKey, direction: sortDirection } = useSelector(selectSortConfig);
  const loading = useSelector(state => state.crypto.loading);
  const error = useSelector(state => state.crypto.error);
  
  const handleSort = (key) => {
    // If clicking the same column, toggle direction
    if (key === sortKey) {
      dispatch(setSortConfig({
        key,
        direction: sortDirection === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      // If clicking a new column, sort desc by default
      dispatch(setSortConfig({
        key,
        direction: 'desc'
      }));
    }
  };
  
  const renderSortIcon = (key) => {
    if (key !== sortKey) return null;
    
    return (
      <SortIcon>
        {sortDirection === 'asc' ? '↑' : '↓'}
      </SortIcon>
    );
  };
  
  const handleRowClick = (cryptoId) => {
    dispatch(setSelectedCryptoId(cryptoId));
  };
  
  if (loading) {
    return <LoadingOverlay>Loading cryptocurrency data...</LoadingOverlay>;
  }
  
  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }
  
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Favorite</TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('rank')}
            >
              # {renderSortIcon('rank')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('name')}
            >
              Name {renderSortIcon('name')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('price')}
            >
              Price {renderSortIcon('price')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('percentChange1h')}
            >
              1h % {renderSortIcon('percentChange1h')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('percentChange24h')}
            >
              24h % {renderSortIcon('percentChange24h')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('percentChange7d')}
            >
              7d % {renderSortIcon('percentChange7d')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('marketCap')}
            >
              Market Cap {renderSortIcon('marketCap')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('volume24h')}
            >
              Volume (24h) {renderSortIcon('volume24h')}
            </TableHeader>
            <TableHeader 
              sortable 
              onClick={() => handleSort('circulatingSupply')}
            >
              Circulating Supply {renderSortIcon('circulatingSupply')}
            </TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {cryptos.map(crypto => (
            <TableRow 
              key={crypto.id}
              onClick={() => handleRowClick(crypto.id)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <FavoriteToggle cryptoId={crypto.id} />
              </TableCell>
              <TableCell>{crypto.rank}</TableCell>
              <TableCell>
                <CryptoName>
                  <CryptoIcon symbol={crypto.symbol} name={crypto.name} size="24px" />
                  <CryptoNameText>
                    {crypto.name}
                    <CryptoSymbol>{crypto.symbol}</CryptoSymbol>
                  </CryptoNameText>
                </CryptoName>
              </TableCell>
              <TableCell>${formatNumber(crypto.price)}</TableCell>
              <ChangeCell value={crypto.percentChange1h}>
                {formatNumber(crypto.percentChange1h)}%
              </ChangeCell>
              <ChangeCell value={crypto.percentChange24h}>
                {formatNumber(crypto.percentChange24h)}%
              </ChangeCell>
              <ChangeCell value={crypto.percentChange7d}>
                {formatNumber(crypto.percentChange7d)}%
              </ChangeCell>
              <TableCell>${formatNumber(crypto.marketCap)}</TableCell>
              <TableCell>${formatNumber(crypto.volume24h)}</TableCell>
              <TableCell>
                {formatNumber(crypto.circulatingSupply)} {crypto.symbol}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CryptoTable;
