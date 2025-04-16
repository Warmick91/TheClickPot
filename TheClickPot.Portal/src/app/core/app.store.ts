import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export interface User {
  email: string;
  name: string;
}

interface AppState {
  isLoading: boolean;
  user: User;
  roles: string[];
  menuItems: MenuItem[];
}

const initialState: AppState = {
  isLoading: false,
  user: { email: '', name: '' },
  roles: ['User'],
  menuItems: [
    { label: 'Home', icon: PrimeIcons.HOME, routerLink: ['/home'] },
    { label: 'About', icon: PrimeIcons.INFO_CIRCLE, routerLink: ['/about'] },
    { label: 'Contact', icon: PrimeIcons.ADDRESS_BOOK, routerLink: ['/contact'] },
    // { label: 'Login', icon: PrimeIcons.USER, routerLink: ['/auth'] },
  ],
};

const dashboardMenuItem: MenuItem = {
  label: 'Admin Dashboard',
  icon: PrimeIcons.DATABASE,
  routerLink: ['/dashboard'],
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state, authService = inject(AuthService)) => ({
    async setUserRoles(): Promise<void> {
      const response = await firstValueFrom(authService.getUserRoles());
      patchState(state, { roles: response.roles });
    },
  })),
  withComputed(state => ({
    authorizedMenuItems: computed(() => {
      const roles = state.roles();

      const computedItems: MenuItem[] = roles.includes('Admin') ? [...state.menuItems(), dashboardMenuItem] : state.menuItems();

      return computedItems;
    }),
  }))
);
