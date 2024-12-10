
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setTwoFactorRequired } from './twoFactorSlice';
import loginSerivce from '../../core/services/LoginSerivce';
import { Credentials, isLoginMissingScopes, isTwoFactorResponse, LoginResponse } from '../../features/auth/types';
import { deleteSecureData, getSecureData } from '../../features/auth/utils/secureStore';

interface AuthState {
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async (_: any, { dispatch }) => {
    const accessToken = await getSecureData('accessToken');
    if (accessToken) {
      dispatch(setAuthenticatedTrue());
    }
    else if (!accessToken) {
      const refreshToken = await getSecureData('refreshToken');
      if (refreshToken) {
        await loginSerivce.refreshToken();
        dispatch(setAuthenticatedTrue());
      }
    }
    else {
      dispatch(setAuthenticatedFalse());
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue, dispatch }) => {
    try {
      const data: LoginResponse = await loginSerivce.authenticateUserBeforeLogin(credentials);

      if (isTwoFactorResponse(data)) {
        dispatch(setTwoFactorRequired(data));
        return rejectWithValue('Two-factor authentication required');
      }

      if (isLoginMissingScopes(data)) {
        return rejectWithValue('Permissions required');
      }

      await loginSerivce.refreshToken(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(setAuthenticatedFalse());
    await deleteSecureData('accessToken');
    await deleteSecureData('refreshToken');
    await deleteSecureData('deviceToken');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedTrue(state) {
      state.isAuthenticated = true;
    },
    setAuthenticatedFalse(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthentication.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { setAuthenticatedTrue, setAuthenticatedFalse } = authSlice.actions;

export default authSlice.reducer;
