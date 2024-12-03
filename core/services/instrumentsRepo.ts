import axiosInstance from '../utils/api';
export interface InstrumentBulk{
    ExchangeID: number,
    HasExpirationDate: boolean,
    Images:{Height:number,Width:number, Uri:string} [],

    InstrumentDisplayName: string
    InstrumentID: number
    InstrumentTypeID: number
    IsInternalInstrument: boolean
    PriceSource: string
    SymbolFull: string
}

interface ClosingPricesResponse{InstrumentId:number,IsMarketOpen:boolean,OfficialClosingPrice:number}

interface ResultInstrument {
    ExchangeID: number,
    HasExpirationDate: boolean,
    Images:{Height:number,Width:number, Uri:string} [],

    InstrumentDisplayName: string
    InstrumentID: number
    InstrumentTypeID: number
    IsInternalInstrument: boolean
    PriceSource: string
    SymbolFull: string
    IsMarketOpen:boolean
    OfficialClosingPrice:number
}
const API_URL_BULK = 'https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments/bulk?bulkNumber=1&totalBulks=1';
const API_URL_CLOSING = 'https://api.etorostatic.com/sapi/candles/closingprices.json';
let cashing=null;
export const fetchInstruments = async (): Promise<ResultInstrument[]> => {
  try {
    const [bulk,closing] = await Promise.all([axiosInstance.get<{InstrumentDisplayDatas:InstrumentBulk[]}>(API_URL_BULK,{timeout:30000}),
        axiosInstance.get<ClosingPricesResponse[]>(API_URL_CLOSING,{timeout:30000})]);
    return mapInstruments(bulk.data.InstrumentDisplayDatas,closing.data);
  } catch (error) {
    console.error('Error fetching instruments:', error);
    throw error;
  }
};

const mapInstruments = (
    instrumentBulk: InstrumentBulk[],
    closingPrices: ClosingPricesResponse[]
  ): ResultInstrument[] => {
    const closingPricesMap = closingPrices.reduce((acc, closingPrice) => {
      acc[closingPrice.InstrumentId] = closingPrice;
      return acc;
    }, {} as { [key: number]: ClosingPricesResponse });
  
    return instrumentBulk.map(instrument => {
      const closingPrice = closingPricesMap[instrument.InstrumentID];
      return {
        ...instrument,
        IsMarketOpen: closingPrice ? closingPrice.IsMarketOpen : false,
        OfficialClosingPrice: closingPrice ? closingPrice.OfficialClosingPrice : 0,
      };
    });
  };