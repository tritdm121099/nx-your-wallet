import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { AppLanguage, LanguageOption } from './language.i';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'yw-language',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzSelectModule, FormsModule, TranslatePipe, SvgIconComponent],
  template: `
    <div class="w-[8.25rem] relative">
      <svg-icon
        name="language"
        class="z-[2] h-6 w-6 absolute top-1/2 left-1 transform -translate-y-1/2"
        src="icons/language.svg"
      ></svg-icon>
      <nz-select
        [(ngModel)]="value"
        (ngModelChange)="changeLanguage()"
        class="w-full"
      >
        @for(option of options; track option.value) {
        <nz-option
          nzValue="{{ option.value }}"
          [nzLabel]="option.label | translate"
        ></nz-option>
        }
      </nz-select>
    </div>
  `,
  styles: `
    :host {
      display: block;

      ::ng-deep {
        nz-select.ant-select {
          nz-select-top-control.ant-select-selector {
            padding-left:  2rem;
          }
        }
      }
    }
  `,
})
export class LanguageComponent {
  service = inject(LanguageService);
  value: AppLanguage = this.service.language;

  options: LanguageOption[] = [
    { value: 'en', label: 'app.language.en' },
    { value: 'vi', label: 'app.language.vi' },
  ];

  changeLanguage() {
    this.service.language = this.value;
  }
}
