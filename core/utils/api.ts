// api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import AuthService from '../services/AuthService';

export interface InterceptorConfig {
  addHeaders?: {
    gatewayAppId?: boolean;
    appDomain?: boolean;
    authenticationToken?: boolean;
    refreshToken?: boolean;
  };
  // Add any other custom properties if needed
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  interceptorConfig?: InterceptorConfig;
}


const axiosInstance = axios.create({
  baseURL: 'https://etoro.com', // Replace with your API base URL
});

// Request interceptor to add headers
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const interceptorConfig = config.interceptorConfig;

    if (interceptorConfig?.addHeaders) {
      const { addHeaders } = interceptorConfig;

      if (addHeaders.gatewayAppId) {
        config.headers['Gateway-App-Id'] = 'your-gateway-app-id';
      }
      if (addHeaders.appDomain) {
        config.headers['App-Domain'] = 'your-app-domain';
      }
      if (addHeaders.authenticationToken) {
        config.headers['Authentication-Token'] = AuthService.getAuthenticationToken();
      }
      if (addHeaders.refreshToken) {
        config.headers['Refresh-Token'] = AuthService.getRefreshToken();
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
