import { inject, Injectable, LOCALE_ID } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";
import { AppLanguage } from "./language.i";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  localStorageKey = 'yw-language';

  localStorage = inject(LocalStorageService);
  translate = inject(TranslateService);
  locale = inject(LOCALE_ID);

  get language() {
    const data = this.localStorage.getItem(this.localStorageKey);

    switch (data) {
      case 'en':
      case 'vi':
        return data;
      default:
        return this.languageByLocale;
    }
  }

  set language(value: AppLanguage) {
    this.translate.use(value);
    this.localStorage.setItem(this.localStorageKey, value);
  }

  get languageByLocale() {
    if(this.locale === 'vi-VN') {
      return 'vi';
    }

    return 'en';
  }
}