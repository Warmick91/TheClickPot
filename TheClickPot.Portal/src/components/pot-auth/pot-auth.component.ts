import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  selector: 'app-pot-auth',
  imports: [Card, FormsModule, IftaLabelModule, JsonPipe, Button],
  templateUrl: './pot-auth.component.html',
  styleUrl: './pot-auth.component.scss',
})
export class PotAuthComponent {
  email = '';
  password = '';

  login(loginForm: NgForm) {
    console.log('(TEST) Logged in successfully with data:', loginForm.value);
  }

  cancel(loginForm: NgForm) {
    console.log('(TEST) Submit cancelled. Input fields cleared.');
    // this.email = '';
    // this.password = '';
    loginForm.reset();
  }
}
