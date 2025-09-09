import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-channel-post-skeleton',
  imports: [SkeletonLoaderComponent],
  templateUrl: './channel-post-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelPostSkeletonComponent {}