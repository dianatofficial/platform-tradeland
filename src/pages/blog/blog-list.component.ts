/**
 * @fileoverview کامپوننت صفحه لیست مقالات بلاگ.
 * این کامپوننت لیستی از تمام پست های بلاگ را به همراه یک سایدبار
 * برای دسته بندی ها و پست های اخیر نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/data/blog.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { BlogPost } from '../../models/blog.model';
import { useQuery } from '../../composables/use-query';
import { BlogPostCardSkeletonComponent } from '../../components/blog-post-card/blog-post-card-skeleton.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, BlogPostCardComponent, BlogPostCardSkeletonComponent, QueryStateComponent],
  templateUrl: './blog-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {
  private blogService = inject(BlogService);
  private query = useQuery(() => this.blogService.getPosts());
  
  blogPosts = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;

  /** لیستی از دسته بندی های بلاگ برای نمایش در سایدبار. */
  categories = signal(['آموزش', 'روانشناسی', 'تحلیل', 'مدیریت سرمایه']);
  
  /** سیگنال محاسباتی برای نمایش ۲ پست آخر در بخش "پست های اخیر". */
  recentPosts = computed(() => this.blogPosts().slice(0, 2));
}
