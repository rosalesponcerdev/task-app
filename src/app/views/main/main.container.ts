import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectName } from '../../store/session/session.selectors';
import { selectCompleteTaskSList } from '../../store/task/task.selectors';

import { Task } from '../../interface/task.interface';

import { MainComponent } from './main.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'main-container',
  standalone: true,
  imports: [CommonModule, MainComponent, TaskListComponent],
  template: `
    <div class="container">
      <app-main-ui [tasks]="tasks$ | async" [username]="username$ | async" />
    </div>
  `,
})
export class MainContainer {
  tasks$: Observable<Task[]>;
  username$: Observable<string | null>;

  constructor(private _store: Store) {
    this.username$ = this._store.select(selectName);
    this.tasks$ = this._store.select(selectCompleteTaskSList);
  }
}
