import { Injectable } from '@angular/core';
import { UserDef } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UserService {
  get user(): UserDef | null {
    return this._user || this.getUserFromLocalStorage();
  }
  set user(user: UserDef) {
    this._user = user;
    this.saveUserToLocalStorage(user);
  }

  private _user: UserDef | null = null;

  private localStorageUserKey = 'user';

  private saveUserToLocalStorage(user: UserDef): void {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): UserDef | null {
    const userJSON = localStorage.getItem(this.localStorageUserKey);
    return userJSON ? JSON.parse(userJSON) : null;
  }
}
