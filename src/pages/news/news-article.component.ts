/**
 * @fileoverview کامپوننت نمایش محتوای یک خبر یا تحلیل.
 * این کامپوننت محتوای کامل یک آیتم خبری را بر اساس `slug`
 * موجود در URL دریافت و نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// FIX: Import RxJS operators from 'rxjs' instead of 'rxjs/operators'.
import { map, switchMap } from 'rxjs';
import { NewsService } from '../../services/data/news.service';
// FIX: Import `BreadcrumbItem` from the correct model file, not from the component.
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../models/ui.model';
import { useAsync } from '../../composables/use-async';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-news-article',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent],
  templateUrl: './news-article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsArticleComponent {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  private article$ = this.route.paramMap.pipe(
    map(params => params.get('slug')!),
    switchMap(slug => this.newsService.getArticleBySlug(slug))
  );

  private query = useAsync(this.article$);

  article = this.query.data;
  status = this.query.status;
  error = this.query.error;

  /**
   * سیگنال محاسباتی برای تولید آیتم های بردکرامب.
   */
  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const articleTitle = this.article()?.title;
    if (this.status() === 'error') {
      return [{ label: 'خطا' }];
    }
    if (!articleTitle) {
      return [];
    }
    return [
      { label: 'اخبار', link: '/news' },
      { label: articleTitle }
    ];
  });
}
