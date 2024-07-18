import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../interface/login-form.interface';
import { Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class LoginPresenterService implements OnDestroy {
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  sendFormHandler$: Observable<LoginForm>;
  private _sendFormHandler: Subject<LoginForm>;

  private _destroy = new Subject();

  constructor() {
    this._sendFormHandler = new Subject<LoginForm>();
    this.sendFormHandler$ = this._sendFormHandler.asObservable().pipe(takeUntil(this._destroy));

    this.loginForm = this._buildLoginForm();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  sendFormHandler() {
    if (!this.loginForm.valid) return;

    this.loginForm.disable();

    this._sendFormHandler.next(this.getFormValue());
  }

  getFormValue() {
    return this.loginForm.value as LoginForm;
  }

  setCredentialError(errorMessage: string) {
    this.loginForm.reset();
    this.loginForm.enable();

    this.loginForm.controls.username.setErrors(
      {
        credentialFalse: errorMessage,
      },
      {
        emitEvent: true,
      }
    );

    this.loginForm.controls.password.setErrors(
      {
        credentialFalse: errorMessage,
      },
      {
        emitEvent: true,
      }
    );
  }

  private _buildLoginForm() {
    return new FormGroup({
      username: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
