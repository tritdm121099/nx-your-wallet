import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { SignInDto } from '@yw/fe-be-interfaces';

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

  signUp$(payload: SignInDto) {
    return this.http
      .post('/api/auth/sign-up', payload)
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
