import React from 'react';
import { Svg, G, Path } from 'react-native-svg';

const Home = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G fill={hasFill ? fill : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9L12 3l9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <Path d="M9 22V12h6v10" />
    </G>
  </Svg>
);

export default Home;
