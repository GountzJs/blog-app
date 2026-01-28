import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/layouts/base-layout/base-layout').then((m) => m.BaseLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('@/pages/home/home').then((m) => m.Home),
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
