/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای هدر صفحات.
 * این کامپوننت یک عنوان اصلی و یک زیرعنوان اختیاری را نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  /** ورودی اجباری برای عنوان اصلی صفحه. */
  title = input.required<string>();
  /** ورودی اختیاری برای زیرعنوان یا توضیحات صفحه. */
  subtitle = input<string>();
}
