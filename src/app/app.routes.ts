import { isAuthenticateGuard } from '@/core/guards/is-autenticate/is-authenticate-guard';
import { isNotAuthenticateGuard } from '@/core/guards/is-not-authenticate/is-not-authenticate-guard';
import { TagStore } from '@/modules/articles/services/tag-store/tag-store';
import { UserStore } from '@/modules/user/services/user-store/user-store';
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
            canActivate: [isAuthenticateGuard],
          },
        ],
        providers: [TagStore],
      },
      {
        path: 'auth/sign-in',
        loadComponent: () => import('@/pages/auth/login/login').then((m) => m.Login),
        canActivate: [isNotAuthenticateGuard],
      },
      {
        path: 'auth/sign-up',
        loadComponent: () => import('@/pages/auth/register/register').then((m) => m.Register),
        canActivate: [isNotAuthenticateGuard],
      },
      {
        path: 'article/create',
        loadComponent: () =>
          import('@/pages/articles/create-article/create-article').then((m) => m.CreateArticle),
        canActivate: [isAuthenticateGuard],
      },
      {
        path: 'article/:slug/edit',
        loadComponent: () =>
          import('@/pages/articles/edit-article/edit-article').then((m) => m.EditArticle),
        canActivate: [isAuthenticateGuard],
      },
      {
        path: 'article/:slug',
        loadComponent: () =>
          import('@/pages/articles/view-article/view-article').then((m) => m.ViewArticle),
      },
      {
        path: 'settings',
        loadComponent: () => import('@/pages/settings/settings').then((m) => m.Settings),
        canActivate: [isAuthenticateGuard],
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
    providers: [UserStore],
  },
];
