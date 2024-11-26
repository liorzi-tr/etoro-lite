import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Cucumbers = ({
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
          strokeWidth="1"
        >
          <Path d="M14.726 2.18c2.16-.683 3.992-.404 5.36.583a5.1 5.1 0 0 1 1.244 1.284c.93 1.38 1.158 3.201.456 5.333c-.693 2.104-2.296 4.545-5.078 7.327c-2.828 2.828-5.304 4.438-7.433 5.112c-2.16.684-3.992.405-5.36-.582a5.1 5.1 0 0 1-1.244-1.284c-.93-1.38-1.158-3.201-.456-5.333c.693-2.104 2.296-4.545 5.078-7.327c2.828-2.828 5.304-4.438 7.433-5.112m.603 1.908c-1.705.54-3.913 1.91-6.621 4.62c-2.664 2.663-4.035 4.843-4.593 6.538a6 6 0 0 0-.305 1.53c3.124-5.112 8.103-9.938 13.188-12.972c-.487 0-1.041.085-1.669.284m3.872.766C13.545 7.884 7.797 13.469 4.746 19.16c2.679-1.493 5.528-3.782 8.11-6.372c2.558-2.566 4.81-5.383 6.345-7.935M6.922 20.196c.507.01 1.087-.074 1.75-.284c1.705-.54 3.913-1.911 6.621-4.62c2.664-2.663 4.035-4.844 4.593-6.538c.215-.653.309-1.228.31-1.732c-1.576 2.391-3.644 4.893-5.923 7.179c-2.297 2.303-4.84 4.42-7.35 5.995" />
        </G>
      </Svg>
    </View>
  );
};

export default Cucumbers;
