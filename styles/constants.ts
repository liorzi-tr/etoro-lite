import { Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('screen');

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 20,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
  },
});

export { globalStyles, window };
