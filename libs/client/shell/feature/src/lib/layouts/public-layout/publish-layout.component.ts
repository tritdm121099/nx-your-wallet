import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemesComponent } from '../../themes';

@Component({
  selector: 'yw-publish-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkActive,
    ThemesComponent,
  ],
  standalone: true,
  templateUrl: './publish-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishLayoutComponent {
  authService = inject(AuthService);
}
