import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

interface TabLabelProps {
  label?: string;
}

export default function TabLabel({ label }: TabLabelProps) {
  const theme = useSelector(selectTheme);

  return (
    <View
      style={{
        top: 20,
      }}
    >
      <Text style={{ color: theme.textColor, fontSize: 12 }}>
        {label}
      </Text>
    </View>
  );
}
