import { fetchInstruments } from '../../../core/services/instrumentsRepo';
import { PositionGroup, ResultInstrument } from '../types';
import fetchLoginData from '../../../core/services/loginData/LoginDataService';
import { LoginDataResponse } from '../../../core/@etoro/types/login-data';
import { groupPositionsWithInstruments } from '../utils/utils';

export const getPortfolioData = async (): Promise<PositionGroup[]> => {
  const [instruments, loginData] = await Promise.all([
    fetchInstruments(),
    fetchLoginData(),
  ]);
  return groupPositionsWithInstruments(loginData, instruments);
};
