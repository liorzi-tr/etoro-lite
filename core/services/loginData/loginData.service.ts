import axiosInstance, { InterceptorConfig } from '../../utils/api';
import { LoginDataResponse} from '../../@etoro/types/loginData.interface';
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
      const response = await axiosInstance.get<LoginDataResponse>(url,{interceptorConfig:config});

      return response.data;
    } catch (error) {
      console.error("Error fetching login data:", error);
      throw error;
    }
  }

  export default fetchLoginData;
