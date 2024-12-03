import React from 'react';
import { Svg, G, Path, Line } from 'react-native-svg';

const Watchlist = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <Line x1="9" y1="8" x2="15" y2="8" />
      <Line x1="9" y1="12" x2="15" y2="12" />
      <Line x1="9" y1="16" x2="15" y2="16" />
    </G>
  </Svg>
);

export default Watchlist;
