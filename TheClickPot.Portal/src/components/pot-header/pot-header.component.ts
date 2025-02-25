import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pot-header',
  imports: [MenubarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.items = [
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
    ];
  }
}
