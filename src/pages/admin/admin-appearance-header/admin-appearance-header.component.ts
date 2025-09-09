import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppearanceService } from '../../../services/state/appearance.service';
import { NotificationService } from '../../../services/error-handling/notification.service';

@Component({
  selector: 'app-admin-appearance-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appearance-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAppearanceHeaderComponent implements OnInit {
  private appearanceService = inject(AppearanceService);
  private notificationService = inject(NotificationService);

  siteName = signal('');

  ngOnInit(): void {
    // Initialize the form with the current value from the service
    this.siteName.set(this.appearanceService.siteName());
  }

  saveSettings(): void {
    const newName = this.siteName().trim();
    if (newName) {
      this.appearanceService.setSiteName(newName);
      this.notificationService.showSuccess('تنظیمات هدر با موفقیت ذخیره شد.');
    } else {
      this.notificationService.showError('نام سایت نمی‌تواند خالی باشد.');
    }
  }
}
