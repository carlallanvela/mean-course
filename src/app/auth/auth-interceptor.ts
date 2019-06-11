import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable() // Inject services
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // Angular will call this for request leaving the application
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // Clone token first
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next.handle(authRequest); // allow request to continue journey
  }
}
