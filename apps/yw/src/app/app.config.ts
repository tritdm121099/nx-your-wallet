import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  LOCALE_ID,
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
  ThemesService,
  webRoutes,
} from '@yw/client/shell/feature';

import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideAngularSvgIcon } from 'angular-svg-icon';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
registerLocaleData(en);
registerLocaleData(vi);

/** config ng-zorro-antd i18n **/
import { en_US, vi_VN, NZ_I18N } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NzModalModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      webRoutes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService, ThemesService],
    },
    provideNzConfig({
      message: { nzTop: 120 },
      notification: { nzTop: 240 },
    }),
    provideAngularSvgIcon(),
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          case 'vi':
            return vi_VN;
          default:
            return en_US;
        }
      }
    }
  ],
};
