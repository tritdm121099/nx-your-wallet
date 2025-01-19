import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemesComponent } from '../../themes';
import { LanguageComponent } from '../../language';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'yw-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    ThemesComponent,
    LanguageComponent,
    TranslatePipe,
  ],
  templateUrl: './layout.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LayoutComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout$().subscribe({
      error: () => {
        return true;
      },
    });
  }
}
