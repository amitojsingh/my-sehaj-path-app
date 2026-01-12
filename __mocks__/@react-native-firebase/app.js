module.exports = {
  getApp: jest.fn(() => ({
    name: '[DEFAULT]',
    options: {},
  })),
  apps: [],
  utils: {
    FilePath: {},
  },
};
