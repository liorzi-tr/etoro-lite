import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../src/store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Search = ({
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
          strokeWidth="1.8"
        >
          <Path d="m15 15l6 6m-11-4a7 7 0 1 1 0-14a7 7 0 0 1 0 14" />
        </G>
      </Svg>
    </View>
  );
};

export default Search;
