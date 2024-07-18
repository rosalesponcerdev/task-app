import { createReducer, on } from '@ngrx/store';

import { loginFailure, loginSuccess, logout, setLoading } from './session.actions';
import { Session } from '../../interface/session.interface';

export interface SessionState {
  session: Session | null;
  error: any;
  isLoading: boolean;
  name: string | null;
}

export const initialState: SessionState = {
  session: null,
  error: null,
  isLoading: false,
  name: null,
};

export const sessionReducer = createReducer(
  initialState,

  on(loginSuccess, (state, { session }) => {
    let name = '';

    try {
      name = JSON.parse(atob(session.token.split('.')[1])).name;
    } catch (error) {}

    return {
      ...state,
      session,
      error: null,
      isLoading: false,
      name,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    session: null,
    error,
    isLoading: false,
  })),
  on(logout, (state) => ({
    ...state,
    session: null,
    error: null,
    isLoading: false,
  })),
  on(setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  }))
);
