import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-news-card-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './news-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCardSkeletonComponent {}
