import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../src/store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const User = ({
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
          fill={theme.textInfoColor}
          stroke={color || theme.textColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path fill={color ? color : theme.textInfoColor} d="M20 21c0-2.761-3.582-5-8-5s-8 2.239-8 5m8-8a5 5 0 1 1 0-10a5 5 0 0 1 0 10" />
        </G>
      </Svg>
    </View>
  );
};

export default User;
