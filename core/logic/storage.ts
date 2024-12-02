import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDeviceId } from '../utils/getDeviceId';

export const saveEmailToLocalStorage = async (email: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userEmail', email);
  } catch (error) {
    console.error('Failed to save email to secure storage', error);
  }
};

export const getEmailFromLocalStorage = async (): Promise<string | null> => {
  try {
    const email = await AsyncStorage.getItem('userEmail');
    return email;
  } catch (error) {
    console.error('Failed to retrieve email from secure storage', error);
    return null;
  }
};

export const clearEmailFromLocalStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userEmail');
  } catch (error) {
    console.error('Failed to clear email from secure storage', error);
  }
};

export const setDeviceId = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem('X-Sts-Deviceid', getDeviceId());
  } catch (error) {
    console.error('Failed to save device ID to secure storage', error);
  }
}

export const getDeviceIdFromLocalStorage = async (): Promise<string | null> => {
  try {
    const deviceId = await AsyncStorage.getItem('X-Sts-Deviceid');
    return deviceId;
  } catch (error) {
    console.error('Failed to retrieve device ID from secure storage', error);
    return null;
  }
}
