import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemesComponent } from '../../themes';

@Component({
  selector: 'yw-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    ThemesComponent,
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
