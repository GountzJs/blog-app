import { Session } from '@/core/services/session';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAuthenticateGuard: CanActivateFn = () => {
  const session = inject(Session);
  const router = inject(Router);
  if (!session.isAuth()) {
    router.navigate(['/auth/sign-in']);
    return false;
  }
  return true;
};
