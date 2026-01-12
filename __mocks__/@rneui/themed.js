const React = require('react');
const { Switch: RNSwitch } = require('react-native');

module.exports = {
  ListItem: ({ children, ...props }) => React.createElement('View', props, children),
  Overlay: ({ children, isVisible, onBackdropPress, ...props }) =>
    isVisible
      ? React.createElement('View', { ...props, onPress: onBackdropPress }, children)
      : null,
  Input: (props) => React.createElement('TextInput', props),
  Switch: (props) => React.createElement(RNSwitch, props),
};
