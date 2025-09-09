/**
 * @fileoverview کامپوننت صفحه لیست مقالات بلاگ.
 * این کامپوننت لیستی از تمام پست های بلاگ را به همراه یک سایدبار
 * برای دسته بندی ها و پست های اخیر نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/data/blog.service';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';
import { useQuery } from '../../composables/use-query';
import { QueryStateComponent } from '../../components/query-state/query-state.component';
import { CategoryService } from '../../services/data/category.service';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterLink, BlogPostCardComponent, QueryStateComponent],
  templateUrl: './blog-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {
  private blogService = inject(BlogService);
  private categoryService = inject(CategoryService);
  private query = useQuery(() => this.blogService.getPosts());
  
  blogPosts = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;

  selectedCategory = signal<number | 'all'>('all');

  /** لیستی از دسته بندی های بلاگ برای نمایش در فیلتر. */
  categories = computed(() => this.categoryService.getCategoriesByType('blog'));
  
  featuredPost = computed(() => this.blogPosts().find(p => p.featured));

  filteredPosts = computed(() => {
    const regularPosts = this.blogPosts().filter(p => !p.featured);
    const category = this.selectedCategory();
    if (category === 'all') {
      return regularPosts;
    }
    return regularPosts.filter(p => p.categoryId === category);
  });

  /** سیگنال محاسباتی برای نمایش 4 پست پربازدید در سایدبار. */
  trendingPosts = computed(() => this.blogPosts().sort((a, b) => b.views - a.views).slice(0, 4));

  /** سیگنال محاسباتی برای استخراج تمام تگ های منحصر به فرد. */
  allTags = computed(() => {
    const tags = this.blogPosts().flatMap(p => p.tags);
    // Remove duplicates and return
    return [...new Set(tags)];
  });

  /**
   * دسته بندی انتخاب شده را از طریق دکمه ها تنظیم می کند.
   * @param categoryId شناسه دسته بندی.
   */
  selectCategory(categoryId: number | 'all') {
    this.selectedCategory.set(categoryId);
  }
}
