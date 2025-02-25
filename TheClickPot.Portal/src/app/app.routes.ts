import { Routes } from '@angular/router';
import { PotHomeComponent } from '../components/pot-home/pot-home.component';
import { PotAboutComponent } from '../components/pot-about/pot-about.component';
import { PotContactComponent } from '../components/pot-contact/pot-contact.component';

export const routes: Routes = [
  {
    path: 'home',
    component: PotHomeComponent,
  },
  {
    path: 'about',
    component: PotAboutComponent,
  },
  {
    path: 'contact',
    component: PotContactComponent,
  },
];
