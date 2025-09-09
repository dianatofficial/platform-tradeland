
/**
 * @fileoverview کامپوننت هدر (Header) اپلیکیشن.
 * این کامپوننت شامل لوگو، منوی ناوبری اصلی (برای دسکتاپ و موبایل)
 * و دکمه ورود/پروفایل است.
 */
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../services/state/state.service';
import { AuthService } from '../../services/state/auth.service';
import { AppearanceService } from '../../services/state/appearance.service';

/**
 * @interface NavLink
 * ساختار داده برای هر آیتم در منوی ناوبری.
 */
interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
  }
})
export class HeaderComponent {
  private stateService = inject(StateService);
  private authService = inject(AuthService);
  private appearanceService = inject(AppearanceService);
  private router = inject(Router);

  siteName = this.appearanceService.siteName;

  /** سیگنالی برای مدیریت وضعیت باز یا بسته بودن منوی موبایل. */
  isMenuOpen = signal(false);
  /** سیگنالی برای مدیریت وضعیت باز یا بسته بودن منوی پروفایل کاربر. */
  isProfileMenuOpen = signal(false);
  /** سیگنالی برای نگهداری عبارت جستجو. */
  searchTerm = signal('');

  /** سیگنال حاوی اطلاعات کاربر فعلی از StateService. */
  currentUser = this.stateService.currentUser;
  
  /**
   * متدی برای بررسی وضعیت احراز هویت کاربر از طریق StateService.
   * این متد مقدار سیگنال محاسباتی را می خواند.
   * @returns {boolean} `true` if user is authenticated, otherwise `false`.
   */
  isAuthenticated(): boolean {
    return this.stateService.isAuthenticated();
  }

  /** لیستی از لینک های ناوبری اصلی سایت. */
  navLinks: NavLink[] = [
    { path: '/courses', label: 'دوره ها' },
    { path: '/products', label: 'محصولات' },
    { path: '/blog', label: 'بلاگ' },
    { path: '/news', label: 'اخبار' },
    { path: '/cafe-trade', label: 'کافه ترید' },
    { path: '/subscriptions', label: 'اشتراک' }
  ];

  /**
   * مقدار سیگنال جستجو را با ورودی کاربر به‌روز می‌کند.
   */
  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  /**
   * فرم جستجو را ارسال کرده و به صفحه نتایج هدایت می‌کند.
   */
  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const term = this.searchTerm().trim();
    if (term) {
      this.router.navigate(['/search'], { queryParams: { q: term } });
      this.searchTerm.set('');
      (event.target as HTMLFormElement).reset();
    }
  }

  /**
   * وضعیت باز یا بسته بودن منوی موبایل را تغییر می دهد.
   */
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  /**
   * وضعیت باز یا بسته بودن منوی پروفایل را تغییر می دهد.
   */
  toggleProfileMenu(event: Event) {
    event.stopPropagation(); // جلوگیری از بسته شدن فوری منو توسط onDocumentClick
    this.isProfileMenuOpen.update(value => !value);
  }
  
  /**
   * منوی پروفایل را می بندد.
   */
  closeProfileMenu() {
    this.isProfileMenuOpen.set(false);
  }

  /**
   * با کلیک در هر جای صفحه، منوی پروفایل را می بندد.
   */
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // اگر کلیک خارج از دکمه پروفایل بود، منو را ببند.
    if (!target.closest('#profile-menu-button')) {
      this.closeProfileMenu();
    }
  }

  /**
   * کاربر را از سیستم خارج می کند.
   */
  logout() {
    this.authService.logout();
    this.closeProfileMenu();
    this.isMenuOpen.set(false);
  }
}
