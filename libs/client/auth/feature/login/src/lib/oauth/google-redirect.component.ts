import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDef, UserService } from '@yw/client/auth/data-access';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'yw-google-redirect',
  standalone: true,
  imports: [],
  template: `loading...`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleRedirectComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const jwtUser = params['jwtUser'];

      if (jwtUser) {
        const userFromJWT: UserDef = jwtDecode(jwtUser);
        this.userService.user = userFromJWT;
        this.router.navigate(['/']);
      }
    });
  }
}
