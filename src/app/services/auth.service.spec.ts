import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { USER_MAP } from './auth.constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true on logout', fakeAsync(() => {
    service.logout().subscribe((result) => {
      expect(result).toBe(true);
    });
  }));

  it('should return a session on successful login', fakeAsync(() => {
    const [[credentialKey, credentialValue]] = Array.from(USER_MAP.entries());

    const [username, password] = credentialKey.split('===');

    service.login(username, password).subscribe((res) => {
      expect(res).toEqual(credentialValue);
    });

    tick(2000);
  }));

  it('should return a error on Catch login', fakeAsync(() => {
    service.login('username', 'password').subscribe(
      (res) => {},
      (e) => {
        expect(e.message).toBe('Usuario y/o contraseña incorrectos');
      }
    );

    tick(2000);
  }));
});
