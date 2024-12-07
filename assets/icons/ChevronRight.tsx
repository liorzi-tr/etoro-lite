import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../src/store/selectors/themeSelectors';

const ChevronRight = ({
  size = 24,
  hasFill = false,
  fill,
  color,
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
          <Path d="m10 8l4 4l-4 4" />
        </G>
      </Svg>
    </View>
  );
};

export default ChevronRight;
