import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { AppStore } from '../../core/app.store';

@Component({
  selector: 'app-pot-header',
  imports: [CommonModule, RouterModule, MenubarModule, AvatarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent {
  appStore = inject(AppStore);
}
