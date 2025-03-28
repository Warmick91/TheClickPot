import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { AppStore } from '../../core/app.store';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pot-header',
  imports: [CommonModule, RouterModule, MenubarModule, AvatarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent {
  appStore = inject(AppStore);
  authService = inject(AuthService);

  readonly loginMenuItem: MenuItem = { label: 'Login', icon: PrimeIcons.USER, routerLink: ['/auth'] };
  readonly logoutMenuItem: MenuItem = { label: 'Logout', icon: PrimeIcons.SIGN_OUT, routerLink: ['/auth'] };

  isAuthenticated(): boolean {
    return this.authService.authSignal();
  }
}
