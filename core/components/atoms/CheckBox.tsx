import React, { useState } from 'react';
import { View, Animated, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface CheckboxProps {
  checked?: boolean;
  onPress?: () => void;
  style?: object;
}

const Checkbox = ({ checked = false, onPress, style }: CheckboxProps) => {
  const theme = useSelector(selectTheme);
  const [scale] = useState(new Animated.Value(checked ? 1 : 0));
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    Animated.timing(scale, {
      toValue: isChecked ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsChecked(!isChecked);

    onPress && onPress();
  };

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        handlePress();
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: theme.primaryColor,
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
      >
        <Animated.View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: theme.primaryColor,
            transform: [{ scale }],
          }}
        />
      </View>
    </Pressable>
  );
};

export default Checkbox;
