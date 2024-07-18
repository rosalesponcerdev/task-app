import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ActionReducer, ActionReducerMap, MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { sessionReducer, SessionState } from './store/session/session.reducer';
import { SessionEffects } from './store/session/session.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { taskReducer, TaskState } from './store/task/task.reducer';

export interface GlobalState {
  session: SessionState;
  task: TaskState;
}

const reducers: ActionReducerMap<GlobalState> = {
  session: sessionReducer,
  task: taskReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<GlobalState>): ActionReducer<GlobalState> {
  return localStorageSync({
    keys: ['session', 'task'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<GlobalState, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers, { metaReducers }), provideEffects(SessionEffects)],
};
