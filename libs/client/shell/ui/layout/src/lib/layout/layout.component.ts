import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AuthService } from '@yw/client/auth/data-access';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'yw-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkActive,
  ],
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
            <li nz-menu-item>
              <button (click)="logout()">Logout</button>
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
      next: () => {
      },
      error: () => {
        return true;
      },
    });
  }
}
