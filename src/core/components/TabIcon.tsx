import { Platform, View } from 'react-native';
import EtoroIcon from '../../../assets/icons/EtoroIcon';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';

interface TabIconProps {
  focused: boolean;
  icon: any;
  size?: number;
  hasFill?: boolean;
  fill?: string;
}

export default function TabIcon({ focused, icon, size = 32, hasFill = false, fill = 'none' }: TabIconProps) {
  const theme = useSelector(selectTheme);

  return (
    <View
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 15 : 0,
      }}
    >
      <EtoroIcon
        hasFill={hasFill}
        iconName={icon}
        size={size}
        color={
          focused
            ? theme.primaryColor
            : theme.textInfoColor
        }
        fill={fill}
      />
    </View>
  );
}