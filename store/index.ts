// store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import membersCounterReducer from './slices/membersCounterSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  membersCounter: membersCounterReducer,
  user: userReducer,
  theme: themeReducer,
});

export default rootReducer;
