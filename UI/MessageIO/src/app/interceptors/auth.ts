import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = Date.now() >= payload.exp * 1000;

        if (!isExpired) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
        } else {
          // Remove expired token
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          return throwError(() => new Error('Token expired'));
        }
      } catch (err) {
        console.error('Invalid token format');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return throwError(() => new Error('Invalid token format'));
      }
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }

        return throwError(() => err);
      })
    );
  }
}
