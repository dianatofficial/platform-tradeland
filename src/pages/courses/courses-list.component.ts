/**
 * @fileoverview کامپوننت لیست دوره های آموزشی.
 * این کامپوننت تمام دوره ها را نمایش می دهد و امکان جستجو و فیلتر
 * بر اساس دسته بندی و سطح دوره را فراهم می کند.
 */
import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/data/course.service';
import { Course } from '../../models/course.model';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { useQuery } from '../../composables/use-query';
import { CourseCardSkeletonComponent } from '../../components/course-card/course-card-skeleton.component';
import { QueryStateComponent } from '../../components/query-state/query-state.component';
// FIX: Corrected the import paths for CategoryService and Category to resolve a type inference issue.
import { CategoryService } from '../../services/data/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule, RouterLink, PageHeaderComponent, CourseCardComponent, CourseCardSkeletonComponent, QueryStateComponent],
  templateUrl: './courses-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {
  private courseService = inject(CourseService);
  private categoryService = inject(CategoryService);
  private query = useQuery(() => this.courseService.getCourses());

  // Public signals derived from the query for template binding
  courses = computed(() => this.query.data() ?? []);
  status = this.query.status;
  error = this.query.error;
  refetch = this.query.refetch;
  
  // --- مدیریت وضعیت فیلترها ---
  searchTerm = signal('');
  selectedCategory = signal<number | 'all'>('all');
  selectedLevel = signal('all');

  // --- داده های استاتیک برای فیلترها ---
  categories = computed(() => this.categoryService.getCategoriesByType('course'));
  levels = signal(['مقدماتی', 'متوسط', 'پیشرفته', 'همه سطوح']);

  /**
   * سیگنال محاسباتی (Computed Signal) برای فیلتر کردن دوره ها.
   */
  filteredCourses = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const level = this.selectedLevel();
    
    return this.courses().filter(course => {
      const titleMatch = course.title.toLowerCase().includes(term);
      const instructorMatch = course.instructor.toLowerCase().includes(term);
      const categoryMatch = category === 'all' || course.categoryId === category;
      const levelMatch = level === 'all' || course.level.includes(level);

      return (titleMatch || instructorMatch) && categoryMatch && levelMatch;
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
   * دسته بندی انتخاب شده را از طریق دکمه ها تنظیم می کند.
   * @param categoryId شناسه دسته بندی.
   */
  selectCategory(categoryId: number | 'all') {
    this.selectedCategory.set(categoryId);
  }

  /**
   * با کلیک روی دکمه فیلتر سطح، سیگنال `selectedLevel` را به روز می کند.
   * @param level سطح انتخاب شده.
   */
  onLevelChange(level: string) {
    this.selectedLevel.set(level);
  }
}
