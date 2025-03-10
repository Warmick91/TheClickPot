import { environment } from '../../environments/environment.development';

export class StaticUrls {
  public static API_BASE_ENDPOINT = environment.API_BASE_ENDPOINT;

  public static get API_AUTH_ENDPOINT(): string {
    return this.API_BASE_ENDPOINT + '/auth';
  }

  public static get API_ADMIN_ENDPOINT(): string {
    return this.API_BASE_ENDPOINT + '/admin';
  }
}
