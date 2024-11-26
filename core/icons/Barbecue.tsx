import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Barbecue = ({
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
          <Path d="M6 4c0-1 2-1 2-2m4 2c0-1 2-1 2-2m4 2c0-1 2-1 2-2M3 8a9.06 9 0 0 0 18 0Zm6.2 7.6l-1.3 2.6" />
          <Circle cx="7" cy="20" r="2" />
          <Path d="M9 20h8m-2.2-4.4L18 22" />
        </G>
      </Svg>
    </View>
  );
};

export default Barbecue;
