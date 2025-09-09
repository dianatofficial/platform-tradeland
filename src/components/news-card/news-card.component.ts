/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش یک آیتم خبری.
 * این کامپوننت دو حالت نمایش ('compact' و 'full') برای استفاده در
 * صفحه اصلی و لیست اخبار دارد.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../models/news.model';

@Component({
  selector: 'app-news-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './news-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardComponent {
  /** ورودی اجباری: آبجکت داده های آیتم خبری. */
  item = input.required<NewsItem>();
  /** ورودی اختیاری: حالت نمایش کارت. پیش فرض 'full' است. */
  layout = input<'compact' | 'full'>('full');
}
