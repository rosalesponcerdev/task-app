import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from '../../store/session/session.reducer';
import { taskReducer } from '../../store/task/task.reducer';
import { SessionEffects } from '../../store/session/session.effects';
import { provideEffects } from '@ngrx/effects';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
