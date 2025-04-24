import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    theme: themeReducer
  }
});

export default store;
