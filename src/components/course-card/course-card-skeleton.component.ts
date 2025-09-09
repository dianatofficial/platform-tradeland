import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-course-card-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './course-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardSkeletonComponent {}
