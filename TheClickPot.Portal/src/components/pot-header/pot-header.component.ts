import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Subpage } from '../../app/app.component';

@Component({
  selector: 'app-pot-header',
  imports: [MenubarModule],
  templateUrl: './pot-header.component.html',
  styleUrl: './pot-header.component.scss',
})
export class PotHeaderComponent {
  @Input() currentSubpage!: Subpage;
  @Output() currentSubpageChange = new EventEmitter<Subpage>();

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      command: () => {
        this.changeCurrentSubpage(Subpage.Home);
      },
    },
    {
      label: 'About The Click Pot',
      icon: PrimeIcons.INFO_CIRCLE,
      command: () => {
        this.changeCurrentSubpage(Subpage.About);
      },
    },
    {
      label: 'Contact',
      icon: PrimeIcons.ADDRESS_BOOK,
      command: () => {
        this.changeCurrentSubpage(Subpage.Contact);
      },
    },
  ];

  changeCurrentSubpage(newSubpage: Subpage): void {
    this.currentSubpageChange.emit(newSubpage);
  }
}
