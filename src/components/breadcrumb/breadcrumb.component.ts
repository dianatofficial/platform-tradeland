/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش مسیر راهنما (Breadcrumb).
 * این کامپوننت لیستی از آیتم ها را دریافت کرده و به صورت یک مسیر راهنما نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../models/ui.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block mb-6'
  }
})
export class BreadcrumbComponent {
  /** ورودی اجباری: آرایه ای از آیتم های بردکرامب. */
  items = input.required<BreadcrumbItem[]>();
  /** ورودی اختیاری: تم رنگی (روشن یا تیره). پیش فرض 'light' است. */
  theme = input<'light' | 'dark'>('light');
}