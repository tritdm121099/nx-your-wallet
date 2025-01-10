import { computed, inject, Injectable, signal, Signal } from "@angular/core";
import { oLocalStorageService } from "../services/local-storage.service";
import { Theme } from "./themes.i";

@Injectable({providedIn: 'root'})
export class ThemesService {
  keyStorage = 'yw-theme';

  localStorage = inject(oLocalStorageService);

  theme = signal(this.themeStorage);
  isDarkTheme: Signal<boolean> = computed(() => {
    switch (this.theme()) {
      case 'light':
        return false;
      case 'dark':
        return true;
      case 'system':
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  get themeStorage(): Theme {
    return <Theme> this.localStorage.getItem(this.keyStorage) || 'system';
  }

  changeTheme(change: Theme): void {
    this.localStorage.setItem(this.keyStorage, change);
    this.theme.set(change);
  }
}