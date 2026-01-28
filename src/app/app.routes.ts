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
    ],
  },
];
