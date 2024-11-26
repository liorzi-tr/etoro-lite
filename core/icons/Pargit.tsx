import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { IconProps } from './models/IconProps';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

const Pargit = ({
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
          strokeWidth="1.5"
        >
          <Path d="M7 23q-.325 0-.537-.213t-.213-.537V19H5.5q-1.05 0-1.775-.725T3 16.5t.725-1.775T5.5 14h.75v-1H4q-.425 0-.712-.288T3 12V9q0-.425.288-.712T4 8h2.25V7H5.5q-1.05 0-1.775-.725T3 4.5t.725-1.775T5.5 2h.75v-.25q0-.325.213-.537T7 1t.538.213t.212.537V2h.75q1.05 0 1.775.725T11 4.5t-.725 1.775T8.5 7h-.75v1H10q.425 0 .713.288T11 9v3q0 .425-.288.713T10 13H7.75v1h.75q1.05 0 1.775.725T11 16.5t-.725 1.775T8.5 19h-.75v3.25q0 .325-.213.538T7 23m10 0q-.325 0-.537-.213t-.213-.537V19h-.75q-1.05 0-1.775-.725T13 16.5t.725-1.775T15.5 14h.75v-1H14q-.425 0-.712-.288T13 12V9q0-.425.288-.712T14 8h2.25V7h-.75q-1.05 0-1.775-.725T13 4.5t.725-1.775T15.5 2h.75v-.25q0-.325.213-.537T17 1t.538.213t.212.537V2h.75q1.05 0 1.775.725T21 4.5t-.725 1.775T18.5 7h-.75v1H20q.425 0 .713.288T21 9v3q0 .425-.288.713T20 13h-2.25v1h.75q1.05 0 1.775.725T21 16.5t-.725 1.775T18.5 19h-.75v3.25q0 .325-.213.538T17 23M5.5 5h3q.2 0 .35-.15T9 4.5t-.15-.35T8.5 4h-3q-.2 0-.35.15T5 4.5t.15.35t.35.15m10 0h3q.2 0 .35-.15T19 4.5t-.15-.35T18.5 4h-3q-.2 0-.35.15T15 4.5t.15.35t.35.15M5 11h4v-1H5zm10 0h4v-1h-4zm-9.5 6h3q.2 0 .35-.15T9 16.5t-.15-.35T8.5 16h-3q-.2 0-.35.15T5 16.5t.15.35t.35.15m10 0h3q.2 0 .35-.15t.15-.35t-.15-.35t-.35-.15h-3q-.2 0-.35.15t-.15.35t.15.35t.35.15M5 5V4zm10 0V4zM5 11v-1zm10 0v-1zM5 17v-1zm10 0v-1z" />
        </G>
      </Svg>
    </View>
  );
};

export default Pargit;
