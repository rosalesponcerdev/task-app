import { createAction, props } from '@ngrx/store';
import { Session } from '../../interface/session.interface';
import { LoginForm } from '../../interface/login-form.interface';

export const login = createAction('[Session] Login', props<LoginForm>());
export const loginSuccess = createAction('[Session] Login Success', props<{ session: Session }>());
export const loginFailure = createAction('[Session] Login Failure', props<{ error: any }>());
export const setLoading = createAction('[Session] Set Loading', props<{ isLoading: boolean }>());

export const logout = createAction('[Session] Logout');
export const logoutSuccess = createAction('[Session] logout Success');
