import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pot-auth',
  imports: [Card, FormsModule, IftaLabelModule, JsonPipe, Button],
  templateUrl: './pot-auth.component.html',
  styleUrl: './pot-auth.component.scss',
})
export class PotAuthComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(public readonly authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        console.log('(SUCCESS) User logged in successfully!');
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        console.log('(ERROR) User login failed: ', err);
        this.errorMessage = this.getErrorMessage(err);
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  cancel(loginForm: NgForm) {
    console.log('(TEST) Submit cancelled. Input fields cleared.');
    loginForm.reset();
    this.errorMessage = '';
  }

  getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'Invalid email or password. Please try again.';
    } else if (error.status === 500) {
      return 'Server error. Please try again later.';
    } else {
      return 'An unknown error occurred. Please try again.';
    }
  }
}
