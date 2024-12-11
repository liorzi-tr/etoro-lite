import {
  ClosingPricesResponse,
  InstrumentBulk,
  ResultInstrument,
} from '../../features/portfolio/types';
import axiosInstance from '../utils/api';

const API_URL_BULK = 'https://api.etorostatic.com/sapi/instrumentsmetadata/V1.1/instruments/bulk?bulkNumber=1&totalBulks=1';
const API_URL_CLOSING = 'https://api.etorostatic.com/sapi/candles/closingprices.json';
const instrumentLookup: { [key: number]: ResultInstrument } = {};


export const fetchInstruments = async (): Promise<{ [key: number]: ResultInstrument; }> => {

  try {
    const [bulk, closing] = await Promise.all([
      axiosInstance.get<{ InstrumentDisplayDatas: InstrumentBulk[] }>(
        API_URL_BULK,
        { timeout: 30000 }
      ),
      axiosInstance.get<ClosingPricesResponse[]>(API_URL_CLOSING, {
        timeout: 30000,
      }),
    ]);
    return mapInstruments(bulk.data.InstrumentDisplayDatas, closing.data);
  } catch (error) {
    console.error('Error fetching instruments:', error);
    throw error;
  }
};

const mapInstruments = (instrumentBulk: InstrumentBulk[], closingPrices: ClosingPricesResponse[]): { [key: number]: ResultInstrument } => {
  const closingPricesMap = closingPrices.reduce((acc, closingPrice) => {
    acc[closingPrice.InstrumentId] = closingPrice;
    return acc;
  }, {} as { [key: number]: ClosingPricesResponse });

  instrumentBulk.forEach((instrument) => {
    const closingPrice = closingPricesMap[instrument.InstrumentID];
    instrumentLookup[instrument.InstrumentID] = {
      ...instrument,
      IsMarketOpen: closingPrice ? closingPrice.IsMarketOpen : false,
      OfficialClosingPrice: closingPrice
        ? closingPrice.OfficialClosingPrice
        : 0,
    };
    return {
      ...instrument,
      IsMarketOpen: closingPrice ? closingPrice.IsMarketOpen : false,
      OfficialClosingPrice: closingPrice
        ? closingPrice.OfficialClosingPrice
        : 0,
    };
  });
  return instrumentLookup;
};
