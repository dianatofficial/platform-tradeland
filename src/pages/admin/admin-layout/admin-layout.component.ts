import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavGroup } from '../../../models/ui.model';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  isSidebarOpen = signal(true); // Default to open on desktop

  constructor(private router: Router) {
    // On smaller screens, the sidebar should be closed by default.
    if (window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }

  navGroups: NavGroup[] = [
    {
      title: 'اصلی',
      links: [
        { path: 'dashboard', title: 'داشبورد', icon: 'layout-dashboard' },
      ],
    },
    {
      title: 'مدیریت محتوا',
      links: [
        { path: 'courses', title: 'دوره ها', icon: 'book-open' },
        { path: 'products', title: 'محصولات', icon: 'package' },
        { path: 'blog', title: 'بلاگ', icon: 'file-text' },
        { path: 'news', title: 'اخبار', icon: 'newspaper' },
        { path: 'cafe-trade', title: 'کافه ترید', icon: 'coffee' },
        { path: 'categories', title: 'دسته‌بندی‌ها', icon: 'folder-tree' },
        { path: 'media', title: 'کتابخانه رسانه', icon: 'image' },
      ],
    },
    {
      title: 'مدیریت کاربران',
      links: [
        { path: 'users', title: 'کاربران', icon: 'users' },
        { path: 'roles', title: 'نقش‌ها و دسترسی‌ها', icon: 'shield-check' },
        { path: 'instructors', title: 'مدرسین و تحلیلگران', icon: 'user-check' },
      ],
    },
     {
      title: 'فروش',
      links: [
        { path: 'subscriptions', title: 'اشتراک کاربران', icon: 'gem' },
        { path: 'subscription-plans', title: 'پلن‌های اشتراک', icon: 'layout-list' },
      ],
    },
    {
      title: 'تنظیمات',
      links: [
        { path: 'appearance', title: 'ظاهر برنامه', icon: 'palette' },
        { path: 'seo', title: 'تنظیمات سئو', icon: 'globe' },
        { path: 'settings', title: 'سایر تنظیمات', icon: 'settings' },
      ],
    },
  ];

  toggleSidebar() {
    this.isSidebarOpen.update(value => !value);
  }

  closeSidebarOnMobile() {
    if (window.innerWidth < 768) {
      this.isSidebarOpen.set(false);
    }
  }
}
