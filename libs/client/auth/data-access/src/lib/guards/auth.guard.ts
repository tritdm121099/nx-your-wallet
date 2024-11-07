import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services';

export const authGuard: CanMatchFn = () => {
  const authService = inject(AuthService);


  const isAuthenticated = authService.isAuthenticated;
  
  return isAuthenticated;
};

export const publishGuard  = () => {
  const authService = inject(AuthService);

  return !authService.isAuthenticated;
};