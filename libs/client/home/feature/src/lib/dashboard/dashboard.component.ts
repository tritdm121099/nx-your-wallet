import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'yw-dashboard',
  imports: [],
  standalone: true,
  template: `<h1>Login success</h1>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
