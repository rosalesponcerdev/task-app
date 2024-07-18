import { createReducer, on } from '@ngrx/store';

import * as TasksActions from './task.actions';

import { Task } from '../../interface/task.interface';

export interface TaskState {
  tasks: Task[];
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,

  on(TasksActions.addTask, (state, { task }) => {
    return {
      ...state,
      tasks: [task, ...state.tasks],
    };
  }),
  on(TasksActions.editTask, (state, { task }) => {
    const tasks = state.tasks.map((t) => {
      return t.id === task.id ? { ...t, ...task } : t;
    });

    return {
      ...state,
      tasks,
    };
  }),
  on(TasksActions.deleteTask, (state, { id }) => {
    const tasks = state.tasks.filter((n) => n.id !== id);

    return {
      ...state,
      tasks,
    };
  }),
  on(TasksActions.clearAllTasks, (state, _) => {
    return {
      ...state,
      tasks: [],
      error: null,
    };
  })
);
