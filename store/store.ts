import { configureStore } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import rootReducer from '.';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface membersCounterState {
  value: number;
}

export interface userState {
  user: User | null;
  status: string;
  error: any;
}

export interface themeState {
  mode: string;
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
