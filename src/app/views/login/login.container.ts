import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginForm } from '../../interface/login-form.interface';
import { Store } from '@ngrx/store';
import { login } from '../../store/session/session.actions';
import { Observable } from 'rxjs';
import { selectIsLoading, selectSessionError } from '../../store/session/session.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-container',
  standalone: true,
  template: `
    <app-login-ui [errorMessage]="error$ | async" [loading]="loading$ | async" (sendForm)="sendFormHandler($event)" />
  `,
  imports: [LoginComponent, CommonModule],
})
export class LoginContainer implements OnInit {
  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private _store: Store) {
    this.error$ = this._store.select(selectSessionError);
    this.loading$ = this._store.select(selectIsLoading);
  }

  ngOnInit() {}

  sendFormHandler(loginForm: LoginForm) {
    this._store.dispatch(login(loginForm));
  }
}
