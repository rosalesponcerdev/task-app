import { Component, EventEmitter, Output } from '@angular/core';
import { UserSectionComponent } from './user-section.component';
import { Store } from '@ngrx/store';
import { selectName } from '../../store/session/session.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { logout } from '../../store/session/session.actions';

@Component({
  selector: 'app-user-section-container',
  standalone: true,
  imports: [CommonModule, UserSectionComponent],
  template: `
    <app-user-section-ui [username]="username$ | async" (clickLogout)="logoutHandler()" />
  `,
})
export class UserSectionContainer {
  username$: Observable<string | null>;

  constructor(private _store: Store) {
    this.username$ = this._store.select(selectName);
  }

  logoutHandler() {
    this._store.dispatch(logout());
  }
}
