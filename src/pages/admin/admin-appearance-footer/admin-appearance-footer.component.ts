import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-appearance-footer',
  imports: [CommonModule],
  templateUrl: './admin-appearance-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAppearanceFooterComponent {
  // Logic for footer settings will be added here in the future.
}
