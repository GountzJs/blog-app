import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/layouts/base-layout/base-layout').then((m) => m.BaseLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/layouts/dashboard-layout/dashboard-layout').then((c) => c.DashboardLayout),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@/pages/global-feed/global-feed').then((m) => m.GlobalFeed),
          },
          {
            path: 'feed',
            loadComponent: () => import('@/pages/your-feed/your-feed').then((m) => m.YourFeed),
          },
        ],
        providers: [TagStore],
      },
      {
        path: 'auth/sign-in',
        loadComponent: () => import('@/pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'auth/sign-up',
        loadComponent: () => import('@/pages/auth/register/register').then((m) => m.Register),
      },
      {
        path: 'docs',
        loadComponent: () => import('@/pages/docs/docs').then((m) => m.Docs),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
