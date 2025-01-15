import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from '@yw/client/shell/feature';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'yw-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  constructor(language: LanguageService) {
    language.translate.use(language.language);
  }
}
