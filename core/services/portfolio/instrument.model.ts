import { Avatars, Image, InstrumentDisplayDatasRawData, InstrumentRawData, InstrumentType, PrivateInstrumentRawData, PublicInstrumentsDefaultValues, Styles } from './interface';
import { sortBy, union } from 'lodash-es';
import { CryptoType, Exchange, Industry, InstrumentCategory } from './instrument-groups-factory.interface';
import tradingCalculator from './tradingCalculator';
interface Rate {
    EtoroPriceBid:number,
    CfdMarkupAsk:number,
    CfdMarkupBid:number,
    EtoroPriceAsk:number,
    ClosingPrices:{
        OfficialClosingPrice:number,
        IsMarketOpen:boolean, // why this is here? 
    },
    IsMarketOpen:boolean,
    ConversionRateBid:number,
    lastBidChange:number,
    lastAskChange:number
}
const publicInstrumentsDefaultValues: PublicInstrumentsDefaultValues = {
  AllowClosePosition: true,
  AllowDiscountedRates: false,
  AllowEditStopLoss: true,
  AllowEditStopLossLeveraged: true,
  AllowEditTakeProfit: true,
  AllowEditTakeProfitLeveraged: true,
  AllowNonLeveragedBuySlTp: true,
  AllowPartialClosePosition: true,
  AllowRedeem: false,
  AllowTrailingStopLoss: true,
  DefaultLeverage: 1,
  DefaultStopLossPercentageLeveraged: 50,
  DefaultStopLossPercentageNonLeveraged: 50,
  DefaultTakeProfitPercentage: 50,
  DefaultTrailingStopLoss: false,
  Leverages: [1],
  MarginTradeBuyMaxLeverage: 0,
  MarginTradeSellMaxLeverage: 0,
  MaxPositionUnitsForRedeem: 1000000,
  MaxStopLossPercentage: 75,
  MaxStopLossPercentageLeveragedBuy: 75,
  MaxStopLossPercentageLeveragedSell: 75,
  MaxStopLossPercentageNonLeveragedBuy: 100,
  MaxStopLossPercentageNonLeveragedSell: 100,
  MaxTakeProfitPercentage: 1000,
  MinPositionAmount: 50,
  MinPositionAmountAbsolute: 50,
  MinPositionAmountAbsoluteDiscounted: 50,
  MinPositionUnitsForRedeem: 0.1,
  MinStopLossPercentage: 0,
  MinTakeProfitPercentage: 0,
  PotentialDisplayLeverages: [],
  RealTradeBuyMaxLeverage: 1,
  RealTradeSellMaxLeverage: 0,
  RequiresW8Ben: false,
  IsNonLeveragedBuyAllowed: true,
  AllowRevolvingDoors: false,
};

export class Instrument implements InstrumentType {
  static $injector = null;
  originalCtorName = 'Instrument';

  private _data: InstrumentRawData;
  private _metadata: InstrumentDisplayDatasRawData;
  private _hasPrivateData = false;

  // data
  InstrumentID!: number;
  TypeID!: number;
  BuyCurrencyID!: number;
  SellCurrencyID!: number;
  IsDelisted!: boolean;
  AllowManualTrading!: boolean;
  RestrictedManualOpen!: boolean;
  AllowSell!: boolean;
  AllowBuy!: boolean;
  // Precision: number;
  AboveDollarPrecision!: number;
  // MaxPositionUnits: number;
  NonLeveragedSellEndOfWeekFee!: number;
  NonLeveragedBuyEndOfWeekFee!: number;
  LeveragedSellEndOfWeekFee!: number;
  LeveragedBuyEndOfWeekFee!: number;
  NonLeveragedBuyOverNightFee!: number;
  NonLeveragedSellOverNightFee!: number;
  LeveragedBuyOverNightFee!: number;
  LeveragedSellOverNightFee!: number;
  AllowPendingOrders!: boolean;
  AllowEntryOrders!: boolean;
  AllowExitOrder!: boolean;
  IsNonRealAsTRS!: boolean;
  hasOptions!: boolean;

  // metadata
  InstrumentDisplayName!: string;
  InstrumentTypeID!: number;
  ExchangeID!: number;
  Images!: Image[];
  SymbolFull!: string;
  PriceSource!: string;
  HasExpirationDate!: boolean;
  IsInternalInstrument!: boolean;
  StocksIndustryID?: number;
  InstrumentTypeSubCategoryID?: number;

