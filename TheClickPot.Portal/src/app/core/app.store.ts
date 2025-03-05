import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
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
}

const initialState: AppState = {
  isLoading: false,
  user: { email: '', name: '' },
  roles: ['User'],
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    async setUserRoles(): Promise<void> {
      const response = await firstValueFrom(authService.getUserRoles());
      patchState(store, { roles: response.roles });
    },
  }))
);
