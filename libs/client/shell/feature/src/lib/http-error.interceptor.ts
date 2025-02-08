import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@yw/client/auth/data-access';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, retry, switchMap, throwError } from 'rxjs';

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

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const modal = inject(NzModalService);
  const authService = inject(AuthService);
  const translate = inject(TranslateService);

  return next(req).pipe(
    // can infinity retry
    retry({
      count: 1,
      delay: (err: HttpErrorResponse) => {
        if (
          err.status === HttpStatusCode.Unauthorized &&
          !err.url?.includes('refresh-token')
        ) {
          return authService.refreshToken$();
        }
        return throwError(() => err);
      },
    }),
    catchError((err: HttpErrorResponse) => {
      if (checkNoNetworkConnection(err)) {
        modal.create({
          nzTitle: translate.instant('http.errors.networkConnection.title'),
          nzContent: translate.instant('http.errors.networkConnection.message'),
          nzClosable: false,
          nzCancelText: null,
          nzOkDanger: true,
        });
      } else {
        switch (err.status) {
          case HttpStatusCode.BadRequest:
            // modal.create({
            //   nzTitle: 'Some data not valid',
            //   nzContent: 'Please check your data',
            //   nzClosable: false,
            // });
            break;
          case HttpStatusCode.Unauthorized:
            if (err.url?.includes('refresh-token')) {
              return authService.logout$().pipe(
                switchMap(() => {
                  authService.goLoginPage();
                  return throwError(() => err);
                })
              );
            }
            break;
          case HttpStatusCode.InternalServerError:
            modal.create({
              nzTitle: translate.instant('http.errors.500.title'),
              nzContent: translate.instant('http.errors.500.message'),
              nzClosable: false,
              nzCancelText: null,
              nzOkDanger: true,
            });
            break;
          default:
            break;
        }
      }
      return throwError(() => err);
    })
  );
};
