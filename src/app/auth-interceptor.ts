import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const reqWithCreds = req.clone({
    setHeaders: {
      'X-Appwrite-Project': '6912f322002fe5fcc72e',
    },
    withCredentials: true,
  });

  return next(reqWithCreds).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        authService.clearUser();
        router.navigate(['/auth/login']);
      }
      return throwError(() => err);
    })
  );
};
