import { UserStore } from '@/modules/common/services/user-store/user-store';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isNotAuthenticateGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  if (userStore.get()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
