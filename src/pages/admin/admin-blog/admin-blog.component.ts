import { Component, ChangeDetectionStrategy, inject, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../services/data/blog.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { BlogPost } from '../../../models/blog.model';

@Component({
  selector: 'app-admin-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-blog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogComponent {
  private blogService = inject(BlogService);
  private notificationService = inject(NotificationService);

  private allPosts = this.blogService.posts;
  searchTerm = signal('');
  selectedCategory = signal('all');

  categories = signal(['all', 'آموزش', 'روانشناسی', 'تحلیل', 'مدیریت سرمایه']);

  posts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();

    return this.allPosts().filter(post => {
      const termMatch = !term ||
        post.title.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term);

      const categoryMatch = category === 'all' || post.category === category;

      return termMatch && categoryMatch;
    });
  });

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  deletePost(slug: string, title: string): void {
    if (confirm(`آیا از حذف مقاله "${title}" اطمینان دارید؟`)) {
      this.blogService.deletePost(slug);
      this.notificationService.showSuccess(`مقاله "${title}" با موفقیت حذف شد.`);
    }
  }
}
