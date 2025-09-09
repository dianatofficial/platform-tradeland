/**
 * @fileoverview تعریف مسیرهای بخش کافه ترید.
 */

import { Routes } from '@angular/router';
import { CafeTradeComponent } from './cafe-trade.component';
import { ChannelDetailComponent } from './channel-detail.component';

export const CAFE_TRADE_ROUTES: Routes = [
  { path: '', component: CafeTradeComponent, title: 'کافه ترید' },
  { path: ':id', component: ChannelDetailComponent, title: 'مشاهده کانال' },
];