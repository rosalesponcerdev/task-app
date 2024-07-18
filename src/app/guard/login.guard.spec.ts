import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterModule } from '@angular/router';

import { loginGuard } from './login.guard';
import { provideStore, Store } from '@ngrx/store';
import { sessionReducer } from '../store/session/session.reducer';
import { taskReducer } from '../store/task/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { SessionEffects } from '../store/session/session.effects';
import { Observable, of } from 'rxjs';

describe('loginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    store = TestBed.inject(Store);

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('Login Success', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(true));

    (executeGuard({} as any, {} as any) as Observable<boolean>).subscribe((res) => {
      expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
      expect(res).toBeFalsy();
    });
  });

  it('Login Error', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(false));

    (executeGuard({} as any, {} as any) as Observable<boolean>).subscribe((res) => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(res).toBeFalsy();
    });
  });
});
