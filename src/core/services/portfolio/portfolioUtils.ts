import { Position, PrivatePortfolio } from '../../@etoro/types/login-data';

function groupPositionsByInstrument(portfolio: PrivatePortfolio) {
    const groupedPositions: { [key: number]: { totalAmount: number, positions: Position[] } } = {};

    portfolio.ClientPortfolio.Positions.forEach(position => {
      if (!groupedPositions[position.InstrumentID]) {
        groupedPositions[position.InstrumentID] = { totalAmount: 0, positions: [] };
      }
      groupedPositions[position.InstrumentID].totalAmount += position.Amount;
      groupedPositions[position.InstrumentID].positions.push(position);
    });

    return groupedPositions;
  }
