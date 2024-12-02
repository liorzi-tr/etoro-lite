// LoginService.ts

import { Credentials, LoginResponse, TwoFactorResponse } from "../@etoro/types/auth";
import axiosInstance, { InterceptorConfig } from "../utils/api";
import AuthService from "./AuthService";

class LoginService {
  private _exchangeRequest: Promise<any> | null = null;
  private refreshTokenTimeout: NodeJS.Timeout | null = null;

  private requestedScopes: string[] = [];
  private readonly baseUrl: string = '/api/sts/oauth/v3/';

  async authenticateUserBeforeLogin(credentials: Credentials, loginPromise?: Promise<any>): Promise<LoginResponse> {
    let isTemporalDevice = false;

    try {
      isTemporalDevice = await this.detectIncognito(); // Implement this method
    } catch {
      return Promise.reject('Incognito detection failed');
    }

    try {
      await this.maintenanceCheck(); // Implement this method

      loginPromise = loginPromise || this._authenticateUserBeforeLogin({
        loginIdentifier: credentials.username,
        password: credentials.password,
        requestedScopes: this.requestedScopes,
        isTemporalDevice,
      });

      const res = await loginPromise;
      return res;
    } catch (error) {
      // Handle maintenance redirect error if needed
      return Promise.reject(error);
    } finally {
      this.resetMaintenanceCheck(); // Implement this method
    }
  }

  private async _authenticateUserBeforeLogin(data: {
    loginIdentifier: string;
    password: string;
    requestedScopes: string[];
    isTemporalDevice: boolean;
  }): Promise<LoginResponse> {
    const deviceTokens = this.getAllDeviceTokens(); // Implement this method
    const requestData = { ...data, deviceTokens };

    const interceptorConfig: InterceptorConfig = {
      addHeaders: {
        gatewayAppId: true,
        appDomain: true,
      },
    };

    try {
      const response = await axiosInstance.post(`${this.baseUrl}auth`, requestData, { params: interceptorConfig});
      const authenticationData = this._processLoginResult(response.data); // Implement this method
      authenticationData.expirationUnixTimeMs =
        Date.now() + authenticationData.token.expiresInMs - this.getExchangeGrace(); // Implement getExchangeGrace

      return authenticationData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async refreshToken(data?: any): Promise<any> {
    if (this._exchangeRequest) {
      return this._exchangeRequest;
    }

    const body = { RequestedScopes: (data && data.missingScopes) || [] };

    const interceptorConfig = {
      addHeaders: {
        gatewayAppId: true,
        appDomain: true,
        authenticationToken: true,
        refreshToken: true,
      },
    };

    this._exchangeRequest = new Promise(async (resolve, reject) => {
      try {
        const response = await axiosInstance.post(`${this.baseUrl}token/exchange`, body, { params: interceptorConfig });

        const stsData = response.data;
        stsData.accessToken = stsData.token?.jwt;
        stsData.expiresInMs = stsData.token?.expiresInMs;
        stsData.antiCsrfToken = '';
        stsData.expirationUnixTimeMs = Date.now() + stsData.expiresInMs;

        AuthService.setSts(stsData); // Implement authService

        if (stsData.accessToken && stsData.expirationUnixTimeMs) {
          this.startRefreshTokenTimer(stsData.expirationUnixTimeMs);
        }

        resolve(stsData);
      } catch (error) {
        reject(error);
      } finally {
        this._exchangeRequest = null;
      }
    });

    return this._exchangeRequest;
  }

  private startRefreshTokenTimer(expirationUnixTimeMs: number): void {
    if (this.refreshTokenTimeout) {
      this.stopRefreshTokenTimer();
    }

    const timeout = expirationUnixTimeMs - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken();
    }, timeout);
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = null;
    }
  }

  async verifyTwoFactor(twoFAData: TwoFactorResponse, otp: string): Promise<any> {
    const interceptorConfig = {
      addHeaders: {
        gatewayAppId: true,
        appDomain: true,
        auth: false
      },
    };
    const headers = { Authorization: twoFAData.token.jwt };
    try {
      const response = await axiosInstance.post<TwoFactorResponse>(`${this.baseUrl}auth/twoFactor/${twoFAData.twoFactor.sentChannels[0].type}`, {
        userOtpId: twoFAData.twoFactor.otp.userOtpId,
        otp,
        requestedScopes: this.requestedScopes,
      }, { headers, params: interceptorConfig });

      const authenticationData = response.data;
      authenticationData.expirationUnixTimeMs = Date.now() + authenticationData.token.expiresInMs - this.getExchangeGrace();

      return authenticationData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Implement the following methods according to your application logic
  private detectIncognito(): Promise<boolean> {
    // Implementation for React Native
    return Promise.resolve(false);
  }

  private maintenanceCheck(): Promise<void> {
    // Check if the app is under maintenance
    return Promise.resolve();
  }

  private resetMaintenanceCheck(): void {
    // Reset maintenance check state
  }

  private getAllDeviceTokens(): string[] {
    // Return an array of device tokens
    return [];
  }

  private _processLoginResult(data: any): any {
    // Process and return the authentication data
    return data;
  }

  private getExchangeGrace(): number {
    // Return the exchange grace period
    return 0;
  }
}

export default new LoginService();
