
import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/data/product.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Product } from '../../../models/product.model';
import { take } from 'rxjs';
import { RichTextEditorComponent } from '../../../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-admin-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);
  editMode = signal(false);
  productSlug = signal<string | null>(null);
  
  pageTitle = computed(() => this.editMode() ? 'ویرایش محصول' : 'افزودن محصول جدید');

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    type: new FormControl<'کتاب' | 'جزوه'>('کتاب', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  private currentProduct?: Product;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.editMode.set(true);
      this.productSlug.set(slug);
      this.loadProductData(slug);
    }
  }

  loadProductData(slug: string): void {
    this.isLoading.set(true);
    this.productService.getProductBySlug(slug).pipe(take(1)).subscribe({
      next: (product) => {
        this.currentProduct = product;
        this.productForm.patchValue(product);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notificationService.showError(err.message || 'خطا در دریافت اطلاعات محصول.');
        this.router.navigate(['/admin/products']);
        this.isLoading.set(false);
      }
    });
  }
  
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.notificationService.showError('لطفا تمام فیلدهای الزامی را پر کنید.');
      return;
    }
    
    this.isLoading.set(true);
    const formValue = this.productForm.value;

    if (this.editMode() && this.currentProduct) {
      const updatedProduct: Product = { ...this.currentProduct, ...formValue as Partial<Product> };
      this.productService.updateProduct(updatedProduct);
      this.notificationService.showSuccess('محصول با موفقیت ویرایش شد.');
      this.router.navigate(['/admin/products']);
    } else {
      const newProductData: Omit<Product, 'id' | 'slug' | 'releaseDate'> = {
        ...formValue as any,
        tableOfContents: [],
        fileFormat: 'PDF',
        pageCount: 0,
        version: '1.0',
        language: 'فارسی',
        tags: [],
        reviews: [],
        faq: [],
      };
      this.productService.addProduct(newProductData);
      this.notificationService.showSuccess('محصول جدید با موفقیت اضافه شد.');
      this.router.navigate(['/admin/products']);
    }
  }
}