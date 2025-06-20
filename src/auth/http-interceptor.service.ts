import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  let token = localStorage.getItem('token');
  if (token && !router.url.includes('/api/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && !router.url.includes('/login')) {
          Swal.fire({
            icon: 'error',
            title: 'Não autorizado',
            text: '401 - Você não está autorizado a acessar este recurso.',
          });
          router.navigate(['/login']);
        } else if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Proibido',
            text: '403 - Você não tem permissão para acessar este recurso.',
          });
          router.navigate(['/login']);
        }
      }

      return throwError(() => err);
    })
  );
};
