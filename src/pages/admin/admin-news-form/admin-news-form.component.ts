
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../../services/data/news.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { NewsItem } from '../../../models/news.model';
import { take } from 'rxjs';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-news-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-news-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNewsFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  editMode = signal(false);
  articleSlug = signal<string | null>(null);
  
  pageTitle = computed(() => this.editMode() ? 'ویرایش خبر' : 'ایجاد خبر جدید');

  newsForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
    category: new FormControl('crypto', [Validators.required]),
    subCategory: new FormControl('بیت کوین', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  private currentArticle?: NewsItem;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.editMode.set(true);
      this.articleSlug.set(slug);
      this.loadArticleData(slug);
    }
  }

  loadArticleData(slug: string): void {
    this.isLoading.set(true);
    this.newsService.getArticleBySlug(slug).pipe(take(1)).subscribe({
      next: (article) => {
        this.currentArticle = article;
        this.newsForm.patchValue(article);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notificationService.showError(err.message || 'خطا در دریافت اطلاعات خبر.');
        this.router.navigate(['/admin/news']);
        this.isLoading.set(false);
      }
    });
  }
  
  onSubmit(): void {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.newsForm.value;

    if (this.editMode() && this.currentArticle) {
      const updatedArticle: NewsItem = { ...this.currentArticle, ...formValue as Partial<NewsItem> };
      this.newsService.updateArticle(updatedArticle);
      this.notificationService.showSuccess('خبر با موفقیت ویرایش شد.');
      this.router.navigate(['/admin/news']);
    } else {
      this.newsService.addArticle(formValue as Omit<NewsItem, 'slug' | 'time'>);
      this.notificationService.showSuccess('خبر جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/news']);
    }
  }
}