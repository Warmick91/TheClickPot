import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticUrls } from '../urls/staticUrls';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private readonly _http: HttpClient) {}

  checkAdminRights(): void {
    this._http.get(`${StaticUrls.API_ADMIN_ENDPOINT}/test-admin`).subscribe({
      next: () => console.info('Admin rights confirmed!'),
      error: () => console.info('Admin rights not confirmed!'),
    });
  }
}
