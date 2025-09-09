/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت ویژگی ها در صفحه اصلی.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Feature } from '../../models/ui.model';

@Component({
  selector: 'app-feature-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './feature-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  /** ورودی اجباری: آبجکت داده های ویژگی. */
  feature = input.required<Feature>();
}
