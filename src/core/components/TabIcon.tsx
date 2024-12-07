import { Platform, View } from 'react-native';
import EtoroIcon from '../../../assets/icons/EtoroIcon';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

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
      <EtoroIcon
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
