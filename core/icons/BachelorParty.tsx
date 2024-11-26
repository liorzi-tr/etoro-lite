import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const BachelorParty = ({
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
          strokeWidth="1.2"
        >
          <Path d="M3.208.574a.75.75 0 0 1 .907-.456l3.601 1.026a.75.75 0 0 1 .53.867L7.2 7.315a3.08 3.08 0 0 1-3.117 2.482l-.672 2.357l.74.211a.75.75 0 0 1-.411 1.443L2.313 13.4l-.07-.02l-1.429-.407a.75.75 0 1 1 .412-1.443l.742.212l.672-2.357A3.08 3.08 0 0 1 1.3 5.633L3.207.574Zm.481 2.974l2.574.766l.378-1.917l-2.273-.648zm6.313 6.321a3.08 3.08 0 0 1-2.144-.868a4.3 4.3 0 0 0 .567-1.444l.698-3.539l1.479-.353l-.631-1.849l-.462.116A2 2 0 0 0 8.987.517l1.288-.323a.75.75 0 0 1 .893.485l1.746 5.117a3.08 3.08 0 0 1-1.457 3.707l.596 2.377l.745-.187a.75.75 0 0 1 .365 1.455l-1.443.362l-.059.015l-1.449.364a.75.75 0 0 1-.365-1.455l.751-.189z" />
        </G>
      </Svg>
    </View>
  );
};

export default BachelorParty;
