export type AggregatedLoginDataSource = 'Login' | 'AggregatedLogin' |
  'AccountReconnect' | 'PortfolioSync' | 'PortfolioChange' | 'UserSync';

export interface AggregatedLoginResponse {
  AggregatedResult: {
    ResponseSummary: {
      StatusCode: number
      IsSuccess: boolean
      ErrorMessage: any
      ErrorInCall: any
      ApplicationName: string
      ApplicationVersion: string
      Cid: number
      AccountType: string
      IsInMaintenance: boolean
      MaintenanceRedirectUrl: string;
      ClientRatesRefreshIntervalInSeconds: number
    };
    ApiResponses: AggregatedLoginApiResponses
  }
  Configuration: {
    Push: {
      RealUrl: string;
      DemoUrl: string;
    };
    Intercom: { UserToken: string }
  }
}

export interface AggregatedLoginApiResponses {
  PrivatePortfolio: PrivatePortfolio
  CurrentUserData?: CurrentUserData
  CustomerRestrictions?: CustomerRestrictions
  MirrorsUserData?: MirrorsUserData
};

export interface CurrentUserResponse {
  aboutMe: string;
  aboutMeShort: string | null;
  accountStatusId: number;
  accountType: number;
  allowDisplayFullName: boolean;
  attributeId: any;
  avatars: AvatarData[];
  country: number;
  demoCID: number;
  designatedRegulationId: number;
  email: string;
  emailVerificationStatus: number;
  externalId: string;
  firstName: string | null;
  gcid: number;
  hasSettings: boolean;
  homepage: any;
  isEmailVerified: boolean;
  isPi: boolean;
  isVerified: boolean;
  kycState: number;
  language: number;
  languageIsoCode: string;
  lastName: string;
  masterAccountCid: number;
  middleName: string | null;
  optOut: boolean;
  pendingClosureStatusId: number;
  piLevel: number;
  playerLevelId: number;
  playerStatus: number;
  realCID: number;
  regulationId: number;
  salesforceAccountId: string;
  salesforceContactId: string;
  tradingRiskStatusId: number;
  uiMode: { availableOptions: number[], selectedOption: number }
  userBio: UserBio;
  username: string;
  verificationLevel: number;
  version: number;
  walletRestrictions: any;
  whiteLabel: number;
}

export interface AvatarData {
  height: number,
  type: 'Original' | 'OriginalCropped' | 'Resized',
  url: string,
  width: number
}

export interface UserBio {
  gcid: number;
  aboutMe: string;
  aboutMeShort: string | null;
  languageCode: string;
  strategyID: any;
}

export interface PrivatePortfolio {
  StatusCode: number
  ErrorMessage: any
  Content: {
    ClientPortfolio: {
      Credit: number
      Positions: any[]
      Mirrors: any[]
      Orders: any[]
      StockOrders: any[]
      EntryOrders: any[]
      ExitOrders: any[]
      OrdersForOpen: any[]
      OrdersForClose: any[]
      OrdersForCloseMultiple: any[]
      BonusCredit: number
    }
  }
}

export interface CurrentUserData {
  StatusCode: number
  ErrorMessage: any
  Content: { users: CurrentUserResponse[] }
}

export interface CustomerRestrictions {
  StatusCode: number
  ErrorMessage: any
  Content: {
    CustomerRestrictions: CustomerRestriction[]
  }
}

export interface CustomerRestriction {
  CID: number
  RestrictionTypeID: number
  ReasonID: number
  Occured: string
}

export interface MirrorsUserData {
  StatusCode: number
  ErrorMessage: any
  Content: { users: any[] }
}