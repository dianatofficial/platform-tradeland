import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-blog-post-card-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './blog-post-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostCardSkeletonComponent {}
