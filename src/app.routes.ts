/**
 * @fileoverview تعریف مسیرهای (routes) اصلی اپلیکیشن.
 * این فایل شامل مسیرهای اصلی و بارگذاری فوری (eager-loading) تمام ماژول های ویژگی است.
 * این ساختار پایداری برنامه را در محیط فعلی تضمین می کند.
 */

import { Routes } from '@angular/router';

// Static imports for all pages and route configurations
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { SearchResultsComponent } from './pages/search/search-results.component';

import { COURSES_ROUTES } from './pages/courses/courses.routes';
import { PRODUCTS_ROUTES } from './pages/products/products.routes';
import { BLOG_ROUTES } from './pages/blog/blog.routes';
import { NEWS_ROUTES } from './pages/news/news.routes';
import { ADMIN_ROUTES } from './pages/admin/admin.routes';
import { PROFILE_ROUTES } from './pages/profile/profile.routes';
import { CAFE_TRADE_ROUTES } from './pages/cafe-trade/cafe-trade.routes';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'صفحه اصلی' },
  
  { 
    path: 'courses', 
    children: COURSES_ROUTES
  },

  { 
    path: 'products', 
    children: PRODUCTS_ROUTES
  },

  { 
    path: 'blog', 
    children: BLOG_ROUTES
  },
  
  { 
    path: 'news', 
    children: NEWS_ROUTES
  },

  { 
    path: 'cafe-trade', 
    children: CAFE_TRADE_ROUTES
  },

  { 
    path: 'subscriptions', 
    component: SubscriptionsComponent,
    title: 'اشتراک ویژه',
  },
  
  { path: 'search', component: SearchResultsComponent, title: 'نتایج جستجو' },

  { path: 'login', component: LoginComponent, title: 'ورود' },
  { path: 'register', component: RegisterComponent, title: 'ثبت نام' },
  
  {
    path: 'admin',
    children: ADMIN_ROUTES
  },

  {
    path: 'profile',
    children: PROFILE_ROUTES
  },
  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];