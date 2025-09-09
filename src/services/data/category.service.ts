/**
 * @fileoverview Service for managing category data.
 */
import { Injectable, signal } from '@angular/core';
import { ALL_CATEGORIES } from '../../data/categories.data';
import { Category, CategoryType } from '../../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoriesState = signal<Category[]>(ALL_CATEGORIES);

  public categories = this.categoriesState.asReadonly();

  getCategoriesByType(type: CategoryType): Category[] {
    return this.categoriesState().filter(c => c.type === type);
  }

  addCategory(category: Omit<Category, 'id'>): void {
    const newCategory: Category = {
      ...category,
      id: Date.now(), // simple id
    };
    this.categoriesState.update(cats => [...cats, newCategory]);
  }

  updateCategory(updatedCategory: Category): void {
    this.categoriesState.update(cats => 
      cats.map(c => c.id === updatedCategory.id ? updatedCategory : c)
    );
  }

  deleteCategory(id: number): void {
    // Note: In a real app, we should check if this category is being used by any content.
    this.categoriesState.update(cats => cats.filter(c => c.id !== id));
  }
}
