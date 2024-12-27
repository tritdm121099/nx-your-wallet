import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@yw/client/auth/data-access';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, throwError } from 'rxjs';

function checkNoNetworkConnection(error: unknown): boolean {
  return (
    error instanceof HttpErrorResponse &&
    !error.headers.keys().length &&
    !error.ok &&
    !error.status &&
    !error.error.loaded &&
    !error.error.total
  );
}

function handleBadRequestResponse(err:HttpErrorResponse) {
  console.error(err);
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const modal = inject(NzModalService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (checkNoNetworkConnection(err)) {
        modal.create({
          nzTitle: 'No network',
          nzContent: 'Please check your network',
          nzClosable: false,
        });
      } else {
        switch(err.status) {
          case HttpStatusCode.BadRequest:
            handleBadRequestResponse(err);
            break;
          case HttpStatusCode.Unauthorized:
            if (err.url?.includes('refresh-token')) {
              authService.logout$().subscribe();
              authService.goLoginPage();
            } else {
              authService.refreshToken$();
            }
            break;
          default:
            break;
        }
      }
      return throwError(() => err);
    })
  );
};
