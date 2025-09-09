import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../services/data/subscription.service';
import { UserSubscription } from '../../../models/subscription.model';

@Component({
  selector: 'app-admin-subscriptions',
  imports: [CommonModule],
  templateUrl: './admin-subscriptions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSubscriptionsComponent {
  private subscriptionService = inject(SubscriptionService);

  subscriptions = this.subscriptionService.subscriptions;

  getStatusClass(status: string): string {
    return status === 'فعال' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }
}
