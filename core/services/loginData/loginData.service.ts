import axiosInstance, { InterceptorConfig } from '../../utils/api';
import { LoginDataResponse} from './interfaces/loginData.interface';
export class LoginDataService {
  private readonly baseUrl = 'https://www.etoro.com/api/logindata/v1.1/logindata';

  /**
   * Fetch login data from the API.
   * @param clientRequestId The unique client request ID for the API call.
   * @returns A Promise resolving to the LoginDataResponse.
   */
  public async fetchLoginData(clientRequestId: string): Promise<LoginDataResponse> {
    const url = `${this.baseUrl}?client_request_id=${clientRequestId}&conditionIncludeDisplayableInstruments=false&conditionIncludeMarkets=false&conditionIncludeMetadata=false&conditionIncludeMirrorValidation=false`;

    try {
      const response = await axiosInstance.get<LoginDataResponse>(url, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching login data:", error);
      throw error;
    }
  }
}
