/**
 * @fileoverview کامپوننت لیست محصولات دانلودی.
 * این کامپوننت لیستی از محصولات (کتاب، جزوه و ...) را نمایش می دهد
 * و امکان جستجو و فیلتر بر اساس نوع محصول را فراهم می کند.
 */
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/data/product.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { useQuery } from '../../composables/use-query';
import { ProductCardSkeletonComponent } from '../../components/product-card/product-card-skeleton.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, ProductCardComponent, ProductCardSkeletonComponent, QueryStateComponent],
  templateUrl: './products-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  productService = inject(ProductService);
  private query = useQuery(() => this.productService.getProducts());

  products = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;

  // --- مدیریت وضعیت فیلترها ---
  /** سیگنال برای نگهداری عبارت جستجو شده. */
  searchTerm = signal('');
  /** سیگنال برای نگهداری نوع محصول انتخاب شده. */
  selectedType = signal('all');

  /** لیستی از انواع محصولات برای نمایش در فیلتر. */
  productTypes = signal(['کتاب', 'جزوه']);

  /**
   * سیگنال محاسباتی برای فیلتر کردن محصولات بر اساس جستجو و نوع.
   */
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const type = this.selectedType();
    
    return this.products().filter(product => {
      const titleMatch = product.title.toLowerCase().includes(term);
      const authorMatch = product.author.toLowerCase().includes(term);
      const typeMatch = type === 'all' || product.type === type;

      return (titleMatch || authorMatch) && typeMatch;
    });
  });

  /**
   * با هر بار تایپ در اینپوت جستجو، مقدار سیگنال `searchTerm` را به روز می کند.
   * @param event رویداد ورودی از اینپوت.
   */
  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  /**
   * با تغییر مقدار در سلکت باکس نوع، سیگنال `selectedType` را به روز می کند.
   * @param event رویداد تغییر از سلکت باکس.
   */
  onTypeChange(event: Event) {
    this.selectedType.set((event.target as HTMLSelectElement).value);
  }
}
