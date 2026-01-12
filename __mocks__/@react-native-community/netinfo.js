export default {
  fetch: jest.fn(() =>
    Promise.resolve({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
      details: {
        isConnectionExpensive: false,
      },
    })
  ),
  addEventListener: jest.fn((callback) => {
    // Simulate a network state change
    callback({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
      details: {
        isConnectionExpensive: false,
      },
    });
    // Return unsubscribe function
    return () => {};
  }),
  configure: jest.fn(),
  useNetInfo: jest.fn(() => ({
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true,
    details: {
      isConnectionExpensive: false,
    },
  })),
};
