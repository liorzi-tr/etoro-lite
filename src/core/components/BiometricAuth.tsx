import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { saveSecureData, getSecureData } from '../utils/secureStore';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../navigation/params';

export default function BiometricAuth() {
  const navigation = useNavigation<RootNavigationProp>();
  const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricSupported(compatible && enrolled);
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      Alert.alert('Biometric Authentication', 'Biometric authentication is not available on this device.');
      return;
    }

    setIsAuthenticating(true);

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Passcode',
      disableDeviceFallback: false, // Allow fallback to device passcode
    });

    setIsAuthenticating(false);

    if (result.success) {
      // Fetch or generate the authentication token securely
      const authToken = 'secure-auth-token'; // Replace with actual token retrieval logic
      await saveSecureData('authToken', authToken);

      // Navigate to the main app screen
      navigation.navigate("MainNavigator");
    } else {
      Alert.alert('Authentication Failed', 'Unable to authenticate using biometrics.');
    }
  };

  const handleFallbackLogin = () => {
    navigation.navigate("AuthNavigator"); // Navigate to traditional login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SecureApp</Text>
      {isAuthenticating ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Authenticate with Biometrics" onPress={handleBiometricAuth} />
          <View style={styles.separator} />
          <Button title="Use Passcode" onPress={handleFallbackLogin} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  separator: {
    height: 20,
  },
});
