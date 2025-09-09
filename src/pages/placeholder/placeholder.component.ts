
/**
 * @fileoverview کامپوننت Placeholder.
 * این کامپوننت برای صفحاتی استفاده می شود که هنوز ساخته نشده اند.
 * عنوان صفحه را از داده های مسیر (route data) دریافت می کند.
 */
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// FIX: Import RxJS operators from 'rxjs' instead of 'rxjs/operators'.
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  imports: [CommonModule],
  templateUrl: './placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  private route = inject(ActivatedRoute);
  
  /**
   * سیگنالی که عنوان صفحه را نگه می دارد.
   * این مقدار از `data.title` در تعریف مسیر خوانده می شود.
   */
  title = toSignal(
    this.route.data.pipe(map(d => d['title'] || 'در حال ساخت')),
    { initialValue: 'در حال ساخت' }
  );
}