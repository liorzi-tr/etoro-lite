import { Platform, View } from 'react-native';
import PlanixIcon from '../../icons/EtoroIcon';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

interface TabIconProps {
  focused: boolean;
  icon: any;
}

export default function TabIcon({ focused, icon }: TabIconProps) {
  const theme = useSelector(selectTheme);

  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 15 : 0,
      }}
    >
      <PlanixIcon
        iconName={icon}
        size={32}
        color={
          focused
            ? theme.primaryColor
            : theme.textColor
        }
      />
    </View>
  );
}
