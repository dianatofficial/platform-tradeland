/**
 * @fileoverview کامپوننت نمایش یک مقاله بلاگ.
 * این کامپوننت محتوای کامل یک پست بلاگ را بر اساس `slug`
 * موجود در URL دریافت و نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { BlogService } from '../../services/data/blog.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../models/ui.model';
import { useAsync } from '../../composables/use-async';
import { QueryStateComponent } from '../../components/query-state/query-state.component';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent, BlogPostCardComponent],
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

  postLikes = signal(0);
  isLiked = signal(false);

  constructor() {
    // An effect to initialize likes when the post loads
    effect(() => {
      const p = this.post();
      if (p) {
        this.postLikes.set(p.likes);
        this.isLiked.set(false); // Reset like status on navigation to new post
      }
    });
  }

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

  /**
   * سیگنال محاسباتی برای پیدا کردن مقالات مرتبط.
   */
  relatedPosts = computed(() => {
    const currentPost = this.post();
    if (!currentPost) return [];
    
    // In a real app, this logic might be more complex (e.g., using tags)
    return this.blogService.posts()
      .filter(p => p.categoryId === currentPost.categoryId && p.slug !== currentPost.slug)
      .slice(0, 3);
  });

  /**
   * وضعیت لایک را تغییر داده و تعداد لایک‌ها را به صورت محلی به‌روز می‌کند.
   */
  toggleLike(): void {
    this.isLiked.update(liked => {
      const newLikedState = !liked;
      this.postLikes.update(likes => newLikedState ? likes + 1 : likes - 1);
      return newLikedState;
    });
  }
}
