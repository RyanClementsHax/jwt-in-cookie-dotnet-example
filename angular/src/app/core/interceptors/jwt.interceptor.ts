import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add JWT auth header if a user is logged in for API requests
    const accessToken = localStorage.getItem('access_token');
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    console.log('here!')
    if (accessToken && isApiUrl) {
      request = request.clone({
        withCredentials: true,
        // headers: new HttpHeaders({
        //   'Content-Type': 'application/json',
        // }),
        // setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(request);
  }
}
