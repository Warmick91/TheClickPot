import { Routes } from '@angular/router';
import { PotAboutComponent } from '../components/pot-about/pot-about.component';
import { PotAuthComponent } from '../components/pot-auth/pot-auth.component';
import { PotContactComponent } from '../components/pot-contact/pot-contact.component';
import { PotDashboardComponent } from '../components/pot-dashboard/pot-dashboard.component';
import { PotHomeComponent } from '../components/pot-home/pot-home.component';
import { authGuard } from '../guards/auth.guard';

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
  {
    path: 'auth',
    component: PotAuthComponent,
  },
  {
    path: 'dashboard',
    component: PotDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