  IsStock: boolean;
  IsETF: boolean;
  IsCrypto: boolean;
  Name: string;
  DisplayName: string;
  Url: string;
  Avatars: Avatars = {
    default: '',
    svg:''
  };

  // private data
  Leverage1MaintenanceMargin!: number;
  Leverages!: number[];
  PotentialDisplayLeverages!: number[];
  DefaultLeverage!: number;
  MinPositionAmount!: number;
  MaxStopLossPercentage!: number;
  MaxTakeProfitPercentage!: number;
  MinPositionAmountAbsolute!: number;
  IsGuaranteeSlTp!: boolean;
  SettledBuyMaxLeverage!: number;
  SettledSellMaxLeverage!: number;
  RequiresW8Ben!: boolean;
  MinStopLossPercentage!: number;
  MinTakeProfitPercentage!: number;
  DefaultStopLossPercentage!: number;
  DefaultTakeProfitPercentage!: number;
  AllowTrailingStopLoss!: boolean;
  DefaultTrailingStopLoss!: boolean;
  AllowEditStopLoss!: boolean;
  AllowEditTakeProfit!: boolean;
  AllowRedeem!: boolean;
  MinPositionUnitsForRedeem!: number;
  MaxPositionUnitsForRedeem!: number;
  AllowPartialClosePosition!: boolean;
  AllowEditStopLossLeveraged!: boolean;
  AllowEditTakeProfitLeveraged!: boolean;
  AllowNonLeveragedBuySlTp!: boolean;
  DefaultStopLossPercentageLeveraged!: number;
  DefaultStopLossPercentageNonLeveraged!: number;
  AllowDiscountedRates!: boolean;
  MinPositionAmountAbsoluteDiscounted!: number;
  MaxStopLossPercentageLeveragedBuy!: number;
  MaxStopLossPercentageLeveragedSell!: number;
  MaxStopLossPercentageNonLeveragedBuy!: number;
  MaxStopLossPercentageNonLeveragedSell!: number;
  RealTradeBuyMaxLeverage!: number;
  RealTradeSellMaxLeverage!: number;
  MarginTradeBuyMaxLeverage!: number;
  MarginTradeSellMaxLeverage!: number;
  IsNonLeveragedBuyAllowed!: boolean;
  AllowRevolvingDoors!: boolean;
  AllowClosePosition!: boolean;
  NonLeveragedBuyCFDOverNightFee!: number;
  SdrtEligible!: boolean;

  Styles: Styles = {
    backgroundColor: '',
    textColor: ''
  };

  isContractExpiry: boolean;
  isCFD: boolean;
  isCryptocurrencies: boolean;
  defaultStopLossPercent: number;
  defaultTakeProfitPercent: number;
  _Precision!: number;
  maxUnits!: number;
  shortBioAndLocalNameView: any;
  isUSDCurrency: boolean;

  instrumentType!: InstrumentCategory;
  exchange!: Exchange;
  industry!: Industry;
  cryptoCategory!: CryptoType;
  _privateData!:Record<string,any>|null;
  constructor(
    data: InstrumentRawData,
    metadata: InstrumentDisplayDatasRawData,
  ) {
    this._data = data;
    this._metadata = metadata;

    this.IsStock = this.TypeID === 5;
    this.IsETF = this.TypeID === 6;
    this.IsCrypto = this.TypeID === 10;

    this.Name = this.SymbolFull;
    this.DisplayName = this.InstrumentDisplayName;
    this.Url = ('/markets/' + this.Name).toLowerCase();
    this.isContractExpiry = this.HasExpirationDate;

    this.isCFD = this.TypeID !== 1;
    this.isCryptocurrencies = this.TypeID === 10;
    this.defaultStopLossPercent = this.isCryptocurrencies ? 100 : 50;
    this.defaultTakeProfitPercent = this.isCryptocurrencies ? 500 : 50;
    this.isUSDCurrency = this.SellCurrencyID === 1;

    if (this.Images) {
      this.Images.forEach(image => {
        if (/.svg$/i.test(image?.Uri||'')) {
          this.Avatars.svg = image.Uri||'';
          this.Styles.backgroundColor = image.BackgroundColor||'';
          this.Styles.textColor = image.TextColor||'';
        } else {
          this.Avatars[image.Width + 'x' + image.Height] = image.Uri||'';
        }
      });
      this.Avatars['default'] = this.Avatars[this.IsStock ? '150x150' : '70x70'] || this.Avatars['150x150'];
    }
  }

