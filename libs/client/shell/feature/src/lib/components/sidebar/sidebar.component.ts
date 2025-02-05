import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'yw-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzMenuModule,
    NzIconModule,
    RouterLinkActive,
    RouterLink,
    TranslatePipe,
  ],
  template: `
    <ul
      nz-menu
      nzMode="inline"
      nzTheme="dark"
      [nzInlineCollapsed]="isCollapsed"
      class="h-full"
      [class.sidebar-push]="sticky"
    >
      <div class="w-full h-4">
        @if(!isBlur || sticky) {
        <button class="float-right mr-1" (click)="pinSidebar()">
          <span nz-icon nzType="pushpin" class="text-[16px]"></span>
        </button>
        }
      </div>
      <a
        nz-menu-item
        nzSelected
        [routerLink]="['/']"
        routerLinkActive
        #rla1="routerLinkActive"
        [nzSelected]="rla1.isActive"
      >
        <span nz-icon nzType="dashboard"></span>
        <span>{{ 'common.dashboard' | translate }}</span>
      </a>
    </ul>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isBlur = true;
  sticky = false;

  @HostListener('mouseenter')
  hover() {
    this.isBlur = false;
  }
  @HostListener('mouseleave')
  blur() {
    this.isBlur = true;
  }

  get isCollapsed() {
    return this.sticky ? false : this.isBlur;
  }

  pinSidebar() {
    this.sticky = !this.sticky;
  }
}
