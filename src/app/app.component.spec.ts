import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from './store/session/session.reducer';
import { taskReducer } from './store/task/task.reducer';
import { SessionEffects } from './store/session/session.effects';
import { provideEffects } from '@ngrx/effects';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
