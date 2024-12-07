import React from 'react';
import { Svg, G, Path } from 'react-native-svg';

const Wallet = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 26 26">
    <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 7h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
      <Path d="M17 12h1a2 2 0 0 1 0 4h-1" />
    </G>
  </Svg>
);

export default Wallet;
