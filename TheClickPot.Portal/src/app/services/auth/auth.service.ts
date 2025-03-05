import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StaticUrls } from '../urls/staticUrls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authSignal = signal<boolean>(false);

  constructor(
    private readonly _http: HttpClient,
    private readonly _cookieService: CookieService
  ) {}

  login(credentials: { email: string; password: string }): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(`${StaticUrls.API_AUTH_ENDPOINT}/login`, credentials).pipe(
      catchError(error => {
        console.error('(ERROR) Login request failed: ', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this._http.post(`${StaticUrls.API_AUTH_ENDPOINT}/logout`, {}).pipe(
      catchError(error => {
        console.error('(ERROR) Logout request failed: ', error);
        return throwError(() => error);
      })
    );
  }

  getUserRoles(): Observable<{ roles: string[] }> {
    return this._http.get<{ roles: string[] }>(`${StaticUrls.API_AUTH_ENDPOINT}/user-roles`).pipe(
      map(
        response => ({ roles: response.roles }),
        catchError(error => {
          console.error('(ERROR) Get Roles request failed: ', error);
          return throwError(() => error);
        })
      )
    );
  }

  checkAuth(): void {
    this._http.get(`${StaticUrls.API_AUTH_ENDPOINT}/check-auth`).subscribe({
      next: () => this.authSignal.set(true),
      error: () => this.authSignal.set(false),
    });
  }
}
