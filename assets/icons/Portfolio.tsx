import React from 'react';
import { Svg, G, Path, Circle } from 'react-native-svg';
import { selectTheme } from '../../src/store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Portfolio = ({ size = 24, color = 'gray', hasFill = false, fill = 'none' }) => {
  const theme = useSelector(selectTheme);
  return(
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <G fill={theme.textInfoColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <Path fill={color ? color : theme.textInfoColor} d="M8 1.5a.5.5 0 0 1 .5-.5A6.5 6.5 0 0 1 15 7.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zM7 3.522a.5.5 0 0 0-.545-.498a6 6 0 1 0 6.52 6.52a.5.5 0 0 0-.497-.544H7z" />
      </G>
    </Svg>
  );
};

export default Portfolio;
