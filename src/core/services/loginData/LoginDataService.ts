import axiosInstance, { InterceptorConfig } from '../../utils/api';
import { LoginDataResponse} from '../../@etoro/types/login-data';
  const baseUrl = 'https://www.etoro.com/api/logindata/v1.1/logindata';
    const config:InterceptorConfig = {
        addHeaders:{
            auhtorization:true,
            useragent:true
        },

    }
  /**
   * Fetch login data from the API.
   * @param clientRequestId The unique client request ID for the API call.
   * @returns A Promise resolving to the LoginDataResponse.
   */
const   fetchLoginData= async (): Promise<LoginDataResponse> =>{
    const url = `${baseUrl}?conditionIncludeDisplayableInstruments=false&conditionIncludeMarkets=false&conditionIncludeMetadata=false&conditionIncludeMirrorValidation=false`;

    try {
      const response = await axiosInstance.get<LoginDataResponse>(url,{interceptorConfig:config, headers:{
        applicationidentifier:'ReToro',
        accounttype:'Real',
        applicationversion:'v651.439.1',
        "x-session-id":"1a3d14cb-8248-4d43-bdcb-8267d2349b4c",
        "x-sts-autologin":"true",
        "x-sts-deviceid":"9a453c23-7ffe-40c0-8b7e-b6975c3ef86c",
        "x-sts-clienttime":new Date().toISOString().substring(0, 19)
      }});

      return response.data;
    } catch (error) {
      console.error("Error fetching login data:", error);
      throw error;
    }
  }

  export default fetchLoginData;
