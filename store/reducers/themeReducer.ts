import { SET_THEME, TOGGLE_THEME } from '../actions/themeActions';

const initialState = {
  mode: 'light',
};

const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, mode: action.payload };
    case TOGGLE_THEME:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default themeReducer;
