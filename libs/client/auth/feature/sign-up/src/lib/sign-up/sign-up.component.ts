import { Component, inject } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
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
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '@yw/client/auth/data-access';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpError, RegisterErrorCodes } from '@yw/fe-be-interfaces';
import { LoadingService } from '@yw/client/shell/feature';

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
    TranslatePipe,
    LowerCasePipe,
  ],
  template: `
    <nz-card class="w-[500px] m-auto">
      <h1 class="text-3xl font-bold mb-4">
        {{ text.createAccount | translate }}
      </h1>
      <form
        nz-form
        [nzLayout]="'vertical'"
        [formGroup]="signUpForm"
        (ngSubmit)="onSubmit()"
      >
        <nz-form-item>
          <nz-form-label nzRequired>{{
            text.forms.name.label | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="nameErrorTpl">
            <nz-input-group nzPrefixIcon="user">
              <input
                type="text"
                nz-input
                formControlName="name"
                [placeholder]="text.forms.name.placeHolder | translate"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #nameErrorTpl let-control>
            @if (control.errors?.['required']) {
            {{
              text.forms.requiredErrors
                | translate : { field: text.forms.name.label | translate }
            }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>E-mail</nz-form-label>
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
              text.forms.email.invalid.invalidEmail
                | translate : { field: 'Email' }
            }}
            } @if (control.errors?.['required']) {
            {{ text.forms.requiredErrors | translate : { field: 'Email' } }}
            } @if (control.errors?.['haveRegistered']) {
            {{ text.forms.email.invalid.emailHaveUsed | translate }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>{{
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
              text.forms.password.invalidMinLength
                | translate
                  : { min: 8, field: text.password | translate | lowercase }
            }}
            } @if (control.errors?.['required']) {
            {{
              text.forms.requiredErrors
                | translate : { field: text.password | translate }
            }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>{{
            text.confirmPassword.label | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="confirmPassErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="confirm"
                placeholder="{{ text.confirmPassword.placeHolder | translate }}"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #confirmPassErrorsTpl let-control>
            @if (control.errors?.['required']) {
            {{ text.confirmPassword.pleaseConfirmPass | translate }}
            } @if (control.errors?.['confirm']) {
            {{ text.confirmPassword.confirmNotMatch | translate }}
            }
          </ng-template>
        </nz-form-item>

        <button nz-button nzType="primary" type="submit" class="w-full">
          {{ text.signUp | translate }}
        </button>
      </form>
      <a
        class="w-full mt-1"
        nz-button
        [nzType]="'link'"
        [routerLink]="'/login'"
        >{{ text.haveAccount | translate }}</a
      >
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
  text = {
    signUp: 'common.signUp',
    createAccount: 'pages.signUp.createAccount',
    password: 'common.password',
    confirmPassword: {
      label: 'pages.signUp.forms.confirmPassword.label',
      placeHolder: 'pages.signUp.forms.confirmPassword.placeHolder',
      confirmNotMatch: 'pages.signUp.forms.confirmPassNotMatch',
      pleaseConfirmPass: 'pages.signUp.forms.pleaseConfirmPass',
    },
    haveAccount: 'pages.signUp.haveAccount',
    forms: {
      requiredErrors: 'forms.errors.required',
      email: {
        invalid: {
          invalidEmail: 'forms.errors.validPlease',
          emailHaveUsed: 'pages.signUp.forms.email.errors.haveRegistered',
        },
      },
      password: {
        invalidMinLength: 'forms.errors.minLength',
        requiredErrors: 'forms.errors.required',
      },
      name: {
        label: 'pages.signUp.forms.name.label',
        placeHolder: 'pages.signUp.forms.name.placeHolder',
      },
    },
  };

  fb = inject(FormBuilder);
  nzMsg = inject(NzMessageService);
  auth = inject(AuthService);
  loadingService = inject(LoadingService);

  emailsHaveUsed: string[] = [];

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    if (
      control.dirty &&
      control.value !== this.signUpForm.controls.password.value
    ) {
      return { confirm: true };
    }
    return null;
  };

  haveRegisteredValidator: ValidatorFn = (control: AbstractControl) => {
    if (control.dirty && control.value && this.emailsHaveUsed.length) {
      const email: string = control.value.trim();
      if (this.emailsHaveUsed.includes(email)) {
        return { haveRegistered: true };
      }
    }

    return null;
  };

  signUpForm = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.email, this.haveRegisteredValidator]],
    password: [''],
    confirm: ['', [this.confirmValidator]],
  });

  onSubmit() {
    if (this.signUpForm.valid) {
      // Handle successful login here
      const value = this.signUpForm.getRawValue();
      this.loadingService.show();
      this.auth.signUp$(value).subscribe({
        error: (httpErr: HttpErrorResponse) => {
          const err = httpErr.error as HttpError;
          const errCode = err.message;

          switch (errCode) {
            case RegisterErrorCodes.EmailHaveUsed:
              this.emailsHaveUsed.push(value.email.trim());
              this.signUpForm.controls.email.updateValueAndValidity();
              break;
          }

          this.loadingService.hide();
        },
        complete: () => {
          this.loadingService.hide();
        },
      });
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
