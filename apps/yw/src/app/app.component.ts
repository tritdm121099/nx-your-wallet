import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService, LoadingComponent } from '@yw/client/shell/feature';

@Component({
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  selector: 'yw-root',
  template: `
    <yw-loading></yw-loading> 
    <router-outlet></router-outlet> 
  `,
})
export class AppComponent {
  constructor(language: LanguageService) {
    language.translate.use(language.language);
  }
}
