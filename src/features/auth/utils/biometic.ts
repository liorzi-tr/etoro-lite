import * as LocalAuthentication from 'expo-local-authentication';

export const isBiometricSupported = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return (compatible && enrolled)
}