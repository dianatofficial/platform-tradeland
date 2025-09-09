/**
 * @fileoverview سرویس مدیریت داده های کافه ترید.
 * این سرویس مسئول فراهم کردن داده های نمونه (mock) برای تحلیلگران است.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { ALL_ANALYSTS } from '../../data/cafe-trade.data';
import { ALL_CAFE_TRADE_POSTS } from '../../data/cafe-trade-posts.data';
import { Analyst, CafeTradePost } from '../../models/cafe-trade.model';

@Injectable({ providedIn: 'root' })
export class CafeTradeService {
  private analystsState = signal<Analyst[]>(ALL_ANALYSTS);
  private postsState = signal<CafeTradePost[]>(ALL_CAFE_TRADE_POSTS);

  public analysts = this.analystsState.asReadonly();
  public posts = this.postsState.asReadonly();
  
  /**
   * تمام تحلیلگران را به صورت یک Observable برمی گرداند.
   * @returns {Observable<Analyst[]>} یک Observable از آرایه تحلیلگران.
   */
  getAnalysts(): Observable<Analyst[]> {
    return of(this.analystsState()).pipe(delay(200));
  }

  /**
   * یک کانال (تحلیلگر) خاص را بر اساس شناسه آن پیدا و برمی گرداند.
   * @param id شناسه کانال.
   * @returns {Observable<Analyst>} یک Observable از تحلیلگر پیدا شده.
   */
  getChannelById(id: number): Observable<Analyst> {
    const analyst = this.analystsState().find(a => a.id === id);
    if (!analyst) {
      return throwError(() => new Error(`کانال با شناسه ${id} یافت نشد.`));
    }
    return of(analyst).pipe(delay(100));
  }
  
  /**
   * پست های یک کانال خاص را برمی گرداند.
   * @param channelId شناسه کانال.
   * @returns {Observable<CafeTradePost[]>} یک Observable از آرایه پست های کانال.
   */
  getPostsByChannelId(channelId: number): Observable<CafeTradePost[]> {
    const posts = this.postsState()
      .filter(p => p.channelId === channelId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return of(posts).pipe(delay(200));
  }

  /**
   * یک پست جدید به کانال اضافه می‌کند.
   * @param postData داده‌های پست جدید.
   */
  addPost(postData: Omit<CafeTradePost, 'id' | 'timestamp' | 'reactions'>): void {
    const newPost: CafeTradePost = {
      ...postData,
      id: Date.now(),
      timestamp: new Date(),
      reactions: { likes: 0, dislikes: 0 },
    };
    this.postsState.update(posts => [newPost, ...posts]);
  }


  /**
   * یک تحلیلگر را بر اساس شناسه حذف می‌کند.
   * @param id شناسه تحلیلگری که باید حذف شود.
   */
  deleteAnalyst(id: number): void {
    this.analystsState.update(analysts => analysts.filter(a => a.id !== id));
    // Also delete their posts
    this.postsState.update(posts => posts.filter(p => p.channelId !== id));
  }
}