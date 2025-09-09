import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type SettingsTab = 'appearance' | 'seo' | 'settings';

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSettingsComponent {
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  
  private getCurrentTab(): SettingsTab {
      const url = this.router.url;
      if (url.includes('appearance')) return 'appearance';
      if (url.includes('seo')) return 'seo';
      return 'settings';
  }

  activeTab = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getCurrentTab())
    ), { initialValue: this.getCurrentTab() }
  );

  settingsForm = new FormGroup({
    siteName: new FormControl('تریدلند'),
    primaryColor: new FormControl('#007aff'),
    metaTitle: new FormControl('تریدلند | پلتفرم جامع آموزش ترید'),
    metaDescription: new FormControl('با دسترسی به بهترین دوره های آموزشی، تحلیل های روز و ابزارهای کاربردی، هوشمندانه تر معامله کنید.'),
    siteEmail: new FormControl('support@tradeplat.com'),
    maintenanceMode: new FormControl(false),
  });
  
  saveSettings() {
    this.notificationService.showSuccess('تنظیمات با موفقیت ذخیره شد.');
    // In a real app, you would send this to a server.
    console.log('Settings saved:', this.settingsForm.value);
  }
}