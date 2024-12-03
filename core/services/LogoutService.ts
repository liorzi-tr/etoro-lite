import axiosInstance, { InterceptorConfig } from "../utils/api";

class LogoutService {
  private url: string = '/api/sts/oauth/v3/';

  public async logout() {
    const interceptorConfig: InterceptorConfig = {
      addHeaders: {
        auhtorization: true,
        authenticationToken: true,
        deviceId: true,
      },
      categories: ['Logout'],
    };

    try {
      await axiosInstance.post(`${this.url}token/revoke`, {}, {interceptorConfig});
      console.log('Logout successful');

    }
    catch (error) {
      console.log('Error in logout', error);
      Promise.reject(error);
    }
  }
}

export default new LogoutService();
