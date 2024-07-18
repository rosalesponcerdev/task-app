import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../interface/task.interface';
import { TaskCreateContainer } from '../../components/task-create/task-create.container';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { UserSectionContainer } from '../../components/user-section/user-section.container';

@Component({
  selector: 'app-main-ui',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TaskCreateContainer, TaskListComponent, UserSectionContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  @Input() tasks!: Task[] | null;
  @Input() username!: string | null;

  @Output() sendForm = new EventEmitter<Task>();

  constructor() {}
}
