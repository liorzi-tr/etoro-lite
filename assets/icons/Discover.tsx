import React from 'react';
import { Svg, G, Path, Circle } from 'react-native-svg';

const Discover = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" />
      <Path d="M16 8l-4 8l-4-4l8-4z" />
    </G>
  </Svg>
);

export default Discover;
