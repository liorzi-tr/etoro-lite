// api.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import AuthService from '../services/AuthService';
import { getDeviceId } from './getDeviceId';
import { getDeviceIdFromLocalStorage, setDeviceId } from '../logic/storage';
export interface InterceptorConfig {
  addHeaders?: {
    gatewayAppId?: boolean;
    appDomain?: boolean;
    useragent?: boolean;
    deviceId?: boolean;
    authenticationToken?: boolean;
    auhtorization?: boolean;
    refreshToken?: boolean;
    applicationidentifier?: boolean;
    applicationversion?: boolean;
    accounttype?: boolean;
  };
  categories?: string[];
  monitoringSecuredCall?: {
    AuthenticationProviderData?: boolean;
  };
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  interceptorConfig?: InterceptorConfig;
}

// avivgo@etoro.com
const axiosInstance = axios.create({
  baseURL: 'https://www.etoro.com', // Replace with your API base URL
});

// Request interceptor to add headers
axiosInstance.interceptors.request.use(
 async (config: CustomAxiosRequestConfig) => {
    const interceptorConfig = config.interceptorConfig;

    if (interceptorConfig?.addHeaders) {
      const { addHeaders } = interceptorConfig;

      if(addHeaders.authenticationToken) {
        console.log('Adding authentication token');
        const accessToken = await AuthService.getRefreshToken();
        config.headers['Authentication'] = accessToken;
      }

      if (addHeaders.auhtorization) {
        console.log('Adding authorization header');
        const authHeader = await AuthService.getRefreshToken();
        console.log('token', authHeader);


        config.headers['Authorization'] = authHeader;
      }

      if (addHeaders.accounttype) {
        config.headers['Accounttype'] = 'Real';
      }

      if (addHeaders.applicationversion) {
        config.headers['Applicationversion'] = 'debug';
      }

      if (addHeaders.applicationidentifier) {
        config.headers['Applicationidentifier'] = 'ReToro';
      }

      if (addHeaders.gatewayAppId) {
        console.log('Adding gatewayAppId header');
        config.headers['X-Sts-Gatewayappid'] = '90631448-9A01-4860-9FA5-B4EBCDE5EA1D';
      }
      if (addHeaders.appDomain) {
        console.log('Adding appDomain header');
        config.headers['X-Sts-Appdomain'] = 'https://www.etoro.com';
      }
      if (addHeaders.deviceId) {
        let deviceId = await getDeviceIdFromLocalStorage();
        if (!deviceId) {
          deviceId = getDeviceId();
          await setDeviceId();
        }
        config.headers['X-Sts-Deviceid'] = deviceId;
      }

      if (addHeaders.useragent) {
        config.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36';
      }

      if (addHeaders.refreshToken) {
        config.headers['X-Sts-Jwt'] = true;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
