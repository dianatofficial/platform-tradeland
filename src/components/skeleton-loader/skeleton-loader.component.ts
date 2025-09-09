import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
  width = input<string>('100%');
  height = input<string>('1rem');
  shape = input<'rect' | 'circle'>('rect');
  className = input<string>('');
}
