import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/error-handling/notification.service';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  notificationService = inject(NotificationService);
  notifications = this.notificationService.notifications;

  iconMap = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info',
  };

  colorMap = {
    success: 'bg-green-100 border-green-400 text-green-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    info: 'bg-blue-100 border-blue-400 text-blue-800',
  };

  iconColorMap = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  };

  close(id: number) {
    this.notificationService.remove(id);
  }
}
