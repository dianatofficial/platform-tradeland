/**
 * @fileoverview سرویس مدیریت منطق احراز هویت.
 * این سرویس مسئول عملیات ورود و خروج کاربر و به‌روزرسانی وضعیت
 * مربوطه در StateService است.
 */
import { Injectable, inject } from '@angular/core';
// FIX: Consolidated RxJS imports into a single line from 'rxjs'.
import { Observable, of, throwError, delay, tap } from 'rxjs';
import { StateService } from './state.service';
import { User } from '../../models/user.model';
import { ALL_USERS } from '../../data/users.data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private stateService = inject(StateService);

  /**
   * شبیه سازی فرآیند ورود کاربر.
   * در یک اپلیکیشن واقعی، این متد یک درخواست HTTP به سرور ارسال می کند.
   * @param email ایمیل کاربر.
   * @param password رمز عبور کاربر.
   * @returns یک Observable از اطلاعات کاربر در صورت موفقیت آمیز بودن.
   */
  login(email: string, password: string): Observable<User> {
    // شبیه سازی فراخوانی API
    const user = ALL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && password === '12345678') { // Using a generic password for all mock users
      // پس از دریافت پاسخ موفق از سرور، وضعیت را در StateService به روز می کنیم.
      return of(user).pipe(
        delay(200), // شبیه سازی تاخیر شبکه
        tap(user => this.stateService.setCurrentUser(user))
      );
    }
    
    // در صورت ناموفق بودن، یک خطا برمی گردانیم.
    return throwError(() => new Error('ایمیل یا رمز عبور نامعتبر است')).pipe(delay(200));
  }

  /**
   * شبیه سازی فرآیند ثبت نام کاربر جدید.
   * @param fullName نام کامل کاربر.
   * @param email ایمیل کاربر.
   * @param password رمز عبور کاربر.
   * @returns یک Observable از اطلاعات کاربر جدید در صورت موفقیت.
   */
  register(fullName: string, email: string, password: string): Observable<User> {
    // شبیه سازی بررسی وجود ایمیل تکراری
    if (ALL_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return throwError(() => new Error('این ایمیل قبلا ثبت نام شده است.')).pipe(delay(200));
    }

    const newUser: User = {
      id: Date.now(), // شناسه موقت
      fullName,
      email,
      role: 'User',
      joinedDate: new Date().toLocaleDateString('fa-IR'),
      avatarUrl: `https://picsum.photos/seed/${fullName}/100/100`
    };

    // در یک برنامه واقعی، این اطلاعات به سرور ارسال و کاربر جدید به لیست اضافه می شود.
    // اینجا فقط موفقیت را شبیه سازی می کنیم.
    return of(newUser).pipe(
      delay(250) // شبیه سازی تاخیر شبکه
    );
  }

  /**
   * خروج کاربر از سیستم.
   * وضعیت کاربر را در StateService به null تغییر می دهد.
   */
  logout(): void {
    // در یک برنامه واقعی، ممکن است نیاز به باطل کردن توکن در سمت سرور نیز باشد.
    this.stateService.setCurrentUser(null);
  }
}