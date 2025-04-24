// Real-time data service using polling
import MockWebSocketService from './mockWebSocket';

class RealTimeDataService {
  constructor(updateCallback, interval = 30000) {
    // For now, we'll use the mock service
    // In a real app, this would be replaced with actual API calls
    this.service = new MockWebSocketService(updateCallback, interval);
  }

  connect() {
    this.service.connect();
  }

  disconnect() {
    this.service.disconnect();
  }
}

export default RealTimeDataService;
