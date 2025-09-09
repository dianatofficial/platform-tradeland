/**
 * @fileoverview سرویس مدیریت داده های کتابخانه رسانه.
 */
import { Injectable, signal } from '@angular/core';
import { ALL_MEDIA } from '../../data/media.data';
import { MediaItem } from '../../models/media.model';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private mediaItemsState = signal<MediaItem[]>(ALL_MEDIA);

  public mediaItems = this.mediaItemsState.asReadonly();

  /**
   * یک آیتم رسانه را بر اساس شناسه حذف می‌کند.
   * @param id شناسه آیتمی که باید حذف شود.
   */
  deleteMediaItem(id: number): void {
    this.mediaItemsState.update(items => items.filter(item => item.id !== id));
  }
}
