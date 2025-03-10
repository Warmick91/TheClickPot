import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../core/app.store';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const appStore = inject(AppStore);

  const isDashboardAccessible = () => {
    if (appStore.roles().includes('Admin') || appStore.roles().includes('Manager')) {
      return true;
    }
    return false;
  };

  if (authService.authSignal() && isDashboardAccessible()) {
    return true;
  } else {
    console.warn('Unauthorized! Redirecting to login...');
    router.navigate(['/auth']);
    return false;
  }
};
