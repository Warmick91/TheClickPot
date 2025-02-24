import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PotHeaderComponent } from '../components/pot-header/pot-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PotHeaderComponent],
  template: '<p>TEST</p> <app-pot-header /> <router-outlet />',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TheClickPot';
}
