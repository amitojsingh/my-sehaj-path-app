module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-linear-gradient|@react-native-community|@react-navigation|react-native-svg|react-native-screens|react-native-safe-area-context|react-native-swipe-gestures|react-native-size-matters|react-native-ratings|@rneui/themed|@rneui/base)/)',
  ],
  moduleNameMapper: {
    '@components': '<rootDir>/components',
    '@constants': '<rootDir>/constants',
    '@styles': '<rootDir>/styles',
    '@utils': '<rootDir>/utils',
    '@hooks': '<rootDir>/hooks',
    '@assets': '<rootDir>/assets',
    '@icons': '<rootDir>/icons',
    '@react-native-async-storage/async-storage':
      '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
    '@react-native-community/netinfo': '<rootDir>/__mocks__/@react-native-community/netInfo.js',
    '@types': '<rootDir>/types',
  },
};