  get uniqueId(): string {
    return this.Type + '-' + this.ItemId;
  }

  set Precision(value) {
    this._Precision = value;
  }

  get Precision() {
    return tradingCalculator.getPrecisionByRate(this, this.BidRounded());
  }

  get spread(): number {
    const precision = this.BidRounded(false) < 1 ? this._Precision : this.AboveDollarPrecision;
    const askSpreaded = +this.AskRounded(false).toFixed(precision);
    const bidSpreaded = +this.BidRounded(false).toFixed(precision);
    return Math.abs(+(askSpreaded - bidSpreaded).toFixed(precision));
  }

  get ProviderPriceSource() {
    // Logged out user + NASDAQ provider = delayed massage
    // ExchangeID 4 is NASDAQ, and ExchangeID=5 is NYSE
    if ( (this.IsStock || this.IsETF) && (this.ExchangeID === 4 || this.ExchangeID === 5)) {
      return this.PriceSource + '.delayed';
    }
    return this.PriceSource;
  }

  set MaxPositionUnits(maxUnits:number) {
    this.maxUnits = maxUnits;
  }



  get ItemId() {
    return this.InstrumentID;
  }

  get Type() {
    return 'instrument';
  }


  get fullName() {
    return this.TypeID === 5 || this.TypeID === 6 || this.TypeID === 10
      ? this.InstrumentDisplayName
      : '';
  }

  get shortName() {
    return this.SymbolFull;
  }

  get rate(): Rate {
    return {
        EtoroPriceBid: 250.35,
        CfdMarkupAsk: 1.02,
        CfdMarkupBid: 0.98,
        EtoroPriceAsk: 250.50,
        ClosingPrices: {
          OfficialClosingPrice: 249.80,
          IsMarketOpen: false, // Could indicate the market's state at the official close
        },
        IsMarketOpen: true, // Indicates the current market status
        ConversionRateBid: 0.85,
        lastBidChange: 0,
        lastAskChange: 0,

      };
  }


  get mergedLeveragesList() {
    const mergedLeverages = union(
      this.Leverages,
      this.PotentialDisplayLeverages
    ).sort();
    return sortBy(mergedLeverages, (num:number) => num);
  }

  get IsAllowBuy() {
    return this.AllowManualTrading && this.AllowBuy;
  }

  get IsAllowSell() {
    return this.AllowManualTrading && this.AllowSell;
  }

  isExecutionEligible(isBuy: boolean = true) {
    return (isBuy ? this.IsAllowBuy : this.IsAllowSell) ;
  }


  isPotentialDisplayLeverage(Leverage:number) {
    return this.PotentialDisplayLeverages.indexOf(Leverage) !== -1;
  }


  Price(isReal: boolean = false): number {
    return  this.BidRounded(isReal);
  }

  BidRounded(isReal: boolean = false): number {
    const rate = this.rate;
    const markup = 0;
    const bid = rate.EtoroPriceBid - markup;

    return bid;

  }
  get CfdMarkupAsk() {
    return this.rate.CfdMarkupAsk;
  }

  get CfdMarkupBid() {
    return this.rate.CfdMarkupBid;
  }

  get RealMarkupAsk() {
    return [5, 6].includes(this.InstrumentTypeID) ? 0 : this.rate.CfdMarkupAsk;
  }
  AskRounded(isReal: boolean = false): number {
    const rate = this.rate;
    const markup = (isReal ) ? this.RealMarkupAsk : this.CfdMarkupAsk;
    const ask = rate.EtoroPriceAsk + markup;

    return tradingCalculator.getRateRounded(this, ask, Math.ceil);
  }

  ClosingPriceRounded(): number {
    const rate = this.rate;

    return rate.ClosingPrices.OfficialClosingPrice;
  }

  lastPrice(isReal = false): number {
    const lastPrice = (this.rate.ClosingPrices.IsMarketOpen )
      ? this.Price(isReal)
      : this.ClosingPriceRounded() || 0;
    return lastPrice || 0;
  }

  get isRealInstrument() {
    return this.RealTradeBuyMaxLeverage > 0 || this.RealTradeSellMaxLeverage > 0;
  }

  getUnitMargin(isBuy: boolean, isReal = false): number|undefined {
    if (!this.rate) {
      return undefined;
    }
    const rate = isBuy ? this.AskRounded(isReal) : this.BidRounded(isReal);
    return rate * this.rate.ConversionRateBid;
  }

