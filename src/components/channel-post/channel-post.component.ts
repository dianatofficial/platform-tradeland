/**
 * @fileoverview کامپوننت نمایش یک پست در کانال کافه ترید.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeTradePost } from '../../models/cafe-trade.model';

@Component({
  selector: 'app-channel-post',
  imports: [CommonModule],
  templateUrl: './channel-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelPostComponent {
  post = input.required<CafeTradePost>();

  getRelativeTime(date: Date): string {
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return 'همین الان';
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    return `${days} روز پیش`;
  }
}
