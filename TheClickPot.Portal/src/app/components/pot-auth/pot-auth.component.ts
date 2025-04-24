import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { from, switchMap } from 'rxjs';
import { AppStore } from '../../core/app.store';
import { AdminService } from '../../services/admin/admin.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pot-auth',
  imports: [FormsModule, IftaLabelModule, FloatLabelModule, CommonModule],
  templateUrl: './pot-auth.component.html',
  styleUrl: './pot-auth.component.scss',
})
export class PotAuthComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isRegistering = false;

  private readonly _authService = inject(AuthService);
  private readonly _adminService = inject(AdminService);
  public readonly _appStore = inject(AppStore);

  login() {
    this._authService
      .login({ email: this.email, password: this.password })
      .pipe(switchMap(() => from(this._appStore.setUserRoles())))
      .subscribe({
        next: () => {
          console.log('(SUCCESS) User logged in successfully and roles fetched!');
          this._authService.authSignal.set(true);
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          console.log('(ERROR) User login failed: ', err);
          this.errorMessage = this.getErrorMessage(err);
        },
      });
  }

  logout() {
    this._authService
      .logout()
      .pipe(switchMap(() => from(this._appStore.setUserRoles())))
      .subscribe({
        next: () => {
          this._authService.authSignal.set(false);
        },
        error: err => {
          console.error('Logout error: ', err);
        },
      });
  }

  switchMode() {
    this.isRegistering = !this.isRegistering;
    console.log('Switching mode to:', this.isRegistering ? 'Register' : 'Login');
  }

  register() {
    console.log('Registering user:', this.email);
    // Add registration logic here
  }

  cancel(form: NgForm) {
    console.log('(TEST) Submit cancelled. Input fields cleared.');
    form.reset();
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

  // TEST //
  public checkAuth(): void {
    this._authService.checkAuth();
  }

  public isAuthenticated(): boolean {
    return this._authService.authSignal();
  }

  public checkAdminRights(): void {
    return this._adminService.checkAdminRights();
  }
  // END TEST //
}
