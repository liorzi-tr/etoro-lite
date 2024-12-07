import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

interface OTPInputProps {
  length: number;
  onCodeFilled: (code: string) => void;
}

const OTPInput = ({ length, onCodeFilled }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if not the last
      if (index < length - 1) {
        inputsRef.current[index + 1].focus();
      }

      // If all digits are filled, call the callback
      if (newOtp.every((digit) => digit !== '')) {
        onCodeFilled(newOtp.join(''));
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] !== '') {
        // If current field has a digit, clear it
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, move to previous field and clear it
        inputsRef.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleOnFocus = (index: number) => {
    // Optionally, select the content when focused
    inputsRef.current[index].setNativeProps({ selection: { start: 0, end: 1 } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {Array.from({ length }, (_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              if (ref) inputsRef.current[index] = ref;
            }}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            value={otp[index]}
            autoFocus={index === 0}
            returnKeyType="done"
            textContentType="oneTimeCode"
            onFocus={() => handleOnFocus(index)}
            // Allow user to tap on any field to focus
            selectionColor="#000" // Optional: customize selection color
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#000',
    width: 40,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    color: '#000', // Ensure text color is visible
  },
  timerContainer: {
    marginTop: 20,
  },
  timerText: {
    color: 'gray',
  },
  resendText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default OTPInput;
