import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInDto } from '@yw/fe-be-interfaces';
import { finalize, map } from 'rxjs';
import { LoadingService } from '@yw/client/shell/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  loading = inject(LoadingService);

  get isAuthenticated() {
    return !!document.cookie
      .split('; ')
      .find((row) => row.startsWith(`refreshToken=`));
  }

  signIn$(payload: SignInDto) {
    this.loading.show();
    return this.http.post<SignInDto>('/api/auth/sign-in', payload).pipe(
      map(() => this.signInSuccess()),
      finalize(() => this.loading.hide())
    );
  }

  signUp$(payload: SignInDto) {
    this.loading.show();
    return this.http.post('/api/auth/sign-up', payload).pipe(
      map(() => this.signInSuccess()),
      finalize(() => this.loading.hide())
    );
  }

  logout$() {
    this.loading.show();
    return this.http.post('/api/auth/logout', {}).pipe(
      map(() => this.logoutSuccess()),
      finalize(() => this.loading.hide())
    );
  }

  refreshToken$() {
    return this.http.post('/api/auth/refresh-token', {});
  }

  signInSuccess() {
    this.router.navigate(['/']);
  }

  logoutSuccess() {
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
