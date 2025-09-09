import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/data/category.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Category, CategoryType } from '../../../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategoriesComponent {
  private categoryService = inject(CategoryService);
  private notificationService = inject(NotificationService);

  activeTab = signal<CategoryType>('course');
  
  newCategoryName = signal('');
  editingCategory = signal<Category | null>(null);

  tabs: { type: CategoryType, label: string }[] = [
    { type: 'course', label: 'دوره‌ها' },
    { type: 'blog', label: 'بلاگ' },
    { type: 'news', label: 'اخبار' },
    { type: 'product', label: 'محصولات' },
  ];

  filteredCategories = computed(() => {
    return this.categoryService.categories().filter(c => c.type === this.activeTab());
  });

  selectTab(type: CategoryType) {
    this.activeTab.set(type);
    this.cancelEdit();
  }

  startEdit(category: Category) {
    this.editingCategory.set({ ...category });
  }

  cancelEdit() {
    this.editingCategory.set(null);
  }

  saveCategory() {
    if (this.editingCategory()) {
      const cat = this.editingCategory();
      if (cat && cat.name.trim()) {
        this.categoryService.updateCategory(cat);
        this.notificationService.showSuccess('دسته بندی ویرایش شد.');
        this.cancelEdit();
      }
    }
  }

  addCategory() {
    const name = this.newCategoryName().trim();
    if (name) {
      this.categoryService.addCategory({ name, type: this.activeTab() });
      this.notificationService.showSuccess('دسته بندی جدید اضافه شد.');
      this.newCategoryName.set('');
    }
  }

  deleteCategory(id: number, name: string) {
    if (confirm(`آیا از حذف دسته بندی "${name}" اطمینان دارید؟`)) {
      this.categoryService.deleteCategory(id);
      this.notificationService.showSuccess('دسته بندی حذف شد.');
    }
  }
}
