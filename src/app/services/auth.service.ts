import { Injectable } from '@angular/core';
import { delay, mergeMap, Observable, of, throwError, timer } from 'rxjs';

import { Session } from '../interface/session.interface';
import { USER_MAP } from './auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  logout() {
    // TODO: Simulación de llamado a un servicio

    return of(true);
  }

  login(username: string, password: string): Observable<Session> {
    // TODO: Simulación de llamado a un servicio

    const res = USER_MAP.get(`${username}===${password}`);

    if (!res) return timer(2000).pipe(mergeMap(() => throwError(() => new Error('Usuario y/o contraseña incorrectos'))));

    return of(res).pipe(delay(2000));
  }
}
