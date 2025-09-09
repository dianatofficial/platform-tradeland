/**
 * @fileoverview Mock data for categories.
 */
import { Category } from '../models/category.model';

export const ALL_CATEGORIES: Category[] = [
  // Course Categories
  { id: 1, name: 'تحلیل تکنیکال', type: 'course' },
  { id: 2, name: 'تحلیل فاندامنتال', type: 'course' },
  { id: 3, name: 'مدیریت سرمایه', type: 'course' },
  { id: 4, name: 'پرایс اکشن', type: 'course' },
  { id: 5, name: 'روانشناسی معامله‌گری', type: 'course' },

  // Blog Categories
  { id: 101, name: 'آموزش', type: 'blog' },
  { id: 102, name: 'روانشناسی', type: 'blog' },
  { id: 103, name: 'تحلیل', type: 'blog' },
  { id: 104, name: 'اخبار روز', type: 'blog' },

  // News Categories
  { id: 201, name: 'کریپتو', type: 'news' },
  { id: 202, name: 'فارکس', type: 'news' },
  { id: 203, name: 'بورس ایران', type: 'news' },

  // Product Categories
  { id: 301, name: 'کتاب های روانشناسی', type: 'product' },
  { id: 302, name: 'کتاب های تحلیل تکنیکال', type: 'product' },
  { id: 303, name: 'ابزارهای معاملاتی', type: 'product' },
];
