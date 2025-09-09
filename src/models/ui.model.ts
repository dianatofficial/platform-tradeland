/**
 * @fileoverview تعریف مدل های داده (Interfaces) برای کامپوننت های UI و سایر بخش ها.
 */

/**
 * @interface BreadcrumbItem
 * ساختار داده برای هر آیتم در مسیر راهنما.
 */
export interface BreadcrumbItem {
  label: string;
  link?: string;
}

/**
 * @interface Feature
 * ساختار داده برای یک کارت ویژگی.
 */
export interface Feature {
  title: string;
  description: string;
  icon: string;
  link: string;
}

/**
 * @interface Notification
 * ساختار داده برای یک اعلان (notification).
 */
export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

/**
 * @interface NavLink
 * ساختار داده برای یک لینک در منوی ناوبری پنل ادمین.
 */
export interface NavLink {
  path: string;
  title: string;
  icon: string;
}

/**
 * @interface NavGroup
 * ساختار داده برای یک گروه از لینک های ناوبری در پنل ادمین.
 */
export interface NavGroup {
  title: string;
  links: NavLink[];
}

/**
 * @interface StatCard
 * ساختار داده برای کارت های آمار در داشبورد ادمین.
 */
export interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
  changeType: 'increase' | 'decrease';
}
