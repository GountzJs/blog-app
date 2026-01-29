import { Session } from '@/core/services/session/session';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isNotAuthenticateGuard: CanActivateFn = () => {
  const session = inject(Session);
  const router = inject(Router);
  if (session.isAuth()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
