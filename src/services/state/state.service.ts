/**
 * @fileoverview سرویس مرکزی مدیریت وضعیت برنامه (Signal Store).
 * این سرویس به عنوان یک منبع واحد حقیقت (Single Source of Truth) برای وضعیت های
 * سراسری مانند اطلاعات کاربر فعلی عمل می کند.
 */
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../models/user.model';
import { AppState } from '../../models/state.model';

const initialState: AppState = {
  currentUser: null,
};

@Injectable({ providedIn: 'root' })
export class StateService {
  /**
   * سیگنالی که اطلاعات کاربر لاگین کرده را نگه می دارد.
   * مقدار اولیه آن null است به معنی اینکه کاربری وارد نشده است.
   */
  readonly currentUser = signal<User | null>(initialState.currentUser);

  /**
   * یک سیگنال محاسباتی (computed) که وضعیت لاگین بودن کاربر را مشخص می کند.
   * این سیگنال به صورت خودکار با تغییر currentUser به روز می شود.
   */
  readonly isAuthenticated = computed(() => !!this.currentUser());

  /**
   * متدی برای به روز رسانی اطلاعات کاربر فعلی در وضعیت برنامه.
   * @param user آبجکت کاربر یا null برای خروج از حساب.
   */
  setCurrentUser(user: User | null) {
    this.currentUser.set(user);
  }
}
