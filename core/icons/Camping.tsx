import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Camping = ({
  size = 24,
  hasFill = false,
  fill,
  color
}: IconProps) => {
  const theme = useSelector(selectTheme);
  return (
    <View>
      <Svg width={size} height={size} viewBox="-6 -6 24 24">
        <G
          fill={hasFill ? fill : 'none'}
          stroke={color || theme.textColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <Path d="M4.67.13a.75.75 0 0 1 1.037.218L7 2.325L8.293.348a.75.75 0 1 1 1.255.82L7.896 3.697l5.973 9.135a.75.75 0 0 1-.627 1.16H8v-3.019a1 1 0 1 0-2 0v3.02H.758a.75.75 0 0 1-.627-1.16l5.973-9.136L4.452 1.17A.75.75 0 0 1 4.669.13Z" />
        </G>
      </Svg>
    </View>
  );
};

export default Camping;
