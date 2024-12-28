import { Routes } from '@angular/router';
import { authGuard, publishGuard } from '@yw/client/auth/data-access';

export const webRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@yw/client/shell/ui/layout').then(m => m.PublishLayoutComponent),
    canMatch: [publishGuard],
    loadChildren: () => [
      {
        path: '',
        loadComponent: () =>
          import('@yw/client/home/feature').then(
            (mod) => mod.PublishHomeComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@yw/client/auth/login').then((mod) => mod.LoginComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('@yw/client/auth/sign-up').then((mod) => mod.SignUpComponent),
      },
      {
        path: 'auth/google-oauth-success-redirect',
        loadComponent: () =>
          import('@yw/client/auth/login').then(
            (mod) => mod.GoogleRedirectComponent
          ),
      },
    ],
  },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('@yw/client/shell/ui/layout').then(m => m.LayoutComponent),
    canLoad: [authGuard],
    loadChildren: () => [
      {
        path: '',
        loadComponent: () =>
          import('@yw/client/home/feature').then(
            (mod) => mod.DashboardComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
