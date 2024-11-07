import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'yw-publish-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkActive,
  ],
  standalone: true,
  template: `
    <nz-layout class="h-screen">
      <nz-header>
        <a
          [routerLink]="['/']"
          class="flex items-center float-left text-white text-xl h-full"
          >Home Page</a
        >
        <div class="float-right">
          <ul nz-menu [nzMode]="'horizontal'" [nzTheme]="'dark'">
            <li
              nz-menu-item
              #rla1="routerLinkActive"
              routerLinkActive
              [nzSelected]="rla1.isActive"
              [nzSelected]="rla1.isActive"
            >
              <a [routerLink]="['/login']">Sign In</a>
            </li>
            <li
              nz-menu-item
              #rla2="routerLinkActive"
              routerLinkActive
              [nzSelected]="rla2.isActive"
              [nzSelected]="rla2.isActive"
            >
              <a routerLink="/sign-up">Sign Up</a>
            </li>
          </ul>
        </div>
      </nz-header>

      <nz-content class="p-5">
        <button (click)="authService.refreshToken$().subscribe()">Test auth</button>
        <router-outlet></router-outlet>
      </nz-content>
    </nz-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishLayoutComponent {
  authService = inject(AuthService);
}
