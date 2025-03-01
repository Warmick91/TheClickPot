import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { StaticUrls } from '../../urls/staticUrls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSignal = signal<boolean>(false);

  constructor(private readonly _http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(`${StaticUrls.API_AUTH_ENDPOINT}/login`, credentials).pipe(
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
    this._http.post(`${StaticUrls.API_AUTH_ENDPOINT}/logout`, {}).subscribe(() => {
      this.authSignal.set(false);
    });
  }

  checkAuth(): void {
    this._http.get(`${StaticUrls.API_AUTH_ENDPOINT}/check-auth`).subscribe({
      next: () => this.authSignal.set(true),
      error: () => this.authSignal.set(false),
    });
  }
}
