import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../interface/task.interface';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class TaskCreatePresenter {
  noteForm: FormGroup<{
    title: FormControl<string>;
  }>;

  sendFormHandler$: Observable<Task>;
  private _sendFormHandler: Subject<Task>;

  private _destroy = new Subject();

  constructor() {
    this._sendFormHandler = new Subject<Task>();
    this.sendFormHandler$ = this._sendFormHandler.asObservable().pipe(takeUntil(this._destroy));

    this.noteForm = this._buildNoteForm();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  getFormValue() {
    return this.noteForm.value as Task;
  }

  sendFormHandler() {
    if (!this.noteForm.valid) return;

    this._sendFormHandler.next(this.getFormValue());

    this.noteForm.reset();
  }

  private _buildNoteForm() {
    return new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }
}
