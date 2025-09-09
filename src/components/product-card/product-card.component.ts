/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت یک محصول دانلودی.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  /** ورودی اجباری: آبجکت داده های محصول. */
  product = input.required<Product>();
}
