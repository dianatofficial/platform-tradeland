/**
 * @fileoverview کامپوننت قابل استفاده مجدد برای نمایش کارت یک پلن اشتراک.
 */
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
// FIX: Corrected the import path for the 'SubscriptionPlan' interface.
import { SubscriptionPlan } from '../../models/subscription-plan.model';

@Component({
  selector: 'app-subscription-plan-card',
  imports: [CommonModule],
  templateUrl: './subscription-plan-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPlanCardComponent {
  /** ورودی اجباری: آبجکت داده های پلن اشتراک. */
  plan = input.required<SubscriptionPlan>();
}
