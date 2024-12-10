import axiosInstance, { InterceptorConfig } from "../../../core/utils/api";
import { getDeviceIdFromLocalStorage } from "../../../core/utils/storage";
import { DeviceToken, EnrollmentResponse, SignatureData } from "../types";
import { generateKeysAsStrings, getSignatureData, signData } from "../utils/crypto";
import { saveSecureData } from "../utils/secureStore";

const bioLoginEnrollUrl = '/api/onboarding/v1/bio-login/enroll/2fa';

export async function activateBioLogin(): Promise<void> {
  try {
    console.log('Activating biometric login...');
    console.log('Generating keys...');
    await generateKeysAsStrings();
    console.log('Keys generated successfully');
    const deviceToken = await sharePublicKey();
    await saveSecureData('deviceToken', deviceToken.token);
  } catch (error) {
    console.error('Error activating biometric login:', error);
    throw error;
  }
}

 async function sharePublicKey(): Promise<DeviceToken> {
  const deviceId = await getDeviceIdFromLocalStorage();
  const message = JSON.stringify({deviceId});
  const signedMessage = await signData(message);
  console.log('Signed message:', signedMessage);
  const signatureData: SignatureData = await getSignatureData();
  console.log('Signature data:', signatureData);


  const httpParams: InterceptorConfig = {
    addHeaders: {
      auhtorization: true,
      accounttype: true,
      applicationidentifier: true,
      applicationversion: true,
      gatewayAppId: true,
      appDomain: true,
      deviceId: true,
    }
  }

  try {
    const response = await axiosInstance.post<EnrollmentResponse>(bioLoginEnrollUrl,
      { publickData: { signatureData, message, signedMessage, deviceId } }, {
         interceptorConfig: httpParams
        });
    const deviceData = response.data.enrollmentData.deviceToken;
    return deviceData;
  } catch (error) {
    console.error('Error sharing public key:', error);
    throw error;
  }
}
