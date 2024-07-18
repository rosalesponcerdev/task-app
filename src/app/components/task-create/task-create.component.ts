import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { TaskCreatePresenter } from './task-create.presenter';
import { selectName } from '../../store/session/session.selectors';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-task-create-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-create.component.html',
  providers: [TaskCreatePresenter],
})
export class TaskCreateComponent {
  @Output() sendForm = new EventEmitter<Task>();

  username$: Observable<string | null>;

  constructor(private _store: Store, public taskCreatePresenter: TaskCreatePresenter) {
    this.username$ = this._store.select(selectName);

    this.taskCreatePresenter.sendFormHandler$.subscribe((formValue) => {
      this.sendForm.emit(formValue);
    });
  }
}
