import { Route } from '@angular/router';

export const layoutRoute: Route = {
  path: '',
  loadComponent: () =>
    import('./layout.component').then((c) => c.LayoutComponent),
  loadChildren: () => [
    {
      path: 'dashboard',
      loadComponent: () =>
        import('@yw/client/home/feature').then((mod) => mod.DashboardComponent),
    },
  ],
};