  get isNoneLeveragedOnly() {
    const leveragesList = this.Leverages;
    if (leveragesList && leveragesList.length === 1 && leveragesList[0] === 1) {
      return true;
    }
    return false;
  }

  setPrivateData(privateData: PrivateInstrumentRawData) {
    this._hasPrivateData = true;
    this._privateData = privateData;
  }

  clearPrivateData() {
    this._hasPrivateData = false;
    this._privateData = null;
  }
}

const metadataProperties = [
  'InstrumentDisplayName',
  'InstrumentTypeID',
  'ExchangeID',
  'Images',
  'SymbolFull',
  'StocksIndustryID',
  'PriceSource',
  'HasExpirationDate',
  'IsInternalInstrument',
  'InstrumentTypeSubCategoryID',
];

const instrumentProperies = [
  'InstrumentID',
  'TypeID',
  'BuyCurrencyID',
  'SellCurrencyID',
  'IsDelisted',
  'AllowManualTrading',
  'RestrictedManualOpen',
  'AllowSell',
  'AllowBuy',
  'Precision',
  'AboveDollarPrecision',
  'MaxPositionUnits',
  'NonLeveragedSellEndOfWeekFee',
  'NonLeveragedBuyEndOfWeekFee',
  'LeveragedSellEndOfWeekFee',
  'LeveragedBuyEndOfWeekFee',
  'NonLeveragedBuyOverNightFee',
  'NonLeveragedBuyCFDOverNightFee',
  'NonLeveragedSellOverNightFee',
  'LeveragedBuyOverNightFee',
  'LeveragedSellOverNightFee',
  'AllowPendingOrders',
  'AllowEntryOrders',
  'AllowExitOrder',
  'AllowClosePosition',
  'AllowDiscountedRates',
  'AllowEditStopLoss',
  'AllowEditStopLossLeveraged',
  'AllowEditTakeProfit',
  'AllowEditTakeProfitLeveraged',
  'AllowNonLeveragedBuySlTp',
  'AllowPartialClosePosition',
  'AllowRedeem',
  'AllowTrailingStopLoss',
  'DefaultLeverage',
  'DefaultStopLossPercentageLeveraged',
  'DefaultStopLossPercentageNonLeveraged',
  'DefaultTakeProfitPercentage',
  'DefaultTrailingStopLoss',
  'Leverages',
  'MarginTradeBuyMaxLeverage',
  'MarginTradeSellMaxLeverage',
  'MaxPositionUnitsForRedeem',
  'MaxStopLossPercentage',
  'MaxStopLossPercentageLeveragedBuy',
  'MaxStopLossPercentageLeveragedSell',
  'MaxStopLossPercentageNonLeveragedBuy',
  'MaxStopLossPercentageNonLeveragedSell',
  'MaxTakeProfitPercentage',
  'MinPositionAmount',
  'MinPositionAmountAbsolute',
  'MinPositionAmountAbsoluteDiscounted',
  'MinPositionUnitsForRedeem',
  'MinStopLossPercentage',
  'MinTakeProfitPercentage',
  'PotentialDisplayLeverages',
  'RealTradeBuyMaxLeverage',
  'RealTradeSellMaxLeverage',
  'RequiresW8Ben',
  'IsNonLeveragedBuyAllowed',
  'AllowRevolvingDoors',
  'IsNonRealAsTRS',
  'SdrtEligible'
];

instrumentProperies.forEach(prop => {
  const fieldsMap: { [key: string]: string } = { Precision: '_Precision' };
  const name = fieldsMap[prop] || prop;

  Object.defineProperty(Instrument.prototype, name, {
    get: function () {
      if (this._hasPrivateData && typeof this._privateData[prop] !== 'undefined') {
        return this._privateData[prop];
      }

      if (typeof this._data[prop] !== 'undefined') {
        return this._data[prop];
      }

      return publicInstrumentsDefaultValues[prop];
    },
    set: function (newValue) {
      if (this._hasPrivateData) {
        this._privateData[prop] = newValue;
      } else {
        this._data[prop] = newValue;
      }
    },
    enumerable: true,
  });
});

metadataProperties.forEach(prop => {
  Object.defineProperty(Instrument.prototype, prop, {
    get: function () {
      return this._metadata[prop];
    },
    set: function (newValue) {
      this._metadata[prop] = newValue;
    },
    enumerable: true,
  });
});

export type GroupType = InstrumentCategory;
