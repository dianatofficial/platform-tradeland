/**
 * @fileoverview کامپوننت صفحه نتایج جستجو.
 * این کامپوننت نتایج جستجو را برای دوره ها، محصولات و مقالات بلاگ نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { CourseService } from '../../services/data/course.service';
import { ProductService } from '../../services/data/product.service';
import { BlogService } from '../../services/data/blog.service';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { BlogPostCardComponent } from '../../components/blog-post-card/blog-post-card.component';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, PageHeaderComponent, CourseCardComponent, ProductCardComponent, BlogPostCardComponent],
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private productService = inject(ProductService);
  private blogService = inject(BlogService);

  query = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('q') || ''))
  );

  private allCourses = this.courseService.courses;
  private allProducts = this.productService.products;
  private allPosts = this.blogService.posts;
  
  foundCourses = computed(() => {
    const term = this.query()?.toLowerCase().trim();
    if (!term) return [];
    return this.allCourses().filter(c => 
      c.title.toLowerCase().includes(term) ||
      c.description.toLowerCase().includes(term) ||
      c.instructor.toLowerCase().includes(term)
    );
  });
  
  foundProducts = computed(() => {
    const term = this.query()?.toLowerCase().trim();
    if (!term) return [];
    return this.allProducts().filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.author.toLowerCase().includes(term)
    );
  });
  
  foundPosts = computed(() => {
    const term = this.query()?.toLowerCase().trim();
    if (!term) return [];
    return this.allPosts().filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.excerpt.toLowerCase().includes(term) ||
      p.author.toLowerCase().includes(term)
    );
  });

  totalResults = computed(() => 
    this.foundCourses().length + this.foundProducts().length + this.foundPosts().length
  );
}
