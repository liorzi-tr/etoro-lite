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

export interface PositionGroup {
  instrument: ResultInstrument;
  positions: Position[];
  totalUnits: number;
}

export interface InstrumentBulk {
  ExchangeID: number;
  HasExpirationDate: boolean;
  Images: { Height: number; Width: number; Uri: string }[];

  InstrumentDisplayName: string;
  InstrumentID: number;
  InstrumentTypeID: number;
  IsInternalInstrument: boolean;
  PriceSource: string;
  SymbolFull: string;
}

export interface ClosingPricesResponse {
  InstrumentId: number;
  IsMarketOpen: boolean;
  OfficialClosingPrice: number;
}

export interface ResultInstrument {
  ExchangeID: number;
  HasExpirationDate: boolean;
  Images: { Height: number; Width: number; Uri: string }[];
  InstrumentDisplayName: string;
  InstrumentID: number;
  InstrumentTypeID: number;
  IsInternalInstrument: boolean;
  PriceSource: string;
  SymbolFull: string;
  IsMarketOpen: boolean;
  OfficialClosingPrice: number;
}
