/**
 * @fileoverview کامپوننت صفحه لیست اخبار و تحلیل ها.
 * این کامپوننت لیستی از آیتم های خبری را نمایش می دهد و امکان
 * فیلتر کردن بر اساس دسته بندی اصلی و زیردسته را فراهم می کند.
 */
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/data/news.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { useQuery } from '../../composables/use-query';
import { NewsCardSkeletonComponent } from '../../components/news-card/news-card-skeleton.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-news-list',
  imports: [CommonModule, PageHeaderComponent, NewsCardComponent, NewsCardSkeletonComponent, QueryStateComponent],
  templateUrl: './news-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  private newsService = inject(NewsService);
  private query = useQuery(() => this.newsService.getNewsItems());

  allNews = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;

  /** لیست دسته بندی های اصلی. */
  categories = signal([
    { id: 'all', name: 'همه' },
    { id: 'crypto', name: 'کریپتو' },
    { id: 'forex', name: 'فارکس' },
    { id: 'iran-stock', name: 'بورس ایران' }
  ]);
  
  /** مپینگ دسته بندی اصلی به زیردسته های آن. */
  subCategories: {[key: string]: string[]} = {
    crypto: ['بیت کوین', 'اتریوم', 'آلتکوین ها'],
    forex: ['تحلیل جفت ارزها', 'اخبار اقتصادی'],
    'iran-stock': ['تحلیل شاخص کل', 'عرضه اولیه']
  };

  /** سیگنال برای نگهداری دسته بندی فعال. */
  activeCategory = signal('all');
  /** سیگنال برای نگهداری زیردسته فعال. */
  activeSubCategory = signal<string | null>(null);

  /**
   * سیگنال محاسباتی برای فیلتر کردن اخبار بر اساس دسته و زیردسته فعال.
   */
  filteredNews = computed(() => {
    const cat = this.activeCategory();
    const subCat = this.activeSubCategory();
    
    if (cat === 'all') {
      return this.allNews();
    }
    
    return this.allNews().filter(item => {
      const categoryMatch = item.category === cat;
      const subCategoryMatch = !subCat || item.subCategory === subCat;
      return categoryMatch && subCategoryMatch;
    });
  });

  /**
   * دسته بندی اصلی انتخاب شده را تنظیم می کند و زیردسته را ریست می کند.
   * @param categoryId شناسه دسته بندی انتخاب شده.
   */
  selectCategory(categoryId: string) {
    this.activeCategory.set(categoryId);
    this.activeSubCategory.set(null); // Reset subcategory when main category changes
  }

  /**
   * زیردسته انتخاب شده را تنظیم می کند. با کلیک مجدد، آن را غیرفعال می کند.
   * @param subCategory نام زیردسته انتخاب شده.
   */
  selectSubCategory(subCategory: string) {
    this.activeSubCategory.update(current => current === subCategory ? null : subCategory);
  }
}
