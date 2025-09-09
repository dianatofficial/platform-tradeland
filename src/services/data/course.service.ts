/**
 * @fileoverview سرویس مدیریت داده های دوره های آموزشی.
 * این سرویس مسئول فراهم کردن داده های نمونه (mock) برای دوره ها است.
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError, delay, map } from 'rxjs';
import { ALL_COURSES } from '../../data/courses.data';
import { Course } from '../../models/course.model';
import { ALL_USERS } from '../../data/users.data';
import { ALL_CATEGORIES } from '../../data/categories.data';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private coursesState = signal<Course[]>(ALL_COURSES);
  
  public courses = this.coursesState.asReadonly();

  private enrichCourse(course: Course): Course {
    const instructor = ALL_USERS.find(u => u.id === course.instructorId);
    const category = ALL_CATEGORIES.find(c => c.id === course.categoryId);
    return {
      ...course,
      instructor: instructor?.fullName || 'ناشناس',
      instructorImage: instructor?.avatarUrl || '',
      instructorBio: instructor?.bio || '',
      category: category?.name || 'بدون دسته',
    };
  }

  /**
   * تمام دوره ها را به صورت یک Observable برمی گرداند.
   * @returns {Observable<Course[]>} یک Observable از آرایه دوره ها.
   */
  getCourses(): Observable<Course[]> {
    const enrichedCourses = this.coursesState().map(c => this.enrichCourse(c));
    return of(enrichedCourses).pipe(delay(200));
  }

  /**
   * یک دوره خاص را بر اساس شناسه (id) آن پیدا و برمی گرداند.
   * @param id شناسه عددی دوره.
   * @returns {Observable<Course | undefined>} یک Observable از دوره پیدا شده یا undefined.
   */
  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.coursesState().find(c => c.id === id);
    if (!course) {
        return throwError(() => new Error(`دوره با شناسه ${id} یافت نشد.`));
    }
    return of(this.enrichCourse(course)).pipe(delay(100));
  }

  /**
   * یک دوره جدید اضافه می‌کند.
   * @param courseData داده‌های دوره جدید (بدون شناسه).
   */
  addCourse(courseData: Omit<Course, 'id'>): void {
    const newCourse: Course = {
      ...courseData,
      id: this.coursesState().length > 0 ? Math.max(...this.coursesState().map(c => c.id)) + 1 : 1,
    };
    this.coursesState.update(courses => [...courses, newCourse]);
  }

  /**
   * یک دوره موجود را به‌روزرسانی می‌کند.
   * @param updatedCourse آبجکت کامل دوره به‌روز شده.
   */
  updateCourse(updatedCourse: Course): void {
    this.coursesState.update(courses => 
      courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
    );
  }

  /**
   * یک دوره را بر اساس شناسه حذف می‌کند.
   * @param id شناسه دوره‌ای که باید حذف شود.
   */
  deleteCourse(id: number): void {
    this.coursesState.update(courses => courses.filter(c => c.id !== id));
  }
}
