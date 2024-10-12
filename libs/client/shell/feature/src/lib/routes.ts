import { Routes } from '@angular/router';
import { PublishLayoutComponent } from '@yw/client/shell/ui/layout';

export const webRoutes: Routes = [
  {
    path: '',
    component: PublishLayoutComponent,
    children: [
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
    ],
  },
];
