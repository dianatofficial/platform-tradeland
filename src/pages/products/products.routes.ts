/**
 * @fileoverview تعریف مسیرهای بخش محصولات دانلودی.
 * این مسیرها به صورت تنبل (lazy-loaded) بارگذاری می شوند.
 */

import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list.component';
import { ProductDetailComponent } from './product-detail.component';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductsListComponent, title: 'محصولات دانلودی' },
  { path: ':slug', component: ProductDetailComponent, title: 'جزئیات محصول' },
];
