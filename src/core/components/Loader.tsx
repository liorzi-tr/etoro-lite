import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the rotation animation: 0 -> 1 maps to 0deg -> 360deg
    const rotateAnimation = Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300, // 1 second for a full rotation
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Define the bounce animations
    const bounceUp = Animated.timing(bounceAnim, {
      toValue: -10, // move the image 10 pixels up
      duration: 200,
      useNativeDriver: true,
    });

    const bounceDown = Animated.timing(bounceAnim, {
      toValue: 0, // move back to original position
      duration: 200,
      useNativeDriver: true,
    });

    // After one full cycle, reset the rotateAnim to 0 so it can rotate again
    const resetRotate = Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    });

    // Create a sequence: rotate -> bounce up -> bounce down -> reset rotation, then loop
    Animated.loop(
      Animated.sequence([rotateAnimation, bounceUp, bounceDown, resetRotate])
    ).start();
  }, [rotateAnim, bounceAnim]);

  // Interpolate rotateAnim from 0 to 1 into a rotation of 0deg to 360deg
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      { rotate: rotateInterpolate },
      { translateY: bounceAnim },
    ],
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={require('../../../assets/images/etoro-light.png')}
        style={[{ width: 50, height: 50 }, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Loader;
