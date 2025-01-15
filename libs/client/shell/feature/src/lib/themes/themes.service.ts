import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Theme, ThemeOption } from './themes.i';
import { NZThemesService } from './nz-themes.service';

@Injectable({ providedIn: 'root' })
export class ThemesService {
  keyStorage = 'yw-theme';

  localStorage = inject(LocalStorageService);
  nzThemes = inject(NZThemesService);

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
  themeEffect = effect(() => {
    const theme: Theme = this.isDarkTheme() ? 'dark' : 'light';
    this.nzThemes.loadTheme(theme, false);
  })

  initTheme() {
    const theme: Theme = this.isDarkTheme() ? 'dark' : 'light';
    this.nzThemes.loadTheme(theme);
  }

  get themeStorage(): ThemeOption {
    return <ThemeOption>this.localStorage.getItem(this.keyStorage) || 'system';
  }

  changeTheme(change: ThemeOption): void {
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
