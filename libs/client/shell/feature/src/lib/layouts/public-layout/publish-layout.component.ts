import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemesComponent } from '../../themes';
import { LanguageComponent } from '../../language';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'yw-publish-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkActive,
    ThemesComponent,
    LanguageComponent,
    TranslatePipe,
  ],
  standalone: true,
  templateUrl: './publish-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishLayoutComponent {
  text = {
    homePage: 'common.homePage',
    signIn: 'common.signIn',
    signUp: 'common.signUp',
  }

  authService = inject(AuthService);
}
