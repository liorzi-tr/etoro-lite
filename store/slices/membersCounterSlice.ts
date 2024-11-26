import { createSlice } from '@reduxjs/toolkit';

export const membersCounterSlice = createSlice({
  name: 'membersCounter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = membersCounterSlice.actions;
export default membersCounterSlice.reducer;
