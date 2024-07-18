import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SessionState } from './session.reducer';

export const selectSessionState = createFeatureSelector<SessionState>('session');

export const selectSessionError = createSelector(selectSessionState, (state: SessionState) => state.error);
export const selectIsLoggedIn = createSelector(selectSessionState, (state: SessionState) => !!state.session);
export const selectIsLoading = createSelector(selectSessionState, (state: SessionState) => !!state.isLoading);
export const selectName = createSelector(selectSessionState, (state: SessionState) => state.name);
