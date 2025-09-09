/**
 * @fileoverview کامپوننت صفحه "کافه ترید".
 * این کامپوننت لیستی از کانال های تحلیلی اساتید و تحلیلگران را
 * با استفاده از کامپوننت `AnalystCardComponent` نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeTradeService } from '../../services/data/cafe-trade.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { AnalystCardComponent } from '../../components/analyst-card/analyst-card.component';
import { useQuery } from '../../composables/use-query';
import { AnalystCardSkeletonComponent } from '../../components/analyst-card/analyst-card-skeleton.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-cafe-trade',
  imports: [CommonModule, PageHeaderComponent, AnalystCardComponent, AnalystCardSkeletonComponent, QueryStateComponent],
  templateUrl: './cafe-trade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CafeTradeComponent {
  private cafeTradeService = inject(CafeTradeService);
  private query = useQuery(() => this.cafeTradeService.getAnalysts());

  analysts = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;
}
