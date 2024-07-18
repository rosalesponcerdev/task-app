import { createAction, props } from '@ngrx/store';

import { Task } from '../../interface/task.interface';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const editTask = createAction('[Task] Edit Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const clearAllTasks = createAction('[Task] Clear All Task');
