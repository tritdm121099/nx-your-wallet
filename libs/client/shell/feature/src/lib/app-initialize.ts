import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "@yw/client/auth/data-access";
import { catchError, of } from "rxjs";
import { ThemesService } from "./themes";

export function initializeApp(authService: AuthService, themes: ThemesService) {
  themes.initTheme();

  if (authService.isAuthenticated) {
    return () => authService.refreshToken$().pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401) {
        authService.logout$().subscribe();
        authService.goLoginPage();
      }
      return of(true)
    }));
  } else {
    return () => true;
  }
}