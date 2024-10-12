import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'yw-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'yw';
}
