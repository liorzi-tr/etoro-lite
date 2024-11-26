import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: React.ReactNode;
  topColor: string;
  bottomColor: string;
  style?: object | object[];
}

const BackgroundGradient = ({
  children,
  topColor,
  bottomColor,
  style,
}: Props) => (
  <LinearGradient
    colors={[topColor, bottomColor]}
    style={style ? style : { flex: 1 }}
  >
    {children}
  </LinearGradient>
);

export default BackgroundGradient;
