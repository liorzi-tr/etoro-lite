import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Eggs = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const theme = useSelector(selectTheme);
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || theme.textColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path d="M12 4.318c2.246-1.973 5.019-2.983 7.175-1.834c3.357 1.788 3.54 7.917 1.509 12.08c-.853 1.749-1.98 2.861-3.242 3.436M15 15.5c0 4.418-2.91 6.5-6.5 6.5S2 19.918 2 15.5S4.786 6 8.5 6s6.5 5.082 6.5 9.5" />
        </G>
      </Svg>
    </View>
  );
};

export default Eggs;
