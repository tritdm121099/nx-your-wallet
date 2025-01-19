import { CommonModule, LowerCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '@yw/client/auth/data-access';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    TranslatePipe,
    NzToolTipModule,
    LowerCasePipe,
  ],
  template: `
    <nz-card class="w-[500px] m-auto">
      <h1 class="text-3xl font-bold mb-4 text-black dark:text-white">
        {{ text.signIn | translate }}
      </h1>
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
            @if (control.errors?.['email']) {
            {{
              text.loginForm.email.invalid.invalidEmail
                | translate : { field: 'Email' }
            }}
            } @if (control.errors?.['required']) {
            {{
              text.loginForm.requiredErrors
                | translate : { field: 'Email' | translate }
            }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSpan]="7" nzRequired>{{
            text.password | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="passwordErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="password"
                placeholder="{{ text.password | translate }}"
                required
                minlength="8"
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #passwordErrorsTpl let-control>
            @if (control.errors?.['minlength']) {
            {{
              text.loginForm.password.invalid.minLength
                | translate
                  : { field: text.password | translate | lowercase, min: 8 }
            }}
            } @if (control.errors?.['required']) {
            {{
              text.loginForm.requiredErrors
                | translate : { field: text.password | translate }
            }}
            }
          </ng-template>
        </nz-form-item>
        <div class="flex items-center justify-between">
          <button nz-button nzType="primary" type="submit">
            {{ text.signIn | translate }}
          </button>
          <a
            href="#"
            nz-button
            [nzType]="'link'"
            disabled
            nzTooltipTitle="{{ text.notImplemented | translate }}"
            nzTooltipPlacement="top"
            nz-tooltip
            >{{ text.forgotPassword | translate }}</a
          >
        </div>
      </form>
      <p
        class="mt-8 text-xs font-light text-center text-gray-400 dark:text-gray-600"
      >
        {{ text.notHaveAccount | translate }}
        <a
          class="font-medium text-black dark:text-white hover:underline"
          [routerLink]="['/sign-up']"
          >{{ text.createOne | translate }}</a
        >
      </p>

      <div class="flex items-center justify-between my-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
        <p
          class="text-xs text-center text-black dark:text-white hover:underline m-0"
        >
          {{ text.loginWithSocialMedia | translate }}
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
        <span class="font-bold text-center px-4">{{
          text.loginWith | translate : { app: 'Google' }
        }}</span>
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
  text = {
    signIn: 'common.signIn',
    email: 'common.email',
    password: 'common.password',
    forgotPassword: 'pages.signIn.forgotPassword',
    notHaveAccount: 'pages.signIn.notHaveAccount',
    createOne: 'pages.signIn.createOne',
    loginWithSocialMedia: 'pages.signIn.loginWithSocialMedia',
    loginWith: 'pages.signIn.loginWith',
    notImplemented: 'common.notImplemented',
    loginForm: {
      requiredErrors: 'forms.errors.required',
      email: {
        invalid: {
          invalidEmail: 'forms.errors.validPlease',
        },
      },
      password: {
        invalid: {
          minLength: 'forms.errors.minLength',
        },
      },
    },
  };

  fb = inject(FormBuilder);
  nzMsg = inject(NzMessageService);
  authService = inject(AuthService);

  loginForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.nonNullable.group({
    email: ['', [Validators.email]],
    password: [''],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.getRawValue();
      this.authService.signIn$(payload).subscribe({
        next: () => {},
        error: () => {
          return true;
        },
      });
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
