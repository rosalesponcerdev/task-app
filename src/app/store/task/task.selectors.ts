import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('task');

export const selectCompleteTaskState = createSelector(selectTaskState, (state: TaskState) => state);
export const selectCompleteTaskSList = createSelector(selectTaskState, (state: TaskState) => state.tasks);
