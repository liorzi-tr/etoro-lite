// authService.ts
import * as SecureStore from 'expo-secure-store';
import { LoginResponse } from '../@etoro/types/auth';

class AuthService {
  private authenticationToken: string | null = null;
  private refreshToken: string | null = null;

  async setSts(stsData: LoginResponse) {
    this.refreshToken = stsData.token.jwt;
    console.log('Setting authentication token:', stsData.token.jwt);

    await SecureStore.setItemAsync('refreshToken', stsData.token.jwt);
  }

  async getAuthenticationToken(): Promise<string | null> {
    console.log('Getting authentication token from cache:', this.authenticationToken);
    if (this.authenticationToken) return this.authenticationToken;
    console.log('Getting authentication token:', this.authenticationToken);
    const token = await SecureStore.getItemAsync('authenticationToken');
    this.authenticationToken = token;
    console.log('Got authentication token:', token);
    return token;
  }

  async getRefreshToken(): Promise<string | null> {
    console.log('Getting refresh token from cache:', this.refreshToken);

    if (this.refreshToken) return this.refreshToken;

    const token = await SecureStore.getItemAsync('refreshToken');
    this.refreshToken = token;
    return token;
  }

  // Optionally, add a method to clear tokens on logout
  async clearTokens() {
    this.authenticationToken = null;
    this.refreshToken = null;
    await SecureStore.deleteItemAsync('authenticationToken');
    await SecureStore.deleteItemAsync('refreshToken');
  }
}

export default new AuthService();
