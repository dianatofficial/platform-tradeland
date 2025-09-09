


/**
 * @fileoverview سرویس مدیریت داده های اخبار.
 * این سرویس مسئول فراهم کردن داده های نمونه (mock) برای آیتم های خبری است.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, switchMap, throwError } from 'rxjs';
import { ALL_NEWS } from '../../data/news.data';
import { NewsItem } from '../../models/news.model';
import { ALL_CATEGORIES } from '../../data/categories.data';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private newsItemsState = signal<NewsItem[]>(ALL_NEWS);
  
  public newsItems = this.newsItemsState.asReadonly();
  
  private enrichArticle(article: NewsItem): NewsItem {
    const category = ALL_CATEGORIES.find(c => c.id === article.categoryId);
    return {
      ...article,
      category: category?.name || 'بدون دسته',
    };
  }

  /**
   * Creates a URL-friendly slug from a string.
   * @param title The string to convert.
   * @returns The slug.
   */
  private createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  /**
   * تمام آیتم های خبری را به صورت یک Observable برمی گرداند.
   * @returns {Observable<NewsItem[]>} یک Observable از آرایه آیتم های خبری.
   */
  getNewsItems(): Observable<NewsItem[]> {
    const enrichedItems = this.newsItemsState().map(n => this.enrichArticle(n));
    return of(enrichedItems).pipe(delay(200));
  }

  /**
   * یک آیتم خبری خاص را بر اساس slug آن پیدا و برمی گرداند.
   * @param slug اسلاگ (شناسه متنی) خبر.
   * @returns {Observable<NewsItem>} یک Observable از خبر پیدا شده.
   */
  getArticleBySlug(slug: string): Observable<NewsItem> {
    return of(null).pipe(
      delay(100),
      switchMap(() => {
        const article = this.newsItemsState().find(n => n.slug === slug);
        if (!article) {
          return throwError(() => new Error(`خبر با اسلاگ ${slug} یافت نشد.`));
        }
        return of(this.enrichArticle(article));
      })
    );
  }

  /**
   * یک خبر جدید اضافه می‌کند.
   * @param articleData داده‌های خبر جدید.
   */
  addArticle(articleData: Omit<NewsItem, 'slug' | 'time' | 'category'>): void {
    const newSlug = `${this.createSlug(articleData.title)}-${Date.now()}`;
    const newArticle: NewsItem = {
      ...articleData,
      slug: newSlug,
      time: 'هم اکنون',
      category: '', // will be enriched on get
    };
    this.newsItemsState.update(items => [newArticle, ...items]);
  }

  /**
   * یک خبر موجود را به‌روزرسانی می‌کند.
   * @param updatedArticle آبجکت کامل خبر به‌روز شده.
   */
  updateArticle(updatedArticle: NewsItem): void {
    this.newsItemsState.update(items =>
      items.map(item => item.slug === updatedArticle.slug ? updatedArticle : item)
    );
  }

  /**
   * یک خبر را بر اساس اسلاگ حذف می‌کند.
   * @param slug اسلاگ خبری که باید حذف شود.
   */
  deleteArticle(slug: string): void {
    this.newsItemsState.update(items => items.filter(item => item.slug !== slug));
  }
}
