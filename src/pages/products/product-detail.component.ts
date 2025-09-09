/**
 * @fileoverview کامپوننت نمایش جزئیات یک محصول دانلودی.
 * این کامپوننت اطلاعات محصول را بر اساس `slug` موجود در URL دریافت و نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// FIX: Import RxJS operators from 'rxjs' instead of 'rxjs/operators'.
import { map, switchMap } from 'rxjs';
import { ProductService } from '../../services/data/product.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { useAsync } from '../../composables/use-async';
import { BreadcrumbItem } from '../../models/ui.model';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private product$ = this.route.paramMap.pipe(
    map(params => params.get('slug')!),
    switchMap(slug => this.productService.getProductBySlug(slug))
  );
  
  private query = useAsync(this.product$);

  product = this.query.data;
  status = this.query.status;
  error = this.query.error;

  /**
   * سیگنال محاسباتی برای تولید آیتم های بردکرامب.
   */
  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const productTitle = this.product()?.title;
     if (this.status() === 'error') {
      return [{ label: 'خطا' }];
    }
    if (!productTitle) {
      return [];
    }
    return [
      { label: 'محصولات', link: '/products' },
      { label: productTitle }
    ];
  });

  /**
   * سیگنال محاسباتی برای محاسبه میانگین امتیاز محصول از نظرات.
   */
  averageRating = computed(() => {
    const p = this.product();
    if (!p || !p.reviews || p.reviews.length === 0) {
      return 0;
    }
    const total = p.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / p.reviews.length).toFixed(1);
  });

  /**
   * یک آرایه از اعداد برای حلقه زدن و نمایش ستاره های امتیاز.
   * @param rating امتیاز.
   * @returns آرایه ای از اعداد.
   */
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(1);
  }
}
