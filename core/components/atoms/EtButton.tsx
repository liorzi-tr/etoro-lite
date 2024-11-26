import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import PlanixIcon from '../../icons/PlanixIcon';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface EtButtonProps {
  title?: string;
  style?: any;
  color?: string;
  textColor?: string;
  border?: boolean;
  pill?: boolean;
  icon?: string;
  iconColor?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const EtButton = ({
  title,
  style,
  color,
  textColor,
  border,
  pill = true,
  icon,
  iconColor,
  disabled,
  onPress,
}: EtButtonProps) => {
  const theme = useSelector(selectTheme);
  const animation = useRef(new Animated.Value(disabled ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: disabled ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [disabled]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', color || theme.primaryColor],
  });

  return (
    <Animated.View style={
      [
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderRadius: pill ? 32 : 8,
          borderColor: border ? theme.borderColor : 'gray', borderWidth: border ? 0.5 : 0,
        },
        style
      ]
    }>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={{  }}

      >
        {icon && <PlanixIcon iconName={icon} size={20} color={iconColor} />}
        <Text style={{ ...styles.buttonText, color: textColor ? textColor : theme.buttonTextColor }}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EtButton;
