export interface User {
  aboutMe: string;
  aboutMeShort?: string;
  avatars: AvatarRaw[];
  uniqueId: string;
  ItemId: number;
  Type: string;
  fullName: string;
  shortName: string;
  countryId: number;
  SubType: UserSubType;
  styles?: string;
}

export interface CustomerRestriction {
  CID: number;
  RestrictionTypeID: number;
  ReasonID: number;
  Occured: string;
}

export interface UserBio {
  gcid: number;
  aboutMe: string;
  languageCode?: string;
  strategyID: number;
  aboutMeShort: string;
}

export enum UserSubType {
  User = 'user',
  Analyst = 'Analyst',
  Fund = 'fund' // Smart Portfolios
}

export interface AvatarRaw {
  url: string;
  width: number;
  height: number;
  type: string;
}

export interface CustomerRestriction {
  CID: number;
  RestrictionTypeID: number;
  ReasonID: number;
  Occured: string;
}

export interface FundMetaData {
  Name: string;
  FundAccountId: number;
  IsPublic: boolean;
  HasCrypto: boolean;
  MinCopyAmount: number;
  RefreshIntervalMonths: number;
}

export interface UserRawResponse { users?: UserRaw[]; Users?: UserRaw[]; }

export interface UserRaw {
  gcid: number;
  realCID: number;
  demoCID: number;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  language: number;
  languageIsoCode: string;
  country: number;
  allowDisplayFullName: boolean;
  aboutMe: string;
  aboutMeShort?: string;
  userBio: UserBio;
  whiteLabel: number;
  optOut: boolean;
  homepage?: string;
  playerStatus?: number;
  piLevel: number;
  isPi: boolean;
  avatars: AvatarRaw[];
  masterAccountCid?: number;
  accountType: number;
  fundType: any;
  isVerified: boolean;
  verificationLevel: number;
  accountStatus: number;
  CustomerRestrictions?: CustomerRestriction[];
}
