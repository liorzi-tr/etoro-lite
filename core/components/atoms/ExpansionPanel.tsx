import { ReactNode, useState } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface ExpansionPanelProps {
  title: string;
  children: ReactNode;
  onPress?: () => void;
}

const ExpansionPanel = ({ title, children, onPress }: ExpansionPanelProps) => {
  const theme = useSelector(selectTheme);
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpansion = () => {
    setExpanded(!expanded);
    !expanded &&
      Animated.timing(animation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    expanded &&
      Animated.timing(animation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start();

    onPress && onPress();
  };

  const panelHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.inputBackgroundColor }]}>
      <Pressable onPress={toggleExpansion}>
        <Animated.View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
          <Octicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={theme.textColor}
          />
        </Animated.View>
      </Pressable>
      <Animated.View style={{ height: panelHeight, overflow: 'hidden' }}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
};

export default ExpansionPanel;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 14,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    fontSize: 18,
  },
});
