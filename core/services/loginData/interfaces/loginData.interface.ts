export interface LoginDataResponse {
    AggregatedResult: {
      ResponseSummary: ResponseSummary;
      ApiResponses: ApiResponses;
    };
    Configuration: Configuration;
  }
  
  export interface ResponseSummary {
    StatusCode: number;
    IsSuccess: boolean;
    ErrorMessage: string | null;
    ErrorInCall: string | null;
    ApplicationName: string;
    ApplicationVersion: string;
    Cid: number;
    AccountType: string;
    IsInMaintenance: boolean;
    MaintenanceRedirectUrl: string | null;
    ClientRatesRefreshIntervalInSeconds: number;
  }
  
  export interface ApiResponses {
    PrivatePortfolio?: ApiResponse<PrivatePortfolio>;
    CurrentUserData?: ApiResponse<CurrentUserData>;
    CustomerRestrictions?: ApiResponse<CustomerRestrictions>;
    MirrorsUserData?: ApiResponse<MirrorsUserData>;
  }
  
  export interface ApiResponse<T> {
    Content: T;
    StatusCode: number;
    ErrorMessage: string | null;
  }
  
  export interface PrivatePortfolio {
    ClientPortfolio: {
      Credit: number;
      Positions: Position[];
      Mirrors: Mirror[];
      Orders: any[];
      BonusCredit: number;
    };
  }
  
  export interface Position {
    PositionID: number;
    CID: number;
    OpenDateTime: string;
    OpenRate: number;
    InstrumentID: number;
    IsBuy: boolean;
    TakeProfitRate: number;
    StopLossRate: number;
    Amount: number;
    Leverage: number;
    Units: number;
    TotalFees: number;
    InitialAmountInDollars: number;
    IsSettled: boolean;
  }
  
  export interface Mirror {
    MirrorID: number;
    CID: number;
    ParentCID: number;
    StopLossPercentage: number;
    IsPaused: boolean;
    CopyExistingPositions: boolean;
    AvailableAmount: number;
    StopLossAmount: number;
    InitialInvestment: number;
    Positions: Position[];
  }
  
  export interface CurrentUserData {
    users: User[];
  }
  
  export interface User {
    gcid: number;
    realCID: number;
    username: string;
    avatars: Avatar[];
    isVerified: boolean;
  }
  
  export interface Avatar {
    url: string;
    width: number;
    height: number;
  }
  
  export interface CustomerRestrictions {
    CustomerRestrictions: Restriction[];
  }
  
  export interface Restriction {
    CID: number;
    RestrictionTypeID: number;
    ReasonID: number;
    Occured: string;
  }
  
  export interface MirrorsUserData {
    users: MirrorUser[];
  }
  
  export interface MirrorUser {
    gcid: number;
    realCID: number;
    username: string;
    avatars: Avatar[];
  }
  
  export interface Configuration {
    Push: {
      RealUrl: string;
      DemoUrl: string;
    };
    Intercom: {
      UserToken: string;
    };
  }


