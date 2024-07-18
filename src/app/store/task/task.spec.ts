import { TestBed } from '@angular/core/testing';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { provideStore, Store } from '@ngrx/store';
import { sessionReducer } from '../session/session.reducer';
import { taskReducer } from './task.reducer';
import { provideEffects } from '@ngrx/effects';
import { SessionEffects } from '../session/session.effects';
import { addTask, clearAllTasks, deleteTask } from './task.actions';

describe('Task', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  test('Task', () => {
    store.dispatch(
      addTask({
        task: {
          id: 'id',
          title: 'title',
        },
      })
    );

    store.dispatch(
      addTask({
        task: {
          id: 'id2',
          title: 'title',
        },
      })
    );

    store.dispatch(
      addTask({
        task: {
          id: 'id3',
          title: 'title',
        },
      })
    );

    store.dispatch(deleteTask({ id: 'id3' }));

    store.dispatch(clearAllTasks());
  });
});
