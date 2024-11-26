import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Birthday = ({
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
          strokeWidth="1.2"
        >
          <Path d="M17 10a4 4 0 0 1 4 4v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a4 4 0 0 1 4-4V7h2v3h2V7h2v3h2V7h2zM7 12a2 2 0 0 0-2 2v1h14v-1a2 2 0 0 0-2-2zm-2 5v2h14v-2zM7 4a1 1 0 0 0 1-1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0zm4 0a1 1 0 0 0 1-1a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0zm4 0a1 1 0 0 0 1-1a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0z" />
        </G>
      </Svg>
    </View>
  );
};

export default Birthday;
