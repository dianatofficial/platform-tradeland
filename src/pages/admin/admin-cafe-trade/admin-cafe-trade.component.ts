import { Component, ChangeDetectionStrategy, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CafeTradeService } from '../../../services/data/cafe-trade.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Analyst } from '../../../models/cafe-trade.model';

@Component({
  selector: 'app-admin-cafe-trade',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-cafe-trade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCafeTradeComponent {
  private cafeTradeService = inject(CafeTradeService);
  private notificationService = inject(NotificationService);

  analysts = this.cafeTradeService.analysts;

  deleteAnalyst(id: number, name: string): void {
    if (confirm(`آیا از حذف کانال "${name}" اطمینان دارید؟`)) {
      this.cafeTradeService.deleteAnalyst(id);
      this.notificationService.showSuccess(`کانال "${name}" با موفقیت حذف شد.`);
    }
  }
}
