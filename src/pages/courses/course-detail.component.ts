/**
 * @fileoverview کامپوننت نمایش جزئیات یک دوره آموزشی خاص.
 * این کامپوننت اطلاعات دوره را بر اساس `id` موجود در URL دریافت و نمایش می دهد.
 */
import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// FIX: Import RxJS operators from 'rxjs' instead of 'rxjs/operators'.
import { map, switchMap } from 'rxjs';
import { CourseService } from '../../services/data/course.service';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { useAsync } from '../../composables/use-async';
import { BreadcrumbItem } from '../../models/ui.model';
import { QueryStateComponent } from '../../components/query-state/query-state.component';

@Component({
  selector: 'app-course-detail',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, QueryStateComponent],
  templateUrl: './course-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  private course$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id => this.courseService.getCourseById(id))
  );

  private query = useAsync(this.course$);

  course = this.query.data;
  status = this.query.status;
  error = this.query.error;

  // --- Accordion State for Syllabus ---
  openSectionIndex = signal<number>(0);

  /**
   * سیگنال محاسباتی برای تولید آیتم های بردکرامب (مسیر راهنما).
   * این سیگنال با تغییر اطلاعات دوره، به طور خودکار به روز می شود.
   */
  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const courseTitle = this.course()?.title;
    if (this.status() === 'error') {
      return [{ label: 'خطا' }];
    }
    if (!courseTitle) {
      return [];
    }
    return [
      { label: 'دوره ها', link: '/courses' },
      { label: courseTitle }
    ];
  });

  /**
   * سیگنال محاسباتی برای نمایش خلاصه توضیحات دوره بدون تگ های HTML.
   */
  plainDescription = computed(() => {
    const description = this.course()?.description;
    if (!description) {
      return '';
    }
    // Remove HTML tags and truncate
    const plainText = description.replace(/<[^>]*>/g, '');
    if (plainText.length > 150) {
      return plainText.substring(0, 150) + '...';
    }
    return plainText;
  });

  /**
   * یک آرایه از اعداد برای حلقه زدن و نمایش ستاره های امتیاز.
   * @param rating امتیاز دوره.
   * @returns آرایه ای از اعداد.
   */
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(1);
  }
  
  /**
   * Toggles the visibility of a syllabus section in the accordion.
   * @param index The index of the section to toggle.
   */
  toggleSection(index: number): void {
    this.openSectionIndex.update(current => current === index ? -1 : index);
  }
}