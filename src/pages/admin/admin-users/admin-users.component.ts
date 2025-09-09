import { Component, ChangeDetectionStrategy, inject, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/data/user.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersComponent {
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);

  private allUsers = this.userService.users;
  searchTerm = signal('');

  users = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allUsers();
    }
    return this.allUsers().filter(user => 
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });
  
  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  deleteUser(user: User): void {
    if (confirm(`آیا از حذف کاربر "${user.fullName}" اطمینان دارید؟`)) {
      this.userService.deleteUser(user.id);
      this.notificationService.showSuccess(`کاربر "${user.fullName}" با موفقیت حذف شد.`);
    }
  }

  getRoleClass(role?: string): string {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Instructor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}