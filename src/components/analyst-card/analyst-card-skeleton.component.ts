import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-analyst-card-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './analyst-card-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalystCardSkeletonComponent {}
