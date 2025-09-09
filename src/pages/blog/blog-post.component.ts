/**
 * @fileoverview کامپوننت نمایش یک مقاله بلاگ.
 * این کامپوننت محتوای کامل یک پست بلاگ را بر اساس `slug`
 * موجود در URL دریافت و نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// FIX: Import RxJS operators from 'rxjs' instead of 'rxjs/operators'.
import { map, switchMap } from 'rxjs';
import { BlogService } from '../../services/data/blog.service';
// FIX: Import `BreadcrumbItem` from the correct model file, not from the component.
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../models/ui.model';
import { useAsync } from '../../composables/use-async';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent],
  templateUrl: './blog-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  
  private post$ = this.route.paramMap.pipe(
    map(params => params.get('slug')!),
    switchMap(slug => this.blogService.getPostBySlug(slug))
  );

  private query = useAsync(this.post$);
  
  post = this.query.data;
  status = this.query.status;
  error = this.query.error;

  /**
   * سیگنال محاسباتی برای تولید آیتم های بردکرامب.
   */
  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const postTitle = this.post()?.title;
    if (this.status() === 'error') {
      return [{ label: 'خطا' }];
    }
    if (!postTitle) {
      return [];
    }
    return [
      { label: 'بلاگ', link: '/blog' },
      { label: postTitle }
    ];
  });
}
