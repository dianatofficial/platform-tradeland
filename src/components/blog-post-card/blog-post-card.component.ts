/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت یک پست بلاگ.
 * این کامپوننت دو حالت نمایش (layout) دارد: 'list' برای نمایش کامل
 * و 'compact' برای نمایش خلاصه.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostCardComponent {
  /** ورودی اجباری: آبجکت داده های پست بلاگ. */
  post = input.required<BlogPost>();
  /** ورودی اختیاری: حالت نمایش کارت ('list' یا 'compact'). پیش فرض 'list' است. */
  layout = input<'list' | 'compact'>('list');
}
