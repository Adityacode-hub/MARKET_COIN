import { createSlice } from '@reduxjs/toolkit';

// Get initial alerts from localStorage or default to empty array
const getInitialAlerts = () => {
  const savedAlerts = localStorage.getItem('alerts');
  return savedAlerts ? JSON.parse(savedAlerts) : [];
};

const initialState = {
  alerts: getInitialAlerts(),
  showTriggered: true
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push({
        id: Date.now().toString(),
        ...action.payload
      });
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    },
    clearTriggeredAlerts: (state) => {
      state.alerts = state.alerts.filter(alert => !alert.triggered);
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    },
    toggleShowTriggered: (state) => {
      state.showTriggered = !state.showTriggered;
    },
    checkAlerts: (state, action) => {
      const { cryptoId, price } = action.payload;
      
      state.alerts.forEach(alert => {
        if (alert.cryptoId === cryptoId && !alert.triggered) {
          if (
            (alert.condition === 'above' && price >= alert.price) ||
            (alert.condition === 'below' && price <= alert.price)
          ) {
            alert.triggered = true;
            alert.triggerPrice = price;
            alert.triggeredAt = new Date().toISOString();
          }
        }
      });
      
      localStorage.setItem('alerts', JSON.stringify(state.alerts));
    }
  }
});

// Actions
export const {
  addAlert,
  removeAlert,
  clearTriggeredAlerts,
  toggleShowTriggered,
  checkAlerts
} = alertsSlice.actions;

// Selectors
export const selectAllAlerts = state => state.alerts.alerts;
export const selectShowTriggered = state => state.alerts.showTriggered;

export const selectActiveAlerts = state => {
  return state.alerts.alerts.filter(alert => !alert.triggered);
};

export const selectTriggeredAlerts = state => {
  return state.alerts.alerts.filter(alert => alert.triggered);
};

export const selectFilteredAlerts = state => {
  const showTriggered = selectShowTriggered(state);
  const allAlerts = selectAllAlerts(state);
  
  return showTriggered ? allAlerts : allAlerts.filter(alert => !alert.triggered);
};

export const selectAlertsBySymbol = (state, symbol) => {
  return state.alerts.alerts.filter(alert => alert.cryptoSymbol === symbol);
};

export default alertsSlice.reducer;
