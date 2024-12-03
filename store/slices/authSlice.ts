// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Credentials, isLoginMissingScopes, isTwoFactorResponse } from '../../core/@etoro/types/auth';
import AuthService from '../../core/services/AuthService';
import { setTwoFactorRequired } from './twoFactorSlice';
import loginSerivce from '../../core/services/LoginSerivce';
import LogoutService from '../../core/services/LogoutService';

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

// Async thunk to check authentication on app startup
export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async () => {
    const accessToken = await AuthService.getAccessToken();
    if (accessToken) {
      setAuthenticatedTrue();
    }
    else {
      const refreshToken = await AuthService.getRefreshToken();
      if (refreshToken) {
        await loginSerivce.refreshToken();
      } else {
        logout();
      }
    }
  }
);


// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue, dispatch }) => {
    try {
      const data = await loginSerivce.authenticateUserBeforeLogin(credentials);
      // Handle two-factor authentication or missing scopes if needed
      if (isTwoFactorResponse(data)) {
        // Handle two-factor authentication
        // You may need to dispatch another action or update the state accordingly
        dispatch(setTwoFactorRequired(data));
        return rejectWithValue('Two-factor authentication required');
      }

      if (isLoginMissingScopes(data)) {
        // Handle missing scopes
        return rejectWithValue('Permissions required');
      }

      await loginSerivce.refreshToken(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      AuthService.clearTokens();
    },
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
      .addCase(checkAuthentication.fulfilled, state => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setAuthenticatedTrue, setAuthenticatedFalse } = authSlice.actions;

export default authSlice.reducer;
