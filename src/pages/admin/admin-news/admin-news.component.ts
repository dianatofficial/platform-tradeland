

import { Component, ChangeDetectionStrategy, inject, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../../services/data/news.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { NewsItem } from '../../../models/news.model';

@Component({
  selector: 'app-admin-news',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNewsComponent {
  private newsService = inject(NewsService);
  private notificationService = inject(NotificationService);

  private allNewsItems = this.newsService.newsItems;
  searchTerm = signal('');
  selectedCategory = signal('all');

  categories = signal([
    { id: 'all', name: 'همه دسته‌بندی‌ها' },
    { id: 'crypto', name: 'کریپتو' },
    { id: 'forex', name: 'فارکس' },
    { id: 'iran-stock', name: 'بورس ایران' }
  ]);

  newsItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();

    return this.allNewsItems().filter(item => {
      const termMatch = !term ||
        item.title.toLowerCase().includes(term) ||
        item.source.toLowerCase().includes(term);
        
      const categoryMatch = category === 'all' || item.category === category;
      
      return termMatch && categoryMatch;
    });
  });
  
  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  deleteArticle(slug: string, title: string): void {
    if (confirm(`آیا از حذف خبر "${title}" اطمینان دارید؟`)) {
      this.newsService.deleteArticle(slug);
      this.notificationService.showSuccess(`خبر "${title}" با موفقیت حذف شد.`);
    }
  }
}