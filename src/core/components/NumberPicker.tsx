import { View, StyleSheet } from 'react-native';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';
import Input from './Input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

interface NumberPickerProps {
  value: number;
  onValueChange: (value: number) => void;
  style?: object;
}

const NumberPicker = ({ value, onValueChange, style }: NumberPickerProps) => {
  const theme = useSelector(selectTheme);
  const [number, setNumber] = useState(value);

  const incrementNumber = () => {
    setNumber(number + 1);
  };

  const decrementNumber = () => {
    if (number === 0) return;
    setNumber(number - 1);
  };

  return (
    <View style={[styles.container, style]}>
      <MinusButton onPress={decrementNumber} />
      <Input
        value={number}
        keyboardType="numeric"
        caretHidden={true}
        style={[styles.input, { color: theme.textColor }]}
        onChangeText={(text) => onValueChange(parseInt(text, 10))}
      ></Input>
      <PlusButton onPress={incrementNumber} />
    </View>
  );
};

export default NumberPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24,
    minWidth: 50,
  },
});
