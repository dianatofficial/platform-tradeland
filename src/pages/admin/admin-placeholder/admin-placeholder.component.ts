import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-placeholder',
  imports: [CommonModule],
  templateUrl: './admin-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPlaceholderComponent {
  title = input.required<string>();
  description = input<string>();
  icon = input<string>('construction');
}
