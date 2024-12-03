import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PortfolioColumnsState {
  displayedColumns: string[];
}

const initialState: PortfolioColumnsState = {
  displayedColumns: ['OpenDateTime', 'OpenRate', 'InstrumentID', 'IsBuy', 'TakeProfitRate', 'StopLossRate', 'Amount', 'Leverage'],
};

const portfolioColumnsSlice = createSlice({
  name: 'portfolioColumns',
  initialState,
  reducers: {
    setDisplayedColumns(state, action: PayloadAction<string[]>) {
      state.displayedColumns = action.payload;
    },
    addDisplayedColumn(state, action: PayloadAction<string>) {
      if (!state.displayedColumns.includes(action.payload)) {
        state.displayedColumns.push(action.payload);
      }
    },
    removeDisplayedColumn(state, action: PayloadAction<string>) {
      state.displayedColumns = state.displayedColumns.filter(column => column !== action.payload);
    },
  },
});

export const { setDisplayedColumns, addDisplayedColumn, removeDisplayedColumn } = portfolioColumnsSlice.actions;
export default portfolioColumnsSlice.reducer;