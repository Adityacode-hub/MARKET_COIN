import { createSlice } from '@reduxjs/toolkit';
import { initialCryptoData } from '../services/mockData';

const initialState = {
  data: initialCryptoData,
  loading: false,
  error: null,
  selectedCryptoId: null,
  favorites: [],
  searchTerm: '',
  showOnlyFavorites: false,
  sortConfig: {
    key: 'rank',
    direction: 'asc'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10
  }
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCryptoData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateCryptoPrice: (state, action) => {
      const { id, price, percentChange1h, percentChange24h, percentChange7d, volume24h } = action.payload;
      const cryptoIndex = state.data.findIndex(crypto => crypto.id === id);
      
      if (cryptoIndex !== -1) {
        state.data[cryptoIndex].price = price;
        state.data[cryptoIndex].percentChange1h = percentChange1h;
        state.data[cryptoIndex].percentChange24h = percentChange24h;
        state.data[cryptoIndex].percentChange7d = percentChange7d;
        state.data[cryptoIndex].volume24h = volume24h;
      }
    },
    setSelectedCryptoId: (state, action) => {
      state.selectedCryptoId = action.payload;
    },
    toggleFavorite: (state, action) => {
      const cryptoId = action.payload;
      const index = state.favorites.indexOf(cryptoId);
      
      if (index === -1) {
        state.favorites.push(cryptoId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    toggleShowOnlyFavorites: (state) => {
      state.showOnlyFavorites = !state.showOnlyFavorites;
      state.pagination.currentPage = 1; // Reset to first page when toggling filter
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.pagination.currentPage = 1; // Reset to first page on search
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when changing items per page
    }
  }
});

// Actions
export const {
  setLoading,
  setError,
  setCryptoData,
  updateCryptoPrice,
  setSelectedCryptoId,
  toggleFavorite,
  toggleShowOnlyFavorites,
  setSearchTerm,
  setSortConfig,
  setCurrentPage,
  setItemsPerPage
} = cryptoSlice.actions;

// Selectors
export const selectAllCryptos = state => state.crypto.data;
export const selectLoading = state => state.crypto.loading;
export const selectError = state => state.crypto.error;
export const selectSelectedCryptoId = state => state.crypto.selectedCryptoId;
export const selectFavorites = state => state.crypto.favorites;
export const selectSearchTerm = state => state.crypto.searchTerm;
export const selectSortConfig = state => state.crypto.sortConfig;
export const selectPagination = state => state.crypto.pagination;

export const selectSelectedCrypto = state => {
  const selectedId = selectSelectedCryptoId(state);
  return selectedId ? state.crypto.data.find(crypto => crypto.id === selectedId) : null;
};

export const selectIsCryptoFavorite = (state, cryptoId) => {
  return state.crypto.favorites.includes(cryptoId);
};

export const selectFilteredCryptos = state => {
  const allCryptos = selectAllCryptos(state);
  const searchTerm = selectSearchTerm(state).toLowerCase();
  const favorites = selectFavorites(state);
  const showOnlyFavorites = state.crypto.showOnlyFavorites;
  
  return allCryptos.filter(crypto => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      crypto.name.toLowerCase().includes(searchTerm) || 
      crypto.symbol.toLowerCase().includes(searchTerm);
    
    // Filter by favorites
    const matchesFavorites = !showOnlyFavorites || favorites.includes(crypto.id);
    
    return matchesSearch && matchesFavorites;
  });
};

export const selectSortedCryptos = state => {
  const filteredCryptos = selectFilteredCryptos(state);
  const { key, direction } = selectSortConfig(state);
  
  return [...filteredCryptos].sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const selectPaginatedCryptos = state => {
  const sortedCryptos = selectSortedCryptos(state);
  const { currentPage, itemsPerPage } = selectPagination(state);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return sortedCryptos.slice(startIndex, endIndex);
};

export const selectTotalPages = state => {
  const filteredCryptos = selectFilteredCryptos(state);
  const { itemsPerPage } = selectPagination(state);
  
  return Math.ceil(filteredCryptos.length / itemsPerPage);
};

export default cryptoSlice.reducer;
