export interface PrivateInstrumentType {
  InstrumentTypeId: number;
  RestrictedManualOpen: boolean;
}

export interface PrivateInstrumentTypes {
  InstrumentTypes?: PrivateInstrumentType[];
}

export interface InstrumentTypes {
  InstrumentTypes: InstrumentType[];
  ExchangeInfo: ExchangeInfo[];
  StocksIndustries: StocksIndustry[];
  CryptoCategories: CryptoCategory[];
}

export interface InstrumentType {
  InstrumentTypeID: InstrumentTypeID;
  InstrumentTypeDescription: string;
  Order: number;
  SLTPApproachPercent: number;
  PricesBy: string;
  Avatars: { default: string };
  showStockInfo?: boolean;
}

export interface ExchangeInfo {
  ExchangeID: ExchangeID;
  ExchangeDescription: string;
}

export interface StocksIndustry {
  IndustryID: IndustryID;
  IndustryName: string;
}

export interface CryptoCategory {
  CryptoCategoryID: CryptoCategoryID;
  CryptoCategoryName: string;
  CryptoCategoryNameForSEO: string;
}

export interface AllCategory extends Category {
  children: InstrumentCategory[];
}

export type CryptoType = Category & CryptoCategory;

export interface StocksCategory extends InstrumentCategory {
  parent: AllCategory;
  children: (IndustryCategory | ExchangeCategory)[];
}

export interface IndustryCategory extends Category {
  parent: StocksCategory;
  children: Industry[];
  key: 'Industry';
  textKey: 'Industry';
}

export interface ExchangeCategory extends Category {
  parent: StocksCategory;
  children: Exchange[];
  key: 'Exchange';
  textKey: 'Exchange';
}

export interface Exchange extends Category, ExchangeInfo {
  parent: ExchangeCategory;
}

export interface Industry extends Category, StocksIndustry {
  parent: IndustryCategory;
}

export interface InstrumentCategory extends InstrumentType, Category {
  IsRestricted: boolean;
}

export interface Category {
  key: string;
  textKey?: string;
  children: Category[];
  parent?: Category;
  Url?: string;
  UrlName?: string;
}

export enum InstrumentTypeID {
  Currencies = 1,
  Commodities = 2,
  Indices = 4,
  Stocks = 5,
  ETF = 6,
  Cryptocurrencies = 10,
}

export enum ExchangeID {
  NASDAQ = 4,
  NYSE = 5,
  Frankfurt = 6,
  London = 7,
  Paris = 9,
  BolsaDeMadrid = 10,
  BorsaItaliana = 11,
  Zurich = 12,
  Oslo = 14,
  Stockholm = 15,
  Copenhagen = 16,
  Helsinki = 17,
  HongKong = 21,
  Lisbon = 22,
  Brussels = 23,
  Tadawul = 24,
  Amsterdam = 30,
  Extended_Hours_Trading = 33,
  Chicago = 20,
}

export enum IndustryID {
  BasicMaterials = 1,
  Conglomerates = 2,
  ConsumerGoods = 3,
  Financial = 4,
  Healthcare = 5,
  IndustrialGoods = 6,
  Services = 7,
  Technology = 8,
  Utilities = 9
}

export enum CryptoCategoryID {
  Coins = 1001,
  Currency_Crosses = 1002,
  Crypto_Crosses = 1003,
  Commodity_Crosses = 1004
}
