import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from '../task-item.component';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from '../../../store/session/session.reducer';
import { taskReducer } from '../../../store/task/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { SessionEffects } from '../../../store/session/session.effects';
import { Task } from '../../../interface/task.interface';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const task: Task = {
    id: '222',
    title: 'title',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [
        provideStore({
          session: sessionReducer,
          task: taskReducer,
        }),
        provideEffects(SessionEffects),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = task;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should correctly display the task title', () => {
    const titleTag = (fixture.nativeElement as HTMLElement).querySelector('.list-group-item .col.py-2 p');

    expect(titleTag).toBeTruthy();
    expect(titleTag?.textContent).toContain(task.title);
  });

  it('should correctly display the delete button', () => {
    const titleTag = (fixture.nativeElement as HTMLElement).querySelector('.list-group-item .col.py-2 p');
    const deleteBtn = (fixture.nativeElement as HTMLElement).querySelector('button.btn.btn-danger');

    expect(titleTag).toBeTruthy();
    expect(deleteBtn).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('should delete when clicking the delete button', () => {
    const deleteBtn: HTMLButtonElement = (fixture.nativeElement as HTMLElement).querySelector('button.btn.btn-danger')!;

    expect(deleteBtn).toBeTruthy();

    deleteBtn.click();
  });

  it('should change the checkbox state and hide the delete button when the checkbox is selected', () => {
    const checkbox: HTMLInputElement = (fixture.nativeElement as HTMLElement).querySelector('input')!;
    let deleteBtn = (fixture.nativeElement as HTMLElement).querySelector('button.btn.btn-danger');

    expect(checkbox).toBeTruthy();
    expect(deleteBtn).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();

    checkbox.click();

    fixture.detectChanges();

    deleteBtn = (fixture.nativeElement as HTMLElement).querySelector('button.btn.btn-danger');

    expect(deleteBtn).toBeFalsy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
