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
import {
  translateTextKeys,
} from '@yw/client/shell/data-access';

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
        {{ texts.pages.signUp.createAccount | translate }}
      </h1>
      <form
        nz-form
        [nzLayout]="'vertical'"
        [formGroup]="signUpForm"
        (ngSubmit)="onSubmit()"
      >
        <nz-form-item>
          <nz-form-label nzRequired>{{
            textsPage.forms.name.label | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="nameErrorTpl">
            <nz-input-group nzPrefixIcon="user">
              <input
                type="text"
                nz-input
                formControlName="name"
                [placeholder]="textsPage.forms.name.placeHolder | translate"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #nameErrorTpl let-control>
            @if (control.errors?.['required']) {
            {{
              textsForm.errors.required
                | translate : { field: textsPage.forms.name.label | translate }
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
              textsForm.errors.validPlease
                | translate : { field: 'Email' }
            }}
            } @if (control.errors?.['required']) {
            {{ textsForm.errors.required | translate : { field: 'Email' } }}
            } @if (control.errors?.['haveRegistered']) {
            {{ textsPage.forms.email.errors.haveRegistered | translate }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>{{
            texts.common.password | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="passwordErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="password"
                placeholder="{{ texts.common.password | translate }}"
                required
                minlength="8"
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #passwordErrorsTpl let-control>
            @if (control.errors?.['minlength']) {
            {{
              textsForm.errors.minLength
                | translate
                  : { min: 8, field: texts.common.password | translate | lowercase }
            }}
            } @if (control.errors?.['required']) {
            {{
              textsForm.errors.required
                | translate : { field: texts.common.password | translate }
            }}
            }
          </ng-template>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzRequired>{{
            textsPage.forms.confirmPassword.label | translate
          }}</nz-form-label>
          <nz-form-control [nzErrorTip]="confirmPassErrorsTpl">
            <nz-input-group nzPrefixIcon="lock">
              <input
                type="password"
                nz-input
                formControlName="confirm"
                placeholder="{{ textsPage.forms.confirmPassword.placeHolder | translate }}"
                required
              />
            </nz-input-group>
          </nz-form-control>

          <ng-template #confirmPassErrorsTpl let-control>
            @if (control.errors?.['required']) {
            {{ textsPage.forms.pleaseConfirmPass | translate }}
            } @if (control.errors?.['confirm']) {
            {{ textsPage.forms.confirmPassNotMatch | translate }}
            }
          </ng-template>
        </nz-form-item>

        <button nz-button nzType="primary" type="submit" class="w-full">
          {{ texts.common.signUp | translate }}
        </button>
      </form>
      <a
        class="w-full mt-1"
        nz-button
        [nzType]="'link'"
        [routerLink]="'/login'"
        >{{ textsPage.haveAccount | translate }}</a
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
  texts = translateTextKeys;
  textsPage = translateTextKeys.pages.signUp;
  textsForm = translateTextKeys.forms;

  fb = inject(FormBuilder);
  nzMsg = inject(NzMessageService);
  auth = inject(AuthService);

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
