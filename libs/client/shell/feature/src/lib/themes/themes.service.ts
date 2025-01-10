import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { oLocalStorageService } from '../services/local-storage.service';
import { Theme } from './themes.i';

@Injectable({ providedIn: 'root' })
export class ThemesService {
  keyStorage = 'yw-theme';

  localStorage = inject(oLocalStorageService);

  theme = signal(this.themeStorage);
  isDarkTheme: Signal<boolean> = computed(() => {
    switch (this.theme()) {
      case 'light':
        this.updateTheme('light');
        return false;
      case 'dark':
        this.updateTheme('dark');
        return true;
      case 'system': {
        const isDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        this.updateTheme(isDark ? 'dark' : 'light');

        return isDark;
      }
    }
  });

  get themeStorage(): Theme {
    return <Theme>this.localStorage.getItem(this.keyStorage) || 'system';
  }

  changeTheme(change: Theme): void {
    this.localStorage.setItem(this.keyStorage, change);
    this.theme.set(change);
  }

  private updateTheme(theme: 'light' | 'dark'): void {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }
}
