// slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Appearance } from 'react-native';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: Appearance.getColorScheme() || 'dark',
};

// Thunk to initialize theme and set up listener
export const initializeTheme = () => (dispatch: AppDispatch) => {
  console.log('initializeTheme');
  console.log('current mode', Appearance.getColorScheme());

  console.log('initialState mode', initialState.mode);


  const colorScheme = Appearance.getColorScheme() || 'light';
  dispatch(setTheme(colorScheme));

  const listener = ({ colorScheme }: any) => {
    console.log('colorScheme changed to', colorScheme);
    dispatch(setTheme(colorScheme || 'light'));
  };

  const subscription = Appearance.addChangeListener(listener);

  return () => subscription.remove();
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
