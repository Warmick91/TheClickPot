import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AppStore } from '../../core/app.store';

@Component({
  selector: 'app-pot-header',
  imports: [MenubarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent {
  appStore = inject(AppStore);
}
