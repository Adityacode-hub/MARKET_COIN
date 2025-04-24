import { updateCryptoPrice } from './cryptoSlice';
import { triggerAlert, selectActiveAlerts } from './alertsSlice';

// Middleware to check for price alerts when crypto prices are updated
const alertsMiddleware = store => next => action => {
  // First, let the action go through
  const result = next(action);
  
  // Check if this is a price update action
  if (action.type === updateCryptoPrice.type) {
    const { id, price } = action.payload;
    
    // Get the current state
    const state = store.getState();
    const crypto = state.crypto.cryptoData.find(c => c.id === id);
    
    if (crypto && price) {
      // Get active alerts
      const activeAlerts = selectActiveAlerts(state);
      
      // Check each alert
      activeAlerts.forEach(alert => {
        // Only check alerts for this crypto
        if (alert.cryptoId === id || alert.cryptoSymbol === crypto.symbol) {
          // Check if the price condition is met
          if (alert.condition === 'above' && price >= alert.price) {
            store.dispatch(triggerAlert({ id: alert.id, currentPrice: price }));
          } else if (alert.condition === 'below' && price <= alert.price) {
            store.dispatch(triggerAlert({ id: alert.id, currentPrice: price }));
          }
        }
      });
    }
  }
  
  return result;
};

export default alertsMiddleware;
