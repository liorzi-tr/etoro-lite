export interface PrivateInstrumentRawData {
    Leverage1MaintenanceMargin: number
    InstrumentID: number
    AllowManualTrading: boolean
    Leverages: number[]
    PotentialDisplayLeverages: number[]
    DefaultLeverage: number
    MinPositionAmount: number
    MaxStopLossPercentage: number
    MaxTakeProfitPercentage: number
    MinPositionAmountAbsolute: number
    IsGuaranteeSlTp: boolean
    RestrictedManualOpen: boolean
    SettledBuyMaxLeverage: number
    SettledSellMaxLeverage: number
    RequiresW8Ben: boolean
    MinStopLossPercentage: number
    MinTakeProfitPercentage: number
    DefaultStopLossPercentage: number
    DefaultTakeProfitPercentage: number
    AllowTrailingStopLoss: boolean
    DefaultTrailingStopLoss: boolean
    AllowEditStopLoss: boolean
    AllowEditTakeProfit: boolean
    AllowSell: boolean
    AllowBuy: boolean
    AllowRedeem: boolean
    MinPositionUnitsForRedeem: number
    MaxPositionUnitsForRedeem: number
    AllowPartialClosePosition: boolean
    AllowEditStopLossLeveraged: boolean
    AllowEditTakeProfitLeveraged: boolean
    AllowNonLeveragedBuySlTp: boolean
    DefaultStopLossPercentageLeveraged: number
    DefaultStopLossPercentageNonLeveraged: number
    MinPositionAmountAbsoluteDiscounted: number
    MaxStopLossPercentageLeveragedBuy: number
    MaxStopLossPercentageLeveragedSell: number
    MaxStopLossPercentageNonLeveragedBuy: number
    MaxStopLossPercentageNonLeveragedSell: number
    RealTradeBuyMaxLeverage: number
    RealTradeSellMaxLeverage: number
    MarginTradeBuyMaxLeverage: number
    MarginTradeSellMaxLeverage: number
    IsNonLeveragedBuyAllowed: boolean
    AllowRevolvingDoors: boolean
    AllowClosePosition: boolean
    AllowPendingOrders: boolean
    AllowEntryOrders: boolean
    AllowExitOrder: boolean
    IsNonRealAsTRS: boolean
    NonLeveragedBuyCFDOverNightFee: number
    SdrtEligible: boolean
}

export interface InstrumentRawData {
    InstrumentID: number;
    TypeID: number;
    BuyCurrencyID: number;
    SellCurrencyID: number;
    IsDelisted: boolean;
    AllowManualTrading: boolean;
    RestrictedManualOpen: boolean;
    AllowSell: boolean;
    AllowBuy: boolean;
    Precision: number;
    AboveDollarPrecision: number;
    MaxPositionUnits: number;
    NonLeveragedSellEndOfWeekFee: number;
    NonLeveragedBuyEndOfWeekFee: number;
    LeveragedSellEndOfWeekFee: number;
    LeveragedBuyEndOfWeekFee: number;
    NonLeveragedBuyOverNightFee: number;
    NonLeveragedSellOverNightFee: number;
    LeveragedBuyOverNightFee: number;
    LeveragedSellOverNightFee: number;
    AllowPendingOrders: boolean;
    AllowEntryOrders: boolean;
    AllowExitOrder: boolean;
    IsNonRealAsTRS: boolean;
}

export interface InstrumentDisplayDatasRawData {
    InstrumentID: number;
    InstrumentDisplayName: string;
    InstrumentTypeID: number;
    ExchangeID: number;
    Images: Image[];
    SymbolFull: string;
    PriceSource: string;
    HasExpirationDate: boolean;
    IsInternalInstrument: boolean;
    StocksIndustryID?: number;
    InstrumentTypeSubCategoryID?: number;
}

export interface Image {
    InstrumentID: number;
    Width?: number;
    Height?: number;
    Uri?: string;
    BackgroundColor?: string;
    TextColor?: string;
}

export interface PublicInstrumentsDefaultValues {
    AllowClosePosition: boolean;
    AllowDiscountedRates: boolean;
    AllowEditStopLoss: boolean;
    AllowEditStopLossLeveraged: boolean;
    AllowEditTakeProfit: boolean;
    AllowEditTakeProfitLeveraged: boolean;
    AllowNonLeveragedBuySlTp: boolean;
    AllowPartialClosePosition: boolean;
    AllowRedeem: boolean;
    AllowTrailingStopLoss: boolean;
    DefaultLeverage: number;
    DefaultStopLossPercentageLeveraged: number;
    DefaultStopLossPercentageNonLeveraged: number;
    DefaultTakeProfitPercentage: number;
    DefaultTrailingStopLoss: boolean;
    Leverages: number[];
    MarginTradeBuyMaxLeverage: number;
    MarginTradeSellMaxLeverage: number;
    MaxPositionUnitsForRedeem: number;
    MaxStopLossPercentage: number;
    MaxStopLossPercentageLeveragedBuy: number;
    MaxStopLossPercentageLeveragedSell: number;
    MaxStopLossPercentageNonLeveragedBuy: number;
    MaxStopLossPercentageNonLeveragedSell: number;
    MaxTakeProfitPercentage: number;
    MinPositionAmount: number;
    MinPositionAmountAbsolute: number;
    MinPositionAmountAbsoluteDiscounted: number;
    MinPositionUnitsForRedeem: number;
    MinStopLossPercentage: number;
    MinTakeProfitPercentage: number;
    PotentialDisplayLeverages: number[];
    RealTradeBuyMaxLeverage: number;
    RealTradeSellMaxLeverage: number;
    RequiresW8Ben: boolean;
    IsNonLeveragedBuyAllowed: boolean;
    AllowRevolvingDoors: boolean;
    [key: string]: any; // Add this line
}

export interface Avatars {
    [key: string]: string;
    default: string;
    svg: string;
}

export interface Styles {
    backgroundColor: string;
    textColor: string;
}

export type InstrumentType = InstrumentRawData & InstrumentDisplayDatasRawData & Partial<PrivateInstrumentRawData> & {
    _Precision: number;
};
