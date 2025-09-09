/**
 * @fileoverview سرویس مدیریت داده های کاربران.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { ALL_USERS } from '../../data/users.data';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersState = signal<User[]>(ALL_USERS);

  public users = this.usersState.asReadonly();

  /**
   * یک کاربر خاص را بر اساس شناسه (id) آن پیدا و برمی گرداند.
   * @param id شناسه عددی کاربر.
   * @returns {Observable<User | undefined>} یک Observable از کاربر پیدا شده یا undefined.
   */
  getUserById(id: number): Observable<User | undefined> {
    const user = this.usersState().find(u => u.id === id);
    if (!user) {
        return throwError(() => new Error(`کاربر با شناسه ${id} یافت نشد.`));
    }
    return of(user).pipe(delay(100));
  }

  /**
   * یک کاربر جدید اضافه می‌کند.
   * @param userData داده‌های کاربر جدید.
   */
  addUser(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      ...userData,
      id: Date.now(), // simple id generation for mock
    };
    this.usersState.update(users => [newUser, ...users]);
    return newUser;
  }

  /**
   * یک کاربر موجود را به‌روزرسانی می‌کند.
   * @param updatedUser آبجکت کامل کاربر به‌روز شده.
   */
  updateUser(updatedUser: User): void {
    this.usersState.update(users =>
      users.map(u => u.id === updatedUser.id ? updatedUser : u)
    );
    // If the updated user is the current user, update the auth state as well.
    // This would typically be handled by a more robust state management solution.
  }


  /**
   * یک کاربر را بر اساس شناسه حذف می‌کند.
   * @param id شناسه کاربری که باید حذف شود.
   */
  deleteUser(id: number): void {
    this.usersState.update(users => users.filter(u => u.id !== id));
  }
}