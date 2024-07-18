import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from '../../store/session/session.reducer';
import { taskReducer } from '../../store/task/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { SessionEffects } from '../../store/session/session.effects';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateComponent],
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Happy Path', () => {
    expect(component).toBeTruthy();

    expect(fixture.nativeElement).toMatchSnapshot();

    component.taskCreatePresenter.noteForm.patchValue({
      title: 'title',
    });

    component.taskCreatePresenter.noteForm.updateValueAndValidity();

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
    expect(component.taskCreatePresenter.noteForm.valid).toBeTruthy();

    component.taskCreatePresenter.sendFormHandler();
  });

  it('Happy Error', () => {
    expect(component).toBeTruthy();

    expect(fixture.nativeElement).toMatchSnapshot();

    component.taskCreatePresenter.noteForm.patchValue({
      title: '',
    });

    component.taskCreatePresenter.noteForm.updateValueAndValidity();

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
    expect(component.taskCreatePresenter.noteForm.valid).toBeFalsy();

    component.taskCreatePresenter.sendFormHandler();
  });
});
