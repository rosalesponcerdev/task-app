import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCompleteTaskSList } from '../../store/task/task.selectors';
import { addTask } from '../../store/task/task.actions';

import { Task } from '../../interface/task.interface';

import { TaskCreateComponent } from './task-create.component';

@Component({
  selector: 'task-create-container',
  standalone: true,
  imports: [CommonModule, TaskCreateComponent],
  template: `
    <app-task-create-ui (sendForm)="sendFormHandler($event)" />
  `,
})
export class TaskCreateContainer {
  tasks$: Observable<Task[]>;

  constructor(private _store: Store) {
    this.tasks$ = this._store.select(selectCompleteTaskSList);
  }

  ngOnInit() {}

  sendFormHandler(task: Task) {
    task.id = crypto.randomUUID();

    this._store.dispatch(addTask({ task: task }));
  }
}
