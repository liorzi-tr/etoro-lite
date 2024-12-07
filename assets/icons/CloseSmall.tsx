import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../src/store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const CloseSmall = ({
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
          <Path d="m16 16l-4-4m0 0L8 8m4 4l4-4m-4 4l-4 4" />
        </G>
      </Svg>
    </View>
  );
};

export default CloseSmall;
