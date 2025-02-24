import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-pot-header',
  imports: [MenubarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      routerLink: '/',
    },
    {
      label: 'About The Click Pot',
      icon: PrimeIcons.INFO_CIRCLE,
      routerLink: '/about',
    },
    {
      label: 'Contact',
      icon: PrimeIcons.ADDRESS_BOOK,
      routerLink: '/contact',
    },
  ];
}
