/**
 * @fileoverview کامپوننت صفحه اشتراک ویژه.
 * این کامپوننت پلن های مختلف اشتراک را با استفاده از کامپوننت
 * `SubscriptionPlanCardComponent` نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SubscriptionPlanCardComponent } from '../../components/subscription-plan-card/subscription-plan-card.component';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { SubscriptionPlanService } from '../../services/data/subscription-plan.service';
import { useQuery } from '../../composables/use-query';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-subscriptions',
  imports: [CommonModule, RouterLink, PageHeaderComponent, SubscriptionPlanCardComponent, QueryStateComponent],
  templateUrl: './subscriptions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionsComponent {
  private planService = inject(SubscriptionPlanService);
  private query = useQuery(() => this.planService.getPlans());

  plans = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
}
