import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'yw-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    RouterLink,
    NzIconModule,
  ],
  template: `
    <nz-card class="w-[500px] m-auto">
      <h1 class="text-3xl font-bold mb-4">Sign In</h1>
      <form
        nz-form
        [nzLayout]="'vertical'"
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
      >
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired>E-mail</nz-form-label>
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
          <nz-form-label [nzSpan]="7" nzRequired>Password</nz-form-label>
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
        <div class="flex items-center justify-between">
          <button nz-button nzType="primary" type="submit">Sign In</button>
          <a href="#" nz-button [nzType]="'link'" disabled>Forgot Password?</a>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-400">
        Don't have an account?
        <a
          class="font-medium text-black hover:underline"
          [routerLink]="['/sign-up']"
          >Create One</a
        >
      </p>

      <div class="flex items-center justify-between my-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
        <p class="text-xs text-center text-black hover:underline m-0">
          or login with Social Media
        </p>
        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>
      <button
        nz-button
        nzType="default"
        class="!flex w-full items-center justify-center"
        (click)="loginGoogle()"
      >
        <span nz-icon nzType="google" nzTheme="outline"></span>
        <span class="font-bold text-center px-4">Sign in with Google</span>
      </button>
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
export class LoginComponent {
  fb = inject(FormBuilder);
  nzMsg = inject(NzMessageService);

  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = this.fb.group({
    email: ['', [Validators.email]],
    password: [''],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle successful login here
      console.log(this.loginForm.value);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  loginGoogle() {
    window.location.href = `http://localhost:3000/api/auth/google`;
  }
}
