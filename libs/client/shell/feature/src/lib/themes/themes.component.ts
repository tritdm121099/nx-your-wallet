import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ThemesService } from './themes.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ThemeOption } from './themes.i';

@Component({
  selector: 'yw-themes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SvgIconComponent, NzDropDownModule],
  template: `
    <button nz-dropdown [nzDropdownMenu]="menu" [nzOverlayClassName]="'yw-themes-options'">
      @if(service.isDarkTheme()) {
      <svg-icon name="moon" class="h-6 w-6" src="icons/moon.svg"></svg-icon>
      } @else {
      <svg-icon name="sun" class="h-6 w-6" src="icons/sun.svg"></svg-icon>
      }
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu nzSelectable class="yw-themes-options-container">
        @for (menu of menus; track menu.id) {
        <li
          nz-menu-item
          [nzSelected]="menu.id === service.theme()"
          (click)="service.changeTheme(menu.id)"
        >
          <svg-icon
            name="{{ menu.text }}"
            class="h-6 w-6"
            src="{{ menu.icon }}"
          ></svg-icon> &nbsp; {{ menu.text }}
        </li>
        }
      </ul>
    </nz-dropdown-menu>
  `,
  styleUrls: ['./themes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemesComponent {
  service = inject(ThemesService);

  menus: { icon: string; text: string; id: ThemeOption }[] = [
    {
      icon: 'icons/moon.svg',
      text: 'Dark',
      id: 'dark',
    },
    {
      icon: 'icons/sun.svg',
      text: 'Light',
      id: 'light',
    },
    {
      icon: 'icons/desktop.svg',
      text: 'System',
      id: 'system',
    },
  ];
}
