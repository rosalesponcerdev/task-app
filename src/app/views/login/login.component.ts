import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { LoginPresenterService } from './login.presenter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../interface/login-form.interface';

@Component({
  selector: 'app-login-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  providers: [LoginPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Input() errorMessage?: { message: string } = { message: '' };
  @Input() loading: boolean | null = false;

  @Output() sendForm = new EventEmitter<LoginForm>();

  constructor(public loginPresenter: LoginPresenterService) {
    this.loginPresenter.sendFormHandler$.subscribe((formValue) => {
      this.sendForm.emit(formValue);
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorMessage'] && !changes['errorMessage'].firstChange) {
      this.loginPresenter.setCredentialError(changes['errorMessage'].currentValue?.message);
    }
  }

  sendFormHandler() {
    this.loginPresenter.sendFormHandler();
  }
}
