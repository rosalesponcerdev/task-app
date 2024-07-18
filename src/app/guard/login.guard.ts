import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/session/session.selectors';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = (_route, _state) => {
  const storeSrv = inject(Store);
  const router = inject(Router);

  return storeSrv.select(selectIsLoggedIn).pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) router.navigate(['/login']);

      return isLoggedIn;
    })
  );
};
