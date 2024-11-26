import React from 'react';
import { Image, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { colors } from '../../styles/constants';
import { IconProps } from './models/IconProps';

const Google = () => {
  return <Image source={require('../../assets/Google.png')} />;
};

export default Google;
