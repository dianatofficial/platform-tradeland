import { Injectable, signal } from '@angular/core';
import { Notification } from '../../models/ui.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<Notification[]>([]);
  private nextId = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 5000) {
    const id = this.nextId++;
    const notification: Notification = { id, message, type, duration };
    
    this.notifications.update(current => [...current, notification]);
    
    if (duration) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  showSuccess(message: string, duration = 3000) {
    this.show(message, 'success', duration);
  }

  showError(message: string, duration = 7000) {
    this.show(message, 'error', duration);
  }

  remove(id: number) {
    this.notifications.update(current => current.filter(n => n.id !== id));
  }
}
