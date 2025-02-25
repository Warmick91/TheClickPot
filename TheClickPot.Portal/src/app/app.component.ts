import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PotHeaderComponent } from '../components/pot-header/pot-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PotHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TheClickPot';

  appCurrentSubpage: Subpage = Subpage.Home;
}

export enum Subpage {
  Home = 'home',
  About = 'about',
  Contact = 'contact',
}
