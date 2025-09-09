/**
 * @fileoverview تعریف مسیرهای بخش بلاگ.
 * این مسیرها به صورت تنبل (lazy-loaded) بارگذاری می شوند.
 */

import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list.component';
import { BlogPostComponent } from './blog-post.component';

export const BLOG_ROUTES: Routes = [
  { path: '', component: BlogListComponent, title: 'بلاگ آموزشی' },
  { path: ':slug', component: BlogPostComponent, title: 'مقاله بلاگ' },
];
