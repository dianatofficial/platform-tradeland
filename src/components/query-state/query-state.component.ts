/**
 * @fileoverview A reusable component for managing and displaying different states
 * of an asynchronous operation (loading, success, error).
 */
import { Component, ChangeDetectionStrategy, input, output, ElementRef, signal, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-query-state',
  imports: [CommonModule],
  templateUrl: './query-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryStateComponent {
  /** The current status of the query. */
  status = input.required<'loading' | 'success' | 'error'>();
  
  /** The error message to display if the status is 'error'. */
  error = input<string | null>(null);

  /** Emits when the user clicks the 'Retry' button in the default error template. */
  refetch = output<void>();

  private elementRef = inject(ElementRef);
  
  /** A signal to check if custom error content has been projected. */
  hasCustomErrorContent = signal(false);

  constructor() {
    // FIX: Correctly use `afterNextRender` by passing a callback function.
    // The previous implementation incorrectly passed an object, which is the syntax for `afterRender`.
    afterNextRender(() => {
        // We check if the `[slot='error']` has any projected element nodes.
        const errorSlotContainer = this.elementRef.nativeElement.querySelector('.error-slot-wrapper');
        if (errorSlotContainer && errorSlotContainer.children.length > 0) {
          this.hasCustomErrorContent.set(true);
        }
    });
  }

  onRefetch(): void {
    this.refetch.emit();
  }
}