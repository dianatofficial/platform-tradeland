/**
 * @fileoverview کامپوننت نمایش جزئیات کانال و پست های آن در کافه ترید.
 */
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, forkJoin } from 'rxjs';
import { CafeTradeService } from '../../services/data/cafe-trade.service';
import { useAsync } from '../../composables/use-async';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';
import { BreadcrumbItem } from '../../models/ui.model';
import { ChannelPostComponent } from '../../components/channel-post/channel-post.component';
import { ChannelPostSkeletonComponent } from '../../components/channel-post/channel-post-skeleton.component';

@Component({
  selector: 'app-channel-detail',
  imports: [CommonModule, BreadcrumbComponent, QueryStateComponent, ChannelPostComponent, ChannelPostSkeletonComponent],
  templateUrl: './channel-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelDetailComponent {
  private route = inject(ActivatedRoute);
  private cafeTradeService = inject(CafeTradeService);

  private data$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => {
      // FIX: By using a block scope and creating a `sources` object, we help the
      // TypeScript compiler correctly infer the type of `this.cafeTradeService`.
      // This resolves an issue where the service was incorrectly typed as 'unknown'.
      const sources = {
        channel: this.cafeTradeService.getChannelById(id),
        posts: this.cafeTradeService.getPostsByChannelId(id),
      };
      return forkJoin(sources);
    })
  );

  private query = useAsync(this.data$);

  channel = computed(() => this.query.data()?.channel);
  posts = computed(() => this.query.data()?.posts);
  status = this.query.status;
  error = this.query.error;

  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const channelName = this.channel()?.name;
    if (this.status() === 'error') {
      return [{ label: 'خطا' }];
    }
    if (!channelName) {
      return [];
    }
    return [
      { label: 'کافه ترید', link: '/cafe-trade' },
      { label: channelName }
    ];
  });
  
  formatFollowers(count: number | undefined): string {
    if (count === undefined) return '';
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return count.toString();
  }
}
