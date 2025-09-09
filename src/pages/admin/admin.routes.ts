/**
 * @fileoverview تعریف مسیرهای بخش پنل مدیریت.
 * این مسیرها به صورت تنبل (lazy-loaded) بارگذاری می شوند.
 */

import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminCourseFormComponent } from './admin-course-form/admin-course-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminCafeTradeComponent } from './admin-cafe-trade/admin-cafe-trade.component';
import { AdminMediaComponent } from './admin-media/admin-media.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminInstructorsComponent } from './admin-instructors/admin-instructors.component';
import { AdminSubscriptionsComponent } from './admin-subscriptions/admin-subscriptions.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminBlogFormComponent } from './admin-blog-form/admin-blog-form.component';
import { AdminNewsFormComponent } from './admin-news-form/admin-news-form.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';
import { AdminAppearanceComponent } from './admin-appearance/admin-appearance.component';
import { AdminAppearanceHomeComponent } from './admin-appearance-home/admin-appearance-home.component';
import { AdminAppearanceHeaderComponent } from './admin-appearance-header/admin-appearance-header.component';
import { AdminAppearanceFooterComponent } from './admin-appearance-footer/admin-appearance-footer.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminSubscriptionPlansComponent } from './admin-subscription-plans/admin-subscription-plans.component';
import { AdminSubscriptionPlanFormComponent } from './admin-subscription-plan-form/admin-subscription-plan-form.component';
import { AdminRolesComponent } from './admin-roles/admin-roles.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent, title: 'داشبورد' },
      
      // Content Management
      { path: 'courses', component: AdminCoursesComponent, title: 'مدیریت دوره ها' },
      { path: 'courses/new', component: AdminCourseFormComponent, title: 'افزودن دوره جدید' },
      { path: 'courses/edit/:id', component: AdminCourseFormComponent, title: 'ویرایش دوره' },
      { path: 'products', component: AdminProductsComponent, title: 'مدیریت محصولات' },
      { path: 'products/new', component: AdminProductFormComponent, title: 'افزودن محصول' },
      { path: 'products/edit/:slug', component: AdminProductFormComponent, title: 'ویرایش محصول' },
      { path: 'blog', component: AdminBlogComponent, title: 'مدیریت بلاگ' },
      { path: 'blog/new', component: AdminBlogFormComponent, title: 'مقاله جدید' },
      { path: 'blog/edit/:slug', component: AdminBlogFormComponent, title: 'ویرایش مقاله' },
      { path: 'news', component: AdminNewsComponent, title: 'مدیریت اخبار' },
      { path: 'news/new', component: AdminNewsFormComponent, title: 'خبر جدید' },
      { path: 'news/edit/:slug', component: AdminNewsFormComponent, title: 'ویرایش خبر' },
      { path: 'cafe-trade', component: AdminCafeTradeComponent, title: 'مدیریت کافه ترید' },
      { path: 'categories', component: AdminCategoriesComponent, title: 'مدیریت دسته‌بندی‌ها' },
      { path: 'media', component: AdminMediaComponent, title: 'کتابخانه رسانه' },
      
      // User Management
      { path: 'users', component: AdminUsersComponent, title: 'مدیریت کاربران' },
      { path: 'users/new', component: AdminUserFormComponent, title: 'افزودن کاربر' },
      { path: 'users/edit/:id', component: AdminUserFormComponent, title: 'ویرایش کاربر' },
      { path: 'roles', component: AdminRolesComponent, title: 'نقش‌ها و دسترسی‌ها' },
      { path: 'instructors', component: AdminInstructorsComponent, title: 'مدیریت مدرسین' },
      
      // Sales Management
      { path: 'subscriptions', component: AdminSubscriptionsComponent, title: 'اشتراک کاربران' },
      { path: 'subscription-plans', component: AdminSubscriptionPlansComponent, title: 'پلن‌های اشتراک' },
      { path: 'subscription-plans/new', component: AdminSubscriptionPlanFormComponent, title: 'پلن جدید' },
      { path: 'subscription-plans/edit/:id', component: AdminSubscriptionPlanFormComponent, title: 'ویرایش پلن' },
      
      // Settings
      { 
        path: 'appearance', 
        component: AdminAppearanceComponent,
        title: 'مدیریت ظاهر',
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: AdminAppearanceHomeComponent, title: 'صفحه اصلی' },
          { path: 'header', component: AdminAppearanceHeaderComponent, title: 'هدر' },
          { path: 'footer', component: AdminAppearanceFooterComponent, title: 'فوتر' },
        ]
      },
      { path: 'seo', component: AdminSettingsComponent, title: 'تنظیمات سئو' },
      { path: 'settings', component: AdminSettingsComponent, title: 'سایر تنظیمات' },
    ]
  },
];
