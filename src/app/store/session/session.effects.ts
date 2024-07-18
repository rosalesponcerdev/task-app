// src/app/state/session/session.effects.ts
import { Injectable } from '@angular/core';

import { merge, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as SessionActions from './session.actions';
import * as TaskActions from '../task/task.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class SessionEffects {
  login$ = createEffect(() =>
    this._actions.pipe(
      ofType(SessionActions.login),
      tap(() => this._store.dispatch(SessionActions.setLoading({ isLoading: true }))),
      mergeMap((action) =>
        this._authService.login(action.username, action.password).pipe(
          tap(() => this._store.dispatch(SessionActions.setLoading({ isLoading: false }))),
          mergeMap((session) => [SessionActions.loginFailure({ error: null }), SessionActions.loginSuccess({ session })]),
          catchError((error) => of(SessionActions.loginFailure({ error: error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () => {
      return this._actions.pipe(
        ofType(SessionActions.loginSuccess),
        tap(() => this._router.navigate(['/']))
      );
    },
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(() =>
    this._actions.pipe(
      ofType(SessionActions.logout),
      mergeMap(() =>
        this._authService.logout().pipe(
          mergeMap(() => [TaskActions.clearAllTasks(), SessionActions.logoutSuccess()]),
          catchError((error) => of(SessionActions.loginFailure({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () => {
      return this._actions.pipe(
        ofType(SessionActions.logoutSuccess),
        tap(() => {
          this._router.navigate(['/login']);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(private _actions: Actions, private _authService: AuthService, private _router: Router, private _store: Store) {}
}
