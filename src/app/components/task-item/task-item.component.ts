import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interface/task.interface';
import { Store } from '@ngrx/store';
import { deleteTask, editTask } from '../../store/task/task.actions';

@Component({
  selector: 'app-task-item-ui',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() clickDelete = new EventEmitter<string>();

  selectTask: boolean = false;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this.selectTask = Boolean(this.task.completed);
  }

  deleteHandler() {
    this.clickDelete.emit(this.task.id);

    this._store.dispatch(deleteTask({ id: this.task.id }));
  }

  changeSelectedState({ target }: any) {
    this.selectTask = target.checked;

    this._store.dispatch(
      editTask({
        task: {
          ...this.task,
          completed: target.checked,
        },
      })
    );
  }
}
