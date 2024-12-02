// authService.ts
import EncryptedStorage from 'react-native-encrypted-storage';

class AuthService {
  private authenticationToken: string | null = null;
  private refreshToken: string | null = null;

  async setSts(stsData: any) {
    this.authenticationToken = stsData.accessToken;
    this.refreshToken = stsData.refreshToken;

    await EncryptedStorage.setItem('authenticationToken', stsData.accessToken);
    await EncryptedStorage.setItem('refreshToken', stsData.refreshToken);
  }

  async getAuthenticationToken(): Promise<string | null> {
    if (this.authenticationToken) return this.authenticationToken;

    const token = await EncryptedStorage.getItem('authenticationToken');
    this.authenticationToken = token;
    return token;
  }

  async getRefreshToken(): Promise<string | null> {
    if (this.refreshToken) return this.refreshToken;

    const token = await EncryptedStorage.getItem('refreshToken');
    this.refreshToken = token;
    return token;
  }

  // Optionally, add a method to clear tokens on logout
  async clearTokens() {
    this.authenticationToken = null;
    this.refreshToken = null;
    await EncryptedStorage.removeItem('authenticationToken');
    await EncryptedStorage.removeItem('refreshToken');
  }
}

export default new AuthService();
