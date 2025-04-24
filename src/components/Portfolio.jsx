import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { 
  selectHoldingByCryptoId, 
  selectTransactionsByCryptoId,
  removeTransaction
} from '../store/portfolioSlice';
import { selectSelectedCrypto } from '../store/cryptoSlice';
import { formatNumber } from '../services/mockData';
import { exportPortfolioAsCSV, exportPortfolioAsJSON } from '../utils/exportUtils';

const PortfolioContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

const PortfolioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PortfolioTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ExportButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const HoldingCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
`;

const HoldingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HoldingTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const HoldingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const HoldingItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 10px;
  border-radius: 4px;
`;

const ItemLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 5px;
`;

const ItemValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProfitValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme, value }) => 
    value > 0 
      ? theme.colors.positive 
      : value < 0 
        ? theme.colors.negative 
        : theme.colors.text.primary};
`;

const TransactionsTable = styled.div`
  overflow-x: auto;
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
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TypeCell = styled.td`
  padding: 12px 15px;
  color: ${({ theme, type }) => 
    type === 'buy' ? theme.colors.positive : theme.colors.negative};
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.negative};
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
`;

const Portfolio = () => {
  const dispatch = useDispatch();
  const crypto = useSelector(selectSelectedCrypto);
  const holding = useSelector(state => selectHoldingByCryptoId(state, crypto.id));
  const transactions = useSelector(state => selectTransactionsByCryptoId(state, crypto.id));
  
  const handleRemoveTransaction = (transactionId) => {
    if (window.confirm('Are you sure you want to remove this transaction?')) {
      dispatch(removeTransaction(transactionId));
    }
  };
  
  const handleExportCSV = () => {
    const portfolio = {
      holdings: { [crypto.id]: holding },
      transactions: transactions
    };
    exportPortfolioAsCSV(portfolio, [crypto], `${crypto.symbol}-portfolio`);
  };
  
  const handleExportJSON = () => {
    const portfolio = {
      holdings: { [crypto.id]: holding },
      transactions: transactions
    };
    exportPortfolioAsJSON(portfolio, [crypto], `${crypto.symbol}-portfolio`);
  };
  
  // Calculate portfolio metrics
  const calculateMetrics = () => {
    if (!holding || holding.amount === 0) {
      return {
        totalValue: 0,
        totalCost: 0,
        profit: 0,
        profitPercentage: 0
      };
    }
    
    const totalValue = holding.amount * crypto.price;
    const totalCost = holding.totalCost;
    const profit = totalValue - totalCost;
    const profitPercentage = (profit / totalCost) * 100;
    
    return {
      totalValue,
      totalCost,
      profit,
      profitPercentage
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <PortfolioContainer>
      <PortfolioHeader>
        <PortfolioTitle>{crypto.name} Portfolio</PortfolioTitle>
        <ExportButtons>
          <ExportButton onClick={handleExportCSV}>
            Export as CSV
          </ExportButton>
          <ExportButton onClick={handleExportJSON}>
            Export as JSON
          </ExportButton>
        </ExportButtons>
      </PortfolioHeader>
      
      {holding && holding.amount > 0 ? (
        <HoldingCard>
          <HoldingHeader>
            <HoldingTitle>Current Holdings</HoldingTitle>
          </HoldingHeader>
          
          <HoldingGrid>
            <HoldingItem>
              <ItemLabel>Amount</ItemLabel>
              <ItemValue>{formatNumber(holding.amount)} {crypto.symbol}</ItemValue>
            </HoldingItem>
            
            <HoldingItem>
              <ItemLabel>Average Buy Price</ItemLabel>
              <ItemValue>${formatNumber(holding.avgBuyPrice)}</ItemValue>
            </HoldingItem>
            
            <HoldingItem>
              <ItemLabel>Current Price</ItemLabel>
              <ItemValue>${formatNumber(crypto.price)}</ItemValue>
            </HoldingItem>
            
            <HoldingItem>
              <ItemLabel>Total Value</ItemLabel>
              <ItemValue>${formatNumber(metrics.totalValue)}</ItemValue>
            </HoldingItem>
            
            <HoldingItem>
              <ItemLabel>Total Cost</ItemLabel>
              <ItemValue>${formatNumber(metrics.totalCost)}</ItemValue>
            </HoldingItem>
            
            <HoldingItem>
              <ItemLabel>Profit/Loss</ItemLabel>
              <ProfitValue value={metrics.profit}>
                ${formatNumber(metrics.profit)} ({formatNumber(metrics.profitPercentage)}%)
              </ProfitValue>
            </HoldingItem>
          </HoldingGrid>
        </HoldingCard>
      ) : (
        <EmptyMessage>
          No holdings found. Add a transaction to start tracking your portfolio.
        </EmptyMessage>
      )}
      
      <PortfolioTitle>Transaction History</PortfolioTitle>
      
      {transactions.length > 0 ? (
        <TransactionsTable>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Type</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TypeCell type={transaction.type}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </TypeCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{formatNumber(transaction.amount)} {crypto.symbol}</TableCell>
                  <TableCell>${formatNumber(transaction.price)}</TableCell>
                  <TableCell>${formatNumber(transaction.amount * transaction.price)}</TableCell>
                  <TableCell>
                    <DeleteButton 
                      onClick={() => handleRemoveTransaction(transaction.id)}
                      aria-label="Delete transaction"
                    >
                      ×
                    </DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TransactionsTable>
      ) : (
        <EmptyMessage>
          No transactions found. Add a transaction above.
        </EmptyMessage>
      )}
    </PortfolioContainer>
  );
};

export default Portfolio;
