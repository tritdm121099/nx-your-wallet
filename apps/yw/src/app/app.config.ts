import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import en from '@angular/common/locales/en';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import {
  errorInterceptor,
  initializeApp,
  webRoutes,
} from '@yw/client/shell/feature';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import {} from 'ng-zorro-antd';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzModalModule } from 'ng-zorro-antd/modal';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NzModalModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      webRoutes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService],
    },
    provideNzConfig({
      message: { nzTop: 120 },
      notification: { nzTop: 240 },
    }),
  ],
};
