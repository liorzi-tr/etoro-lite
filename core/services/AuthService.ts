// authService.ts
import * as SecureStore from 'expo-secure-store';

class AuthService {
  private authenticationToken: string | null = null;
  private refreshToken: string | null = null;

  async setSts(stsData: any) {
    this.authenticationToken = stsData.accessToken;
    this.refreshToken = stsData.refreshToken;

    await SecureStore.setItem('authenticationToken', stsData.accessToken);
    await SecureStore.setItem('refreshToken', stsData.refreshToken);
  }

  async getAuthenticationToken(): Promise<string | null> {
    if (this.authenticationToken) return this.authenticationToken;

    const token = await SecureStore.getItem('authenticationToken');
    this.authenticationToken = token;
    return token;
  }

  async getRefreshToken(): Promise<string | null> {
    if (this.refreshToken) return this.refreshToken;

    const token = await SecureStore.getItem('refreshToken');
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
