import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class oLocalStorageService {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
