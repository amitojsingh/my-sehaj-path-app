const mockAnalytics = {
  logEvent: jest.fn(() => Promise.resolve()),
  setAnalyticsCollectionEnabled: jest.fn(() => Promise.resolve()),
  logScreenView: jest.fn(() => Promise.resolve()),
  setUserId: jest.fn(() => Promise.resolve()),
  setUserProperties: jest.fn(() => Promise.resolve()),
};

module.exports = {
  getAnalytics: jest.fn(() => mockAnalytics),
  getAppInstanceId: jest.fn(() => Promise.resolve('mock-instance-id')),
  logEvent: jest.fn(() => Promise.resolve()),
  setAnalyticsCollectionEnabled: jest.fn(() => Promise.resolve()),
  logScreenView: jest.fn(() => Promise.resolve()),
};
