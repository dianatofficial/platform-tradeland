import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../../services/data/media.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { MediaItem } from '../../../models/media.model';

@Component({
  selector: 'app-admin-media',
  imports: [CommonModule],
  templateUrl: './admin-media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMediaComponent {
  private mediaService = inject(MediaService);
  private notificationService = inject(NotificationService);

  mediaItems = this.mediaService.mediaItems;

  deleteMediaItem(item: MediaItem): void {
    if (confirm(`آیا از حذف فایل "${item.filename}" اطمینان دارید؟`)) {
      this.mediaService.deleteMediaItem(item.id);
      this.notificationService.showSuccess(`فایل "${item.filename}" با موفقیت حذف شد.`);
    }
  }

  copyUrl(url: string): void {
    navigator.clipboard.writeText(url).then(() => {
      this.notificationService.showSuccess('آدرس تصویر کپی شد.');
    });
  }
}
