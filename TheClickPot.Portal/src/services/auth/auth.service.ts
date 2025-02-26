import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = 'https://localhost:7207/api/auth';
  private readonly tokenKey = 'jwt_token';

  authSignal = signal<boolean>(this.hasToken());

  constructor(private _http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(credentials: { email: string; password: string }): Observable<object> {
    return this._http.post(`${this._apiUrl}/login`, credentials, { withCredentials: true }).pipe(tap(() => this.authSignal.set(true)));
  }

  logout() {
    this._http.post(`${this._apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.authSignal.set(false);
    });
  }

  checkAuth(): void {
    this._http.get(`${this._apiUrl}/check-auth`, { withCredentials: true }).subscribe({
      next: () => this.authSignal.set(true),
      error: () => this.authSignal.set(false),
    });
  }
}
