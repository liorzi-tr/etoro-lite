import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

interface TabLabelProps {
  focused: boolean;
  label?: string;
}

export default function TabLabel({ focused, label }: TabLabelProps) {
  const theme = useSelector(selectTheme);

  return (
    <View
      style={{
        top: 20,
      }}
    >
      <Text style={{ color: focused ? theme.primaryColor : theme.textInfoColor, fontSize: 12 }}>
        {label}
      </Text>
    </View>
  );
}
