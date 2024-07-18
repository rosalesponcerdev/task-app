import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { provideStore, Store } from '@ngrx/store';
import { sessionReducer } from '../session/session.reducer';

import { provideEffects } from '@ngrx/effects';
import { SessionEffects } from '../session/session.effects';
import { login } from './session.actions';
import { selectIsLoggedIn } from './session.selectors';

describe('Session', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideStore({
          session: sessionReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  test('Session', fakeAsync(() => {
    store.dispatch(
      login({
        password: 'test01',
        username: 'test01',
      })
    );

    tick(6000);

    store.select(selectIsLoggedIn).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  }));
});
