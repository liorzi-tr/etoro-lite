import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Oranges = ({
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
          <Path d="M20.5 14c0 4.418-3.806 8-8.5 8s-8.5-3.582-8.5-8S7.306 6 12 6s8.5 3.582 8.5 8M12 6c0-1.333.6-4 3-4m-3 4c-.5-1.167 0-4-6-4c.333 1 1 4 6 4" />
        </G>
      </Svg>
    </View>
  );
};

export default Oranges;
