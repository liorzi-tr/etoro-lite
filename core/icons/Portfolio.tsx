import React from 'react';
import { Svg, G, Path, Circle } from 'react-native-svg';

const Portfolio = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32">
    <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M28 10h-6V6a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2M12 6h8v4h-8ZM4 26V12h24v14Z" />
    </G>
  </Svg>
);

export default Portfolio;
