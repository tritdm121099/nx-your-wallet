import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInDto } from '@yw/api/auth/data-access';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  get isAuthenticated() {
    return !!document.cookie
      .split('; ')
      .find((row) => row.startsWith(`refreshToken=`));
  }

  signIn$(payload: SignInDto) {
    return this.http
      .post<SignInDto>('/api/auth/sign-in', payload)
      .pipe(map(() => this.signInSuccess()));
  }

  signUp$() {
    return this.http
      .post('/api/auth/sign-up', {})
      .pipe(map(() => this.signInSuccess()));
  }

  logout$() {
    return this.http
      .post('/api/auth/logout', {})
      .pipe(map(() => this.logoutSuccess()));
  }

  refreshToken$() {
    return this.http.post('/api/auth/refresh-token', {});
  }

  signInSuccess() {
    this.router.navigate(['/']);
  }

  logoutSuccess() {
    this.router.navigate(['/'], {onSameUrlNavigation: 'reload'});
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
