import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pot-header',
  imports: [MenubarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent implements OnInit {
  rolesResult$: Observable<string[]> = new Observable<string[]>();

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      command: () => {
        this._router.navigate(['/home']);
      },
    },
    {
      label: 'About The Click Pot',
      icon: PrimeIcons.INFO_CIRCLE,
      command: () => {
        this._router.navigate(['/about']);
      },
    },
    {
      label: 'Contact',
      icon: PrimeIcons.ADDRESS_BOOK,
      command: () => {
        this._router.navigate(['/contact']);
      },
    },
    {
      label: 'Login',
      icon: PrimeIcons.USER,
      command: () => {
        this._router.navigate(['/auth']);
      },
    },
  ];

  dashboardMenuItem: MenuItem = {
    label: 'Admin Dashboard',
    icon: PrimeIcons.DATABASE,
    command: () => {
      this._router.navigate(['/dashboard']);
    },
  };

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {}

  ngOnInit() {
    this.loadMenuItemsBasedOnRoles();
  }

  loadMenuItemsBasedOnRoles() {
    this._authService.getUserRoles().subscribe({
      next: rolesResult => {
        console.log('User roles: ', rolesResult.roles);

        if (rolesResult.roles.includes('Admin')) {
          if (!this.items.some(item => item.label === 'Admin Dashboard')) {
            this.items.push(this.dashboardMenuItem);
          } else {
            this.items = this.items.filter(item => item.label !== 'Admin Dashboard');
          }
        }
      },
      error: error => {
        console.error('Failed to load roles: ', error);
      },
      complete: () => {
        console.log('Roles loaded successfully');
      },
    });
  }
}
