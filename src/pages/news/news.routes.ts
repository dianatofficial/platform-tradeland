/**
 * @fileoverview تعریف مسیرهای بخش اخبار و تحلیل.
 * این مسیرها به صورت تنبل (lazy-loaded) بارگذاری می شوند.
 */

import { Routes } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { NewsArticleComponent } from './news-article.component';

export const NEWS_ROUTES: Routes = [
  { path: '', component: NewsListComponent, title: 'اخبار و تحلیل' },
  { path: ':slug', component: NewsArticleComponent, title: 'جزئیات خبر' },
];
