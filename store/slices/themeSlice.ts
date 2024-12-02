// slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import { AppDispatch } from '../store';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: Appearance.getColorScheme() || 'light',
};

// Thunk to initialize theme and set up listener
export const initializeTheme = () => (dispatch: AppDispatch) => {
  const colorScheme = Appearance.getColorScheme() || 'light';
  dispatch(setTheme(colorScheme));

  const listener = ({ colorScheme }: any) => {
    dispatch(setTheme(colorScheme || 'light'));
  };

  Appearance.addChangeListener(listener);

  // Optionally, return a cleanup function if needed
  // This can be handled in a component's useEffect cleanup
};


const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});


export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
