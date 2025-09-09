import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './product-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardSkeletonComponent {}
