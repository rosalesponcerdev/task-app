import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it('Loggin Success', () => {
    expect(fixture.nativeElement).toMatchSnapshot();

    jest.spyOn(component.sendForm, 'emit');

    let loginButton = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(loginButton).toBeTruthy();
    expect(loginButton.disabled).toBeTruthy();

    const [usernameInput, passwordInput] = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('input')!);
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    component.loginPresenter.loginForm.patchValue({
      password: 'test01',
      username: 'test01',
    });

    component.loginPresenter.loginForm.markAsTouched();
    component.loginPresenter.loginForm.updateValueAndValidity();

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();

    expect(component.loginPresenter.loginForm.valid).toBeTruthy();

    component.sendFormHandler();

    expect(component.sendForm.emit).toHaveBeenCalled();
  });

  it('Loggin Error', () => {
    expect(fixture.nativeElement).toMatchSnapshot();

    component.errorMessage = {
      message: 'message',
    };
    component.loginPresenter.setCredentialError('message');

    fixture.detectChanges();

    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
