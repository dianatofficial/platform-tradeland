import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriptionPlanService } from '../../../services/data/subscription-plan.service';
import { NotificationService } from '../../../services/error-handling/notification.service';

@Component({
  selector: 'app-admin-subscription-plans',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-subscription-plans.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSubscriptionPlansComponent {
  private planService = inject(SubscriptionPlanService);
  private notificationService = inject(NotificationService);

  plans = this.planService.plans;

  deletePlan(id: number, name: string): void {
    if (confirm(`آیا از حذف پلن "${name}" اطمینان دارید؟`)) {
      this.planService.deletePlan(id);
      this.notificationService.showSuccess(`پلن "${name}" با موفقیت حذف شد.`);
    }
  }
}
