import React from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface MinusButtonProps {
  onPress: () => void;
}

const MinusButton = ({ onPress }: MinusButtonProps) => {
  const theme = useSelector(selectTheme);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: theme.primaryColor }]}>
        <Octicons
          name="dash"
          size={Platform.OS === 'ios' ? 20 : 20}
          color={theme.buttonTextColor}
          style={{ opacity: 1, fontWeight: 'bold' }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MinusButton;
