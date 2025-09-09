
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../../services/data/blog.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { BlogPost } from '../../../models/blog.model';
import { take } from 'rxjs';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-blog-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-blog-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlogFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  editMode = signal(false);
  postSlug = signal<string | null>(null);
  
  pageTitle = computed(() => this.editMode() ? 'ویرایش مقاله' : 'ایجاد مقاله جدید');

  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('تیم تریدپلت', [Validators.required]),
    category: new FormControl('آموزش', [Validators.required]),
    excerpt: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  private currentPost?: BlogPost;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.editMode.set(true);
      this.postSlug.set(slug);
      this.loadPostData(slug);
    }
  }

  loadPostData(slug: string): void {
    this.isLoading.set(true);
    this.blogService.getPostBySlug(slug).pipe(take(1)).subscribe({
      next: (post) => {
        this.currentPost = post;
        this.blogForm.patchValue(post);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notificationService.showError(err.message || 'خطا در دریافت اطلاعات مقاله.');
        this.router.navigate(['/admin/blog']);
        this.isLoading.set(false);
      }
    });
  }
  
  onSubmit(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.blogForm.value;

    if (this.editMode() && this.currentPost) {
      const updatedPost: BlogPost = { ...this.currentPost, ...formValue as Partial<BlogPost> };
      this.blogService.updatePost(updatedPost);
      this.notificationService.showSuccess('مقاله با موفقیت ویرایش شد.');
      this.router.navigate(['/admin/blog']);
    } else {
      this.blogService.addPost(formValue as Omit<BlogPost, 'slug' | 'date'>);
      this.notificationService.showSuccess('مقاله جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/blog']);
    }
  }
}