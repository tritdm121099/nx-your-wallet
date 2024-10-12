import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'yw-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-access.component.html',
  styleUrl: './data-access.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccessComponent {}
