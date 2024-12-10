// types.ts
export interface Credentials {
  username: string;
  password: string;
}

export interface Token {
  jwt: string;
  expiresInMs: number;
}

export interface OTP {
  userOtpId: string;
  expiresInMs: number;
}

export type TwoFactorType = 'Sms' | 'MobilePushCode' | 'VoiceCall';

export interface TwoFactorChannel {
  type: TwoFactorType;
  value: string;
}

export interface TwoFactorResponse {
  gcid: number;
  token: Token;
  twoFactor: {
    otp: OTP;
    sentChannels: TwoFactorChannel[];
    availableChannels: TwoFactorChannel[];
  };
  deviceVerificationRequired?: true;
  expirationUnixTimeMs?: number;
}

export interface LoginSuccessResponse {
  gcid: string;
  realCid: string;
  demoCid: string;
  token: Token;
  deviceToken?: string;
}

export interface SignatureData {
  keyData: {
    keyAlgorithm: string;
    keyParameters: string[];
    publicKey: string;
  },
  hashData: {
    hashAlgorithm: string;
  }
}

export interface PublicKeyData {
  signatureData: SignatureData;
  message: string;
  signedMessage: string;
}

export interface EnrollmentResponse {
  enrollmentData: {
    deviceToken: DeviceToken;
  }
}

export interface DeviceToken {
  token: string;
  expiresOn: string;
}

export type LoginResponse = TwoFactorResponse | LoginSuccessResponse;

export const isTwoFactorResponse = (data: LoginResponse): data is TwoFactorResponse => {
  return !!(data as TwoFactorResponse).twoFactor;
};

export const isLoginMissingScopes = (data: any): data is { missingScopes: string[] } => {
  return Array.isArray(data.missingScopes);
};
