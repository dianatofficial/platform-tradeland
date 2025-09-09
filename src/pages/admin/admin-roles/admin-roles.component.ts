import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/error-handling/notification.service';

interface Role {
  name: string;
  description: string;
}

@Component({
  selector: 'app-admin-roles',
  imports: [CommonModule],
  templateUrl: './admin-roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRolesComponent {
  
  roles = signal<Role[]>([
    { name: 'Admin', description: 'دسترسی کامل به تمام بخش‌های پنل مدیریت.' },
    { name: 'Instructor', description: 'دسترسی به مدیریت دوره‌ها، مقالات و کانال تحلیلی خود.' },
    { name: 'User', description: 'دسترسی به پروفایل کاربری و محتوای خریداری شده.' },
  ]);

  constructor(private notificationService: NotificationService) {}

  showNotImplemented() {
    this.notificationService.show('این قابلیت در نسخه‌های آینده اضافه خواهد شد.', 'info');
  }
}
