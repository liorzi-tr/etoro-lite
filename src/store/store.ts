import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import twoFactorReducer from './slices/twoFactorSlice';
import portfolioColumnsSlice from './slices/portfolioColumns';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    twoFactor: twoFactorReducer,
    theme: themeReducer,
    portfolioColumns:portfolioColumnsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface themeState {
  mode: string;
}
export interface portfolioColumns{
    displayedColumns:string[]
}
