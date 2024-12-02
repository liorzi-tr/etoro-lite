// twoFactorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TwoFactorResponse } from '../../core/@etoro/types/auth';
import loginSerivce from '../../core/services/LoginSerivce';

interface TwoFactorState {
  required: boolean;
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TwoFactorState = {
  required: false,
  data: null,
  status: 'idle',
  error: null,
};

export const verifyTwoFactor = createAsyncThunk(
  'twoFactor/verify',
  async ({ twoFAData, otp }: { twoFAData: TwoFactorResponse; otp: string } , { rejectWithValue }) => {
    try {
      const data = await loginSerivce.verifyTwoFactor(twoFAData, otp);
      await loginSerivce.refreshToken(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Verification failed');
    }
  },
);

const twoFactorSlice = createSlice({
  name: 'twoFactor',
  initialState,
  reducers: {
    setTwoFactorRequired(state, action) {
      state.required = true;
      state.data = action.payload;
    },
    resetTwoFactor(state) {
      state.required = false;
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyTwoFactor.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyTwoFactor.fulfilled, state => {
        state.status = 'succeeded';
        state.required = false;
      })
      .addCase(verifyTwoFactor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setTwoFactorRequired, resetTwoFactor } = twoFactorSlice.actions;

export default twoFactorSlice.reducer;
