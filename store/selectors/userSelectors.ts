import { RootState } from '../store';
import { createSelector } from 'reselect';

export const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectUserStatus = createSelector(
  [selectUserState],
  (userState) => userState.status
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);
