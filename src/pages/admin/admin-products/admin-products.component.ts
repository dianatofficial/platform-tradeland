

import { Component, ChangeDetectionStrategy, inject, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/data/product.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsComponent {
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  private allProducts = this.productService.products;
  searchTerm = signal('');

  products = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allProducts();
    }
    return this.allProducts().filter(product => 
      product.title.toLowerCase().includes(term) ||
      product.author.toLowerCase().includes(term)
    );
  });

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  deleteProduct(id: number, title: string): void {
    if (confirm(`آیا از حذف محصول "${title}" اطمینان دارید؟`)) {
      this.productService.deleteProduct(id);
      this.notificationService.showSuccess(`محصول "${title}" با موفقیت حذف شد.`);
    }
  }
}
