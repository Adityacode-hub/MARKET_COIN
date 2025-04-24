import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCryptoPrice, selectAllCryptos } from '../store/cryptoSlice';

// This component doesn't render anything, it just manages the WebSocket connection
const WebSocketController = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectAllCryptos);
  
  useEffect(() => {
    // Simulate WebSocket connection with setInterval
    const interval = setInterval(() => {
      // Update a random crypto with new price data
      if (cryptos.length > 0) {
        const randomIndex = Math.floor(Math.random() * cryptos.length);
        const crypto = cryptos[randomIndex];
        
        // Generate random price changes
        const priceChange = crypto.price * (Math.random() * 0.02 - 0.01); // -1% to +1%
        const newPrice = Math.max(0.01, crypto.price + priceChange);
        
        // Update 1h, 24h, and 7d percent changes
        const percentChange1h = crypto.percentChange1h + (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
        const percentChange24h = crypto.percentChange24h + (Math.random() * 0.6 - 0.3); // -0.3% to +0.3%
        const percentChange7d = crypto.percentChange7d + (Math.random() * 1 - 0.5); // -0.5% to +0.5%
        
        // Update volume
        const volumeChange = crypto.volume24h * (Math.random() * 0.04 - 0.02); // -2% to +2%
        const newVolume = Math.max(1000, crypto.volume24h + volumeChange);
        
        // Dispatch update action
        dispatch(updateCryptoPrice({
          id: crypto.id,
          price: newPrice,
          percentChange1h,
          percentChange24h,
          percentChange7d,
          volume24h: newVolume
        }));
      }
    }, 3000); // Update every 3 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [dispatch, cryptos]);
  
  // This component doesn't render anything
  return null;
};

export default WebSocketController;
