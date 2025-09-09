/**
 * @fileoverview سرویس مدیریت داده های بلاگ.
 * این سرویس مسئول فراهم کردن داده های نمونه (mock) برای پست های بلاگ است.
 * در یک اپلیکیشن واقعی، این سرویس به یک API برای دریافت داده ها متصل می شود.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, switchMap, throwError } from 'rxjs';
import { ALL_POSTS } from '../../data/blog.data';
import { BlogPost } from '../../models/blog.model';
import { ALL_CATEGORIES } from '../../data/categories.data';
import { ALL_USERS } from '../../data/users.data';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private postsState = signal<BlogPost[]>(ALL_POSTS);

  public posts = this.postsState.asReadonly();

  private enrichPost(post: BlogPost): BlogPost {
    const category = ALL_CATEGORIES.find(c => c.id === post.categoryId);
    const author = ALL_USERS.find(u => u.id === post.authorId);
    return {
      ...post,
      category: category?.name || 'بدون دسته',
      author: author?.fullName || post.author,
      authorImage: author?.avatarUrl || 'https://picsum.photos/seed/default-author/100/100',
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
   * تمام پست ها را به صورت یک Observable برمی گرداند.
   * @returns {Observable<BlogPost[]>} یک Observable از آرایه پست ها.
   */
  getPosts(): Observable<BlogPost[]> {
    const enrichedPosts = this.postsState().map(p => this.enrichPost(p));
    return of(enrichedPosts).pipe(delay(200));
  }

  /**
   * یک پست خاص را بر اساس slug آن پیدا و برمی گرداند.
   * @param slug اسلاگ (شناسه متنی) پست.
   * @returns {Observable<BlogPost | undefined>} یک Observable از پست پیدا شده یا undefined.
   */
  getPostBySlug(slug: string): Observable<BlogPost> {
    return of(null).pipe(
      delay(100),
      switchMap(() => {
        const post = this.postsState().find(p => p.slug === slug);
        if (!post) {
          return throwError(() => new Error(`مقاله با اسلاگ ${slug} یافت نشد.`));
        }
        return of(this.enrichPost(post));
      })
    );
  }

  /**
   * یک پست بلاگ جدید اضافه می‌کند.
   * @param postData داده‌های پست جدید (بدون slug و تاریخ).
   */
  addPost(postData: Omit<BlogPost, 'slug' | 'date' | 'category' | 'authorImage'>): void {
    const newSlug = `${this.createSlug(postData.title)}-${Date.now()}`;
    const newPost: BlogPost = {
      ...postData,
      slug: newSlug,
      date: new Date().toLocaleDateString('fa-IR'),
      category: '', // will be enriched on get
      authorImage: '', // will be enriched on get
    };
    this.postsState.update(posts => [newPost, ...posts]);
  }

  /**
   * یک پست بلاگ موجود را به‌روزرسانی می‌کند.
   * @param updatedPost آبجکت کامل پست به‌روز شده.
   */
  updatePost(updatedPost: BlogPost): void {
    this.postsState.update(posts =>
      posts.map(p => p.slug === updatedPost.slug ? updatedPost : p)
    );
  }


  /**
   * یک پست بلاگ را بر اساس اسلاگ حذف می‌کند.
   * @param slug اسلاگ پستی که باید حذف شود.
   */
  deletePost(slug: string): void {
    this.postsState.update(posts => posts.filter(p => p.slug !== slug));
  }
}
