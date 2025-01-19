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
import { TranslatePipe } from '@ngx-translate/core';

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
            {{ text.forms.password.invalidMinLength | translate:{min: 8} }} } @if
            (control.errors?.['required']) { 
              {{text.forms.requiredErrors | translate : { field: text.password | translate } }}  
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
      <a class="w-full" nz-button [nzType]="'link'" [routerLink]="'/login'">{{
        text.haveAccount | translate
      }}</a>
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
        },
      },
      password: {
        invalidMinLength: 'forms.errors.minLength',
        requiredErrors: 'forms.errors.required',
      },
    },
  };

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
