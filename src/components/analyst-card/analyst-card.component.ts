/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت یک تحلیلگر در صفحه کافه ترید.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Analyst } from '../../models/cafe-trade.model';

@Component({
  selector: 'app-analyst-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './analyst-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalystCardComponent {
  /** ورودی اجباری: آبجکت داده های تحلیلگر. */
  analyst = input.required<Analyst>();

  /**
   * تعداد دنبال کنندگان را به فرمت کوتاه (مثلا 12.5k) تبدیل می کند.
   * @param count تعداد دنبال کنندگان.
   * @returns رشته فرمت شده.
   */
  formatFollowers(count: number): string {
    if (count >= 1000) {
      // `.replace('.0', '')` برای حذف ".0" از اعدادی مانند 12.0k
      return (count / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return count.toString();
  }
}
