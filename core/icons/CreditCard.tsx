import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const CreditCard = ({
  size = 24,
  hasFill = false,
  fill,
  color,
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
          strokeWidth="2"
        >
          <Path d="M3 11v4.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h11.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.986.218-2.104V11M3 11V9m0 2h18M3 9v-.8c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C4.52 5 5.08 5 6.2 5h11.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105V9M3 9h18M7 15h4m10-4V9" />
        </G>
      </Svg>
    </View>
  );
};

export default CreditCard;
