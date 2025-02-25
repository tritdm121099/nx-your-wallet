import {
  provideHttpClient,
  withInterceptors,
  HttpClient,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  inject,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
  withDebugTracing,
} from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { AuthService } from '@yw/client/auth/data-access';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { initializeApp } from './app-initialize';
import { errorInterceptor } from './http-error.interceptor';
import { webRoutes } from './routes';
import { ThemesService } from './themes';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, en_US, vi_VN } from 'ng-zorro-antd/i18n';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
registerLocaleData(en);
registerLocaleData(vi);

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, '../i18n/', '.json');

export const shellAppConfig: ApplicationConfig = {
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
      },
    },
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
};
