import React, { PropsWithChildren } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import EtoroIcon from '../../../../assets/icons/EtoroIcon';

interface Props {
  label: string;
  iconLeft: any;
  iconRight: any;
  color?: string;
  iconLeftSize?: number;
  iconRightSize?: number;
  onPress?: () => void;
}

const SectionButton = ({
  label,
  iconLeft,
  iconRight,
  color,
  iconLeftSize = 24,
  iconRightSize = 24,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <EtoroIcon iconName={iconLeft} size={iconLeftSize} />
        <Text style={[styles.label, { color: color }]}>{label}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EtoroIcon iconName={iconRight} size={iconRightSize} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'normal',
    marginLeft: 10,
  },
});

export default SectionButton;
