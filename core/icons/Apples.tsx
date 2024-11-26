import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Apples = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const theme = useSelector(selectTheme);
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 22 22">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || theme.textColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <Path d="m14.875 6.612l.05-.05a3.23 3.23 0 0 0 .95-2.58a.976.976 0 0 0-.9-.9a3.23 3.23 0 0 0-2.58.95a3.3 3.3 0 0 0-.85 1.46a4.66 4.66 0 0 0-2.69-1.75a.5.5 0 1 0-.22.98a3.66 3.66 0 0 1 2.59 2.2a5.6 5.6 0 0 0-1.9-.32a5.847 5.847 0 0 0-5.84 5.84c0 2.98 2.41 8.49 5.84 8.49a5.8 5.8 0 0 0 2.4-.52a.68.68 0 0 1 .56 0a5.7 5.7 0 0 0 2.38.52c3.44 0 5.85-5.51 5.85-8.49a5.84 5.84 0 0 0-5.64-5.83m-1.77-1.87a2.3 2.3 0 0 1 1.78-.68c0 .06.01.12.01.17a2.33 2.33 0 0 1-.67 1.63a2.36 2.36 0 0 1-1.79.66a2.25 2.25 0 0 1 .67-1.78m1.56 15.19a4.8 4.8 0 0 1-1.97-.43a1.7 1.7 0 0 0-.69-.15a1.65 1.65 0 0 0-.69.15a4.9 4.9 0 0 1-1.99.43c-2.58 0-4.84-4.67-4.84-7.49a4.855 4.855 0 0 1 6.83-4.42a1.6 1.6 0 0 0 .67.15h.02a1.7 1.7 0 0 0 .69-.15a4.8 4.8 0 0 1 1.97-.42a4.85 4.85 0 0 1 4.85 4.84c0 2.82-2.27 7.49-4.85 7.49" />
        </G>
      </Svg>
    </View>
  );
};

export default Apples;
