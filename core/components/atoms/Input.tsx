import React, { useState } from 'react';
import { TextInput, StyleSheet, Keyboard } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface InputProps {
  value: string | number;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  caretHidden?: boolean;
  secureTextEntry?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  style?: object;
}

const Input = ({
  value,
  onChangeText,
  autoFocus = false,
  placeholder,
  keyboardType = 'default',
  caretHidden = false,
  secureTextEntry = false,
  textAlign,
  style,
}: InputProps) => {
  const theme = useSelector(selectTheme);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss();
  };

  return (
    <TextInput
      placeholderTextColor={theme.textInfoColor}
      autoFocus={autoFocus}
      value={value.toString()}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      caretHidden={caretHidden}
      secureTextEntry={secureTextEntry}
      textAlign={textAlign}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.input, { backgroundColor: theme.inputBackgroundColor }, isFocused && styles.focused, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 18,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  focused: {},
});

export default Input;
