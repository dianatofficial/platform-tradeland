/**
 * @fileoverview سرویس مدیریت داده های اشتراک کاربران.
 */
import { Injectable, signal } from '@angular/core';
import { ALL_SUBSCRIPTIONS } from '../../data/subscriptions.data';
import { UserSubscription } from '../../models/subscription.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private subscriptionsState = signal<UserSubscription[]>(ALL_SUBSCRIPTIONS);

  public subscriptions = this.subscriptionsState.asReadonly();
}
