import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = 'https://localhost:7207/api/auth';
  private readonly tokenKey = 'jwt_token';

  authSignal = signal<boolean>(false);

  constructor(public readonly http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this._apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.message) {
          this.authSignal.set(true);
        }
      }),
      catchError(error => {
        console.error('(ERROR) Login request failed: ', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.http.post(`${this._apiUrl}/logout`, {}).subscribe(() => {
      this.authSignal.set(false);
    });
  }

  checkAuth(): void {
    this.http.get(`${this._apiUrl}/check-auth`).subscribe({
      next: () => this.authSignal.set(true),
      error: () => this.authSignal.set(false),
    });
  }

  checkAdminRights(): void {
    this.http.get(`${this._apiUrl}/test-admin`).subscribe({
      next: () => console.log('Admin rights confirmed!'),
      error: () => console.log('Admin rights not confirmed!'),
    });
  }
}
