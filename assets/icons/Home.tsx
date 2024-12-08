import React from 'react';
import { Svg, G, Path } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../src/store/selectors/themeSelectors';

const Home = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => {
  const theme = useSelector(selectTheme);

  return(
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <G fill={theme.textInfoColor} stroke={color} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <Path fill={color ? color : theme.textInfoColor} d="M12.581 2.686a1 1 0 0 0-1.162 0l-9.5 6.786l1.162 1.627L12 4.73l8.919 6.37l1.162-1.627zm7 10l-7-5a1 1 0 0 0-1.162 0l-7 5a1 1 0 0 0-.42.814V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6.5a1 1 0 0 0-.418-.814" />
      </G>
    </Svg>
  );
};

export default Home;
