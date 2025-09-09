import { Component, ChangeDetectionStrategy, input, signal, afterNextRender, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent implements OnDestroy {
  images = input.required<string[]>();

  currentIndex = signal(0);
  private intervalId: any;

  constructor() {
    afterNextRender(() => {
      this.startAutoplay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay(); // Ensure no multiple intervals are running
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  prev(): void {
    this.currentIndex.update(current => (current > 0 ? current - 1 : this.images().length - 1));
    this.startAutoplay(); // Reset timer on manual navigation
  }

  next(): void {
    this.currentIndex.update(current => (current < this.images().length - 1 ? current + 1 : 0));
    this.startAutoplay(); // Reset timer on manual navigation
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.startAutoplay(); // Reset timer on manual navigation
  }
}
