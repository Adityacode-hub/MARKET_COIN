// Mock WebSocket service to simulate real-time price updates

class MockWebSocketService {
  constructor(updateCallback, interval = 3000) {
    this.updateCallback = updateCallback;
    this.interval = interval;
    this.intervalId = null;
    this.isConnected = false;
  }

  connect() {
    if (this.isConnected) return;
    
    this.isConnected = true;
    console.log('Mock WebSocket connected');
    
    this.intervalId = setInterval(() => {
      this.generateRandomUpdate();
    }, this.interval);
  }

  disconnect() {
    if (!this.isConnected) return;
    
    clearInterval(this.intervalId);
    this.isConnected = false;
    console.log('Mock WebSocket disconnected');
  }

  generateRandomUpdate() {
    // Get current data from the callback
    const cryptoData = this.updateCallback(null, 'GET_CURRENT');
    
    if (!cryptoData || cryptoData.length === 0) return;
    
    // Randomly select a cryptocurrency to update
    const randomIndex = Math.floor(Math.random() * cryptoData.length);
    const cryptoToUpdate = cryptoData[randomIndex];
    
    // Generate random price change (between -2% and +2%)
    const priceChangePercent = (Math.random() * 4 - 2) / 100;
    const newPrice = cryptoToUpdate.price * (1 + priceChangePercent);
    
    // Generate random percentage changes
    const percentChange1h = cryptoToUpdate.percentChange1h + (Math.random() * 0.4 - 0.2);
    const percentChange24h = cryptoToUpdate.percentChange24h + (Math.random() * 0.6 - 0.3);
    const percentChange7d = cryptoToUpdate.percentChange7d + (Math.random() * 0.8 - 0.4);
    
    // Generate random volume change (between -5% and +5%)
    const volumeChangePercent = (Math.random() * 10 - 5) / 100;
    const newVolume = cryptoToUpdate.volume24h * (1 + volumeChangePercent);
    
    // Send update to the callback
    this.updateCallback({
      type: 'PRICE_UPDATE',
      data: {
        id: cryptoToUpdate.id,
        price: newPrice,
        percentChange1h: percentChange1h,
        percentChange24h: percentChange24h,
        percentChange7d: percentChange7d,
        volume24h: newVolume
      }
    });
  }
}

export default MockWebSocketService;
