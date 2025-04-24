import { createSlice } from '@reduxjs/toolkit';

// Get initial portfolio from localStorage or default to empty
const getInitialPortfolio = () => {
  const savedPortfolio = localStorage.getItem('portfolio');
  return savedPortfolio ? JSON.parse(savedPortfolio) : {
    holdings: {},
    transactions: []
  };
};

const initialState = getInitialPortfolio();

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { cryptoId, type, amount, price, date } = action.payload;
      
      // Add transaction to history
      state.transactions.push({
        id: Date.now().toString(),
        cryptoId,
        type,
        amount,
        price,
        date
      });
      
      // Update holdings
      if (!state.holdings[cryptoId]) {
        state.holdings[cryptoId] = {
          amount: 0,
          avgBuyPrice: 0,
          totalCost: 0
        };
      }
      
      const holding = state.holdings[cryptoId];
      
      if (type === 'buy') {
        // Calculate new average buy price
        const totalCost = holding.totalCost + (amount * price);
        const totalAmount = holding.amount + amount;
        
        holding.amount = totalAmount;
        holding.totalCost = totalCost;
        holding.avgBuyPrice = totalCost / totalAmount;
      } else if (type === 'sell') {
        // Reduce amount, but keep the average buy price
        holding.amount = Math.max(0, holding.amount - amount);
        
        // If amount is 0, reset the holding
        if (holding.amount === 0) {
          holding.totalCost = 0;
          holding.avgBuyPrice = 0;
        }
      }
      
      // Save to localStorage
      localStorage.setItem('portfolio', JSON.stringify(state));
    },
    removeTransaction: (state, action) => {
      const transactionId = action.payload;
      const transaction = state.transactions.find(t => t.id === transactionId);
      
      if (transaction) {
        // Remove transaction
        state.transactions = state.transactions.filter(t => t.id !== transactionId);
        
        // Recalculate holdings
        // This is a simplified approach - for a real app, you'd need to recalculate
        // based on the entire transaction history
        const cryptoId = transaction.cryptoId;
        const holding = state.holdings[cryptoId];
        
        if (transaction.type === 'buy') {
          // Reverse buy transaction
          const newTotalCost = holding.totalCost - (transaction.amount * transaction.price);
          const newAmount = holding.amount - transaction.amount;
          
          if (newAmount > 0) {
            holding.amount = newAmount;
            holding.totalCost = newTotalCost;
            holding.avgBuyPrice = newTotalCost / newAmount;
          } else {
            // If amount becomes 0 or negative, reset the holding
            holding.amount = 0;
            holding.totalCost = 0;
            holding.avgBuyPrice = 0;
          }
        } else if (transaction.type === 'sell') {
          // Reverse sell transaction
          holding.amount += transaction.amount;
        }
        
        // Save to localStorage
        localStorage.setItem('portfolio', JSON.stringify(state));
      }
    },
    clearPortfolio: (state) => {
      state.holdings = {};
      state.transactions = [];
      
      // Save to localStorage
      localStorage.setItem('portfolio', JSON.stringify(state));
    }
  }
});

// Actions
export const {
  addTransaction,
  removeTransaction,
  clearPortfolio
} = portfolioSlice.actions;

// Selectors
export const selectPortfolio = state => state.portfolio;
export const selectHoldings = state => state.portfolio.holdings;
export const selectTransactions = state => state.portfolio.transactions;

export const selectHoldingByCryptoId = (state, cryptoId) => {
  return state.portfolio.holdings[cryptoId] || null;
};

export const selectTransactionsByCryptoId = (state, cryptoId) => {
  return state.portfolio.transactions.filter(t => t.cryptoId === cryptoId);
};

export default portfolioSlice.reducer;
