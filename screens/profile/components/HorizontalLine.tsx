import { View, StyleSheet } from 'react-native';
import { colors } from '../../../styles/constants';

export default function HorizontalLine() {
  return (
    <View
      style={{
        marginVertical: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}
