import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TabBar = ({}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={75} height={61} viewBox="0 0 75 61">
        <Path d="M37.5 0L75 61H0L37.5 0z" />
      </Svg>
      {/* Your middle button goes here */}
    </View>
  );
};

export default TabBar;
