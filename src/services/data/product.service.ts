


/**
 * @fileoverview سرویس مدیریت داده های محصولات دانلودی.
 * این سرویس مسئول فراهم کردن داده های نمونه (mock) برای محصولات است.
 */

import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, switchMap, throwError } from 'rxjs';
import { ALL_PRODUCTS } from '../../data/products.data';
import { Product } from '../../models/product.model';
import { ALL_CATEGORIES } from '../../data/categories.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsState = signal<Product[]>(ALL_PRODUCTS);
  
  public products = this.productsState.asReadonly();

  private enrichProduct(product: Product): Product {
    const category = ALL_CATEGORIES.find(c => c.id === product.categoryId);
    // For products, we don't add a default category name as it's less critical.
    // It's just an example of a service-level join.
    return product; 
  }
  
  /**
   * Creates a URL-friendly slug from a string.
   * @param title The string to convert.
   * @returns The slug.
   */
  private createSlug(title: string): string {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  /**
   * تمام محصولات را به صورت یک Observable برمی گرداند.
   * @returns {Observable<Product[]>} یک Observable از آرایه محصولات.
   */
  getProducts(): Observable<Product[]> {
    const enrichedProducts = this.productsState().map(p => this.enrichProduct(p));
    return of(enrichedProducts).pipe(delay(200));
  }

  /**
   * یک محصول خاص را بر اساس slug آن پیدا و برمی گرداند.
   * @param slug اسلاگ (شناسه متنی) محصول.
   * @returns {Observable<Product>} یک Observable از محصول پیدا شده.
   */
  getProductBySlug(slug: string): Observable<Product> {
    return of(null).pipe(
      delay(100),
      switchMap(() => {
        const product = this.productsState().find(p => p.slug === slug);
        if (!product) {
          return throwError(() => new Error(`محصول با اسلاگ ${slug} یافت نشد.`));
        }
        return of(this.enrichProduct(product));
      })
    );
  }

  /**
   * یک محصول جدید اضافه می‌کند.
   * @param productData داده‌های محصول جدید.
   */
  addProduct(productData: Omit<Product, 'id' | 'slug' | 'releaseDate'>): void {
    const newSlug = `${this.createSlug(productData.title)}-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      slug: newSlug,
      releaseDate: new Date().toLocaleDateString('fa-IR'),
    };
    this.productsState.update(products => [newProduct, ...products]);
  }

  /**
   * یک محصول موجود را به‌روزرسانی می‌کند.
   * @param updatedProduct آبجکت کامل محصول به‌روز شده.
   */
  updateProduct(updatedProduct: Product): void {
    this.productsState.update(products =>
      products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  }

  /**
   * یک محصول را بر اساس شناسه حذف می‌کند.
   * @param id شناسه محصولی که باید حذف شود.
   */
  deleteProduct(id: number): void {
    this.productsState.update(products => products.filter(p => p.id !== id));
  }
}
