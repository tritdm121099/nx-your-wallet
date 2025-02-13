import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoadingService {
  loading$$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loading$$.asObservable();

  show() {
    this.loading$$.next(true);
  }
  hide() {
    this.loading$$.next(false);
  }

  toggle() {
    this.loading$$.next(!this.loading$$.value);
  }
}