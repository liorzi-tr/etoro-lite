import { Appearance } from "react-native";
import { AppDispatch } from "../store";

export const SET_THEME = 'SET_THEME';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export const setTheme = (theme: string | null | undefined) => ({
  type: SET_THEME,
  payload: theme,
});

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
});

export const initializeTheme = () => {
  return (dispatch: AppDispatch) => {
    const colorScheme = Appearance.getColorScheme() || 'light';
    dispatch(setTheme(colorScheme));

    Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setTheme(colorScheme));
    });
  };
};
