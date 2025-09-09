import { Component, ChangeDetectionStrategy, inject, Signal, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../services/data/course.service';
import { NotificationService } from '../../../services/error-handling/notification.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-admin-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCoursesComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  private allCourses = this.courseService.courses;
  searchTerm = signal('');
  selectedCategory = signal('all');

  categories = signal(['all', 'تکنیکال', 'فاندامنتال', 'مدیریت سرمایه', 'پرایس اکشن']);

  courses = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    
    return this.allCourses().filter(course => {
      const termMatch = !term ||
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term);

      const categoryMatch = category === 'all' || course.category === category;
      
      return termMatch && categoryMatch;
    });
  });

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  editCourse(id: number): void {
    this.router.navigate(['/admin/courses/edit', id]);
  }

  deleteCourse(id: number, title: string): void {
    if (confirm(`آیا از حذف دوره "${title}" اطمینان دارید؟`)) {
      this.courseService.deleteCourse(id);
      this.notificationService.showSuccess(`دوره "${title}" با موفقیت حذف شد.`);
    }
  }
}
