import * as LocalAuthentication from 'expo-local-authentication';
import { getSecureData } from '../utils/secureStore';
import { AppDispatch } from '../../../store/store';
import { logout, setAuthenticatedTrue } from '../../../store/slices/authSlice';
import { Alert } from 'react-native';

export async function loginWithBiometric(dispatch: AppDispatch, navigation: any) {

  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Passcode',
      disableDeviceFallback: false,
    });

    if (result.success) {
      const deviceToken = await getSecureData('deviceToken');

      if (deviceToken) {
        dispatch(setAuthenticatedTrue());
        navigation.navigate('MainNavigator');
      } else {
        Alert.alert('Authentication Failed', 'No access token found.');
        await dispatch(logout());
        navigation.navigate('AuthNavigator');
      }
    }
  } catch {
    Alert.alert('Authentication Failed', 'Unable to authenticate using biometrics.');
    navigation.navigate('AuthNavigator'); // Fallback to login
  }
}

export async function showBiometricPrompt(): Promise<boolean> {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate',
    fallbackLabel: 'Enter Passcode',
    disableDeviceFallback: false,
  });
  console.log('Biometric prompt result:', result);
  return result.success;
}
