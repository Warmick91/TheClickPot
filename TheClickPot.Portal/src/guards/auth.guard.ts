import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('route.data: ', route.data);
  console.log('state: ', state);

  if (authService.authSignal()) {
    return true;
  } else {
    console.warn('Unauthorized! Redirecting to login...');
    router.navigate(['/auth']);
    return false;
  }
};
