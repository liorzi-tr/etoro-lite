import { PositionGroup } from "../types";
import { LoginDataResponse } from "../../../core/@etoro/types/login-data";
import { ResultInstrument } from "../types";

export function groupPositionsWithInstruments(loginData: LoginDataResponse, instruments: { [key: number]: ResultInstrument }): PositionGroup[] {
  const groupedPositions: { [key: number]: PositionGroup } = {};

  // Group positions by InstrumentID and add instrument data
  loginData.AggregatedResult?.ApiResponses?.PrivatePortfolio?.Content.ClientPortfolio?.Positions.forEach(
    (position) => {
      const instrumentId = position.InstrumentID;
      const instrument = instruments[instrumentId];

      if (!groupedPositions[instrumentId]) {
        groupedPositions[instrumentId] = {
          instrument,
          positions: [],
          totalUnits: 0,
        };
      }

      groupedPositions[instrumentId].positions.push(position);
      groupedPositions[instrumentId].totalUnits += position.Amount;
    }
  );

  return Object.values(groupedPositions);
}