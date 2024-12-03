// authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../@etoro/types/auth';

class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  async setAccessToken(stsData: LoginResponse) {
    this.accessToken = stsData.token.jwt;
    await AsyncStorage.setItem('accessToken', stsData.token.jwt);
  }

  async setRefreshToken(stsData: LoginResponse) {
    await AsyncStorage.setItem('refreshToken', stsData.token.jwt);
  }

  async getAccessToken(): Promise<string | null> {
    if (this.accessToken) return this.accessToken;

    const token = await AsyncStorage.getItem('accessToken');
    this.accessToken = token;
    return token;
  }

  async getRefreshToken(): Promise<string | null> {
    if (this.refreshToken) return this.refreshToken;

    const token = await AsyncStorage.getItem('refreshToken');
    this.refreshToken = token;
    return token;
  }

  // Optionally, add a method to clear tokens on logout
  async clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  }
}

export default new AuthService();
