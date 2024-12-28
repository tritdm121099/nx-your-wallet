import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'yw-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    RouterLink,
  ],
  template: `
    <nz-card class="w-[500px] m-auto">
      <h1 class="text-3xl font-bold mb-4">Create your Account</h1>
      <form nz-form [nzLayout]="'vertical'" [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
        <nz-form-item>
          <nz-form-label  nzRequired>E-mail</nz-form-label>
          <nz-form-control [nzErrorTip]="emailErrorTpl">
            <nz-input-group nzPrefixIcon="mail">
              <input
                type="email"
                nz-input
                formControlName="email"
                placeholder="E-mail"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #emailErrorTpl let-control>
            @if (control.errors?.['email']) { Please enter a valid email! } @if
            (control.errors?.['required']) { Email is required! }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>Password</nz-form-label>
          <nz-form-control [nzErrorTip]="passwordErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="password"
                placeholder="Password"
                required
                minlength="8"
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #passwordErrorsTpl let-control>
            @if (control.errors?.['minlength']) { Min length password is 8! }
            @if (control.errors?.['required']) { Password is required! }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired
            >Confirm Password</nz-form-label
          >
          <nz-form-control [nzErrorTip]="confirmPassErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="confirm"
                placeholder="Confirm your password"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #confirmPassErrorsTpl let-control>
            @if (control.errors?.['required']) { Please confirm your password! }
            @if (control.errors?.['confirm']) { Password is inconsistent! }
          </ng-template>
        </nz-form-item>

        <button nz-button nzType="primary" type="submit" class="w-full">Sign Up</button>
      </form>
      <a class="w-full" nz-button [nzType]="'link'" [routerLink]="'/login'">Already have an account?</a>
    </nz-card>
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  `,
})
export class SignUpComponent {
  fb = inject(FormBuilder);
  nzMsg = inject(NzMessageService);

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    if (
      control.dirty &&
      control.value !== this.signUpForm.controls.password.value
    ) {
      return { confirm: true };
    }
    return null;
  };

  signUpForm = this.fb.group({
    email: ['', [Validators.email]],
    password: [''],
    confirm: ['', [this.confirmValidator]],
  });

  onSubmit() {
    this.nzMsg.success('Login successful!'); // Example message
    if (this.signUpForm.valid) {
      // Handle successful login here
      console.log(this.signUpForm.value);
    } else {
      Object.values(this.signUpForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
